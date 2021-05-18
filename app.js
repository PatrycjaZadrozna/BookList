const form = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'Meghan Doe',
                isbn: '34354343'
            },
            {
                title: 'Book Two',
                author: 'John Leon',
                isbn: 'fddd'
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML =
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.classList= `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

    function submit (e){
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if(title === '' || author === '' || isbn === ''){
            UI.showAlert('Please fill in all fields', 'danger')
        }else{
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        UI.showAlert('Book Added', 'success')
        UI.clearFields();

    }
}

function removeBook(e){
    UI.deleteBook(e.target);
    UI.showAlert("Book removed", 'success')
}

form.addEventListener('submit', submit);
bookList.addEventListener('click', removeBook);

document.addEventListener('DOMContentLoaded', UI.displayBooks);

