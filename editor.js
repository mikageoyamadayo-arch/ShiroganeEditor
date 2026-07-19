const copyButton = document.getElementById("copyButton");
const chapterSelect = document.getElementById("chapterSelect");
const verseSelect = document.getElementById("verseSelect");
const verseTitle = document.getElementById("verseTitle");
const manuscript = document.getElementById("manuscript");
const characterCount = document.getElementById("characterCount");
const saveStatus = document.getElementById("saveStatus");
const newVerseButton = document.getElementById("newVerseButton");

let drafts = JSON.parse(localStorage.getItem("shiroganeDrafts")) || [];
let currentDraftId = null;


// 文字数を表示
function updateCharacterCount() {

    const count = manuscript.value.length;

    characterCount.textContent = `文字数：${count}文字`;

}


// 原稿一覧をプルダウンへ表示
function updateVerseSelect() {

    const selectedChapter = chapterSelect.value;

    const chapterDrafts = drafts.filter(
        draft => draft.chapter === selectedChapter
    );

    verseSelect.innerHTML = chapterDrafts
        .map(draft => `
            <option value="${draft.id}">
                ${draft.title || "題名未設定"}
            </option>
        `)
        .join("");

    if (chapterDrafts.length === 0) {

        createNewVerse();

        return;

    }

    if (
        !chapterDrafts.some(
            draft => String(draft.id) === String(currentDraftId)
        )
    ) {

        currentDraftId = chapterDrafts[0].id;

    }

    verseSelect.value = currentDraftId;

    loadCurrentDraft();

}


// 選択中の原稿を読み込む
function loadCurrentDraft() {

    const draft = drafts.find(
        item => String(item.id) === String(currentDraftId)
    );

    if (!draft) {
        return;
    }

    verseTitle.value = draft.title;
    manuscript.value = draft.text;

    updateCharacterCount();

    saveStatus.textContent = "保存済み";

}


// 新しい句を作る
function createNewVerse() {

    const newDraft = {
        id: Date.now(),
        chapter: chapterSelect.value,
        title: "",
        text: ""
    };

    drafts.push(newDraft);

    currentDraftId = newDraft.id;

    saveAllDrafts();

    updateVerseSelect();

    verseTitle.focus();

    saveStatus.textContent = "新しい句を作成しました";

}


// 現在の原稿を保存
function saveCurrentDraft() {

    const draft = drafts.find(
        item => String(item.id) === String(currentDraftId)
    );

    if (!draft) {
        return;
    }

    draft.chapter = chapterSelect.value;
    draft.title = verseTitle.value;
    draft.text = manuscript.value;

    saveAllDrafts();

    updateCharacterCount();

    const selectedOption =
        verseSelect.querySelector(`option[value="${currentDraftId}"]`);

    if (selectedOption) {

        selectedOption.textContent =
            verseTitle.value || "題名未設定";

    }

    saveStatus.textContent = "保存しました";

}


// 原稿を端末へ保存
function saveAllDrafts() {

    localStorage.setItem(
        "shiroganeDrafts",
        JSON.stringify(drafts)
    );

    localStorage.setItem(
        "lastChapter",
        chapterSelect.value
    );

}


// 折を変更したとき
chapterSelect.addEventListener("change", function () {

    currentDraftId = null;

    updateVerseSelect();

});


// 保存済みの句を変更したとき
verseSelect.addEventListener("change", function () {

    currentDraftId = verseSelect.value;

    loadCurrentDraft();

});


// 題名を入力したとき
verseTitle.addEventListener("input", saveCurrentDraft);


// 本文を入力したとき
manuscript.addEventListener("input", saveCurrentDraft);


// 新しい句ボタン
newVerseButton.addEventListener("click", createNewVerse);


// 最後に選んでいた折を復元
const lastChapter = localStorage.getItem("lastChapter");

if (lastChapter) {

    chapterSelect.value = lastChapter;

}

// 最初の原稿を表示
updateVerseSelect();

copyButton.addEventListener("click", async function () {

    try {

        await navigator.clipboard.writeText(manuscript.value);

        saveStatus.textContent = "本文をコピーしました";

    } catch (error) {

        manuscript.select();

        document.execCommand("copy");

        saveStatus.textContent = "本文をコピーしました";

    }

});

