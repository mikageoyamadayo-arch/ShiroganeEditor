function showBook(book){

const detail=document.getElementById("bookDetail");

if(book==="hanaemi"){

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

<p>第1帖</p>

<div class="chapter-list">

<button>第1折　結成、特務部隊・白銀</button>

<button>第2折　カフェーという闇</button>

<button>第3折　それぞれの想い</button>

<button>第4折　終わりの始まり</button>

<button>第5折　追うものから追われるものへ</button>
</div>

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
