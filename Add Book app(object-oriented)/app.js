LoadListeners();


function LoadListeners() {
  document.addEventListener("DOMContentLoaded", LoadBookInLocalStorage);
  document.querySelector("#book-form").addEventListener("submit", addNewBook);
  document.querySelector("table").addEventListener("click", deleteBook);
}


// book constructor
function Book(title, author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}
// ui constructor
function UI(){

}
//ui book prototype
  // show alert
UI.prototype.showAlert=function(condition, message){
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
UI.prototype.addList=function(book){
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
  storeBookInLocalStorage(book);
}
  // delete list proto
UI.prototype.deleteBook = function(target) { 
  target.parentElement.parentElement.remove();
  // ISBN no. == target.parentElement.previousElementSibling.innerText
  /*-----------------------------*\
  innerText是IE 8之前IE專用屬性，innerText並不是國際規範的一部分，
  是只早期在IE擁有高市佔率時，大家都已經習慣使用它。
  Chrome是採用兩者都支援的方式，但Firefox比較嚴謹，不是規範的內容就不支援。

  目前規範正式定義的是textContent屬性。但使用textContent又會碰到IE 8（含）之前不支援textContent屬性的問題，IE要到9才有支援textContent屬性。
  \*-----------------------------*/
  removeBookfromLocalStorage(target.parentElement.previousElementSibling.innerText);
}
  // clear input proto
UI.prototype.clearInputField = function(){
  document.querySelector("#title").value="";
  document.querySelector("#author").value="";
  document.querySelector("#isbn").value="";
}




//add 
function addNewBook(e){
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  isbn = document.querySelector("#isbn").value;
  const ui = new UI();
  // if(title|author|isbn===""){ 錯了
    if(title=== ''|author=== ''|isbn===""){
    ui.showAlert("error","Please fill in all fields");
  } else{
    ui.showAlert("success","Book added");
    const book = new Book(title, author, isbn);
    ui.addList(book);
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
  }
  e.preventDefault();
}


//Local Storage stuff

function storeBookInLocalStorage(book){
  let books;
  if(localStorage.getItem("books")===null){
    books=[];
  } else {
    books=JSON.parse(localStorage.getItem("books"));
  }
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function removeBookfromLocalStorage(ISBN){
  let books;
  if(localStorage.getItem("books")===null){
    books=[];
  } else {
    books=JSON.parse(localStorage.getItem("books"));
  }
  books.forEach(function(book, index) {
    if(book.isbn===ISBN){
      books.splice(index,1);
    }
  })
  localStorage.setItem("books", JSON.stringify(books));
}

function LoadBookInLocalStorage(){
  let books;
  if(localStorage.getItem("books")===null){
    books=[];
  } else {
    books=JSON.parse(localStorage.getItem("books"));
  }
  books.forEach(function(book) {
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
  });

}