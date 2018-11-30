import React, { Component } from "react";
import DeleteButton from "../components/DeleteButton";
import ViewButton from "../components/ViewButton";
import { List, ListItem } from "../components/List";
import { Col, Row, Container } from "../components/Grid";
import StoredBooksAPI from "../utils/StoredBooksAPI";

class SavedList extends Component {
  state = {
    books: {}
  };

  deleteBook = id => {
    StoredBooksAPI.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  loadBooks = () => {
    StoredBooksAPI.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                    <DeleteButton onClick={() => this.deleteBook(book._id)} />
                    <ViewButton href={book.link}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedList;
