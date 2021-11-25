/*  
    possible features to implement: 
        edit book progress
        target finish reading date and number of pages to be read in a day 
 */

const myLibrary = [];

const regexNumbersOnly = /^[0-9]+$/;
const displayContainer = document.getElementById('display-container');

let title, author, totalPages, pagesRead;

// constructor function for Book objects
function Book(title, author, totalPages, pagesRead) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.pagesRead = pagesRead;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead ? 'book read' : 'not read yet'}`;
    this.id = `${title.replace(/\s+/g, '')}-${author.replace(/\s+/g, '')}`;
}

// pushes the Book object onto myLibrary
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// returns false if either pages input are not a positive integer or if pagesRead > totalPages
function validateInput(title, author, totalPages, pagesRead) {
    if (!title) {
        alert('Books tend to have titles!');
        return false;
    } else if (!author) {
        alert('Authors tend to have names!');
        return false;
    } else if (!totalPages.match(regexNumbersOnly)) {
        alert('Oi! Total Pages should be positive integers only!');
        return false;
    } else if (totalPages == 0){
        alert('A book with 0 pages?! Try again!')
        return false;
    } else if (!pagesRead.match(regexNumbersOnly)) {
        alert('Oi! Pages Read should be positive integers only!');
        return false;
    }
    totalPages = Number(totalPages);
    pagesRead = Number(pagesRead);
    if (pagesRead > totalPages) {
        alert('Pages Read cannot exceed Total Pages');
        return false;
    }
    return true;
}

// retrieves the information enetered into the input fields and adds it to myLibrary
function addBook(ev) {
    title = document.getElementById('title').value.trim();
    author = document.getElementById('author').value.trim();
    totalPages = document.getElementById('total-pages').value.trim();
    pagesRead = document.getElementById('pages-read').value.trim();

    ev.preventDefault();
    if (!validateInput(title, author, totalPages, pagesRead)) return;
    let newBook = new Book(title, author, totalPages, pagesRead);
    document.querySelector('form').reset();
    addBookToLibrary(newBook);
    console.warn('added', {myLibrary});
   
    // book Objects added to myLibrary[] shows up on the site
    displayBook();
}

// creates and returns the element to be displayed on the page
function createBookNode() {
    let currentBook = myLibrary[myLibrary.length - 1];
    let bookProgress = Math.floor(currentBook.pagesRead / currentBook.totalPages * 100);
    let mainContainer  = document.createElement('div');
    let bookLeft = document.createElement('div');
    let bookRight = document.createElement('div');
    let progressSection = document.createElement('div');
    let progressBar = document.createElement('div');
    let progressFill = document.createElement('div');
    let progressStatus = document.createElement('div');
    let bookTitle = document.createElement('h3');
    let bookAuthor = document.createElement('p');
    let totalPages = document.createElement('p');
    let delIcon = document.createElement('img');
    
    mainContainer.setAttribute('class', 'book container');
    mainContainer.setAttribute('id', currentBook.id);
    bookLeft.setAttribute('class', 'book-left');
    bookRight.setAttribute('class', 'book-right');
    bookTitle.setAttribute('class', 'book title');
    bookTitle.textContent = currentBook.title;
    bookAuthor.setAttribute('class', 'book author');
    bookAuthor.textContent = currentBook.author;
    progressSection.setAttribute('class', 'book progress-section');
    progressBar.setAttribute('class', 'book progress-bar');
    progressFill.setAttribute('class', 'book progress-fill')
    progressFill.setAttribute('style', `width: ${bookProgress}%`);
    progressStatus.setAttribute('class', 'book progress-status');
    progressStatus.textContent = `${bookProgress}%`;
    totalPages.setAttribute('class', 'book total-pages');
    totalPages.textContent = `${currentBook.totalPages} pages`;
    delIcon.setAttribute('src', './images/delete1.svg');
    delIcon.setAttribute('alt', 'delete');
    delIcon.setAttribute('class', 'delete-icon');
    
    progressBar.appendChild(progressFill);
    progressSection.appendChild(progressBar);
    progressSection.appendChild(progressStatus);
    bookLeft.appendChild(bookTitle);
    bookLeft.appendChild(bookAuthor);
    bookLeft.appendChild(progressSection);
    bookLeft.appendChild(totalPages);
    bookRight.appendChild(delIcon);
    mainContainer.appendChild(bookLeft);
    mainContainer.appendChild(bookRight);

    return mainContainer;
}

// updates the page with the created element
function displayBook() {
    let bookNode = createBookNode();
    displayContainer.appendChild(bookNode);
}

// deletes the book clicked by user
const delBook = (ev) => {
    let targetBookId = ev.target.parentNode.parentNode.id;
    myLibrary.splice(myLibrary.findIndex(book => book.id === targetBookId), 1)
    displayContainer.removeChild(ev.target.parentNode.parentNode);
    console.warn('deleted', targetBookId);
}


// fills up the library and webpage with example books that can be deleted if desired
(function initializeLibrary() {
    let defaultBook1 = new Book('Deep Work', 'Newport, Cal', '263', '72');
    addBookToLibrary(defaultBook1);
    displayBook();
    let defaultBook2 = new Book('Dune', 'Herbert, Frank', '412', '12');
    addBookToLibrary(defaultBook2);
    displayBook();
})();

// user clicking the submit button set off the addBook function
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-btn').addEventListener('click', addBook);
    for(let button of document.getElementsByClassName('delete-icon')) {
        // function here to add hover event listener
        button.addEventListener('click', delBook);
    }
});
