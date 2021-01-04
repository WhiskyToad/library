let myLibrary = [];

function book(title, author, pages, status){
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.status = status;
}

function addBookToLibrary(){ // still to do and checks on values and escape the error
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let status = document.querySelector('input[type = radio]:checked').value;
    myLibrary.push(new book(title, author, pages, status));
    render();
}

function render(){
    const container = document.getElementById('container');
    container.innerHTML = '';
    if (myLibrary.length > 0){
        for ( let i = 0; i < myLibrary.length; i++){
            const book = document.createElement('div');
            const header = document.createElement('h2');
            const summary = document.createElement('div');
            const remove = document.createElement('button');
            const readStatus = document.createElement('button');
            container.appendChild(book);
            book.appendChild(header);
            book.appendChild(summary);
            book.appendChild(remove);
            book.classList.add('card');
            if (myLibrary[i].status === 'read'){
                book.classList.add('read');
            }else {
                book.classList.add('unread');
                book.appendChild(readStatus);
                readStatus.textContent = 'Mark as read';
                readStatus.setAttribute('id', 'statusChange')
                readStatus.classList.add(i);
                const markAsRead = document.querySelectorAll('#statusChange');
                markAsRead.forEach(button => button.addEventListener('click', nowRead));
            }
            header.textContent = myLibrary[i].title;
            summary.textContent = `Written by ${myLibrary[i].author}, ${myLibrary[i].pages} pages, ${myLibrary[i].status}.`;
            remove.textContent = 'Remove from library';
            remove.setAttribute('id', 'remove')
            remove.classList.add(i)
            const removeBook = document.querySelectorAll('#remove');
            removeBook.forEach(button => button.addEventListener('click', deleteFromLibrary));

        }
    }
}

function deleteFromLibrary(){
    let location = this.classList;
    myLibrary.splice(location, 1);
    render();
}

function showForm(){
    if (document.getElementById('form').style.display === 'block'){
        document.getElementById('form').style.display = 'none';
    }else {document.getElementById('form').style.display = 'block';
    }
}

function nowRead(){
    let location = this.classList;
    myLibrary[location].status = 'read';
    render();
}

    
const show = document.querySelectorAll('#show');
show.forEach(button => button.addEventListener('click', showForm));

const removeBook = document.querySelectorAll('#remove');
removeBook.forEach(button => button.addEventListener('click', deleteFromLibrary));

document.getElementById('submit').addEventListener('click', addBookToLibrary);


