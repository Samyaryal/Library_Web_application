/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  // books: string []
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
  },
  lastName: {
    type: String,
    index: true,
    required: true,
  },
  // books: [
  //   {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Book',
  //   required: true
  //   }
  // ]
  // books: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Book',
      
  //   },
  // ]
})
// authorSchema.virtual('books', {
//   ref: 'Book',
//   localField: '_id',
//   foreignField: 'authors'
// })
export default mongoose.model<AuthorDocument>('Author', authorSchema)
