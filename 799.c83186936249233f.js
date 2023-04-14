"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[799],{2799:(W,v,i)=>{i.r(v),i.d(v,{USER_ROUTES:()=>V});var c=i(6895),A=i(655),b=i(7579),_=i(2722),S=i(5192),y=i(1258),e=i(8256),T=i(5662);const q=function(s,n){return{"btn-simple-red":s,"btn-simple-green":n}};class d{constructor(n,t){this.cd=n,this.userService=t,this.game={applications:[],dateEnd:new Date,dateStart:new Date,id:0,places:[],title:"Test Title",active:!1},this.destroy$=new b.x}applyBtnClicked(){this.game.active||("applied"===this.game.userApplied||"accepted"===this.game.userApplied?this.cancelApplicationForGame():"none"===this.game.userApplied&&this.applyForGame())}applyForGame(){this.userService.applyForGame(this.game.id).pipe((0,_.R)(this.destroy$)).subscribe({next:n=>{console.log(n),this.game=n,this.cd.markForCheck()},error:n=>{console.error(n)}})}cancelApplicationForGame(){this.userService.cancelApplicationForGame(this.game.id).pipe((0,_.R)(this.destroy$)).subscribe({next:n=>{console.log(n),this.game=n,this.cd.markForCheck()},error:n=>{console.error(n)}})}}function M(s,n){1&s&&e._UZ(0,"app-user-game-card",2),2&s&&e.Q6J("game",n.$implicit)}d.\u0275fac=function(n){return new(n||d)(e.Y36(e.sBO),e.Y36(T.K))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-user-game-card"]],inputs:{game:"game"},standalone:!0,features:[e.jDz],decls:11,vars:18,consts:[[1,"card-game"],[3,"src","alt"],[1,"details"],[1,"text-size-lg","bold"],[1,"text-size-base"],[1,"btn-simple",3,"routerLink","disabled","ngClass","click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0),e._UZ(1,"img",1),e.TgZ(2,"div",2)(3,"p",3),e._uU(4),e.qZA(),e.TgZ(5,"p",4),e._uU(6),e.ALo(7,"date"),e.ALo(8,"date"),e.qZA()(),e.TgZ(9,"button",5),e.NdJ("click",function(){return t.applyBtnClicked()}),e._uU(10),e.qZA()()),2&n&&(e.xp6(1),e.Q6J("src","https://media.timeout.com/images/105879336/750/422/image.jpg",e.LSH)("alt",t.game.title),e.xp6(3),e.Oqu(t.game.title),e.xp6(2),e.AsE("",e.xi3(7,9,t.game.dateStart,"short")," - ",e.xi3(8,12,t.game.dateEnd,"short"),""),e.xp6(3),e.Q6J("routerLink",t.game.active&&"accepted"===t.game.userApplied?"/user/active/"+t.game.id:void 0)("disabled",!t.game.active||"declined"===t.game.userApplied)("ngClass",e.WLB(15,q,"applied"===t.game.userApplied||"accepted"===t.game.userApplied&&!t.game.active,t.game.active&&"accepted"===t.game.userApplied)),e.xp6(1),e.Oqu("applied"===t.game.userApplied||"accepted"===t.game.userApplied?t.game.active&&"accepted"===t.game.userApplied?"\xcdr\xe1ny a j\xe1t\xe9k":"Visszamond\xe1s":"Jelentkez\xe9s"))},dependencies:[c.ez,c.mk,c.uU,y.rH],styles:[".card-game[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:400px;width:-moz-fit-content;width:fit-content;padding:1rem;gap:10px;border-radius:6px;background:#ffffff;box-shadow:20px 20px 60px #d9d9d9,-20px -20px 60px #fff;height:100%}.card-game[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{flex-grow:1}[_nghost-%COMP%]{height:100%}"],changeDetection:0}),(0,A.gn)([S.n],d.prototype,"destroy$",void 0);class m{constructor(n){this.userService=n}ngOnInit(){this.games=this.userService.getGames()}}m.\u0275fac=function(n){return new(n||m)(e.Y36(T.K))},m.\u0275cmp=e.Xpm({type:m,selectors:[["app-home"]],standalone:!0,features:[e.jDz],decls:5,vars:3,consts:[[1,"grid-games"],[3,"game",4,"ngFor","ngForOf"],[3,"game"]],template:function(n,t){1&n&&(e.TgZ(0,"p"),e._uU(1,"\xdcdv \xfajra itt username csapat"),e.qZA(),e.TgZ(2,"section",0),e.YNc(3,M,1,1,"app-user-game-card",1),e.ALo(4,"async"),e.qZA()),2&n&&(e.xp6(3),e.Q6J("ngForOf",e.lcZ(4,1,t.games)))},dependencies:[c.ez,c.sg,c.Ov,d],styles:[".grid-games[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem}@media (max-width: 1050px){.grid-games[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width: 600px){.grid-games[_ngcontent-%COMP%]{grid-template-columns:repeat(1,minmax(0,1fr))}}.grid-games[_ngcontent-%COMP%]{padding:0 1rem;place-items:center}"]});var C=i(8505);function G(s,n){if(1&s&&e._UZ(0,"img",3),2&s){const t=e.oxw();e.Q6J("src",t.place.img,e.LSH)}}const Q=function(s,n){return{selected:s,selectable:n}},O=function(s){return{bold:s}};class g{constructor(){this.index=0,this.selected=!1}}g.\u0275fac=function(n){return new(n||g)},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-place-card"]],inputs:{place:"place",index:"index",selected:"selected"},standalone:!0,features:[e.jDz],decls:4,vars:9,consts:[[1,"place-card",3,"ngClass"],[1,"text-size-base",3,"ngClass"],["alt","",3,"src",4,"ngIf"],["alt","",3,"src"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.qZA(),e.YNc(3,G,1,1,"img",2),e.qZA()),2&n&&(e.Q6J("ngClass",e.WLB(4,Q,t.selected,t.place.selectable)),e.xp6(1),e.Q6J("ngClass",e.VKq(7,O,t.place.selectable)),e.xp6(1),e.hij(" Helysz\xedn ",t.index+1,""),e.xp6(1),e.Q6J("ngIf",t.place.selectable&&t.place.img))},dependencies:[c.ez,c.mk,c.O5],styles:[".place-card[_ngcontent-%COMP%]{position:relative;padding:20px;border-radius:8px;border:1px solid black;width:max-content}.place-card.selectable[_ngcontent-%COMP%]{cursor:pointer}.place-card.selectable.selected[_ngcontent-%COMP%]{background:rgba(0,0,0,.07)}@media (pointer: fine){.place-card.selectable[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.07)}}.place-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;object-fit:contain;opacity:.8;width:100%;height:100%;border-radius:8px}"],changeDetection:0});var r=(()=>{return(s=r||(r={})).shortText="shortText",s.longText="longText",s.number="number",s.imgOnly="imgOnly",s.year="year",r;var s})(),h=i(433),Z=i(4057),F=i(2340),I=i(5698),x=i(2789),P=i(529),w=i(2930);class l{constructor(n,t){this.http=n,this.store=t,this.baseUrl=F.N.apiBaseUrl+"/user",this.changedAnswers=new Map}addAnswer(n,t){this.changedAnswers.set(n,t)}getActiveGameData(n){return this.http.get(`${this.baseUrl}/activegame/${n}`)}getTeamGameStatus(n){return this.http.get(`${this.baseUrl}/status/${n}`).pipe((0,C.b)(t=>{this.store.dispatch((0,x.u)({gameState:t}))}))}loadTeamGameStatus(n){return this.http.get(`${this.baseUrl}/status/${n}`).pipe((0,C.b)(t=>{this.store.dispatch((0,x.u)({gameState:t}))})).pipe((0,I.q)(1)).subscribe()}answerQuestions(n,t){return this.http.post(`${this.baseUrl}/answers`,{gameId:n,questionAnswers:t}).pipe((0,C.b)(o=>{this.store.dispatch((0,x.u)({gameState:o}))}))}answerQuestionWithImage(n,t){const a=new FormData;return a.append("image",t),this.http.post(`${this.baseUrl}/answer/${n}/image`,a)}}l.\u0275fac=function(n){return new(n||l)(e.LFG(P.eN),e.LFG(w.yh))},l.\u0275prov=e.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"});var J=i(3105);const k=["questionFileInput"];function U(s,n){if(1&s&&(e._UZ(0,"img",9),e.ALo(1,"imgSrc")),2&s){const t=e.oxw();e.Q6J("src",e.lcZ(1,1,t._question.img),e.LSH)}}function E(s,n){if(1&s&&(e._UZ(0,"img",13),e.ALo(1,"imgSrc")),2&s){const t=e.oxw(2);let a;e.Q6J("src",null!==(a=t.currentImg)&&void 0!==a?a:e.lcZ(1,1,null==t._savedAnswer?null:t._savedAnswer.img),e.LSH)}}function N(s,n){if(1&s){const t=e.EpF();e.ynx(0),e.TgZ(1,"input",10,11),e.NdJ("change",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.inputFileChanged(o))}),e.qZA(),e.YNc(3,E,2,3,"img",12),e.BQk()}if(2&s){const t=e.oxw();e.xp6(3),e.Q6J("ngIf",t.currentImg||(null==t._savedAnswer?null:t._savedAnswer.img))}}function z(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"input",14),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.changed(o))}),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function D(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"input",14),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.changed(o))}),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function R(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"input",15),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.changed(o))}),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}function Y(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"input",15),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.changed(o))}),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("ngModel",t.currentAnswer)}}const j=function(s){return{differentAnswer:s}};class f{set question(n){this._question=n,this.setCurrentAnswerData()}set teamStatus(n){this._teamStatus=n,this.setCurrentAnswerData()}constructor(n){this.activeGameService=n,this.QuestionType=r,this.currentAnswer="",this.answerIsSame=!1}setCurrentAnswerData(){if(this._question&&this._teamStatus){switch(this._savedAnswer=this._teamStatus?.placeStatuses?.find(n=>n.placeId===this._question.placeId)?.qanswers?.find(n=>n.questionDtoNoAnswers.id===this._question.id),this._question.type){case r.shortText:case r.longText:this.currentAnswer=this._savedAnswer?.answerText??"";break;case r.number:this.currentAnswer=this._savedAnswer?.answerNumber??"";break;case r.imgOnly:this.fileInputRef?.nativeElement&&(this.fileInputRef.nativeElement.value=null),this.currentImg=void 0;break;case r.year:this.currentAnswer=this._savedAnswer?.answerNumber??""}this.setIsAnswerSameAsStatus()}}setIsAnswerSameAsStatus(){switch(this._question.type){case r.shortText:case r.longText:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerText;break;case r.number:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerNumber;break;case r.imgOnly:this.answerIsSame=!this.currentImg;break;case r.year:this.answerIsSame=this.currentAnswer===this._savedAnswer?.answerNumber}}changed(n){if(this.currentAnswer=n,this.setIsAnswerSameAsStatus(),!this.answerIsSame)switch(this._question.type){case r.shortText:case r.longText:this.activeGameService.addAnswer(this._question.id,{answerText:n});break;case r.number:this.activeGameService.addAnswer(this._question.id,{answerNumber:n});break;case r.imgOnly:return;case r.year:this.activeGameService.addAnswer(this._question.id,{answerNumber:n})}}inputFileChanged(n){if(n.target.files[0]){const t=new FileReader;t.onload=()=>{this.currentImg=t.result,this.setIsAnswerSameAsStatus()},t.readAsDataURL(n.target.files[0]),this.activeGameService.addAnswer(this._question.id,{imgFile:n.target.files[0]})}}}f.\u0275fac=function(n){return new(n||f)(e.Y36(l))},f.\u0275cmp=e.Xpm({type:f,selectors:[["app-question-card"]],viewQuery:function(n,t){if(1&n&&e.Gf(k,5),2&n){let a;e.iGM(a=e.CRH())&&(t.fileInputRef=a.first)}},inputs:{index:"index",question:"question",teamStatus:"teamStatus"},standalone:!0,features:[e.jDz],decls:13,vars:13,consts:[[1,"holder-question"],[1,"text-size-base","bold","question-title"],[1,"question-body",3,"ngClass"],[1,"text-size-base"],["class","object-contain max-h-[300px] aspect-video",3,"src",4,"ngIf"],[3,"ngSwitch"],[4,"ngSwitchCase"],["placeholder","V\xe1lasz","type","text",3,"ngModel","ngModelChange",4,"ngSwitchCase"],["placeholder","0","type","number",3,"ngModel","ngModelChange",4,"ngSwitchCase"],[1,"object-contain","max-h-[300px]","aspect-video",3,"src"],["type","file",3,"change"],["questionFileInput",""],["id","questionImageAnswer","class","object-contain max-h-[300px] aspect-video","alt","",3,"src",4,"ngIf"],["id","questionImageAnswer","alt","",1,"object-contain","max-h-[300px]","aspect-video",3,"src"],["placeholder","V\xe1lasz","type","text",3,"ngModel","ngModelChange"],["placeholder","0","type","number",3,"ngModel","ngModelChange"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.qZA(),e.TgZ(3,"div",2)(4,"p",3),e._uU(5),e.qZA(),e.YNc(6,U,2,3,"img",4),e.ynx(7,5),e.YNc(8,N,4,1,"ng-container",6),e.YNc(9,z,1,1,"input",7),e.YNc(10,D,1,1,"input",7),e.YNc(11,R,1,1,"input",8),e.YNc(12,Y,1,1,"input",8),e.BQk(),e.qZA()()),2&n&&(e.xp6(2),e.AsE("",t._question.riddle?"Rejtv\xe9ny":""," K\xe9rd\xe9s ",t.index+1,""),e.xp6(1),e.Q6J("ngClass",e.VKq(11,j,!t.answerIsSame)),e.xp6(2),e.Oqu(t._question.name),e.xp6(1),e.Q6J("ngIf",t._question.img),e.xp6(1),e.Q6J("ngSwitch",t._question.type),e.xp6(1),e.Q6J("ngSwitchCase",t.QuestionType.imgOnly),e.xp6(1),e.Q6J("ngSwitchCase",t.QuestionType.longText),e.xp6(1),e.Q6J("ngSwitchCase",t.QuestionType.shortText),e.xp6(1),e.Q6J("ngSwitchCase",t.QuestionType.number),e.xp6(1),e.Q6J("ngSwitchCase",t.QuestionType.year))},dependencies:[c.ez,c.mk,c.O5,c.RF,c.n9,h.u5,h.Fj,h.wV,h.JJ,h.On,Z.m,J.G],styles:[".holder-question[_ngcontent-%COMP%]{border-radius:8px;border:1px solid black;position:relative;display:flex;flex-direction:column;max-width:400px;height:100%}.holder-question[_ngcontent-%COMP%]   .question-title[_ngcontent-%COMP%]{top:0;left:0;width:100%;background:rgba(0,0,0,.17);padding:5px 10px}.holder-question[_ngcontent-%COMP%]   .question-body[_ngcontent-%COMP%]{padding:20px;display:flex;flex-direction:column;gap:10px;background:rgba(0,255,49,.11);flex-grow:1}.holder-question[_ngcontent-%COMP%]   .question-body.differentAnswer[_ngcontent-%COMP%]{background:rgba(0,133,205,.11)}.holder-question[_ngcontent-%COMP%]   .question-body[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);padding:10px;border-radius:8px}"]});const H=(0,w.ZF)("game"),$=(0,w.P1)(H,s=>s.teamGameStatus);function K(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"app-place-card",6),e.NdJ("click",function(){const p=e.CHM(t).$implicit,X=e.oxw();return e.KtG(X.selectPlace(p))}),e.qZA()}if(2&s){const t=n.$implicit,a=n.index,o=e.oxw();e.Q6J("selected",o.selectedPlace===t)("place",t)("index",a)}}function B(s,n){if(1&s&&(e._UZ(0,"app-question-card",7),e.ALo(1,"async")),2&s){const t=n.$implicit,a=n.index,o=e.oxw();e.Q6J("teamStatus",e.lcZ(1,3,o.teamStatus))("index",a)("question",t)}}class u{constructor(n,t,a){this.activatedRoute=n,this.activeGameService=t,this.store=a,this.destroy$=new b.x,this.teamStatus=this.store.select($),this.gameId=-1}ngOnInit(){this.activatedRoute.params.subscribe(n=>{const t=n.id;t&&(this.gameId=t,this.activeGameService.loadTeamGameStatus(t),this.activeGame$=this.activeGameService.getActiveGameData(t).pipe((0,C.b)(a=>{this.selectedPlace=a.places[0]})))})}selectPlace(n){n.selectable&&(this.selectedPlace=n)}postAnswers(){const n=[];this.activeGameService.changedAnswers.forEach((t,a)=>{t.imgFile?this.activeGameService.answerQuestionWithImage(a,t.imgFile).pipe((0,_.R)(this.destroy$)).subscribe(o=>{this.activeGameService.changedAnswers.delete(a),this.store.dispatch((0,x.u)({gameState:o}))}):n.push({questionId:a,answer:t})}),n.length>0&&this.activeGameService.answerQuestions(this.gameId,n).pipe((0,_.R)(this.destroy$)).subscribe(t=>{n.forEach(a=>{this.activeGameService.changedAnswers.delete(a.questionId)})})}}u.\u0275fac=function(n){return new(n||u)(e.Y36(y.gz),e.Y36(l),e.Y36(w.yh))},u.\u0275cmp=e.Xpm({type:u,selectors:[["app-active-game"]],standalone:!0,features:[e.jDz],decls:8,vars:4,consts:[[1,"holder-places"],[3,"selected","place","index","click",4,"ngFor","ngForOf"],[1,"holder-questions"],[3,"teamStatus","index","question",4,"ngFor","ngForOf"],[1,"section-btn"],[1,"btn-simple",3,"click"],[3,"selected","place","index","click"],[3,"teamStatus","index","question"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0),e.YNc(1,K,1,3,"app-place-card",1),e.ALo(2,"async"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,B,2,5,"app-question-card",3),e.qZA(),e.TgZ(5,"div",4)(6,"button",5),e.NdJ("click",function(){return t.postAnswers()}),e._uU(7,"Ment\xe9s"),e.qZA()()),2&n){let a;e.xp6(1),e.Q6J("ngForOf",null==(a=e.lcZ(2,2,t.activeGame$))?null:a.places),e.xp6(3),e.Q6J("ngForOf",null==t.selectedPlace?null:t.selectedPlace.questions)}},dependencies:[c.ez,c.sg,c.Ov,g,f],styles:[".holder-places[_ngcontent-%COMP%]{display:flex;flex-direction:row;overflow-x:auto;gap:15px;padding:20px 30px;scroll-behavior:smooth}.holder-places[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.holder-questions[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,300px));grid-gap:15px;place-content:center}.section-btn[_ngcontent-%COMP%]{margin:1.5rem auto;display:flex;justify-content:center}"]}),(0,A.gn)([S.n],u.prototype,"destroy$",void 0);const V=[{path:"home",component:m},{path:"active/:id",component:u},{path:"**",redirectTo:""}]}}]);