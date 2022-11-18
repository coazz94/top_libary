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

function Book(title, author, read, pages=0, id){
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

    // remove the displayed books
    document.querySelector(".books").innerHTML = "";

    // get the place where to books are gonna be stored
    const books_div = document.querySelector(".books");

    // loop over the Array with the books and add add for each book a new div
    for(let i = 0; i < myLibary.length; i++){

        // make the variables needed
        let book = myLibary[i]
        let read = book.read ? "read": "not read"
        let pages = parseInt(book.pages) > 0 ? book.pages : "/";
        let id = myLibary.indexOf(myLibary[i])

        // new book, id= book + counter
        let book_el = document.createElement("div");
        book_el.className=`card book_${i+1}`;

        // new cardbody
        let card_body = document.createElement("div");
        card_body.className=`card-body`;

        // make a card element fot each book
        card_body.innerHTML = `
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author: ${book.author} </p>
          <p class="card-text">Pages: ${pages} </p>
          <p class="card-text"> ${read}</p>
        `
        // make the buttons
        let buttons = makeButtonsForCard(id);

        card_body.append(buttons)

        // append them to the card
        book_el.append(card_body)

        // append the card to the books div
        books_div.append(book_el)
        
    }
}

function makeButtonsForCard(id){

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
            myLibary.splice(id, 1)
            loadBooks()
        })

        let read_b = document.createElement("button");
        read_b.setAttribute("id", `read_b`);
        read_b.innerHTML = "mark as read";

        // add a Eventlistenr to the button
        read_b.addEventListener("click", () => {
            // Change the status of the object by its lasts state
            myLibary[id].read ?  myLibary[id].read = false : myLibary[id].read = true
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
        let book = new Book(title.value, author.value, read.checked, pages.value);
        myLibary.push(book);
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

