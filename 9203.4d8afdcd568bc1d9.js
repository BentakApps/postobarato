"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9203],{9203:(j,m,i)=>{i.r(m),i.d(m,{DetailsPageModule:()=>O});var g=i(6895),x=i(4719),n=i(5616),r=i(8359),T=i(5861),v=i(2986),e=i(6738),y=i(4530),P=i(8261),A=i(3811);const b=["photo"];function U(t,a){if(1&t&&(e.TgZ(0,"ion-item")(1,"ion-grid")(2,"ion-row")(3,"ion-col")(4,"p",10),e._uU(5),e.qZA()(),e.TgZ(6,"ion-col")(7,"p",10),e._uU(8),e.qZA()()()()()),2&t){const o=e.oxw(2);e.xp6(5),e.hij(" Etanol / Gasolina: ",o.etanolgasolina,"% "),e.xp6(3),e.hij(" Mais barato: ","?"==o.etanolgasolina?"?":+o.etanolgasolina>=70?"G":"E"," ")}}function D(t,a){if(1&t&&(e.TgZ(0,"ion-item-sliding")(1,"ion-item")(2,"ion-grid")(3,"ion-row")(4,"ion-col",11)(5,"h1",10),e._uU(6),e.qZA(),e.TgZ(7,"p",10),e._uU(8),e.qZA()(),e.TgZ(9,"ion-col",12)(10,"h1",10),e._uU(11),e.ALo(12,"number"),e.qZA(),e.TgZ(13,"p",10),e._uU(14),e.qZA()(),e.TgZ(15,"ion-col",13),e._UZ(16,"ion-icon",14),e.qZA()()()(),e.TgZ(17,"ion-item-options")(18,"ion-item-option",15),e._UZ(19,"ion-icon",16),e._uU(20," Certo "),e.qZA(),e.TgZ(21,"ion-item-option",17),e._UZ(22,"ion-icon",18),e._uU(23," Errado "),e.qZA(),e.TgZ(24,"ion-item-option",19),e._UZ(25,"ion-icon",20),e._uU(26," Editar "),e.qZA()()()),2&t){const o=a.$implicit,s=e.oxw(2);e.xp6(6),e.hij(" ",o.symbol," "),e.xp6(2),e.hij(" ",o.type," "),e.xp6(3),e.hij(" ",e.xi3(12,4,o.price/1e3,"1.2-2")," "),e.xp6(3),e.hij(" ",o.payment.length==s.appService.paymentList.length?"Todas as formas de pagamento":o.payment.join(", ")," ")}}function S(t,a){if(1&t&&(e.TgZ(0,"ion-card")(1,"ion-card-header"),e._UZ(2,"iframe",5,6),e.TgZ(4,"ion-card-title"),e._uU(5),e.qZA(),e.TgZ(6,"ion-card-subtitle"),e._uU(7),e.qZA()(),e.TgZ(8,"ion-card-content")(9,"ion-list"),e.YNc(10,U,9,2,"ion-item",2),e.YNc(11,D,27,7,"ion-item-sliding",7),e.TgZ(12,"ion-item",8)(13,"h1",9),e._uU(14," + "),e.qZA()()()()()),2&t){const o=e.oxw();e.xp6(5),e.hij(" ",o.place.name," "),e.xp6(2),e.hij(" ",o.place.address," "),e.xp6(3),e.Q6J("ngIf","?"!=o.etanolgasolina),e.xp6(1),e.Q6J("ngForOf",o.place.prices)}}const w=[{path:"",component:(()=>{class t{constructor(o,s,l,u){this.stationService=o,this.mapService=s,this.appService=l,this.router=u}ngOnInit(){var o=this;console.log("DETAILS ON INIT"),this.routerSubscription=this.router.events.subscribe(function(){var s=(0,T.Z)(function*(l){if(console.log("ROUTER EVENT"),l instanceof r.m2&&"/map/details"==l.url){console.log("NAVIGATION END");const u=yield o.stationService.currentStation.pipe((0,v.q)(1)).toPromise();console.log(u),o.place=u.place,console.log(o.place);const d=o.place.prices?o.place.prices.filter(c=>"Etanol"==c.fuel):[],f=o.place.prices?o.place.prices.filter(c=>"Gasolina"==c.fuel):[],h=d.length>0?d.reduce((c,p)=>p.price<c?p.price:c,d[0].price):null,Z=f.length>0?f.reduce((c,p)=>p.price<c?p.price:c,f[0].price):null;o.etanolgasolina=h&&Z?(h/Z*100).toFixed(0).toString():"?",o.appService.hideLoading()}});return function(l){return s.apply(this,arguments)}}())}ngAfterViewInit(){this.photoChangesSubscription=this.photo.changes.subscribe(o=>{console.log(o.length),console.log(o._results),o.length>0&&o.first.nativeElement.setAttribute("src",this.place.pano_id?"https://www.google.com/maps/embed/v1/streetview?key="+this.mapService.keys.release+"&pano="+this.place.pano_id+"&heading="+this.place.heading+"&fov=90":"")})}ngOnDestroy(){console.log("DESTROY"),this.routerSubscription.unsubscribe(),this.photoChangesSubscription.unsubscribe()}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(y.v),e.Y36(P.S),e.Y36(A.z),e.Y36(r.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-details"]],viewQuery:function(o,s){if(1&o&&e.Gf(b,5),2&o){let l;e.iGM(l=e.CRH())&&(s.photo=l)}},decls:10,vars:1,consts:[["slot","start"],["scroll-y","false"],[4,"ngIf"],["id","footer"],["src","//www.profitabledisplayformat.com/watchnew?key=5016b984cb0dea604afd3a1eb085b274","width","320","height","50","frameborder","0","scrolling","no"],["width","100%","height","200","frameborder","0","loading","lazy","allowfullscreen","","referrerpolicy","no-referrer-when-downgrade",2,"border","0"],["photo",""],[4,"ngFor","ngForOf"],["button","","routerLink","/map/edit"],[1,"ion-text-center",2,"width","100%"],[1,"ion-text-center"],["size","5"],["size","6"],["size","1",1,"align-center-middle"],["name","chevron-back-outline"],["color","success",2,"font-size","8px"],["name","checkmark-outline","slot","top",2,"font-size","24px"],["color","danger",2,"font-size","8px"],["name","close-outline","slot","top",2,"font-size","24px"],[2,"font-size","8px"],["name","pencil-outline","slot","top",2,"font-size","24px"]],template:function(o,s){1&o&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._uU(3," PostoBarato "),e.qZA(),e.TgZ(4,"ion-buttons",0),e._UZ(5,"ion-back-button"),e.qZA()()(),e.TgZ(6,"ion-content",1),e.YNc(7,S,15,4,"ion-card",2),e.qZA(),e.TgZ(8,"ion-footer",3),e._UZ(9,"iframe",4),e.qZA()),2&o&&(e.xp6(7),e.Q6J("ngIf",!s.appService.isLoading))},dependencies:[g.sg,g.O5,n.oU,n.Sm,n.PM,n.FN,n.Zi,n.tO,n.Dq,n.wI,n.W2,n.fr,n.jY,n.Gu,n.gu,n.Ie,n.u8,n.IK,n.td,n.q_,n.Nd,n.wd,n.sr,n.cs,n.YI,r.rH,g.JJ],styles:["ion-item[_ngcontent-%COMP%]{--inner-padding-start:0;--inner-padding-end:0;--padding-start:0}#footer[_ngcontent-%COMP%]{height:50px;display:flex;align-items:center;justify-content:center}.align-center-middle[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-card[_ngcontent-%COMP%]{max-height:100%;display:flex;flex-direction:column}ion-card[_ngcontent-%COMP%] > ion-card-content[_ngcontent-%COMP%]{flex:auto;overflow:scroll}"]}),t})()}];let M=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[r.Bz.forChild(w),r.Bz]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[g.ez,x.u5,n.Pc,M]}),t})()}}]);