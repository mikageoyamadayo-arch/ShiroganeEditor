function showBook(book){

const detail=document.getElementById("bookDetail");

if(book==="hanawarai"){

detail.innerHTML=`

<h2>🐤 花笑の箒星</h2>

<p>

白銀が護りし緋の神子　第0帖。

憩ちゃんの鳥籠時代の物語。

</p>

`;

}

if(book==="kinka"){

detail.innerHTML=`

<h2>🌸 金霞の五星</h2>

<p>

白銀が護りし緋の神子　第1帖。

白銀8人の出会いを描く物語。

</p>

`;

}

if(book==="ginrei"){

detail.innerHTML=`

<h2>❄️ 銀嶺の秘鑰</h2>

<p>

白銀が護りし緋の神子　第2帖。

北領で明かされる真実の物語。

</p>

`;

}

}
