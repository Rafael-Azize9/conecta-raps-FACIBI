// @ts-nocheck
import './style.css';
import { U, CITIES, COL, T, MC, NP, ED, IC, SI, CITY, ART, TEX, TYPES, TL } from './data';

const st={tab:'all',t:'',q:''},$=id=>document.getElementById(id);

const norm=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g,'');

const tel=s=>'tel:'+s.split('/')[0].replace(/[^\d]/g,'');

const nC=(c,k)=>U.filter(u=>u.c===c&&(!k||u.t===k)).length;

const match=u=>(!st.t||u.t===st.t)&&(!st.q||norm([u.c,u.n,u.a,u.tl,u.m,u.of,u.pub,T[u.t][0]].join(' ')).includes(norm(st.q)));

const nd='<span class="nd">Não informado</span>';

const fld=(l,v,w)=>`<div class="f${w?' w':''}"><b>${l}</b>${v||nd}</div>`;

const card=u=>`<article class="u" style="--c:var(${u.t==='ps'?MC[u.m]||'--caps':T[u.t][1]})"><header><span class="tp">${u.tl||T[u.t][0]}</span>${u.m?`<span class="bd">${u.m}</span>`:''}${u.x?'<span class="cx" title="Não estava na planilha lida; veio de pesquisa">Complementado</span>':''}</header><h3>${u.n}</h3><div class="fs">`+
 fld('Cidade',u.c)+fld('Tipo de serviço',T[u.t][0])+fld('Endereço completo',u.a,1)+fld('Telefone',u.tel&&`<a class="l" href="${tel(u.tel)}">${u.tel}</a>`)+fld('E-mail',u.em&&`<a class="l" href="mailto:${u.em}">${u.em}</a>`)+
 fld('Público atendido',u.pub,1)+fld('Tipo de atendimento ofertado',u.of,1)+fld('Forma de acesso',u.ac,1)+fld('Horário de funcionamento',u.h,1)+
 fld('Tipo de demanda',u.dem.map(d=>d==='Não informado'?nd:`<span class="dm${/Urg/.test(d)?' ur':''}">${d}</span>`).join(''),1)+`</div>${u.obs?`<p class="obs">${u.obs}</p>`:''}</article>`;

const pie=(d,o={})=>{
 const tot=d.reduce((a,x)=>a+x.v,0)||1,r=o.donut?13:8,sw=o.donut?6:16,C=2*Math.PI*r;let off=0;
 return `<svg viewBox="0 0 32 32" class="pie" role="img">`+d.filter(x=>x.v).map(x=>{const len=x.v/tot*C,s=`<circle r="${r}" cx="16" cy="16" fill="none" style="stroke:${x.c}" stroke-width="${sw}" stroke-dasharray="${Math.max(len-.25,0)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 16 16)"><title>${x.l}: ${x.v} (${Math.round(x.v/tot*100)}%)</title></circle>`;off+=len;return s}).join('')+(o.mid!==undefined?`<text x="16" y="18.4" text-anchor="middle" font-size="7" font-weight="800" fill="currentColor">${o.mid}</text>`:'')+'</svg>';
};

const leg=d=>{const tot=d.reduce((a,x)=>a+x.v,0)||1;return `<ul class="pl">`+d.filter(x=>x.v).map(x=>`<li><i style="background:${x.c}"></i>${x.l}<b>${x.v}</b><small>${Math.round(x.v/tot*100)}%</small></li>`).join('')+'</ul>'};

const tyD=c=>Object.keys(T).map(k=>({l:T[k][0],v:U.filter(u=>(!c||u.c===c)&&u.t===k).length,c:`var(${T[k][1]})`}));

