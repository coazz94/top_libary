document.addEventListener("DOMContentLoaded", () => {

    // Load the books in the array
    addBooks()
    loadBooks();

    // set the popup view to none
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
    

    // Fint the add new book button and load the popupscreen
    const add_book = document.querySelector("#addbutton");

    add_book.addEventListener("click", () =>{
        enablePopup(true);
    })


    const button_add = document.querySelector("#book_to_add");

    button_add.addEventListener("click", (event) => {
        addBookToLibary();
        enablePopup(false);
        document.querySelector(".books").innerHTML = "";
        loadBooks();
    })

})



function enablePopup(state){

    document.querySelector("#addbutton").style.display = state ? "none" : "block";
    document.querySelector(".books").style.display = state ? "none" : "block";
    document.querySelector(".popup").style.display = state ? "block" : "none";

}


let myLibary = [];


function Book(title, author, read, pages){
    this.title = title
    this.author = author
    this.read = read
    this.pages = pages

    this.status = read ? "read" : "not read"
 }

function addBooks(){
    const book1 = new Book("Harry Potter 1", "JKK", false, "555")
    const book2 = new Book("Harry Potter 2", "AFK", false, "365")
    const book3 = new Book("Harry Potter 3", "Nugato", false, "365")

    myLibary.push(book1, book2, book3)
}


function loadBooks(){

    // get the place where to books are gonna be stored
    const books_div = document.querySelector(".books");

    // loop over the Array with the books and add add for each book a new div
    for(let i = 0; i < myLibary.length; i++){

        let book = myLibary[i]

        // new book, id= book + counter
        let book_el = document.createElement("div")
        book_el.setAttribute("id", `book_${i+1}`)

        book_el.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <p>${book.status}</p>
        `


        books_div.append(book_el)
        
    }
}


function addBookToLibary(){


    
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    let book = new Book(title, author, false, pages);

    myLibary.push(book)


}



function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }