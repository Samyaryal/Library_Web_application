import Book, { BookDocument } from '../models/Book'

function findAllBook(): Promise<BookDocument[]> {
  return Book.find().sort({ title: 1, description: -1 }).exec() // Return a Promise
}

function findBookById(bookId: string): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec() // .exec() will return a true Promise
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      return book
    })
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  return Book.findByIdAndDelete(bookId).exec()
}

function update(
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> {
  return Book.findByIdAndUpdate(bookId, update, { new: true }).exec()
}

const create = async (user: BookDocument) => {
  return user.save()
}

export default { findAllBook, findBookById, create, update, deleteBook }
