"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[592],{8520:(h,_,n)=>{function e(t,r){const a=t.ngOnDestroy;t.ngOnDestroy=function(){a&&a.call(this),this[r].next(),this[r].complete()}}n.d(_,{n:()=>e})},2539:(h,_,n)=>{n.d(_,{G:()=>t,K:()=>r});var e=n(553);function t(a,c){return c.id??a}function r(a){if(document.getElementById("map-script"))a();else{const c=document.createElement("script");c.id="map-script",c.type="text/javascript",c.src=`https://maps.googleapis.com/maps/api/js?key=${e.N.MAP_KEY}&callback=gmNoop`,c.onload=()=>{a()},document.head.appendChild(c)}}},762:(h,_,n)=>{n.d(_,{c:()=>e});var e=function(t){return t.shortText="shortText",t.longText="longText",t.number="number",t.imgOnly="imgOnly",t.year="year",t}(e||{})},5442:(h,_,n)=>{n.d(_,{m:()=>r});var e=n(6814),t=n(9468);let r=(()=>{var a;class c{}return(a=c).\u0275fac=function(i){return new(i||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[e.ez]}),c})()},9890:(h,_,n)=>{n.d(_,{G:()=>r});var e=n(553),t=n(9468);let r=(()=>{var a;class c{transform(i){return null===i||""===i?"":e.N.apiBaseUrl+"/resources/"+i}}return(a=c).\u0275fac=function(i){return new(i||a)},a.\u0275pipe=t.Yjl({name:"imgSrc",type:a,pure:!0}),c})()},5393:(h,_,n)=>{n.d(_,{K:()=>c});var e=n(553),t=n(8645),r=n(9468),a=n(9862);let c=(()=>{var o;class i{constructor(p){this.http=p,this.baseUrl=e.N.apiBaseUrl+"/user",this.obs=new t.x,this.i=1}getGames(){return this.http.get(`${this.baseUrl}/games`)}applyForGame(p){return this.http.post(`${this.baseUrl}/apply`,p)}cancelApplicationForGame(p){return this.http.post(`${this.baseUrl}/cancel`,p)}getCucc(){return this.obs.asObservable()}saveProfile(p){return this.http.post(`${this.baseUrl}/update`,p)}}return(o=i).\u0275fac=function(p){return new(p||o)(r.LFG(a.eN))},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),i})()},7747:(h,_,n)=>{n.d(_,{t:()=>x});var e=n(9468),t=n(6814),r=n(95),a=n(7278);function c(l,g){if(1&l){const s=e.EpF();e.TgZ(0,"div")(1,"label",2),e._uU(2),e.qZA(),e.TgZ(3,"input",3),e.NdJ("ngModelChange",function(u){e.CHM(s);const v=e.oxw();return e.KtG(v.valueChange.emit(u))}),e.qZA()()}if(2&l){const s=e.oxw();e.Gre("relative flex flex-col gap-2 ",s.classes,""),e.xp6(2),e.Oqu(s.label),e.xp6(1),e.Q6J("ngModel",s.value)("type",s.inputType)("placeholder",s.placeholder)}}function o(l,g){if(1&l){const s=e.EpF();e.TgZ(0,"input",3),e.NdJ("ngModelChange",function(u){e.CHM(s);const v=e.oxw(2);return e.KtG(v.valueChange.emit(u))}),e.qZA()}if(2&l){const s=e.oxw(2);e.Q6J("ngModel",s.value)("type",s.inputType)("placeholder",s.placeholder)}}function i(l,g){if(1&l&&(e.TgZ(0,"p",8),e._uU(1),e.qZA()),2&l){const s=e.oxw(2);e.xp6(1),e.Oqu(s.value)}}function C(l,g){if(1&l){const s=e.EpF();e.TgZ(0,"app-buttons",9),e.NdJ("onClicked",function(){e.CHM(s);const u=e.oxw(2);return e.KtG(u.editing=!u.editing)}),e.qZA()}}function p(l,g){if(1&l){const s=e.EpF();e.TgZ(0,"app-buttons",10),e.NdJ("onClicked",function(){e.CHM(s);const u=e.oxw(2);return e.KtG(u.editing=!u.editing)}),e.qZA()}}function d(l,g){if(1&l&&(e.TgZ(0,"div")(1,"label",2),e._uU(2),e.qZA(),e.YNc(3,o,1,3,"input",4),e.YNc(4,i,2,1,"p",5),e.YNc(5,C,1,0,"app-buttons",6),e.YNc(6,p,1,0,"app-buttons",7),e.qZA()),2&l){const s=e.oxw();e.Gre("relative place-items-center flex gap-3 ",s.classes,""),e.xp6(2),e.Oqu(s.label),e.xp6(1),e.Q6J("ngIf",s.editing),e.xp6(1),e.Q6J("ngIf",!s.editing),e.xp6(1),e.Q6J("ngIf",!s.editing),e.xp6(1),e.Q6J("ngIf",s.editing)}}let x=(()=>{var l;class g{constructor(){this.placeholder="Ide \xedrhatsz",this.label="Label:",this.classes="",this.password=!1,this.type="label",this.value="",this.valueChange=new e.vpe,this.inputType="text",this.editing=!1}ngOnInit(){this.password&&(this.inputType="password")}}return(l=g).\u0275fac=function(m){return new(m||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-text-input"]],inputs:{placeholder:"placeholder",label:"label",classes:"classes",password:"password",type:"type",value:"value"},outputs:{valueChange:"valueChange"},standalone:!0,features:[e.jDz],decls:3,vars:3,consts:[[3,"ngSwitch"],[3,"class",4,"ngSwitchCase"],[1,"text-size-base"],[1,"neumorphism-2","border-1","focus:border-green-500","hover:border-green-500","bg-transparent","text-size-base","outline-0","w-full",3,"ngModel","type","placeholder","ngModelChange"],["class","neumorphism-2 border-1 focus:border-green-500 hover:border-green-500 bg-transparent text-size-base outline-0 w-full",3,"ngModel","type","placeholder","ngModelChange",4,"ngIf"],["class","text-size-base w-full",4,"ngIf"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg","type","icon",3,"onClicked",4,"ngIf"],["classes","min-w-[30px]","iconSrc","assets/svg/tick.svg","type","icon",3,"onClicked",4,"ngIf"],[1,"text-size-base","w-full"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg","type","icon",3,"onClicked"],["classes","min-w-[30px]","iconSrc","assets/svg/tick.svg","type","icon",3,"onClicked"]],template:function(m,u){1&m&&(e.TgZ(0,"div",0),e.YNc(1,c,4,7,"div",1),e.YNc(2,d,7,8,"div",1),e.qZA()),2&m&&(e.Q6J("ngSwitch",u.type),e.xp6(1),e.Q6J("ngSwitchCase","label"),e.xp6(1),e.Q6J("ngSwitchCase","editable"))},dependencies:[t.RF,t.n9,r.u5,r.Fj,r.JJ,r.On,a.O,t.O5],styles:[".w-full[_ngcontent-%COMP%]{min-width:100px}"]}),g})()},4547:(h,_,n)=>{n.d(_,{$:()=>c});var e=n(6814),t=n(9468);const r=function(o,i){return{selected:o,selectable:i}},a=function(o){return{bold:o}};let c=(()=>{var o;class i{constructor(){this.index=0,this.selected=!1}}return(o=i).\u0275fac=function(p){return new(p||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-place-card"]],inputs:{place:"place",index:"index",selected:"selected"},standalone:!0,features:[t.jDz],decls:3,vars:8,consts:[[1,"place-card",3,"ngClass"],[1,"text-size-base",3,"ngClass"]],template:function(p,d){1&p&&(t.TgZ(0,"div",0)(1,"p",1),t._uU(2),t.qZA()()),2&p&&(t.Q6J("ngClass",t.WLB(3,r,d.selected,d.place.selectable)),t.xp6(1),t.Q6J("ngClass",t.VKq(6,a,d.place.selectable)),t.xp6(1),t.hij(" ",d.place.selectable?d.place.name:"Helysz\xedn "+(d.index+1)," "))},dependencies:[e.ez,e.mk],styles:[".place-card[_ngcontent-%COMP%]{position:relative;padding:20px;border-radius:8px;border:1px solid black;width:max-content}.place-card.selectable[_ngcontent-%COMP%]{cursor:pointer}.place-card.selectable.selected[_ngcontent-%COMP%]{background:rgba(0,0,0,.07)}@media (pointer: fine){.place-card.selectable[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.07)}}.place-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;object-fit:contain;opacity:.8;width:100%;height:100%;border-radius:8px}"],changeDetection:0}),i})()}}]);