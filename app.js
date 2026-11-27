const seed = [
 {id:1,name:"Add your first game",type:"pc",launch:"",placeholder:true},
];
let games = JSON.parse(localStorage.getItem("hc-mobile-games") || "[]");
let filter = "all";
const $ = id => document.getElementById(id);
const list = $("games"), empty = $("emptyNote");
function save(){localStorage.setItem("hc-mobile-games",JSON.stringify(games));render();}
function render(){
 const q=$("search").value.toLowerCase();
 let shown=games.filter(g=>(filter==="all"||g.type===filter||(filter==="fav"&&g.fav))&&g.name.toLowerCase().includes(q));
 list.innerHTML="";
 shown.forEach(g=>{
  const card=document.createElement("article");card.className="game-card";
  card.innerHTML=`<div class="cover">HC</div><h3></h3><div class="meta">${g.type==="retro"?"RETRO GAME":"PC GAME"}</div><div class="card-actions"><button class="play">OPEN</button><button class="heart">${g.fav?"♥":"♡"}</button></div>`;
  card.querySelector("h3").textContent=g.name;
  card.querySelector(".play").onclick=()=>launch(g);
  card.querySelector(".heart").onclick=()=>{g.fav=!g.fav;save();};
  list.appendChild(card);
 });
 empty.style.display=shown.length?"none":"block";
}

function launch(g) {
  if (!g.launch) {
    alert("Please add a launch target first.");
    return;
  }

  if (/^https?:\/\//i.test(g.launch)) {
    window.location.href = g.launch;
    return;
  }

  if (
    g.launch === "org.ppsspp.ppsspp" ||
    g.launch.toLowerCase() === "ppsspp"
  ) {
    const intent =
      "intent://#Intent;" +
      "action=android.intent.action.MAIN;" +
      "category=android.intent.category.LAUNCHER;" +
      "package=org.ppsspp.ppsspp;" +
      "end";

    window.location.href = intent;
    return;
  }

  alert("Unsupported launch target.");
}

$("addBtn").onclick=()=>$("gameDialog").showModal();
$("browseBtn").onclick=()=>$("games").scrollIntoView({behavior:"smooth"});
$("search").addEventListener("input",render);
$("gameForm").addEventListener("submit",e=>{
 if(e.submitter?.value==="cancel")return;
 e.preventDefault();
 const name=$("gameName").value.trim();if(!name)return;
 games.unshift({id:Date.now(),name,type:$("gameType").value,launch:$("gameLaunch").value.trim(),fav:false});
 $("gameDialog").close();$("gameForm").reset();save();
});
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
 filter=b.dataset.filter;
 document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===filter));
 document.querySelectorAll(".navitem").forEach(x=>x.classList.toggle("selected",x.dataset.filter===filter));
 render();
}));
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();
