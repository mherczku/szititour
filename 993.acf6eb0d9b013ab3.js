"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[993],{6993:(be,T,r)=>{r.r(T),r.d(T,{USER_ROUTES:()=>we});var d,c=r(6814),y=r(7582),M=r(8645),_=r(9773),S=r(8520),P=r(1788),O=r(5442),e=r(9468),x=r(5393),Z=r(9890);const J=function(i,a){return{"btn-simple-red":i,"btn-simple-green":a}};class w{constructor(a,t){this.cd=a,this.userService=t,this.game={applications:[],dateEnd:new Date,dateStart:new Date,id:0,places:[],title:"Test Title",active:!1},this.destroy$=new M.x}applyBtnClicked(){this.game.active||("applied"===this.game.userApplied||"accepted"===this.game.userApplied?this.cancelApplicationForGame():"none"===this.game.userApplied&&this.applyForGame())}applyForGame(){this.userService.applyForGame(this.game.id).pipe((0,_.R)(this.destroy$)).subscribe({next:a=>{console.log(a),this.game=a,this.cd.markForCheck()},error:a=>{console.error(a)}})}cancelApplicationForGame(){this.userService.cancelApplicationForGame(this.game.id).pipe((0,_.R)(this.destroy$)).subscribe({next:a=>{console.log(a),this.game=a,this.cd.markForCheck()},error:a=>{console.error(a)}})}}(d=w).\u0275fac=function(a){return new(a||d)(e.Y36(e.sBO),e.Y36(x.K))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-user-game-card"]],inputs:{game:"game"},standalone:!0,features:[e.jDz],decls:12,vars:20,consts:[[1,"card-game"],[3,"src","alt"],[1,"details"],[1,"text-size-lg","bold"],[1,"text-size-base"],[1,"btn-simple",3,"routerLink","disabled","ngClass","click"]],template:function(a,t){1&a&&(e.TgZ(0,"div",0),e._UZ(1,"img",1),e.ALo(2,"imgSrc"),e.TgZ(3,"div",2)(4,"p",3),e._uU(5),e.qZA(),e.TgZ(6,"p",4),e._uU(7),e.ALo(8,"date"),e.ALo(9,"date"),e.qZA(),e.TgZ(10,"button",5),e.NdJ("click",function(){return t.applyBtnClicked()}),e._uU(11),e.qZA()()()),2&a&&(e.xp6(1),e.Q6J("src",e.lcZ(2,9,t.game.img),e.LSH)("alt",t.game.title),e.xp6(4),e.Oqu(t.game.title),e.xp6(2),e.AsE("",e.xi3(8,11,t.game.dateStart,"short")," - ",e.xi3(9,14,t.game.dateEnd,"short"),""),e.xp6(3),e.Q6J("routerLink",t.game.active&&"accepted"===t.game.userApplied?"/user/active/"+t.game.id:void 0)("disabled","declined"===t.game.userApplied)("ngClass",e.WLB(17,J,"applied"===t.game.userApplied||"accepted"===t.game.userApplied&&!t.game.active,t.game.active&&"accepted"===t.game.userApplied)),e.xp6(1),e.Oqu("applied"===t.game.userApplied||"accepted"===t.game.userApplied?t.game.active&&"accepted"===t.game.userApplied?"\xcdr\xe1ny a j\xe1t\xe9k":"Visszamond\xe1s":"Jelentkez\xe9s"))},dependencies:[c.ez,c.mk,c.uU,P.rH,O.m,Z.G],styles:[".card-game[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:400px;width:-moz-fit-content;width:fit-content;gap:10px;border-radius:6px;background:#ffffff;box-shadow:20px 20px 60px #d9d9d9,-20px -20px 60px #fff}.card-game[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:cover;aspect-ratio:16/9}.card-game[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{flex-grow:1;padding:1rem}.card-game[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px;width:100%}[_nghost-%COMP%]{height:100%}"],changeDetection:0}),(0,y.gn)([S.n],w.prototype,"destroy$",void 0);var q=r(491),m=r(198);function G(i,a){1&i&&e._UZ(0,"app-user-game-card",4),2&i&&e.Q6J("game",a.$implicit)}let E=(()=>{var i;class a{constructor(n,s){this.store=n,this.userService=s,this.profile=this.store.select(q.cY)}ngOnInit(){this.games=this.userService.getGames()}}return(i=a).\u0275fac=function(n){return new(n||i)(e.Y36(m.yh),e.Y36(x.K))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-home"]],standalone:!0,features:[e.jDz],decls:7,vars:6,consts:[[1,"welcome"],[1,"text-size-h3"],[1,"grid-games"],[3,"game",4,"ngFor","ngForOf"],[3,"game"]],template:function(n,s){if(1&n&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.ALo(3,"async"),e.qZA()(),e.TgZ(4,"section",2),e.YNc(5,G,1,1,"app-user-game-card",3),e.ALo(6,"async"),e.qZA()),2&n){let o;e.xp6(2),e.hij("\xdcdv \xfajra itt ",null==(o=e.lcZ(3,2,s.profile))?null:o.name," csapat"),e.xp6(3),e.Q6J("ngForOf",e.lcZ(6,4,s.games))}},dependencies:[c.ez,c.sg,c.Ov,w],styles:[".grid-games[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem}@media (max-width: 1050px){.grid-games[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width: 600px){.grid-games[_ngcontent-%COMP%]{grid-template-columns:repeat(1,minmax(0,1fr))}}.grid-games[_ngcontent-%COMP%]{padding:0 1rem;place-items:center}.welcome[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:2rem;text-align:center}"]}),a})();var u=r(9397),$=r(4547),p=r(762),l=r(95),N=r(553),k=r(8180),g=r(9393),z=r(9862);let Q=(()=>{var i;class a{constructor(n,s){this.http=n,this.store=s,this.baseUrl=N.N.apiBaseUrl+"/user",this.changedAnswers=new Map}addAnswer(n,s){this.changedAnswers.set(n,s)}getActiveGameData(n){return this.http.get(`${this.baseUrl}/activegame/${n}`).pipe((0,u.b)(s=>{this.store.dispatch((0,g.u)({gameState:s.teamGameStatusDto}))}))}getTeamGameStatus(n){return this.http.get(`${this.baseUrl}/status/${n}`).pipe((0,u.b)(s=>{this.store.dispatch((0,g.u)({gameState:s}))}))}loadTeamGameStatus(n){return this.http.get(`${this.baseUrl}/status/${n}`).pipe((0,u.b)(s=>{this.store.dispatch((0,g.u)({gameState:s}))})).pipe((0,k.q)(1)).subscribe()}answerQuestions(n,s){return this.http.post(`${this.baseUrl}/answers`,{gameId:n,questionAnswers:s}).pipe((0,u.b)(h=>{this.store.dispatch((0,g.u)({gameState:h}))}))}answerQuestionWithImage(n,s){const o=new FormData;return o.append("image",s),this.http.post(`${this.baseUrl}/answer/${n}/image`,o)}}return(i=a).\u0275fac=function(n){return new(n||i)(e.LFG(z.eN),e.LFG(m.yh))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),a})();const U=["questionFileInput"];function Y(i,a){if(1&i&&(e._UZ(0,"img",9),e.ALo(1,"imgSrc")),2&i){const t=e.oxw();e.Q6J("src",e.lcZ(1,1,t._question.img),e.LSH)}}function D(i,a){if(1&i&&(e._UZ(0,"img",13),e.ALo(1,"imgSrc")),2&i){const t=e.oxw(2);let n;e.Q6J("src",null!==(n=t.currentImg)&&void 0!==n?n:e.lcZ(1,1,null==t._savedAnswer?null:t._savedAnswer.img),e.LSH)}}function j(i,a){if(1&i){const t=e.EpF();e.ynx(0),e.TgZ(1,"input",10,11),e.NdJ("change",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.inputFileChanged(s))}),e.qZA(),e.YNc(3,D,2,3,"img",12),e.BQk()}if(2&i){const t=e.oxw();e.xp6(3),e.Q6J("ngIf",t.currentImg||(null==t._savedAnswer?null:t._savedAnswer.img))}}function R(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"input",14),e.NdJ("ngModelChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.changed(s))}),e.qZA()}if(2&i){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function L(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"input",14),e.NdJ("ngModelChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.changed(s))}),e.qZA()}if(2&i){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function H(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"input",15),e.NdJ("ngModelChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.changed(s))}),e.qZA()}if(2&i){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function K(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"input",15),e.NdJ("ngModelChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.changed(s))}),e.qZA()}if(2&i){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}const B=function(i){return{differentAnswer:i}};let X=(()=>{var i;class a{set question(n){this._question=n,this.setCurrentAnswerData()}set teamStatus(n){this._teamStatus=n,this.setCurrentAnswerData()}constructor(n){this.activeGameService=n,this.QuestionType=p.c,this.currentAnswer="",this.answerIsSame=!1}setCurrentAnswerData(){if(this._question&&this._teamStatus){switch(this._savedAnswer=this._teamStatus?.placeStatuses?.find(n=>n.placeId===this._question.placeId)?.qanswers?.find(n=>n.questionDtoNoAnswers.id===this._question.id),this._question.type){case p.c.shortText:case p.c.longText:this.currentAnswer=this._savedAnswer?.answerText??"";break;case p.c.number:this.currentAnswer=this._savedAnswer?.answerNumber??"";break;case p.c.imgOnly:this.fileInputRef?.nativeElement&&(this.fileInputRef.nativeElement.value=null),this.currentImg=void 0;break;case p.c.year:this.currentAnswer=this._savedAnswer?.answerNumber??""}this.setIsAnswerSameAsStatus()}}setIsAnswerSameAsStatus(){switch(this._question.type){case p.c.shortText:case p.c.longText:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerText;break;case p.c.number:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerNumber;break;case p.c.imgOnly:this.answerIsSame=!this.currentImg;break;case p.c.year:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerNumber}}changed(n){if(this.currentAnswer=n,this.setIsAnswerSameAsStatus(),!this.answerIsSame)switch(this._question.type){case p.c.shortText:case p.c.longText:this.activeGameService.addAnswer(this._question.id,{answerText:n});break;case p.c.number:this.activeGameService.addAnswer(this._question.id,{answerNumber:n});break;case p.c.imgOnly:return;case p.c.year:this.activeGameService.addAnswer(this._question.id,{answerNumber:n})}}inputFileChanged(n){if(n.target.files[0]){const s=new FileReader;s.onload=()=>{this.currentImg=s.result,this.setIsAnswerSameAsStatus()},s.readAsDataURL(n.target.files[0]),this.activeGameService.addAnswer(this._question.id,{imgFile:n.target.files[0]})}}}return(i=a).\u0275fac=function(n){return new(n||i)(e.Y36(Q))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-question-card"]],viewQuery:function(n,s){if(1&n&&e.Gf(U,5),2&n){let o;e.iGM(o=e.CRH())&&(s.fileInputRef=o.first)}},inputs:{index:"index",question:"question",teamStatus:"teamStatus"},standalone:!0,features:[e.jDz],decls:13,vars:13,consts:[[1,"holder-question"],[1,"text-size-base","bold","question-title"],[1,"question-body",3,"ngClass"],[1,"text-size-base"],["class","object-contain max-h-[300px] aspect-video",3,"src",4,"ngIf"],[3,"ngSwitch"],[4,"ngSwitchCase"],["placeholder","V\xe1lasz","type","text",3,"ngModel","ngModelChange",4,"ngSwitchCase"],["placeholder","0","type","number",3,"ngModel","ngModelChange",4,"ngSwitchCase"],[1,"object-contain","max-h-[300px]","aspect-video",3,"src"],["type","file",3,"change"],["questionFileInput",""],["id","questionImageAnswer","class","object-contain max-h-[300px] aspect-video","alt","",3,"src",4,"ngIf"],["id","questionImageAnswer","alt","",1,"object-contain","max-h-[300px]","aspect-video",3,"src"],["placeholder","V\xe1lasz","type","text",3,"ngModel","ngModelChange"],["placeholder","0","type","number",3,"ngModel","ngModelChange"]],template:function(n,s){1&n&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.qZA(),e.TgZ(3,"div",2)(4,"p",3),e._uU(5),e.qZA(),e.YNc(6,Y,2,3,"img",4),e.ynx(7,5),e.YNc(8,j,4,1,"ng-container",6),e.YNc(9,R,1,1,"input",7),e.YNc(10,L,1,1,"input",7),e.YNc(11,H,1,1,"input",8),e.YNc(12,K,1,1,"input",8),e.BQk(),e.qZA()()),2&n&&(e.xp6(2),e.AsE("",s._question.riddle?"Rejtv\xe9ny":""," K\xe9rd\xe9s ",s.index+1,""),e.xp6(1),e.Q6J("ngClass",e.VKq(11,B,!s.answerIsSame)),e.xp6(2),e.Oqu(s._question.name),e.xp6(1),e.Q6J("ngIf",s._question.img),e.xp6(1),e.Q6J("ngSwitch",s._question.type),e.xp6(1),e.Q6J("ngSwitchCase",s.QuestionType.imgOnly),e.xp6(1),e.Q6J("ngSwitchCase",s.QuestionType.longText),e.xp6(1),e.Q6J("ngSwitchCase",s.QuestionType.shortText),e.xp6(1),e.Q6J("ngSwitchCase",s.QuestionType.number),e.xp6(1),e.Q6J("ngSwitchCase",s.QuestionType.year))},dependencies:[c.ez,c.mk,c.O5,c.RF,c.n9,l.u5,l.Fj,l.wV,l.JJ,l.On,O.m,Z.G],styles:[".holder-question[_ngcontent-%COMP%]{border-radius:8px;border:1px solid black;position:relative;display:flex;flex-direction:column;max-width:400px;height:100%}.holder-question[_ngcontent-%COMP%]   .question-title[_ngcontent-%COMP%]{top:0;left:0;width:100%;background:rgba(0,0,0,.17);padding:5px 10px}.holder-question[_ngcontent-%COMP%]   .question-body[_ngcontent-%COMP%]{padding:20px;display:flex;flex-direction:column;gap:10px;background:rgba(0,255,49,.11);flex-grow:1}.holder-question[_ngcontent-%COMP%]   .question-body.differentAnswer[_ngcontent-%COMP%]{background:rgba(0,133,205,.11)}.holder-question[_ngcontent-%COMP%]   .question-body[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);padding:10px;border-radius:8px}"]}),a})();const W=(0,m.ZF)("game"),ee=(0,m.P1)(W,i=>i.teamGameStatus);var f,te=r(2539),ne=r(9516);function ie(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-place-card",6),e.NdJ("click",function(){const o=e.CHM(t).$implicit,h=e.oxw();return e.KtG(h.selectPlace(o))}),e.qZA()}if(2&i){const t=a.$implicit,n=a.index,s=e.oxw();e.Q6J("selected",s.selectedPlace===t)("place",t)("index",n)}}function se(i,a){if(1&i&&(e._UZ(0,"app-question-card",7),e.ALo(1,"async")),2&i){const t=a.$implicit,n=a.index,s=e.oxw();e.Q6J("teamStatus",e.lcZ(1,3,s.teamStatus))("index",n)("question",t)}}class b{constructor(a,t,n,s){this.activatedRoute=a,this.activeGameService=t,this.store=n,this.locationsService=s,this.destroy$=new M.x,this.teamStatus=this.store.select(ee),this.gameId=-1,this.myTrackBy=te.G}ngOnInit(){this.activatedRoute.params.subscribe(a=>{const t=a.id;t&&(this.gameId=t,this.locationsService.trackMe(this.gameId),this.activeGame$=this.activeGameService.getActiveGameData(t).pipe((0,u.b)(n=>{this.selectedPlace=n.places[0]})))})}selectPlace(a){a.selectable&&(this.selectedPlace=a)}postAnswers(){const a=[];this.activeGameService.changedAnswers.forEach((t,n)=>{t.imgFile?this.activeGameService.answerQuestionWithImage(n,t.imgFile).pipe((0,_.R)(this.destroy$)).subscribe(s=>{this.activeGameService.changedAnswers.delete(n),this.store.dispatch((0,g.u)({gameState:s}))}):a.push({questionId:n,answer:t})}),a.length>0&&this.activeGameService.answerQuestions(this.gameId,a).pipe((0,_.R)(this.destroy$)).subscribe(t=>{a.forEach(n=>{this.activeGameService.changedAnswers.delete(n.questionId)})})}}(f=b).\u0275fac=function(a){return new(a||f)(e.Y36(P.gz),e.Y36(Q),e.Y36(m.yh),e.Y36(ne.a))},f.\u0275cmp=e.Xpm({type:f,selectors:[["app-active-game"]],standalone:!0,features:[e.jDz],decls:8,vars:6,consts:[[1,"holder-places"],[3,"selected","place","index","click",4,"ngFor","ngForOf","ngForTrackBy"],[1,"holder-questions"],[3,"teamStatus","index","question",4,"ngFor","ngForOf","ngForTrackBy"],[1,"section-btn"],[1,"btn-simple",3,"click"],[3,"selected","place","index","click"],[3,"teamStatus","index","question"]],template:function(a,t){if(1&a&&(e.TgZ(0,"div",0),e.YNc(1,ie,1,3,"app-place-card",1),e.ALo(2,"async"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,se,2,5,"app-question-card",3),e.qZA(),e.TgZ(5,"div",4)(6,"button",5),e.NdJ("click",function(){return t.postAnswers()}),e._uU(7,"Ment\xe9s"),e.qZA()()),2&a){let n;e.xp6(1),e.Q6J("ngForOf",null==(n=e.lcZ(2,4,t.activeGame$))?null:n.places)("ngForTrackBy",t.myTrackBy),e.xp6(3),e.Q6J("ngForOf",null==t.selectedPlace?null:t.selectedPlace.questions)("ngForTrackBy",t.myTrackBy)}},dependencies:[c.ez,c.sg,c.Ov,$.$,X],styles:[".holder-places[_ngcontent-%COMP%]{display:flex;flex-direction:row;overflow-x:auto;gap:15px;padding:20px 30px;scroll-behavior:smooth}.holder-places[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.holder-questions[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,300px));grid-gap:15px;place-content:center}.section-btn[_ngcontent-%COMP%]{margin:1.5rem auto;display:flex;justify-content:center}"]}),(0,y.gn)([S.n],b.prototype,"destroy$",void 0);var ae=r(7747),oe=r(7278),re=r(6523),v=r(1993),F=r(8016);function ce(i,a){1&i&&e._UZ(0,"span",10)}function pe(i,a){1&i&&e._UZ(0,"img",11)}function le(i,a){1&i&&e._UZ(0,"img",12)}let de=(()=>{var i;class a{constructor(n,s,o){this.userService=n,this.authService=s,this.destroyRef=o,this.$loading=(0,e.tdS)(!1),this.isActive=this.authService.getTokenId()===this.client?.tokenId}ngOnInit(){this.isActive=this.authService.getTokenId()===this.client?.tokenId}revokeAccess(){this.client.tokenId&&(this.$loading.set(!0),this.userService.revokeToken(this.client.tokenId).pipe((0,k.q)(1),(0,v.sL)(this.destroyRef)).subscribe({complete:()=>this.$loading.set(!1),error:()=>this.$loading.set(!1)}))}}return(i=a).\u0275fac=function(n){return new(n||i)(e.Y36(x.K),e.Y36(F.e),e.Y36(e.ktI))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-client-card"]],inputs:{client:"client"},standalone:!0,features:[e.jDz],decls:13,vars:8,consts:[[1,"client-card"],["title","Akt\xedv eszk\xf6z","class","active",4,"ngIf"],[1,"platform"],[1,"text-size-base"],["title","Mobil kliens","class","img","src","assets/svg/mobile.svg","alt","MobileLogin",4,"ngIf"],[1,"browser","text-size-base"],[1,"ip","text-size-base"],["title","Google azonos\xedt\xe1s","class","img img-google","src","assets/svg/google.svg","alt","GoogleLogin",4,"ngIf"],["title","T\xf6rl\xe9s",1,"btn-remove","btn",3,"disabled","click"],["src","assets/svg/remove.svg","alt","Remove",1,"img"],["title","Akt\xedv eszk\xf6z",1,"active"],["title","Mobil kliens","src","assets/svg/mobile.svg","alt","MobileLogin",1,"img"],["title","Google azonos\xedt\xe1s","src","assets/svg/google.svg","alt","GoogleLogin",1,"img","img-google"]],template:function(n,s){1&n&&(e.TgZ(0,"div",0),e.YNc(1,ce,1,0,"span",1),e.TgZ(2,"div",2)(3,"p",3),e._uU(4),e.qZA(),e.YNc(5,pe,1,0,"img",4),e.qZA(),e.TgZ(6,"p",5),e._uU(7),e.qZA(),e.TgZ(8,"p",6),e._uU(9),e.qZA(),e.YNc(10,le,1,0,"img",7),e.TgZ(11,"button",8),e.NdJ("click",function(){return s.revokeAccess()}),e._UZ(12,"img",9),e.qZA()()),2&n&&(e.xp6(1),e.Q6J("ngIf",s.isActive),e.xp6(3),e.AsE("Rendszer: ",s.client.platform," ",s.client.isMobile,""),e.xp6(1),e.Q6J("ngIf",s.client.isMobile||"Android"===s.client.platform),e.xp6(2),e.hij("B\xf6ng\xe9sz\u0151: ",s.client.brand,""),e.xp6(2),e.hij("IP c\xedm: ",s.client.ipAddress,""),e.xp6(1),e.Q6J("ngIf",s.client.isGoogle),e.xp6(1),e.Q6J("disabled",s.$loading()))},dependencies:[c.ez,c.O5],styles:[".img[_ngcontent-%COMP%]{width:20px;aspect-ratio:1;object-fit:cover}p[_ngcontent-%COMP%]{width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.img-google[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}.btn-remove[_ngcontent-%COMP%]{position:absolute;bottom:10px;right:10px}.platform[_ngcontent-%COMP%]{display:flex;gap:10px;flex-direction:row}.active[_ngcontent-%COMP%]{position:absolute;top:5px;left:5px;aspect-ratio:1;border-radius:100%;background:rgb(78,255,47);width:10px;display:block}.client-card[_ngcontent-%COMP%]{overflow:hidden;position:relative;background-color:#fff;padding:12px;border-radius:8px;width:100%;box-shadow:3px 3px 5px 2px #00000061}"],changeDetection:0}),a})();function me(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-buttons",24),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(2);return e.KtG(s.addMember())}),e.qZA()}}function ue(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw(2);return e.KtG(o.$profile().members[0]=s)}),e.qZA()}if(2&i){const t=e.oxw(2);e.Q6J("label","Tag1:")("value",t.$profile().members[0])}}function ge(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw(2);return e.KtG(o.$profile().members[1]=s)}),e.qZA()}if(2&i){const t=e.oxw(2);e.Q6J("label","Tag2:")("value",t.$profile().members[1])}}function fe(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw(2);return e.KtG(o.$profile().members[2]=s)}),e.qZA()}if(2&i){const t=e.oxw(2);e.Q6J("label","Tag3:")("value",t.$profile().members[2])}}function he(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw(2);return e.KtG(o.$profile().members[3]=s)}),e.qZA()}if(2&i){const t=e.oxw(2);e.Q6J("label","Tag4:")("value",t.$profile().members[3])}}function _e(i,a){if(1&i&&(e.TgZ(0,"p",25),e._uU(1),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.hij("*V\xe1ltoztat\xe1s alatt ",t.$profile().nextEmail,"")}}function xe(i,a){1&i&&e._UZ(0,"app-client-card",26),2&i&&e.Q6J("client",a.$implicit)}function ve(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"section",1)(1,"div",2)(2,"div",3)(3,"div",4),e._UZ(4,"img",5),e.TgZ(5,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.$profile().name=s)}),e.qZA(),e.TgZ(6,"div",7)(7,"div",8)(8,"p",9),e._uU(9,"Csapattagok:"),e.qZA(),e.YNc(10,me,1,0,"app-buttons",10),e.qZA(),e.YNc(11,ue,1,2,"app-text-input",11),e.YNc(12,ge,1,2,"app-text-input",11),e.YNc(13,fe,1,2,"app-text-input",11),e.YNc(14,he,1,2,"app-text-input",11),e.qZA(),e.TgZ(15,"button",12),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.saveProfile())}),e._uU(16,"Ment\xe9s"),e.qZA()()(),e.TgZ(17,"div",13)(18,"div"),e.YNc(19,_e,2,1,"p",14),e.TgZ(20,"app-text-input",6),e.NdJ("valueChange",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.$profile().email=s)}),e.qZA()(),e.TgZ(21,"button",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.saveEmail())}),e._uU(22,"M\xf3dos\xedt\xe1s"),e.qZA()(),e.TgZ(23,"form",16)(24,"h3",17),e._uU(25,"Jelsz\xf3 m\xf3dos\xedt\xe1sa:"),e.qZA(),e._UZ(26,"input",18)(27,"input",19)(28,"input",20),e.TgZ(29,"button",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.savePassword())}),e._uU(30,"M\xf3dos\xedt\xe1s"),e.qZA()()(),e.TgZ(31,"div")(32,"h3",21),e._uU(33,"Bejelentkezett eszk\xf6z\xf6k:"),e.qZA(),e.TgZ(34,"div",22),e.YNc(35,xe,1,1,"app-client-card",23),e.qZA()()()}if(2&i){const t=e.oxw();e.xp6(4),e.Q6J("src",t.$profile().img,e.LSH),e.xp6(1),e.Q6J("label","Csapatn\xe9v:")("value",t.$profile().name),e.xp6(5),e.Q6J("ngIf",t.$profile().members.length<4),e.xp6(1),e.Q6J("ngIf",t.$profile().members[0]),e.xp6(1),e.Q6J("ngIf",t.$profile().members[1]),e.xp6(1),e.Q6J("ngIf",t.$profile().members[2]),e.xp6(1),e.Q6J("ngIf",t.$profile().members[3]),e.xp6(1),e.Q6J("disabled",t.isSame||t.$saving()),e.xp6(4),e.Q6J("ngIf",""!==t.$profile().nextEmail),e.xp6(1),e.Q6J("label","Email:")("value",t.$profile().email),e.xp6(1),e.Q6J("disabled",t.$saving()||t.isEmailSame),e.xp6(2),e.Q6J("formGroup",t.passwordForm),e.xp6(6),e.Q6J("disabled",t.$saving()||!t.passwordForm.valid),e.xp6(6),e.Q6J("ngForOf",t.$profile().clients)}}let Ce=(()=>{var i;class a{constructor(n,s,o,h){this.userService=n,this.authService=s,this.destroyRef=o,this.fb=h,this.$profile=(0,e.tdS)({id:-1,name:"Ismeretlen",email:"",nextEmail:"",role:"ROLE_USER",members:[],clients:[]}),this.$saving=(0,e.tdS)(!1),(0,e.cEC)(()=>{const I=this.authService.$currentTeamR();if(I){const A={...I};A.members=[...A.members],this.$profile.set(A)}},{allowSignalWrites:!0}),this.passwordForm=this.fb.group({oldPassword:["",[l.kI.required]],password:["",[l.kI.required]],confirmPassword:["",[l.kI.required,(0,re.Z)()]]})}addMember(){this.$profile().members.push("J\xe1t\xe9kos neve")}get isSame(){return JSON.stringify(this.$profile())===JSON.stringify(this.authService.$currentTeamR())}get isEmailSame(){return this.$profile().email===this.authService.$currentTeamR()?.email}saveProfile(){this.$saving.set(!0);const n={name:this.$profile().name,members:this.$profile().members};this.userService.updateProfile(n).pipe((0,v.sL)(this.destroyRef)).subscribe({complete:()=>this.$saving.set(!1)})}saveEmail(){this.$saving.set(!0),this.userService.updateEmail(this.$profile().email).pipe((0,v.sL)(this.destroyRef)).subscribe({complete:()=>this.$saving.set(!1)})}savePassword(){this.$saving.set(!0),this.userService.updatePassword({oldPassword:this.passwordForm.value.oldPassword,newPassword:this.passwordForm.value.password}).pipe((0,v.sL)(this.destroyRef)).subscribe({complete:()=>this.$saving.set(!1)})}}return(i=a).\u0275fac=function(n){return new(n||i)(e.Y36(x.K),e.Y36(F.e),e.Y36(e.ktI),e.Y36(l.qu))},i.\u0275cmp=e.Xpm({type:i,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:1,vars:1,consts:[["class","profile",4,"ngIf"],[1,"profile"],[1,"profile-inside"],[1,"profile-data"],[1,"infos"],["alt","Avatar",3,"src"],["type","editable",3,"label","value","valueChange"],[1,"members"],[1,"title"],[1,"text-size-base"],["classes","hover:scale-110 active:opacity-70 transition","iconSrc","assets/svg/add.svg","type","icon",3,"click",4,"ngIf"],["type","editable",3,"label","value","valueChange",4,"ngIf"],[1,"btn-simple","w-fit","self-center",3,"disabled","click"],[1,"profile-email"],["class","txt-warning-red",4,"ngIf"],[1,"btn-simple-red","w-fit","self-center",3,"disabled","click"],[1,"profile-password",3,"formGroup"],[1,"text-center","text-size-base","bold"],["autocomplete","off","formControlName","oldPassword","type","password","placeholder","R\xe9gi jelsz\xf3",1,"simpleInput"],["autocomplete","off","formControlName","password","type","password","placeholder","\xdaj jelsz\xf3",1,"simpleInput"],["autocomplete","off","formControlName","confirmPassword","type","password","placeholder","\xdaj jelsz\xf3 m\xe9gegyszer",1,"simpleInput"],[1,"text-size-lg","text-center","bold"],[1,"profile-clients"],[3,"client",4,"ngFor","ngForOf"],["classes","hover:scale-110 active:opacity-70 transition","iconSrc","assets/svg/add.svg","type","icon",3,"click"],[1,"txt-warning-red"],[3,"client"]],template:function(n,s){1&n&&e.YNc(0,ve,36,16,"section",0),2&n&&e.Q6J("ngIf",void 0!==s.$profile())},dependencies:[c.ez,c.sg,c.O5,l.UX,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,ae.t,oe.O,de],styles:['[_nghost-%COMP%]{height:100%}.profile-clients[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,350px));gap:18px;justify-content:center}.profile-email[_ngcontent-%COMP%], .profile-password[_ngcontent-%COMP%]{border-radius:8px;width:100%;padding:1.5rem;background-color:#fff;display:flex;flex-direction:column;gap:14px}.profile-email[_ngcontent-%COMP%]   .txt-warning-red[_ngcontent-%COMP%], .profile-password[_ngcontent-%COMP%]   .txt-warning-red[_ngcontent-%COMP%]{color:red;text-align:right;font-size:12px}.profile[_ngcontent-%COMP%]{padding:1rem;display:flex;flex-direction:row;gap:2rem;justify-content:center}@media (max-width: 800px){.profile[_ngcontent-%COMP%]{flex-direction:column;gap:1rem;align-items:center}}.profile[_ngcontent-%COMP%]   .profile-inside[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;align-items:center;width:100%;max-width:400px}.profile-data[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse;align-items:center;gap:20px;width:100%;background-color:#fff;padding:1.5rem;border-radius:8px}.profile-data[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:100%;object-fit:cover;aspect-ratio:1;width:100%}.profile-data[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:before{content:" ";display:block;position:absolute;height:100%;width:100%;background-repeat:no-repeat;background-size:cover;background-image:url(avatar.20a5d91f20916181.svg)}.profile-data[_ngcontent-%COMP%]   .infos[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:300px;gap:20px}.profile-data[_ngcontent-%COMP%]   .infos[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;gap:5px}.profile-data[_ngcontent-%COMP%]   .infos[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]   app-text-input[_ngcontent-%COMP%]{margin-left:10px}.profile-data[_ngcontent-%COMP%]   .infos[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:max-content;align-items:center;gap:10px}.profile-data[_ngcontent-%COMP%]   .infos[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   app-buttons[_ngcontent-%COMP%]{height:30px;width:30px}'],changeDetection:0}),a})();var C=r(92);const we=[{path:C.x.user.home.path,component:E},{path:C.x.user.active.path,component:b},{path:C.x.user.profile.path,component:Ce},{path:"**",redirectTo:C.x.user.home.path}]}}]);