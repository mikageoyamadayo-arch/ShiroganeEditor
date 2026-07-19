function showBook(book){

const detail = document.getElementById("bookDetail");

const date = books[book];

const chapterList = data.chapters
    .map(chapter => `<li>${chapter}</li>`)
    .join("");

detail.innerHTML = `

<h2>${data.title}</h2>

<p>${data.volume}</p>

<p>${data.description}</p>

<h3>📖 折一覧</h3>

<ul>
${chapterList}
</ul>

`;
    
}