function net(){
 const P=[[28,290],[60,222],[112,176],[176,146],[246,112],[318,100],[392,82],[470,70],[548,56],[622,44],[700,60],[752,100],[772,160],[764,222],[748,274],[700,318],[640,340],[590,372],[520,388],[444,372],[372,380],[300,372],[226,380],[150,372],[86,340]];
 const rnd=(s=>()=>(s=s*16807%2147483647)/2147483647)(7);
 const smooth=(Q,m)=>{const o=[],N=Q.length;for(let i=0;i<N;i++){const a=Q[(i+N-1)%N],b=Q[i],c=Q[(i+1)%N],d=Q[(i+2)%N];for(let j=0;j<m;j++){const u=j/m,u2=u*u,u3=u2*u;o.push([0,1].map(k=>.5*(2*b[k]+(-a[k]+c[k])*u+(2*a[k]-5*b[k]+4*c[k]-d[k])*u2+(-a[k]+3*b[k]-3*c[k]+d[k])*u3)))}}return o};
 const wob=Q=>Q.map((p,i,A)=>{const a=A[(i+A.length-1)%A.length],c=A[(i+1)%A.length],dx=c[0]-a[0],dy=c[1]-a[1],L=Math.hypot(dx,dy)||1,o=Math.sin(i*.55)*1.8+Math.sin(i*1.7+2)*1.3+(rnd()-.5)*3;return[p[0]-dy/L*o,p[1]+dx/L*o]});
 const O0=wob(smooth(P,9));
 const sc=k=>O0.map(([x,y])=>[400+(x-400)*k,215+(y-215)*k]);
 const bz=Q=>'M'+Q.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+'Z';
 const O=bz(O0);
 const arcs=ED.map(([a,b],i)=>{const[p,q]=[NP[a],NP[b]],dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,s=(i%2?1:-1)*L*.18;
  const d=`M${p[0]+ux*14} ${p[1]+uy*14} Q${(p[0]+q[0])/2-uy*s} ${(p[1]+q[1])/2+ux*s} ${q[0]-ux*14} ${q[1]-uy*14}`;
  return `<path id="a${i}" class="ln" d="${d}"/><circle class="pt" r="2" fill="#fff"><animateMotion dur="${4+i%3}s" begin="${(i*.6).toFixed(1)}s" repeatCount="indefinite"><mpath href="#a${i}"/></animateMotion></circle>`}).join('');
 const nodes=CITIES.map((c,i)=>{const[x,y]=NP[c],k=nC(c,'ps'),m=nC(c)>0;
  return `<g class="nd" data-tab="${c}" tabindex="0" role="button" aria-label="${c}" transform="translate(${x} ${y})"><circle r="22" fill="#2DD4BF" opacity=".2" filter="url(#bl)"/>${m?`<circle class="rg" r="11" style="animation-delay:${(i*.45).toFixed(2)}s"/><circle r="11" fill="none" stroke="#7FE3D3" stroke-width="1" opacity=".6"/><circle class="core" r="5" fill="#fff"/>`:`<circle r="9" fill="none" stroke="#7FE3D3" stroke-width="1.2" stroke-dasharray="2.5 3" opacity=".8"/><circle r="2.4" fill="#7FE3D3" opacity=".7"/>`}<text y="32">${c}</text><text class="sb" y="48">${m?(k?k+' CAPS':nC(c)+' serviço(s)'):'em mapeamento'}</text></g>`}).join('');
 $('net').innerHTML=`<svg viewBox="0 0 800 440" role="group" aria-label="Rede de cidades da Serra da Ibiapaba"><defs><filter id="bl" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7"/></filter><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5FE3CF"/><stop offset="1" stop-color="#BFF3EA"/></linearGradient></defs>
 <path d="${O}" fill="rgba(45,212,191,.06)" stroke="#2DD4BF" stroke-width="8" opacity=".3" filter="url(#bl)"/>
 <path class="ct" d="${O}" stroke-width="1.3" opacity=".9"/><path class="ct" d="${bz(sc(.93))}" stroke-width=".8" stroke-dasharray="2 5" opacity=".4"/><path class="ct" d="${bz(sc(.85))}" stroke-width=".8" stroke-dasharray="2 5" opacity=".25"/>${arcs}${nodes}</svg>`;
  document.querySelectorAll('#net g.nd[data-tab]').forEach(nd=>{
    nd.addEventListener('click',e=>{
      const r=nd.getBoundingClientRect();
      openCityPopup(nd.dataset.tab,r);
    });
    nd.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const r=nd.getBoundingClientRect();openCityPopup(nd.dataset.tab,r);}});
  });
  $('city-card').addEventListener('click',e=>{if(e.target===$('city-card'))closeCityCard();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selectedCity){e.preventDefault();closeCityCard();}});
}

function head(){
 const k=t=>U.filter(u=>u.t===t).length;
 net();
 $('cty').innerHTML=CITIES.map(c=>`<button class="cc" data-tab="${c}"><b>${c}</b>${nC(c)?`<span>${nC(c)} serviços</span><span>${nC(c,'ps')} CAPS · ${nC(c,'ab')} UBS</span>`:'<span>em mapeamento</span>'}</button>`).join('');
 const mp=CITIES.filter(c=>nC(c)),mx=Math.max(...mp.map(c=>nC(c)));
 $('pl').innerHTML=`<h2>Pulso da Rede</h2><p class="sub">A rede psicossocial da Serra da Ibiapaba em números: como os serviços se distribuem por tipo, por modalidade de CAPS e por cidade.</p>
 <div class="kg">${[['cidades mapeadas',CITIES.filter(c=>nC(c)).length+' de '+CITIES.length,'--ink'],['serviços na rede',U.length,'--ab'],['CAPS',k('ps'),'--caps'],['hospitais e UPA',k('ho')+k('ur'),'--ho'],['unidades de atenção básica',k('ab'),'--ab']].map(([l,v,c])=>`<div class="kp" style="--c:var(${c})"><b>${v}</b><span>${l}</span></div>`).join('')}</div>
 <div class="pg"><div class="pc"><h3>Pizza dos serviços</h3>${pie(tyD())}${leg(tyD())}</div>
 <div class="pc"><h3>CAPS por modalidade</h3>${pie(Object.keys(MC).map(m=>({l:m,v:U.filter(u=>u.m===m).length,c:`var(${MC[m]})`})))}${leg(Object.keys(MC).map(m=>({l:m,v:U.filter(u=>u.m===m).length,c:`var(${MC[m]})`})))}</div>
 <div class="pc"><h3>Peso de cada cidade</h3>${pie(CITIES.map((c,i)=>({l:c,v:nC(c),c:COL[i]})),{donut:1,mid:U.length})}${leg(CITIES.map((c,i)=>({l:c,v:nC(c),c:COL[i]})))}</div></div>
 <h3 class="sec" style="--c:var(--caps)">Cada cidade por dentro</h3><div class="pg mini">${mp.map(c=>`<div class="pc"><h3>${c}</h3>${pie(tyD(c),{donut:1,mid:nC(c)})}${leg(tyD(c))}</div>`).join('')}</div>
 <h3 class="sec" style="--c:var(--ab)">Barras por cidade</h3><div id="chart">${mp.map(c=>{const n=nC(c);return `<div class="r"><span>${c}</span><div class="stk" style="width:${n/mx*100}%">${Object.keys(T).map(k=>{const v=nC(c,k);return v?`<i title="${T[k][0]}: ${v}" style="width:${v/n*100}%;background:var(${T[k][1]})"></i>`:''}).join('')}</div><b>${n}</b></div>`}).join('')}</div>
  <div class="lg">${Object.values(T).map(v=>`<span style="--c:var(${v[1]})">${v[0]}</span>`).join('')}</div>`;
  const fc=$('footer-cities');if(fc)fc.textContent=CITIES.length;
  const fs=$('footer-services');if(fs)fs.textContent=U.length;
  const fd=$('footer-date');if(fd)fd.textContent=new Date().toLocaleDateString('pt-BR');
}


