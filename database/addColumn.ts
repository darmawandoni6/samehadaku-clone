import env from 'dotenv'
import { DataTypes } from 'sequelize'

import sequelize from '../server/utils/sequelize'

env.config()

const syncDb = async () => {
  const query = sequelize.getQueryInterface()
  try {
    console.log()
    console.log(`success add new column: ${process.env.DATABASE}`)
    console.log()
  } catch (error) {
    const e = error as Error
    console.log(error)
    console.log(`------------------- ${e.message} -------------------`)
    console.log()
  }
}

syncDb()
