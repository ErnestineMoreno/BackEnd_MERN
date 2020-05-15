const User = require('../models/User')
const Job = require('../models/Job')
const seedData = require('./seeds.json')

const getUser = async () => {
  try {
    if (!process.argv[2]) {
      throw new Error(
        'To seed the database provide an email address for an existing user'
      )
    }
    const user = await User.findOne({ email: process.argv[2] })
    if (!user) {
      throw new Error('No matching user found!')
    }
    return user
  } catch (error) {
    console.error(error)
  }
}

Job.deleteMany()
  .then(getUser)
  .then((user) => {
    const seedDataWithOwner = seedData.map((job) => {
      job.owner = user._id
      return job
    })
    return Job.insertMany(seedDataWithOwner)
  })
  .then(console.log)
  .then(console.error)
  .finally(() => {
    process.exit()
  })