const tb=(k,n,b)=>`<button class="tab ${st.tab===k?'on':''}" data-tab="${k}">${n}${b!==undefined?`<small>${b}</small>`:''}</button>`;

function tabs(){
 $('tabs').innerHTML=tb('all','Visão geral')+tb('pulso','Pulso da Rede')+CITIES.map(c=>tb(c,c,nC(c)||'em breve')).join('');
 $('ft').innerHTML=['',...Object.keys(T)].map(k=>`<button class="ch ${st.t===k?'on':''}" data-t="${k}">${k?`<i style="--c:var(${T[k][1]})"></i>${T[k][0]}`:'Todos os tipos'}</button>`).join('');
}

function view(){
 const pul=st.tab==='pulso',city=!pul&&st.tab!=='all',on=city||st.q||st.t;
 $('ov').hidden=!!on||pul;$('pl').hidden=!(pul&&!on);$('cv').hidden=!on;if(!on)return;
 const sc=city?[st.tab]:CITIES;let h='',any=false;
 const guides={
  ps:{title:'CAPS da Serra',text:'Os Centros de Atenção Psicossocial atendem pessoas em sofrimento psíquico intenso, com equipe multiprofissional. CAPS AD cuida de álcool e outras drogas; CAPS i, de crianças e adolescentes.'},
  ur:{title:'Serviços de urgência e emergência',text:'As unidades de urgência, como as UPAs, acolhem situações agudas que precisam de avaliação e atendimento rápido, mas que nem sempre exigem internação hospitalar. Realizam classificação de risco, avaliação, estabilização, cuidados e observação clínica. A equipe pode incluir médicos, enfermeiros, técnicos de enfermagem, assistentes sociais e profissionais de apoio diagnóstico, conforme a estrutura da unidade.'},
  ho:{title:'Hospitais',text:'Os hospitais oferecem cuidado de maior complexidade, como internações, cirurgias, exames, atendimento especializado e assistência a situações graves. As equipes podem reunir médicos de diferentes especialidades, enfermagem, técnicos de enfermagem, psicologia, serviço social, fisioterapia, nutrição, farmácia e outras áreas, conforme os serviços disponíveis.'},
  ab:{title:'Unidades Básicas de Saúde (UBS)',text:'As UBS são a principal porta de entrada do SUS e acompanham a saúde das pessoas e famílias no território. Oferecem promoção da saúde, prevenção, consultas, vacinação, pré-natal, acompanhamento de condições crônicas, curativos e encaminhamentos quando necessários. A equipe pode incluir médicos, enfermeiros, técnicos ou auxiliares de enfermagem, agentes comunitários de saúde, saúde bucal e outros profissionais conforme a unidade.'},
  ac:{title:'Serviços de acolhimento',text:'Os serviços de acolhimento oferecem proteção, moradia temporária e apoio a pessoas que precisam se afastar de situações de violência, abandono ou violação de direitos, conforme a modalidade do equipamento. As equipes podem incluir coordenação, cuidadores ou educadores sociais, psicólogos, assistentes sociais e profissionais de apoio. A composição e as atividades variam conforme o serviço.'}
 };
 if(st.t&&guides[st.t]){const g=guides[st.t];h+=`<section class="category-guide"><h2>${g.title}</h2><p class="sub">${g.text}</p></section>`}
 if(city){const n=nC(st.tab);h+=`<h2>${st.tab}</h2><p class="sub">${n?`${n} ${n>1?'serviços mapeados':'serviço mapeado'} nesta cidade. Cada caixa traz todas as informações do equipamento.`:'Esta cidade ainda está em mapeamento. Assim que os dados forem coletados, os serviços aparecem aqui.'}</p>`}
 sc.forEach(c=>{const us=U.filter(u=>u.c===c&&match(u));if(!us.length)return;any=true;
  if(!city)h+=`<h2>${c}</h2>`;
  Object.keys(T).forEach(k=>{const g=us.filter(u=>u.t===k);if(g.length)h+=`<h3 class="sec" style="--c:var(${T[k][1]})">${T[k][0]}<small>${g.length}</small></h3><div class="ug">${g.map(card).join('')}</div>`})});
 if(!any&&(!city||nC(st.tab)))h+='<p class="empty">Nenhum serviço encontrado com esses filtros.</p>';
 $('cv').innerHTML=h;
}

