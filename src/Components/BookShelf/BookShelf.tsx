import { FC } from 'react';
import { connect } from 'react-redux';
import { Container, Pagination, Row } from 'react-bootstrap';

import { sortBookShelf, setPage } from '../../store/actions/index';
import {
  BooksArray,
  BooksState,
  SortBy,
} from '../../types/bookShelf';
import BookCard from '../BookCard/BookCard';
import Filter from '../Filter/Filter';

type Props = {
  allBooks: BooksArray;
  books: BooksArray;
  searchResults: BooksArray;
  page: number;
  booksPerPage: number;
  searching: boolean;
  onSortBooks: (sortBy: SortBy) => void;
  onSetPage: (page: number) => void;
};

const BookShelf: FC<Props> = ({
  allBooks,
  books,
  searchResults,
  page,
  booksPerPage,
  searching,
  onSortBooks,
  onSetPage,
}: Props) => {
  const setPages = () => {
    const items = [];
    const currentBooks = searching ? searchResults : allBooks;
    const pageCount = Math.ceil(currentBooks.length / booksPerPage);
    if (pageCount === 1) return null;
    for (let number = 1; number <= pageCount; number += 1) {
      items.push(
        <Pagination.Item
          key={number}
          active={page === number}
          onClick={() => onSetPage(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };

  return (
    <Container fluid className="px-4">
      <Row>
        <Filter onSort={onSortBooks} />
      </Row>
      <Row>
        {books && books.map((el) => <BookCard key={el.id} book={el} />)}
      </Row>
      <Row className="justify-content-center mb-3">
        <Pagination>{setPages()}</Pagination>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: Record<string, BooksState>) => ({
  allBooks: state.bookShelf.initialBooks,
  books: state.bookShelf.currentBooks,
  searchResults: state.bookShelf.searchResults,
  page: state.bookShelf.page,
  booksPerPage: state.bookShelf.booksPerPage,
  searching: state.bookShelf.searching,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSortBooks: (sortBy: SortBy) => dispatch(sortBookShelf(sortBy)),
  onSetPage: (page: number) => dispatch(setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);
