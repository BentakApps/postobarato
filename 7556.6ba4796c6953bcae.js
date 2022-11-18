(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7556],{7556:(p,R,r)=>{"use strict";r.d(R,{e:()=>e});var t=r(5861),h=r(6738),c=r(2982);let e=(()=>{class n{constructor(a){var o=this;this.networkService=a,this.user={photo:"assets/no-user.png",idProvider:"",userId:"",name:"",firstName:"",lastName:"",reputation:0},this.decodedToken={},this.isLoggedIn=(0,t.Z)(function*(){if(o.decodedToken.exp<(new Date).getTime()/1e3)return!0;try{const u=yield o.networkService.refreshToken();return o.setToken(u.data),!0}catch(u){return console.error(u),!1}}),this.setToken=u=>{this.idToken=u,this.decodedToken=this.decodeJwt(u),this.user={idProvider:this.decodedToken.aud,userId:this.decodedToken.sub,name:this.decodedToken.name,firstName:this.decodedToken.firstname,lastName:this.decodedToken.lastname,photo:this.decodedToken.photo,reputation:this.decodedToken.reputation}},this.logout=()=>(this.user={photo:"assets/no-user.png",idProvider:"",userId:"",name:"",firstName:"",lastName:"",reputation:0},this.idToken="",this.decodedToken={},this.networkService.logout())}decodeJwt(a){const u=a.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),m=decodeURIComponent(window.atob(u).split("").map(function(d){return"%"+("00"+d.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(m)}}return n.\u0275fac=function(a){return new(a||n)(h.LFG(c.S))},n.\u0275prov=h.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},2982:(p,R,r)=>{"use strict";r.d(R,{S:()=>e});var t=r(3014),h=r.n(t),c=r(6738);let e=(()=>{class n{constructor(){this.url="https://api.postobarato.tk",this.api=h().create({baseURL:this.url}),this.getStations=(a,o,u,m)=>this.api.get("/stations",{params:{north:u,south:a,west:o,east:m}}),this.getFuelList=()=>this.api.get("/fuels"),this.getPaymentList=()=>this.api.get("/payments"),this.postPrice=a=>this.api.post("/stations/price",a),this.getKeys=()=>this.api.get("/keys"),this.googleAuthentication=a=>this.api.post("/googleauth",a,{withCredentials:!0}),this.refreshToken=()=>this.api.get("/refreshtoken",{withCredentials:!0}),this.logout=()=>this.api.post("/logout",{},{withCredentials:!0})}}return n.\u0275fac=function(a){return new(a||n)},n.\u0275prov=c.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},3014:(p,R,r)=>{p.exports=r(7114)},7729:(p,R,r)=>{"use strict";var t=r(4701),h=r(858),c=r(5738),e=r(1625),n=r(5215),l=r(2099),a=r(6100),o=r(5867),u=r(133),m=r(1841),d=r(6700);p.exports=function(f){return new Promise(function(A,w){var D,O=f.data,T=f.headers,g=f.responseType;function F(){f.cancelToken&&f.cancelToken.unsubscribe(D),f.signal&&f.signal.removeEventListener("abort",D)}t.isFormData(O)&&t.isStandardBrowserEnv()&&delete T["Content-Type"];var v=new XMLHttpRequest;if(f.auth){var N=f.auth.username||"",I=f.auth.password?unescape(encodeURIComponent(f.auth.password)):"";T.Authorization="Basic "+btoa(N+":"+I)}var L=n(f.baseURL,f.url);function M(){if(v){var b="getAllResponseHeaders"in v?l(v.getAllResponseHeaders()):null;h(function(s){A(s),F()},function(s){w(s),F()},{data:g&&"text"!==g&&"json"!==g?v.response:v.responseText,status:v.status,statusText:v.statusText,headers:b,config:f,request:v}),v=null}}if(v.open(f.method.toUpperCase(),e(L,f.params,f.paramsSerializer),!0),v.timeout=f.timeout,"onloadend"in v?v.onloadend=M:v.onreadystatechange=function(){!v||4!==v.readyState||0===v.status&&(!v.responseURL||0!==v.responseURL.indexOf("file:"))||setTimeout(M)},v.onabort=function(){!v||(w(new u("Request aborted",u.ECONNABORTED,f,v)),v=null)},v.onerror=function(){w(new u("Network Error",u.ERR_NETWORK,f,v,v)),v=null},v.ontimeout=function(){var B=f.timeout?"timeout of "+f.timeout+"ms exceeded":"timeout exceeded";f.timeoutErrorMessage&&(B=f.timeoutErrorMessage),w(new u(B,(f.transitional||o).clarifyTimeoutError?u.ETIMEDOUT:u.ECONNABORTED,f,v)),v=null},t.isStandardBrowserEnv()){var k=(f.withCredentials||a(L))&&f.xsrfCookieName?c.read(f.xsrfCookieName):void 0;k&&(T[f.xsrfHeaderName]=k)}"setRequestHeader"in v&&t.forEach(T,function(B,U){typeof O>"u"&&"content-type"===U.toLowerCase()?delete T[U]:v.setRequestHeader(U,B)}),t.isUndefined(f.withCredentials)||(v.withCredentials=!!f.withCredentials),g&&"json"!==g&&(v.responseType=f.responseType),"function"==typeof f.onDownloadProgress&&v.addEventListener("progress",f.onDownloadProgress),"function"==typeof f.onUploadProgress&&v.upload&&v.upload.addEventListener("progress",f.onUploadProgress),(f.cancelToken||f.signal)&&(D=function(b){!v||(w(!b||b&&b.type?new m:b),v.abort(),v=null)},f.cancelToken&&f.cancelToken.subscribe(D),f.signal&&(f.signal.aborted?D():f.signal.addEventListener("abort",D))),O||(O=null);var j=d(L);j&&-1===["http","https","file"].indexOf(j)?w(new u("Unsupported protocol "+j+":",u.ERR_BAD_REQUEST,f)):v.send(O)})}},7114:(p,R,r)=>{"use strict";var t=r(4701),h=r(2414),c=r(6490),e=r(2971),a=function l(o){var u=new c(o),m=h(c.prototype.request,u);return t.extend(m,c.prototype,u),t.extend(m,u),m.create=function(i){return l(e(o,i))},m}(r(4498));a.Axios=c,a.CanceledError=r(1841),a.CancelToken=r(3056),a.isCancel=r(8827),a.VERSION=r(1773).version,a.toFormData=r(78),a.AxiosError=r(133),a.Cancel=a.CanceledError,a.all=function(u){return Promise.all(u)},a.spread=r(9211),a.isAxiosError=r(4603),p.exports=a,p.exports.default=a},3056:(p,R,r)=>{"use strict";var t=r(1841);function h(c){if("function"!=typeof c)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(a){e=a});var n=this;this.promise.then(function(l){if(n._listeners){var a,o=n._listeners.length;for(a=0;a<o;a++)n._listeners[a](l);n._listeners=null}}),this.promise.then=function(l){var a,o=new Promise(function(u){n.subscribe(u),a=u}).then(l);return o.cancel=function(){n.unsubscribe(a)},o},c(function(a){n.reason||(n.reason=new t(a),e(n.reason))})}h.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},h.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},h.prototype.unsubscribe=function(e){if(this._listeners){var n=this._listeners.indexOf(e);-1!==n&&this._listeners.splice(n,1)}},h.source=function(){var e;return{token:new h(function(a){e=a}),cancel:e}},p.exports=h},1841:(p,R,r)=>{"use strict";var t=r(133);function c(e){t.call(this,e??"canceled",t.ERR_CANCELED),this.name="CanceledError"}r(4701).inherits(c,t,{__CANCEL__:!0}),p.exports=c},8827:p=>{"use strict";p.exports=function(r){return!(!r||!r.__CANCEL__)}},6490:(p,R,r)=>{"use strict";var t=r(4701),h=r(1625),c=r(607),e=r(957),n=r(2971),l=r(5215),a=r(4828),o=a.validators;function u(m){this.defaults=m,this.interceptors={request:new c,response:new c}}u.prototype.request=function(d,i){"string"==typeof d?(i=i||{}).url=d:i=d||{},(i=n(this.defaults,i)).method=i.method?i.method.toLowerCase():this.defaults.method?this.defaults.method.toLowerCase():"get";var f=i.transitional;void 0!==f&&a.assertOptions(f,{silentJSONParsing:o.transitional(o.boolean),forcedJSONParsing:o.transitional(o.boolean),clarifyTimeoutError:o.transitional(o.boolean)},!1);var y=[],A=!0;this.interceptors.request.forEach(function(N){"function"==typeof N.runWhen&&!1===N.runWhen(i)||(A=A&&N.synchronous,y.unshift(N.fulfilled,N.rejected))});var O,w=[];if(this.interceptors.response.forEach(function(N){w.push(N.fulfilled,N.rejected)}),!A){var T=[e,void 0];for(Array.prototype.unshift.apply(T,y),T=T.concat(w),O=Promise.resolve(i);T.length;)O=O.then(T.shift(),T.shift());return O}for(var g=i;y.length;){var D=y.shift(),F=y.shift();try{g=D(g)}catch(v){F(v);break}}try{O=e(g)}catch(v){return Promise.reject(v)}for(;w.length;)O=O.then(w.shift(),w.shift());return O},u.prototype.getUri=function(d){d=n(this.defaults,d);var i=l(d.baseURL,d.url);return h(i,d.params,d.paramsSerializer)},t.forEach(["delete","get","head","options"],function(d){u.prototype[d]=function(i,f){return this.request(n(f||{},{method:d,url:i,data:(f||{}).data}))}}),t.forEach(["post","put","patch"],function(d){function i(f){return function(A,w,O){return this.request(n(O||{},{method:d,headers:f?{"Content-Type":"multipart/form-data"}:{},url:A,data:w}))}}u.prototype[d]=i(),u.prototype[d+"Form"]=i(!0)}),p.exports=u},133:(p,R,r)=>{"use strict";var t=r(4701);function h(n,l,a,o,u){Error.call(this),this.message=n,this.name="AxiosError",l&&(this.code=l),a&&(this.config=a),o&&(this.request=o),u&&(this.response=u)}t.inherits(h,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var c=h.prototype,e={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(n){e[n]={value:n}}),Object.defineProperties(h,e),Object.defineProperty(c,"isAxiosError",{value:!0}),h.from=function(n,l,a,o,u,m){var d=Object.create(c);return t.toFlatObject(n,d,function(f){return f!==Error.prototype}),h.call(d,n.message,l,a,o,u),d.name=n.name,m&&Object.assign(d,m),d},p.exports=h},607:(p,R,r)=>{"use strict";var t=r(4701);function h(){this.handlers=[]}h.prototype.use=function(e,n,l){return this.handlers.push({fulfilled:e,rejected:n,synchronous:!!l&&l.synchronous,runWhen:l?l.runWhen:null}),this.handlers.length-1},h.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},h.prototype.forEach=function(e){t.forEach(this.handlers,function(l){null!==l&&e(l)})},p.exports=h},5215:(p,R,r)=>{"use strict";var t=r(8692),h=r(4554);p.exports=function(e,n){return e&&!t(n)?h(e,n):n}},957:(p,R,r)=>{"use strict";var t=r(4701),h=r(5134),c=r(8827),e=r(4498),n=r(1841);function l(a){if(a.cancelToken&&a.cancelToken.throwIfRequested(),a.signal&&a.signal.aborted)throw new n}p.exports=function(o){return l(o),o.headers=o.headers||{},o.data=h.call(o,o.data,o.headers,o.transformRequest),o.headers=t.merge(o.headers.common||{},o.headers[o.method]||{},o.headers),t.forEach(["delete","get","head","post","put","patch","common"],function(d){delete o.headers[d]}),(o.adapter||e.adapter)(o).then(function(d){return l(o),d.data=h.call(o,d.data,d.headers,o.transformResponse),d},function(d){return c(d)||(l(o),d&&d.response&&(d.response.data=h.call(o,d.response.data,d.response.headers,o.transformResponse))),Promise.reject(d)})}},2971:(p,R,r)=>{"use strict";var t=r(4701);p.exports=function(c,e){e=e||{};var n={};function l(i,f){return t.isPlainObject(i)&&t.isPlainObject(f)?t.merge(i,f):t.isPlainObject(f)?t.merge({},f):t.isArray(f)?f.slice():f}function a(i){return t.isUndefined(e[i])?t.isUndefined(c[i])?void 0:l(void 0,c[i]):l(c[i],e[i])}function o(i){if(!t.isUndefined(e[i]))return l(void 0,e[i])}function u(i){return t.isUndefined(e[i])?t.isUndefined(c[i])?void 0:l(void 0,c[i]):l(void 0,e[i])}function m(i){return i in e?l(c[i],e[i]):i in c?l(void 0,c[i]):void 0}var d={url:o,method:o,data:o,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:m};return t.forEach(Object.keys(c).concat(Object.keys(e)),function(f){var y=d[f]||a,A=y(f);t.isUndefined(A)&&y!==m||(n[f]=A)}),n}},858:(p,R,r)=>{"use strict";var t=r(133);p.exports=function(c,e,n){var l=n.config.validateStatus;n.status&&l&&!l(n.status)?e(new t("Request failed with status code "+n.status,[t.ERR_BAD_REQUEST,t.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):c(n)}},5134:(p,R,r)=>{"use strict";var t=r(4701),h=r(4498);p.exports=function(e,n,l){var a=this||h;return t.forEach(l,function(u){e=u.call(a,e,n)}),e}},4498:(p,R,r)=>{"use strict";var t=r(4701),h=r(5620),c=r(133),e=r(5867),n=r(78),l={"Content-Type":"application/x-www-form-urlencoded"};function a(d,i){!t.isUndefined(d)&&t.isUndefined(d["Content-Type"])&&(d["Content-Type"]=i)}var m={transitional:e,adapter:function o(){var d;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&"[object process]"===Object.prototype.toString.call(process))&&(d=r(7729)),d}(),transformRequest:[function(i,f){if(h(f,"Accept"),h(f,"Content-Type"),t.isFormData(i)||t.isArrayBuffer(i)||t.isBuffer(i)||t.isStream(i)||t.isFile(i)||t.isBlob(i))return i;if(t.isArrayBufferView(i))return i.buffer;if(t.isURLSearchParams(i))return a(f,"application/x-www-form-urlencoded;charset=utf-8"),i.toString();var w,y=t.isObject(i),A=f&&f["Content-Type"];if((w=t.isFileList(i))||y&&"multipart/form-data"===A){var O=this.env&&this.env.FormData;return n(w?{"files[]":i}:i,O&&new O)}return y||"application/json"===A?(a(f,"application/json"),function u(d,i,f){if(t.isString(d))try{return(i||JSON.parse)(d),t.trim(d)}catch(y){if("SyntaxError"!==y.name)throw y}return(f||JSON.stringify)(d)}(i)):i}],transformResponse:[function(i){var f=this.transitional||m.transitional,w=!(f&&f.silentJSONParsing)&&"json"===this.responseType;if(w||f&&f.forcedJSONParsing&&t.isString(i)&&i.length)try{return JSON.parse(i)}catch(O){if(w)throw"SyntaxError"===O.name?c.from(O,c.ERR_BAD_RESPONSE,this,null,this.response):O}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:r(9454)},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};t.forEach(["delete","get","head"],function(i){m.headers[i]={}}),t.forEach(["post","put","patch"],function(i){m.headers[i]=t.merge(l)}),p.exports=m},5867:p=>{"use strict";p.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},1773:p=>{p.exports={version:"0.27.2"}},2414:p=>{"use strict";p.exports=function(r,t){return function(){for(var c=new Array(arguments.length),e=0;e<c.length;e++)c[e]=arguments[e];return r.apply(t,c)}}},1625:(p,R,r)=>{"use strict";var t=r(4701);function h(c){return encodeURIComponent(c).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}p.exports=function(e,n,l){if(!n)return e;var a;if(l)a=l(n);else if(t.isURLSearchParams(n))a=n.toString();else{var o=[];t.forEach(n,function(d,i){null===d||typeof d>"u"||(t.isArray(d)?i+="[]":d=[d],t.forEach(d,function(y){t.isDate(y)?y=y.toISOString():t.isObject(y)&&(y=JSON.stringify(y)),o.push(h(i)+"="+h(y))}))}),a=o.join("&")}if(a){var u=e.indexOf("#");-1!==u&&(e=e.slice(0,u)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},4554:p=>{"use strict";p.exports=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r}},5738:(p,R,r)=>{"use strict";var t=r(4701);p.exports=t.isStandardBrowserEnv()?{write:function(e,n,l,a,o,u){var m=[];m.push(e+"="+encodeURIComponent(n)),t.isNumber(l)&&m.push("expires="+new Date(l).toGMTString()),t.isString(a)&&m.push("path="+a),t.isString(o)&&m.push("domain="+o),!0===u&&m.push("secure"),document.cookie=m.join("; ")},read:function(e){var n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},8692:p=>{"use strict";p.exports=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)}},4603:(p,R,r)=>{"use strict";var t=r(4701);p.exports=function(c){return t.isObject(c)&&!0===c.isAxiosError}},6100:(p,R,r)=>{"use strict";var t=r(4701);p.exports=t.isStandardBrowserEnv()?function(){var n,c=/(msie|trident)/i.test(navigator.userAgent),e=document.createElement("a");function l(a){var o=a;return c&&(e.setAttribute("href",o),o=e.href),e.setAttribute("href",o),{href:e.href,protocol:e.protocol?e.protocol.replace(/:$/,""):"",host:e.host,search:e.search?e.search.replace(/^\?/,""):"",hash:e.hash?e.hash.replace(/^#/,""):"",hostname:e.hostname,port:e.port,pathname:"/"===e.pathname.charAt(0)?e.pathname:"/"+e.pathname}}return n=l(window.location.href),function(o){var u=t.isString(o)?l(o):o;return u.protocol===n.protocol&&u.host===n.host}}():function(){return!0}},5620:(p,R,r)=>{"use strict";var t=r(4701);p.exports=function(c,e){t.forEach(c,function(l,a){a!==e&&a.toUpperCase()===e.toUpperCase()&&(c[e]=l,delete c[a])})}},9454:p=>{p.exports=null},2099:(p,R,r)=>{"use strict";var t=r(4701),h=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];p.exports=function(e){var l,a,o,n={};return e&&t.forEach(e.split("\n"),function(m){if(o=m.indexOf(":"),l=t.trim(m.substr(0,o)).toLowerCase(),a=t.trim(m.substr(o+1)),l){if(n[l]&&h.indexOf(l)>=0)return;n[l]="set-cookie"===l?(n[l]?n[l]:[]).concat([a]):n[l]?n[l]+", "+a:a}}),n}},6700:p=>{"use strict";p.exports=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}},9211:p=>{"use strict";p.exports=function(r){return function(h){return r.apply(null,h)}}},78:(p,R,r)=>{"use strict";var t=r(4701);p.exports=function h(c,e){e=e||new FormData;var n=[];function l(o){return null===o?"":t.isDate(o)?o.toISOString():t.isArrayBuffer(o)||t.isTypedArray(o)?"function"==typeof Blob?new Blob([o]):Buffer.from(o):o}return function a(o,u){if(t.isPlainObject(o)||t.isArray(o)){if(-1!==n.indexOf(o))throw Error("Circular reference detected in "+u);n.push(o),t.forEach(o,function(d,i){if(!t.isUndefined(d)){var y,f=u?u+"."+i:i;if(d&&!u&&"object"==typeof d)if(t.endsWith(i,"{}"))d=JSON.stringify(d);else if(t.endsWith(i,"[]")&&(y=t.toArray(d)))return void y.forEach(function(A){!t.isUndefined(A)&&e.append(f,l(A))});a(d,f)}}),n.pop()}else e.append(u,l(o))}(c),e}},4828:(p,R,r)=>{"use strict";var t=r(1773).version,h=r(133),c={};["object","boolean","number","function","string","symbol"].forEach(function(l,a){c[l]=function(u){return typeof u===l||"a"+(a<1?"n ":" ")+l}});var e={};c.transitional=function(a,o,u){function m(d,i){return"[Axios v"+t+"] Transitional option '"+d+"'"+i+(u?". "+u:"")}return function(d,i,f){if(!1===a)throw new h(m(i," has been removed"+(o?" in "+o:"")),h.ERR_DEPRECATED);return o&&!e[i]&&(e[i]=!0,console.warn(m(i," has been deprecated since v"+o+" and will be removed in the near future"))),!a||a(d,i,f)}},p.exports={assertOptions:function n(l,a,o){if("object"!=typeof l)throw new h("options must be an object",h.ERR_BAD_OPTION_VALUE);for(var u=Object.keys(l),m=u.length;m-- >0;){var d=u[m],i=a[d];if(i){var f=l[d],y=void 0===f||i(f,d,l);if(!0!==y)throw new h("option "+d+" must be "+y,h.ERR_BAD_OPTION_VALUE)}else if(!0!==o)throw new h("Unknown option "+d,h.ERR_BAD_OPTION)}},validators:c}},4701:(p,R,r)=>{"use strict";var s,t=r(2414),h=Object.prototype.toString,c=(s=Object.create(null),function(E){var x=h.call(E);return s[x]||(s[x]=x.slice(8,-1).toLowerCase())});function e(s){return s=s.toLowerCase(),function(x){return c(x)===s}}function n(s){return Array.isArray(s)}function l(s){return typeof s>"u"}var o=e("ArrayBuffer");function i(s){return null!==s&&"object"==typeof s}function f(s){if("object"!==c(s))return!1;var E=Object.getPrototypeOf(s);return null===E||E===Object.prototype}var y=e("Date"),A=e("File"),w=e("Blob"),O=e("FileList");function T(s){return"[object Function]"===h.call(s)}var F=e("URLSearchParams");function I(s,E){if(!(null===s||typeof s>"u"))if("object"!=typeof s&&(s=[s]),n(s))for(var x=0,P=s.length;x<P;x++)E.call(null,s[x],x,s);else for(var S in s)Object.prototype.hasOwnProperty.call(s,S)&&E.call(null,s[S],S,s)}var H=function(s){return function(E){return s&&E instanceof s}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array));p.exports={isArray:n,isArrayBuffer:o,isBuffer:function a(s){return null!==s&&!l(s)&&null!==s.constructor&&!l(s.constructor)&&"function"==typeof s.constructor.isBuffer&&s.constructor.isBuffer(s)},isFormData:function D(s){var E="[object FormData]";return s&&("function"==typeof FormData&&s instanceof FormData||h.call(s)===E||T(s.toString)&&s.toString()===E)},isArrayBufferView:function u(s){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(s):s&&s.buffer&&o(s.buffer)},isString:function m(s){return"string"==typeof s},isNumber:function d(s){return"number"==typeof s},isObject:i,isPlainObject:f,isUndefined:l,isDate:y,isFile:A,isBlob:w,isFunction:T,isStream:function g(s){return i(s)&&T(s.pipe)},isURLSearchParams:F,isStandardBrowserEnv:function N(){return(!(typeof navigator<"u")||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&typeof window<"u"&&typeof document<"u"},forEach:I,merge:function L(){var s={};function E(S,C){s[C]=f(s[C])&&f(S)?L(s[C],S):f(S)?L({},S):n(S)?S.slice():S}for(var x=0,P=arguments.length;x<P;x++)I(arguments[x],E);return s},extend:function M(s,E,x){return I(E,function(S,C){s[C]=x&&"function"==typeof S?t(S,x):S}),s},trim:function v(s){return s.trim?s.trim():s.replace(/^\s+|\s+$/g,"")},stripBOM:function k(s){return 65279===s.charCodeAt(0)&&(s=s.slice(1)),s},inherits:function j(s,E,x,P){s.prototype=Object.create(E.prototype,P),s.prototype.constructor=s,x&&Object.assign(s.prototype,x)},toFlatObject:function b(s,E,x){var P,S,C,J={};E=E||{};do{for(S=(P=Object.getOwnPropertyNames(s)).length;S-- >0;)J[C=P[S]]||(E[C]=s[C],J[C]=!0);s=Object.getPrototypeOf(s)}while(s&&(!x||x(s,E))&&s!==Object.prototype);return E},kindOf:c,kindOfTest:e,endsWith:function B(s,E,x){s=String(s),(void 0===x||x>s.length)&&(x=s.length);var P=s.indexOf(E,x-=E.length);return-1!==P&&P===x},toArray:function U(s){if(!s)return null;var E=s.length;if(l(E))return null;for(var x=new Array(E);E-- >0;)x[E]=s[E];return x},isTypedArray:H,isFileList:O}}}]);