const go=()=>{tabs();view()};
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('g.nd[data-tab]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
document.addEventListener('click',e=>{
 const qa=e.target.closest('.qa-card');if(qa){
  const t=qa.dataset.t;if(t){st.t=t;st.tab='all';go();document.querySelector('.bar').scrollIntoView();}else{st.t='';st.tab='all';go();$('q').focus();}return
 }
 const a=e.target.closest('[data-tab]');if(a){st.tab=a.dataset.tab;go();document.querySelector('.bar').scrollIntoView();return}
 const b=e.target.closest('.ch');if(b){st.t=b.dataset.t;go()}});
$('q').addEventListener('input',e=>{st.q=e.target.value;view()});
const THEME_KEY='conecta-raps-theme';
function applyTheme(dark){
  const r=document.documentElement;
  r.dataset.theme=dark?'dark':'light';
  const b=$('tg');
  if(b){
    b.classList.toggle('is-dark',dark);
    const l=b.querySelector('.tg-label');
    if(l)l.textContent=dark?'Modo claro':'Modo escuro';
  }
  try{localStorage.setItem(THEME_KEY,dark?'dark':'light')}catch(e){}
}
function initTheme(){
  let dark;
  try{const saved=localStorage.getItem(THEME_KEY);dark=saved===null?matchMedia('(prefers-color-scheme:dark)').matches:saved==='dark'}catch(e){dark=matchMedia('(prefers-color-scheme:dark)').matches}
  applyTheme(dark);
  if(!localStorage.getItem(THEME_KEY)){
    matchMedia('(prefers-color-scheme:dark)').addEventListener('change',e=>{applyTheme(e.matches)});
  }
}
$('tg').onclick=()=>{const r=document.documentElement;applyTheme(r.dataset.theme!=='dark');};
initTheme();
head();go();
/* ===== Exploração territorial personalizada: sem tiles bloqueados ===== */
const $map=id=>document.getElementById(id);

const ico=(k,col)=>`<svg viewBox="0 0 24 24" fill="none" stroke="${col||'currentColor'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k][2]}</svg>`;

const sico=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="${SI[k][0]}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${SI[k][1]}</svg>`;

let curCity='',curF='all',zoom=1.04,selId=null,selectedCity=null;

const safeText=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function openMapModal(){$map('map-modal').hidden=false;document.body.style.overflow='hidden'}

function closeMapModal(){$map('map-modal').hidden=true;document.body.style.overflow=''}
$map('map-close').addEventListener('click',closeMapModal);
$map('map-modal').addEventListener('click',e=>{if(e.target===$map('map-modal'))closeMapModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$map('map-modal').hidden)closeMapModal()});
$map('explore-network').addEventListener('click',e=>{e.preventDefault();const p=document.querySelector('.network-panel');const hero=document.getElementById('inicio');if(!p)return;p.classList.add('is-focused');window.scrollTo({top:Math.max(0,p.getBoundingClientRect().top+window.pageYOffset-120),behavior:'smooth'});setTimeout(()=>p.classList.remove('is-focused'),1600)});

const gmaps=u=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([u.n,u.a,u.c,'Ceará','Brasil'].filter(Boolean).join(', '));

const hood=u=>{const p=(u.a||'').split(' – ').map(s=>s.trim());return p.length>1&&!/^CEP/.test(p[1])?p[1]:(u.a||'Endereço não informado')};

function seeded(str){let s=0;for(const ch of str)s=(s*31+ch.charCodeAt(0))%2147483647;return()=>(s=s*16807%2147483647)/2147483647}

