import React from "react";
import { connect } from "react-redux";
import { Table, Button, Form } from "react-bootstrap";
import { bindActionCreators, Dispatch } from "redux";
import {
  fetchBooks,
  updateBook,
  deleteBook,
  createBook,
  fetchAuthors,
} from "../../redux/action";
import TablePagination from "../../components/tablePagination";
import EditModal from "../../components/editModal";
import { IAuthor, IBook } from "../../interface/book";

interface StateProps {
  books: IBook[];
  authors: IAuthor[];
  loading: any;
  error: any;
}

interface DispatchProps {
  fetchBooks: () => void;
  updateBook: (book: IBook) => void;
  deleteBook: (bookId: string) => void;
  createBook: (book: IBook) => void;
  fetchAuthors: () => void;
}

type Props = StateProps & DispatchProps;

class Book extends React.Component<Props> {
  state = {
    data: this.props.books,
    showModal: false,
    selectedData: null as IBook | null,
    searchTerm: "",
    currentPage: 1,
  };

  componentDidMount() {
    this.props.fetchBooks();
    this.props.fetchAuthors();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.books !== this.props.books) {
      this.setState({ data: this.props.books });
    }
    console.log("🚀 ~ file: book.tsx:49 ~ Book ~ componentDidUpdate ~ this.props:", this.state.selectedData)
  }

  // Pagination
  indexOfLastItem = () => {
    return this.state.currentPage * 5;
  };

  indexOfFirstItem = () => {
    return this.indexOfLastItem() - 5;
  };

  currentData = () => {
    const { data, searchTerm } = this.state;
    const searchValue = searchTerm.toLowerCase();

    return (
      data &&
      data
        .filter((item: IBook) => {
          const { name } = item;
          return name.toLowerCase().includes(searchValue);
        })
        .slice(this.indexOfFirstItem(), this.indexOfLastItem())
    );
  };

  totalPages = () => {
    const { data, searchTerm } = this.state;
    const filteredData = data.filter((item: IBook) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return Math.ceil(filteredData.length / 5);
  };

  handlePageChange = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber });
  };

  handleEdit = (item: IBook | null) => {
    this.setState({ selectedData: item, showModal: true });
  };

  handleDelete = (bookId: string) => {
    this.props.deleteBook(bookId);
    const updatedData = this.state.data.filter(
      (item: IBook) => item._id !== bookId
    );
    this.setState({ data: updatedData });
  };

  handleUpdate = () => {
    const { selectedData, data } = this.state;
    if (selectedData) {
      const updatedData =
        data &&
        data.map((item: IBook) =>
          item._id === selectedData._id ? selectedData : item
        );

      this.props.updateBook(selectedData);
      this.setState({ data: updatedData, showModal: false });
    }
  };

  handleSave = () => {
    const { selectedData, data } = this.state;

    if (selectedData) {
      this.props.createBook(selectedData);

      const updatedData = [...data, selectedData];
      this.setState({
        data: updatedData,
        showModal: false,
        selectedData: null,
      });
    }
  };

  setSelectedDataCallback = (value: IBook) => {
    this.setState({ selectedData: value });
  };

  render() {
    const { searchTerm, currentPage, showModal, selectedData } = this.state;

    return (
      <div className="book-container">
        <h1>Books</h1>

        {/* Search Bar */}
        <Form.Group>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search Book By Title...."
              value={searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
            />
            <Button variant="primary" onClick={() => this.handleEdit(null)}>
              Add Book
            </Button>
          </div>
        </Form.Group>

        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.currentData().map((item: IBook) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => this.handleEdit(item)}
                  >
                    View and Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={this.totalPages()}
          onPageChange={this.handlePageChange}
        />

        {/* Edit Modal */}
        <EditModal
          showModal={showModal}
          setShowModal={(value: boolean) => this.setState({ showModal: value })}
          selectedData={selectedData}
          authors={this.props.authors}
          handleSave={this.handleSave}
          handleUpdate={this.handleUpdate}
          setSelectedDataCallback={this.setSelectedDataCallback}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {
  book: { books: IBook[]; loading: any; error: any };
  authors: { authors: IAuthor[]; loading: any; error: any };
}) => ({
  books: state.book.books,
  loading: state.book.loading,
  error: state.book.error,
  authors: state.authors.authors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      fetchBooks: fetchBooks,
      updateBook: updateBook,
      deleteBook: deleteBook,
      createBook: createBook,
      fetchAuthors: fetchAuthors,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
