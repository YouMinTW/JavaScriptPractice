class Book{
  constructor(title, author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}
class UI{
  // show alert
  showAlert(condition, message){
    const messagebox = document.createElement("div");
    messagebox.className = `alert ${condition}`;
    const textNode = document.createTextNode(message);
    messagebox.appendChild(textNode);
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(messagebox, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    },3000)
  }
  // add to list proto
  addList(book){
    const tableBody = document.querySelector("tbody");
    const row = document.createElement("tr")
    row.innerHTML = 
            `         
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><a href="" class="delete">X</a></td>
            `
    tableBody.appendChild(row);
  }
  // delete list proto
  deleteBook(target) { 
    target.parentElement.parentElement.remove();
  }
  // clear input proto
  clearInputField() {
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";
  }

}

class Store{
  static getBook(){
    let books;
    if(localStorage.getItem("books")===null){
      books=[];
    } else {
      books=JSON.parse(localStorage.getItem("books"));
    }
    // 要記得return
    return books;
  }
  static displayBooks(){
    const books = Store.getBook();
    books.forEach(function (book) {
      const ui = new UI;
      ui.addList(book);
    });
  }
  static addBook(book){
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBook();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index,1);
      }
      localStorage.setItem("books", JSON.stringify(books));
    });
  }
}


LoadListeners();

function LoadListeners() {
  document.addEventListener("DOMContentLoaded", Store.displayBooks);
  document.querySelector("#book-form").addEventListener("submit", addNewBook);
  document.querySelector("table").addEventListener("click", deleteBook);
}

//add 
function addNewBook(e){
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  isbn = document.querySelector("#isbn").value;
  const ui = new UI();
  if(title=== ''|author=== ''|isbn===""){
    ui.showAlert("error","Please fill in all fields");
  } else{
    ui.showAlert("success","Book added");
    const book = new Book(title, author, isbn);
    ui.addList(book);
    Store.addBook(book);
  }
  // clear the input
  ui.clearInputField();

  e.preventDefault();
}


//delete 
 function deleteBook (e) {
  const ui = new UI();
  
  if(e.target.className==="delete"){
    ui.deleteBook(e.target);
    ui.showAlert('success','Book Removed!');
    // ISBN no. == e.target.parentElement.previousElementSibling.textContent
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
  e.preventDefault();
}