function mapSVG(city,svcs){
 const r=seeded(city),N=17,cx=200,cy=190,pts=[];
 for(let i=0;i<N;i++){const a=i/N*Math.PI*2-1.2,k=.7+r()*.32;pts.push([cx+Math.cos(a)*165*k,cy+Math.sin(a)*150*k])}
 const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+'Z';
 let ridges='';for(let i=0;i<5;i++){const a=r()*6.28,b=a+1.5+r();ridges+=`<path d="M${cx+Math.cos(a)*120} ${cy+Math.sin(a)*105} Q${cx+(r()-.5)*60} ${cy+(r()-.5)*60} ${cx+Math.cos(b)*125} ${cy+Math.sin(b)*110}" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" fill="none"/>`}
 let patches='';for(let i=0;i<9;i++)patches+=`<ellipse cx="${cx+(r()-.5)*220}" cy="${cy+(r()-.5)*200}" rx="${18+r()*30}" ry="${12+r()*22}" fill="${r()>.5?'#8fc16a':'#2f7a45'}" opacity=".35"/>`;
 const slots=[[135,150],[255,125],[265,235],[150,255],[205,190]];
 const types=['ps','ab','ur','ho','ac'].filter(t=>svcs.some(u=>u.t===t));
 const pins=types.map((t,k)=>{const [x,y]=slots[k],c=IC[t][0],i=svcs.findIndex(u=>u.t===t);
  return `<g transform="translate(${x} ${y+14}) scale(1.2)"><g class="px-pin" data-i="${i}" data-t="${t}" tabindex="0" role="button" aria-label="${TL[t]}"><ellipse cx="0" cy="2" rx="10" ry="4" fill="#000" opacity=".28"/><path d="M0 0C-7-14-24-21-24-40a24 24 0 0 1 48 0C24-21 7-14 0 0z" fill="${c}" stroke="#fff" stroke-width="3"/><circle cx="0" cy="-40" r="16.5" fill="#fff"/><g transform="translate(-12 -52) scale(1)" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${IC[t][2]}</g></g></g>`}).join('');
 return `<defs><linearGradient id="pxg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f9a4f"/><stop offset=".5" stop-color="#2d7d46"/><stop offset="1" stop-color="#5aa35a"/></linearGradient><clipPath id="pxc"><path d="${d}"/></clipPath></defs><g id="px-z" style="transform-origin:200px 190px;transform:scale(${zoom});transition:transform .25s"><path d="${d}" fill="#0a3b2a" opacity=".3" transform="translate(5 8)"/><g clip-path="url(#pxc)"><image href="${TEX[city]}" x="20" y="20" width="360" height="340" preserveAspectRatio="xMidYMid slice"/>${ridges}</g><path d="${d}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="miter"/>${pins}</g>`;
}

function selectEq(i){selId=i;document.querySelectorAll('.px-it').forEach((el,k)=>{const on=el.dataset.i==i&&!el.classList.contains('open');if(el.dataset.i==i)el.classList.toggle('open',on);else el.classList.remove('open')});document.querySelectorAll('.px-pin').forEach(p=>p.classList.toggle('sel',p.dataset.i==i&&document.querySelector('.px-it.open')?.dataset.i==i))}

function render(){
 const all=U.filter(u=>u.c===curCity),vis=all.filter(u=>curF==='all'||u.t===curF);
 $map('px-filters').innerHTML=TYPES.map(([t,l])=>`<button type="button" class="px-f${curF===t?' on':''}" data-t="${t}" aria-pressed="${curF===t}">${ico(t,curF===t?'#fff':IC[t][0])}<span>${l}</span></button>`).join('');
 $map('px-svg').innerHTML=mapSVG(curCity,all);
 document.querySelectorAll('.px-pin').forEach(p=>{p.classList.toggle('dim',curF!=='all'&&p.dataset.t!==curF);p.addEventListener('click',()=>{const u=all[p.dataset.i];if(curF!=='all'&&u.t!==curF){curF='all';render()}selectEq(p.dataset.i);document.querySelector('.px-it[data-i="'+p.dataset.i+'"]')?.scrollIntoView({block:'nearest',behavior:'smooth'})})});
 const list=$map('px-list');
 list.innerHTML=vis.length?vis.map(u=>{const i=all.indexOf(u),c=IC[u.t];return `<div class="px-it" data-i="${i}" style="--c:${c[0]};--bg2:${c[1]}"><button type="button" aria-expanded="false"><span class="px-ic">${ico(u.t)}</span><span><b>${safeText(u.n)}</b><small>${safeText(TL[u.t])}${u.m?' · '+safeText(u.m):''} · ${safeText(hood(u))}</small></span><svg class="px-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></button><div class="px-det">${u.a?'<div><b style="display:inline;font:700 14px var(--fb)">Endereço:</b> '+safeText(u.a)+'</div>':''}${u.tel?'<div><b style="display:inline;font:700 14px var(--fb)">Telefone:</b> '+safeText(u.tel)+'</div>':''}${u.h?'<div><b style="display:inline;font:700 14px var(--fb)">Horário:</b> '+safeText(u.h)+'</div>':''}<div style="margin-top:6px"><a href="${gmaps(u)}" target="_blank" rel="noopener noreferrer">Ver localização ↗</a></div></div></div>`}).join(''):'<p class="map-empty">Nenhum equipamento cadastrado nesta categoria. O mapeamento pode estar em andamento.</p>';
 list.querySelectorAll('.px-it>button').forEach(b=>b.addEventListener('click',()=>selectEq(b.parentElement.dataset.i)));
 document.querySelectorAll('.px-f').forEach(b=>b.addEventListener('click',()=>{curF=b.dataset.t;render()}));
}

