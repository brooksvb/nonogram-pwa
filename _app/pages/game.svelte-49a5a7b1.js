var e=Object.defineProperty,t=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(t,s,o)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[s]=o;import{O as n,C as l,P as i,S as a,i as c,s as d,e as u,c as h,a as g,d as f,b as m,Q as p,f as v,J as y,R as $,k as C,n as b,F as x,t as w,g as S,h as E,T as M,x as T,j as I,m as k,o as j,u as A,v as V,r as D,w as G,L as P,N,A as O,U as R,V as U,W as B,X as L,Y,Z as F,_ as z,$ as _}from"../chunks/vendor-af053b12.js";const H={subscribe:e=>(()=>{const e=n("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)},X=l(new Array),W=l(null),q=l(0);var J,Q,Z,K;(Q=J||(J={}))[Q.Empty=0]="Empty",Q[Q.Marked=1]="Marked",Q[Q.Crossed=2]="Crossed",(K=Z||(Z={}))[K.Marking=0]="Marking",K[K.Crossing=1]="Crossing";class ee{constructor(){this.rows=5,this.cols=5,this.selectionMode=0,this.timerId=null}getRows(){return this.rows}getCols(){return this.cols}startNewGrid(e=5,t=5){this.rows=t,this.cols=e,X.set(te.generateGrid(e,t))}startTimer(){this.timerId=setInterval((()=>{const e=i(q);q.set(e+1)}),1e3)}stopTimer(){clearInterval(this.timerId),this.timerId=null}applySelection(e){const n=i(X),l=n[e.startCoord.x][e.startCoord.y];let a;switch(l.state){case 1:case 2:a=0;break;case 0:0===this.selectionMode?a=1:1===this.selectionMode&&(a=2)}let c,d,u="";e.startCoord.x===e.endCoord.x?(u="col",e.startCoord.y>e.endCoord.y?(c=e.endCoord.y,d=e.startCoord.y):(c=e.startCoord.y,d=e.endCoord.y)):e.startCoord.y===e.endCoord.y&&(u="row",e.startCoord.x>e.endCoord.x?(c=e.endCoord.x,d=e.startCoord.x):(c=e.startCoord.x,d=e.endCoord.x));const h=n.map((n=>n.map((n=>{const i=((e,n)=>{for(var l in n||(n={}))s.call(n,l)&&r(e,l,n[l]);if(t)for(var l of t(n))o.call(n,l)&&r(e,l,n[l]);return e})({},n);return n.state!==l.state?i:"col"===u&&n.x===e.startCoord.x&&n.y>=c&&n.y<=d||"row"===u&&n.y===e.startCoord.y&&n.x>=c&&n.x<=d?(i.state=a,i):i}))));X.set(h)}solutionIsValid(){let e=!1;return e=i(X).reduce(((e,t)=>!!e||t.reduce(((e,t)=>!!e||!(!0===t.target?1===t.state:1!==t.state)),e)),e),!e}}class te{static generateGrid(e,t){const s=new Array;for(let o=0;o<e;o++){const e=new Array;for(let s=0;s<t;s++){const t=Math.random()>=.5;e[s]={state:0,target:t,x:o,y:s}}s.push(e)}return s}static coordsAreInSelection(e,t,s){const[o,r]=s.startCoord.x>s.endCoord.x?[s.endCoord.x,s.startCoord.x]:[s.startCoord.x,s.endCoord.x],[n,l]=s.startCoord.y>s.endCoord.y?[s.endCoord.y,s.startCoord.y]:[s.startCoord.y,s.endCoord.y];return e>=o&&e<=r&&t>=n&&t<=l}static getRowGroups(e){const t=i(X),s=[];let o=0;for(let r=0;r<t.length;r++)t[r][e].target?o++:0!==o&&(s.push(o),o=0);return 0!==o&&s.push(o),s}static getColGroups(e){const t=i(X),s=[];let o=0;for(let r=t[0].length-1;r>=0;r--)t[e][r].target?o++:0!==o&&(s.push(o),o=0);return 0!==o&&s.push(o),s}static printGridSolution(){const e=i(X);let t="";for(let s=e[0].length-1;s>=0;s--){for(let o=0;o<e.length;o++)t+=e[o][s].target?"X ":"o ";t+="\n"}console.log(t)}}class se{constructor(e){this.controller=e,this.initialCoords=null,this.endCoords=null,this.valid=!1,this.onMouseDown=e=>{this.initialCoords=this.getGridCoordsFromScreenCoords(e.x,e.y),this.endCoords=this.initialCoords,this.updateSelection(),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)},this.onMouseMove=e=>{this.endCoords=this.getGridCoordsFromScreenCoords(e.x,e.y),this.valid=this.isValidSelection(),this.updateSelection()},this.onMouseUp=e=>{document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp),this.isValidSelection()&&this.controller.applySelection(this.getGridSelection()),this.resetSelection()},this.onTouchStart=e=>{this.initialCoords=this.getGridCoordsFromScreenCoords(e.touches[0].pageX,e.touches[0].pageY),this.endCoords=this.initialCoords,this.updateSelection(),document.addEventListener("touchmove",this.onTouchMove),document.addEventListener("touchend",this.onTouchEnd)},this.onTouchMove=e=>{this.endCoords=this.getGridCoordsFromScreenCoords(e.touches[0].pageX,e.touches[0].pageY),this.valid=this.isValidSelection(),this.updateSelection()},this.onTouchEnd=e=>{e.preventDefault(),document.removeEventListener("touchmove",this.onTouchMove),document.removeEventListener("touchend",this.onTouchEnd),this.isValidSelection()&&this.controller.applySelection(this.getGridSelection()),this.resetSelection()},this.onMouseDown.bind(this),this.onMouseMove.bind(this),this.onMouseUp.bind(this)}updateSelection(){const e=this.getGridSelection();i(W)!==e&&W.set(e)}isValidSelection(){return null!==this.initialCoords&&null!==this.endCoords&&(this.initialCoords.x===this.endCoords.x||this.initialCoords.y===this.endCoords.y)}getGridSelection(){return null===this.initialCoords?null:{startCoord:this.initialCoords,endCoord:this.endCoords,valid:this.isValidSelection()}}getGridCoordsFromScreenCoords(e,t){const s=document.elementFromPoint(e,t);return{x:parseInt(s.getAttribute("data-x")),y:parseInt(s.getAttribute("data-y"))}}resetSelection(){this.valid=!1,this.initialCoords=null,this.endCoords=null,this.updateSelection()}}function oe(e){let t,s,o;return{c(){t=u("div"),this.h()},l(e){t=h(e,"DIV",{"data-x":!0,"data-y":!0,class:!0}),g(t).forEach(f),this.h()},h(){m(t,"data-x",s=e[0].x),m(t,"data-y",o=e[0].y),m(t,"class","svelte-1v9rvbv"),p(t,"marked",e[0].state===J.Marked),p(t,"crossed",e[0].state===J.Crossed),p(t,"selection",e[1])},m(e,s){v(e,t,s)},p(e,[r]){1&r&&s!==(s=e[0].x)&&m(t,"data-x",s),1&r&&o!==(o=e[0].y)&&m(t,"data-y",o),1&r&&p(t,"marked",e[0].state===J.Marked),1&r&&p(t,"crossed",e[0].state===J.Crossed),2&r&&p(t,"selection",e[1])},i:y,o:y,d(e){e&&f(t)}}}function re(e,t,s){let o;$(e,W,(e=>s(2,o=e)));let{gridCell:r}=t,n=!1;return e.$$set=e=>{"gridCell"in e&&s(0,r=e.gridCell)},e.$$.update=()=>{5&e.$$.dirty&&(null!==o&&o.valid?s(1,n=te.coordsAreInSelection(r.x,r.y,o)):s(1,n=!1))},[r,n,o]}class ne extends a{constructor(e){super(),c(this,e,re,oe,d,{gridCell:0})}}function le(e,t,s){const o=e.slice();return o[12]=t[s],o[13]=t,o[14]=s,o}function ie(e,t,s){const o=e.slice();return o[15]=t[s],o}function ae(e,t,s){const o=e.slice();return o[18]=t[s],o}function ce(e,t,s){const o=e.slice();return o[21]=t[s],o}function de(e,t,s){const o=e.slice();return o[12]=t[s],o}function ue(e,t,s){const o=e.slice();return o[21]=t[s],o}function he(e){let t,s,o=e[21]+"";return{c(){t=w(o),s=u("br")},l(e){t=S(e,o),s=h(e,"BR",{})},m(e,o){v(e,t,o),v(e,s,o)},p(e,s){16&s&&o!==(o=e[21]+"")&&E(t,o)},d(e){e&&f(t),e&&f(s)}}}function ge(e){let t,s,o=te.getColGroups(e[12][0].x),r=[];for(let n=0;n<o.length;n+=1)r[n]=he(ue(e,o,n));return{c(){t=u("span");for(let e=0;e<r.length;e+=1)r[e].c();s=C(),this.h()},l(e){t=h(e,"SPAN",{class:!0});var o=g(t);for(let t=0;t<r.length;t+=1)r[t].l(o);s=b(o),o.forEach(f),this.h()},h(){m(t,"class","svelte-19vjjpb")},m(e,o){v(e,t,o);for(let s=0;s<r.length;s+=1)r[s].m(t,null);x(t,s)},p(e,n){if(16&n){let l;for(o=te.getColGroups(e[12][0].x),l=0;l<o.length;l+=1){const i=ue(e,o,l);r[l]?r[l].p(i,n):(r[l]=he(i),r[l].c(),r[l].m(t,s))}for(;l<r.length;l+=1)r[l].d(1);r.length=o.length}},d(e){e&&f(t),M(r,e)}}}function fe(e){let t,s,o=e[21]+"";return{c(){t=w(o),s=w(" ")},l(e){t=S(e,o),s=S(e," ")},m(e,o){v(e,t,o),v(e,s,o)},p(e,s){16&s&&o!==(o=e[21]+"")&&E(t,o)},d(e){e&&f(t),e&&f(s)}}}function me(e){let t,s,o,r=te.getRowGroups(e[18].y),n=[];for(let l=0;l<r.length;l+=1)n[l]=fe(ce(e,r,l));return{c(){t=u("div"),s=u("span");for(let e=0;e<n.length;e+=1)n[e].c();o=C(),this.h()},l(e){t=h(e,"DIV",{class:!0});var r=g(t);s=h(r,"SPAN",{});var l=g(s);for(let t=0;t<n.length;t+=1)n[t].l(l);l.forEach(f),o=b(r),r.forEach(f),this.h()},h(){m(t,"class","svelte-19vjjpb")},m(e,r){v(e,t,r),x(t,s);for(let t=0;t<n.length;t+=1)n[t].m(s,null);x(t,o)},p(e,t){if(16&t){let o;for(r=te.getRowGroups(e[18].y),o=0;o<r.length;o+=1){const l=ce(e,r,o);n[o]?n[o].p(l,t):(n[o]=fe(l),n[o].c(),n[o].m(s,null))}for(;o<n.length;o+=1)n[o].d(1);n.length=r.length}},d(e){e&&f(t),M(n,e)}}}function pe(e){let t,s;return t=new ne({props:{gridCell:e[15]}}),{c(){I(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,o){j(t,e,o),s=!0},p(e,s){const o={};16&s&&(o.gridCell=e[15]),t.$set(o)},i(e){s||(T(t.$$.fragment,e),s=!0)},o(e){A(t.$$.fragment,e),s=!1},d(e){V(t,e)}}}function ve(e){let t,s,o,r=e[14],n=e[12],l=[];for(let d=0;d<n.length;d+=1)l[d]=pe(ie(e,n,d));const i=e=>A(l[e],1,1,(()=>{l[e]=null})),a=()=>e[10](t,r),c=()=>e[10](null,r);return{c(){t=u("div");for(let e=0;e<l.length;e+=1)l[e].c();s=C(),this.h()},l(e){t=h(e,"DIV",{class:!0});var o=g(t);for(let t=0;t<l.length;t+=1)l[t].l(o);s=b(o),o.forEach(f),this.h()},h(){m(t,"class","grid-column svelte-19vjjpb")},m(e,r){v(e,t,r);for(let s=0;s<l.length;s+=1)l[s].m(t,null);x(t,s),a(),o=!0},p(o,d){if(e=o,16&d){let o;for(n=e[12],o=0;o<n.length;o+=1){const r=ie(e,n,o);l[o]?(l[o].p(r,d),T(l[o],1)):(l[o]=pe(r),l[o].c(),T(l[o],1),l[o].m(t,s))}for(D(),o=n.length;o<l.length;o+=1)i(o);G()}r!==e[14]&&(c(),r=e[14],a())},i(e){if(!o){for(let e=0;e<n.length;e+=1)T(l[e]);o=!0}},o(e){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)A(l[t]);o=!1},d(e){e&&f(t),M(l,e),c()}}}function ye(e){let t,s,o,r,n,l,i,a,c,d,p=e[4],y=[];for(let u=0;u<p.length;u+=1)y[u]=ge(de(e,p,u));let $=e[4][0],w=[];for(let u=0;u<$.length;u+=1)w[u]=me(ae(e,$,u));let S=e[4],E=[];for(let u=0;u<S.length;u+=1)E[u]=ve(le(e,S,u));const I=e=>A(E[e],1,1,(()=>{E[e]=null}));return{c(){t=u("div"),s=u("div"),o=u("div");for(let e=0;e<y.length;e+=1)y[e].c();r=C(),n=u("div");for(let e=0;e<w.length;e+=1)w[e].c();l=C(),i=u("div");for(let e=0;e<E.length;e+=1)E[e].c();this.h()},l(e){t=h(e,"DIV",{id:!0,class:!0});var a=g(t);s=h(a,"DIV",{id:!0,class:!0});var c=g(s);o=h(c,"DIV",{id:!0,class:!0});var d=g(o);for(let t=0;t<y.length;t+=1)y[t].l(d);d.forEach(f),r=b(c),n=h(c,"DIV",{id:!0,class:!0});var u=g(n);for(let t=0;t<w.length;t+=1)w[t].l(u);u.forEach(f),l=b(c),i=h(c,"DIV",{id:!0,class:!0});var m=g(i);for(let t=0;t<E.length;t+=1)E[t].l(m);m.forEach(f),c.forEach(f),a.forEach(f),this.h()},h(){m(o,"id","column-headings"),m(o,"class","svelte-19vjjpb"),m(n,"id","row-headings"),m(n,"class","svelte-19vjjpb"),m(i,"id","cell-container"),m(i,"class","svelte-19vjjpb"),m(s,"id","grid-container"),m(s,"class","svelte-19vjjpb"),m(t,"id","grid-slot"),m(t,"class","flex svelte-19vjjpb")},m(u,h){v(u,t,h),x(t,s),x(s,o);for(let e=0;e<y.length;e+=1)y[e].m(o,null);e[8](o),x(s,r),x(s,n);for(let e=0;e<w.length;e+=1)w[e].m(n,null);e[9](n),x(s,l),x(s,i);for(let e=0;e<E.length;e+=1)E[e].m(i,null);e[11](t),a=!0,c||(d=[P(window,"resize",e[6]),P(i,"mousedown",e[5].onMouseDown),P(i,"touchstart",e[5].onTouchStart)],c=!0)},p(e,[t]){if(16&t){let s;for(p=e[4],s=0;s<p.length;s+=1){const r=de(e,p,s);y[s]?y[s].p(r,t):(y[s]=ge(r),y[s].c(),y[s].m(o,null))}for(;s<y.length;s+=1)y[s].d(1);y.length=p.length}if(16&t){let s;for($=e[4][0],s=0;s<$.length;s+=1){const o=ae(e,$,s);w[s]?w[s].p(o,t):(w[s]=me(o),w[s].c(),w[s].m(n,null))}for(;s<w.length;s+=1)w[s].d(1);w.length=$.length}if(24&t){let s;for(S=e[4],s=0;s<S.length;s+=1){const o=le(e,S,s);E[s]?(E[s].p(o,t),T(E[s],1)):(E[s]=ve(o),E[s].c(),T(E[s],1),E[s].m(i,null))}for(D(),s=S.length;s<E.length;s+=1)I(s);G()}},i(e){if(!a){for(let e=0;e<S.length;e+=1)T(E[e]);a=!0}},o(e){E=E.filter(Boolean);for(let t=0;t<E.length;t+=1)A(E[t]);a=!1},d(s){s&&f(t),M(y,s),e[8](null),M(w,s),e[9](null),M(E,s),e[11](null),c=!1,N(d)}}}function $e(e,t,s){let o;$(e,X,(e=>s(4,o=e)));let r,n,l,{controller:i}=t,a=new se(i),c=[];const d=()=>{let e=r.clientHeight,t=r.clientWidth,s=n.clientHeight,o=l.clientWidth,a=(e-s)/i.getRows(),d=(t-o)/i.getCols(),u=(a<d?a:d)+"px";c.forEach((e=>{e.style.width=u}))};return O((()=>d())),e.$$set=e=>{"controller"in e&&s(7,i=e.controller)},[r,n,l,c,o,a,d,i,function(e){R[e?"unshift":"push"]((()=>{n=e,s(1,n)}))},function(e){R[e?"unshift":"push"]((()=>{l=e,s(2,l)}))},function(e,t){R[e?"unshift":"push"]((()=>{c[t]=e,s(3,c)}))},function(e){R[e?"unshift":"push"]((()=>{r=e,s(0,r)}))}]}class Ce extends a{constructor(e){super(),c(this,e,$e,ye,d,{controller:7})}}function be(e){let t,s;return{c(){t=u("span"),s=w(e[0]),this.h()},l(o){t=h(o,"SPAN",{class:!0});var r=g(t);s=S(r,e[0]),r.forEach(f),this.h()},h(){m(t,"class","mr-6")},m(e,o){v(e,t,o),x(t,s)},p(e,[t]){1&t&&E(s,e[0])},i:y,o:y,d(e){e&&f(t)}}}function xe(e,t,s){let o;$(e,q,(e=>s(1,o=e)));let r="00:00";return e.$$.update=()=>{if(2&e.$$.dirty){let e=new Date(null);e.setSeconds(o);let t=String(e.getMinutes()).padStart(2,"0"),n=String(e.getSeconds()).padStart(2,"0");s(0,r=`${t}:${n}`)}},[r,o]}class we extends a{constructor(e){super(),c(this,e,xe,be,d,{})}}function Se(e){let t,s,o,r,n,l,i,a,c,d,p,$,E,M,T,I;return{c(){t=u("div"),o=C(),r=u("div"),n=u("h1"),l=w("Paused"),i=C(),a=u("div"),c=u("a"),d=w("Return to main menu"),p=C(),$=u("button"),E=w("Resume Game"),this.h()},l(e){t=h(e,"DIV",{id:!0,style:!0,class:!0}),g(t).forEach(f),o=b(e),r=h(e,"DIV",{id:!0,style:!0,class:!0});var s=g(r);n=h(s,"H1",{class:!0});var u=g(n);l=S(u,"Paused"),u.forEach(f),i=b(s),a=h(s,"DIV",{class:!0});var m=g(a);c=h(m,"A",{href:!0,class:!0});var v=g(c);d=S(v,"Return to main menu"),v.forEach(f),p=b(m),$=h(m,"BUTTON",{class:!0});var y=g($);E=S(y,"Resume Game"),y.forEach(f),m.forEach(f),s.forEach(f),this.h()},h(){m(t,"id","backdrop"),m(t,"style",s=e[0]?"":"display: none;"),m(t,"class","svelte-bp4law"),m(n,"class","text-6xl mb-4 uppercase"),m(c,"href","/"),m(c,"class","block text-4xl bg-red-300 p-4 rounded-md"),m($,"class","text-4xl p-4 bg-green-300 border-2 border-green-400 rounded-md"),m(a,"class","flex flex-col h-full justify-center align-middle gap-8"),m(r,"id","menu"),m(r,"style",M=e[0]?"":"display: none;"),m(r,"class","svelte-bp4law")},m(s,u){v(s,t,u),v(s,o,u),v(s,r,u),x(r,n),x(n,l),x(r,i),x(r,a),x(a,c),x(c,d),x(a,p),x(a,$),x($,E),T||(I=[P(c,"click",e[2]),P($,"click",e[3])],T=!0)},p(e,[o]){1&o&&s!==(s=e[0]?"":"display: none;")&&m(t,"style",s),1&o&&M!==(M=e[0]?"":"display: none;")&&m(r,"style",M)},i:y,o:y,d(e){e&&f(t),e&&f(o),e&&f(r),T=!1,N(I)}}}function Ee(e,t,s){const o=U();let{modalActive:r=!1}=t;return e.$$set=e=>{"modalActive"in e&&s(0,r=e.modalActive)},[r,o,e=>{confirm("Are you sure you want to leave? You will lose your progress on this level.")||e.preventDefault()},()=>o("resume")]}class Me extends a{constructor(e){super(),c(this,e,Ee,Se,d,{modalActive:0})}}function Te(e){let t,s,o,r,n,l,i;return r=new Me({props:{modalActive:e[0]}}),r.$on("resume",e[2]),{c(){t=u("button"),s=w("Pause"),o=C(),I(r.$$.fragment),this.h()},l(e){t=h(e,"BUTTON",{class:!0});var n=g(t);s=S(n,"Pause"),n.forEach(f),o=b(e),k(r.$$.fragment,e),this.h()},h(){m(t,"class","border-2 border-blue-300 hover:bg-blue-200 active:bg-blue-400 transition-colors rounded-md p-2")},m(a,c){v(a,t,c),x(t,s),v(a,o,c),j(r,a,c),n=!0,l||(i=P(t,"click",e[1]),l=!0)},p(e,[t]){const s={};1&t&&(s.modalActive=e[0]),r.$set(s)},i(e){n||(T(r.$$.fragment,e),n=!0)},o(e){A(r.$$.fragment,e),n=!1},d(e){e&&f(t),e&&f(o),V(r,e),l=!1,i()}}}function Ie(e,t,s){let{controller:o}=t,r=!1;return e.$$set=e=>{"controller"in e&&s(3,o=e.controller)},[r,()=>{s(0,r=!0),o.stopTimer()},()=>{s(0,r=!1),o.startTimer()},o]}class ke extends a{constructor(e){super(),c(this,e,Ie,Te,d,{controller:3})}}function je(e){let t,s,o,r,n,l,i,a,c,d,p,$,E,M,T,I;return{c(){t=u("div"),s=u("h1"),o=w("You completed this nonogram!"),r=C(),n=u("p"),l=w("Your completion time: "),i=u("span"),a=w(e[0]),c=C(),d=u("a"),p=w("Play Again"),$=C(),E=u("a"),M=w("Return to Main Menu"),this.h()},l(u){t=h(u,"DIV",{class:!0});var m=g(t);s=h(m,"H1",{class:!0});var v=g(s);o=S(v,"You completed this nonogram!"),v.forEach(f),r=b(m),n=h(m,"P",{class:!0});var y=g(n);l=S(y,"Your completion time: "),i=h(y,"SPAN",{class:!0});var C=g(i);a=S(C,e[0]),C.forEach(f),y.forEach(f),c=b(m),d=h(m,"A",{href:!0,class:!0});var x=g(d);p=S(x,"Play Again"),x.forEach(f),$=b(m),E=h(m,"A",{href:!0,class:!0});var w=g(E);M=S(w,"Return to Main Menu"),w.forEach(f),m.forEach(f),this.h()},h(){m(s,"class","text-4xl mb-4"),m(i,"class","text-green-500"),m(n,"class","text-2xl"),m(d,"href","."),m(d,"class","text-xl border-green-500 bg-green-300 rounded-md svelte-ywcr2g"),m(E,"href","/"),m(E,"class","text-xl border-blue-500 bg-blue-300 rounded-md svelte-ywcr2g"),m(t,"class","w-screen h-screen fixed z-10 flex flex-col justify-center items-center bg-yellow-300 text-center")},m(u,h){v(u,t,h),x(t,s),x(s,o),x(t,r),x(t,n),x(n,l),x(n,i),x(i,a),x(t,c),x(t,d),x(d,p),x(t,$),x(t,E),x(E,M),T||(I=P(d,"click",e[2]),T=!0)},p:y,i:y,o:y,d(e){e&&f(t),T=!1,I()}}}function Ae(e,t,s){let{completionTime:o}=t,r=new Date(null);r.setSeconds(o);const n=`${String(r.getMinutes()).padStart(2,"0")}:${String(r.getSeconds()).padStart(2,"0")}`;return e.$$set=e=>{"completionTime"in e&&s(1,o=e.completionTime)},[n,o,()=>(location.reload(),!1)]}class Ve extends a{constructor(e){super(),c(this,e,Ae,je,d,{completionTime:1})}}function De(e){let t,s;return t=new Ve({props:{completionTime:e[3]}}),{c(){I(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,o){j(t,e,o),s=!0},p(e,s){const o={};8&s&&(o.completionTime=e[3]),t.$set(o)},i(e){s||(T(t.$$.fragment,e),s=!0)},o(e){A(t.$$.fragment,e),s=!1},d(e){V(t,e)}}}function Ge(e){let t,s,o,r,n;return{c(){t=u("span"),s=w("Puzzle is not yet complete"),this.h()},l(e){t=h(e,"SPAN",{class:!0});var o=g(t);s=S(o,"Puzzle is not yet complete"),o.forEach(f),this.h()},h(){m(t,"class","inline-block fixed top-2 left-2 sm:relative sm:top-0 sm:left-0 sm:ml-4 sm:mr-auto px-4 py-2 text-xl rounded-sm bg-yellow-200")},m(e,o){v(e,t,o),x(t,s),n=!0},i(e){n||(B((()=>{r&&r.end(1),o=L(t,z,{y:-50,duration:1e3}),o.start()})),n=!0)},o(e){o&&o.invalidate(),r=Y(t,_,{}),n=!1},d(e){e&&f(t),e&&r&&r.end()}}}function Pe(e){let t,s,o,r,n,l,i,a,c,d,y,$,E,M,O,R,U,B,L,Y,F,z,_,H,X=e[2]&&De(e),W=e[1]&&Ge();return n=new we({}),i=new ke({props:{controller:e[0]}}),c=new Ce({props:{controller:e[0]}}),{c(){X&&X.c(),t=C(),s=u("div"),o=u("div"),W&&W.c(),r=C(),I(n.$$.fragment),l=C(),I(i.$$.fragment),a=C(),I(c.$$.fragment),d=C(),y=u("div"),$=u("button"),E=w("Submit"),M=C(),O=u("button"),R=u("div"),U=C(),B=u("button"),L=C(),Y=u("button"),F=w("Submit"),this.h()},l(e){X&&X.l(e),t=b(e),s=h(e,"DIV",{id:!0,class:!0});var u=g(s);o=h(u,"DIV",{id:!0,class:!0});var m=g(o);W&&W.l(m),r=b(m),k(n.$$.fragment,m),l=b(m),k(i.$$.fragment,m),m.forEach(f),a=b(u),k(c.$$.fragment,u),d=b(u),y=h(u,"DIV",{id:!0,class:!0});var p=g(y);$=h(p,"BUTTON",{class:!0});var v=g($);E=S(v,"Submit"),v.forEach(f),M=b(p),O=h(p,"BUTTON",{id:!0,class:!0});var C=g(O);R=h(C,"DIV",{class:!0}),g(R).forEach(f),C.forEach(f),U=b(p),B=h(p,"BUTTON",{id:!0,class:!0}),g(B).forEach(f),L=b(p),Y=h(p,"BUTTON",{id:!0,class:!0});var x=g(Y);F=S(x,"Submit"),x.forEach(f),p.forEach(f),u.forEach(f),this.h()},h(){m(o,"id","game-header"),m(o,"class","flex flex-shrink-0 flex-grow-0 items-center justify-end text-3xl svelte-18gycse"),m($,"class","hidden sm:block invisible mr-auto ml-16 svelte-18gycse"),m(R,"class","svelte-18gycse"),m(O,"id","mark-button"),m(O,"class","mx-2 svelte-18gycse"),p(O,"active",e[0].selectionMode===Z.Marking),m(B,"id","cross-button"),m(B,"class","mx-2 svelte-18gycse"),p(B,"active",e[0].selectionMode===Z.Crossing),m(Y,"id","submit-button"),m(Y,"class","mx-2 sm:ml-auto sm:mr-16 svelte-18gycse"),m(y,"id","game-footer"),m(y,"class","flex flex-shrink-0 flex-grow-0 justify-center items-center py-2 svelte-18gycse"),m(s,"id","game-container"),m(s,"class","px-2 h-screen svelte-18gycse")},m(u,h){X&&X.m(u,h),v(u,t,h),v(u,s,h),x(s,o),W&&W.m(o,null),x(o,r),j(n,o,null),x(o,l),j(i,o,null),x(s,a),j(c,s,null),x(s,d),x(s,y),x(y,$),x($,E),x(y,M),x(y,O),x(O,R),x(y,U),x(y,B),x(y,L),x(y,Y),x(Y,F),z=!0,_||(H=[P(O,"click",e[7]),P(B,"click",e[8]),P(Y,"click",e[4])],_=!0)},p(e,[s]){e[2]?X?(X.p(e,s),4&s&&T(X,1)):(X=De(e),X.c(),T(X,1),X.m(t.parentNode,t)):X&&(D(),A(X,1,1,(()=>{X=null})),G()),e[1]?W?2&s&&T(W,1):(W=Ge(),W.c(),T(W,1),W.m(o,r)):W&&(D(),A(W,1,1,(()=>{W=null})),G());const n={};1&s&&(n.controller=e[0]),i.$set(n);const l={};1&s&&(l.controller=e[0]),c.$set(l),1&s&&p(O,"active",e[0].selectionMode===Z.Marking),1&s&&p(B,"active",e[0].selectionMode===Z.Crossing)},i(e){z||(T(X),T(W),T(n.$$.fragment,e),T(i.$$.fragment,e),T(c.$$.fragment,e),z=!0)},o(e){A(X),A(W),A(n.$$.fragment,e),A(i.$$.fragment,e),A(c.$$.fragment,e),z=!1},d(e){X&&X.d(e),e&&f(t),e&&f(s),W&&W.d(),V(n),V(i),V(c),_=!1,N(H)}}}function Ne(e,t,s){let o;$(e,q,(e=>s(9,o=e)));let r=new ee,{rows:n}=t,{cols:l}=t,i=!1,a=!1,c=null;r.startNewGrid(l,n),O((()=>{F(q,o=0,o),r.startTimer()}));const d=()=>{setTimeout((()=>{s(1,i=!1)}),3e3)};return e.$$set=e=>{"rows"in e&&s(5,n=e.rows),"cols"in e&&s(6,l=e.cols)},[r,i,a,c,()=>{r.solutionIsValid()?(r.stopTimer(),s(3,c=o),s(2,a=!0)):(s(1,i=!0),d())},n,l,()=>s(0,r.selectionMode=Z.Marking,r),()=>s(0,r.selectionMode=Z.Crossing,r)]}class Oe extends a{constructor(e){super(),c(this,e,Ne,Pe,d,{rows:5,cols:6})}}function Re(e){let t,s;return t=new Oe({props:{rows:e[0],cols:e[1]}}),{c(){I(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,o){j(t,e,o),s=!0},p(e,[s]){const o={};1&s&&(o.rows=e[0]),2&s&&(o.cols=e[1]),t.$set(o)},i(e){s||(T(t.$$.fragment,e),s=!0)},o(e){A(t.$$.fragment,e),s=!1},d(e){V(t,e)}}}function Ue(e,t,s){let o;$(e,H,(e=>s(2,o=e)));let r=parseInt(o.query.get("rows")),n=parseInt(o.query.get("cols"));return r>=5&&r<=15||(r=5),n>=5&&n<=15||(n=5),[r,n]}class Be extends a{constructor(e){super(),c(this,e,Ue,Re,d,{})}}export{Be as default};
