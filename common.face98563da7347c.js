"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[592],{5192:(c,s,n)=>{function a(r,t){const o=r.ngOnDestroy;r.ngOnDestroy=function(){o&&o.call(this),console.log("autodestroy"),this[t].next(),this[t].complete()}}n.d(s,{n:()=>a})},4057:(c,s,n)=>{n.d(s,{m:()=>t});var a=n(6895),r=n(8256);class t{}t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[a.ez]})},3105:(c,s,n)=>{n.d(s,{G:()=>t});var a=n(2340),r=n(8256);class t{transform(e){if(null===e||""===e)return"";const i=localStorage.getItem("auth-token");return a.N.apiBaseUrl+"/resources/images?Authorization="+i+"&image="+e}}t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=r.Yjl({name:"imgSrc",type:t,pure:!0})},5662:(c,s,n)=>{n.d(s,{K:()=>e});var a=n(2340),r=n(7579),t=n(8256),o=n(529);class e{constructor(_){this.http=_,this.baseUrl=a.N.apiBaseUrl+"/user",this.obs=new r.x,this.i=1}getGames(){return this.http.get(`${this.baseUrl}/games`)}applyForGame(_){return this.http.post(`${this.baseUrl}/apply`,_)}cancelApplicationForGame(_){return this.http.post(`${this.baseUrl}/cancel`,_)}getCucc(){return this.obs.asObservable()}}e.\u0275fac=function(_){return new(_||e)(t.LFG(o.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}}]);