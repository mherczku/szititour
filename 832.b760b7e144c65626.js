"use strict";(self.webpackChunkszititour=self.webpackChunkszititour||[]).push([[832],{3952:($,M,l)=>{l.d(M,{t:()=>K});var o=l(8256),f=l(5079),F=l(8122),y=l(6895),b=l(433),g=l(9009);function x(d,_){if(1&d){const a=o.EpF();o.TgZ(0,"div")(1,"label",2),o._uU(2),o.qZA(),o.TgZ(3,"input",3),o.NdJ("ngModelChange",function(v){o.CHM(a);const O=o.oxw();return o.KtG(O.valueChange.emit(v))}),o.qZA()()}if(2&d){const a=o.oxw();o.Gre("relative flex flex-col gap-2 ",a.classes,""),o.xp6(2),o.Oqu(a.label),o.xp6(1),o.Q6J("ngModel",a.value)("type",a.inputType)("placeholder",a.placeholder)}}function S(d,_){if(1&d){const a=o.EpF();o.TgZ(0,"input",3),o.NdJ("ngModelChange",function(v){o.CHM(a);const O=o.oxw(2);return o.KtG(O.valueChange.emit(v))}),o.qZA()}if(2&d){const a=o.oxw(2);o.Q6J("ngModel",a.value)("type",a.inputType)("placeholder",a.placeholder)}}function J(d,_){if(1&d&&(o.TgZ(0,"p",7),o._uU(1),o.qZA()),2&d){const a=o.oxw(2);o.xp6(1),o.Oqu(a.value)}}function Z(d,_){if(1&d){const a=o.EpF();o.TgZ(0,"div")(1,"label",2),o._uU(2),o.qZA(),o.YNc(3,S,1,3,"input",4),o.YNc(4,J,2,1,"p",5),o.TgZ(5,"app-buttons",6),o.NdJ("onClicked",function(){o.CHM(a);const v=o.oxw();return o.KtG(v.editing=!v.editing)}),o.qZA()()}if(2&d){const a=o.oxw();o.Gre("relative place-items-center flex gap-3 ",a.classes,""),o.xp6(2),o.Oqu(a.label),o.xp6(1),o.Q6J("ngIf",a.editing),o.xp6(1),o.Q6J("ngIf",!a.editing),o.xp6(1),o.Q6J("type",a.ButtonType.iconButton)}}let K=(()=>{class d{constructor(){this.placeholder="Ide \xedrhatsz",this.label="Label:",this.classes="",this.password=!1,this.type=F.L.label,this.value="",this.valueChange=new o.vpe,this.inputType="text",this.editing=!1,this.TextInputType=F.L,this.ButtonType=f.L}ngOnInit(){this.password&&(this.inputType="password")}}return d.\u0275fac=function(a){return new(a||d)},d.\u0275cmp=o.Xpm({type:d,selectors:[["app-text-input"]],inputs:{placeholder:"placeholder",label:"label",classes:"classes",password:"password",type:"type",value:"value"},outputs:{valueChange:"valueChange"},decls:3,vars:3,consts:[[3,"ngSwitch"],[3,"class",4,"ngSwitchCase"],[1,"text-size-base"],[1,"neumorphism-2","border-1","focus:border-green-500","hover:border-green-500","bg-transparent","text-size-base","outline-0","w-full",3,"ngModel","type","placeholder","ngModelChange"],["class","neumorphism-2 border-1 focus:border-green-500 hover:border-green-500 bg-transparent text-size-base outline-0 w-full",3,"ngModel","type","placeholder","ngModelChange",4,"ngIf"],["class","text-size-base w-full",4,"ngIf"],["classes","min-w-[20px]","iconSrc","assets/svg/edit.svg",3,"type","onClicked"],[1,"text-size-base","w-full"]],template:function(a,c){1&a&&(o.TgZ(0,"div",0),o.YNc(1,x,4,7,"div",1),o.YNc(2,Z,6,7,"div",1),o.qZA()),2&a&&(o.Q6J("ngSwitch",c.type),o.xp6(1),o.Q6J("ngSwitchCase",c.TextInputType.label),o.xp6(1),o.Q6J("ngSwitchCase",c.TextInputType.editableP))},dependencies:[y.O5,y.RF,y.n9,b.Fj,b.JJ,b.On,g.O]}),d})()},4556:($,M,l)=>{l.d(M,{N:()=>b});var o=l(6895),f=l(433),F=l(280),y=l(8256);let b=(()=>{class g{}return g.\u0275fac=function(S){return new(S||g)},g.\u0275mod=y.oAB({type:g}),g.\u0275inj=y.cJS({imports:[o.ez,f.u5,F.F]}),g})()},8122:($,M,l)=>{l.d(M,{L:()=>o});var o=(()=>{return(f=o||(o={}))[f.label=0]="label",f[f.editableP=1]="editableP",o;var f})()},433:($,M,l)=>{l.d(M,{Fj:()=>P,u5:()=>An,JJ:()=>je,On:()=>ce});var o=l(8256),f=l(6895),F=l(457),y=l(9751),b=l(4742),g=l(8421),x=l(7669),S=l(5403),J=l(3268),Z=l(1810),d=l(4004);let _=(()=>{class n{constructor(e,r){this._renderer=e,this._elementRef=r,this.onChange=i=>{},this.onTouched=()=>{}}setProperty(e,r){this._renderer.setProperty(this._elementRef.nativeElement,e,r)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq))},n.\u0275dir=o.lG2({type:n}),n})(),a=(()=>{class n extends _{}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,features:[o.qOj]}),n})();const c=new o.OlP("NgValueAccessor"),bt={provide:c,useExisting:(0,o.Gpc)(()=>P),multi:!0},Et=new o.OlP("CompositionEventMode");let P=(()=>{class n extends _{constructor(e,r,i){super(e,r),this._compositionMode=i,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function Dt(){const n=(0,f.q)()?(0,f.q)().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}())}writeValue(e){this.setProperty("value",e??"")}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq),o.Y36(Et,8))},n.\u0275dir=o.lG2({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(e,r){1&e&&o.NdJ("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},features:[o._Bn([bt]),o.qOj]}),n})();const h=new o.OlP("NgValidators"),V=new o.OlP("NgAsyncValidators");function Oe(n){return null!=n}function we(n){return(0,o.QGY)(n)?(0,F.D)(n):n}function Ne(n){let t={};return n.forEach(e=>{t=null!=e?{...t,...e}:t}),0===Object.keys(t).length?null:t}function xe(n,t){return t.map(e=>e(n))}function Se(n){return n.map(t=>function wt(n){return!n.validate}(t)?t:e=>t.validate(e))}function Q(n){return null!=n?function Ge(n){if(!n)return null;const t=n.filter(Oe);return 0==t.length?null:function(e){return Ne(xe(e,t))}}(Se(n)):null}function X(n){return null!=n?function Be(n){if(!n)return null;const t=n.filter(Oe);return 0==t.length?null:function(e){return function K(...n){const t=(0,x.jO)(n),{args:e,keys:r}=(0,b.D)(n),i=new y.y(s=>{const{length:u}=e;if(!u)return void s.complete();const m=new Array(u);let E=u,N=u;for(let z=0;z<u;z++){let ye=!1;(0,g.Xf)(e[z]).subscribe((0,S.x)(s,bn=>{ye||(ye=!0,N--),m[z]=bn},()=>E--,void 0,()=>{(!E||!ye)&&(N||s.next(r?(0,Z.n)(r,m):m),s.complete())}))}});return t?i.pipe((0,J.Z)(t)):i}(xe(e,t).map(we)).pipe((0,d.U)(Ne))}}(Se(n)):null}function Te(n,t){return null===n?[t]:Array.isArray(n)?[...n,t]:[n,t]}function ee(n){return n?Array.isArray(n)?n:[n]:[]}function k(n,t){return Array.isArray(n)?n.includes(t):n===t}function Re(n,t){const e=ee(t);return ee(n).forEach(i=>{k(e,i)||e.push(i)}),e}function ke(n,t){return ee(t).filter(e=>!k(n,e))}class He{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Q(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=X(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}class p extends He{get formDirective(){return null}get path(){return null}}class A extends He{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}let je=(()=>{class n extends class Ue{constructor(t){this._cd=t}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}{constructor(e){super(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(A,2))},n.\u0275dir=o.lG2({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(e,r){2&e&&o.ekj("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},features:[o.qOj]}),n})();const G="VALID",U="INVALID",w="PENDING",B="DISABLED";function qe(n){return Array.isArray(n)?Q(n):n||null}function We(n){return Array.isArray(n)?X(n):n||null}function j(n){return null!=n&&!Array.isArray(n)&&"object"==typeof n}function T(n,t){(function ae(n,t){const e=function Ie(n){return n._rawValidators}(n);null!==t.validator?n.setValidators(Te(e,t.validator)):"function"==typeof e&&n.setValidators([e]);const r=function Pe(n){return n._rawAsyncValidators}(n);null!==t.asyncValidator?n.setAsyncValidators(Te(r,t.asyncValidator)):"function"==typeof r&&n.setAsyncValidators([r]);const i=()=>n.updateValueAndValidity();W(t._rawValidators,i),W(t._rawAsyncValidators,i)})(n,t),t.valueAccessor.writeValue(n.value),n.disabled&&t.valueAccessor.setDisabledState?.(!0),function kt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,"change"===n.updateOn&&Je(n,t)})}(n,t),function Ut(n,t){const e=(r,i)=>{t.valueAccessor.writeValue(r),i&&t.viewToModelUpdate(r)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}(n,t),function Ht(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,"blur"===n.updateOn&&n._pendingChange&&Je(n,t),"submit"!==n.updateOn&&n.markAsTouched()})}(n,t),function Rt(n,t){if(t.valueAccessor.setDisabledState){const e=r=>{t.valueAccessor.setDisabledState(r)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}(n,t)}function W(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function Je(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function Xe(n,t){const e=n.indexOf(t);e>-1&&n.splice(e,1)}function et(n){return"object"==typeof n&&null!==n&&2===Object.keys(n).length&&"value"in n&&"disabled"in n}const Jt={provide:A,useExisting:(0,o.Gpc)(()=>ce)},ot=(()=>Promise.resolve())();let ce=(()=>{class n extends A{constructor(e,r,i,s,u){super(),this._changeDetectorRef=u,this.control=new class extends class $e{constructor(t,e){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._rawValidators=t,this._rawAsyncValidators=e,this._composedValidatorFn=qe(this._rawValidators),this._composedAsyncValidatorFn=We(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===G}get invalid(){return this.status===U}get pending(){return this.status==w}get disabled(){return this.status===B}get enabled(){return this.status!==B}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._rawValidators=t,this._composedValidatorFn=qe(t)}setAsyncValidators(t){this._rawAsyncValidators=t,this._composedAsyncValidatorFn=We(t)}addValidators(t){this.setValidators(Re(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(Re(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(ke(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(ke(t,this._rawAsyncValidators))}hasValidator(t){return k(this._rawValidators,t)}hasAsyncValidator(t){return k(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(e=>{e.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(e=>{e.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=w,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=B,this.errors=null,this._forEachChild(r=>{r.disable({...t,onlySelf:!0})}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=G,this._forEachChild(r=>{r.enable({...t,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===G||this.status===w)&&this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?B:G}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=w,this._hasOwnPendingAsyncValidator=!0;const e=we(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(r=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(r,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){let e=t;return null==e||(Array.isArray(e)||(e=e.split(".")),0===e.length)?null:e.reduce((r,i)=>r&&r._find(i),this)}getError(t,e){const r=e?this.get(e):this;return r&&r.errors?r.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new o.vpe,this.statusChanges=new o.vpe}_calculateStatus(){return this._allControlsDisabled()?B:this.errors?U:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(w)?w:this._anyControlsHaveStatus(U)?U:G}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){j(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(t){return null}}{constructor(t=null,e,r){super(function oe(n){return(j(n)?n.validators:n)||null}(e),function ie(n,t){return(j(t)?t.asyncValidators:n)||null}(r,e)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),j(e)&&(e.nonNullable||e.initialValueIsDefault)&&(this.defaultValue=et(t)?t.value:t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(r=>r(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Xe(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Xe(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){et(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}},this._registered=!1,this.update=new o.vpe,this._parent=e,this._setValidators(r),this._setAsyncValidators(i),this.valueAccessor=function ue(n,t){if(!t)return null;let e,r,i;return Array.isArray(t),t.forEach(s=>{s.constructor===P?e=s:function qt(n){return Object.getPrototypeOf(n.constructor)===a}(s)?r=s:i=s}),i||r||e||null}(0,s)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){const r=e.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),function le(n,t){if(!n.hasOwnProperty("model"))return!1;const e=n.model;return!!e.isFirstChange()||!Object.is(t,e.currentValue)}(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){T(this.control,this),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(e){ot.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){const r=e.isDisabled.currentValue,i=0!==r&&(0,o.D6c)(r);ot.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?function L(n,t){return[...t.path,n]}(e,this._parent):[e]}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(p,9),o.Y36(h,10),o.Y36(V,10),o.Y36(c,10),o.Y36(o.sBO,8))},n.\u0275dir=o.lG2({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[o._Bn([Jt]),o.qOj,o.TTD]}),n})(),st=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({}),n})(),Vn=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[st]}),n})(),An=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[Vn]}),n})()}}]);