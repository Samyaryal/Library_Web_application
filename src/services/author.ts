import Book, { AuthorDocument } from '../models/Authors'

const findAllAuthor = async () => {
  return Book.find()
}

function findOne(authorId: string): Promise<AuthorDocument> {
  return Book.findById(authorId)
    .exec() // .exec() will return a true Promise
    .then((author) => {
      if (!author) {
        throw new Error(`Author ${authorId} not found`)
      }
      return author
    })
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  return Book.findByIdAndDelete(authorId).exec()
}

function update(
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> {
  return Book.findByIdAndUpdate(authorId, update, { new: true }).exec()
}

const create = async (author: AuthorDocument) => {
  return author.save()
}

export default { findAllAuthor, findOne, create, update, deleteAuthor }
