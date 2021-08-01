/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  title: string
  description: string
  dateOfPublish: string
  ISBN: number
  status: boolean
  borrowedDate: Date
  dueDate: Date
  authors: string []
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfPublish: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
    index: true,
  },
  status: {
    type: Boolean,
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    // required: true,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'

      // ref:'Author',
      // localField:,
      // foreignField:'books'
    },
  ],
})

// bookSchema.virtual('books', {
//   ref: 'Author',
//   localField: '_id',
//   foreignField: 'books'
// })
export default mongoose.model<BookDocument>('Book', bookSchema)
