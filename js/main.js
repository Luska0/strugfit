const A={
 "muaythai": "images/modalidades/muaythai.jpg",
 "karate": "images/modalidades/karate.jpg",
 "judoadulto": "images/modalidades/judoadulto.jpg",
 "judokids": "images/modalidades/judokids.jpg",
 "crosstraining": "images/modalidades/crosstraining.jpg",
 "funcional": "images/modalidades/funcional.jpg",
 "hitpower": "images/modalidades/hitpower.jpg",
 "musculacao": "images/modalidades/musculacao.jpg",
 "natacao": "images/modalidades/natacao.jpg",
 "hidro": "images/modalidades/hidro.jpg",
 "pilates": "images/modalidades/pilates.jpg",
 "alongamento": "images/modalidades/alongamento.jpg",
 "zumba": "images/modalidades/zumba.jpg",
 "ritmos": "images/modalidades/ritmos.jpg"
};
const M=[["Muay Thai","muaythai","Técnica de golpes, condicionamento e disciplina."],["Karatê","karate","Disciplina, respeito e técnica precisa."],["Judô Adulto","judoadulto","Projeções, equilíbrio e controle do corpo."],["Judô Kids","judokids","Coordenação, respeito e confiança para crianças."],["Cross Training","crosstraining","Treinos variados de força e condicionamento."],["Funcional","funcional","Movimentos funcionais para força e mobilidade."],["HitPower","hitpower","Aula intensa inspirada em lutas, para queimar energia."],["Musculação","musculacao","Treino de força livre no horário da academia."],["Natação","natacao","Aulas para quem tem 5 anos ou mais."],["Hidroginástica","hidro","Exercício na água com baixo impacto."],["Pilates","pilates","Controle, postura e fortalecimento do corpo."],["Alongamento","alongamento","Mais flexibilidade e recuperação."],["Zumba","zumba","Dança e ritmo para treinar se divertindo."],["Ritmos","ritmos","Aula de dança com energia e movimento."]];
const $=i=>document.getElementById(i);
$("tg").innerHTML=M.map(m=>`<article class="card"><img src="${A[m[1]]}" alt="${m[0]}" draggable="false"><h3>${m[0]}</h3><p>${m[2]}</p></article>`).join("");
const D=[["Seg","Segunda",["Zumba 07:00","Cross Training 16:00","Judô Kids 17:00","Judô Adulto 18:00","Ritmos 19:00"],"05:00 às 22:00"],
["Ter","Terça",["Pilates 07:00","Hidroginástica 08:00","Natação 09:00 +5 anos","Natação 16:00 +5 anos","HitPower 18:00","Muay Thai 19:00"],"05:00 às 22:00"],
["Qua","Quarta",["Karatê 09:30","Karatê 14:30","Cross Training 16:00","Ritmos 19:00"],"05:00 às 22:00"],
["Qui","Quinta",["Pilates 07:00","Hidroginástica 08:00","Natação 09:00 +5 anos","Natação 16:00 +5 anos","Funcional 19:00","Muay Thai 20:00"],"05:00 às 22:00"],
["Sex","Sexta",["Zumba 07:00","Karatê 09:30","Karatê 14:30","Judô Kids 17:00","Judô Adulto 18:00","Alongamento 19:00"],"05:00 às 22:00"],
["Sáb","Sábado",["Karatê 13:00"],"06:00 às 18:00"],["Dom","Domingo",[],"08:00 às 12:00"]];
$("dg").innerHTML=D.map(d=>`<div class="day rv"><h3 aria-label="${d[1]}">${d[0]}</h3><ul><li class="gym"><b>Musculação</b><small>${d[3]}</small></li>${d[2].map(s=>{const t=s.match(/\d\d:\d\d/)[0],n=s.replace(/ \d\d:\d\d.*/,""),x=/\+5/.test(s)?" · +5 anos":"";return`<li><b>${n}</b>${t}${x}</li>`}).join("")}</ul></div>`).join("");
const lerp=(a,b,k)=>a+(b-a)*k,lim=(v,a,b)=>Math.max(a,Math.min(b,v)),RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* arrastar para deslizar, com inércia */
(function(){const area=$("tv"),tr=$("tg");let x=0,vel=0,down=false,lx=0,raf=0;
const min=()=>{const l=tr.lastElementChild;return Math.min(0,area.clientWidth-(l.offsetLeft+l.offsetWidth)-(innerWidth<768?24:0))};
function step(){if(!down){vel*=RM?.8:.93;x=lim(x+vel,min(),0)}tr.style.transform="translateX("+x+"px)";raf=(down||Math.abs(vel)>.05)?requestAnimationFrame(step):0}
const go=()=>{if(!raf)raf=requestAnimationFrame(step)};
area.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button)return;down=true;vel=0;lx=e.clientX;area.classList.add("grab");go()});
addEventListener("pointermove",e=>{if(!down)return;vel=e.clientX-lx;lx=e.clientX;x=lim(x+vel,min(),0)});
const up=()=>{down=false;area.classList.remove("grab");go()};addEventListener("pointerup",up);addEventListener("pointercancel",up);
const push=d=>{vel=d*area.clientWidth*.8/14.3;go()};
$("pl").onclick=()=>push(1);$("pr").onclick=()=>push(-1);
area.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();push(-1)}if(e.key==="ArrowLeft"){e.preventDefault();push(1)}});
addEventListener("resize",()=>{x=lim(x,min(),0);tr.style.transform="translateX("+x+"px)"})})();
/* rolagem da página com inércia (roda do mouse) e âncoras suaves */
(function(){let tgt=scrollY,cur=scrollY,on=false;const max=()=>document.documentElement.scrollHeight-innerHeight;
function tick(){cur=lerp(cur,tgt,.09);if(Math.abs(tgt-cur)<.5){cur=tgt;on=false}scrollTo(0,cur);if(on)requestAnimationFrame(tick)}
const run=()=>{if(!on){on=true;requestAnimationFrame(tick)}};
addEventListener("scroll",()=>{if(!on)tgt=cur=scrollY},{passive:true});
if(!RM&&matchMedia("(pointer:fine)").matches)addEventListener("wheel",e=>{if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();tgt=lim(tgt+e.deltaY*(e.deltaMode===1?16:1),0,max());run()},{passive:false});
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const el=document.querySelector(a.getAttribute("href"));if(!el)return;e.preventDefault();tgt=lim(el.getBoundingClientRect().top+scrollY-(a.getAttribute("href")==="#top"?0:70),0,max());if(RM){scrollTo(0,tgt)}else run()})})();
const b=$("bg"),m=$("menu");b.onclick=()=>{const o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)};m.onclick=()=>m.classList.remove("open");
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}));
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
