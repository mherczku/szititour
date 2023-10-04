"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[592],{8520:(v,m,a)=>{function e(o,l){const d=o.ngOnDestroy;o.ngOnDestroy=function(){d&&d.call(this),this[l].next(),this[l].complete()}}a.d(m,{n:()=>e})},762:(v,m,a)=>{a.d(m,{c:()=>e});var e=function(o){return o.shortText="shortText",o.longText="longText",o.number="number",o.imgOnly="imgOnly",o.year="year",o}(e||{})},5411:(v,m,a)=>{a.d(m,{f:()=>u});var e=a(9468),o=a(5861),l=a(8645),d=a(4552);class g extends l.x{constructor(r=1/0,t=1/0,n=d.l){super(),this._bufferSize=r,this._windowTime=t,this._timestampProvider=n,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,r),this._windowTime=Math.max(1,t)}next(r){const{isStopped:t,_buffer:n,_infiniteTimeWindow:i,_timestampProvider:c,_windowTime:s}=this;t||(n.push(r),!i&&n.push(c.now()+s)),this._trimBuffer(),super.next(r)}_subscribe(r){this._throwIfClosed(),this._trimBuffer();const t=this._innerSubscribe(r),{_infiniteTimeWindow:n,_buffer:i}=this,c=i.slice();for(let s=0;s<c.length&&!r.closed;s+=n?1:2)r.next(c[s]);return this._checkFinalizedStatuses(r),t}_trimBuffer(){const{_bufferSize:r,_timestampProvider:t,_buffer:n,_infiniteTimeWindow:i}=this,c=(i?1:2)*r;if(r<1/0&&c<n.length&&n.splice(0,n.length-c),!i){const s=t.now();let h=0;for(let f=1;f<n.length&&n[f]<=s;f+=2)h=f;h&&n.splice(0,h+1)}}}let _=(()=>{var p;class r{constructor(){this.images=new Map,this.loader="assets/svg/loader.svg"}getImageUrl(n){const i=n.split("&&resToken=")[1],c=n.split("&&resToken=")[0],s=new g;return this.images.has(c)?(s.next(this.getUrl(this.images.get(c))),s.complete()):(s.next(this.loader),this.fetchImage(c,i).then(h=>{s.next(this.getUrl(h)),s.complete()},()=>{s.next(""),s.complete()})),s.asObservable()}fetchImage(n,i){var c=this;return(0,o.Z)(function*(){const h=yield(yield fetch(n,{mode:"cors",credentials:"same-origin",headers:{"Ngrok-Skip-Browser-Warning":"yes",resToken:i}})).blob();return c.images.set(n,h),h})()}getUrl(n){return n?URL.createObjectURL(n):""}}return(p=r).\u0275fac=function(n){return new(n||p)},p.\u0275prov=e.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),r})(),u=(()=>{var p;class r{constructor(n){this.imgService=n}transform(n){if(null!==n&&""!==n&&void 0!==n)return this.imgService.getImageUrl(n)}}return(p=r).\u0275fac=function(n){return new(n||p)(e.Y36(_,16))},p.\u0275pipe=e.Yjl({name:"imgLoader",type:p,pure:!0,standalone:!0}),r})()},5442:(v,m,a)=>{a.d(m,{m:()=>l});var e=a(6814),o=a(9468);let l=(()=>{var d;class g{}return(d=g).\u0275fac=function(u){return new(u||d)},d.\u0275mod=o.oAB({type:d}),d.\u0275inj=o.cJS({imports:[e.ez]}),g})()},9890:(v,m,a)=>{a.d(m,{G:()=>l});var e=a(553),o=a(9468);let l=(()=>{var d;class g{transform(u){if(null!==u&&""!==u)return e.N.apiBaseUrl+"/resources/"+u}}return(d=g).\u0275fac=function(u){return new(u||d)},d.\u0275pipe=o.Yjl({name:"imgSrc",type:d,pure:!0}),g})()},5393:(v,m,a)=>{a.d(m,{K:()=>_});var e=a(553),o=a(9862),l=a(9397),d=a(9468),g=a(5624);let _=(()=>{var u;class p{constructor(t,n){this.http=t,this.authService=n,this.baseUrl=e.N.apiBaseUrl+"/user"}getGames(){return this.http.get(`${this.baseUrl}/games`)}applyForGame(t){return this.http.post(`${this.baseUrl}/apply`,t)}cancelApplicationForGame(t){return this.http.post(`${this.baseUrl}/cancel`,t)}updateProfile(t){return this.http.post(`${this.baseUrl}/update`,t).pipe((0,l.b)(n=>{this.authService.dispatchLogin(n)}))}updatePasswordRequest(){return this.http.get(`${this.baseUrl}/update/password-request`)}updatePassword(t,n){const i={newPassword:n},c=(new o.WM).set("passwordToken",t);return this.http.post(`${this.baseUrl}/update/password`,i,{headers:c})}updateEmail(t){return this.http.post(`${this.baseUrl}/update/email`,t).pipe((0,l.b)(n=>{this.authService.dispatchLogin(n)}))}revokeToken(t){return this.http.post(`${this.baseUrl}/revoke`,t).pipe((0,l.b)(n=>{this.authService.dispatchLogin(n)}))}updateImage(t){const n=new FormData;return n.append("image",t),this.http.post(`${this.baseUrl}/update/image`,n).pipe((0,l.b)(i=>{this.authService.dispatchLogin(i)}))}deleteAccountRequest(){return this.http.delete(this.baseUrl)}deleteAccount(t){const n=(new o.WM).set("deleteToken",t);return this.http.delete(`${this.baseUrl}`,{headers:n})}}return(u=p).\u0275fac=function(t){return new(t||u)(d.LFG(o.eN),d.LFG(g.e))},u.\u0275prov=d.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),p})()},7747:(v,m,a)=>{a.d(m,{t:()=>n});var e=a(9468),o=a(6814),l=a(6223),d=a(7278);function g(i,c){if(1&i){const s=e.EpF();e.TgZ(0,"div")(1,"label",2),e._uU(2),e.qZA(),e.TgZ(3,"input",3),e.NdJ("ngModelChange",function(f){e.CHM(s);const C=e.oxw();return e.KtG(C.valueChange.emit(f))}),e.qZA()()}if(2&i){const s=e.oxw();e.Gre("relative flex flex-col gap-2 ",s.classes,""),e.xp6(2),e.Oqu(s.label),e.xp6(1),e.Q6J("ngModel",s.value)("type",s.inputType)("placeholder",s.placeholder)}}function _(i,c){if(1&i){const s=e.EpF();e.TgZ(0,"input",8),e.NdJ("ngModelChange",function(f){e.CHM(s);const C=e.oxw(2);return e.KtG(C.valueChange.emit(f))}),e.qZA()}if(2&i){const s=e.oxw(2);e.Q6J("ngModel",s.value)("type",s.inputType)("placeholder",s.placeholder)}}function u(i,c){if(1&i&&(e.TgZ(0,"p",9),e._uU(1),e.qZA()),2&i){const s=e.oxw(2);e.xp6(1),e.Oqu(s.value)}}function p(i,c){if(1&i){const s=e.EpF();e.TgZ(0,"app-buttons",10),e.NdJ("onClicked",function(){e.CHM(s);const f=e.oxw(2);return e.KtG(f.editing=!f.editing)}),e.qZA()}}function r(i,c){if(1&i){const s=e.EpF();e.TgZ(0,"app-buttons",11),e.NdJ("onClicked",function(){e.CHM(s);const f=e.oxw(2);return e.KtG(f.editing=!f.editing)}),e.qZA()}}function t(i,c){if(1&i&&(e.TgZ(0,"div")(1,"label",2),e._uU(2),e.qZA(),e.YNc(3,_,1,3,"input",4),e.YNc(4,u,2,1,"p",5),e.YNc(5,p,1,0,"app-buttons",6),e.YNc(6,r,1,0,"app-buttons",7),e.qZA()),2&i){const s=e.oxw();e.Gre("relative place-items-center flex gap-3 ",s.classes,""),e.xp6(2),e.Oqu(s.label),e.xp6(1),e.Q6J("ngIf",s.editing),e.xp6(1),e.Q6J("ngIf",!s.editing),e.xp6(1),e.Q6J("ngIf",!s.editing),e.xp6(1),e.Q6J("ngIf",s.editing)}}let n=(()=>{var i;class c{constructor(){this.placeholder="Ide \xedrhatsz",this.label="Label:",this.classes="",this.password=!1,this.type="label",this.value="",this.valueChange=new e.vpe,this.inputType="text",this.editing=!1}ngOnInit(){this.password&&(this.inputType="password")}}return(i=c).\u0275fac=function(h){return new(h||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-text-input"]],inputs:{placeholder:"placeholder",label:"label",classes:"classes",password:"password",type:"type",value:"value"},outputs:{valueChange:"valueChange"},standalone:!0,features:[e.jDz],decls:3,vars:3,consts:[[3,"ngSwitch"],[3,"class",4,"ngSwitchCase"],[1,"text-size-base"],[1,"neumorphism-2","border-1","focus:border-green-500","hover:border-green-500","bg-transparent","text-size-base","outline-0","w-full",3,"ngModel","type","placeholder","ngModelChange"],["class","simpleInput",3,"ngModel","type","placeholder","ngModelChange",4,"ngIf"],["class","text-size-base w-full",4,"ngIf"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg","type","icon",3,"onClicked",4,"ngIf"],["classes","min-w-[30px]","iconSrc","assets/svg/tick.svg","type","icon",3,"onClicked",4,"ngIf"],[1,"simpleInput",3,"ngModel","type","placeholder","ngModelChange"],[1,"text-size-base","w-full"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg","type","icon",3,"onClicked"],["classes","min-w-[30px]","iconSrc","assets/svg/tick.svg","type","icon",3,"onClicked"]],template:function(h,f){1&h&&(e.TgZ(0,"div",0),e.YNc(1,g,4,7,"div",1),e.YNc(2,t,7,8,"div",1),e.qZA()),2&h&&(e.Q6J("ngSwitch",f.type),e.xp6(1),e.Q6J("ngSwitchCase","label"),e.xp6(1),e.Q6J("ngSwitchCase","editable"))},dependencies:[o.RF,o.n9,l.u5,l.Fj,l.JJ,l.On,d.O,o.O5],styles:[".w-full[_ngcontent-%COMP%]{min-width:100px}"]}),c})()},6492:(v,m,a)=>{a.d(m,{$:()=>d});var e=a(9468),o=a(6814),l=a(5442);let d=(()=>{var g;class _{constructor(){this.$newImageSrc=(0,e.tdS)(void 0),this.$dragging=(0,e.tdS)(!1),this.fileChanged=new e.vpe}readFile(p){if(this.onLeave(),p.target.files&&p.target.files[0]){const r=p.target.files[0];this.fileChanged.emit(r);const t=new FileReader;t.onload=()=>this.$newImageSrc.set(t.result),t.readAsDataURL(r)}}onEnter(){this.$dragging.set(!0)}onLeave(){this.$dragging.set(!1)}}return(g=_).\u0275fac=function(p){return new(p||g)},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-image-uploader"]],inputs:{src:"src"},outputs:{fileChanged:"fileChanged"},standalone:!0,features:[e.jDz],decls:5,vars:3,consts:[[1,"img-uploader"],["type","file","accept","image/png, image/jpeg",3,"dragenter","dragleave","change"],[1,"drag-drop"],["src","assets/svg/upload.svg","alt","Upload"],["alt","Image","loading","lazy",3,"src"]],template:function(p,r){if(1&p&&(e.TgZ(0,"div",0)(1,"input",1),e.NdJ("dragenter",function(){return r.onEnter()})("dragleave",function(){return r.onLeave()})("change",function(n){return r.readFile(n)}),e.qZA(),e.TgZ(2,"div",2),e._UZ(3,"img",3),e.qZA(),e._UZ(4,"img",4),e.qZA()),2&p){let t;e.xp6(2),e.ekj("dragging",r.$dragging()),e.xp6(2),e.Q6J("src",null!==(t=r.$newImageSrc())&&void 0!==t?t:r.src,e.LSH)}},dependencies:[o.ez,l.m],styles:["[_nghost-%COMP%]{width:100%;height:100%;display:block}.img-uploader[_ngcontent-%COMP%]{width:100%;height:100%;position:relative;overflow:hidden}.img-uploader[_ngcontent-%COMP%]:hover   .drag-drop[_ngcontent-%COMP%]{opacity:.8}.img-uploader[_ngcontent-%COMP%]   .drag-drop[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:all .3s;background-color:#5cb4b469;opacity:0}.img-uploader[_ngcontent-%COMP%]   .drag-drop.dragging[_ngcontent-%COMP%]{background-color:#84bcbcae;opacity:.8}.img-uploader[_ngcontent-%COMP%]   .drag-drop[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;aspect-ratio:1;object-fit:contain}.img-uploader[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.img-uploader[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;cursor:pointer;top:0;left:0;width:100%;height:100%;z-index:2;opacity:0}"],changeDetection:0}),_})()},424:(v,m,a)=>{a.d(m,{g:()=>r});var e=a(9468),o=a(6814),l=a(6223),d=a(6523),g=a(1993),_=a(5624),u=a(5393),p=a(8281);let r=(()=>{var t;class n{constructor(c,s,h,f,C){this.fb=c,this.authS=s,this.userS=h,this.destroyRef=f,this.route=C,this.$saving=(0,e.tdS)(!1),this.token="",this.passwordForm=this.fb.group({password:["",[l.kI.required]],confirmPassword:["",[l.kI.required,(0,d.Z)()]]})}ngOnInit(){this.route.params.subscribe(c=>{this.token=c.token})}savePassword(){this.authS.$isLoggedIn()?this.userS.updatePassword(this.token,this.passwordForm.value.password).pipe((0,g.sL)(this.destroyRef)).subscribe():this.authS.forgotPasswordChange(this.token,this.passwordForm.value.password).pipe((0,g.sL)(this.destroyRef)).subscribe()}}return(t=n).\u0275fac=function(c){return new(c||t)(e.Y36(l.qu),e.Y36(_.e),e.Y36(u.K),e.Y36(e.ktI),e.Y36(p.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-password-change"]],standalone:!0,features:[e.jDz],decls:7,vars:2,consts:[[1,"password-card",3,"formGroup"],[1,"text-center","text-size-base","bold"],["autocomplete","off","autofocus","","formControlName","password","type","password","placeholder","\xdaj jelsz\xf3",1,"simpleInput"],["autocomplete","off","formControlName","confirmPassword","type","password","placeholder","\xdaj jelsz\xf3 m\xe9gegyszer",1,"simpleInput"],[1,"btn-simple-red","w-fit","self-center",3,"disabled","click"]],template:function(c,s){1&c&&(e.TgZ(0,"form",0)(1,"h3",1),e._uU(2,"Jelsz\xf3 m\xf3dos\xedt\xe1sa:"),e.qZA(),e._UZ(3,"input",2)(4,"input",3),e.TgZ(5,"button",4),e.NdJ("click",function(){return s.savePassword()}),e._uU(6,"M\xf3dos\xedt\xe1s"),e.qZA()()),2&c&&(e.Q6J("formGroup",s.passwordForm),e.xp6(5),e.Q6J("disabled",s.$saving()||!s.passwordForm.valid))},dependencies:[o.ez,l.UX,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u],styles:[".password-card[_ngcontent-%COMP%]{border-radius:8px;padding:1.5rem;background-color:#fff;display:flex;flex-direction:column;gap:14px;width:min(450px,100vw - 40px)}"],changeDetection:0}),n})()},4547:(v,m,a)=>{a.d(m,{$:()=>g});var e=a(6814),o=a(9468);const l=function(_,u){return{selected:_,selectable:u}},d=function(_){return{bold:_}};let g=(()=>{var _;class u{constructor(){this.index=0,this.selected=!1}}return(_=u).\u0275fac=function(r){return new(r||_)},_.\u0275cmp=o.Xpm({type:_,selectors:[["app-place-card"]],inputs:{place:"place",index:"index",selected:"selected"},standalone:!0,features:[o.jDz],decls:3,vars:8,consts:[[1,"place-card",3,"ngClass"],[1,"text-size-base",3,"ngClass"]],template:function(r,t){1&r&&(o.TgZ(0,"div",0)(1,"p",1),o._uU(2),o.qZA()()),2&r&&(o.Q6J("ngClass",o.WLB(3,l,t.selected,t.place.selectable)),o.xp6(1),o.Q6J("ngClass",o.VKq(6,d,t.place.selectable)),o.xp6(1),o.hij(" ",t.place.selectable?t.place.name:"Helysz\xedn "+(t.index+1)," "))},dependencies:[e.ez,e.mk],styles:[".place-card[_ngcontent-%COMP%]{position:relative;padding:20px;border-radius:8px;border:1px solid black;width:max-content}.place-card.selectable[_ngcontent-%COMP%]{cursor:pointer}.place-card.selectable.selected[_ngcontent-%COMP%]{background:rgba(0,0,0,.07)}@media (pointer: fine){.place-card.selectable[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.07)}}.place-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;object-fit:contain;opacity:.8;width:100%;height:100%;border-radius:8px}"],changeDetection:0}),u})()},6523:(v,m,a)=>{function e(){return o=>{const l=o.parent?.get("password")?.value;return l===o.value?null:{notSame:!0}}}a.d(m,{Z:()=>e})}}]);