const verseTitle = document.getElementById("verseTitle");
const manuscript = document.getElementById("manuscript");
const characterCount = document.getElementById("characterCount");
const saveStatus = document.getElementById("saveStatus");

// 保存済みの内容を読み込む
verseTitle.value = localStorage.getItem("verseTitle") || "";
manuscript.value = localStorage.getItem("manuscript") || "";

// 最初の文字数を表示する
updateCharacterCount();

function updateCharacterCount() {

    const count = manuscript.value.length;

    characterCount.textContent = `文字数：${count}文字`;

}

function saveManuscript() {

    localStorage.setItem("verseTitle", verseTitle.value);
    localStorage.setItem("manuscript", manuscript.value);

    updateCharacterCount();

    saveStatus.textContent = "保存しました";

}

// 題名を入力したとき
verseTitle.addEventListener("input", saveManuscript);

// 本文を入力したとき
manuscript.addEventListener("input", saveManuscript);
