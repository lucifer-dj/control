(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4671f6ee"],{"20f6":function(t,r,n){},"4b85":function(t,r,n){},a523:function(t,r,n){"use strict";n("20f6"),n("4b85");var a=n("2b0e");function s(t){return a["a"].extend({name:"v-"+t,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(r,{props:n,data:a,children:s}){a.staticClass=`${t} ${a.staticClass||""}`.trim();const{attrs:e}=a;if(e){a.attrs={};const t=Object.keys(e).filter(t=>{if("slot"===t)return!1;const r=e[t];return t.startsWith("data-")?(a.attrs[t]=r,!1):r||"string"===typeof r});t.length&&(a.staticClass+=" "+t.join(" "))}return n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),r(n.tag,a,s)}})}var e=n("d9f7");r["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:r,data:n,children:a}){let s;const{attrs:i}=n;return i&&(n.attrs={},s=Object.keys(i).filter(t=>{if("slot"===t)return!1;const r=i[t];return t.startsWith("data-")?(n.attrs[t]=r,!1):r||"string"===typeof r})),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,Object(e["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(s||[])}),a)}})}}]);