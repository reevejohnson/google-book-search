import axios from "axios";

const APIKEY = "AIzaSyBgMiRTHKXEyL5MBZjBYUysYMBWulTvmeY";

export default {
  // Gets the book with title and author's last name
  getBook: function(title) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${APIKEY}`);
  }
};
