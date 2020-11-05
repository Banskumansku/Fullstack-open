const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const config = require('./utils/config')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const JWT_SECRET = config.SECRET

const MONGODB_URI = config.MONGODB_URI


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int,
        bookCount: Int
        id: ID!
    }

    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
          ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    type Subscription {
        bookSubscription: Book!
    } 
`
const pubsub = new PubSub()



const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        },
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!!args.author) {
                return await Book.find({ book: { author: book.author === args.author } }).populate('author')

            }
            if (!!args.genre) {
                return await Book.find({ book: { author: book.genres.includes(args.genre) } }).populate('author')
            }
            return await Book.find({}).populate('author')
        },
        allAuthors: async () => {
            return await Author.find({})
        }
    },
    Book: {
        author: (root) => Author.findOne({ _id: root.author })
    },
    Author: {
        bookCount: (root) => Book.find({ author: root.id }).countDocuments()
    },
    Mutation: {
        addBook: async (root, args, context) => {

            if (!context.currentUser) {
                throw new AuthenticationError('You are not logged in')
            }

            const author = await Author.findOne({ name: args.author })
            let book;
            try {
                if (!author) {
                    const newAuthor = new Author({ name: args.author, setBornTo: null })
                    const returnedAuthor = await newAuthor.save()
                    book = new Book({ ...args, author: returnedAuthor.id })
                } else {
                    book = new Book({ ...args, author: author.id })
                }
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            pubsub.publish('BOOK_ADDED', { bookSubscription: book })

            return book
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!!author) {
                await author.update({ born: args.setBornTo }, { new: true })
                return author
            }
            return null
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            try {
                await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'password') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
                favoriteGenre: user.favoriteGenre
            }
            return {
                value: jwt.sign(userForToken, JWT_SECRET),
                favoriteGenre: user.favoriteGenre
            }
        },
    },
    Subscription: {
        bookSubscription: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})