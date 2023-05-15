let myLibrary = [];
let index = 1;
const container = document.getElementById("form-container");
const edit = document.getElementById("edit");
const del = document.getElementById("delete");
const formContainer = document.getElementById('form-container');
const myForm = document.getElementById("myForm");

// Get user input values
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const radioYes = document.getElementById("yes");
const radioNo = document.getElementById("no");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function displayBooksintoHtml() {

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const div = document.createElement("div");
    div.classList.add("form-item");

    div.setAttribute('id', `form-item-${index}`);
    div.innerHTML = "<div>" + book.title + "</div><div>" + book.author + "</div><div>" + book.pages + `</div><div id=${index}>` + book.read + "</div>";
    
    const editClone = edit.cloneNode(true);
    editClone.setAttribute('id', `edit-${index}`);
    editClone.addEventListener("click", editRead);
    div.appendChild(editClone);
    
    const delClone = del.cloneNode(true);
    delClone.setAttribute('id', `del-${index}`);
    delClone.addEventListener("click", delChild);
    div.appendChild(delClone);

    container.appendChild(div);
    index = index + 1;
    myLibrary = [];
  }
}

function delChild(e) {
  const Id = e.target.parentNode.id;
  const num = Id.slice(-1);
  const child = document.getElementById(`form-item-${num}`);
  formContainer.removeChild(child);
}

function editRead(e) {
  const editId = e.target.parentNode.id;
  const editNum = editId.slice(-1);
  let Edit = document.getElementById(`${editNum}`);
  let readStatus = Edit.textContent;
  if (readStatus === "Not Read") {
    readStatus = "Read";
  } else {
    readStatus = "Not Read";
  }

  Edit.textContent = readStatus;
}

function editBible() {
  let Edit = document.getElementById('0');
  let readStatus = Edit.textContent;
  if (readStatus === "Not Read") {
    readStatus = "Read";
  } else {
    readStatus = "Not Read";
  }

  Edit.textContent = readStatus;
}

function openForm() {
  myForm.style.display = "flex";
  formContainer.style.display = "none";
}

function returnForm() {
  myForm.style.display = "none";
  formContainer.style.display = "flex";
}


radioYes.addEventListener("click", function() {
  radioNo.checked = false;
});


radioNo.addEventListener("click", function() {
  radioYes.checked = false;
});

myForm.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  let radio = "";

  if (radioYes.checked === true) {
    radio = "Read";
  } else {
    radio = "Not Read";
  }

  myLibrary.push(new Book(title, author, pages, radio));

  displayBooksintoHtml();

  returnForm ();

  myForm.reset();
});