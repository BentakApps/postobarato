"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2080],{2080:(_,p,a)=>{a.r(p),a.d(p,{HomePageModule:()=>k});var m=a(6895),h=a(4719),i=a(5616),s=a(8359),t=a(5861),e=a(6738),u=a(7556),c=a(1258),d=a(2982);const v=["signinbutton"],P=[{path:"",component:(()=>{class n{constructor(o,l,r,f){this.authService=o,this.googleAuthService=l,this.networkService=r,this.router=f}ionViewDidEnter(){var o=this;return(0,t.Z)(function*(){var l;console.log("IONVIEWDIDENTER"),(yield o.authService.isLoggedIn())?o.router.navigate(["/map"]):(yield o.googleAuthService.init({client_id:"934173952337-ejc5hhli75b4vmghqjjc6jiufomptit2.apps.googleusercontent.com",auto_select:!0,itp_support:!0,login_uri:"https://api.postobarato.tk/googleauth/",callback:(l=(0,t.Z)(function*(r){const x=(yield o.networkService.googleAuthentication({googleToken:r.credential})).data;o.authService.setToken(x),o.router.navigate(["/map"])}),function(f){return l.apply(this,arguments)})}),o.googleAuthService.renderButton(o.signInButton.nativeElement,{type:"standard",shape:"pill",locale:"pt-BR"}))})()}soon(){}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(u.e),e.Y36(c.M),e.Y36(d.S),e.Y36(s.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-home"]],viewQuery:function(o,l){if(1&o&&e.Gf(v,5),2&o){let r;e.iGM(r=e.CRH())&&(l.signInButton=r.first)}},decls:23,vars:0,consts:[[1,"main"],["src","assets/map-background.png",1,"backdrop"],[1,"title","ion-text-center"],[1,"sign-in"],["signinbutton",""],["routerLink","/map"],[1,"note"],[1,"store-buttons"],["src","assets/google-play.png",1,"badge",3,"click"],["src","assets/app-store.svg",1,"badge","apple-badge",3,"click"],[1,"credits","ion-text-center"]],template:function(o,l){1&o&&(e.TgZ(0,"div",0),e._UZ(1,"img",1),e.TgZ(2,"div",2)(3,"h1"),e._uU(4,"PostoBarato"),e.qZA(),e.TgZ(5,"p"),e._uU(6,"Sua comunidade de pre\xe7os de combust\xedveis"),e.qZA()(),e.TgZ(7,"div",3),e._UZ(8,"div",null,4),e.TgZ(10,"p")(11,"a",5),e._uU(12," Entrar sem logar "),e.qZA()(),e.TgZ(13,"p",6),e._uU(14," (N\xe3o \xe9 poss\xedvel cadastrar, apenas consultar) "),e.qZA()(),e.TgZ(15,"div",7)(16,"img",8),e.NdJ("click",function(){return l.soon()}),e.qZA(),e.TgZ(17,"img",9),e.NdJ("click",function(){return l.soon()}),e.qZA()(),e.TgZ(18,"div",10)(19,"p"),e._uU(20," Google Play e o logotipo do Google Play s\xe3o marcas registradas da Google LLC. "),e.qZA(),e.TgZ(21,"p"),e._uU(22," App Store e o logotipo da Apple s\xe3o marcas registradas da Apple Inc. "),e.qZA()()())},dependencies:[i.Fo,s.yS],styles:[".main[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center;overflow:hidden;position:relative}.backdrop[_ngcontent-%COMP%]{position:absolute;left:0;top:0;opacity:.6;max-width:unset;margin-left:50%;transform:translate(-50%)}.title[_ngcontent-%COMP%]{position:relative;width:100%;color:#215a60;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.sign-in[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;position:relative;-webkit-backdrop-filter:brightness(.5);backdrop-filter:brightness(.5);width:100%;padding:15px}.sign-in[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}asl-google-signin-button[_ngcontent-%COMP%]{margin-bottom:15px}.note[_ngcontent-%COMP%]{color:var(--ion-text-color);font-size:smaller}.store-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;padding:10px;position:relative}.badge[_ngcontent-%COMP%]{max-width:50%;height:auto}.apple-badge[_ngcontent-%COMP%]{padding:2%;width:100%}.credits[_ngcontent-%COMP%]{position:relative;width:100%;padding:0;font-size:9px;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}"]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.Bz.forChild(P),s.Bz]}),n})(),k=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.ez,h.u5,i.Pc,y]}),n})()},1258:(_,p,a)=>{a.d(p,{M:()=>h});var m=a(6738);let h=(()=>{class i{constructor(){this.init=t=>new Promise((e,u)=>{try{this.loadScript("GOOGLE","https://accounts.google.com/gsi/client",()=>{google.accounts.id.initialize({client_id:t.client_id,auto_select:!!t.auto_select&&t.auto_select,login_uri:t.login_uri,native_callback:t.native_callback,cancel_on_tap_outside:!t.cancel_on_tap_outside||t.cancel_on_tap_outside,prompt_parent_id:t.prompt_parent_id,nonce:t.nonce,context:t.context?t.context:"signin",state_cookie_domain:t.state_cookie_domain,ux_mode:t.ux_mode?t.ux_mode:"popup",allowed_parent_origin:t.allowed_parent_origin,intermediate_iframe_close_callback:t.intermediate_iframe_close_callback,itp_support:!!t.itp_support&&t.itp_support,callback:t.callback}),e()})}catch(c){u(c)}})}loadScript(t,e,u,c=null){if(typeof document<"u"&&!document.getElementById(t)){let d=document.createElement("script");d.async=!0,d.src=e,d.onload=u,c||(c=document.head),c.appendChild(d)}}renderButton(t,e){google.accounts.id.renderButton(t,{type:e.type?e.type:"standard",theme:e.theme?e.theme:"outline",size:e.size?e.size:"large",text:e.text?e.text:"signin_with",shape:e.shape?e.shape:"rectangular",logo_alignment:e.logo_alignment?e.logo_alignment:"left",width:e.width,locale:e.locale})}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=m.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()}}]);