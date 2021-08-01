import User, { UserDocument } from '../models/User'

const findAllUser = async () => {
  return User.find()
}

const findOne = async (userId: string) => {
  return User.findById(userId).populate('books')
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  return User.findByIdAndDelete(userId).exec()
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, update, { new: true }).exec()
}

const create = async (user: UserDocument) => {
  return user.save()
}

const findOrCreate = async (parsedToken: any) => {
  //find user by email
  const existingUser = await User.findOne({ email: parsedToken.email })
  //if no user create a new user with parsedToken
  if (!existingUser){
    const createUser = new User ({
      firstName: parsedToken['firstName'],
      lastName: parsedToken['lastName'],
      email: parsedToken['email']
    })
    return  createUser
  }
  return existingUser
  //if there is a user return that user

}
const findByEmail = async (email: string) => {
  //query for the user in the db using email
  const user = await User.findOne({email})
  return user
}

export default {
  findAllUser,
  findOne,
  create,
  update,
  deleteUser,
  findOrCreate,
  findByEmail,
}
