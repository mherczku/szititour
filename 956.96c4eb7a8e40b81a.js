"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[956],{8956:(w,u,t)=>{t.r(u),t.d(u,{RegisterModule:()=>y});var p=t(6895),g=t(5079),e=t(8256),d=t(1864),m=t(9135),l=t(3904),h=t(3952),c=t(9009);let v=(()=>{class s{constructor(r,i,n){this.alertService=r,this.authService=i,this.router=n,this.ButtonType=g.L,this.email="",this.password="",this.passwordConfirm="",this.registering=!1}register(){""!==this.email&&""!==this.password?this.password===this.passwordConfirm?this.subscriptionRegister=this.authService.register(this.email,this.password).subscribe(r=>{r.success?(this.alertService.success("Successful registration, you can login now."),this.router.navigateByUrl("/login")):this.alertService.error("Something went wrong: "+r.errorMessage)}):this.alertService.warning("Password and Password Confirm are different"):this.alertService.warning("Fill in all fields")}ngOnDestroy(){this.subscriptionRegister?.unsubscribe()}}return s.\u0275fac=function(r){return new(r||s)(e.Y36(d.jE),e.Y36(m.e),e.Y36(l.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-register"]],decls:10,vars:7,consts:[[1,"relative","flex","justify-center","mt-10","p-5"],[1,"relative","neumorphism","mobile:p-5","p-10","mobile:w-full"],[1,"text-size-h1","font-bold","mb-10"],["classes","mb-5","placeholder","Add meg az e-mail c\xedmed","label","E-mail *",3,"value","valueChange"],["classes","mb-5","placeholder","Adj meg egy jelsz\xf3t","label","Jelsz\xf3 *",3,"value","password","valueChange"],["classes","mb-5","placeholder","Add meg m\xe9g egyszer","label","Jelsz\xf3 m\xe9g egyszer *",3,"value","password","valueChange"],[1,"flex","justify-between","items-center"],["routerLink","/login","classes","hover:pr-12","textHover","L\xe9pj be!","text","M\xe1r van fi\xf3kod?",3,"type"],["classes","","text","Regisztr\xe1l\xe1s",3,"isDisabledProgress","onClicked"]],template:function(r,i){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"p",2),e._uU(3,"Regisztr\xe1ci\xf3"),e.qZA(),e.TgZ(4,"app-text-input",3),e.NdJ("valueChange",function(o){return i.email=o}),e.qZA(),e.TgZ(5,"app-text-input",4),e.NdJ("valueChange",function(o){return i.password=o}),e.qZA(),e.TgZ(6,"app-text-input",5),e.NdJ("valueChange",function(o){return i.passwordConfirm=o}),e.qZA(),e.TgZ(7,"div",6),e._UZ(8,"app-buttons",7),e.TgZ(9,"app-buttons",8),e.NdJ("onClicked",function(){return i.register()}),e.qZA()()()()),2&r&&(e.xp6(4),e.Q6J("value",i.email),e.xp6(1),e.Q6J("value",i.password)("password",!0),e.xp6(1),e.Q6J("value",i.passwordConfirm)("password",!0),e.xp6(2),e.Q6J("type",i.ButtonType.hoverBoldTextChange),e.xp6(1),e.Q6J("isDisabledProgress",i.registering))},dependencies:[l.rH,h.t,c.O]}),s})();var f=t(4556),C=t(280);const b=[{path:"",component:v}];let y=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[p.ez,l.Bz.forChild(b),f.N,C.F]}),s})()}}]);