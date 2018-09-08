const config = {
  db: {
    host: process.env.MONGODB_HOST || 'ds022408.mlab.com',
    port: process.env.MONGODB_PORT || 22408,
    name: 'findanewman',
    username: process.env.MONGODB_USER || 'newman',
    password: process.env.MONGODB_PASSWORD
  }
}

module.exports = config