function cityCatLabel(city){
  const cats=[];Object.keys(T).forEach(k=>{if(nC(city,k)>0)cats.push(T[k][0]);});
  return cats;
}
function renderCityCard(city){
  const all=U.filter(u=>u.c===city);
  const qtd=all.length;
  const cats=cityCatLabel(city);
  const situacao=qtd?`${qtd} serviço${qtd>1?'s':'ão'} cadastrado${qtd>1?'s':''}`:'Em mapeamento';
  $('city-card-title').textContent=city;$('city-card-state').textContent='Ceará';
  $('city-card-qtd').textContent=qtd;
  $('city-card-cat').textContent=cats.length?cats.join(', '):'—';
  $('city-card-situacao').textContent=situacao;
  const list=$('city-card-list');
  list.innerHTML=all.map(u=>`<li class="city-item"><div><strong>${safeText(u.n)}</strong><span class="city-cat">${safeText(T[u.t]?T[u.t][0]:'—')}</span></div><div class="city-meta">${u.a?`<span>${safeText(u.a)}</span>`:''}${u.tel?`<span>tel ${safeText(u.tel)}</span>`:''}</div></li>`).join('');
  const btn=$('city-card-view');
  btn.onclick=()=>{st.tab=city;go();document.querySelector('.bar').scrollIntoView();closeCityCard();};
}
function openCityCard(city){
  if(selectedCity===city)return;
  selectedCity=city;
  document.querySelectorAll('#net g.nd[data-tab]').forEach(nd=>{nd.classList.toggle('selected',nd.dataset.tab===city);});
  renderCityCard(city);
  const card=$('city-card');
  card.hidden=false;
  card.classList.add('open');
  card.style.display='flex';
  document.body.style.overflow='hidden';
}
function closeCityCard(){
  selectedCity=null;
  document.querySelectorAll('#net g.nd[data-tab]').forEach(nd=>nd.classList.remove('selected'));
  const card=$('city-card');
  card.hidden=true;
  card.classList.remove('open');
  card.style.display='none';
  document.body.style.overflow='';
}

