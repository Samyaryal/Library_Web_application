import { findUserById } from './../../src/controllers/user';
import User from '../../src/models/User'
const UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '65hhsghg776757gsdjshj88'

async function createUser(){
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe1@gmail.com',
  })
  return await UserService.create(user)
}

describe('user service', () => {
  beforeEach(async() => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async() => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstName', 'John')
    expect(user).toHaveProperty('lastName', 'Doe')
    expect(user).toHaveProperty('email', 'johndoe1@gmail.com')
  })

  it('should get a user with id', async() => {
    const user = await createUser()
    const found = await UserService.findById(user._id)
    expect(found.firstName).toEqual(user.lastName)
    expect(found._id).toEqual(user._id)
  })

  it('should update the existing user', async() => {
    const user = await createUser()
    const update= {    
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1@gmail.com'
    }
    const updated = await UserService.update(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstName', 'John')
    expect(updated).toHaveProperty('lastName', 'Doe')
    expect(updated).toHaveProperty('email', 'johndoe1@gmail.com')
  })

  it('should not update a non-existing  user', async() => {
    expect.assertions(1)
    const  update ={
      lastName: 'John',
      firstName: 'Doe',
      email: 'johndoe1@gmail.com'
    }
    return UserService.update(nonExistingUserId, update).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })
  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.deleteUser(user._id)
    return UserService.findById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })

})



