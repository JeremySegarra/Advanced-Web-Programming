import{d as h,o as l,c as d,a as s,t as f,b as p,e as E,f as T,g as A,r as U,h as x,u as r,i as u,w as m,p as N,j as S,k as P,l as R,F as I,m as V,n as b,R as g,q as H,s as M}from"./vendor.396ea1e0.js";const W=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}};W();const q="modulepreload",L={},F="/",D=function(n,o){return!o||o.length===0?n():Promise.all(o.map(a=>{if(a=`${F}${a}`,a in L)return;L[a]=!0;const t=a.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${i}`))return;const c=document.createElement("link");if(c.rel=t?"stylesheet":q,t||(c.as="script",c.crossOrigin=""),c.href=a,document.head.appendChild(c),t)return new Promise((k,B)=>{c.addEventListener("load",k),c.addEventListener("error",B)})})).then(()=>n())},J={class:"section"},K=s("h1",{class:"title"},"Home Page",-1),z=[K],Y=h({setup(e){return(n,o)=>(l(),d("div",J,z))}}),G={class:"section"},Q={class:"title"},v=h({props:{title:{type:String,default:"Hello World"}},setup(e){const n=e;return(o,a)=>(l(),d("div",null,[s("div",G,[s("h1",Q,f(n.title),1)])]))}}),X={class:"section"},Z=s("h1",{class:"title"},"Login Page",-1),ss=s("span",{class:"icon"},[s("i",{class:"fa fa-sign-in"})],-1),ts=p(" Login "),es=[ss,ts],os=p(" \xA0 "),ns=s("span",{class:"icon"},[s("i",{class:"fa fa-sign-in"})],-1),as=s("span",null," Bad Login",-1),is=[ns,as],rs=h({setup(e){function n(){C("Moshe Choen","meme")}function o(){C("vp","password")}return(a,t)=>(l(),d("div",X,[Z,s("button",{class:"button is-primary",onClick:o},es),os,s("button",{class:"button is-warning",onClick:n},is)]))}}),cs=[{path:"/",component:Y},{path:"/about",component:v,props:{title:"About Page!"}},{path:"/contact",component:v,props:{title:"Contact Page!"}},{path:"/login",component:rs},{path:"/signup",component:v,props:{title:"SignUp Page!"}},{path:"/wall",component:()=>D(()=>import("./Wall.677b46d7.js"),["assets/Wall.677b46d7.js","assets/Wall.a0b51b7e.css","assets/vendor.396ea1e0.js"])},{path:"/hidden",component:v,props:{title:"You reached the hidden page"}}],y=E({history:T(),routes:cs,linkActiveClass:"is-active"});y.beforeEach((e,n)=>{_.destinationUrl==null&&e.path!="/login"&&(_.destinationUrl=e.path),console.log({to:e});const o=["/messages","/wall","/feed","/hidden"];if(console.table({protectedUrls:o}),o.includes(e.path)&&!_.user)return console.log("requires login"),"/login"});const ls=[{firstName:"John",lastName:"Doe",handle:"johndoe",password:"password",email:"jhon@doe.com",pic:"https://randomuser.me/api/portraits/men/1.jpg",id:1},{firstName:"Vladimir",lastName:"Putin",handle:"russian_dictator",password:"long table",email:"jhon@doe.com",pic:"https://randomuser.me/api/portraits/men/2.jpg",id:2},{firstName:"Kamala",lastName:"Harris",handle:"vp",password:"password",email:"kamala@whitehouse.org",pic:"https://randomuser.me/api/portraits/women/3.jpg",id:3}],j=A("messages",{state:()=>({notifications:[{type:"primary",message:"This is a primary notification"},{type:"link",message:"This is a primary notification"},{type:"success",message:"This is a primary notification"},{type:"warning",message:"This is a primary notification"},{type:"danger",message:"I cant believe you jsut did that!"}]}),actions:{close(e){this.notifications.splice(e,1)}}}),$=U({user:null,destinationUrl:null});async function C(e,n){var t;const o=ls.find(i=>i.handle===e),a=j();try{if(!o)throw{message:"User not found"};if(o.password!==n)throw{message:"Incorrect password"};a.notifications.push({type:"success",message:`Welcome Back ${o.firstName}!`}),$.user=o,y.push((t=$.destinationUrl)!=null?t:"/wall")}catch(i){a.notifications.push({type:"danger",message:i.message}),console.table(a.notifications)}}function ds(){$.user=null,y.push("/login")}var _=$;var O=(e,n)=>{const o=e.__vccOpts||e;for(const[a,t]of n)o[a]=t;return o};const w=e=>(N("data-v-34f0f8f0"),e=e(),S(),e),us={key:0,class:"buttons"},_s=w(()=>s("strong",null,"Sign up",-1)),ps=p(" Log in "),hs={key:1,class:"buttons"},ms={class:"avatar"},fs=["src"],gs=w(()=>s("br",null,null,-1)),vs=w(()=>s("strong",null,"Log out",-1)),bs=[vs],$s=h({setup(e){return(n,o)=>{const a=x("router-link");return r(_).user?(l(),d("div",hs,[s("div",ms,[s("img",{src:r(_).user.pic},null,8,fs),s("div",null,[s("strong",null,f(r(_).user.firstName)+" "+f(r(_).user.lastName),1),gs,s("i",null,f(r(_).user.email),1)])]),s("a",{class:"button is-primary",onClick:o[0]||(o[0]=t=>r(ds)())},bs)])):(l(),d("div",us,[u(a,{class:"button is-primary",to:"/signup"},{default:m(()=>[_s]),_:1}),u(a,{class:"button is-light",to:"/login"},{default:m(()=>[ps]),_:1})]))}}});var ys=O($s,[["__scopeId","data-v-34f0f8f0"]]);const ws=e=>(N("data-v-7fa158f0"),e=e(),S(),e),ks=ws(()=>s("span",{class:"icon"},[s("i",{class:"fas fa-bell"})],-1)),Ls={key:0,class:"tag is-danger"},Cs={class:"navbar-dropdown"},xs=["onClick"],Ns=h({setup(e){const n=j(),o=P(!1);return(a,t)=>(l(),d("div",{class:b(["navbar-item has-dropdown",{"is-active":o.value}])},[s("a",{class:"navbar-link",onClick:t[0]||(t[0]=i=>o.value=!o.value)},[ks,r(n).notifications.length?(l(),d("span",Ls,f(r(n).notifications.length),1)):R("",!0)]),s("div",Cs,[(l(!0),d(I,null,V(r(n).notifications,(i,c)=>(l(),d("div",{class:b(`notification is-light is-${i.type}`)},[s("button",{class:"delete",onClick:k=>r(n).close(c)},null,8,xs),p(" "+f(i.message),1)],2))),256))])],2))}});var Ss=O(Ns,[["__scopeId","data-v-7fa158f0"]]);const Ps={class:"navbar is-info",role:"navigation","aria-label":"main navigation"},Is={class:"container"},js={class:"navbar-brand"},Os=s("a",{class:"navbar-item",href:"https://bulma.io"},[s("img",{src:"https://bulma.io/images/bulma-logo.png",width:"112",height:"28"})],-1),Bs=s("span",{"aria-hidden":"true"},null,-1),Es=s("span",{"aria-hidden":"true"},null,-1),Ts=s("span",{"aria-hidden":"true"},null,-1),As=[Bs,Es,Ts],Us={class:"navbar-start"},Rs=p(" Home "),Vs=p(" Wall "),Hs={class:"navbar-item has-dropdown is-hoverable"},Ms=s("a",{class:"navbar-link"}," More ",-1),Ws={class:"navbar-dropdown"},qs=p(" About "),Fs=s("a",{class:"navbar-item"}," Jobs ",-1),Ds=p(" Contact "),Js=s("hr",{class:"navbar-divider"},null,-1),Ks=s("a",{class:"navbar-item"}," Report an issue ",-1),zs={class:"navbar-end"},Ys={class:"navbar-item"},Gs=s("div",{class:"navbar-item"},[s("a",{class:"bd-tw-button button","data-social-network":"Twitter","data-social-action":"tweet","data-social-target":"https://bulma.io",target:"_blank",href:"https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&hashtags=bulmaio&url=https://bulma.io&via=jgthms"},[s("span",{class:"icon"},[s("i",{class:"fab fa-twitter"})]),s("span",null," Tweet ")])],-1),Qs=h({setup(e){const n=P(!1);return(o,a)=>(l(),d("nav",Ps,[s("div",Is,[s("div",js,[Os,s("a",{role:"button",class:b(["navbar-burger",{"is-active":n.value}]),"aria-label":"menu","aria-expanded":"false",onClick:a[0]||(a[0]=t=>n.value=!n.value)},As,2)]),s("div",{class:b(["navbar-menu",{"is-active":n.value}])},[s("div",Us,[u(r(g),{class:"navbar-item",to:"/"},{default:m(()=>[Rs]),_:1}),u(r(g),{class:"navbar-item",to:"/wall"},{default:m(()=>[Vs]),_:1}),s("div",Hs,[Ms,s("div",Ws,[u(r(g),{class:"navbar-item",to:"/about"},{default:m(()=>[qs]),_:1}),Fs,u(r(g),{class:"navbar-item",to:"/contact"},{default:m(()=>[Ds]),_:1}),Js,Ks])])]),s("div",zs,[s("div",Ys,[u(ys)]),u(Ss),Gs])],2)])]))}}),Xs={class:"container"},Zs=h({setup(e){return(n,o)=>{const a=x("router-view");return l(),d(I,null,[u(Qs),s("div",Xs,[u(a)])],64)}}});H(Zs).use(y).use(M()).mount("#app");