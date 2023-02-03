!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=16)}([function(e,n){const t={primary:0,secondary:2,auxiliary:1},o={position:{x:0,y:0},pressed:{0:void 0,1:void 0,2:void 0},isPressed:function(e="primary"){const n=this.getPressed(e);return null!=n&&n.state},wasJustPressed:function(e="primary",n=!0,t=1e3/60){const o=this.getPressed(e);return null!=o&&(window.performance.now()-o.time<t&&o.state==n)},getPressed:function(e){return this.pressed[e]||this.pressed[t[e]]},setPressed:function(e,n){this.pressed[e]={time:window.performance.now(),state:n}},setPosition:function(e){this.position.x=e.x,this.position.y=e.y}};document.addEventListener("mousedown",e=>o.setPressed(e.button,!0)),document.addEventListener("mouseup",e=>o.setPressed(e.button,!1)),document.addEventListener("mousemove",e=>o.setPosition({x:e.clientX,y:e.clientY})),document.addEventListener("pointerdown",e=>o.setPressed(e.button||0,!0)),document.addEventListener("pointerup",e=>o.setPressed(e.button||0,!1)),document.addEventListener("pointermove",e=>o.setPosition({x:e.clientX,y:e.clientY})),document.addEventListener("touchstart",e=>o.setPressed(0,!0)),document.addEventListener("touchend",e=>o.setPressed(0,!1)),document.addEventListener("touchstart",e=>o.setPosition({x:e.touches[0].clientX,y:e.touches[0].clientY})),document.addEventListener("touchend",e=>o.setPosition({x:e.touches[0].clientX,y:e.touches[0].clientY})),document.addEventListener("touchmove",e=>o.setPosition({x:e.touches[0].clientX,y:e.touches[0].clientY})),document.addEventListener("contextmenu",e=>{1==o.isIgnoringContextMenu&&e.preventDefault()}),document.addEventListener("touchstart",e=>{o.isIgnoringTouchHover&&e.preventDefault()}),e.exports=o},function(e,n,t){var o=t(3);e.exports=function(e){return this.func=e,this.fps=60,this.cap=1e3,new o(e=>{"number"==typeof this.cap&&(e=Math.min(e,this.cap)),e={ms:e,s:e/1e3,f:e/(1e3/this.fps)},this.func(e)})}},function(e,n){let t=void 0,o=void 0;function r(){if(void 0!==t&&void 0!==o){const e=Math.floor(window.innerWidth/t),n=Math.floor(window.innerHeight/o);window.document.documentElement.style.fontSize=Math.min(e,n)+"px"}}e.exports=function(e){t=e.width,o=e.height,r()},window.addEventListener("resize",r)},function(e,n){e.exports=function(e){!function n(t){e(Math.min(window.performance.now()-t,1e3)),window.requestAnimationFrame(n.bind(this,window.performance.now()))}(window.performance.now())}},function(e,n,t){var o=t(5),r=t(6);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);e.exports=r.locals||{}},function(e,n,t){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),l=[];function u(e){for(var n=-1,t=0;t<l.length;t++)if(l[t].identifier===e){n=t;break}return n}function s(e,n){for(var t={},o=[],r=0;r<e.length;r++){var i=e[r],s=n.base?i[0]+n.base:i[0],c=t[s]||0,a="".concat(s," ").concat(c);t[s]=c+1;var f=u(a),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(l[f].references++,l[f].updater(d)):l.push({identifier:a,updater:h(d,n),references:1}),o.push(a)}return o}function c(e){var n=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=t.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){n.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(n);else{var l=i(e.insert||"head");if(!l)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");l.appendChild(n)}return n}var a,f=(a=[],function(e,n){return a[e]=n,a.filter(Boolean).join("\n")});function d(e,n,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=f(n,r);else{var i=document.createTextNode(r),l=e.childNodes;l[n]&&e.removeChild(l[n]),l.length?e.insertBefore(i,l[n]):e.appendChild(i)}}function _(e,n,t){var o=t.css,r=t.media,i=t.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var p=null,m=0;function h(e,n){var t,o,r;if(n.singleton){var i=m++;t=p||(p=c(n)),o=d.bind(null,t,i,!1),r=d.bind(null,t,i,!0)}else t=c(n),o=_.bind(null,t,n),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return o(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;o(e=n)}else r()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=r());var t=s(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<t.length;o++){var r=u(t[o]);l[r].references--}for(var i=s(e,n),c=0;c<t.length;c++){var a=u(t[c]);0===l[a].references&&(l[a].updater(),l.splice(a,1))}t=i}}}},function(e,n,t){var o=t(7),r=t(8),i=t(9),l=t(10),u=t(11),s=t(12),c=t(13),a=t(14),f=t(15);n=o(!1);var d=r(i),_=r(l),p=r(u),m=r(s),h=r(c),v=r(a),y=r(f);n.push([e.i,'* {\n  margin: 0px;\n  padding: 0px;\n  cursor: default;\n  box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n}\nbody {\n  background-color: #111;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@font-face {\n  font-weight: 400;\n  font-family: "comfortaa";\n  src: url('+d+') format("truetype");\n}\n@font-face {\n  font-weight: 400;\n  font-stretch: normal;\n  font-family: "roboto";\n  src: url('+_+') format("truetype");\n}\n@font-face {\n  font-weight: 600;\n  font-stretch: normal;\n  font-family: "roboto";\n  src: url('+p+') format("truetype");\n}\n@font-face {\n  font-weight: 200;\n  font-stretch: normal;\n  font-family: "roboto";\n  src: url('+m+') format("truetype");\n}\n@font-face {\n  font-weight: 400;\n  font-stretch: condensed;\n  font-family: "roboto";\n  src: url('+h+') format("truetype");\n}\n@font-face {\n  font-weight: 600;\n  font-stretch: condensed;\n  font-family: "roboto";\n  src: url('+v+') format("truetype");\n}\n@font-face {\n  font-weight: 200;\n  font-stretch: condensed;\n  font-family: "roboto";\n  src: url('+y+') format("truetype");\n}\n.Mount {\n  top: 0em;\n  left: 0em;\n  right: 0em;\n  bottom: 0em;\n  position: absolute;\n}\n.MainScreen {\n  padding: 1em;\n  color: #FBFEF9;\n  font-family: Roboto, Helvetica, sans-serif;\n}\n.CookbookSpace {\n  top: 0em;\n  left: 0em;\n  width: 15em;\n  bottom: 0em;\n  position: absolute;\n  padding: 1em;\n  background-color: #444;\n}\n.CookbookSpace div {\n  margin-bottom: 0.61804697em;\n}\n.CookingSpace {\n  top: 0em;\n  left: 15em;\n  right: 0em;\n  bottom: 0em;\n  padding: 1em;\n  position: absolute;\n}\n.CookingSpace .SelectedItem {\n  position: fixed !important;\n  pointer-events: none !important;\n}\n.CookingSpace .Item {\n  position: absolute;\n  text-align: center;\n}\n.CookingSpace .Stove {\n  width: 10em;\n  height: 10em;\n  background-color: black;\n}\n.CookingSpace .Stove.atEase {\n  top: 5em;\n  left: 10em;\n}\n.CookingSpace .Sink {\n  width: 5em;\n  height: 5em;\n  background-color: #AAA;\n}\n.CookingSpace .Sink.atEase {\n  top: 5em;\n  left: 21em;\n}\n.CookingSpace .CuttingBoard {\n  width: 10em;\n  height: 5em;\n  border-radius: 1em;\n  background-color: #784c2c;\n}\n.CookingSpace .CuttingBoard.atEase {\n  top: 20em;\n  left: 10em;\n}\n.CookingSpace .Pot {\n  width: 5em;\n  height: 5em;\n  position: absolute;\n  margin-top: -2.5em;\n  margin-left: -2.5em;\n  border-radius: 100%;\n  background-color: gray;\n}\n.CookingSpace .Pot.atEase {\n  left: 10em;\n  top: 10em;\n}\n.CookingSpace .Onions {\n  top: 1em;\n}\n.CookingSpace .Carrots {\n  top: 3em;\n  color: orange;\n}\n.CookingSpace .Garlic {\n  top: 5em;\n}\n.CookingSpace .Salt {\n  top: 7em;\n}\n.CookingSpace .Beef {\n  top: 9em;\n  color: brown;\n}\n.Frame {\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  width: 48em;\n  height: 27em;\n  font-size: 0.33333333em;\n  margin: auto;\n  position: fixed;\n  overflow: hidden;\n  background-color: green;\n}\n',""]),e.exports=n},function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",o=e[3];if(!o)return t;if(n&&"function"==typeof btoa){var r=(l=o,u=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(s," */")),i=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([r]).join("\n")}var l,u,s;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var l=this[i][0];null!=l&&(r[l]=!0)}for(var u=0;u<e.length;u++){var s=[].concat(e[u]);o&&r[s[0]]||(t&&(s[2]?s[2]="".concat(t," and ").concat(s[2]):s[2]=t),n.push(s))}},n}},function(e,n,t){"use strict";e.exports=function(e,n){return n||(n={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(e,n,t){e.exports=t.p+"a6707143c08357a98c345854736fb894.ttf"},function(e,n,t){e.exports=t.p+"8a36205bd9b83e03af0591a004bc97f4.ttf"},function(e,n,t){e.exports=t.p+"b8e42971dec8d49207a8c8e2b919a6ac.ttf"},function(e,n,t){e.exports=t.p+"881e150ab929e26d1f812c4342c15a7c.ttf"},function(e,n,t){e.exports=t.p+"0134dd8fe6fe708de73909a71d842780.ttf"},function(e,n,t){e.exports=t.p+"e38804ae070b58fbf4fdd88fd6853929.ttf"},function(e,n,t){e.exports=t.p+"905c2728284a6b881d4e417b80f1e79d.ttf"},function(e,n,t){"use strict";t.r(n);var o,r,i,l,u,s={},c=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function f(e,n){for(var t in n)e[t]=n[t];return e}function d(e){var n=e.parentNode;n&&n.removeChild(e)}function _(e,n,t){var r,i,l,u={};for(l in n)"key"==l?r=n[l]:"ref"==l?i=n[l]:u[l]=n[l];if(arguments.length>2&&(u.children=arguments.length>3?o.call(arguments,2):t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===u[l]&&(u[l]=e.defaultProps[l]);return p(e,u,r,i,null)}function p(e,n,t,o,l){var u={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++i:l};return null==l&&null!=r.vnode&&r.vnode(u),u}function m(e){return e.children}function h(e,n){this.props=e,this.context=n}function v(e,n){if(null==n)return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?v(e):null}function y(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return y(e)}}function b(e){(!e.__d&&(e.__d=!0)&&l.push(e)&&!g.__r++||u!==r.debounceRendering)&&((u=r.debounceRendering)||setTimeout)(g)}function g(){for(var e;g.__r=l.length;)e=l.sort((function(e,n){return e.__v.__b-n.__v.__b})),l=[],e.some((function(e){var n,t,o,r,i,l;e.__d&&(i=(r=(n=e).__v).__e,(l=n.__P)&&(t=[],(o=f({},r)).__v=r.__v+1,M(l,r,o,n.__n,void 0!==l.ownerSVGElement,null!=r.__h?[i]:null,t,null==i?v(r):i,r.__h),L(t,r),r.__e!=i&&y(r)))}))}function k(e,n,t,o,r,i,l,u,a,f){var d,_,h,y,b,g,k,x=o&&o.__k||c,C=x.length;for(t.__k=[],d=0;d<n.length;d++)if(null!=(y=t.__k[d]=null==(y=n[d])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(m,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)){if(y.__=t,y.__b=t.__b+1,null===(h=x[d])||h&&y.key==h.key&&y.type===h.type)x[d]=void 0;else for(_=0;_<C;_++){if((h=x[_])&&y.key==h.key&&y.type===h.type){x[_]=void 0;break}h=null}M(e,y,h=h||s,r,i,l,u,a,f),b=y.__e,(_=y.ref)&&h.ref!=_&&(k||(k=[]),h.ref&&k.push(h.ref,null,y),k.push(_,y.__c||b,y)),null!=b?(null==g&&(g=b),"function"==typeof y.type&&y.__k===h.__k?y.__d=a=S(y,a,e):a=w(e,y,h,x,b,a),"function"==typeof t.type&&(t.__d=a)):a&&h.__e==a&&a.parentNode!=e&&(a=v(h))}for(t.__e=g,d=C;d--;)null!=x[d]&&I(x[d],x[d]);if(k)for(d=0;d<k.length;d++)j(k[d],k[++d],k[++d])}function S(e,n,t){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,n="function"==typeof o.type?S(o,n,t):w(t,o,o,r,o.__e,n));return n}function w(e,n,t,o,r,i){var l,u,s;if(void 0!==n.__d)l=n.__d,n.__d=void 0;else if(null==t||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(u=i,s=0;(u=u.nextSibling)&&s<o.length;s+=1)if(u==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function x(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||a.test(n)?t:t+"px"}function C(e,n,t,o,r){var i;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||x(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||x(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])i=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+i]=t,t?o||e.addEventListener(n,i?E:P,i):e.removeEventListener(n,i?E:P,i);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null==t||!1===t&&-1==n.indexOf("-")?e.removeAttribute(n):e.setAttribute(n,t))}}function P(e){this.l[e.type+!1](r.event?r.event(e):e)}function E(e){this.l[e.type+!0](r.event?r.event(e):e)}function M(e,n,t,o,i,l,u,s,c){var a,d,_,p,v,y,b,g,S,w,x,C,P,E,M,L=n.type;if(void 0!==n.constructor)return null;null!=t.__h&&(c=t.__h,s=n.__e=t.__e,n.__h=null,l=[s]),(a=r.__b)&&a(n);try{e:if("function"==typeof L){if(g=n.props,S=(a=L.contextType)&&o[a.__c],w=a?S?S.props.value:a.__:o,t.__c?b=(d=n.__c=t.__c).__=d.__E:("prototype"in L&&L.prototype.render?n.__c=d=new L(g,w):(n.__c=d=new h(g,w),d.constructor=L,d.render=N),S&&S.sub(d),d.props=g,d.state||(d.state={}),d.context=w,d.__n=o,_=d.__d=!0,d.__h=[],d._sb=[]),null==d.__s&&(d.__s=d.state),null!=L.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=f({},d.__s)),f(d.__s,L.getDerivedStateFromProps(g,d.__s))),p=d.props,v=d.state,_)null==L.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==L.getDerivedStateFromProps&&g!==p&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(g,w),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(g,d.__s,w)||n.__v===t.__v){for(d.props=g,d.state=d.__s,n.__v!==t.__v&&(d.__d=!1),d.__v=n,n.__e=t.__e,n.__k=t.__k,n.__k.forEach((function(e){e&&(e.__=n)})),x=0;x<d._sb.length;x++)d.__h.push(d._sb[x]);d._sb=[],d.__h.length&&u.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(g,d.__s,w),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(p,v,y)}))}if(d.context=w,d.props=g,d.__v=n,d.__P=e,C=r.__r,P=0,"prototype"in L&&L.prototype.render){for(d.state=d.__s,d.__d=!1,C&&C(n),a=d.render(d.props,d.state,d.context),E=0;E<d._sb.length;E++)d.__h.push(d._sb[E]);d._sb=[]}else do{d.__d=!1,C&&C(n),a=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++P<25);d.state=d.__s,null!=d.getChildContext&&(o=f(f({},o),d.getChildContext())),_||null==d.getSnapshotBeforeUpdate||(y=d.getSnapshotBeforeUpdate(p,v)),M=null!=a&&a.type===m&&null==a.key?a.props.children:a,k(e,Array.isArray(M)?M:[M],n,t,o,i,l,u,s,c),d.base=n.__e,n.__h=null,d.__h.length&&u.push(d),b&&(d.__E=d.__=null),d.__e=!1}else null==l&&n.__v===t.__v?(n.__k=t.__k,n.__e=t.__e):n.__e=T(t.__e,n,t,o,i,l,u,c);(a=r.diffed)&&a(n)}catch(e){n.__v=null,(c||null!=l)&&(n.__e=s,n.__h=!!c,l[l.indexOf(s)]=null),r.__e(e,n,t)}}function L(e,n){r.__c&&r.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){r.__e(e,n.__v)}}))}function T(e,n,t,r,i,l,u,c){var a,f,_,p=t.props,m=n.props,h=n.type,y=0;if("svg"===h&&(i=!0),null!=l)for(;y<l.length;y++)if((a=l[y])&&"setAttribute"in a==!!h&&(h?a.localName===h:3===a.nodeType)){e=a,l[y]=null;break}if(null==e){if(null===h)return document.createTextNode(m);e=i?document.createElementNS("http://www.w3.org/2000/svg",h):document.createElement(h,m.is&&m),l=null,c=!1}if(null===h)p===m||c&&e.data===m||(e.data=m);else{if(l=l&&o.call(e.childNodes),f=(p=t.props||s).dangerouslySetInnerHTML,_=m.dangerouslySetInnerHTML,!c){if(null!=l)for(p={},y=0;y<e.attributes.length;y++)p[e.attributes[y].name]=e.attributes[y].value;(_||f)&&(_&&(f&&_.__html==f.__html||_.__html===e.innerHTML)||(e.innerHTML=_&&_.__html||""))}if(function(e,n,t,o,r){var i;for(i in t)"children"===i||"key"===i||i in n||C(e,i,null,t[i],o);for(i in n)r&&"function"!=typeof n[i]||"children"===i||"key"===i||"value"===i||"checked"===i||t[i]===n[i]||C(e,i,n[i],t[i],o)}(e,m,p,i,c),_)n.__k=[];else if(y=n.props.children,k(e,Array.isArray(y)?y:[y],n,t,r,i&&"foreignObject"!==h,l,u,l?l[0]:t.__k&&v(t,0),c),null!=l)for(y=l.length;y--;)null!=l[y]&&d(l[y]);c||("value"in m&&void 0!==(y=m.value)&&(y!==e.value||"progress"===h&&!y||"option"===h&&y!==p.value)&&C(e,"value",y,p.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==e.checked&&C(e,"checked",y,p.checked,!1))}return e}function j(e,n,t){try{"function"==typeof e?e(n):e.current=n}catch(e){r.__e(e,t)}}function I(e,n,t){var o,i;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||j(o,null,n)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,n)}o.base=o.__P=null,e.__c=void 0}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&I(o[i],n,t||"function"!=typeof e.type);t||null==e.__e||d(e.__e),e.__=e.__e=e.__d=void 0}function N(e,n,t){return this.constructor(e,t)}function O(e,n,t){var i,l,u;r.__&&r.__(e,n),l=(i="function"==typeof t)?null:t&&t.__k||n.__k,u=[],M(n,e=(!i&&t||n).__k=_(m,null,[e]),l||s,s,void 0!==n.ownerSVGElement,!i&&t?[t]:l?null:n.firstChild?o.call(n.childNodes):null,u,!i&&t?t:l?l.__e:n.firstChild,i),L(u,e)}o=c.slice,r={__e:function(e,n,t,o){for(var r,i,l;n=n.__;)if((r=n.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),l=r.__d),l)return r.__E=r}catch(n){e=n}throw e}},i=0,h.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=f({},this.state),"function"==typeof e&&(e=e(f({},t),this.props)),e&&f(t,e),null!=e&&this.__v&&(n&&this._sb.push(n),b(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),b(this))},h.prototype.render=m,l=[],g.__r=0;var A=t(1),U=t.n(A),D=(t(4),t(0)),B=t.n(D);function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function R(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(r=o.key,i=void 0,i=function(e,n){if("object"!==F(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var o=t.call(e,n||"default");if("object"!==F(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(r,"string"),"symbol"===F(i)?i:String(i)),o)}var r,i}function W(e,n,t){return n&&R(e.prototype,n),t&&R(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var z=function(){function e(){H(this,e)}return W(e,[{key:"render",value:function(){return _("div",{className:"Mount"},_("div",{className:"Frame"},_(X,null)))}}]),e}(),X=function(){function e(){H(this,e)}return W(e,[{key:"render",value:function(){return _("div",{class:"MainScreen",onClick:this.onClick},_("div",{class:"CookbookSpace"},_("div",null,"SOUP????"),_("div",null,"Step 1: Add water to pot."),_("div",null,"Step 2: Put pot on stove. Boil."),_("div",null,"Step 3: Cut onions, carrots and garlic. Put in pot."),_("div",null,"Step 4: Stir."),_("div",null,"Step 5: Cut beef into tiny(?) cubes. Put in the pot."),_("div",null,"Step 6: Stir."),_("div",null,"Step 7: Add salt, to taste."),_("div",null,"Step 8: Eat!!")),_("div",{class:"CookingSpace"},_(Y,{item:"CuttingBoard",unselectable:!0}),_(Y,{item:"Sink",unselectable:!0}),_(Y,{item:"Stove",unselectable:!0}),_(Y,{item:"Pot"}),_(Y,{item:"Salt"}),_(Y,{item:"Beef"}),_(Y,{item:"Onions"}),_(Y,{item:"Carrots"}),_(Y,{item:"Garlic"}),_(G,null)))}},{key:"onClick",get:function(){return function(e){$.selectedItem=void 0}}}]),e}(),Y=function(){function e(){H(this,e)}return W(e,[{key:"render",value:function(){return _("div",{class:this.class,onClick:this.onClick,style:{display:$.selectedItem!=this.props.item?"block":"none"}},this.props.item)}},{key:"onClick",get:function(){var e=this;return function(n){n.stopPropagation(),$.selectedItem,1!=e.props.unselectable&&($.selectedItem=e.props.item)}}},{key:"class",get:function(){return["Item",this.props.item,"atEase"].join(" ")}}]),e}(),G=function(){function e(){H(this,e)}return W(e,[{key:"render",value:function(){if(null!=$.selectedItem)return _("div",{class:"SelectedItem "+$.selectedItem,style:this.style},$.selectedItem)}},{key:"style",get:function(){return{left:B.a.position.x+"px",top:B.a.position.y+"px"}}}]),e}(),$={selectedItem:void 0,items:{CuttingBoard:{}}},J=t(2),q=t.n(J);new U.a((function(e){this.mount=O(_(z,null),document.body,this.mount)}));q()({width:16,height:9})}]);
//# sourceMappingURL=index.js.map