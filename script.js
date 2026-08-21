
const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('#nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const t=document.querySelector(link.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.hero-copy,.hero-visual,.section .content,.contact-inner').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

// Typing headline
const typing=document.getElementById('typingText'),roles=['AI & Data Science Student','Machine Learning Enthusiast','Data Analytics Learner','Python Developer'];
let ri=0,ci=0,deleting=false;
function typeRole(){if(!typing)return;const s=roles[ri];typing.textContent=s.slice(0,ci);if(!deleting&&ci<s.length){ci++;setTimeout(typeRole,80)}else if(!deleting){deleting=true;setTimeout(typeRole,1400)}else if(ci>0){ci--;setTimeout(typeRole,42)}else{deleting=false;ri=(ri+1)%roles.length;setTimeout(typeRole,300)}}typeRole();

// Scroll progress and back-to-top
const progress=document.getElementById('scrollProgress'),topBtn=document.getElementById('backToTop');
function scrollUI(){const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+'%';topBtn?.classList.toggle('show',scrollY>500)}
addEventListener('scroll',scrollUI,{passive:true});scrollUI();topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Project filters
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f))}));

// Theme toggle with saved preference
const toggle=document.getElementById('themeToggle');if(localStorage.getItem('aditya-theme')==='light')document.body.classList.add('light');
function updateIcon(){if(toggle)toggle.textContent=document.body.classList.contains('light')?'☾':'☼'}updateIcon();
toggle?.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('aditya-theme',document.body.classList.contains('light')?'light':'dark');updateIcon()});
