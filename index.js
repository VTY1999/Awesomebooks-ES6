/* eslint-disable no-multi-assign */
// eslint-disable-next-line max-classes-per-file
import currentDate from './modules/date.js';
import Book from './modules/books.js';

class UI {
  static displayBooks() {
    // eslint-disable-next-line no-use-before-define
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('div');
    row.setAttribute('id', 'row');
    row.innerHTML = `
        <p class="row-btn">${book.title} by ${book.author}</p>
        <input class ="button delete" type="submit" value="Remove">
      `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#btitle').value = '';
    document.querySelector('#author').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#btitle').value;
  const author = document.querySelector('#author').value;
  document.querySelector('.form-inputs').value = '';
  document.querySelector('.form-inputs1').value = '';
  const book = new Book(title, author);
  UI.addBookToList(book);

  Store.addBook(book);

  UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.previousElementSibling.textContent);
});

const bookList = document.querySelector('#book-list');
const listHead = document.querySelector('.list-head');
const bookForm = document.querySelector('#form');
const addBookTitle = document.querySelector('.add-book-title');
const contactInfo = document.querySelector('.contact-info');

const Toogle = () => {
  bookList.style.display = 'block';
  bookForm.style.display = 'none';
  addBookTitle.style.display = 'none';
  listHead.style.display = 'block';
  contactInfo.style.display = 'none';
};

document.querySelector('#List').addEventListener('click', () => {
  Toogle();
});

const addToogle = () => {
  bookList.style.display = 'none';
  bookForm.style.display = 'block';
  addBookTitle.style.display = 'block';
  listHead.style.display = 'none';
  contactInfo.style.display = 'none';
};

document.querySelector('#add-new').addEventListener('click', () => {
  addToogle();
});

const contactToogle = () => {
  bookList.style.display = 'none';
  bookForm.style.display = 'none';
  addBookTitle.style.display = 'none';
  contactInfo.style.display = 'block';
  listHead.style.display = 'none';
};

document.querySelector('#contact').addEventListener('click', () => {
  contactToogle();
});

const websiteDate = document.querySelector('.date');
setInterval(() => {
  websiteDate.innerHTML = `${currentDate()}`;
}, 1000);
