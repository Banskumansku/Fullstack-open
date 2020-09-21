const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const sumofLikes = blogs.reduce((a, b) => a + b.likes, 0)
    return sumofLikes
}

const bestBlog = (blogs) => {
    if (blogs.length > 0) {
        const mostLiked = blogs.reduce((big, comp) => big.likes > comp.likes ? big : comp);
        return mostLiked
    }
    return undefined
}

const favoriteBlog = (blogs) => {
    let favourite = new Map()
    blogs.forEach(blog => {
        if (favourite.has(blog.author)) {
            favourite.set(blog.author, favourite.get(blog.author) + blog.likes)
        } else {
            favourite.set(blog.author, blog.likes)
        }
    });

    const entries = [...favourite.entries()];
    if (blogs.length > 0) {
        const mostLiked = entries.reduce((big, comp) => big[1] > comp[1] ? big : comp);
        return mostLiked
    }

}

const mostEntries = (blogs) => {
    let favourite = new Map()
    blogs.forEach(blog => {
        if (favourite.has(blog.author)) {
            favourite.set(blog.author, favourite.get(blog.author) + 1)
        } else {
            favourite.set(blog.author, 1)
        }
    });

    const entries = [...favourite.entries()];
    if (blogs.length > 0) {
        const mostLiked = entries.reduce((big, comp) => big[1] > comp[1] ? big : comp);
        return mostLiked
    }

}

module.exports = {
    dummy,
    totalLikes,
    bestBlog,
    favoriteBlog,
    mostEntries
}