"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[592],{5192:(c,a,t)=>{function i(n,r){const o=n.ngOnDestroy;n.ngOnDestroy=function(){o&&o.call(this),console.log("autodestroy"),this[r].next(),this[r].complete()}}t.d(a,{n:()=>i})},5662:(c,a,t)=>{t.d(a,{K:()=>e});var i=t(2340),n=t(7579),r=t(8256),o=t(529);class e{constructor(s){this.http=s,this.baseUrl=i.N.apiBaseUrl+"/user",this.obs=new n.x,this.i=1}getGames(){return this.http.get(`${this.baseUrl}/games`)}applyForGame(s){return this.http.post(`${this.baseUrl}/apply`,s)}cancelApplicationForGame(s){return this.http.post(`${this.baseUrl}/cancel`,s)}getCucc(){return this.obs.asObservable()}}e.\u0275fac=function(s){return new(s||e)(r.LFG(o.eN))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}}]);