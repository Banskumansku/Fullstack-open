require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  SECRET
}