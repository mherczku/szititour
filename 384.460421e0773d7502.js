"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[384],{8384:(P,g,p)=>{p.r(g),p.d(g,{GamesModule:()=>U});var l=p(6895),c=p(5079),d=(()=>{return(t=d||(d={}))[t.teams=0]="teams",t[t.places=1]="places",d;var t})(),e=p(8256),h=p(2340),_=p(529);let v=(()=>{class t{constructor(a){this.http=a,this.baseUrl=h.N.apiBaseUrl}getAllGames(){return this.http.get(`${this.baseUrl}/games`)}}return t.\u0275fac=function(a){return new(a||t)(e.LFG(_.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var r=p(9009);let C=(()=>{class t{constructor(){this.game={applications:["t1","t2"],dateEnd:"2020.10.10",dateStart:"2020.10.10",id:0,img:"assets/img/sample.jpg",places:[],title:"SampleTitle"},this.onEditClicked=new e.vpe,this.onTeamsClicked=new e.vpe,this.onPlacesClicked=new e.vpe,this.ButtonType=c.L}ngOnInit(){}getAcceptedApplicationsLength(){}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-gamecard"]],inputs:{game:"game"},outputs:{onEditClicked:"onEditClicked",onTeamsClicked:"onTeamsClicked",onPlacesClicked:"onPlacesClicked"},decls:16,vars:15,consts:[[1,"relative","rounded","hover:scale-105","duration-300","shadow-2xl","h-full"],[1,"flex","flex-col","h-full"],["alt","Game's image",1,"aspect-video","object-cover","rounded-t",3,"src"],[1,"p-3"],[1,"flex","flex-row","gap-3"],[1,"font-bold","text-size-base"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg",3,"type","click"],[1,"text-size-min"],[1,"flex-grow"],[1,"flex","flex-row","w-full","border-t-1"],["classes","border-r-1","iconSrc","assets/svg/map.svg",3,"text","type","click"],["iconSrc","assets/svg/team2.svg",3,"text","type","click"]],template:function(a,s){1&a&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"img",2),e.TgZ(3,"div",3)(4,"div",4)(5,"p",5),e._uU(6),e.qZA(),e.TgZ(7,"app-buttons",6),e.NdJ("click",function(){return s.onEditClicked.emit()}),e.qZA()(),e.TgZ(8,"p",7),e._uU(9),e.ALo(10,"date"),e.ALo(11,"date"),e.qZA()(),e._UZ(12,"div",8),e.TgZ(13,"div",9)(14,"app-buttons",10),e.NdJ("click",function(){return s.onPlacesClicked.emit()}),e.qZA(),e.TgZ(15,"app-buttons",11),e.NdJ("click",function(){return s.onTeamsClicked.emit()}),e.qZA()()()()),2&a&&(e.xp6(2),e.s9C("src",s.game.img,e.LSH),e.xp6(4),e.Oqu(s.game.title?s.game.title:"No title"),e.xp6(1),e.Q6J("type",s.ButtonType.iconButton),e.xp6(2),e.AsE("",e.xi3(10,9,s.game.dateStart,"short")," - ",e.xi3(11,12,s.game.dateEnd,"short"),""),e.xp6(5),e.MGl("text","",s.game.places.length," Helysz\xedn"),e.Q6J("type",s.ButtonType.iconBlueHover),e.xp6(1),e.MGl("text","",s.game.applications.length," Csapat"),e.Q6J("type",s.ButtonType.iconBlueHover))},dependencies:[r.O,l.uU],styles:[".gif[_ngcontent-%COMP%]{background-image:url(/assets/gif/map.gif)}"]}),t})();const y=["modalContent"],T=["*"];let x=(()=>{class t{constructor(){this.displayedClassName="",this.isDisplayed=!1,this.classes="",this.isDisplayedChange=new e.vpe}ngOnInit(){}clickInside(a){this.modal.nativeElement.contains(a.target)||(this.isDisplayedChange.emit(!1),this.isDisplayed=!1)}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-modal"]],viewQuery:function(a,s){if(1&a&&e.Gf(y,5),2&a){let i;e.iGM(i=e.CRH())&&(s.modal=i.first)}},hostBindings:function(a,s){1&a&&e.NdJ("click",function(o){return s.clickInside(o)})},inputs:{displayedClassName:"displayedClassName",isDisplayed:"isDisplayed",classes:"classes"},outputs:{isDisplayedChange:"isDisplayedChange"},ngContentSelectors:T,decls:4,vars:4,consts:[[1,"modal",3,"ngClass"],["modalContent",""]],template:function(a,s){1&a&&(e.F$t(),e.TgZ(0,"div",0)(1,"div",null,1),e.Hsn(3),e.qZA()()),2&a&&(e.Q6J("ngClass",s.isDisplayed?"flex":"hidden"),e.xp6(1),e.Gre("modal-content ",s.classes,""))},dependencies:[l.mk],styles:[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;align-items:center;width:100%;height:100%;overflow:unset;background-color:#000;background-color:#0006}.modal-content[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;margin:auto;border-radius:10px;max-width:80%;max-height:80%}"]}),t})();var u=p(3904);function b(t,n){if(1&t&&(e.TgZ(0,"app-buttons",9),e.NdJ("click",function(s){return s.stopPropagation()}),e.qZA()),2&t){const a=e.oxw();e.Q6J("type",a.ButtonType.iconButton)}}function w(t,n){if(1&t&&(e.TgZ(0,"div",15)(1,"div",16)(2,"p",4),e._uU(3),e.qZA(),e.TgZ(4,"p",12),e._uU(5),e.qZA()()()),2&t){const a=n.$implicit,s=e.oxw(2);e.xp6(3),e.hij("K\xe9rd\xe9s ",s.place.questions.indexOf(a)+1,": "),e.xp6(2),e.hij("",a.name," ")}}function Z(t,n){if(1&t&&(e.TgZ(0,"div",10)(1,"div",11)(2,"p",4),e._uU(3,"C\xedme: "),e.qZA(),e.TgZ(4,"p",12),e._uU(5),e.qZA()(),e._UZ(6,"img",13),e.YNc(7,w,6,2,"div",14),e.qZA()),2&t){const a=e.oxw();e.xp6(5),e.Oqu(a.place.address),e.xp6(1),e.s9C("alt",a.place.name),e.xp6(1),e.Q6J("ngForOf",a.place.questions)}}let M=(()=>{class t{constructor(){this.place={id:-1,name:"TestPlace",img:"",gameId:-1,address:"",latitude:"",longitude:"",questions:[]},this.open=!1,this.ButtonType=c.L}ngOnInit(){}toggle(a){this.open=!this.open,a.stopPropagation()}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-dropdown"]],inputs:{place:"place"},decls:10,vars:6,consts:[[1,"p-5","mobile:px-3","w-full","hover:border-amber-600","rounded","border-1","border-transparent","shadow","mb-1",3,"click"],[1,"flex","w-full","justify-between","items-center"],[1,"flex","w-fit","gap-[10%]","items-center"],["src","assets/img/sample.jpg",1,"max-w-[30%]","aspect-video","rounded","object-cover","max-h-[50px]",3,"alt"],[1,"text-size-base","font-bold"],["classes","min-w-[18px]","routerLink","/admin-place/1","iconSrc","assets/svg/edit.svg",3,"type","click",4,"ngIf"],["src","assets/svg/anchor-down-black.svg","alt","Dropdown",1,"cursor-pointer",3,"ngClass"],[1,"transition-all",3,"ngClass","click"],["class","flex flex-col gap-4",4,"ngIf"],["classes","min-w-[18px]","routerLink","/admin-place/1","iconSrc","assets/svg/edit.svg",3,"type","click"],[1,"flex","flex-col","gap-4"],[1,"flex","gap-2","mobile:flex-col"],[1,"text-size-base"],["src","assets/img/sample.jpg",1,"object-contain","max-h-[300px]","aspect-video",3,"alt"],["class","flex flex-col gap-3",4,"ngFor","ngForOf"],[1,"flex","flex-col","gap-3"],[1,"flex","gap-1","mobile:flex-col"]],template:function(a,s){1&a&&(e.TgZ(0,"div",0),e.NdJ("click",function(o){return s.toggle(o)}),e.TgZ(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"p",4),e._uU(5),e.qZA(),e.YNc(6,b,1,1,"app-buttons",5),e.qZA(),e._UZ(7,"img",6),e.qZA(),e.TgZ(8,"div",7),e.NdJ("click",function(o){return o.stopPropagation()}),e.YNc(9,Z,8,3,"div",8),e.qZA()()),2&a&&(e.xp6(3),e.s9C("alt",s.place.name),e.xp6(2),e.Oqu(s.place.name),e.xp6(1),e.Q6J("ngIf",s.open),e.xp6(1),e.Q6J("ngClass",s.open?"rotate-180":""),e.xp6(1),e.Q6J("ngClass",s.open?"h-fit mt-5":"h-0"),e.xp6(1),e.Q6J("ngIf",s.open))},dependencies:[l.mk,l.sg,l.O5,r.O,u.rH]}),t})();const E=function(t,n){return[t,n]};function k(t,n){if(1&t&&(e.TgZ(0,"div",6)(1,"div",7),e._UZ(2,"img",8),e.TgZ(3,"p",9),e._uU(4),e.qZA()(),e.TgZ(5,"div",10),e._UZ(6,"app-buttons",11)(7,"app-buttons",12),e.qZA()()),2&t){const a=n.$implicit,s=e.oxw(2);e.Q6J("ngClass",e.WLB(7,E,!0===a.admin?"bg-green-200":"",!1===a.admin?"bg-red-200":"")),e.xp6(2),e.s9C("alt",a.name),e.xp6(2),e.Oqu(a.name),e.xp6(2),e.Q6J("ngClass",!1!==a.admin?"":"invisible")("type",s.ButtonType.iconButton),e.xp6(1),e.Q6J("ngClass",!0!==a.admin?"":"invisible")("type",s.ButtonType.iconButton)}}function A(t,n){if(1&t&&(e.TgZ(0,"div",2)(1,"p",3),e._uU(2,"Csapatok"),e.qZA(),e.TgZ(3,"div",4),e.YNc(4,k,8,10,"div",5),e.qZA()()),2&t){const a=e.oxw();e.xp6(4),e.Q6J("ngForOf",a.teams)}}function G(t,n){1&t&&e._UZ(0,"app-dropdown",16),2&t&&e.Q6J("place",n.$implicit)}function J(t,n){if(1&t&&(e.TgZ(0,"div",13)(1,"p",3),e._uU(2,"Helysz\xednek"),e.qZA(),e.TgZ(3,"div",14),e.YNc(4,G,1,1,"app-dropdown",15),e.qZA()()),2&t){const a=e.oxw();e.xp6(4),e.Q6J("ngForOf",a.places)}}let D=(()=>{class t{constructor(){this.type=d.teams,this.teams=[{id:0,name:"Team0",email:"",admin:!1},{id:1,name:"Team1",email:"",admin:!1},{id:2,name:"Team2",email:"",admin:!1},{id:3,name:"Team3",email:"",admin:!1},{id:4,name:"Team4",email:"",admin:!1},{id:5,name:"Team5",email:"",admin:!1}],this.places=[{id:0,name:"Place1",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0},{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:1}]},{id:0,name:"Place2",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0}]},{id:0,name:"Place3",img:"",gameId:-1,address:"Budapest Test Address street 1",latitude:"12,123",longitude:"123.12312",questions:[{name:"Mi ez?",placeId:1,type:1,isRiddle:!1,id:0}]}],this.ButtonType=c.L,this.ListType=d}ngOnInit(){}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-lists"]],inputs:{type:"type",teams:"teams",places:"places"},decls:2,vars:2,consts:[["class","flex flex-col gap-3 relative bg-white p-5 rounded shadow w-full max-h-[80vh]",4,"ngIf"],["class","flex flex-col gap-3 relative bg-white p-5 h-[80vh] h-full rounded shadow w-full",4,"ngIf"],[1,"flex","flex-col","gap-3","relative","bg-white","p-5","rounded","shadow","w-full","max-h-[80vh]"],[1,"text-size-lg","text-center","w-full","font-bold","mb-6"],[1,"overflow-y-auto","h-fit"],["class","flex justify-between mobile:flex-col gap-10 p-5 pr-10 hover:border-amber-600 rounded border-1 border-transparent shadow items-center",3,"ngClass",4,"ngFor","ngForOf"],[1,"flex","justify-between","mobile:flex-col","gap-10","p-5","pr-10","hover:border-amber-600","rounded","border-1","border-transparent","shadow","items-center",3,"ngClass"],[1,"flex","w-fit","gap-[10%]","items-center"],["src","assets/img/team-placeholder.jpg",1,"max-w-[50px]","aspect-square","rounded-[100%]","object-cover","max-h-[50px]",3,"alt"],[1,"text-size-base","font-bold"],[1,"flex","h-full","w-fit","gap-[10%]","items-center"],["classes","w-[3rem] hover:opacity-70 rotate-y-180","iconSrc","assets/svg/bear-red.svg",3,"ngClass","type"],["classes","w-[3rem] hover:opacity-70 ","iconSrc","assets/svg/bear-green.svg",3,"ngClass","type"],[1,"flex","flex-col","gap-3","relative","bg-white","p-5","h-[80vh]","h-full","rounded","shadow","w-full"],[1,"h-fit","overflow-y-auto"],[3,"place",4,"ngFor","ngForOf"],[3,"place"]],template:function(a,s){1&a&&(e.YNc(0,A,5,1,"div",0),e.YNc(1,J,5,1,"div",1)),2&a&&(e.Q6J("ngIf",s.type===s.ListType.teams),e.xp6(1),e.Q6J("ngIf",s.type===s.ListType.places))},dependencies:[l.mk,l.sg,l.O5,r.O,M],styles:["[_nghost-%COMP%]{width:100%}"]}),t})();var B=p(3952);let S=(()=>{class t{constructor(){this.ButtonType=c.L,this.isEdit=!0,this.game={applications:[],dateEnd:"",dateStart:"",id:0,img:"",places:[],title:"Alma"},this.title=this.isEdit?this.game.title+" szerkeszt\xe9se":"\xdaj j\xe1t\xe9k l\xe9trehoz\xe1sa"}ngOnInit(){}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-edit-game"]],inputs:{isEdit:"isEdit",game:"game"},decls:9,vars:6,consts:[[1,"relative","bg-white","p-5","rounded","overflow-y-auto","max-h-[80vh]"],[1,"text-size-h3","text-center","w-full","font-bold","mb-6"],["classes","mb-4","label","Neve",3,"value","valueChange"],["classes","mb-4","label","Kezd\xe9s d\xe1tuma",3,"value","valueChange"],["classes","mb-4","label","Befejez\xe9s d\xe1tuma",3,"value","valueChange"],[1,"w-full","flex","justify-between"],["text","Vissza",3,"type"],["text","Ment\xe9s",3,"type"]],template:function(a,s){1&a&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2),e.qZA(),e.TgZ(3,"app-text-input",2),e.NdJ("valueChange",function(o){return s.game.title=o}),e.qZA(),e.TgZ(4,"app-text-input",3),e.NdJ("valueChange",function(o){return s.game.dateStart=o}),e.qZA(),e.TgZ(5,"app-text-input",4),e.NdJ("valueChange",function(o){return s.game.dateEnd=o}),e.qZA(),e.TgZ(6,"div",5),e._UZ(7,"app-buttons",6)(8,"app-buttons",7),e.qZA()()),2&a&&(e.xp6(2),e.Oqu(s.isEdit?s.game.title+" szerkeszt\xe9se":"\xdaj j\xe1t\xe9k l\xe9trehoz\xe1sa"),e.xp6(1),e.Q6J("value",s.game.title),e.xp6(1),e.Q6J("value",s.game.dateStart),e.xp6(1),e.Q6J("value",s.game.dateEnd),e.xp6(2),e.Q6J("type",s.ButtonType.simple),e.xp6(1),e.Q6J("type",s.ButtonType.simple))},dependencies:[B.t,r.O]}),t})();function z(t,n){if(1&t){const a=e.EpF();e.TgZ(0,"app-gamecard",9),e.NdJ("onPlacesClicked",function(){e.CHM(a);const i=e.oxw();return e.KtG(i.changeModal(i.PLACES))})("onTeamsClicked",function(){e.CHM(a);const i=e.oxw();return e.KtG(i.changeModal(i.TEAMS))})("onEditClicked",function(){const o=e.CHM(a).$implicit,j=e.oxw();return e.KtG(j.editGame(o))}),e.qZA()}2&t&&e.Q6J("game",n.$implicit)}let q=(()=>{class t{constructor(a){this.adminService=a,this.ButtonType=c.L,this.ListType=d,this.games=[],this.EDIT="EDIT",this.TEAMS="TEAMS",this.PLACES="PLACES",this.editModalVisible=!1,this.teamsModalVisible=!1,this.placesModalVisible=!1,this.selectedGame={applications:[],dateEnd:"",dateStart:"",id:0,places:[],title:""},this.isGameEditing=!1}ngOnInit(){this.adminService.getAllGames().subscribe(a=>{this.games=a})}editGame(a){this.selectedGame=a,this.isGameEditing=!0,this.changeModal(this.EDIT)}openNewGameDialog(){this.selectedGame={applications:[],dateEnd:"",dateStart:"",id:0,places:[],title:""},this.isGameEditing=!1,this.changeModal(this.EDIT)}changeModal(a){switch(this.editModalVisible=!1,this.teamsModalVisible=!1,this.placesModalVisible=!1,a){case this.EDIT:this.editModalVisible=!0;break;case this.TEAMS:this.teamsModalVisible=!0;break;case this.PLACES:this.placesModalVisible=!0}}}return t.\u0275fac=function(a){return new(a||t)(e.Y36(v))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-games"]],decls:11,vars:8,consts:[[1,"relative","p-10","bg-smoke","mobile:p-5"],[1,"grid","grid-cols-4","tablet:grid-cols-2","gap-6","mobile:grid-cols-1","relative"],[1,"fixed","z-10","w-[3rem]","h-[3rem]","text-size-base","right-20","bottom-20"],["classes","hover:scale-110 active:opacity-70 transition","iconSrc","assets/svg/add.svg",3,"type","onClicked"],[3,"game","onPlacesClicked","onTeamsClicked","onEditClicked",4,"ngFor","ngForOf"],[3,"isDisplayed","isDisplayedChange"],[3,"isEdit","game"],["classes","w-full",3,"isDisplayed","isDisplayedChange"],[3,"type"],[3,"game","onPlacesClicked","onTeamsClicked","onEditClicked"]],template:function(a,s){1&a&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"app-buttons",3),e.NdJ("onClicked",function(){return s.openNewGameDialog()}),e.qZA()(),e.YNc(4,z,1,1,"app-gamecard",4),e.qZA()(),e.TgZ(5,"app-modal",5),e.NdJ("isDisplayedChange",function(o){return s.editModalVisible=o}),e._UZ(6,"app-edit-game",6),e.qZA(),e.TgZ(7,"app-modal",7),e.NdJ("isDisplayedChange",function(o){return s.teamsModalVisible=o}),e._UZ(8,"app-lists"),e.qZA(),e.TgZ(9,"app-modal",7),e.NdJ("isDisplayedChange",function(o){return s.placesModalVisible=o}),e._UZ(10,"app-lists",8),e.qZA()),2&a&&(e.xp6(3),e.Q6J("type",s.ButtonType.iconButton),e.xp6(1),e.Q6J("ngForOf",s.games),e.xp6(1),e.Q6J("isDisplayed",s.editModalVisible),e.xp6(1),e.Q6J("isEdit",s.isGameEditing)("game",s.selectedGame),e.xp6(1),e.Q6J("isDisplayed",s.teamsModalVisible),e.xp6(2),e.Q6J("isDisplayed",s.placesModalVisible),e.xp6(1),e.Q6J("type",s.ListType.places))},dependencies:[l.sg,C,x,r.O,D,S]}),t})();var m=p(280);let N=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,m.F]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez]}),t})();var f=p(4556);let Q=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,m.F,u.Bz]}),t})(),L=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,m.F,Q]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,f.N,m.F]}),t})();const I=[{path:"",component:q}];let U=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,u.Bz.forChild(I),N,F,f.N,m.F,L,O]}),t})()}}]);