function cityPopupImage(city){
  const img=$('city-popup-img');
  const fb=$('city-popup-img-fallback');
  const src=ART[city]||TEX[city]||'';
  if(src){
    img.src=src;img.style.display='block';fb.style.display='none';
    img.alt='Imagem ilustrativa de '+city;
  }else{
    img.style.display='none';fb.style.display='flex';
    fb.textContent='Sem imagem disponível';
  }
}
function renderCityPopup(city){
  const all=U.filter(u=>u.c===city);
  const qtd=all.length;
  const cats=cityCatLabel(city);
  const situacao=qtd?`${qtd} serviço${qtd>1?'s':'ão'} cadastrado${qtd>1?'s':''}`:'Em mapeamento';
  const [lm,ls,desc,st]=CITY[city]||['','','',[]];
  $('city-popup-title').textContent=city;
  $('city-popup-state').textContent='Ceará';
  $('city-popup-qtd').textContent=qtd;
  $('city-popup-cat').textContent=cats.length?cats.join(', '):'—';
  $('city-popup-situacao').textContent=situacao;
  $('city-popup-desc').textContent=desc||`${city} é um município da Serra da Ibiapaba, Ceará, integrado à Rede de Atenção Psicossocial.`;
  cityPopupImage(city);
  const estabs=$('city-popup-estabs');
  estabs.innerHTML=all.map(u=>{const d=IC[u.t]?IC[u.t][0]:'#14b8a6';return `<div class="city-popup-estab"><span class="city-popup-estab-ic" style="--c:${d}">${ico(u.t,d)}</span><div><strong>${safeText(u.n)}</strong><span>${safeText(T[u.t]?T[u.t][0]:'—')}</span></div></div>`}).join('');
  if(!all.length)estabs.innerHTML='<p style="font-size:12px;color:var(--mut);font-style:italic">Nenhum estabelecimento cadastrado nesta cidade.</p>';
  const btn=$('city-popup-view');
  btn.onclick=()=>{st.tab=city;go();document.querySelector('.bar').scrollIntoView();closeCityPopup();};
}
function openCityPopup(city,rect){
  if(selectedCity===city)return;
  selectedCity=city;
  document.querySelectorAll('#net g.nd[data-tab]').forEach(nd=>{nd.classList.toggle('selected',nd.dataset.tab===city);});
  renderCityPopup(city);
  const popup=$('city-popup');
  popup.hidden=false;
  popup.style.display='flex';
  // posiciona próximo ao marcador
  if(rect){
    const x=rect.left+rect.width/2;
    const y=rect.top-10;
    popup.style.left='0px';popup.style.top='0px';
    // força reflow para aplicar transform
    popup.offsetHeight;
    const pw=popup.offsetWidth,ph=popup.offsetHeight;
    let l=x-pw/2, t=y-ph-14;
    const vpW=window.innerWidth,vpH=window.innerHeight;
    if(l<12)l=12;
    if(l+pw>vpW-12)l=vpW-pw-12;
    if(t<12)t=y+rect.height+14;
    if(t+ph>vpH-12)t=vpH-ph-12;
    popup.style.transform=`translate(${l}px,${t}px)`;
  }else{
    popup.style.transform='translate(0,0)';
  }
  document.body.style.overflow='hidden';
}
function closeCityPopup(){
  selectedCity=null;
  document.querySelectorAll('#net g.nd[data-tab]').forEach(nd=>nd.classList.remove('selected'));
  const popup=$('city-popup');
  popup.hidden=true;
  popup.style.display='none';
  document.body.style.overflow='';
}
document.addEventListener('DOMContentLoaded',()=>{
  const b=$('city-card-close');if(b)b.addEventListener('click',closeCityCard);
  const bp=$('city-popup-close');if(bp)bp.addEventListener('click',closeCityPopup);
  const popup=$('city-popup');
  const popupInner=popup.querySelector('.city-popup-inner');
  // Listener: clique fora do popup fecha; clique em município abre/atualiza (atravessa popup se necessário)
  document.addEventListener('click',e=>{
    if(popup&&!popup.hidden){
      popup.style.display='none';
      const realEl=document.elementFromPoint(e.clientX,e.clientY);
      popup.style.display='flex';
      const nd=realEl?realEl.closest('#net g.nd[data-tab]'):null;
      if(nd){
        const r=nd.getBoundingClientRect();
        openCityPopup(nd.dataset.tab,r);
        return;
      }
      if(popupInner&&!popupInner.contains(e.target)){
        closeCityPopup();
      }
      return;
    }
    const nd=e.target.closest('#net g.nd[data-tab]');
    if(nd){
      const r=nd.getBoundingClientRect();
      openCityPopup(nd.dataset.tab,r);
    }
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selectedCity){e.preventDefault();closeCityPopup();}});
});
function openCityMap(city){
 curCity=city;curF='all';zoom=1.04;openMapModal();
 const [lm,ls,desc,st]=CITY[city]||['Serra da Ibiapaba','','Explore os serviços cadastrados neste município.',[]];
 const all=U.filter(u=>u.c===city),caps=all.filter(u=>u.t==='ps').length;
 $map('map-modal-title').textContent=city;
 $map('px-art').src=ART[city]||'';$map('px-art').style.objectPosition='50% 45%';$map('px-art').alt='Arte ilustrativa de '+city;
 $map('px-capico').innerHTML=ico('ho','#fff').replace('stroke-width="1.8"','stroke-width="1.6"').replace(/<path[^>]*\/>/,'<path d="M12 2v4M10 4h4M8 22V10l4-4 4 4v12M4 22h16M12 22v-5"/>');
 $map('px-lm').textContent=lm;$map('px-lms').textContent=ls;
 $map('px-about-t').innerHTML=sico('pin')+'Sobre '+safeText(city);$map('px-desc').textContent=desc;
 $map('px-s1').innerHTML=sico('users')+'<b>'+all.length+'</b>equipamentos';
 $map('px-s2').innerHTML=sico('pulse')+'<b>'+caps+'</b>CAPS';
 $map('px-s3').innerHTML=sico('pin')+'<b>Região</b>Serra da Ibiapaba – CE';
 $map('px-pf').innerHTML='<strong>Pontos fortes<br>do município</strong>'+st.map(([k,l])=>'<div class="px-pfi">'+sico(k)+safeText(l)+'</div>').join('');
 $map('px-rhi').innerHTML=ico('ho','#0b8a5c').replace(/<path[^>]*\/>/,'<path d="M4 21V8l5-3v16M9 21V10h7v11M16 21h4V12h-4M3 21h18M6.5 11h1M6.5 14h1M12 13h1M12 16h1"/>');
 $map('px-rt').textContent='Equipamentos da RAPS em '+city;
 $map('px-all').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/></svg>Ver todos no mapa';
 $map('px-all').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(city+', Ceará, Brasil');
 render();$map('map-modal').querySelector('.map-dialog').scrollTop=0;
}
$map('px-zi').addEventListener('click',()=>{zoom=Math.min(1.6,zoom+.2);const g=$map('px-z');if(g)g.style.transform='scale('+zoom+')'});
$map('px-zo').addEventListener('click',()=>{zoom=Math.max(.8,zoom-.2);const g=$map('px-z');if(g)g.style.transform='scale('+zoom+')'});

/* ===== Assistente da rede: resposta focada em um equipamento por consulta ===== */

const NL='\n';

const STOP=['onde','qual','quais','tem','fica','para','com','que','uma','das','dos','como','por','favor','me','diga','sobre','informacao','informacoes','endereco','horario','telefone','contato','funciona','funcionamento','oferece'];

function words(q){return norm(q).split(' ').filter(w=>w.length>2&&!STOP.includes(w));}

function findEquipment(q){
 const nq=norm(q),tk=words(q),ranked=[];
 const cityMentioned=CITIES.some(c=>nq.includes(norm(c)));
 for(const u of U){
  const name=norm(u.n),city=norm(u.c),addr=norm(u.a),type=norm((T[u.t]||[''])[0]+' '+(u.m||''));let score=0;
  if(nq.includes(name))score+=30;
  if(nq.includes(city))score+=8;
  if(u.m&&nq.includes(norm(u.m)))score+=14;
  if(nq.includes(type))score+=12;
  for(const w of tk){if(name.includes(w))score+=5;if(addr.includes(w))score+=2;if(type.includes(w))score+=4;if(city.includes(w))score+=3;}
  if(score>=5)ranked.push({u,score});
 }
 ranked.sort((a,b)=>b.score-a.score);
 if(!ranked.length)return null;
 const tied=ranked.filter(x=>x.score===ranked[0].score);
 // Avoid guessing a city when a generic equipment name matches several municipalities.
 if(!cityMentioned&&tied.length>1&&!nq.includes(norm(ranked[0].u.n)))return null;
 return ranked[0].u;
}

