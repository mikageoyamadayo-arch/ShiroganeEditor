alert("editor.js 読み込み成功！");

const copyButton = document.getElementById("copyButton");
const chapterSelect = document.getElementById("chapterSelect");
const verseSelect = document.getElementById("verseSelect");
const verseTitle = document.getElementById("verseTitle");
const manuscript = document.getElementById("manuscript");
const characterCount = document.getElementById("characterCount");
const saveStatus = document.getElementById("saveStatus");
const newVerseButton = document.getElementById("newVerseButton");

let drafts = [];
let currentDraftId = null;


// 保存データを安全に読み込む
try {

    drafts =
        JSON.parse(localStorage.getItem("shiroganeDrafts")) || [];

} catch (error) {

    drafts = [];

}


// 文字数を表示
function updateCharacterCount() {

    const count = manuscript.value.length;

    characterCount.textContent = `文字数：${count}文字`;

}


// すべての原稿を保存
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


// 現在の原稿を読み込む
function loadCurrentDraft() {

    const draft = drafts.find(
        item => String(item.id) === String(currentDraftId)
    );

    if (!draft) {

        verseTitle.value = "";
        manuscript.value = "";

        updateCharacterCount();

        return;

    }

    verseTitle.value = draft.title || "";
    manuscript.value = draft.text || "";

    updateCharacterCount();

    saveStatus.textContent = "保存済み";

}


// 保存済みの句を表示
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

    const currentDraftExists = chapterDrafts.some(
        draft => String(draft.id) === String(currentDraftId)
    );

    if (!currentDraftExists) {

        currentDraftId = chapterDrafts[0].id;

    }

    verseSelect.value = currentDraftId;

    loadCurrentDraft();

}


// 新しい句を作成
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


// 現在の句を保存
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

    const selectedOption =
        verseSelect.querySelector(
            `option[value="${currentDraftId}"]`
        );

    if (selectedOption) {

        selectedOption.textContent =
            verseTitle.value || "題名未設定";

    }

    saveStatus.textContent = "保存しました";

}


// 折を変更
chapterSelect.addEventListener("change", function () {

    currentDraftId = null;

    updateVerseSelect();

});


// 保存済みの句を変更
verseSelect.addEventListener("change", function () {

    currentDraftId = verseSelect.value;

    loadCurrentDraft();

});


// 題名を入力
verseTitle.addEventListener("input", function () {

    saveCurrentDraft();

});


// 本文を入力
manuscript.addEventListener("input", function () {

    updateCharacterCount();
    saveCurrentDraft();

});


// 新しい句を作る
newVerseButton.addEventListener("click", function () {

    createNewVerse();

});


// 本文をコピー
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


// 最後に選んでいた折を復元
const lastChapter = localStorage.getItem("lastChapter");

if (lastChapter) {

    chapterSelect.value = lastChapter;

}


// 最初の原稿を表示
updateVerseSelect();
updateCharacterCount();
