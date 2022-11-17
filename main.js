document.addEventListener("DOMContentLoaded", () => {

    loadBooks();

    const add_book = document.querySelector("#addbutton");

    add_book.addEventListener("click", () =>{

        addBookToLibary();
        document.querySelector(".books").innerHTML = "";
        loadBooks();
    })



})




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





let myLibary = [];



const book1 = new Book("Harry Potter 1", "JKK", false, "555")
const book2 = new Book("Harry Potter 2", "AFK", false, "365")
const book3 = new Book("Harry Potter 3", "Nugato", false, "365")


myLibary.push(book1, book2, book3)



function Book(title, author, read, pages){
    this.title = title
    this.author = author
    this.read = read
    this.pages = pages

    this.status = read ? "read" : "not read"
 }







function addBookToLibary(){
    
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    let book = new Book(title, author, false, pages);

    myLibary.push(book)


}



