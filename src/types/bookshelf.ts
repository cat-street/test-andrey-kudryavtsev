export interface Book {
  [key: string]: string | number,
  id: string,
  title: string,
  author: string,
  cover: string,
  description: string,
  year: string,
  rating: number,
  votes: number,
  ownerId: string,
}

export interface BooksArray extends Array<Book> {}

export enum Sort { ASC, DESC }

export interface BooksState {
  initialBooks: BooksArray,
  searchResults: BooksArray,
  currentBooks: BooksArray,
  searching: boolean,
  page: number,
  sort: Sort,
  sortBy: string,
  booksPerPage: number,
}
