"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[384],{8384:(P,g,p)=>{p.r(g),p.d(g,{GamesModule:()=>j});var o=p(6895),c=p(5079),d=(()=>{return(t=d||(d={}))[t.teams=0]="teams",t[t.places=1]="places",d;var t})(),e=p(8256),h=p(2340),_=p(529);let C=(()=>{class t{constructor(s){this.http=s,this.baseUrl=h.N.apiBaseUrl}getAllGames(){return this.http.get(`${this.baseUrl}/games`)}}return t.\u0275fac=function(s){return new(s||t)(e.LFG(_.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var m=p(9009);let v=(()=>{class t{constructor(){this.game={applications:["t1","t2"],dateEnd:"2020.10.10",dateStart:"2020.10.10",id:0,img:"assets/img/sample.jpg",places:[],title:"SampleTitle"},this.onEditClicked=new e.vpe,this.onTeamsClicked=new e.vpe,this.onPlacesClicked=new e.vpe,this.ButtonType=c.L}ngOnInit(){}getAcceptedApplicationsLength(){}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-gamecard"]],inputs:{game:"game"},outputs:{onEditClicked:"onEditClicked",onTeamsClicked:"onTeamsClicked",onPlacesClicked:"onPlacesClicked"},decls:13,vars:9,consts:[[1,"relative","rounded","hover:scale-105","duration-300","shadow-2xl"],[1,"flex","flex-col"],["alt","Game's image",1,"aspect-video","object-cover","rounded-t",3,"src"],[1,"p-3"],[1,"flex","flex-row","gap-3"],[1,"font-bold","text-size-base"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg",3,"type","click"],[1,"text-size-min"],[1,"flex","flex-row","w-full","border-t-1"],["classes","border-r-1","iconSrc","assets/svg/map.svg",3,"text","type","click"],["iconSrc","assets/svg/team2.svg",3,"text","type","click"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"img",2),e.TgZ(3,"div",3)(4,"div",4)(5,"p",5),e._uU(6),e.qZA(),e.TgZ(7,"app-buttons",6),e.NdJ("click",function(){return a.onEditClicked.emit()}),e.qZA()(),e.TgZ(8,"p",7),e._uU(9),e.qZA()(),e.TgZ(10,"div",8)(11,"app-buttons",9),e.NdJ("click",function(){return a.onPlacesClicked.emit()}),e.qZA(),e.TgZ(12,"app-buttons",10),e.NdJ("click",function(){return a.onTeamsClicked.emit()}),e.qZA()()()()),2&s&&(e.xp6(2),e.s9C("src",a.game.img,e.LSH),e.xp6(4),e.Oqu(a.game.title?a.game.title:"No title"),e.xp6(1),e.Q6J("type",a.ButtonType.iconButton),e.xp6(2),e.AsE("",a.game.dateStart," - ",a.game.dateEnd,""),e.xp6(2),e.MGl("text","",a.game.places.length," Helysz\xedn"),e.Q6J("type",a.ButtonType.iconBlueHover),e.xp6(1),e.MGl("text","",a.game.applications.length," Csapat"),e.Q6J("type",a.ButtonType.iconBlueHover))},dependencies:[m.O],styles:[".gif[_ngcontent-%COMP%]{background-image:url(/assets/gif/map.gif)}"]}),t})();const y=["modalContent"],x=["*"];let T=(()=>{class t{constructor(){this.displayedClassName="",this.isDisplayed=!1,this.classes="",this.isDisplayedChange=new e.vpe}ngOnInit(){}clickInside(s){this.modal.nativeElement.contains(s.target)||(this.isDisplayedChange.emit(!1),this.isDisplayed=!1)}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-modal"]],viewQuery:function(s,a){if(1&s&&e.Gf(y,5),2&s){let i;e.iGM(i=e.CRH())&&(a.modal=i.first)}},hostBindings:function(s,a){1&s&&e.NdJ("click",function(l){return a.clickInside(l)})},inputs:{displayedClassName:"displayedClassName",isDisplayed:"isDisplayed",classes:"classes"},outputs:{isDisplayedChange:"isDisplayedChange"},ngContentSelectors:x,decls:4,vars:4,consts:[[1,"modal",3,"ngClass"],["modalContent",""]],template:function(s,a){1&s&&(e.F$t(),e.TgZ(0,"div",0)(1,"div",null,1),e.Hsn(3),e.qZA()()),2&s&&(e.Q6J("ngClass",a.isDisplayed?"flex":"hidden"),e.xp6(1),e.Gre("modal-content ",a.classes,""))},dependencies:[o.mk],styles:[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;align-items:center;width:100%;height:100%;overflow:unset;background-color:#000;background-color:#0006}.modal-content[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;margin:auto;border-radius:10px;max-width:80%;max-height:80%}"]}),t})();var u=p(3904);function b(t,n){if(1&t&&(e.TgZ(0,"app-buttons",9),e.NdJ("click",function(a){return a.stopPropagation()}),e.qZA()),2&t){const s=e.oxw();e.Q6J("type",s.ButtonType.iconButton)}}function w(t,n){if(1&t&&(e.TgZ(0,"div",15)(1,"div",16)(2,"p",4),e._uU(3),e.qZA(),e.TgZ(4,"p",12),e._uU(5),e.qZA()()()),2&t){const s=n.$implicit,a=e.oxw(2);e.xp6(3),e.hij("K\xe9rd\xe9s ",a.place.questions.indexOf(s)+1,": "),e.xp6(2),e.hij("",s.name," ")}}function Z(t,n){if(1&t&&(e.TgZ(0,"div",10)(1,"div",11)(2,"p",4),e._uU(3,"C\xedme: "),e.qZA(),e.TgZ(4,"p",12),e._uU(5),e.qZA()(),e._UZ(6,"img",13),e.YNc(7,w,6,2,"div",14),e.qZA()),2&t){const s=e.oxw();e.xp6(5),e.Oqu(s.place.address),e.xp6(1),e.s9C("alt",s.place.name),e.xp6(1),e.Q6J("ngForOf",s.place.questions)}}let M=(()=>{class t{constructor(){this.place={id:-1,name:"TestPlace",img:"",gameId:-1,address:"",latitude:"",longitude:"",questions:[]},this.open=!1,this.ButtonType=c.L}ngOnInit(){}toggle(s){this.open=!this.open,s.stopPropagation()}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-dropdown"]],inputs:{place:"place"},decls:10,vars:6,consts:[[1,"p-5","mobile:px-3","w-full","hover:border-amber-600","rounded","border-1","border-transparent","shadow","mb-1",3,"click"],[1,"flex","w-full","justify-between","items-center"],[1,"flex","w-fit","gap-[10%]","items-center"],["src","assets/img/sample.jpg",1,"max-w-[30%]","aspect-video","rounded","object-cover","max-h-[50px]",3,"alt"],[1,"text-size-base","font-bold"],["classes","min-w-[18px]","routerLink","/admin-place/1","iconSrc","assets/svg/edit.svg",3,"type","click",4,"ngIf"],["src","assets/svg/anchor-down-black.svg","alt","Dropdown",1,"cursor-pointer",3,"ngClass"],[1,"transition-all",3,"ngClass","click"],["class","flex flex-col gap-4",4,"ngIf"],["classes","min-w-[18px]","routerLink","/admin-place/1","iconSrc","assets/svg/edit.svg",3,"type","click"],[1,"flex","flex-col","gap-4"],[1,"flex","gap-2","mobile:flex-col"],[1,"text-size-base"],["src","assets/img/sample.jpg",1,"object-contain","max-h-[300px]","aspect-video",3,"alt"],["class","flex flex-col gap-3",4,"ngFor","ngForOf"],[1,"flex","flex-col","gap-3"],[1,"flex","gap-1","mobile:flex-col"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0),e.NdJ("click",function(l){return a.toggle(l)}),e.TgZ(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"p",4),e._uU(5),e.qZA(),e.YNc(6,b,1,1,"app-buttons",5),e.qZA(),e._UZ(7,"img",6),e.qZA(),e.TgZ(8,"div",7),e.NdJ("click",function(l){return l.stopPropagation()}),e.YNc(9,Z,8,3,"div",8),e.qZA()()),2&s&&(e.xp6(3),e.s9C("alt",a.place.name),e.xp6(2),e.Oqu(a.place.name),e.xp6(1),e.Q6J("ngIf",a.open),e.xp6(1),e.Q6J("ngClass",a.open?"rotate-180":""),e.xp6(1),e.Q6J("ngClass",a.open?"h-fit mt-5":"h-0"),e.xp6(1),e.Q6J("ngIf",a.open))},dependencies:[o.mk,o.sg,o.O5,m.O,u.rH]}),t})();const k=function(t,n){return[t,n]};function A(t,n){if(1&t&&(e.TgZ(0,"div",6)(1,"div",7),e._UZ(2,"img",8),e.TgZ(3,"p",9),e._uU(4),e.qZA()(),e.TgZ(5,"div",10),e._UZ(6,"app-buttons",11)(7,"app-buttons",12),e.qZA()()),2&t){const s=n.$implicit,a=e.oxw(2);e.Q6J("ngClass",e.WLB(7,k,!0===s.admin?"bg-green-200":"",!1===s.admin?"bg-red-200":"")),e.xp6(2),e.s9C("alt",s.name),e.xp6(2),e.Oqu(s.name),e.xp6(2),e.Q6J("ngClass",!1!==s.admin?"":"invisible")("type",a.ButtonType.iconButton),e.xp6(1),e.Q6J("ngClass",!0!==s.admin?"":"invisible")("type",a.ButtonType.iconButton)}}function E(t,n){if(1&t&&(e.TgZ(0,"div",2)(1,"p",3),e._uU(2,"Csapatok"),e.qZA(),e.TgZ(3,"div",4),e.YNc(4,A,8,10,"div",5),e.qZA()()),2&t){const s=e.oxw();e.xp6(4),e.Q6J("ngForOf",s.teams)}}function G(t,n){1&t&&e._UZ(0,"app-dropdown",16),2&t&&e.Q6J("place",n.$implicit)}function D(t,n){if(1&t&&(e.TgZ(0,"div",13)(1,"p",3),e._uU(2,"Helysz\xednek"),e.qZA(),e.TgZ(3,"div",14),e.YNc(4,G,1,1,"app-dropdown",15),e.qZA()()),2&t){const s=e.oxw();e.xp6(4),e.Q6J("ngForOf",s.places)}}let J=(()=>{class t{constructor(){this.type=d.teams,this.teams=[{id:0,name:"Team0",email:"",admin:!1},{id:1,name:"Team1",email:"",admin:!1},{id:2,name:"Team2",email:"",admin:!1},{id:3,name:"Team3",email:"",admin:!1},{id:4,name:"Team4",email:"",admin:!1},{id:5,name:"Team5",email:"",admin:!1}],this.places=[{id:0,name:"Place1",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0},{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:1}]},{id:0,name:"Place2",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0}]},{id:0,name:"Place3",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0}]}],this.ButtonType=c.L,this.ListType=d}ngOnInit(){}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-lists"]],inputs:{type:"type",teams:"teams",places:"places"},decls:2,vars:2,consts:[["class","flex flex-col gap-3 relative bg-white p-5 rounded shadow w-full max-h-[80vh]",4,"ngIf"],["class","flex flex-col gap-3 relative bg-white p-5 h-[80vh] h-full rounded shadow w-full",4,"ngIf"],[1,"flex","flex-col","gap-3","relative","bg-white","p-5","rounded","shadow","w-full","max-h-[80vh]"],[1,"text-size-lg","text-center","w-full","font-bold","mb-6"],[1,"overflow-y-auto","h-fit"],["class","flex justify-between mobile:flex-col gap-10 p-5 pr-10 hover:border-amber-600 rounded border-1 border-transparent shadow items-center",3,"ngClass",4,"ngFor","ngForOf"],[1,"flex","justify-between","mobile:flex-col","gap-10","p-5","pr-10","hover:border-amber-600","rounded","border-1","border-transparent","shadow","items-center",3,"ngClass"],[1,"flex","w-fit","gap-[10%]","items-center"],["src","assets/img/team-placeholder.jpg",1,"max-w-[50px]","aspect-square","rounded-[100%]","object-cover","max-h-[50px]",3,"alt"],[1,"text-size-base","font-bold"],[1,"flex","h-full","w-fit","gap-[10%]","items-center"],["classes","w-[3rem] hover:opacity-70 rotate-y-180","iconSrc","/assets/svg/bear-red.svg",3,"ngClass","type"],["classes","w-[3rem] hover:opacity-70 ","iconSrc","/assets/svg/bear-green.svg",3,"ngClass","type"],[1,"flex","flex-col","gap-3","relative","bg-white","p-5","h-[80vh]","h-full","rounded","shadow","w-full"],[1,"h-fit","overflow-y-auto"],[3,"place",4,"ngFor","ngForOf"],[3,"place"]],template:function(s,a){1&s&&(e.YNc(0,E,5,1,"div",0),e.YNc(1,D,5,1,"div",1)),2&s&&(e.Q6J("ngIf",a.type===a.ListType.teams),e.xp6(1),e.Q6J("ngIf",a.type===a.ListType.places))},dependencies:[o.mk,o.sg,o.O5,m.O,M],styles:["[_nghost-%COMP%]{width:100%}"]}),t})();var B=p(3952);let z=(()=>{class t{constructor(){this.ButtonType=c.L,this.isEdit=!0,this.game={applications:[],dateEnd:"",dateStart:"",id:0,img:"",places:[],title:"Alma"},this.title=this.isEdit?this.game.title+" szerkeszt\xe9se":"\xdaj j\xe1t\xe9k l\xe9trehoz\xe1sa"}ngOnInit(){}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-edit-game"]],inputs:{isEdit:"isEdit",game:"game"},decls:9,vars:3,consts:[[1,"relative","bg-white","p-5","rounded","overflow-y-auto","max-h-[80vh]"],[1,"text-size-h3","text-center","w-full","font-bold","mb-6"],["classes","mb-4","label","Neve"],["classes","mb-4","label","Kezd\xe9s d\xe1tuma"],["classes","mb-4","label","Befejez\xe9s d\xe1tuma"],[1,"w-full","flex","justify-between"],["text","Vissza",3,"type"],["text","Ment\xe9s",3,"type"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.qZA(),e._UZ(3,"app-text-input",2)(4,"app-text-input",3)(5,"app-text-input",4),e.TgZ(6,"div",5),e._UZ(7,"app-buttons",6)(8,"app-buttons",7),e.qZA()()),2&s&&(e.xp6(2),e.Oqu(a.isEdit?a.game.title+" szerkeszt\xe9se":"\xdaj j\xe1t\xe9k l\xe9trehoz\xe1sa"),e.xp6(5),e.Q6J("type",a.ButtonType.simple),e.xp6(1),e.Q6J("type",a.ButtonType.simple))},dependencies:[B.t,m.O]}),t})();function F(t,n){if(1&t){const s=e.EpF();e.TgZ(0,"app-gamecard",7),e.NdJ("onPlacesClicked",function(){e.CHM(s);const i=e.oxw();return e.KtG(i.changeModal(i.PLACES))})("onTeamsClicked",function(){e.CHM(s);const i=e.oxw();return e.KtG(i.changeModal(i.TEAMS))})("onEditClicked",function(){const l=e.CHM(s).$implicit,U=e.oxw();return e.KtG(U.editGame(l))}),e.qZA()}2&t&&e.Q6J("game",n.$implicit)}let S=(()=>{class t{constructor(s){this.adminService=s,this.ButtonType=c.L,this.ListType=d,this.games=[],this.EDIT="EDIT",this.TEAMS="TEAMS",this.PLACES="PLACES",this.editModalVisible=!1,this.teamsModalVisible=!1,this.placesModalVisible=!1,this.selectedGame={applications:[],dateEnd:"",dateStart:"",id:0,places:[],title:""}}ngOnInit(){this.adminService.getAllGames().subscribe(s=>{this.games=s})}editGame(s){this.selectedGame=s,this.changeModal(this.EDIT)}changeModal(s){switch(this.editModalVisible=!1,this.teamsModalVisible=!1,this.placesModalVisible=!1,s){case this.EDIT:this.editModalVisible=!0;break;case this.TEAMS:this.teamsModalVisible=!0;break;case this.PLACES:this.placesModalVisible=!0}}}return t.\u0275fac=function(s){return new(s||t)(e.Y36(C))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-games"]],decls:9,vars:6,consts:[[1,"relative","p-10","bg-smoke","mobile:p-5"],[1,"grid","grid-cols-4","tablet:grid-cols-2","gap-6","mobile:grid-cols-1"],[3,"game","onPlacesClicked","onTeamsClicked","onEditClicked",4,"ngFor","ngForOf"],[3,"isDisplayed","isDisplayedChange"],[3,"game"],["classes","w-full",3,"isDisplayed","isDisplayedChange"],[3,"type"],[3,"game","onPlacesClicked","onTeamsClicked","onEditClicked"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0)(1,"div",1),e.YNc(2,F,1,1,"app-gamecard",2),e.qZA()(),e.TgZ(3,"app-modal",3),e.NdJ("isDisplayedChange",function(l){return a.editModalVisible=l}),e._UZ(4,"app-edit-game",4),e.qZA(),e.TgZ(5,"app-modal",5),e.NdJ("isDisplayedChange",function(l){return a.teamsModalVisible=l}),e._UZ(6,"app-lists"),e.qZA(),e.TgZ(7,"app-modal",5),e.NdJ("isDisplayedChange",function(l){return a.placesModalVisible=l}),e._UZ(8,"app-lists",6),e.qZA()),2&s&&(e.xp6(2),e.Q6J("ngForOf",a.games),e.xp6(1),e.Q6J("isDisplayed",a.editModalVisible),e.xp6(1),e.Q6J("game",a.selectedGame),e.xp6(1),e.Q6J("isDisplayed",a.teamsModalVisible),e.xp6(2),e.Q6J("isDisplayed",a.placesModalVisible),e.xp6(1),e.Q6J("type",a.ListType.places))},dependencies:[o.sg,v,T,J,z]}),t})();var r=p(280);let q=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez,r.F]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez]}),t})();var f=p(4556);let I=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez,r.F,u.Bz]}),t})(),L=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez,r.F,I]}),t})(),Q=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez,f.N,r.F]}),t})();const N=[{path:"",component:S}];let j=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[o.ez,u.Bz.forChild(N),q,O,f.N,r.F,L,Q]}),t})()}}]);