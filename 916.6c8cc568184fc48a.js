"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[916],{9916:(M,v,a)=>{a.r(v),a.d(v,{AUTH_ROUTES:()=>z});var g=a(1788),s=a(95),p=a(1993),m=a(92),e=a(9468),d=a(2646),h=a(8016),k=a(553);let b=(()=>{var i;class r{constructor(){}initGoogleSignIn(t){google.accounts.id.initialize({client_id:k.N.googleClientId,callback:t.bind(t),auto_select:!1,cancel_on_tap_outside:!0})}renderButton(t){google.accounts.id.renderButton(document.getElementById(t),{theme:"outline",size:"large",width:"100%",text:"continue_with"})}promtSignIn(){google.accounts.id.prompt(t=>{})}fullCycle(t,n){this.initGoogleSignIn(n),this.renderButton(t),this.promtSignIn()}}return(i=r).\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),r})(),_=(()=>{var i;class r{constructor(t,n,c,l,o,f){this.alertService=t,this.authService=n,this.router=c,this.fb=l,this.destroyRef=o,this.googleSignInService=f,this.registerForm=this.fb.group({name:["",[s.kI.required]],email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required]],confirmPassword:["",[s.kI.required,i=>{const r=i.parent?.get("password")?.value;return r===i.value?null:{notSame:!0}}]]})}ngOnInit(){this.googleSignInService.fullCycle("google-button2",t=>{this.handleCredentialResponse(t)})}handleCredentialResponse(t){this.authService.continueWithGoogle(t.credential).pipe((0,p.sL)(this.destroyRef)).subscribe()}register(){this.subscriptionRegister=this.authService.register({email:this.registerForm.value.email,password:this.registerForm.value.password,name:this.registerForm.value.name}).pipe((0,p.sL)(this.destroyRef)).subscribe(n=>{n.success?(this.alertService.success("Sikeres regisztr\xe1ci\xf3, email elk\xfcldve!"),this.registerForm.reset(),this.router.navigateByUrl(m.x.auth.login.call)):this.alertService.error("Hiba t\xf6rt\xe9nt: "+n.errorMessage)}),this.registerForm.reset()}ngOnDestroy(){this.subscriptionRegister?.unsubscribe()}}return(i=r).\u0275fac=function(t){return new(t||i)(e.Y36(d.jE),e.Y36(h.e),e.Y36(g.F0),e.Y36(s.qu),e.Y36(e.ktI),e.Y36(b))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-register"]],standalone:!0,features:[e.jDz],decls:24,vars:2,consts:[[1,"relative","flex","justify-center","mt-10","p-5"],[1,"relative","flex","flex-col","neumorphism","mobile:p-5","p-10","mobile:w-full"],[1,"text-size-h1","font-bold"],["id","google-button2"],[3,"formGroup"],[1,"text-size-base","mb-2","block"],["tabindex","1","autofocus","","required","","formControlName","name","type","text","placeholder","Add a csapat nevet",1,"simpleInput","mb-5"],["tabindex","2","required","","formControlName","email","type","email","placeholder","Add meg az e-mail c\xedmed",1,"simpleInput","mb-5"],["tabindex","3","required","","formControlName","password","type","password","placeholder","Adj meg egy jelsz\xf3t",1,"simpleInput","mb-5"],["tabindex","4","required","","formControlName","confirmPassword","type","password","placeholder","Add meg m\xe9g egyszer",1,"simpleInput","mb-5"],[1,"flex","justify-between","items-center"],["title","M\xe9g nincs fi\xf3kod?","routerLink","/auth/login",1,"btn-hover-bold-textChange",3,"mouseenter","mouseleave"],["button1",""],["type","submit","tabindex","5",1,"btn-simple",3,"disabled","click"]],template:function(t,n){if(1&t){const c=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"p",2),e._uU(3,"Regisztr\xe1ci\xf3"),e.qZA(),e._UZ(4,"div",3),e.TgZ(5,"form",4)(6,"label",5),e._uU(7,"Csapat n\xe9v *"),e.qZA(),e._UZ(8,"input",6),e.TgZ(9,"label",5),e._uU(10,"E-mail *"),e.qZA(),e._UZ(11,"input",7),e.TgZ(12,"label",5),e._uU(13,"Jelsz\xf3 *"),e.qZA(),e._UZ(14,"input",8),e.TgZ(15,"label",5),e._uU(16,"Jelsz\xf3 m\xe9gegyszer *"),e.qZA(),e._UZ(17,"input",9),e.TgZ(18,"div",10)(19,"a",11,12),e.NdJ("mouseenter",function(){e.CHM(c);const o=e.MAs(20);return e.KtG(o.innerText="L\xe9pj be!")})("mouseleave",function(){e.CHM(c);const o=e.MAs(20);return e.KtG(o.innerText="M\xe1r van fi\xf3kod?")}),e._uU(21,"M\xe9g nincs fi\xf3kod?"),e.qZA(),e.TgZ(22,"button",13),e.NdJ("click",function(){return n.register()}),e._uU(23," Regisztr\xe1l\xe1s "),e.qZA()()()()()}2&t&&(e.xp6(5),e.Q6J("formGroup",n.registerForm),e.xp6(17),e.Q6J("disabled",!n.registerForm.valid))},dependencies:[s.UX,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.sg,s.u,g.rH],styles:["#google-button2[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:1rem auto}"],changeDetection:0}),r})();var x=a(5393);let S=(()=>{var i;class r{constructor(t,n,c,l,o,f){this.authService=t,this.userService=n,this.router=c,this.toastService=l,this.destroyRef=o,this.googleSignInService=f,this.email="",this.password="",this.error=""}ngOnInit(){this.googleSignInService.fullCycle("google-button",t=>{this.handleCredentialResponse(t)})}handleCredentialResponse(t){this.authService.continueWithGoogle(t.credential).pipe((0,p.sL)(this.destroyRef)).subscribe()}login(){("t"===this.email||"t@test.hu"===this.email)&&(this.email="t@test.hu",this.password="T12345678"),this.subscriptionLogin=this.authService.login(this.email,this.password).pipe(this.toastService.observe({loading:"Bejelentkez\xe9s...",success:t=>t.success?"Sikeres bejelentkez\xe9s":"Sikertelen bejelentkez\xe9s",error:t=>"Hib\xe1s email vagy jelsz\xf3"})).subscribe(t=>{t.success||(this.error=t.errorMessage)})}ngOnDestroy(){this.subscriptionLogin?.unsubscribe()}}return(i=r).\u0275fac=function(t){return new(t||i)(e.Y36(h.e),e.Y36(x.K),e.Y36(g.F0),e.Y36(d.jE),e.Y36(e.ktI),e.Y36(b))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-login"]],standalone:!0,features:[e.jDz],decls:18,vars:2,consts:[[1,"relative","flex","justify-center","mt-10","p-5"],[1,"relative","neumorphism","mobile:w-full","mobile:p-5","p-10"],[1,"text-size-h1","font-bold"],["id","google-button"],["name","login"],[1,"text-size-base","block","mb-2"],["tabindex","1","autofocus","","name","szititourLoginEmail","type","email","placeholder","E-mail c\xedm",1,"simpleInput","mb-5",3,"ngModel","ngModelChange"],["tabindex","2","name","szititourLoginPassword","type","password","placeholder","Jelsz\xf3",1,"simpleInput","mb-5",3,"ngModel","ngModelChange"],[1,"flex","justify-between","items-center"],["title","M\xe9g nincs fi\xf3kod?","routerLink","/auth/register",1,"btn-hover-bold-textChange",3,"mouseenter","mouseleave"],["button1",""],["tabindex","3",1,"btn-simple",3,"click"]],template:function(t,n){if(1&t){const c=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"p",2),e._uU(3,"Bejelentkez\xe9s"),e.qZA(),e._UZ(4,"div",3),e.TgZ(5,"form",4)(6,"label",5),e._uU(7,"E-mail"),e.qZA(),e.TgZ(8,"input",6),e.NdJ("ngModelChange",function(o){return n.email=o}),e.qZA(),e.TgZ(9,"label",5),e._uU(10,"Jelsz\xf3"),e.qZA(),e.TgZ(11,"input",7),e.NdJ("ngModelChange",function(o){return n.password=o}),e.qZA(),e.TgZ(12,"div",8)(13,"a",9,10),e.NdJ("mouseenter",function(){e.CHM(c);const o=e.MAs(14);return e.KtG(o.innerText="Regisztr\xe1lj!")})("mouseleave",function(){e.CHM(c);const o=e.MAs(14);return e.KtG(o.innerText="M\xe9g nincs fi\xf3kod?")}),e._uU(15,"M\xe9g nincs fi\xf3kod?"),e.qZA(),e.TgZ(16,"button",11),e.NdJ("click",function(){return n.login()}),e._uU(17," Bejelentkez\xe9s "),e.qZA()()()()()}2&t&&(e.xp6(8),e.Q6J("ngModel",n.email),e.xp6(3),e.Q6J("ngModel",n.password))},dependencies:[s.u5,s._Y,s.Fj,s.JJ,s.JL,s.On,s.F,g.rH],styles:["#google-button[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:1rem auto}"],changeDetection:0}),r})();var y=a(6814);function Z(i,r){1&i&&(e.TgZ(0,"div",4)(1,"div",5),e._UZ(2,"div"),e.qZA()())}const z=[{path:m.x.auth.register.path,component:_},{path:m.x.auth.login.path,component:S},{path:m.x.auth.verify.path,component:(()=>{var i;class r{constructor(t,n,c,l){this.router=t,this.route=n,this.authService=c,this.alertService=l,this.state="loading",this.token="",this.destroyRef=(0,e.f3M)(e.ktI),this.title="Fi\xf3k aktiv\xe1l\xe1sa"}ngOnInit(){this.route.params.subscribe(t=>{this.token=t.token,setTimeout(()=>{this.verifyEmail()},1e3)})}verifyEmail(){this.token&&""!==this.token?this.authService.verifyEmail(this.token).pipe((0,p.sL)(this.destroyRef)).subscribe({next:()=>{this.state="success",this.alertService.success("Sikeres verifik\xe1ci\xf3, mostm\xe1r bejelentkezhetsz!"),this.title="Sikeres aktiv\xe1l\xe1s!",this.router.navigateByUrl(m.x.auth.login.call)},error:()=>{this.state="failure",this.alertService.error("Sikertelen verifik\xe1ci\xf3!"),this.title="Fi\xf3k aktiv\xe1l\xe1s sikertelen!"}}):this.alertService.error("Nincs verifik\xe1ci\xf3s token!")}}return(i=r).\u0275fac=function(t){return new(t||i)(e.Y36(g.F0),e.Y36(g.gz),e.Y36(h.e),e.Y36(d.jE))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-verify"]],standalone:!0,features:[e.jDz],decls:5,vars:4,consts:[[1,"relative","flex","justify-center","mt-10","p-5"],[1,"relative","flex","flex-col","neumorphism","mobile:p-5","p-10","mobile:w-full"],[1,"text-size-h2","text-center","font-bold"],["class","spinner mt-10",4,"ngIf"],[1,"spinner","mt-10"],[1,"shape"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"p",2),e._uU(3),e.qZA(),e.YNc(4,Z,3,0,"div",3),e.qZA()()),2&t&&(e.xp6(1),e.ekj("success","success"===n.state),e.xp6(2),e.Oqu(n.title),e.xp6(1),e.Q6J("ngIf","loading"===n.state))},dependencies:[y.ez,y.O5],styles:[".success[_ngcontent-%COMP%]{background-color:#20c428}@keyframes _ngcontent-%COMP%_rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}.shape[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{position:absolute;animation:_ngcontent-%COMP%_rotate 1s linear infinite;width:160px;height:160px;top:20px;left:20px;border-radius:50%;box-shadow:0 4px #fc000d;transform-origin:80px 82px}.spinner[_ngcontent-%COMP%]{width:200px;height:200px;display:block;overflow:hidden;margin:auto}.shape[_ngcontent-%COMP%]{width:100%;height:100%;position:relative;transform:translateZ(0) scale(1);-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-origin:0 0}.shape[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{box-sizing:content-box}"]}),r})()},{path:"**",redirectTo:m.x.auth.login.path}]}}]);