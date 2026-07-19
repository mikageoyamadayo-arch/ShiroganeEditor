function showBook(book){

const detail = document.getElementById("bookDetail");

const data = books[book];

const chapterList = data.chapters
    .map(chapter => `
        <li>
            <button 
               class="chapter-button" 
               onclick="showChapter('${book}', ${index})"
            >
                ${chapter.title}
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

    <div id="chapterDetail"></div>

 `;
}

function showChapter(book, chapterIndex) {
    
    const chapterDetail = document.getElementById("chapterDetail");

    const chapter = books[book].chapters[chapterIndex];

    const verseList = chapter.verses
        .map(verse => `<li>${verse}</li>`)
        .join("");

    chapterDetail.innerHTML = `
        <h3>${chapter.title}</h3>

        <h4>🖋️ 句一覧</h4>

        <ul>
            ${verseList || "<句はまだ登録されていません</li>"}
        </ul>
          
    `;
 
}
