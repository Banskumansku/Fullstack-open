const { ApolloServer, gql } = require('apollo-server')

const Author = require('./models/author')
const Book = require('./models/book')

const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

MONGODB_URI = 'mongodb+srv://fullstack:QK0wdpd62FJr3UVA@fullstackopen.m5eeh.mongodb.net/library?retryWrites=true&w=majority'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
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
    }
`

const resolvers = {
    Query: {
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
        addBook: async (root, args) => {
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
            return book
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!!author) {
                await author.update({ born: args.setBornTo }, { new: true })
                return author
            }
            return null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})