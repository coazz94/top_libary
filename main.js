document.addEventListener("DOMContentLoaded", () => {

    // Load the books in the array
    addBooks()
    loadBooks();

    // set the popup visibility to hidden
    document.querySelector(".popup").style.visibility='hidden';
    
    // Fint the add new book button and load the popupscreen
    const add_book = document.querySelector("#addbutton");

    add_book.addEventListener("click", () =>{
        enablePopup(true);
    })

    // add a new book to the libary
    const button_add = document.querySelector("#book_to_add");

    button_add.addEventListener("click", () => {

        if (addBookToLibary()){
            console.log("here")
            enablePopup(false);
            loadBooks();
        }
    })

})

let myLibary = [];


function enablePopup(state){


    document.querySelector("#addbutton").style.visibility = state ? "hidden" : "visible";
    document.querySelector(".books").style.visibility = state ? "hidden" : "visible";
    document.querySelector(".popup").style.visibility = state ? "visible" : "hidden";

}



class Books {
    constructor(
        title = "none",
        author = "none",
        pages = 0,
        status = "not read",

    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    changeStatus(status){
        this.status = status;
    }
}


class Libary {
    constructor(){
        this.books = []
    }

    addBook(newBook){
        this.books.push(newBook)
    }

    removeBook(title){
        this.books = this.books.filter((e) => e.title != title)
    }

    loadBooks(){
        return this.books
    }

    getPosition(book){
        return this.books.indexOf(book)
    }

    markAsRead(title){
        for(let i = 0; i < this.books.length; i++){
            if(this.books[i].title === title){
                let status = this.books[i].status === "read" ? "not read": "read";
                this.books[i].changeStatus(status);
            }
        }
    }


}


const libary = new Libary;


function addBooks(){
    const book1 = new Books ("Harry Potter 1", "JKK", "555");
    const book2 = new Books ("Harry Potter 2", "AFK","365");
    const book3 = new Books ("Harry Potter 3", "Nugato","365");

    libary.addBook(book1)
    libary.addBook(book2)
    libary.addBook(book3)
}

function loadBooks(){

    // remove the displayed books
    document.querySelector(".books").innerHTML = "";

    // get the place where to books are gonna be stored
    const books_div = document.querySelector(".books");

    let lib = libary.loadBooks()


    // loop over the Array with the books and add add for each book a new div
    for(let i = 0; i < lib.length; i++){


        // make the variables needed
        let book = lib[i]
        let pages = parseInt(book.pages) > 0 ? book.pages : "/";

        // new book, id= book + counter
        let book_el = document.createElement("div");
        book_el.className=`card book_${i+1}`;
        // new cardbody
        let card_body = document.createElement("div");
        card_body.className=`card-body`;

        console.log(book.status)

        // make a card element fot each book
        card_body.innerHTML = `
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author: ${book.author} </p>
          <p class="card-text">Pages: ${pages} </p>
          <p class="card-text"> ${book.status}</p>
        `
        // make the buttons
        let buttons = makeButtonsForCard(book.title);

        card_body.append(buttons)

        // append them to the card
        book_el.append(card_body)

        // append the card to the books div
        books_div.append(book_el)
        
    }
}

function makeButtonsForCard(title){

        // make  div for the button
        let buttons= document.createElement("div");
        buttons.className = "button_position";

        // make the button
        let remove_b = document.createElement("button");
        remove_b.setAttribute("id", `remove_b`);
        remove_b.innerHTML = "remove this book";



        // add a Eventlistenr to the button
        remove_b.addEventListener("click", () => {
            // delete the element at the position id, load the books again
            libary.removeBook(title)
            loadBooks()
        })

        let read_b = document.createElement("button");
        read_b.setAttribute("id", `read_b`);
        read_b.innerHTML = "mark as read";

        // add a Eventlistenr to the button
        read_b.addEventListener("click", () => {
            // Change the status of the object by its lasts state
            libary.markAsRead(title);
            loadBooks()
        })

        // append the 2 buttons to the buttons div
        buttons.append(remove_b, read_b)

        // return the div
        return buttons
}

function addBookToLibary(){

    // Grab the inputed values
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");


    // Check if the title author
    let state = checkInput(title.value, author.value);

    // if so, proceed and make a new book and add it to the libary
    if (state){
        let book = new Books(title.value, author.value, pages.value, read.checked);
        libary.addBook(book);
        // clean the input fields
        cleanPopup(title, author, read, pages);
        // Return True
        return true;
    }
    // if ome error return false
    return false
}

function checkInput(title, author){
    
    // title or author arent allowed to be empty
    if (title.length <= 4 || author === ""){
        document.querySelector("#errormessage")
        .innerHTML = "You have to input a Title, Author and check the Read button"
        return false
    }else{
        return true
    }

}

function cleanPopup(title, author, read){

    // Clear the error message and the input field
    document.querySelector("#errormessage").innerHTML = "";
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

}

function mySubmitFunction(e) {
    e.preventDefault();
    return false;
}

