import React, { Component } from "react";
import ViewButton from "../components/ViewButton";
import SaveButton from "../components/SaveButton";
import SearchForm from "../components/SearchForm";
import { List, ListItem } from "../components/List";
import GoogleBookAPI from "../utils/GoogleBookAPI";
import StoredBooksAPI from "../utils/StoredBooksAPI";

class SearchPage extends Component {
  state = {
    search: "",
    results: []
  };

  componentDidMount() {
    this.searchGBooks("The Great Gatsby");
  }

  searchGBooks = (title) => {
    GoogleBookAPI.getBook(title)
      .then(res =>
        this.setState({ results: res.data.items })
      )
      .catch(err => console.log(err));
  };

  saveBook = book => {
    StoredBooksAPI.saveBook({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors
    })
      .then(res => this.searchGBooks(this.state.search))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchGBooks(this.state.search)
  };

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        {this.state.results.length ? (
          <List>
            {this.state.results.map(book => (
              <ListItem key={book.id}>
                <strong>
                  {book.volumeInfo.title} by {book.volumeInfo.authors}
                </strong>
                <SaveButton onClick={() => this.saveBook(book)} />
                <ViewButton href={book.volumeInfo.infoLink} />
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    );
  }
}

export default SearchPage;
