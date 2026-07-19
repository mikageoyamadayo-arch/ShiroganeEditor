ffunction showBook(book){

const detail = document.getElementById("bookDetail");

const data = books[book];

detail.innerHTML = `

<h2>${data.title}</h2>

<p>${data.volume}</p>

<p>${data.description}</p>

`;

}
