function showBook(book){

const detail = document.getElementById("bookDetail");

const data = books[book];

const chapterList = data.chapters
    .map(chapter => `
        <li>
            <button class="chapter-button" onclick="showChapter('${chapter}')">
                ${chapter}
            </button>
        </li>
    `)
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

function showChapter(chapter){
    alert(chapter);    
};
