const addBook = document.querySelector('#add-book');
const form = document.querySelector('#form-overlay');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readCheck = document.querySelector('#read');
const appendBook = document.querySelector('#append-book');
const deleteBookEntry = document.querySelector('#delete-book');
const cancelBookEntry = document.querySelector('#cancel-button')
const bookCollection = document.querySelector('#book-collection');
const clearLastBookButton = document.querySelector('#clear-last-book')
const clearEverythingButton = document.querySelector('#clear-everything');

let myLibrary = [];


function displayBookForm(){
  form.style.display = 'block';
}

function hideBookForm(){
  form.style.display = 'none';
}

function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  if(read.checked){
     this.Read = 'completed'
    } else if(!read.checked){
      this.Read = 'reading'
    }
  }


function displayBook(){
  bookCollection.innerHTML = '';
    
  for(let i = 0; i < myLibrary.length; i++){
    let bookSection = document.createElement('li');
    
    const removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    removeButton.setAttribute('id', 'remove');

    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.setAttribute('id', 'update');
    
    
    bookSection.innerHTML = `
    Title: ${myLibrary[i].Title} <br>
    Author: ${myLibrary[i].Author} <br>
    Pages: ${myLibrary[i].Pages} <br>
    Read Status: ${myLibrary[i].Read}<br>`
    
    bookSection.appendChild(removeButton);
    bookSection.appendChild(updateButton);
    bookCollection.appendChild(bookSection);
    
    removeButton.onclick = function(){
      this.parentElement.remove();
      myLibrary.splice(i, 1);
    }
    updateButton.onclick = function(){
      if(myLibrary[i].Read === 'reading'){
        myLibrary[i].Read = 'completed';

        bookSection.innerHTML = `
        Title: ${myLibrary[i].Title} <br>
        Author: ${myLibrary[i].Author} <br>
        Pages: ${myLibrary[i].Pages} <br>
        Read Status: ${myLibrary[i].Read}<br>`
        
        bookSection.appendChild(removeButton);
        bookSection.appendChild(updateButton);

      } else if (myLibrary[i].Read === 'completed'){
        myLibrary[i].Read = 'reading';

        bookSection.innerHTML = `
        Title: ${myLibrary[i].Title} <br>
        Author: ${myLibrary[i].Author} <br>
        Pages: ${myLibrary[i].Pages} <br>
        Read Status: ${myLibrary[i].Read}<br>`
        
        bookSection.appendChild(removeButton);
        bookSection.appendChild(updateButton);
      }
    }
    
  }
}

function addBookToLibrary() {
  let newBook = new Book(title.value, author.value, pages.value, readCheck);
      
    if(!title.value || !author.value || !pages.value) {
      alert('Please fill everything out in the form.');
    }else{
      myLibrary.push(newBook);
    }   
      displayBook()
      hideBookForm()
  }

function removeLastBookEntry(){
  bookCollection.removeChild(bookCollection.lastChild);
  myLibrary.pop();
}

function clearAllBookEntry(){
  bookCollection.innerHTML = '';
  myLibrary.length = 0;
}

addBook.addEventListener('click', displayBookForm);
appendBook.addEventListener('click', addBookToLibrary);
cancelBookEntry.addEventListener('click', hideBookForm);
clearLastBookButton.addEventListener('click', removeLastBookEntry);
clearEverythingButton.addEventListener('click', clearAllBookEntry);