function answerFor(u,q){
 if(!u)return 'Não consegui identificar um equipamento específico. Informe o nome do serviço ou combine o tipo com o município (por exemplo: “CAPS II de Tianguá” ou “UBS ABC, São Benedito”).';
 const nq=norm(q),lines=[];
 if(/endereco|rua|onde fica|localiza/.test(nq))lines.push('Endereço: '+(u.a||'não informado na base'));
 if(/horario|funciona|abre|fecha/.test(nq))lines.push('Funcionamento: '+(u.h||'não informado na base'));
 if(/telefone|contato|ligar/.test(nq))lines.push('Telefone: '+(u.tel||'não informado na base'));
 if(/email|e mail/.test(nq))lines.push('E-mail: '+(u.em||'não informado na base'));
 if(/oferece|faz|atendimento|servico|serviços|cuida/.test(nq))lines.push('Atendimento: '+(u.of||'não detalhado na base'));
 if(/publico|atende|quem/.test(nq))lines.push('Público atendido: '+(u.pub||'não informado na base'));
 if(/acesso|encaminhamento|procurar/.test(nq))lines.push('Como acessar: '+(u.ac||'não informado na base'));
 if(!lines.length){lines.push('Endereço: '+(u.a||'não informado na base'));lines.push('Atendimento: '+(u.of||'não informado na base'));lines.push('Funcionamento: '+(u.h||'não informado na base'));lines.push('Telefone: '+(u.tel||'não informado na base'));if(u.em)lines.push('E-mail: '+u.em);}
 if(u.obs)lines.push('Observação: '+u.obs);
 return `${u.n}\n${u.c} · ${(T[u.t]||['Serviço'])[0]}${u.m?' · '+u.m:''}\n\n${lines.join('\n')}\n\nInformações conforme a base cadastrada. Confirme diretamente com o equipamento antes de se deslocar.`;
}

let smp=null;const hist=[];

function add(r,t){const d=document.createElement('div');d.className='m '+r;d.textContent=t;$('cm').appendChild(d);$('cm').scrollTop=1e9;return d}

function welcome(){ $('cm').innerHTML='';add('b','Olá! Posso ajudar a localizar um equipamento e consultar endereço, horário, telefone, público atendido e serviços ofertados. Para uma resposta precisa, informe o nome do equipamento ou o tipo e a cidade (ex.: “CAPS II de Tianguá”). Vou mostrar um equipamento por vez.'); }
async function send(){
 const i=$('cin'),q=i.value.trim();if(!q)return;i.value='';add('u',q);const b=add('b','Consultando a base…');
 if(/suicid|me matar|tirar minha vida|risco imediato|emergencia/.test(norm(q))){b.textContent='Se houver risco imediato, procure um serviço de urgência ou ligue para o SAMU 192. Para apoio emocional, o CVV atende pelo 188, 24 horas.';hist.push(['u',q],['b',b.textContent]);return;}
 const equipment=findEquipment(q);
 if(!equipment){b.textContent=answerFor(null,q);hist.push(['u',q],['b',b.textContent]);return;}
 const fallback=answerFor(equipment,q);
 try{
  if(smp){
   const single=[equipment];
   const prompt='Você é o assistente do Conecta RAPS. Responda em português, de modo direto e acolhedor. REGRA OBRIGATÓRIA: responda somente sobre o único equipamento fornecido abaixo; nunca liste outros serviços, não sugira alternativas e não misture dados de outros municípios. Use exclusivamente os dados desse registro. Se um campo estiver vazio, diga que não consta na base. Não invente informações. Não faça diagnóstico ou orientação clínica.\nREGISTRO ÚNICO: '+JSON.stringify(single)+'\nPERGUNTA: '+q+'\nSe a pergunta for ampla, apresente apenas a ficha deste equipamento.';
   const r=await smp(prompt,{cache:false,modelTier:'quick',onText:o=>{b.textContent=o.text}});b.textContent=r.text||fallback;
  }else b.textContent=fallback;
 }catch(e){b.textContent=fallback;}
 hist.push(['u',q],['b',b.textContent]);$('cm').scrollTop=1e9;
}
$('cb').onclick=()=>{$('cp').hidden=false;$('cb').hidden=true;$('cin').focus()};
$('cx').onclick=()=>{$('cp').hidden=true;$('cb').hidden=false};
$('cs').onclick=send;
$('cin').addEventListener('keydown',e=>{if(e.key==='Enter')send()});
welcome();
try{if(window.claude&&claude.use)claude.use('sample').then(s=>{if(s){smp=s;welcome()}}).catch(()=>{})}catch(e){}


/* Revelação dinâmica no scroll */
(function initReveal(){
  const els = document.querySelectorAll('.u,.cc,.pc,.kp,.map-service,.territory-service,.px-it,.sec');
  if(!('IntersectionObserver' in window)) { els.forEach(e=>e.classList.add('is-visible')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();
