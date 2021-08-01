import User, { UserDocument } from './../../src/models/User';
import  request from 'supertest'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<UserDocument>) {
  let user  ={
    firstName : 'Samikshya',
    lastName: 'Aryal',
    email: 'samikshyaaryal5@gmail.com'
  }
  if (override) {
    user = { ...user, ...override }
  }
  return await request(app).post('/api/v1/users').send(user)
}

describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll (async () => {
    await dbHelper.closeDatabase()
  })
})