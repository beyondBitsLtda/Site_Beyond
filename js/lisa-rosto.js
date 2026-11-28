(()=>{var Nb=Object.create;var Ug=Object.defineProperty;var Lb=Object.getOwnPropertyDescriptor;var Ob=Object.getOwnPropertyNames;var Ib=Object.getPrototypeOf,Pb=Object.prototype.hasOwnProperty;var Ti=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Bb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ob(t))!Pb.call(e,a)&&a!==n&&Ug(e,a,{get:()=>t[a],enumerable:!(i=Lb(t,a))||i.enumerable});return e};var ir=(e,t,n)=>(n=e!=null?Nb(Ib(e)):{},Bb(t||!e||!e.__esModule?Ug(n,"default",{value:e,enumerable:!0}):n,e));var Gg=Ti(Ce=>{"use strict";function $f(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,a=e[i];if(0<hc(a,t))e[i]=t,e[n]=a,n=i;else break t}}function Ai(e){return e.length===0?null:e[0]}function dc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,a=e.length,s=a>>>1;i<s;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>hc(o,n))l<a&&0>hc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<a&&0>hc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function hc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ce.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Ng=performance,Ce.unstable_now=function(){return Ng.now()}):(Kf=Date,Lg=Kf.now(),Ce.unstable_now=function(){return Kf.now()-Lg});var Ng,Kf,Lg,Wi=[],Ea=[],zb=1,Kn=null,un=3,td=!1,bo=!1,Eo=!1,ed=!1,Pg=typeof setTimeout=="function"?setTimeout:null,Bg=typeof clearTimeout=="function"?clearTimeout:null,Og=typeof setImmediate<"u"?setImmediate:null;function fc(e){for(var t=Ai(Ea);t!==null;){if(t.callback===null)dc(Ea);else if(t.startTime<=e)dc(Ea),t.sortIndex=t.expirationTime,$f(Wi,t);else break;t=Ai(Ea)}}function nd(e){if(Eo=!1,fc(e),!bo)if(Ai(Wi)!==null)bo=!0,sr||(sr=!0,ar());else{var t=Ai(Ea);t!==null&&id(nd,t.startTime-e)}}var sr=!1,To=-1,zg=5,Fg=-1;function Vg(){return ed?!0:!(Ce.unstable_now()-Fg<zg)}function jf(){if(ed=!1,sr){var e=Ce.unstable_now();Fg=e;var t=!0;try{t:{bo=!1,Eo&&(Eo=!1,Bg(To),To=-1),td=!0;var n=un;try{e:{for(fc(e),Kn=Ai(Wi);Kn!==null&&!(Kn.expirationTime>e&&Vg());){var i=Kn.callback;if(typeof i=="function"){Kn.callback=null,un=Kn.priorityLevel;var a=i(Kn.expirationTime<=e);if(e=Ce.unstable_now(),typeof a=="function"){Kn.callback=a,fc(e),t=!0;break e}Kn===Ai(Wi)&&dc(Wi),fc(e)}else dc(Wi);Kn=Ai(Wi)}if(Kn!==null)t=!0;else{var s=Ai(Ea);s!==null&&id(nd,s.startTime-e),t=!1}}break t}finally{Kn=null,un=n,td=!1}t=void 0}}finally{t?ar():sr=!1}}}var ar;typeof Og=="function"?ar=function(){Og(jf)}:typeof MessageChannel<"u"?(Qf=new MessageChannel,Ig=Qf.port2,Qf.port1.onmessage=jf,ar=function(){Ig.postMessage(null)}):ar=function(){Pg(jf,0)};var Qf,Ig;function id(e,t){To=Pg(function(){e(Ce.unstable_now())},t)}Ce.unstable_IdlePriority=5;Ce.unstable_ImmediatePriority=1;Ce.unstable_LowPriority=4;Ce.unstable_NormalPriority=3;Ce.unstable_Profiling=null;Ce.unstable_UserBlockingPriority=2;Ce.unstable_cancelCallback=function(e){e.callback=null};Ce.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):zg=0<e?Math.floor(1e3/e):5};Ce.unstable_getCurrentPriorityLevel=function(){return un};Ce.unstable_next=function(e){switch(un){case 1:case 2:case 3:var t=3;break;default:t=un}var n=un;un=t;try{return e()}finally{un=n}};Ce.unstable_requestPaint=function(){ed=!0};Ce.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=un;un=e;try{return t()}finally{un=n}};Ce.unstable_scheduleCallback=function(e,t,n){var i=Ce.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:zb++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>i?(e.sortIndex=n,$f(Ea,e),Ai(Wi)===null&&e===Ai(Ea)&&(Eo?(Bg(To),To=-1):Eo=!0,id(nd,n-i))):(e.sortIndex=a,$f(Wi,e),bo||td||(bo=!0,sr||(sr=!0,ar()))),e};Ce.unstable_shouldYield=Vg;Ce.unstable_wrapCallback=function(e){var t=un;return function(){var n=un;un=t;try{return e.apply(this,arguments)}finally{un=n}}}});var kg=Ti((SR,Hg)=>{"use strict";Hg.exports=Gg()});var tv=Ti(zt=>{"use strict";var rd=Symbol.for("react.transitional.element"),Fb=Symbol.for("react.portal"),Vb=Symbol.for("react.fragment"),Gb=Symbol.for("react.strict_mode"),Hb=Symbol.for("react.profiler"),kb=Symbol.for("react.consumer"),Xb=Symbol.for("react.context"),Wb=Symbol.for("react.forward_ref"),qb=Symbol.for("react.suspense"),Yb=Symbol.for("react.memo"),Zg=Symbol.for("react.lazy"),Zb=Symbol.for("react.activity"),Xg=Symbol.iterator;function Jb(e){return e===null||typeof e!="object"?null:(e=Xg&&e[Xg]||e["@@iterator"],typeof e=="function"?e:null)}var Jg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Kg=Object.assign,jg={};function or(e,t,n){this.props=e,this.context=t,this.refs=jg,this.updater=n||Jg}or.prototype.isReactComponent={};or.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};or.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Qg(){}Qg.prototype=or.prototype;function od(e,t,n){this.props=e,this.context=t,this.refs=jg,this.updater=n||Jg}var ld=od.prototype=new Qg;ld.constructor=od;Kg(ld,or.prototype);ld.isPureReactComponent=!0;var Wg=Array.isArray;function sd(){}var Me={H:null,A:null,T:null,S:null},$g=Object.prototype.hasOwnProperty;function cd(e,t,n){var i=n.ref;return{$$typeof:rd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function Kb(e,t){return cd(e.type,t,e.props)}function ud(e){return typeof e=="object"&&e!==null&&e.$$typeof===rd}function jb(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var qg=/\/+/g;function ad(e,t){return typeof e=="object"&&e!==null&&e.key!=null?jb(""+e.key):t.toString(36)}function Qb(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(sd,sd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function rr(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case rd:case Fb:r=!0;break;case Zg:return r=e._init,rr(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+ad(e,0):i,Wg(a)?(n="",r!=null&&(n=r.replace(qg,"$&/")+"/"),rr(a,t,n,"",function(c){return c})):a!=null&&(ud(a)&&(a=Kb(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(qg,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(Wg(e))for(var l=0;l<e.length;l++)i=e[l],s=o+ad(i,l),r+=rr(i,t,n,s,a);else if(l=Jb(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+ad(i,l++),r+=rr(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return rr(Qb(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function pc(e,t,n){if(e==null)return e;var i=[],a=0;return rr(e,i,"","",function(s){return t.call(n,s,a++)}),i}function $b(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Yg=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},t1={map:pc,forEach:function(e,t,n){pc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return pc(e,function(){t++}),t},toArray:function(e){return pc(e,function(t){return t})||[]},only:function(e){if(!ud(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};zt.Activity=Zb;zt.Children=t1;zt.Component=or;zt.Fragment=Vb;zt.Profiler=Hb;zt.PureComponent=od;zt.StrictMode=Gb;zt.Suspense=qb;zt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Me;zt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Me.H.useMemoCache(e)}};zt.cache=function(e){return function(){return e.apply(null,arguments)}};zt.cacheSignal=function(){return null};zt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Kg({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!$g.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return cd(e.type,a,i)};zt.createContext=function(e){return e={$$typeof:Xb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:kb,_context:e},e};zt.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)$g.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return cd(e,s,a)};zt.createRef=function(){return{current:null}};zt.forwardRef=function(e){return{$$typeof:Wb,render:e}};zt.isValidElement=ud;zt.lazy=function(e){return{$$typeof:Zg,_payload:{_status:-1,_result:e},_init:$b}};zt.memo=function(e,t){return{$$typeof:Yb,type:e,compare:t===void 0?null:t}};zt.startTransition=function(e){var t=Me.T,n={};Me.T=n;try{var i=e(),a=Me.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(sd,Yg)}catch(s){Yg(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),Me.T=t}};zt.unstable_useCacheRefresh=function(){return Me.H.useCacheRefresh()};zt.use=function(e){return Me.H.use(e)};zt.useActionState=function(e,t,n){return Me.H.useActionState(e,t,n)};zt.useCallback=function(e,t){return Me.H.useCallback(e,t)};zt.useContext=function(e){return Me.H.useContext(e)};zt.useDebugValue=function(){};zt.useDeferredValue=function(e,t){return Me.H.useDeferredValue(e,t)};zt.useEffect=function(e,t){return Me.H.useEffect(e,t)};zt.useEffectEvent=function(e){return Me.H.useEffectEvent(e)};zt.useId=function(){return Me.H.useId()};zt.useImperativeHandle=function(e,t,n){return Me.H.useImperativeHandle(e,t,n)};zt.useInsertionEffect=function(e,t){return Me.H.useInsertionEffect(e,t)};zt.useLayoutEffect=function(e,t){return Me.H.useLayoutEffect(e,t)};zt.useMemo=function(e,t){return Me.H.useMemo(e,t)};zt.useOptimistic=function(e,t){return Me.H.useOptimistic(e,t)};zt.useReducer=function(e,t,n){return Me.H.useReducer(e,t,n)};zt.useRef=function(e){return Me.H.useRef(e)};zt.useState=function(e){return Me.H.useState(e)};zt.useSyncExternalStore=function(e,t,n){return Me.H.useSyncExternalStore(e,t,n)};zt.useTransition=function(){return Me.H.useTransition()};zt.version="19.2.8"});var mc=Ti((bR,ev)=>{"use strict";ev.exports=tv()});var iv=Ti(mn=>{"use strict";var e1=mc();function nv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ta(){}var pn={d:{f:Ta,r:function(){throw Error(nv(522))},D:Ta,C:Ta,L:Ta,m:Ta,X:Ta,S:Ta,M:Ta},p:0,findDOMNode:null},n1=Symbol.for("react.portal");function i1(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:n1,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var Ao=e1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function gc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}mn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=pn;mn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(nv(299));return i1(e,t,null,n)};mn.flushSync=function(e){var t=Ao.T,n=pn.p;try{if(Ao.T=null,pn.p=2,e)return e()}finally{Ao.T=t,pn.p=n,pn.d.f()}};mn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,pn.d.C(e,t))};mn.prefetchDNS=function(e){typeof e=="string"&&pn.d.D(e)};mn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=gc(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?pn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&pn.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};mn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=gc(t.as,t.crossOrigin);pn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&pn.d.M(e)};mn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=gc(n,t.crossOrigin);pn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};mn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=gc(t.as,t.crossOrigin);pn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else pn.d.m(e)};mn.requestFormReset=function(e){pn.d.r(e)};mn.unstable_batchedUpdates=function(e,t){return e(t)};mn.useFormState=function(e,t,n){return Ao.H.useFormState(e,t,n)};mn.useFormStatus=function(){return Ao.H.useHostTransitionStatus()};mn.version="19.2.8"});var rv=Ti((TR,sv)=>{"use strict";function av(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(av)}catch(e){console.error(e)}}av(),sv.exports=iv()});var _S=Ti(Gu=>{"use strict";var Ze=kg(),N_=mc(),a1=rv();function j(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function L_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function fl(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function O_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function I_(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ov(e){if(fl(e)!==e)throw Error(j(188))}function s1(e){var t=e.alternate;if(!t){if(t=fl(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return ov(a),e;if(s===i)return ov(a),t;s=s.sibling}throw Error(j(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(j(189))}}if(n.alternate!==i)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function P_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=P_(e),t!==null)return t;e=e.sibling}return null}var Te=Object.assign,r1=Symbol.for("react.element"),vc=Symbol.for("react.transitional.element"),Oo=Symbol.for("react.portal"),dr=Symbol.for("react.fragment"),B_=Symbol.for("react.strict_mode"),Xd=Symbol.for("react.profiler"),z_=Symbol.for("react.consumer"),$i=Symbol.for("react.context"),Fp=Symbol.for("react.forward_ref"),Wd=Symbol.for("react.suspense"),qd=Symbol.for("react.suspense_list"),Vp=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy");Symbol.for("react.scope");var Yd=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var o1=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var lv=Symbol.iterator;function wo(e){return e===null||typeof e!="object"?null:(e=lv&&e[lv]||e["@@iterator"],typeof e=="function"?e:null)}var l1=Symbol.for("react.client.reference");function Zd(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===l1?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case dr:return"Fragment";case Xd:return"Profiler";case B_:return"StrictMode";case Wd:return"Suspense";case qd:return"SuspenseList";case Yd:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Oo:return"Portal";case $i:return e.displayName||"Context";case z_:return(e._context.displayName||"Context")+".Consumer";case Fp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Vp:return t=e.displayName||null,t!==null?t:Zd(e.type)||"Memo";case Aa:t=e._payload,e=e._init;try{return Zd(e(t))}catch{}}return null}var Io=Array.isArray,Pt=N_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re=a1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ms={pending:!1,data:null,method:null,action:null},Jd=[],pr=-1;function Ui(e){return{current:e}}function $e(e){0>pr||(e.current=Jd[pr],Jd[pr]=null,pr--)}function Se(e,t){pr++,Jd[pr]=e.current,e.current=t}var Di=Ui(null),Qo=Ui(null),Ba=Ui(null),Kc=Ui(null);function jc(e,t){switch(Se(Ba,t),Se(Qo,e),Se(Di,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?m_(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=m_(t),e=aS(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$e(Di),Se(Di,e)}function Nr(){$e(Di),$e(Qo),$e(Ba)}function Kd(e){e.memoizedState!==null&&Se(Kc,e);var t=Di.current,n=aS(t,e.type);t!==n&&(Se(Qo,e),Se(Di,n))}function Qc(e){Qo.current===e&&($e(Di),$e(Qo)),Kc.current===e&&($e(Kc),cl._currentValue=Ms)}var hd,cv;function _s(e){if(hd===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);hd=t&&t[1]||"",cv=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+hd+e+cv}var fd=!1;function dd(e,t){if(!e||fd)return"";fd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(d){var u=d}Reflect.construct(e,[],p)}else{try{p.call()}catch(d){u=d}e.call(p.prototype)}}else{try{throw Error()}catch(d){u=d}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(d){if(d&&u&&typeof d.stack=="string")return[d.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var f=`
`+l[i].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=i&&0<=a);break}}}finally{fd=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?_s(n):""}function c1(e,t){switch(e.tag){case 26:case 27:case 5:return _s(e.type);case 16:return _s("Lazy");case 13:return e.child!==t&&t!==null?_s("Suspense Fallback"):_s("Suspense");case 19:return _s("SuspenseList");case 0:case 15:return dd(e.type,!1);case 11:return dd(e.type.render,!1);case 1:return dd(e.type,!0);case 31:return _s("Activity");default:return""}}function uv(e){try{var t="",n=null;do t+=c1(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var jd=Object.prototype.hasOwnProperty,Gp=Ze.unstable_scheduleCallback,pd=Ze.unstable_cancelCallback,u1=Ze.unstable_shouldYield,h1=Ze.unstable_requestPaint,Pn=Ze.unstable_now,f1=Ze.unstable_getCurrentPriorityLevel,F_=Ze.unstable_ImmediatePriority,V_=Ze.unstable_UserBlockingPriority,$c=Ze.unstable_NormalPriority,d1=Ze.unstable_LowPriority,G_=Ze.unstable_IdlePriority,p1=Ze.log,m1=Ze.unstable_setDisableYieldValue,dl=null,Bn=null;function Na(e){if(typeof p1=="function"&&m1(e),Bn&&typeof Bn.setStrictMode=="function")try{Bn.setStrictMode(dl,e)}catch{}}var zn=Math.clz32?Math.clz32:_1,g1=Math.log,v1=Math.LN2;function _1(e){return e>>>=0,e===0?32:31-(g1(e)/v1|0)|0}var _c=256,xc=262144,yc=4194304;function xs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Tu(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=xs(i):(r&=o,r!==0?a=xs(r):n||(n=o&~e,n!==0&&(a=xs(n))))):(o=i&~s,o!==0?a=xs(o):r!==0?a=xs(r):n||(n=i&~e,n!==0&&(a=xs(n)))),a===0?0:t!==0&&t!==a&&(t&s)===0&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function pl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function x1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function H_(){var e=yc;return yc<<=1,(yc&62914560)===0&&(yc=4194304),e}function md(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ml(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function y1(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var f=31-zn(n),p=1<<f;o[f]=0,l[f]=-1;var u=c[f];if(u!==null)for(c[f]=null,f=0;f<u.length;f++){var d=u[f];d!==null&&(d.lane&=-536870913)}n&=~p}i!==0&&k_(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function k_(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-zn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function X_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-zn(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function W_(e,t){var n=t&-t;return n=(n&42)!==0?1:Hp(n),(n&(e.suspendedLanes|t))!==0?0:n}function Hp(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function kp(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function q_(){var e=re.p;return e!==0?e:(e=window.event,e===void 0?32:mS(e.type))}function hv(e,t){var n=re.p;try{return re.p=e,t()}finally{re.p=n}}var Ka=Math.random().toString(36).slice(2),an="__reactFiber$"+Ka,En="__reactProps$"+Ka,kr="__reactContainer$"+Ka,Qd="__reactEvents$"+Ka,S1="__reactListeners$"+Ka,M1="__reactHandles$"+Ka,fv="__reactResources$"+Ka,gl="__reactMarker$"+Ka;function Xp(e){delete e[an],delete e[En],delete e[Qd],delete e[S1],delete e[M1]}function mr(e){var t=e[an];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kr]||n[an]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=y_(e);e!==null;){if(n=e[an])return n;e=y_(e)}return t}e=n,n=e.parentNode}return null}function Xr(e){if(e=e[an]||e[kr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Po(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(j(33))}function Tr(e){var t=e[fv];return t||(t=e[fv]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[gl]=!0}var Y_=new Set,Z_={};function Ns(e,t){Lr(e,t),Lr(e+"Capture",t)}function Lr(e,t){for(Z_[e]=t,e=0;e<t.length;e++)Y_.add(t[e])}var b1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dv={},pv={};function E1(e){return jd.call(pv,e)?!0:jd.call(dv,e)?!1:b1.test(e)?pv[e]=!0:(dv[e]=!0,!1)}function Ic(e,t,n){if(E1(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Sc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function qi(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function J_(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function T1(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $d(e){if(!e._valueTracker){var t=J_(e)?"checked":"value";e._valueTracker=T1(e,t,""+e[t])}}function K_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=J_(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function tu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var A1=/[\n"\\]/g;function ei(e){return e.replace(A1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function tp(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Qn(t)):e.value!==""+Qn(t)&&(e.value=""+Qn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?ep(e,r,Qn(t)):n!=null?ep(e,r,Qn(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Qn(o):e.removeAttribute("name")}function j_(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){$d(e);return}n=n!=null?""+Qn(n):"",t=t!=null?""+Qn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),$d(e)}function ep(e,t,n){t==="number"&&tu(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Ar(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Qn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Q_(e,t,n){if(t!=null&&(t=""+Qn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Qn(n):""}function $_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(j(92));if(Io(i)){if(1<i.length)throw Error(j(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Qn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),$d(e)}function Or(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var w1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mv(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||w1.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function tx(e,t,n){if(t!=null&&typeof t!="object")throw Error(j(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&mv(e,a,i)}else for(var s in t)t.hasOwnProperty(s)&&mv(e,s,t[s])}function Wp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var C1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),R1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Pc(e){return R1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ta(){}var np=null;function qp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var gr=null,wr=null;function gv(e){var t=Xr(e);if(t&&(e=t.stateNode)){var n=e[En]||null;t:switch(e=t.stateNode,t.type){case"input":if(tp(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ei(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[En]||null;if(!a)throw Error(j(90));tp(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&K_(i)}break t;case"textarea":Q_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Ar(e,!!n.multiple,t,!1)}}}var gd=!1;function ex(e,t,n){if(gd)return e(t,n);gd=!0;try{var i=e(t);return i}finally{if(gd=!1,(gr!==null||wr!==null)&&(Bu(),gr&&(t=gr,e=wr,wr=gr=null,gv(t),e)))for(t=0;t<e.length;t++)gv(e[t])}}function $o(e,t){var n=e.stateNode;if(n===null)return null;var i=n[En]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var sa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ip=!1;if(sa)try{lr={},Object.defineProperty(lr,"passive",{get:function(){ip=!0}}),window.addEventListener("test",lr,lr),window.removeEventListener("test",lr,lr)}catch{ip=!1}var lr,La=null,Yp=null,Bc=null;function nx(){if(Bc)return Bc;var e,t=Yp,n=t.length,i,a="value"in La?La.value:La.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return Bc=a.slice(e,1<i?1-i:void 0)}function zc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Mc(){return!0}function vv(){return!1}function Tn(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Mc:vv,this.isPropagationStopped=vv,this}return Te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Mc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Mc)},persist:function(){},isPersistent:Mc}),t}var Ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Au=Tn(Ls),vl=Te({},Ls,{view:0,detail:0}),D1=Tn(vl),vd,_d,Co,wu=Te({},vl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Co&&(Co&&e.type==="mousemove"?(vd=e.screenX-Co.screenX,_d=e.screenY-Co.screenY):_d=vd=0,Co=e),vd)},movementY:function(e){return"movementY"in e?e.movementY:_d}}),_v=Tn(wu),U1=Te({},wu,{dataTransfer:0}),N1=Tn(U1),L1=Te({},vl,{relatedTarget:0}),xd=Tn(L1),O1=Te({},Ls,{animationName:0,elapsedTime:0,pseudoElement:0}),I1=Tn(O1),P1=Te({},Ls,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),B1=Tn(P1),z1=Te({},Ls,{data:0}),xv=Tn(z1),F1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},V1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},G1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function H1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=G1[e])?!!t[e]:!1}function Zp(){return H1}var k1=Te({},vl,{key:function(e){if(e.key){var t=F1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=zc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?V1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zp,charCode:function(e){return e.type==="keypress"?zc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?zc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),X1=Tn(k1),W1=Te({},wu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yv=Tn(W1),q1=Te({},vl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zp}),Y1=Tn(q1),Z1=Te({},Ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),J1=Tn(Z1),K1=Te({},wu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),j1=Tn(K1),Q1=Te({},Ls,{newState:0,oldState:0}),$1=Tn(Q1),tE=[9,13,27,32],Jp=sa&&"CompositionEvent"in window,Fo=null;sa&&"documentMode"in document&&(Fo=document.documentMode);var eE=sa&&"TextEvent"in window&&!Fo,ix=sa&&(!Jp||Fo&&8<Fo&&11>=Fo),Sv=" ",Mv=!1;function ax(e,t){switch(e){case"keyup":return tE.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vr=!1;function nE(e,t){switch(e){case"compositionend":return sx(t);case"keypress":return t.which!==32?null:(Mv=!0,Sv);case"textInput":return e=t.data,e===Sv&&Mv?null:e;default:return null}}function iE(e,t){if(vr)return e==="compositionend"||!Jp&&ax(e,t)?(e=nx(),Bc=Yp=La=null,vr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ix&&t.locale!=="ko"?null:t.data;default:return null}}var aE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!aE[e.type]:t==="textarea"}function rx(e,t,n,i){gr?wr?wr.push(i):wr=[i]:gr=i,t=_u(t,"onChange"),0<t.length&&(n=new Au("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Vo=null,tl=null;function sE(e){eS(e,0)}function Cu(e){var t=Po(e);if(K_(t))return e}function Ev(e,t){if(e==="change")return t}var ox=!1;sa&&(sa?(Ec="oninput"in document,Ec||(yd=document.createElement("div"),yd.setAttribute("oninput","return;"),Ec=typeof yd.oninput=="function"),bc=Ec):bc=!1,ox=bc&&(!document.documentMode||9<document.documentMode));var bc,Ec,yd;function Tv(){Vo&&(Vo.detachEvent("onpropertychange",lx),tl=Vo=null)}function lx(e){if(e.propertyName==="value"&&Cu(tl)){var t=[];rx(t,tl,e,qp(e)),ex(sE,t)}}function rE(e,t,n){e==="focusin"?(Tv(),Vo=t,tl=n,Vo.attachEvent("onpropertychange",lx)):e==="focusout"&&Tv()}function oE(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cu(tl)}function lE(e,t){if(e==="click")return Cu(t)}function cE(e,t){if(e==="input"||e==="change")return Cu(t)}function uE(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Vn=typeof Object.is=="function"?Object.is:uE;function el(e,t){if(Vn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!jd.call(t,a)||!Vn(e[a],t[a]))return!1}return!0}function Av(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wv(e,t){var n=Av(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Av(n)}}function cx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?cx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ux(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=tu(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=tu(e.document)}return t}function Kp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var hE=sa&&"documentMode"in document&&11>=document.documentMode,_r=null,ap=null,Go=null,sp=!1;function Cv(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sp||_r==null||_r!==tu(i)||(i=_r,"selectionStart"in i&&Kp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Go&&el(Go,i)||(Go=i,i=_u(ap,"onSelect"),0<i.length&&(t=new Au("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=_r)))}function vs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var xr={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionrun:vs("Transition","TransitionRun"),transitionstart:vs("Transition","TransitionStart"),transitioncancel:vs("Transition","TransitionCancel"),transitionend:vs("Transition","TransitionEnd")},Sd={},hx={};sa&&(hx=document.createElement("div").style,"AnimationEvent"in window||(delete xr.animationend.animation,delete xr.animationiteration.animation,delete xr.animationstart.animation),"TransitionEvent"in window||delete xr.transitionend.transition);function Os(e){if(Sd[e])return Sd[e];if(!xr[e])return e;var t=xr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in hx)return Sd[e]=t[n];return e}var fx=Os("animationend"),dx=Os("animationiteration"),px=Os("animationstart"),fE=Os("transitionrun"),dE=Os("transitionstart"),pE=Os("transitioncancel"),mx=Os("transitionend"),gx=new Map,rp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");rp.push("scrollEnd");function pi(e,t){gx.set(e,t),Ns(t,[e])}var eu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},jn=[],yr=0,jp=0;function Ru(){for(var e=yr,t=jp=yr=0;t<e;){var n=jn[t];jn[t++]=null;var i=jn[t];jn[t++]=null;var a=jn[t];jn[t++]=null;var s=jn[t];if(jn[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&vx(n,a,s)}}function Du(e,t,n,i){jn[yr++]=e,jn[yr++]=t,jn[yr++]=n,jn[yr++]=i,jp|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Qp(e,t,n,i){return Du(e,t,n,i),nu(e)}function Is(e,t){return Du(e,null,null,t),nu(e)}function vx(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-zn(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function nu(e){if(50<Ko)throw Ko=0,wp=null,Error(j(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Sr={};function mE(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function On(e,t,n,i){return new mE(e,t,n,i)}function $p(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,t){var n=e.alternate;return n===null?(n=On(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function _x(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Fc(e,t,n,i,a,s){var r=0;if(i=e,typeof e=="function")$p(e)&&(r=1);else if(typeof e=="string")r=_T(e,n,Di.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Yd:return e=On(31,n,t,a),e.elementType=Yd,e.lanes=s,e;case dr:return bs(n.children,a,s,t);case B_:r=8,a|=24;break;case Xd:return e=On(12,n,t,a|2),e.elementType=Xd,e.lanes=s,e;case Wd:return e=On(13,n,t,a),e.elementType=Wd,e.lanes=s,e;case qd:return e=On(19,n,t,a),e.elementType=qd,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case $i:r=10;break t;case z_:r=9;break t;case Fp:r=11;break t;case Vp:r=14;break t;case Aa:r=16,i=null;break t}r=29,n=Error(j(130,e===null?"null":typeof e,"")),i=null}return t=On(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function bs(e,t,n,i){return e=On(7,e,i,t),e.lanes=n,e}function Md(e,t,n){return e=On(6,e,null,t),e.lanes=n,e}function xx(e){var t=On(18,null,null,0);return t.stateNode=e,t}function bd(e,t,n){return t=On(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Rv=new WeakMap;function ni(e,t){if(typeof e=="object"&&e!==null){var n=Rv.get(e);return n!==void 0?n:(t={value:e,source:t,stack:uv(t)},Rv.set(e,t),t)}return{value:e,source:t,stack:uv(t)}}var Mr=[],br=0,iu=null,nl=0,$n=[],ti=0,qa=null,wi=1,Ci="";function ji(e,t){Mr[br++]=nl,Mr[br++]=iu,iu=e,nl=t}function yx(e,t,n){$n[ti++]=wi,$n[ti++]=Ci,$n[ti++]=qa,qa=e;var i=wi;e=Ci;var a=32-zn(i)-1;i&=~(1<<a),n+=1;var s=32-zn(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,wi=1<<32-zn(t)+a|n<<a|i,Ci=s+e}else wi=1<<s|n<<a|i,Ci=e}function tm(e){e.return!==null&&(ji(e,1),yx(e,1,0))}function em(e){for(;e===iu;)iu=Mr[--br],Mr[br]=null,nl=Mr[--br],Mr[br]=null;for(;e===qa;)qa=$n[--ti],$n[ti]=null,Ci=$n[--ti],$n[ti]=null,wi=$n[--ti],$n[ti]=null}function Sx(e,t){$n[ti++]=wi,$n[ti++]=Ci,$n[ti++]=qa,wi=t.id,Ci=t.overflow,qa=e}var sn=null,Ee=null,jt=!1,za=null,ii=!1,op=Error(j(519));function Ya(e){var t=Error(j(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw il(ni(t,e)),op}function Dv(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[an]=e,t[En]=i,n){case"dialog":Yt("cancel",t),Yt("close",t);break;case"iframe":case"object":case"embed":Yt("load",t);break;case"video":case"audio":for(n=0;n<ol.length;n++)Yt(ol[n],t);break;case"source":Yt("error",t);break;case"img":case"image":case"link":Yt("error",t),Yt("load",t);break;case"details":Yt("toggle",t);break;case"input":Yt("invalid",t),j_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Yt("invalid",t);break;case"textarea":Yt("invalid",t),$_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||iS(t.textContent,n)?(i.popover!=null&&(Yt("beforetoggle",t),Yt("toggle",t)),i.onScroll!=null&&Yt("scroll",t),i.onScrollEnd!=null&&Yt("scrollend",t),i.onClick!=null&&(t.onclick=ta),t=!0):t=!1,t||Ya(e,!0)}function Uv(e){for(sn=e.return;sn;)switch(sn.tag){case 5:case 31:case 13:ii=!1;return;case 27:case 3:ii=!0;return;default:sn=sn.return}}function cr(e){if(e!==sn)return!1;if(!jt)return Uv(e),jt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Np(e.type,e.memoizedProps)),n=!n),n&&Ee&&Ya(e),Uv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));Ee=x_(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));Ee=x_(e)}else t===27?(t=Ee,ja(e.type)?(e=Pp,Pp=null,Ee=e):Ee=t):Ee=sn?si(e.stateNode.nextSibling):null;return!0}function ws(){Ee=sn=null,jt=!1}function Ed(){var e=za;return e!==null&&(Mn===null?Mn=e:Mn.push.apply(Mn,e),za=null),e}function il(e){za===null?za=[e]:za.push(e)}var lp=Ui(null),Ps=null,ea=null;function Ca(e,t,n){Se(lp,t._currentValue),t._currentValue=n}function ia(e){e._currentValue=lp.current,$e(lp)}function cp(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function up(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),cp(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(j(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),cp(r,n,e),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Wr(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if((a.flags&524288)!==0)s=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(j(387));if(r=r.memoizedProps,r!==null){var o=a.type;Vn(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===Kc.current){if(r=a.alternate,r===null)throw Error(j(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(cl):e=[cl])}a=a.return}e!==null&&up(t,e,n,i),t.flags|=262144}function au(e){for(e=e.firstContext;e!==null;){if(!Vn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Cs(e){Ps=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rn(e){return Mx(Ps,e)}function Tc(e,t){return Ps===null&&Cs(e),Mx(e,t)}function Mx(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ea===null){if(e===null)throw Error(j(308));ea=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ea=ea.next=t;return n}var gE=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},vE=Ze.unstable_scheduleCallback,_E=Ze.unstable_NormalPriority,Xe={$$typeof:$i,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function nm(){return{controller:new gE,data:new Map,refCount:0}}function _l(e){e.refCount--,e.refCount===0&&vE(_E,function(){e.controller.abort()})}var Ho=null,hp=0,Ir=0,Cr=null;function xE(e,t){if(Ho===null){var n=Ho=[];hp=0,Ir=wm(),Cr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return hp++,t.then(Nv,Nv),t}function Nv(){if(--hp===0&&Ho!==null){Cr!==null&&(Cr.status="fulfilled");var e=Ho;Ho=null,Ir=0,Cr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function yE(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Lv=Pt.S;Pt.S=function(e,t){Py=Pn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&xE(e,t),Lv!==null&&Lv(e,t)};var Es=Ui(null);function im(){var e=Es.current;return e!==null?e:ge.pooledCache}function Vc(e,t){t===null?Se(Es,Es.current):Se(Es,t.pool)}function bx(){var e=im();return e===null?null:{parent:Xe._currentValue,pool:e}}var qr=Error(j(460)),am=Error(j(474)),Uu=Error(j(542)),su={then:function(){}};function Ov(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ex(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ta,ta),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Pv(e),e;default:if(typeof t.status=="string")t.then(ta,ta);else{if(e=ge,e!==null&&100<e.shellSuspendCounter)throw Error(j(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Pv(e),e}throw Ts=t,qr}}function ys(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ts=n,qr):n}}var Ts=null;function Iv(){if(Ts===null)throw Error(j(459));var e=Ts;return Ts=null,e}function Pv(e){if(e===qr||e===Uu)throw Error(j(483))}var Rr=null,al=0;function Ac(e){var t=al;return al+=1,Rr===null&&(Rr=[]),Ex(Rr,e,t)}function Ro(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function wc(e,t){throw t.$$typeof===r1?Error(j(525)):(e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Tx(e){function t(h,x){if(e){var S=h.deletions;S===null?(h.deletions=[x],h.flags|=16):S.push(x)}}function n(h,x){if(!e)return null;for(;x!==null;)t(h,x),x=x.sibling;return null}function i(h){for(var x=new Map;h!==null;)h.key!==null?x.set(h.key,h):x.set(h.index,h),h=h.sibling;return x}function a(h,x){return h=na(h,x),h.index=0,h.sibling=null,h}function s(h,x,S){return h.index=S,e?(S=h.alternate,S!==null?(S=S.index,S<x?(h.flags|=67108866,x):S):(h.flags|=67108866,x)):(h.flags|=1048576,x)}function r(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,x,S,m){return x===null||x.tag!==6?(x=Md(S,h.mode,m),x.return=h,x):(x=a(x,S),x.return=h,x)}function l(h,x,S,m){var E=S.type;return E===dr?f(h,x,S.props.children,m,S.key):x!==null&&(x.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Aa&&ys(E)===x.type)?(x=a(x,S.props),Ro(x,S),x.return=h,x):(x=Fc(S.type,S.key,S.props,null,h.mode,m),Ro(x,S),x.return=h,x)}function c(h,x,S,m){return x===null||x.tag!==4||x.stateNode.containerInfo!==S.containerInfo||x.stateNode.implementation!==S.implementation?(x=bd(S,h.mode,m),x.return=h,x):(x=a(x,S.children||[]),x.return=h,x)}function f(h,x,S,m,E){return x===null||x.tag!==7?(x=bs(S,h.mode,m,E),x.return=h,x):(x=a(x,S),x.return=h,x)}function p(h,x,S){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=Md(""+x,h.mode,S),x.return=h,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case vc:return S=Fc(x.type,x.key,x.props,null,h.mode,S),Ro(S,x),S.return=h,S;case Oo:return x=bd(x,h.mode,S),x.return=h,x;case Aa:return x=ys(x),p(h,x,S)}if(Io(x)||wo(x))return x=bs(x,h.mode,S,null),x.return=h,x;if(typeof x.then=="function")return p(h,Ac(x),S);if(x.$$typeof===$i)return p(h,Tc(h,x),S);wc(h,x)}return null}function u(h,x,S,m){var E=x!==null?x.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return E!==null?null:o(h,x,""+S,m);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case vc:return S.key===E?l(h,x,S,m):null;case Oo:return S.key===E?c(h,x,S,m):null;case Aa:return S=ys(S),u(h,x,S,m)}if(Io(S)||wo(S))return E!==null?null:f(h,x,S,m,null);if(typeof S.then=="function")return u(h,x,Ac(S),m);if(S.$$typeof===$i)return u(h,x,Tc(h,S),m);wc(h,S)}return null}function d(h,x,S,m,E){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return h=h.get(S)||null,o(x,h,""+m,E);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case vc:return h=h.get(m.key===null?S:m.key)||null,l(x,h,m,E);case Oo:return h=h.get(m.key===null?S:m.key)||null,c(x,h,m,E);case Aa:return m=ys(m),d(h,x,S,m,E)}if(Io(m)||wo(m))return h=h.get(S)||null,f(x,h,m,E,null);if(typeof m.then=="function")return d(h,x,S,Ac(m),E);if(m.$$typeof===$i)return d(h,x,S,Tc(x,m),E);wc(x,m)}return null}function _(h,x,S,m){for(var E=null,w=null,C=x,y=x=0,A=null;C!==null&&y<S.length;y++){C.index>y?(A=C,C=null):A=C.sibling;var R=u(h,C,S[y],m);if(R===null){C===null&&(C=A);break}e&&C&&R.alternate===null&&t(h,C),x=s(R,x,y),w===null?E=R:w.sibling=R,w=R,C=A}if(y===S.length)return n(h,C),jt&&ji(h,y),E;if(C===null){for(;y<S.length;y++)C=p(h,S[y],m),C!==null&&(x=s(C,x,y),w===null?E=C:w.sibling=C,w=C);return jt&&ji(h,y),E}for(C=i(C);y<S.length;y++)A=d(C,h,y,S[y],m),A!==null&&(e&&A.alternate!==null&&C.delete(A.key===null?y:A.key),x=s(A,x,y),w===null?E=A:w.sibling=A,w=A);return e&&C.forEach(function(D){return t(h,D)}),jt&&ji(h,y),E}function b(h,x,S,m){if(S==null)throw Error(j(151));for(var E=null,w=null,C=x,y=x=0,A=null,R=S.next();C!==null&&!R.done;y++,R=S.next()){C.index>y?(A=C,C=null):A=C.sibling;var D=u(h,C,R.value,m);if(D===null){C===null&&(C=A);break}e&&C&&D.alternate===null&&t(h,C),x=s(D,x,y),w===null?E=D:w.sibling=D,w=D,C=A}if(R.done)return n(h,C),jt&&ji(h,y),E;if(C===null){for(;!R.done;y++,R=S.next())R=p(h,R.value,m),R!==null&&(x=s(R,x,y),w===null?E=R:w.sibling=R,w=R);return jt&&ji(h,y),E}for(C=i(C);!R.done;y++,R=S.next())R=d(C,h,y,R.value,m),R!==null&&(e&&R.alternate!==null&&C.delete(R.key===null?y:R.key),x=s(R,x,y),w===null?E=R:w.sibling=R,w=R);return e&&C.forEach(function(I){return t(h,I)}),jt&&ji(h,y),E}function g(h,x,S,m){if(typeof S=="object"&&S!==null&&S.type===dr&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case vc:t:{for(var E=S.key;x!==null;){if(x.key===E){if(E=S.type,E===dr){if(x.tag===7){n(h,x.sibling),m=a(x,S.props.children),m.return=h,h=m;break t}}else if(x.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Aa&&ys(E)===x.type){n(h,x.sibling),m=a(x,S.props),Ro(m,S),m.return=h,h=m;break t}n(h,x);break}else t(h,x);x=x.sibling}S.type===dr?(m=bs(S.props.children,h.mode,m,S.key),m.return=h,h=m):(m=Fc(S.type,S.key,S.props,null,h.mode,m),Ro(m,S),m.return=h,h=m)}return r(h);case Oo:t:{for(E=S.key;x!==null;){if(x.key===E)if(x.tag===4&&x.stateNode.containerInfo===S.containerInfo&&x.stateNode.implementation===S.implementation){n(h,x.sibling),m=a(x,S.children||[]),m.return=h,h=m;break t}else{n(h,x);break}else t(h,x);x=x.sibling}m=bd(S,h.mode,m),m.return=h,h=m}return r(h);case Aa:return S=ys(S),g(h,x,S,m)}if(Io(S))return _(h,x,S,m);if(wo(S)){if(E=wo(S),typeof E!="function")throw Error(j(150));return S=E.call(S),b(h,x,S,m)}if(typeof S.then=="function")return g(h,x,Ac(S),m);if(S.$$typeof===$i)return g(h,x,Tc(h,S),m);wc(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,x!==null&&x.tag===6?(n(h,x.sibling),m=a(x,S),m.return=h,h=m):(n(h,x),m=Md(S,h.mode,m),m.return=h,h=m),r(h)):n(h,x)}return function(h,x,S,m){try{al=0;var E=g(h,x,S,m);return Rr=null,E}catch(C){if(C===qr||C===Uu)throw C;var w=On(29,C,null,h.mode);return w.lanes=m,w.return=h,w}finally{}}}var Rs=Tx(!0),Ax=Tx(!1),wa=!1;function sm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Va(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(se&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=nu(e),vx(e,null,n),t}return Du(e,i,t,n),nu(e)}function ko(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,X_(e,n)}}function Td(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var dp=!1;function Xo(){if(dp){var e=Cr;if(e!==null)throw e}}function Wo(e,t,n,i){dp=!1;var a=e.updateQueue;wa=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var p=a.baseState;r=0,f=c=l=null,o=s;do{var u=o.lane&-536870913,d=u!==o.lane;if(d?(Jt&u)===u:(i&u)===u){u!==0&&u===Ir&&(dp=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var _=e,b=o;u=t;var g=n;switch(b.tag){case 1:if(_=b.payload,typeof _=="function"){p=_.call(g,p,u);break t}p=_;break t;case 3:_.flags=_.flags&-65537|128;case 0:if(_=b.payload,u=typeof _=="function"?_.call(g,p,u):_,u==null)break t;p=Te({},p,u);break t;case 2:wa=!0}}u=o.callback,u!==null&&(e.flags|=64,d&&(e.flags|=8192),d=a.callbacks,d===null?a.callbacks=[u]:d.push(u))}else d={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=d,l=p):f=f.next=d,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;d=o,o=d.next,d.next=null,a.lastBaseUpdate=d,a.shared.pending=null}}while(!0);f===null&&(l=p),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=f,s===null&&(a.shared.lanes=0),Ja|=r,e.lanes=r,e.memoizedState=p}}function wx(e,t){if(typeof e!="function")throw Error(j(191,e));e.call(t)}function Cx(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)wx(n[e],t)}var Pr=Ui(null),ru=Ui(0);function Bv(e,t){e=ca,Se(ru,e),Se(Pr,t),ca=e|t.baseLanes}function pp(){Se(ru,ca),Se(Pr,Pr.current)}function rm(){ca=ru.current,$e(Pr),$e(ru)}var Gn=Ui(null),ai=null;function Ra(e){var t=e.alternate;Se(Ve,Ve.current&1),Se(Gn,e),ai===null&&(t===null||Pr.current!==null||t.memoizedState!==null)&&(ai=e)}function mp(e){Se(Ve,Ve.current),Se(Gn,e),ai===null&&(ai=e)}function Rx(e){e.tag===22?(Se(Ve,Ve.current),Se(Gn,e),ai===null&&(ai=e)):Da(e)}function Da(){Se(Ve,Ve.current),Se(Gn,Gn.current)}function Ln(e){$e(Gn),ai===e&&(ai=null),$e(Ve)}var Ve=Ui(0);function ou(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Op(n)||Ip(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ra=0,Vt=null,fe=null,He=null,lu=!1,Dr=!1,Ds=!1,cu=0,sl=0,Ur=null,SE=0;function Ie(){throw Error(j(321))}function om(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vn(e[n],t[n]))return!1;return!0}function lm(e,t,n,i,a,s){return ra=s,Vt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Pt.H=e===null||e.memoizedState===null?ry:xm,Ds=!1,s=n(i,a),Ds=!1,Dr&&(s=Ux(t,n,i,a)),Dx(e),s}function Dx(e){Pt.H=rl;var t=fe!==null&&fe.next!==null;if(ra=0,He=fe=Vt=null,lu=!1,sl=0,Ur=null,t)throw Error(j(300));e===null||We||(e=e.dependencies,e!==null&&au(e)&&(We=!0))}function Ux(e,t,n,i){Vt=e;var a=0;do{if(Dr&&(Ur=null),sl=0,Dr=!1,25<=a)throw Error(j(301));if(a+=1,He=fe=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Pt.H=oy,s=t(n,i)}while(Dr);return s}function ME(){var e=Pt.H,t=e.useState()[0];return t=typeof t.then=="function"?xl(t):t,e=e.useState()[0],(fe!==null?fe.memoizedState:null)!==e&&(Vt.flags|=1024),t}function cm(){var e=cu!==0;return cu=0,e}function um(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function hm(e){if(lu){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}lu=!1}ra=0,He=fe=Vt=null,Dr=!1,sl=cu=0,Ur=null}function gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Vt.memoizedState=He=e:He=He.next=e,He}function Ge(){if(fe===null){var e=Vt.alternate;e=e!==null?e.memoizedState:null}else e=fe.next;var t=He===null?Vt.memoizedState:He.next;if(t!==null)He=t,fe=e;else{if(e===null)throw Vt.alternate===null?Error(j(467)):Error(j(310));fe=e,e={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},He===null?Vt.memoizedState=He=e:He=He.next=e}return He}function Nu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xl(e){var t=sl;return sl+=1,Ur===null&&(Ur=[]),e=Ex(Ur,e,t),t=Vt,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,Pt.H=t===null||t.memoizedState===null?ry:xm),e}function Lu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xl(e);if(e.$$typeof===$i)return rn(e)}throw Error(j(438,String(e)))}function fm(e){var t=null,n=Vt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Vt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Nu(),Vt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=o1;return t.index++,n}function oa(e,t){return typeof t=="function"?t(e):t}function Gc(e){var t=Ge();return dm(t,fe,e)}function dm(e,t,n){var i=e.queue;if(i===null)throw Error(j(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,f=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(Jt&p)===p:(ra&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Ir&&(f=!0);else if((ra&u)===u){c=c.next,u===Ir&&(f=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=s):l=l.next=p,Vt.lanes|=u,Ja|=u;p=c.action,Ds&&n(s,p),s=c.hasEagerState?c.eagerState:n(s,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Vt.lanes|=p,Ja|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!Vn(s,e.memoizedState)&&(We=!0,f&&(n=Cr,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Ad(e){var t=Ge(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);Vn(s,t.memoizedState)||(We=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function Nx(e,t,n){var i=Vt,a=Ge(),s=jt;if(s){if(n===void 0)throw Error(j(407));n=n()}else n=t();var r=!Vn((fe||a).memoizedState,n);if(r&&(a.memoizedState=n,We=!0),a=a.queue,pm(Ix.bind(null,i,a,e),[e]),a.getSnapshot!==t||r||He!==null&&He.memoizedState.tag&1){if(i.flags|=2048,Br(9,{destroy:void 0},Ox.bind(null,i,a,n,t),null),ge===null)throw Error(j(349));s||(ra&127)!==0||Lx(i,t,n)}return n}function Lx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Vt.updateQueue,t===null?(t=Nu(),Vt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ox(e,t,n,i){t.value=n,t.getSnapshot=i,Px(t)&&Bx(e)}function Ix(e,t,n){return n(function(){Px(t)&&Bx(e)})}function Px(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vn(e,n)}catch{return!0}}function Bx(e){var t=Is(e,2);t!==null&&bn(t,e,2)}function gp(e){var t=gn();if(typeof e=="function"){var n=e;if(e=n(),Ds){Na(!0);try{n()}finally{Na(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},t}function zx(e,t,n,i){return e.baseState=n,dm(e,fe,typeof i=="function"?i:oa)}function bE(e,t,n,i,a){if(Iu(e))throw Error(j(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Pt.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,Fx(t,s)):(s.next=n.next,t.pending=n.next=s)}}function Fx(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=Pt.T,r={};Pt.T=r;try{var o=n(a,i),l=Pt.S;l!==null&&l(r,o),zv(e,t,o)}catch(c){vp(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Pt.T=s}}else try{s=n(a,i),zv(e,t,s)}catch(c){vp(e,t,c)}}function zv(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Fv(e,t,i)},function(i){return vp(e,t,i)}):Fv(e,t,n)}function Fv(e,t,n){t.status="fulfilled",t.value=n,Vx(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Fx(e,n)))}function vp(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Vx(t),t=t.next;while(t!==i)}e.action=null}function Vx(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Gx(e,t){return t}function Vv(e,t){if(jt){var n=ge.formState;if(n!==null){t:{var i=Vt;if(jt){if(Ee){e:{for(var a=Ee,s=ii;a.nodeType!==8;){if(!s){a=null;break e}if(a=si(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Ee=si(a.nextSibling),i=a.data==="F!";break t}}Ya(i)}i=!1}i&&(t=n[0])}}return n=gn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gx,lastRenderedState:t},n.queue=i,n=iy.bind(null,Vt,i),i.dispatch=n,i=gp(!1),s=_m.bind(null,Vt,!1,i.queue),i=gn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=bE.bind(null,Vt,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function Gv(e){var t=Ge();return Hx(t,fe,e)}function Hx(e,t,n){if(t=dm(e,t,Gx)[0],e=Gc(oa)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xl(t)}catch(r){throw r===qr?Uu:r}else i=t;t=Ge();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(Vt.flags|=2048,Br(9,{destroy:void 0},EE.bind(null,a,n),null)),[i,s,e]}function EE(e,t){e.action=t}function Hv(e){var t=Ge(),n=fe;if(n!==null)return Hx(t,n,e);Ge(),t=t.memoizedState,n=Ge();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Br(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Vt.updateQueue,t===null&&(t=Nu(),Vt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function kx(){return Ge().memoizedState}function Hc(e,t,n,i){var a=gn();Vt.flags|=e,a.memoizedState=Br(1|t,{destroy:void 0},n,i===void 0?null:i)}function Ou(e,t,n,i){var a=Ge();i=i===void 0?null:i;var s=a.memoizedState.inst;fe!==null&&i!==null&&om(i,fe.memoizedState.deps)?a.memoizedState=Br(t,s,n,i):(Vt.flags|=e,a.memoizedState=Br(1|t,s,n,i))}function kv(e,t){Hc(8390656,8,e,t)}function pm(e,t){Ou(2048,8,e,t)}function TE(e){Vt.flags|=4;var t=Vt.updateQueue;if(t===null)t=Nu(),Vt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Xx(e){var t=Ge().memoizedState;return TE({ref:t,nextImpl:e}),function(){if((se&2)!==0)throw Error(j(440));return t.impl.apply(void 0,arguments)}}function Wx(e,t){return Ou(4,2,e,t)}function qx(e,t){return Ou(4,4,e,t)}function Yx(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zx(e,t,n){n=n!=null?n.concat([e]):null,Ou(4,4,Yx.bind(null,t,e),n)}function mm(){}function Jx(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&om(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Kx(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&om(t,i[1]))return i[0];if(i=e(),Ds){Na(!0);try{e()}finally{Na(!1)}}return n.memoizedState=[i,t],i}function gm(e,t,n){return n===void 0||(ra&1073741824)!==0&&(Jt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=zy(),Vt.lanes|=e,Ja|=e,n)}function jx(e,t,n,i){return Vn(n,t)?n:Pr.current!==null?(e=gm(e,n,i),Vn(e,t)||(We=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Jt&261930)===0?(We=!0,e.memoizedState=n):(e=zy(),Vt.lanes|=e,Ja|=e,t)}function Qx(e,t,n,i,a){var s=re.p;re.p=s!==0&&8>s?s:8;var r=Pt.T,o={};Pt.T=o,_m(e,!1,t,n);try{var l=a(),c=Pt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=yE(l,i);qo(e,t,f,Fn(e))}else qo(e,t,i,Fn(e))}catch(p){qo(e,t,{then:function(){},status:"rejected",reason:p},Fn())}finally{re.p=s,r!==null&&o.types!==null&&(r.types=o.types),Pt.T=r}}function AE(){}function _p(e,t,n,i){if(e.tag!==5)throw Error(j(476));var a=$x(e).queue;Qx(e,a,t,Ms,n===null?AE:function(){return ty(e),n(i)})}function $x(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ms,baseState:Ms,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:Ms},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ty(e){var t=$x(e);t.next===null&&(t=e.alternate.memoizedState),qo(e,t.next.queue,{},Fn())}function vm(){return rn(cl)}function ey(){return Ge().memoizedState}function ny(){return Ge().memoizedState}function wE(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Fn();e=Fa(n);var i=Va(t,e,n);i!==null&&(bn(i,t,n),ko(i,t,n)),t={cache:nm()},e.payload=t;return}t=t.return}}function CE(e,t,n){var i=Fn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Iu(e)?ay(t,n):(n=Qp(e,t,n,i),n!==null&&(bn(n,e,i),sy(n,t,i)))}function iy(e,t,n){var i=Fn();qo(e,t,n,i)}function qo(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Iu(e))ay(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,Vn(o,r))return Du(e,t,a,0),ge===null&&Ru(),!1}catch{}finally{}if(n=Qp(e,t,a,i),n!==null)return bn(n,e,i),sy(n,t,i),!0}return!1}function _m(e,t,n,i){if(i={lane:2,revertLane:wm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Iu(e)){if(t)throw Error(j(479))}else t=Qp(e,n,i,2),t!==null&&bn(t,e,2)}function Iu(e){var t=e.alternate;return e===Vt||t!==null&&t===Vt}function ay(e,t){Dr=lu=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function sy(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,X_(e,n)}}var rl={readContext:rn,use:Lu,useCallback:Ie,useContext:Ie,useEffect:Ie,useImperativeHandle:Ie,useLayoutEffect:Ie,useInsertionEffect:Ie,useMemo:Ie,useReducer:Ie,useRef:Ie,useState:Ie,useDebugValue:Ie,useDeferredValue:Ie,useTransition:Ie,useSyncExternalStore:Ie,useId:Ie,useHostTransitionStatus:Ie,useFormState:Ie,useActionState:Ie,useOptimistic:Ie,useMemoCache:Ie,useCacheRefresh:Ie};rl.useEffectEvent=Ie;var ry={readContext:rn,use:Lu,useCallback:function(e,t){return gn().memoizedState=[e,t===void 0?null:t],e},useContext:rn,useEffect:kv,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Hc(4194308,4,Yx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Hc(4194308,4,e,t)},useInsertionEffect:function(e,t){Hc(4,2,e,t)},useMemo:function(e,t){var n=gn();t=t===void 0?null:t;var i=e();if(Ds){Na(!0);try{e()}finally{Na(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=gn();if(n!==void 0){var a=n(t);if(Ds){Na(!0);try{n(t)}finally{Na(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=CE.bind(null,Vt,e),[i.memoizedState,e]},useRef:function(e){var t=gn();return e={current:e},t.memoizedState=e},useState:function(e){e=gp(e);var t=e.queue,n=iy.bind(null,Vt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:mm,useDeferredValue:function(e,t){var n=gn();return gm(n,e,t)},useTransition:function(){var e=gp(!1);return e=Qx.bind(null,Vt,e.queue,!0,!1),gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Vt,a=gn();if(jt){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),ge===null)throw Error(j(349));(Jt&127)!==0||Lx(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,kv(Ix.bind(null,i,s,e),[e]),i.flags|=2048,Br(9,{destroy:void 0},Ox.bind(null,i,s,n,t),null),n},useId:function(){var e=gn(),t=ge.identifierPrefix;if(jt){var n=Ci,i=wi;n=(i&~(1<<32-zn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=cu++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=SE++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:vm,useFormState:Vv,useActionState:Vv,useOptimistic:function(e){var t=gn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=_m.bind(null,Vt,!0,n),n.dispatch=t,[e,t]},useMemoCache:fm,useCacheRefresh:function(){return gn().memoizedState=wE.bind(null,Vt)},useEffectEvent:function(e){var t=gn(),n={impl:e};return t.memoizedState=n,function(){if((se&2)!==0)throw Error(j(440));return n.impl.apply(void 0,arguments)}}},xm={readContext:rn,use:Lu,useCallback:Jx,useContext:rn,useEffect:pm,useImperativeHandle:Zx,useInsertionEffect:Wx,useLayoutEffect:qx,useMemo:Kx,useReducer:Gc,useRef:kx,useState:function(){return Gc(oa)},useDebugValue:mm,useDeferredValue:function(e,t){var n=Ge();return jx(n,fe.memoizedState,e,t)},useTransition:function(){var e=Gc(oa)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:Nx,useId:ey,useHostTransitionStatus:vm,useFormState:Gv,useActionState:Gv,useOptimistic:function(e,t){var n=Ge();return zx(n,fe,e,t)},useMemoCache:fm,useCacheRefresh:ny};xm.useEffectEvent=Xx;var oy={readContext:rn,use:Lu,useCallback:Jx,useContext:rn,useEffect:pm,useImperativeHandle:Zx,useInsertionEffect:Wx,useLayoutEffect:qx,useMemo:Kx,useReducer:Ad,useRef:kx,useState:function(){return Ad(oa)},useDebugValue:mm,useDeferredValue:function(e,t){var n=Ge();return fe===null?gm(n,e,t):jx(n,fe.memoizedState,e,t)},useTransition:function(){var e=Ad(oa)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:Nx,useId:ey,useHostTransitionStatus:vm,useFormState:Hv,useActionState:Hv,useOptimistic:function(e,t){var n=Ge();return fe!==null?zx(n,fe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:fm,useCacheRefresh:ny};oy.useEffectEvent=Xx;function wd(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xp={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Fn(),a=Fa(i);a.payload=t,n!=null&&(a.callback=n),t=Va(e,a,i),t!==null&&(bn(t,e,i),ko(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Fn(),a=Fa(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Va(e,a,i),t!==null&&(bn(t,e,i),ko(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fn(),i=Fa(n);i.tag=2,t!=null&&(i.callback=t),t=Va(e,i,n),t!==null&&(bn(t,e,n),ko(t,e,n))}};function Xv(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!el(n,i)||!el(a,s):!0}function Wv(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&xp.enqueueReplaceState(t,t.state,null)}function Us(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Te({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function ly(e){eu(e)}function cy(e){console.error(e)}function uy(e){eu(e)}function uu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function qv(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function yp(e,t,n){return n=Fa(n),n.tag=3,n.payload={element:null},n.callback=function(){uu(e,t)},n}function hy(e){return e=Fa(e),e.tag=3,e}function fy(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){qv(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){qv(t,n,i),typeof a!="function"&&(Ga===null?Ga=new Set([this]):Ga.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function RE(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Wr(t,n,a,!0),n=Gn.current,n!==null){switch(n.tag){case 31:case 13:return ai===null?mu():n.alternate===null&&Pe===0&&(Pe=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===su?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),zd(e,i,a)),!1;case 22:return n.flags|=65536,i===su?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),zd(e,i,a)),!1}throw Error(j(435,n.tag))}return zd(e,i,a),mu(),!1}if(jt)return t=Gn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==op&&(e=Error(j(422),{cause:i}),il(ni(e,n)))):(i!==op&&(t=Error(j(423),{cause:i}),il(ni(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=ni(i,n),a=yp(e.stateNode,i,a),Td(e,a),Pe!==4&&(Pe=2)),!1;var s=Error(j(520),{cause:i});if(s=ni(s,n),Jo===null?Jo=[s]:Jo.push(s),Pe!==4&&(Pe=2),t===null)return!0;i=ni(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=yp(n.stateNode,i,e),Td(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Ga===null||!Ga.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=hy(a),fy(a,e,n,i),Td(n,a),!1}n=n.return}while(n!==null);return!1}var ym=Error(j(461)),We=!1;function nn(e,t,n,i){t.child=e===null?Ax(t,null,n,i):Rs(t,e.child,n,i)}function Yv(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Cs(t),i=lm(e,t,n,r,s,a),o=cm(),e!==null&&!We?(um(e,t,a),la(e,t,a)):(jt&&o&&tm(t),t.flags|=1,nn(e,t,i,a),t.child)}function Zv(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!$p(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,dy(e,t,s,i,a)):(e=Fc(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Sm(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:el,n(r,i)&&e.ref===t.ref)return la(e,t,a)}return t.flags|=1,e=na(s,i),e.ref=t.ref,e.return=t,t.child=e}function dy(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(el(s,i)&&e.ref===t.ref)if(We=!1,t.pendingProps=i=s,Sm(e,a))(e.flags&131072)!==0&&(We=!0);else return t.lanes=e.lanes,la(e,t,a)}return Sp(e,t,n,i,a)}function py(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return Jv(e,t,s,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Vc(t,s!==null?s.cachePool:null),s!==null?Bv(t,s):pp(),Rx(t);else return i=t.lanes=536870912,Jv(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Vc(t,s.cachePool),Bv(t,s),Da(t),t.memoizedState=null):(e!==null&&Vc(t,null),pp(),Da(t));return nn(e,t,a,n),t.child}function Bo(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Jv(e,t,n,i,a){var s=im();return s=s===null?null:{parent:Xe._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Vc(t,null),pp(),Rx(t),e!==null&&Wr(e,t,i,!0),t.childLanes=a,null}function kc(e,t){return t=hu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Kv(e,t,n){return Rs(t,e.child,null,n),e=kc(t,t.pendingProps),e.flags|=2,Ln(t),t.memoizedState=null,e}function DE(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(jt){if(i.mode==="hidden")return e=kc(t,i),t.lanes=536870912,Bo(null,e);if(mp(t),(e=Ee)?(e=rS(e,ii),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qa!==null?{id:wi,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},n=xx(e),n.return=t,t.child=n,sn=t,Ee=null)):e=null,e===null)throw Ya(t);return t.lanes=536870912,null}return kc(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(mp(t),a)if(t.flags&256)t.flags&=-257,t=Kv(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(j(558));else if(We||Wr(e,t,n,!1),a=(n&e.childLanes)!==0,We||a){if(i=ge,i!==null&&(r=W_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,Is(e,r),bn(i,e,r),ym;mu(),t=Kv(e,t,n)}else e=s.treeContext,Ee=si(r.nextSibling),sn=t,jt=!0,za=null,ii=!1,e!==null&&Sx(t,e),t=kc(t,i),t.flags|=4096;return t}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Xc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(j(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Sp(e,t,n,i,a){return Cs(t),n=lm(e,t,n,i,void 0,a),i=cm(),e!==null&&!We?(um(e,t,a),la(e,t,a)):(jt&&i&&tm(t),t.flags|=1,nn(e,t,n,a),t.child)}function jv(e,t,n,i,a,s){return Cs(t),t.updateQueue=null,n=Ux(t,i,n,a),Dx(e),i=cm(),e!==null&&!We?(um(e,t,s),la(e,t,s)):(jt&&i&&tm(t),t.flags|=1,nn(e,t,n,s),t.child)}function Qv(e,t,n,i,a){if(Cs(t),t.stateNode===null){var s=Sr,r=n.contextType;typeof r=="object"&&r!==null&&(s=rn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=xp,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},sm(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?rn(r):Sr,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(wd(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&xp.enqueueReplaceState(s,s.state,null),Wo(t,i,s,a),Xo(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=Us(n,o);s.props=l;var c=s.context,f=n.contextType;r=Sr,typeof f=="object"&&f!==null&&(r=rn(f));var p=n.getDerivedStateFromProps;f=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&Wv(t,s,i,r),wa=!1;var u=t.memoizedState;s.state=u,Wo(t,i,s,a),Xo(),c=t.memoizedState,o||u!==c||wa?(typeof p=="function"&&(wd(t,n,p,i),c=t.memoizedState),(l=wa||Xv(t,n,l,i,u,c,r))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,fp(e,t),r=t.memoizedProps,f=Us(n,r),s.props=f,p=t.pendingProps,u=s.context,c=n.contextType,l=Sr,typeof c=="object"&&c!==null&&(l=rn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Wv(t,s,i,l),wa=!1,u=t.memoizedState,s.state=u,Wo(t,i,s,a),Xo();var d=t.memoizedState;r!==p||u!==d||wa||e!==null&&e.dependencies!==null&&au(e.dependencies)?(typeof o=="function"&&(wd(t,n,o,i),d=t.memoizedState),(f=wa||Xv(t,n,f,i,u,d,l)||e!==null&&e.dependencies!==null&&au(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,d,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,d,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),s.props=i,s.state=d,s.context=l,i=f):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,Xc(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=Rs(t,e.child,null,a),t.child=Rs(t,null,n,a)):nn(e,t,n,a),t.memoizedState=s.state,e=t.child):e=la(e,t,a),e}function $v(e,t,n,i){return ws(),t.flags|=256,nn(e,t,n,i),t.child}var Cd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rd(e){return{baseLanes:e,cachePool:bx()}}function Dd(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=In),e}function my(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(Ve.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(jt){if(a?Ra(t):Da(t),(e=Ee)?(e=rS(e,ii),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qa!==null?{id:wi,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},n=xx(e),n.return=t,t.child=n,sn=t,Ee=null)):e=null,e===null)throw Ya(t);return Ip(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(Da(t),a=t.mode,o=hu({mode:"hidden",children:o},a),i=bs(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=Rd(n),i.childLanes=Dd(e,r,n),t.memoizedState=Cd,Bo(null,i)):(Ra(t),Mp(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)t.flags&256?(Ra(t),t.flags&=-257,t=Ud(e,t,n)):t.memoizedState!==null?(Da(t),t.child=e.child,t.flags|=128,t=null):(Da(t),o=i.fallback,a=t.mode,i=hu({mode:"visible",children:i.children},a),o=bs(o,a,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,Rs(t,e.child,null,n),i=t.child,i.memoizedState=Rd(n),i.childLanes=Dd(e,r,n),t.memoizedState=Cd,t=Bo(null,i));else if(Ra(t),Ip(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(j(419)),i.stack="",i.digest=r,il({value:i,source:null,stack:null}),t=Ud(e,t,n)}else if(We||Wr(e,t,n,!1),r=(n&e.childLanes)!==0,We||r){if(r=ge,r!==null&&(i=W_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,Is(e,i),bn(r,e,i),ym;Op(o)||mu(),t=Ud(e,t,n)}else Op(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ee=si(o.nextSibling),sn=t,jt=!0,za=null,ii=!1,e!==null&&Sx(t,e),t=Mp(t,i.children),t.flags|=4096);return t}return a?(Da(t),o=i.fallback,a=t.mode,l=e.child,c=l.sibling,i=na(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=na(c,o):(o=bs(o,a,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,Bo(null,i),i=t.child,o=e.child.memoizedState,o===null?o=Rd(n):(a=o.cachePool,a!==null?(l=Xe._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=bx(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Dd(e,r,n),t.memoizedState=Cd,Bo(e.child,i)):(Ra(t),n=e.child,e=n.sibling,n=na(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Mp(e,t){return t=hu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function hu(e,t){return e=On(22,e,null,t),e.lanes=0,e}function Ud(e,t,n){return Rs(t,e.child,null,n),e=Mp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function t_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),cp(e.return,t,n)}function Nd(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function gy(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=Ve.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,Se(Ve,r),nn(e,t,i,n),i=jt?nl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&t_(e,n,t);else if(e.tag===19)t_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ou(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Nd(t,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ou(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Nd(t,!0,n,null,s,i);break;case"together":Nd(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function la(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ja|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Wr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=na(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=na(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Sm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&au(e)))}function UE(e,t,n){switch(t.tag){case 3:jc(t,t.stateNode.containerInfo),Ca(t,Xe,e.memoizedState.cache),ws();break;case 27:case 5:Kd(t);break;case 4:jc(t,t.stateNode.containerInfo);break;case 10:Ca(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,mp(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Ra(t),t.flags|=128,null):(n&t.child.childLanes)!==0?my(e,t,n):(Ra(t),e=la(e,t,n),e!==null?e.sibling:null);Ra(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Wr(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return gy(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Se(Ve,Ve.current),i)break;return null;case 22:return t.lanes=0,py(e,t,n,t.pendingProps);case 24:Ca(t,Xe,e.memoizedState.cache)}return la(e,t,n)}function vy(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)We=!0;else{if(!Sm(e,n)&&(t.flags&128)===0)return We=!1,UE(e,t,n);We=(e.flags&131072)!==0}else We=!1,jt&&(t.flags&1048576)!==0&&yx(t,nl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=ys(t.elementType),t.type=e,typeof e=="function")$p(e)?(i=Us(e,i),t.tag=1,t=Qv(null,t,e,i,n)):(t.tag=0,t=Sp(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===Fp){t.tag=11,t=Yv(null,t,e,i,n);break t}else if(a===Vp){t.tag=14,t=Zv(null,t,e,i,n);break t}}throw t=Zd(e)||e,Error(j(306,t,""))}}return t;case 0:return Sp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=Us(i,t.pendingProps),Qv(e,t,i,a,n);case 3:t:{if(jc(t,t.stateNode.containerInfo),e===null)throw Error(j(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,fp(e,t),Wo(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Ca(t,Xe,i),i!==s.cache&&up(t,[Xe],n,!0),Xo(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=$v(e,t,i,n);break t}else if(i!==a){a=ni(Error(j(424)),t),il(a),t=$v(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ee=si(e.firstChild),sn=t,jt=!0,za=null,ii=!0,n=Ax(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ws(),i===a){t=la(e,t,n);break t}nn(e,t,i,n)}t=t.child}return t;case 26:return Xc(e,t),e===null?(n=M_(t.type,null,t.pendingProps,null))?t.memoizedState=n:jt||(n=t.type,e=t.pendingProps,i=xu(Ba.current).createElement(n),i[an]=t,i[En]=e,on(i,n,e),Qe(i),t.stateNode=i):t.memoizedState=M_(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Kd(t),e===null&&jt&&(i=t.stateNode=oS(t.type,t.pendingProps,Ba.current),sn=t,ii=!0,a=Ee,ja(t.type)?(Pp=a,Ee=si(i.firstChild)):Ee=a),nn(e,t,t.pendingProps.children,n),Xc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&jt&&((a=i=Ee)&&(i=sT(i,t.type,t.pendingProps,ii),i!==null?(t.stateNode=i,sn=t,Ee=si(i.firstChild),ii=!1,a=!0):a=!1),a||Ya(t)),Kd(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Np(a,s)?i=null:r!==null&&Np(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=lm(e,t,ME,null,null,n),cl._currentValue=a),Xc(e,t),nn(e,t,i,n),t.child;case 6:return e===null&&jt&&((e=n=Ee)&&(n=rT(n,t.pendingProps,ii),n!==null?(t.stateNode=n,sn=t,Ee=null,e=!0):e=!1),e||Ya(t)),null;case 13:return my(e,t,n);case 4:return jc(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Rs(t,null,i,n):nn(e,t,i,n),t.child;case 11:return Yv(e,t,t.type,t.pendingProps,n);case 7:return nn(e,t,t.pendingProps,n),t.child;case 8:return nn(e,t,t.pendingProps.children,n),t.child;case 12:return nn(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,Ca(t,t.type,i.value),nn(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,Cs(t),a=rn(a),i=i(a),t.flags|=1,nn(e,t,i,n),t.child;case 14:return Zv(e,t,t.type,t.pendingProps,n);case 15:return dy(e,t,t.type,t.pendingProps,n);case 19:return gy(e,t,n);case 31:return DE(e,t,n);case 22:return py(e,t,n,t.pendingProps);case 24:return Cs(t),i=rn(Xe),e===null?(a=im(),a===null&&(a=ge,s=nm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},sm(t),Ca(t,Xe,a)):((e.lanes&n)!==0&&(fp(e,t),Wo(t,null,null,n),Xo()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ca(t,Xe,i)):(i=s.cache,Ca(t,Xe,i),i!==a.cache&&up(t,[Xe],n,!0))),nn(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(j(156,t.tag))}function Yi(e){e.flags|=4}function Ld(e,t,n,i,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(Gy())e.flags|=8192;else throw Ts=su,am}else e.flags&=-16777217}function e_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!uS(t))if(Gy())e.flags|=8192;else throw Ts=su,am}function Cc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?H_():536870912,e.lanes|=t,zr|=t)}function Do(e,t){if(!jt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function be(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function NE(e,t,n){var i=t.pendingProps;switch(em(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return be(t),null;case 1:return be(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),ia(Xe),Nr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(cr(t)?Yi(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ed())),be(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(Yi(t),s!==null?(be(t),e_(t,s)):(be(t),Ld(t,a,null,i,n))):s?s!==e.memoizedState?(Yi(t),be(t),e_(t,s)):(be(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Yi(t),be(t),Ld(t,a,e,i,n)),null;case 27:if(Qc(t),n=Ba.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return be(t),null}e=Di.current,cr(t)?Dv(t,e):(e=oS(a,i,n),t.stateNode=e,Yi(t))}return be(t),null;case 5:if(Qc(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return be(t),null}if(s=Di.current,cr(t))Dv(t,s);else{var r=xu(Ba.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[an]=t,s[En]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(on(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Yi(t)}}return be(t),Ld(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(j(166));if(e=Ba.current,cr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=sn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[an]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||iS(e.nodeValue,n)),e||Ya(t,!0)}else e=xu(e).createTextNode(i),e[an]=t,t.stateNode=e}return be(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=cr(t),n!==null){if(e===null){if(!i)throw Error(j(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(557));e[an]=t}else ws(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;be(t),e=!1}else n=Ed(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ln(t),t):(Ln(t),null);if((t.flags&128)!==0)throw Error(j(558))}return be(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=cr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(j(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(j(317));a[an]=t}else ws(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;be(t),a=!1}else a=Ed(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Ln(t),t):(Ln(t),null)}return Ln(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Cc(t,t.updateQueue),be(t),null);case 4:return Nr(),e===null&&Cm(t.stateNode.containerInfo),be(t),null;case 10:return ia(t.type),be(t),null;case 19:if($e(Ve),i=t.memoizedState,i===null)return be(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)Do(i,!1);else{if(Pe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=ou(e),s!==null){for(t.flags|=128,Do(i,!1),e=s.updateQueue,t.updateQueue=e,Cc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)_x(n,e),n=n.sibling;return Se(Ve,Ve.current&1|2),jt&&ji(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Pn()>du&&(t.flags|=128,a=!0,Do(i,!1),t.lanes=4194304)}else{if(!a)if(e=ou(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Cc(t,e),Do(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!jt)return be(t),null}else 2*Pn()-i.renderingStartTime>du&&n!==536870912&&(t.flags|=128,a=!0,Do(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Pn(),e.sibling=null,n=Ve.current,Se(Ve,a?n&1|2:n&1),jt&&ji(t,i.treeForkCount),e):(be(t),null);case 22:case 23:return Ln(t),rm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(be(t),t.subtreeFlags&6&&(t.flags|=8192)):be(t),n=t.updateQueue,n!==null&&Cc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&$e(Es),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ia(Xe),be(t),null;case 25:return null;case 30:return null}throw Error(j(156,t.tag))}function LE(e,t){switch(em(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(Xe),Nr(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Qc(t),null;case 31:if(t.memoizedState!==null){if(Ln(t),t.alternate===null)throw Error(j(340));ws()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ln(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));ws()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $e(Ve),null;case 4:return Nr(),null;case 10:return ia(t.type),null;case 22:case 23:return Ln(t),rm(),e!==null&&$e(Es),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ia(Xe),null;case 25:return null;default:return null}}function _y(e,t){switch(em(t),t.tag){case 3:ia(Xe),Nr();break;case 26:case 27:case 5:Qc(t);break;case 4:Nr();break;case 31:t.memoizedState!==null&&Ln(t);break;case 13:Ln(t);break;case 19:$e(Ve);break;case 10:ia(t.type);break;case 22:case 23:Ln(t),rm(),e!==null&&$e(Es);break;case 24:ia(Xe)}}function yl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){ce(t,t.return,o)}}function Za(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(f){ce(a,l,f)}}}i=i.next}while(i!==s)}}catch(f){ce(t,t.return,f)}}function xy(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Cx(t,n)}catch(i){ce(e,e.return,i)}}}function yy(e,t,n){n.props=Us(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){ce(e,t,i)}}function Yo(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(a){ce(e,t,a)}}function Ri(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){ce(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){ce(e,t,a)}else n.current=null}function Sy(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){ce(e,e.return,a)}}function Od(e,t,n){try{var i=e.stateNode;$E(i,e.type,n,t),i[En]=t}catch(a){ce(e,e.return,a)}}function My(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ja(e.type)||e.tag===4}function Id(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||My(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bp(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ta));else if(i!==4&&(i===27&&ja(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(bp(e,t,n),e=e.sibling;e!==null;)bp(e,t,n),e=e.sibling}function fu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&ja(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(fu(e,t,n),e=e.sibling;e!==null;)fu(e,t,n),e=e.sibling}function by(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);on(t,i,n),t[an]=e,t[En]=n}catch(s){ce(e,e.return,s)}}var Qi=!1,ke=!1,Pd=!1,n_=typeof WeakSet=="function"?WeakSet:Set,je=null;function OE(e,t){if(e=e.containerInfo,Dp=bu,e=ux(e),Kp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,f=0,p=e,u=null;e:for(;;){for(var d;p!==n||a!==0&&p.nodeType!==3||(o=r+a),p!==s||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(d=p.firstChild)!==null;)u=p,p=d;for(;;){if(p===e)break e;if(u===n&&++c===a&&(o=r),u===s&&++f===i&&(l=r),(d=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=d}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Up={focusedElem:e,selectionRange:n},bu=!1,je=t;je!==null;)if(t=je,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,je=e;else for(;je!==null;){switch(t=je,s=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,n=t,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var _=Us(n.type,a);e=i.getSnapshotBeforeUpdate(_,s),i.__reactInternalSnapshotBeforeUpdate=e}catch(b){ce(n,n.return,b)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Lp(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Lp(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(j(163))}if(e=t.sibling,e!==null){e.return=t.return,je=e;break}je=t.return}}function Ey(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ji(e,n),i&4&&yl(5,n);break;case 1:if(Ji(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){ce(n,n.return,r)}else{var a=Us(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){ce(n,n.return,r)}}i&64&&xy(n),i&512&&Yo(n,n.return);break;case 3:if(Ji(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Cx(e,t)}catch(r){ce(n,n.return,r)}}break;case 27:t===null&&i&4&&by(n);case 26:case 5:Ji(e,n),t===null&&i&4&&Sy(n),i&512&&Yo(n,n.return);break;case 12:Ji(e,n);break;case 31:Ji(e,n),i&4&&wy(e,n);break;case 13:Ji(e,n),i&4&&Cy(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=kE.bind(null,n),oT(e,n))));break;case 22:if(i=n.memoizedState!==null||Qi,!i){t=t!==null&&t.memoizedState!==null||ke,a=Qi;var s=ke;Qi=i,(ke=t)&&!s?Ki(e,n,(n.subtreeFlags&8772)!==0):Ji(e,n),Qi=a,ke=s}break;case 30:break;default:Ji(e,n)}}function Ty(e){var t=e.alternate;t!==null&&(e.alternate=null,Ty(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Xp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Re=null,Sn=!1;function Zi(e,t,n){for(n=n.child;n!==null;)Ay(e,t,n),n=n.sibling}function Ay(e,t,n){if(Bn&&typeof Bn.onCommitFiberUnmount=="function")try{Bn.onCommitFiberUnmount(dl,n)}catch{}switch(n.tag){case 26:ke||Ri(n,t),Zi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ke||Ri(n,t);var i=Re,a=Sn;ja(n.type)&&(Re=n.stateNode,Sn=!1),Zi(e,t,n),jo(n.stateNode),Re=i,Sn=a;break;case 5:ke||Ri(n,t);case 6:if(i=Re,a=Sn,Re=null,Zi(e,t,n),Re=i,Sn=a,Re!==null)if(Sn)try{(Re.nodeType===9?Re.body:Re.nodeName==="HTML"?Re.ownerDocument.body:Re).removeChild(n.stateNode)}catch(s){ce(n,t,s)}else try{Re.removeChild(n.stateNode)}catch(s){ce(n,t,s)}break;case 18:Re!==null&&(Sn?(e=Re,v_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Hr(e)):v_(Re,n.stateNode));break;case 4:i=Re,a=Sn,Re=n.stateNode.containerInfo,Sn=!0,Zi(e,t,n),Re=i,Sn=a;break;case 0:case 11:case 14:case 15:Za(2,n,t),ke||Za(4,n,t),Zi(e,t,n);break;case 1:ke||(Ri(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&yy(n,t,i)),Zi(e,t,n);break;case 21:Zi(e,t,n);break;case 22:ke=(i=ke)||n.memoizedState!==null,Zi(e,t,n),ke=i;break;default:Zi(e,t,n)}}function wy(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hr(e)}catch(n){ce(t,t.return,n)}}}function Cy(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hr(e)}catch(n){ce(t,t.return,n)}}function IE(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new n_),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new n_),t;default:throw Error(j(435,e.tag))}}function Rc(e,t){var n=IE(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=XE.bind(null,e,i);i.then(a,a)}})}function xn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(ja(o.type)){Re=o.stateNode,Sn=!1;break t}break;case 5:Re=o.stateNode,Sn=!1;break t;case 3:case 4:Re=o.stateNode.containerInfo,Sn=!0;break t}o=o.return}if(Re===null)throw Error(j(160));Ay(s,r,a),Re=null,Sn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Ry(t,e),t=t.sibling}var di=null;function Ry(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:xn(t,e),yn(e),i&4&&(Za(3,e,e.return),yl(3,e),Za(5,e,e.return));break;case 1:xn(t,e),yn(e),i&512&&(ke||n===null||Ri(n,n.return)),i&64&&Qi&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=di;if(xn(t,e),yn(e),i&512&&(ke||n===null||Ri(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[gl]||s[an]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),on(s,i,n),s[an]=e,Qe(s),i=s;break t;case"link":var r=E_("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}s=a.createElement(i),on(s,i,n),a.head.appendChild(s);break;case"meta":if(r=E_("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}s=a.createElement(i),on(s,i,n),a.head.appendChild(s);break;default:throw Error(j(468,i))}s[an]=e,Qe(s),i=s}e.stateNode=i}else T_(a,e.type,e.stateNode);else e.stateNode=b_(a,i,e.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?T_(a,e.type,e.stateNode):b_(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Od(e,e.memoizedProps,n.memoizedProps)}break;case 27:xn(t,e),yn(e),i&512&&(ke||n===null||Ri(n,n.return)),n!==null&&i&4&&Od(e,e.memoizedProps,n.memoizedProps);break;case 5:if(xn(t,e),yn(e),i&512&&(ke||n===null||Ri(n,n.return)),e.flags&32){a=e.stateNode;try{Or(a,"")}catch(_){ce(e,e.return,_)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,Od(e,a,n!==null?n.memoizedProps:a)),i&1024&&(Pd=!0);break;case 6:if(xn(t,e),yn(e),i&4){if(e.stateNode===null)throw Error(j(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(_){ce(e,e.return,_)}}break;case 3:if(Yc=null,a=di,di=yu(t.containerInfo),xn(t,e),di=a,yn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Hr(t.containerInfo)}catch(_){ce(e,e.return,_)}Pd&&(Pd=!1,Dy(e));break;case 4:i=di,di=yu(e.stateNode.containerInfo),xn(t,e),yn(e),di=i;break;case 12:xn(t,e),yn(e);break;case 31:xn(t,e),yn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Rc(e,i)));break;case 13:xn(t,e),yn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Pu=Pn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Rc(e,i)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Qi,f=ke;if(Qi=c||a,ke=f||l,xn(t,e),ke=f,Qi=c,yn(e),i&8192)t:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Qi||ke||Ss(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(_){ce(l,l.return,_)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(_){ce(l,l.return,_)}}}else if(t.tag===18){if(n===null){l=t;try{var d=l.stateNode;a?__(d,!0):__(l.stateNode,!1)}catch(_){ce(l,l.return,_)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Rc(e,n))));break;case 19:xn(t,e),yn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Rc(e,i)));break;case 30:break;case 21:break;default:xn(t,e),yn(e)}}function yn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(My(i)){n=i;break}i=i.return}if(n==null)throw Error(j(160));switch(n.tag){case 27:var a=n.stateNode,s=Id(e);fu(e,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(Or(r,""),n.flags&=-33);var o=Id(e);fu(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Id(e);bp(e,c,l);break;default:throw Error(j(161))}}catch(f){ce(e,e.return,f)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Dy(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Dy(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ji(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ey(e,t.alternate,t),t=t.sibling}function Ss(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Za(4,t,t.return),Ss(t);break;case 1:Ri(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&yy(t,t.return,n),Ss(t);break;case 27:jo(t.stateNode);case 26:case 5:Ri(t,t.return),Ss(t);break;case 22:t.memoizedState===null&&Ss(t);break;case 30:Ss(t);break;default:Ss(t)}e=e.sibling}}function Ki(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ki(a,s,n),yl(4,s);break;case 1:if(Ki(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){ce(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)wx(l[a],o)}catch(c){ce(i,i.return,c)}}n&&r&64&&xy(s),Yo(s,s.return);break;case 27:by(s);case 26:case 5:Ki(a,s,n),n&&i===null&&r&4&&Sy(s),Yo(s,s.return);break;case 12:Ki(a,s,n);break;case 31:Ki(a,s,n),n&&r&4&&wy(a,s);break;case 13:Ki(a,s,n),n&&r&4&&Cy(a,s);break;case 22:s.memoizedState===null&&Ki(a,s,n),Yo(s,s.return);break;case 30:break;default:Ki(a,s,n)}t=t.sibling}}function Mm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&_l(n))}function bm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_l(e))}function fi(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Uy(e,t,n,i),t=t.sibling}function Uy(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:fi(e,t,n,i),a&2048&&yl(9,t);break;case 1:fi(e,t,n,i);break;case 3:fi(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_l(e)));break;case 12:if(a&2048){fi(e,t,n,i),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){ce(t,t.return,l)}}else fi(e,t,n,i);break;case 31:fi(e,t,n,i);break;case 13:fi(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,r=t.alternate,t.memoizedState!==null?s._visibility&2?fi(e,t,n,i):Zo(e,t):s._visibility&2?fi(e,t,n,i):(s._visibility|=2,hr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),a&2048&&Mm(r,t);break;case 24:fi(e,t,n,i),a&2048&&bm(t.alternate,t);break;default:fi(e,t,n,i)}}function hr(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:hr(s,r,o,l,a),yl(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?hr(s,r,o,l,a):Zo(s,r):(f._visibility|=2,hr(s,r,o,l,a)),a&&c&2048&&Mm(r.alternate,r);break;case 24:hr(s,r,o,l,a),a&&c&2048&&bm(r.alternate,r);break;default:hr(s,r,o,l,a)}t=t.sibling}}function Zo(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:Zo(n,i),a&2048&&Mm(i.alternate,i);break;case 24:Zo(n,i),a&2048&&bm(i.alternate,i);break;default:Zo(n,i)}t=t.sibling}}var zo=8192;function ur(e,t,n){if(e.subtreeFlags&zo)for(e=e.child;e!==null;)Ny(e,t,n),e=e.sibling}function Ny(e,t,n){switch(e.tag){case 26:ur(e,t,n),e.flags&zo&&e.memoizedState!==null&&xT(n,di,e.memoizedState,e.memoizedProps);break;case 5:ur(e,t,n);break;case 3:case 4:var i=di;di=yu(e.stateNode.containerInfo),ur(e,t,n),di=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=zo,zo=16777216,ur(e,t,n),zo=i):ur(e,t,n));break;default:ur(e,t,n)}}function Ly(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Uo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,Iy(i,e)}Ly(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Oy(e),e=e.sibling}function Oy(e){switch(e.tag){case 0:case 11:case 15:Uo(e),e.flags&2048&&Za(9,e,e.return);break;case 3:Uo(e);break;case 12:Uo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Wc(e)):Uo(e);break;default:Uo(e)}}function Wc(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,Iy(i,e)}Ly(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Za(8,t,t.return),Wc(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Wc(t));break;default:Wc(t)}e=e.sibling}}function Iy(e,t){for(;je!==null;){var n=je;switch(n.tag){case 0:case 11:case 15:Za(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:_l(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,je=i;else t:for(n=e;je!==null;){i=je;var a=i.sibling,s=i.return;if(Ty(i),i===n){je=null;break t}if(a!==null){a.return=s,je=a;break t}je=s}}}var PE={getCacheForType:function(e){var t=rn(Xe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return rn(Xe).controller.signal}},BE=typeof WeakMap=="function"?WeakMap:Map,se=0,ge=null,Zt=null,Jt=0,le=0,Nn=null,Oa=!1,Yr=!1,Em=!1,ca=0,Pe=0,Ja=0,As=0,Tm=0,In=0,zr=0,Jo=null,Mn=null,Ep=!1,Pu=0,Py=0,du=1/0,pu=null,Ga=null,Ye=0,Ha=null,Fr=null,aa=0,Tp=0,Ap=null,By=null,Ko=0,wp=null;function Fn(){return(se&2)!==0&&Jt!==0?Jt&-Jt:Pt.T!==null?wm():q_()}function zy(){if(In===0)if((Jt&536870912)===0||jt){var e=xc;xc<<=1,(xc&3932160)===0&&(xc=262144),In=e}else In=536870912;return e=Gn.current,e!==null&&(e.flags|=32),In}function bn(e,t,n){(e===ge&&(le===2||le===9)||e.cancelPendingCommit!==null)&&(Vr(e,0),Ia(e,Jt,In,!1)),ml(e,n),((se&2)===0||e!==ge)&&(e===ge&&((se&2)===0&&(As|=n),Pe===4&&Ia(e,Jt,In,!1)),Ni(e))}function Fy(e,t,n){if((se&6)!==0)throw Error(j(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||pl(e,t),a=i?VE(e,t):Bd(e,t,!0),s=i;do{if(a===0){Yr&&!i&&Ia(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!zE(n)){a=Bd(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=Jo;var l=o.current.memoizedState.isDehydrated;if(l&&(Vr(o,r).flags|=256),r=Bd(o,r,!1),r!==2){if(Em&&!l){o.errorRecoveryDisabledLanes|=s,As|=s,a=4;break t}s=Mn,Mn=a,s!==null&&(Mn===null?Mn=s:Mn.push.apply(Mn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){Vr(e,0),Ia(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(j(345));case 4:if((t&4194048)!==t)break;case 6:Ia(i,t,In,!Oa);break t;case 2:Mn=null;break;case 3:case 5:break;default:throw Error(j(329))}if((t&62914560)===t&&(a=Pu+300-Pn(),10<a)){if(Ia(i,t,In,!Oa),Tu(i,0,!0)!==0)break t;aa=t,i.timeoutHandle=sS(i_.bind(null,i,n,Mn,pu,Ep,t,In,As,zr,Oa,s,"Throttled",-0,0),a);break t}i_(i,n,Mn,pu,Ep,t,In,As,zr,Oa,s,null,-0,0)}}break}while(!0);Ni(e)}function i_(e,t,n,i,a,s,r,o,l,c,f,p,u,d){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ta},Ny(t,s,p);var _=(s&62914560)===s?Pu-Pn():(s&4194048)===s?Py-Pn():0;if(_=yT(p,_),_!==null){aa=s,e.cancelPendingCommit=_(s_.bind(null,e,t,s,n,i,a,r,o,l,f,p,null,u,d)),Ia(e,s,r,!c);return}}s_(e,t,s,n,i,a,r,o,l)}function zE(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!Vn(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ia(e,t,n,i){t&=~Tm,t&=~As,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-zn(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&k_(e,n,t)}function Bu(){return(se&6)===0?(Sl(0,!1),!1):!0}function Am(){if(Zt!==null){if(le===0)var e=Zt.return;else e=Zt,ea=Ps=null,hm(e),Rr=null,al=0,e=Zt;for(;e!==null;)_y(e.alternate,e),e=e.return;Zt=null}}function Vr(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,nT(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),aa=0,Am(),ge=e,Zt=n=na(e.current,null),Jt=t,le=0,Nn=null,Oa=!1,Yr=pl(e,t),Em=!1,zr=In=Tm=As=Ja=Pe=0,Mn=Jo=null,Ep=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-zn(i),s=1<<a;t|=e[a],i&=~s}return ca=t,Ru(),n}function Vy(e,t){Vt=null,Pt.H=rl,t===qr||t===Uu?(t=Iv(),le=3):t===am?(t=Iv(),le=4):le=t===ym?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Nn=t,Zt===null&&(Pe=1,uu(e,ni(t,e.current)))}function Gy(){var e=Gn.current;return e===null?!0:(Jt&4194048)===Jt?ai===null:(Jt&62914560)===Jt||(Jt&536870912)!==0?e===ai:!1}function Hy(){var e=Pt.H;return Pt.H=rl,e===null?rl:e}function ky(){var e=Pt.A;return Pt.A=PE,e}function mu(){Pe=4,Oa||(Jt&4194048)!==Jt&&Gn.current!==null||(Yr=!0),(Ja&134217727)===0&&(As&134217727)===0||ge===null||Ia(ge,Jt,In,!1)}function Bd(e,t,n){var i=se;se|=2;var a=Hy(),s=ky();(ge!==e||Jt!==t)&&(pu=null,Vr(e,t)),t=!1;var r=Pe;t:do try{if(le!==0&&Zt!==null){var o=Zt,l=Nn;switch(le){case 8:Am(),r=6;break t;case 3:case 2:case 9:case 6:Gn.current===null&&(t=!0);var c=le;if(le=0,Nn=null,Er(e,o,l,c),n&&Yr){r=0;break t}break;default:c=le,le=0,Nn=null,Er(e,o,l,c)}}FE(),r=Pe;break}catch(f){Vy(e,f)}while(!0);return t&&e.shellSuspendCounter++,ea=Ps=null,se=i,Pt.H=a,Pt.A=s,Zt===null&&(ge=null,Jt=0,Ru()),r}function FE(){for(;Zt!==null;)Xy(Zt)}function VE(e,t){var n=se;se|=2;var i=Hy(),a=ky();ge!==e||Jt!==t?(pu=null,du=Pn()+500,Vr(e,t)):Yr=pl(e,t);t:do try{if(le!==0&&Zt!==null){t=Zt;var s=Nn;e:switch(le){case 1:le=0,Nn=null,Er(e,t,s,1);break;case 2:case 9:if(Ov(s)){le=0,Nn=null,a_(t);break}t=function(){le!==2&&le!==9||ge!==e||(le=7),Ni(e)},s.then(t,t);break t;case 3:le=7;break t;case 4:le=5;break t;case 7:Ov(s)?(le=0,Nn=null,a_(t)):(le=0,Nn=null,Er(e,t,s,7));break;case 5:var r=null;switch(Zt.tag){case 26:r=Zt.memoizedState;case 5:case 27:var o=Zt;if(r?uS(r):o.stateNode.complete){le=0,Nn=null;var l=o.sibling;if(l!==null)Zt=l;else{var c=o.return;c!==null?(Zt=c,zu(c)):Zt=null}break e}}le=0,Nn=null,Er(e,t,s,5);break;case 6:le=0,Nn=null,Er(e,t,s,6);break;case 8:Am(),Pe=6;break t;default:throw Error(j(462))}}GE();break}catch(f){Vy(e,f)}while(!0);return ea=Ps=null,Pt.H=i,Pt.A=a,se=n,Zt!==null?0:(ge=null,Jt=0,Ru(),Pe)}function GE(){for(;Zt!==null&&!u1();)Xy(Zt)}function Xy(e){var t=vy(e.alternate,e,ca);e.memoizedProps=e.pendingProps,t===null?zu(e):Zt=t}function a_(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=jv(n,t,t.pendingProps,t.type,void 0,Jt);break;case 11:t=jv(n,t,t.pendingProps,t.type.render,t.ref,Jt);break;case 5:hm(t);default:_y(n,t),t=Zt=_x(t,ca),t=vy(n,t,ca)}e.memoizedProps=e.pendingProps,t===null?zu(e):Zt=t}function Er(e,t,n,i){ea=Ps=null,hm(t),Rr=null,al=0;var a=t.return;try{if(RE(e,a,t,n,Jt)){Pe=1,uu(e,ni(n,e.current)),Zt=null;return}}catch(s){if(a!==null)throw Zt=a,s;Pe=1,uu(e,ni(n,e.current)),Zt=null;return}t.flags&32768?(jt||i===1?e=!0:Yr||(Jt&536870912)!==0?e=!1:(Oa=e=!0,(i===2||i===9||i===3||i===6)&&(i=Gn.current,i!==null&&i.tag===13&&(i.flags|=16384))),Wy(t,e)):zu(t)}function zu(e){var t=e;do{if((t.flags&32768)!==0){Wy(t,Oa);return}e=t.return;var n=NE(t.alternate,t,ca);if(n!==null){Zt=n;return}if(t=t.sibling,t!==null){Zt=t;return}Zt=t=e}while(t!==null);Pe===0&&(Pe=5)}function Wy(e,t){do{var n=LE(e.alternate,e);if(n!==null){n.flags&=32767,Zt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Zt=e;return}Zt=e=n}while(e!==null);Pe=6,Zt=null}function s_(e,t,n,i,a,s,r,o,l){e.cancelPendingCommit=null;do Fu();while(Ye!==0);if((se&6)!==0)throw Error(j(327));if(t!==null){if(t===e.current)throw Error(j(177));if(s=t.lanes|t.childLanes,s|=jp,y1(e,n,s,r,o,l),e===ge&&(Zt=ge=null,Jt=0),Fr=t,Ha=e,aa=n,Tp=s,Ap=a,By=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,WE($c,function(){return Ky(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Pt.T,Pt.T=null,a=re.p,re.p=2,r=se,se|=4;try{OE(e,t,n)}finally{se=r,re.p=a,Pt.T=i}}Ye=1,qy(),Yy(),Zy()}}function qy(){if(Ye===1){Ye=0;var e=Ha,t=Fr,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=Pt.T,Pt.T=null;var i=re.p;re.p=2;var a=se;se|=4;try{Ry(t,e);var s=Up,r=ux(e.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&cx(o.ownerDocument.documentElement,o)){if(l!==null&&Kp(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var d=u.getSelection(),_=o.textContent.length,b=Math.min(l.start,_),g=l.end===void 0?b:Math.min(l.end,_);!d.extend&&b>g&&(r=g,g=b,b=r);var h=wv(o,b),x=wv(o,g);if(h&&x&&(d.rangeCount!==1||d.anchorNode!==h.node||d.anchorOffset!==h.offset||d.focusNode!==x.node||d.focusOffset!==x.offset)){var S=p.createRange();S.setStart(h.node,h.offset),d.removeAllRanges(),b>g?(d.addRange(S),d.extend(x.node,x.offset)):(S.setEnd(x.node,x.offset),d.addRange(S))}}}}for(p=[],d=o;d=d.parentNode;)d.nodeType===1&&p.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var m=p[o];m.element.scrollLeft=m.left,m.element.scrollTop=m.top}}bu=!!Dp,Up=Dp=null}finally{se=a,re.p=i,Pt.T=n}}e.current=t,Ye=2}}function Yy(){if(Ye===2){Ye=0;var e=Ha,t=Fr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Pt.T,Pt.T=null;var i=re.p;re.p=2;var a=se;se|=4;try{Ey(e,t.alternate,t)}finally{se=a,re.p=i,Pt.T=n}}Ye=3}}function Zy(){if(Ye===4||Ye===3){Ye=0,h1();var e=Ha,t=Fr,n=aa,i=By;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ye=5:(Ye=0,Fr=Ha=null,Jy(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(Ga=null),kp(n),t=t.stateNode,Bn&&typeof Bn.onCommitFiberRoot=="function")try{Bn.onCommitFiberRoot(dl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Pt.T,a=re.p,re.p=2,Pt.T=null;try{for(var s=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{Pt.T=t,re.p=a}}(aa&3)!==0&&Fu(),Ni(e),a=e.pendingLanes,(n&261930)!==0&&(a&42)!==0?e===wp?Ko++:(Ko=0,wp=e):Ko=0,Sl(0,!1)}}function Jy(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,_l(t)))}function Fu(){return qy(),Yy(),Zy(),Ky()}function Ky(){if(Ye!==5)return!1;var e=Ha,t=Tp;Tp=0;var n=kp(aa),i=Pt.T,a=re.p;try{re.p=32>n?32:n,Pt.T=null,n=Ap,Ap=null;var s=Ha,r=aa;if(Ye=0,Fr=Ha=null,aa=0,(se&6)!==0)throw Error(j(331));var o=se;if(se|=4,Oy(s.current),Uy(s,s.current,r,n),se=o,Sl(0,!1),Bn&&typeof Bn.onPostCommitFiberRoot=="function")try{Bn.onPostCommitFiberRoot(dl,s)}catch{}return!0}finally{re.p=a,Pt.T=i,Jy(e,t)}}function r_(e,t,n){t=ni(n,t),t=yp(e.stateNode,t,2),e=Va(e,t,2),e!==null&&(ml(e,2),Ni(e))}function ce(e,t,n){if(e.tag===3)r_(e,e,n);else for(;t!==null;){if(t.tag===3){r_(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ga===null||!Ga.has(i))){e=ni(n,e),n=hy(2),i=Va(t,n,2),i!==null&&(fy(n,i,t,e),ml(i,2),Ni(i));break}}t=t.return}}function zd(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new BE;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Em=!0,a.add(n),e=HE.bind(null,e,t,n),t.then(e,e))}function HE(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ge===e&&(Jt&n)===n&&(Pe===4||Pe===3&&(Jt&62914560)===Jt&&300>Pn()-Pu?(se&2)===0&&Vr(e,0):Tm|=n,zr===Jt&&(zr=0)),Ni(e)}function jy(e,t){t===0&&(t=H_()),e=Is(e,t),e!==null&&(ml(e,t),Ni(e))}function kE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),jy(e,n)}function XE(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(j(314))}i!==null&&i.delete(t),jy(e,n)}function WE(e,t){return Gp(e,t)}var gu=null,fr=null,Cp=!1,vu=!1,Fd=!1,Pa=0;function Ni(e){e!==fr&&e.next===null&&(fr===null?gu=fr=e:fr=fr.next=e),vu=!0,Cp||(Cp=!0,YE())}function Sl(e,t){if(!Fd&&vu){Fd=!0;do for(var n=!1,i=gu;i!==null;){if(!t)if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-zn(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,o_(i,s))}else s=Jt,s=Tu(i,i===ge?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(s&3)===0||pl(i,s)||(n=!0,o_(i,s));i=i.next}while(n);Fd=!1}}function qE(){Qy()}function Qy(){vu=Cp=!1;var e=0;Pa!==0&&eT()&&(e=Pa);for(var t=Pn(),n=null,i=gu;i!==null;){var a=i.next,s=$y(i,t);s===0?(i.next=null,n===null?gu=a:n.next=a,a===null&&(fr=n)):(n=i,(e!==0||(s&3)!==0)&&(vu=!0)),i=a}Ye!==0&&Ye!==5||Sl(e,!1),Pa!==0&&(Pa=0)}function $y(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-zn(s),o=1<<r,l=a[r];l===-1?((o&n)===0||(o&i)!==0)&&(a[r]=x1(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=ge,n=Jt,n=Tu(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(le===2||le===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&pd(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||pl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&pd(i),kp(n)){case 2:case 8:n=V_;break;case 32:n=$c;break;case 268435456:n=G_;break;default:n=$c}return i=tS.bind(null,e),n=Gp(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&pd(i),e.callbackPriority=2,e.callbackNode=null,2}function tS(e,t){if(Ye!==0&&Ye!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Fu()&&e.callbackNode!==n)return null;var i=Jt;return i=Tu(e,e===ge?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Fy(e,i,t),$y(e,Pn()),e.callbackNode!=null&&e.callbackNode===n?tS.bind(null,e):null)}function o_(e,t){if(Fu())return null;Fy(e,t,!0)}function YE(){iT(function(){(se&6)!==0?Gp(F_,qE):Qy()})}function wm(){if(Pa===0){var e=Ir;e===0&&(e=_c,_c<<=1,(_c&261888)===0&&(_c=256)),Pa=e}return Pa}function l_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Pc(""+e)}function c_(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function ZE(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=l_((a[En]||null).action),r=i.submitter;r&&(t=(t=r[En]||null)?l_(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new Au("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Pa!==0){var l=r?c_(a,r):new FormData(a);_p(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?c_(a,r):new FormData(a),_p(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(Dc=0;Dc<rp.length;Dc++)Uc=rp[Dc],u_=Uc.toLowerCase(),h_=Uc[0].toUpperCase()+Uc.slice(1),pi(u_,"on"+h_);var Uc,u_,h_,Dc;pi(fx,"onAnimationEnd");pi(dx,"onAnimationIteration");pi(px,"onAnimationStart");pi("dblclick","onDoubleClick");pi("focusin","onFocus");pi("focusout","onBlur");pi(fE,"onTransitionRun");pi(dE,"onTransitionStart");pi(pE,"onTransitionCancel");pi(mx,"onTransitionEnd");Lr("onMouseEnter",["mouseout","mouseover"]);Lr("onMouseLeave",["mouseout","mouseover"]);Lr("onPointerEnter",["pointerout","pointerover"]);Lr("onPointerLeave",["pointerout","pointerover"]);Ns("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ns("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ns("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ns("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ns("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ns("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ol="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),JE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ol));function eS(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(f){eu(f)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(f){eu(f)}a.currentTarget=null,s=l}}}}function Yt(e,t){var n=t[Qd];n===void 0&&(n=t[Qd]=new Set);var i=e+"__bubble";n.has(i)||(nS(t,e,2,!1),n.add(i))}function Vd(e,t,n){var i=0;t&&(i|=4),nS(n,e,i,t)}var Nc="_reactListening"+Math.random().toString(36).slice(2);function Cm(e){if(!e[Nc]){e[Nc]=!0,Y_.forEach(function(n){n!=="selectionchange"&&(JE.has(n)||Vd(n,!1,e),Vd(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Nc]||(t[Nc]=!0,Vd("selectionchange",!1,t))}}function nS(e,t,n,i){switch(mS(t)){case 2:var a=bT;break;case 8:a=ET;break;default:a=Nm}n=a.bind(null,t,n,e),a=void 0,!ip||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Gd(e,t,n,i,a){var s=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=mr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}ex(function(){var c=s,f=qp(n),p=[];t:{var u=gx.get(e);if(u!==void 0){var d=Au,_=e;switch(e){case"keypress":if(zc(n)===0)break t;case"keydown":case"keyup":d=X1;break;case"focusin":_="focus",d=xd;break;case"focusout":_="blur",d=xd;break;case"beforeblur":case"afterblur":d=xd;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=_v;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=N1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=Y1;break;case fx:case dx:case px:d=I1;break;case mx:d=J1;break;case"scroll":case"scrollend":d=D1;break;case"wheel":d=j1;break;case"copy":case"cut":case"paste":d=B1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=yv;break;case"toggle":case"beforetoggle":d=$1}var b=(t&4)!==0,g=!b&&(e==="scroll"||e==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var x=c,S;x!==null;){var m=x;if(S=m.stateNode,m=m.tag,m!==5&&m!==26&&m!==27||S===null||h===null||(m=$o(x,h),m!=null&&b.push(ll(x,m,S))),g)break;x=x.return}0<b.length&&(u=new d(u,_,null,n,f),p.push({event:u,listeners:b}))}}if((t&7)===0){t:{if(u=e==="mouseover"||e==="pointerover",d=e==="mouseout"||e==="pointerout",u&&n!==np&&(_=n.relatedTarget||n.fromElement)&&(mr(_)||_[kr]))break t;if((d||u)&&(u=f.window===f?f:(u=f.ownerDocument)?u.defaultView||u.parentWindow:window,d?(_=n.relatedTarget||n.toElement,d=c,_=_?mr(_):null,_!==null&&(g=fl(_),b=_.tag,_!==g||b!==5&&b!==27&&b!==6)&&(_=null)):(d=null,_=c),d!==_)){if(b=_v,m="onMouseLeave",h="onMouseEnter",x="mouse",(e==="pointerout"||e==="pointerover")&&(b=yv,m="onPointerLeave",h="onPointerEnter",x="pointer"),g=d==null?u:Po(d),S=_==null?u:Po(_),u=new b(m,x+"leave",d,n,f),u.target=g,u.relatedTarget=S,m=null,mr(f)===c&&(b=new b(h,x+"enter",_,n,f),b.target=S,b.relatedTarget=g,m=b),g=m,d&&_)e:{for(b=KE,h=d,x=_,S=0,m=h;m;m=b(m))S++;m=0;for(var E=x;E;E=b(E))m++;for(;0<S-m;)h=b(h),S--;for(;0<m-S;)x=b(x),m--;for(;S--;){if(h===x||x!==null&&h===x.alternate){b=h;break e}h=b(h),x=b(x)}b=null}else b=null;d!==null&&f_(p,u,d,b,!1),_!==null&&g!==null&&f_(p,g,_,b,!0)}}t:{if(u=c?Po(c):window,d=u.nodeName&&u.nodeName.toLowerCase(),d==="select"||d==="input"&&u.type==="file")var w=Ev;else if(bv(u))if(ox)w=cE;else{w=oE;var C=rE}else d=u.nodeName,!d||d.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Wp(c.elementType)&&(w=Ev):w=lE;if(w&&(w=w(e,c))){rx(p,w,n,f);break t}C&&C(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&ep(u,"number",u.value)}switch(C=c?Po(c):window,e){case"focusin":(bv(C)||C.contentEditable==="true")&&(_r=C,ap=c,Go=null);break;case"focusout":Go=ap=_r=null;break;case"mousedown":sp=!0;break;case"contextmenu":case"mouseup":case"dragend":sp=!1,Cv(p,n,f);break;case"selectionchange":if(hE)break;case"keydown":case"keyup":Cv(p,n,f)}var y;if(Jp)t:{switch(e){case"compositionstart":var A="onCompositionStart";break t;case"compositionend":A="onCompositionEnd";break t;case"compositionupdate":A="onCompositionUpdate";break t}A=void 0}else vr?ax(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(ix&&n.locale!=="ko"&&(vr||A!=="onCompositionStart"?A==="onCompositionEnd"&&vr&&(y=nx()):(La=f,Yp="value"in La?La.value:La.textContent,vr=!0)),C=_u(c,A),0<C.length&&(A=new xv(A,e,null,n,f),p.push({event:A,listeners:C}),y?A.data=y:(y=sx(n),y!==null&&(A.data=y)))),(y=eE?nE(e,n):iE(e,n))&&(A=_u(c,"onBeforeInput"),0<A.length&&(C=new xv("onBeforeInput","beforeinput",null,n,f),p.push({event:C,listeners:A}),C.data=y)),ZE(p,e,c,n,f)}eS(p,t)})}function ll(e,t,n){return{instance:e,listener:t,currentTarget:n}}function _u(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=$o(e,n),a!=null&&i.unshift(ll(e,a,s)),a=$o(e,t),a!=null&&i.push(ll(e,a,s))),e.tag===3)return i;e=e.return}return[]}function KE(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function f_(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=$o(n,s),c!=null&&r.unshift(ll(n,c,l))):a||(c=$o(n,s),c!=null&&r.push(ll(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var jE=/\r\n?/g,QE=/\u0000|\uFFFD/g;function d_(e){return(typeof e=="string"?e:""+e).replace(jE,`
`).replace(QE,"")}function iS(e,t){return t=d_(t),d_(e)===t}function he(e,t,n,i,a,s){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Or(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Or(e,""+i);break;case"className":Sc(e,"class",i);break;case"tabIndex":Sc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Sc(e,n,i);break;case"style":tx(e,i,s);break;case"data":if(t!=="object"){Sc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Pc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&he(e,t,"name",a.name,a,null),he(e,t,"formEncType",a.formEncType,a,null),he(e,t,"formMethod",a.formMethod,a,null),he(e,t,"formTarget",a.formTarget,a,null)):(he(e,t,"encType",a.encType,a,null),he(e,t,"method",a.method,a,null),he(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Pc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=ta);break;case"onScroll":i!=null&&Yt("scroll",e);break;case"onScrollEnd":i!=null&&Yt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(j(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Pc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Yt("beforetoggle",e),Yt("toggle",e),Ic(e,"popover",i);break;case"xlinkActuate":qi(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":qi(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":qi(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":qi(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":qi(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":qi(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":qi(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":qi(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":qi(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ic(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=C1.get(n)||n,Ic(e,n,i))}}function Rp(e,t,n,i,a,s){switch(n){case"style":tx(e,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(j(60));e.innerHTML=n}}break;case"children":typeof i=="string"?Or(e,i):(typeof i=="number"||typeof i=="bigint")&&Or(e,""+i);break;case"onScroll":i!=null&&Yt("scroll",e);break;case"onScrollEnd":i!=null&&Yt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=ta);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Z_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),s=e[En]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Ic(e,n,i)}}}function on(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Yt("error",e),Yt("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:he(e,t,s,r,n,null)}}a&&he(e,t,"srcSet",n.srcSet,n,null),i&&he(e,t,"src",n.src,n,null);return;case"input":Yt("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":a=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":s=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(j(137,t));break;default:he(e,t,i,f,n,null)}}j_(e,s,o,l,c,r,a,!1);return;case"select":Yt("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:he(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?Ar(e,!!i,t,!1):n!=null&&Ar(e,!!i,n,!0);return;case"textarea":Yt("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(j(91));break;default:he(e,t,r,o,n,null)}$_(e,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:he(e,t,l,i,n,null)}return;case"dialog":Yt("beforetoggle",e),Yt("toggle",e),Yt("cancel",e),Yt("close",e);break;case"iframe":case"object":Yt("load",e);break;case"video":case"audio":for(i=0;i<ol.length;i++)Yt(ol[i],e);break;case"image":Yt("error",e),Yt("load",e);break;case"details":Yt("toggle",e);break;case"embed":case"source":case"link":Yt("error",e),Yt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:he(e,t,c,i,n,null)}return;default:if(Wp(t)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Rp(e,t,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&he(e,t,o,i,n,null))}function $E(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,f=null;for(d in n){var p=n[d];if(n.hasOwnProperty(d)&&p!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(d)||he(e,t,d,null,i,p)}}for(var u in i){var d=i[u];if(p=n[u],i.hasOwnProperty(u)&&(d!=null||p!=null))switch(u){case"type":s=d;break;case"name":a=d;break;case"checked":c=d;break;case"defaultChecked":f=d;break;case"value":r=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(j(137,t));break;default:d!==p&&he(e,t,u,d,i,p)}}tp(e,r,o,l,c,f,s,a);return;case"select":d=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":d=l;default:i.hasOwnProperty(s)||he(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&he(e,t,a,s,i,l)}t=o,n=r,i=d,u!=null?Ar(e,!!n,u,!1):!!i!=!!n&&(t!=null?Ar(e,!!n,t,!0):Ar(e,!!n,n?[]:"",!1));return;case"textarea":d=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:he(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":d=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(j(91));break;default:a!==s&&he(e,t,r,a,i,s)}Q_(e,u,d);return;case"option":for(var _ in n)if(u=n[_],n.hasOwnProperty(_)&&u!=null&&!i.hasOwnProperty(_))switch(_){case"selected":e.selected=!1;break;default:he(e,t,_,null,i,u)}for(l in i)if(u=i[l],d=n[l],i.hasOwnProperty(l)&&u!==d&&(u!=null||d!=null))switch(l){case"selected":e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:he(e,t,l,u,i,d)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&he(e,t,b,null,i,u);for(c in i)if(u=i[c],d=n[c],i.hasOwnProperty(c)&&u!==d&&(u!=null||d!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(j(137,t));break;default:he(e,t,c,u,i,d)}return;default:if(Wp(t)){for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!==void 0&&!i.hasOwnProperty(g)&&Rp(e,t,g,void 0,i,u);for(f in i)u=i[f],d=n[f],!i.hasOwnProperty(f)||u===d||u===void 0&&d===void 0||Rp(e,t,f,u,i,d);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&he(e,t,h,null,i,u);for(p in i)u=i[p],d=n[p],!i.hasOwnProperty(p)||u===d||u==null&&d==null||he(e,t,p,u,i,d)}function p_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tT(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&p_(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,p=l.initiatorType;f&&p_(p)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Dp=null,Up=null;function xu(e){return e.nodeType===9?e:e.ownerDocument}function m_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function aS(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Np(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hd=null;function eT(){var e=window.event;return e&&e.type==="popstate"?e===Hd?!1:(Hd=e,!0):(Hd=null,!1)}var sS=typeof setTimeout=="function"?setTimeout:void 0,nT=typeof clearTimeout=="function"?clearTimeout:void 0,g_=typeof Promise=="function"?Promise:void 0,iT=typeof queueMicrotask=="function"?queueMicrotask:typeof g_<"u"?function(e){return g_.resolve(null).then(e).catch(aT)}:sS;function aT(e){setTimeout(function(){throw e})}function ja(e){return e==="head"}function v_(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),Hr(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")jo(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,jo(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[gl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&jo(e.ownerDocument.body);n=a}while(n);Hr(t)}function __(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function Lp(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Lp(n),Xp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function sT(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[gl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=si(e.nextSibling),e===null)break}return null}function rT(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=si(e.nextSibling),e===null))return null;return e}function rS(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=si(e.nextSibling),e===null))return null;return e}function Op(e){return e.data==="$?"||e.data==="$~"}function Ip(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function oT(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function si(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Pp=null;function x_(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return si(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function y_(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function oS(e,t,n){switch(t=xu(n),e){case"html":if(e=t.documentElement,!e)throw Error(j(452));return e;case"head":if(e=t.head,!e)throw Error(j(453));return e;case"body":if(e=t.body,!e)throw Error(j(454));return e;default:throw Error(j(451))}}function jo(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Xp(e)}var ri=new Map,S_=new Set;function yu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ua=re.d;re.d={f:lT,r:cT,D:uT,C:hT,L:fT,m:dT,X:mT,S:pT,M:gT};function lT(){var e=ua.f(),t=Bu();return e||t}function cT(e){var t=Xr(e);t!==null&&t.tag===5&&t.type==="form"?ty(t):ua.r(e)}var Zr=typeof document>"u"?null:document;function lS(e,t,n){var i=Zr;if(i&&typeof t=="string"&&t){var a=ei(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),S_.has(a)||(S_.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function uT(e){ua.D(e),lS("dns-prefetch",e,null)}function hT(e,t){ua.C(e,t),lS("preconnect",e,t)}function fT(e,t,n){ua.L(e,t,n);var i=Zr;if(i&&e&&t){var a='link[rel="preload"][as="'+ei(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+ei(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+ei(n.imageSizes)+'"]')):a+='[href="'+ei(e)+'"]';var s=a;switch(t){case"style":s=Gr(e);break;case"script":s=Jr(e)}ri.has(s)||(e=Te({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),ri.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(Ml(s))||t==="script"&&i.querySelector(bl(s))||(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function dT(e,t){ua.m(e,t);var n=Zr;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+ei(i)+'"][href="'+ei(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Jr(e)}if(!ri.has(s)&&(e=Te({rel:"modulepreload",href:e},t),ri.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(bl(s)))return}i=n.createElement("link"),on(i,"link",e),Qe(i),n.head.appendChild(i)}}}function pT(e,t,n){ua.S(e,t,n);var i=Zr;if(i&&e){var a=Tr(i).hoistableStyles,s=Gr(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ml(s)))o.loading=5;else{e=Te({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ri.get(s))&&Rm(e,n);var l=r=i.createElement("link");Qe(l),on(l,"link",e),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,qc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function mT(e,t){ua.X(e,t);var n=Zr;if(n&&e){var i=Tr(n).hoistableScripts,a=Jr(e),s=i.get(a);s||(s=n.querySelector(bl(a)),s||(e=Te({src:e,async:!0},t),(t=ri.get(a))&&Dm(e,t),s=n.createElement("script"),Qe(s),on(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function gT(e,t){ua.M(e,t);var n=Zr;if(n&&e){var i=Tr(n).hoistableScripts,a=Jr(e),s=i.get(a);s||(s=n.querySelector(bl(a)),s||(e=Te({src:e,async:!0,type:"module"},t),(t=ri.get(a))&&Dm(e,t),s=n.createElement("script"),Qe(s),on(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function M_(e,t,n,i){var a=(a=Ba.current)?yu(a):null;if(!a)throw Error(j(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Gr(n.href),n=Tr(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Gr(n.href);var s=Tr(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(Ml(e)))&&!s._p&&(r.instance=s,r.state.loading=5),ri.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ri.set(e,n),s||vT(a,e,n,r.state))),t&&i===null)throw Error(j(528,""));return r}if(t&&i!==null)throw Error(j(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Jr(n),n=Tr(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(j(444,e))}}function Gr(e){return'href="'+ei(e)+'"'}function Ml(e){return'link[rel="stylesheet"]['+e+"]"}function cS(e){return Te({},e,{"data-precedence":e.precedence,precedence:null})}function vT(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),on(t,"link",n),Qe(t),e.head.appendChild(t))}function Jr(e){return'[src="'+ei(e)+'"]'}function bl(e){return"script[async]"+e}function b_(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+ei(n.href)+'"]');if(i)return t.instance=i,Qe(i),i;var a=Te({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Qe(i),on(i,"style",a),qc(i,n.precedence,e),t.instance=i;case"stylesheet":a=Gr(n.href);var s=e.querySelector(Ml(a));if(s)return t.state.loading|=4,t.instance=s,Qe(s),s;i=cS(n),(a=ri.get(a))&&Rm(i,a),s=(e.ownerDocument||e).createElement("link"),Qe(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(s,"link",i),t.state.loading|=4,qc(s,n.precedence,e),t.instance=s;case"script":return s=Jr(n.src),(a=e.querySelector(bl(s)))?(t.instance=a,Qe(a),a):(i=n,(a=ri.get(s))&&(i=Te({},n),Dm(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Qe(a),on(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(j(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,qc(i,n.precedence,e));return t.instance}function qc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Dm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Yc=null;function E_(e,t,n){if(Yc===null){var i=new Map,a=Yc=new Map;a.set(n,i)}else a=Yc,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[gl]||s[an]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function T_(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function _T(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function uS(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function xT(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=Gr(i.href),s=t.querySelector(Ml(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Su.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,Qe(s);return}s=t.ownerDocument||t,i=cS(i),(a=ri.get(a))&&Rm(i,a),s=s.createElement("link"),Qe(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Su.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var kd=0;function yT(e,t){return e.stylesheets&&e.count===0&&Zc(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Zc(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&kd===0&&(kd=62500*tT());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Zc(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>kd?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Su(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Zc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Mu=null;function Zc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mu=new Map,t.forEach(ST,e),Mu=null,Su.call(e))}function ST(e,t){if(!(t.state.loading&4)){var n=Mu.get(e);if(n)var i=n.get(null);else{n=new Map,Mu.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Su.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var cl={$$typeof:$i,Provider:null,Consumer:null,_currentValue:Ms,_currentValue2:Ms,_threadCount:0};function MT(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=md(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=md(0),this.hiddenUpdates=md(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function hS(e,t,n,i,a,s,r,o,l,c,f,p){return e=new MT(e,t,n,r,l,c,f,p,o),t=1,s===!0&&(t|=24),s=On(3,null,null,t),e.current=s,s.stateNode=e,t=nm(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},sm(s),e}function fS(e){return e?(e=Sr,e):Sr}function dS(e,t,n,i,a,s){a=fS(a),i.context===null?i.context=a:i.pendingContext=a,i=Fa(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=Va(e,i,t),n!==null&&(bn(n,e,t),ko(n,e,t))}function A_(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Um(e,t){A_(e,t),(e=e.alternate)&&A_(e,t)}function pS(e){if(e.tag===13||e.tag===31){var t=Is(e,67108864);t!==null&&bn(t,e,67108864),Um(e,67108864)}}function w_(e){if(e.tag===13||e.tag===31){var t=Fn();t=Hp(t);var n=Is(e,t);n!==null&&bn(n,e,t),Um(e,t)}}var bu=!0;function bT(e,t,n,i){var a=Pt.T;Pt.T=null;var s=re.p;try{re.p=2,Nm(e,t,n,i)}finally{re.p=s,Pt.T=a}}function ET(e,t,n,i){var a=Pt.T;Pt.T=null;var s=re.p;try{re.p=8,Nm(e,t,n,i)}finally{re.p=s,Pt.T=a}}function Nm(e,t,n,i){if(bu){var a=Bp(i);if(a===null)Gd(e,t,i,Eu,n),C_(e,i);else if(AT(a,e,t,n,i))i.stopPropagation();else if(C_(e,i),t&4&&-1<TT.indexOf(e)){for(;a!==null;){var s=Xr(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=xs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-zn(r);o.entanglements[1]|=l,r&=~l}Ni(s),(se&6)===0&&(du=Pn()+500,Sl(0,!1))}}break;case 31:case 13:o=Is(s,2),o!==null&&bn(o,s,2),Bu(),Um(s,2)}if(s=Bp(i),s===null&&Gd(e,t,i,Eu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else Gd(e,t,i,null,n)}}function Bp(e){return e=qp(e),Lm(e)}var Eu=null;function Lm(e){if(Eu=null,e=mr(e),e!==null){var t=fl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=O_(t),e!==null)return e;e=null}else if(n===31){if(e=I_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Eu=e,null}function mS(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(f1()){case F_:return 2;case V_:return 8;case $c:case d1:return 32;case G_:return 268435456;default:return 32}default:return 32}}var zp=!1,ka=null,Xa=null,Wa=null,ul=new Map,hl=new Map,Ua=[],TT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function C_(e,t){switch(e){case"focusin":case"focusout":ka=null;break;case"dragenter":case"dragleave":Xa=null;break;case"mouseover":case"mouseout":Wa=null;break;case"pointerover":case"pointerout":ul.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":hl.delete(t.pointerId)}}function No(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=Xr(t),t!==null&&pS(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function AT(e,t,n,i,a){switch(t){case"focusin":return ka=No(ka,e,t,n,i,a),!0;case"dragenter":return Xa=No(Xa,e,t,n,i,a),!0;case"mouseover":return Wa=No(Wa,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return ul.set(s,No(ul.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,hl.set(s,No(hl.get(s)||null,e,t,n,i,a)),!0}return!1}function gS(e){var t=mr(e.target);if(t!==null){var n=fl(t);if(n!==null){if(t=n.tag,t===13){if(t=O_(n),t!==null){e.blockedOn=t,hv(e.priority,function(){w_(n)});return}}else if(t===31){if(t=I_(n),t!==null){e.blockedOn=t,hv(e.priority,function(){w_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Jc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Bp(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);np=i,n.target.dispatchEvent(i),np=null}else return t=Xr(n),t!==null&&pS(t),e.blockedOn=n,!1;t.shift()}return!0}function R_(e,t,n){Jc(e)&&n.delete(t)}function wT(){zp=!1,ka!==null&&Jc(ka)&&(ka=null),Xa!==null&&Jc(Xa)&&(Xa=null),Wa!==null&&Jc(Wa)&&(Wa=null),ul.forEach(R_),hl.forEach(R_)}function Lc(e,t){e.blockedOn===t&&(e.blockedOn=null,zp||(zp=!0,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,wT)))}var Oc=null;function D_(e){Oc!==e&&(Oc=e,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,function(){Oc===e&&(Oc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Lm(i||n)===null)continue;break}var s=Xr(n);s!==null&&(e.splice(t,3),t-=3,_p(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function Hr(e){function t(l){return Lc(l,e)}ka!==null&&Lc(ka,e),Xa!==null&&Lc(Xa,e),Wa!==null&&Lc(Wa,e),ul.forEach(t),hl.forEach(t);for(var n=0;n<Ua.length;n++){var i=Ua[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Ua.length&&(n=Ua[0],n.blockedOn===null);)gS(n),n.blockedOn===null&&Ua.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[En]||null;if(typeof s=="function")r||D_(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[En]||null)o=r.formAction;else if(Lm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),D_(n)}}}function vS(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function Om(e){this._internalRoot=e}Vu.prototype.render=Om.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));var n=t.current,i=Fn();dS(n,i,e,t,null,null)};Vu.prototype.unmount=Om.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dS(e.current,2,null,e,null,null),Bu(),t[kr]=null}};function Vu(e){this._internalRoot=e}Vu.prototype.unstable_scheduleHydration=function(e){if(e){var t=q_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ua.length&&t!==0&&t<Ua[n].priority;n++);Ua.splice(n,0,e),n===0&&gS(e)}};var U_=N_.version;if(U_!=="19.2.8")throw Error(j(527,U_,"19.2.8"));re.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=s1(t),e=e!==null?P_(e):null,e=e===null?null:e.stateNode,e};var CT={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Pt,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Lo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Lo.isDisabled&&Lo.supportsFiber))try{dl=Lo.inject(CT),Bn=Lo}catch{}var Lo;Gu.createRoot=function(e,t){if(!L_(e))throw Error(j(299));var n=!1,i="",a=ly,s=cy,r=uy;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=hS(e,1,!1,null,null,n,i,null,a,s,r,vS),e[kr]=t.current,Cm(e),new Om(t)};Gu.hydrateRoot=function(e,t,n){if(!L_(e))throw Error(j(299));var i=!1,a="",s=ly,r=cy,o=uy,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=hS(e,1,!0,t,n??null,i,a,l,s,r,o,vS),t.context=fS(null),n=t.current,i=Fn(),i=Hp(i),a=Fa(i),a.callback=null,Va(n,a,i),n=i,t.current.lanes=n,ml(t,n),Ni(t),e[kr]=t.current,Cm(e),new Vu(t)};Gu.version="19.2.8"});var SS=Ti((wR,yS)=>{"use strict";function xS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xS)}catch(e){console.error(e)}}xS(),yS.exports=_S()});var yb=Ti(Yf=>{"use strict";var fR=Symbol.for("react.transitional.element"),dR=Symbol.for("react.fragment");function xb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:fR,type:e,key:i,ref:t!==void 0?t:null,props:n}}Yf.Fragment=dR;Yf.jsx=xb;Yf.jsxs=xb});var oc=Ti((SL,Sb)=>{"use strict";Sb.exports=yb()});var bb=ir(SS());var ms=ir(mc(),1);var Xh="185";var VS=0,f0=1,GS=2;var Wl=1,HS=2,mo=3,va=0,_n=1,Gi=2,ui=0,Xs=1,d0=2,p0=3,m0=4,kS=5;var ss=100,XS=101,WS=102,qS=103,YS=104,ZS=200,JS=201,KS=202,jS=203,ch=204,uh=205,QS=206,$S=207,tM=208,eM=209,nM=210,iM=211,aM=212,sM=213,rM=214,hh=0,fh=1,dh=2,Ws=3,ph=4,mh=5,gh=6,vh=7,g0=0,oM=1,lM=2,xi=0,v0=1,_0=2,x0=3,y0=4,S0=5,M0=6,b0=7;var E0=300,us=301,Js=302,Wh=303,qh=304,ql=306,_h=1e3,Ii=1001,xh=1002,en=1003,cM=1004;var Yl=1005;var ln=1006,Yh=1007;var hs=1008;var Zn=1009,T0=1010,A0=1011,go=1012,Zh=1013,yi=1014,Si=1015,Hi=1016,Jh=1017,Kh=1018,vo=1020,w0=35902,C0=35899,R0=1021,D0=1022,hi=1023,Pi=1026,fs=1027,U0=1028,jh=1029,ds=1030,Qh=1031;var $h=1033,Zl=33776,Jl=33777,Kl=33778,jl=33779,tf=35840,ef=35841,nf=35842,af=35843,sf=36196,rf=37492,of=37496,lf=37488,cf=37489,Ql=37490,uf=37491,hf=37808,ff=37809,df=37810,pf=37811,mf=37812,gf=37813,vf=37814,_f=37815,xf=37816,yf=37817,Sf=37818,Mf=37819,bf=37820,Ef=37821,Tf=36492,Af=36494,wf=36495,Cf=36283,Rf=36284,$l=36285,Df=36286;var Rl=2300,yh=2301,lh=2302,a0=2303,s0=2400,r0=2401,o0=2402;var uM=3200;var N0=0,hM=1,xa="",Xn="srgb",Dl="srgb-linear",Ul="linear",oe="srgb";var Gs=7680;var l0=519,fM=512,dM=513,pM=514,Uf=515,mM=516,gM=517,Nf=518,vM=519,c0=35044;var L0="300 es",_i=2e3,Nl=2001;function RT(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function DT(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ll(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function _M(){let e=Ll("canvas");return e.style.display="block",e}var MS={},co=null;function O0(...e){let t="THREE."+e.shift();co?co("log",t,...e):console.log(t,...e)}function xM(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Rt(...e){e=xM(e);let t="THREE."+e.shift();if(co)co("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Nt(...e){e=xM(e);let t="THREE."+e.shift();if(co)co("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ks(...e){let t=e.join(" ");t in MS||(MS[t]=!0,Rt(...e))}function yM(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}var SM={[hh]:fh,[dh]:gh,[ph]:vh,[Ws]:mh,[fh]:hh,[gh]:dh,[vh]:ph,[mh]:Ws},Bi=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let a=i[t];if(a!==void 0){let s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Im=Math.PI/180,Sh=180/Math.PI;function tc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(hn[e&255]+hn[e>>8&255]+hn[e>>16&255]+hn[e>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[n&63|128]+hn[n>>8&255]+"-"+hn[n>>16&255]+hn[n>>24&255]+hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]).toLowerCase()}function Qt(e,t,n){return Math.max(t,Math.min(n,e))}function UT(e,t){return(e%t+t)%t}function Pm(e,t,n){return(1-n)*e+n*t}function El(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function An(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var F0=class F0{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Qt(this.x,t.x,n.x),this.y=Qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Qt(this.x,t,n),this.y=Qt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};F0.prototype.isVector2=!0;var $t=F0,zi=class{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],f=i[a+2],p=i[a+3],u=s[r+0],d=s[r+1],_=s[r+2],b=s[r+3];if(p!==b||l!==u||c!==d||f!==_){let g=l*u+c*d+f*_+p*b;g<0&&(u=-u,d=-d,_=-_,b=-b,g=-g);let h=1-o;if(g<.9995){let x=Math.acos(g),S=Math.sin(x);h=Math.sin(h*x)/S,o=Math.sin(o*x)/S,l=l*h+u*o,c=c*h+d*o,f=f*h+_*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+d*o,f=f*h+_*o,p=p*h+b*o;let x=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=x,c*=x,f*=x,p*=x}}t[n]=l,t[n+1]=c,t[n+2]=f,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,a,s,r){let o=i[a],l=i[a+1],c=i[a+2],f=i[a+3],p=s[r],u=s[r+1],d=s[r+2],_=s[r+3];return t[n]=o*_+f*p+l*d-c*u,t[n+1]=l*_+f*u+c*p-o*d,t[n+2]=c*_+f*d+o*u-l*p,t[n+3]=f*_-o*p-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(a/2),p=o(s/2),u=l(i/2),d=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=u*f*p+c*d*_,this._y=c*d*p-u*f*_,this._z=c*f*_+u*d*p,this._w=c*f*p-u*d*_;break;case"YXZ":this._x=u*f*p+c*d*_,this._y=c*d*p-u*f*_,this._z=c*f*_-u*d*p,this._w=c*f*p+u*d*_;break;case"ZXY":this._x=u*f*p-c*d*_,this._y=c*d*p+u*f*_,this._z=c*f*_+u*d*p,this._w=c*f*p-u*d*_;break;case"ZYX":this._x=u*f*p-c*d*_,this._y=c*d*p+u*f*_,this._z=c*f*_-u*d*p,this._w=c*f*p+u*d*_;break;case"YZX":this._x=u*f*p+c*d*_,this._y=c*d*p+u*f*_,this._z=c*f*_-u*d*p,this._w=c*f*p-u*d*_;break;case"XZY":this._x=u*f*p-c*d*_,this._y=c*d*p-u*f*_,this._z=c*f*_+u*d*p,this._w=c*f*p+u*d*_;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],p=n[10],u=i+o+p;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(f-l)*d,this._y=(s-c)*d,this._z=(r-a)*d}else if(i>o&&i>p){let d=2*Math.sqrt(1+i-o-p);this._w=(f-l)/d,this._x=.25*d,this._y=(a+r)/d,this._z=(s+c)/d}else if(o>p){let d=2*Math.sqrt(1+o-i-p);this._w=(s-c)/d,this._x=(a+r)/d,this._y=.25*d,this._z=(l+f)/d}else{let d=2*Math.sqrt(1+p-i-o);this._w=(r-a)/d,this._x=(s+c)/d,this._y=(l+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+a*c-s*l,this._y=a*f+r*l+s*o-i*c,this._z=s*f+r*c+i*l-a*o,this._w=r*f-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V0=class V0{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(bS.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(bS.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),f=2*(o*n-s*a),p=2*(s*i-r*n);return this.x=n+l*c+r*p-o*f,this.y=i+l*f+o*c-s*p,this.z=a+l*p+s*f-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Qt(this.x,t.x,n.x),this.y=Qt(this.y,t.y,n.y),this.z=Qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Qt(this.x,t,n),this.y=Qt(this.y,t,n),this.z=Qt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Bm.copy(this).projectOnVector(t),this.sub(Bm)}reflect(t){return this.sub(Bm.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};V0.prototype.isVector3=!0;var P=V0,Bm=new P,bS=new zi,G0=class G0{constructor(t,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){let f=this.elements;return f[0]=t,f[1]=a,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],p=i[7],u=i[2],d=i[5],_=i[8],b=a[0],g=a[3],h=a[6],x=a[1],S=a[4],m=a[7],E=a[2],w=a[5],C=a[8];return s[0]=r*b+o*x+l*E,s[3]=r*g+o*S+l*w,s[6]=r*h+o*m+l*C,s[1]=c*b+f*x+p*E,s[4]=c*g+f*S+p*w,s[7]=c*h+f*m+p*C,s[2]=u*b+d*x+_*E,s[5]=u*g+d*S+_*w,s[8]=u*h+d*m+_*C,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return n*r*f-n*o*c-i*s*f+i*o*l+a*s*c-a*r*l}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],p=f*r-o*c,u=o*l-f*s,d=c*s-r*l,_=n*p+i*u+a*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/_;return t[0]=p*b,t[1]=(a*c-f*i)*b,t[2]=(o*i-a*r)*b,t[3]=u*b,t[4]=(f*n-a*l)*b,t[5]=(a*s-o*n)*b,t[6]=d*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*s)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return ks("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zm.makeScale(t,n)),this}rotate(t){return ks("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zm.makeRotation(-t)),this}translate(t,n){return ks("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zm.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};G0.prototype.isMatrix3=!0;var Lt=G0,zm=new Lt,ES=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),TS=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function NT(){let e={enabled:!0,workingColorSpace:Dl,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===oe&&(a.r=ga(a.r),a.g=ga(a.g),a.b=ga(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===oe&&(a.r=lo(a.r),a.g=lo(a.g),a.b=lo(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===xa?Ul:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Dl]:{primaries:t,whitePoint:i,transfer:Ul,toXYZ:ES,fromXYZ:TS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Xn},outputColorSpaceConfig:{drawingBufferColorSpace:Xn}},[Xn]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:ES,fromXYZ:TS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Xn}}}),e}var Kt=NT();function ga(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function lo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Kr,Mh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Kr===void 0&&(Kr=Ll("canvas")),Kr.width=t.width,Kr.height=t.height;let a=Kr.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=Kr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Ll("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=ga(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ga(n[i]/255)*255):n[i]=ga(n[i]);return{data:n,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},LT=0,uo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:LT++}),this.uuid=tc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Fm(a[r].image)):s.push(Fm(a[r]))}else s=Fm(a);i.url=s}return n||(t.images[this.uuid]=i),i}};function Fm(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Mh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var OT=0,Vm=new P,Cn=class e extends Bi{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ii,a=Ii,s=ln,r=hs,o=hi,l=Zn,c=e.DEFAULT_ANISOTROPY,f=xa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:OT++}),this.uuid=tc(),this.name="",this.source=new uo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vm).x}get height(){return this.source.getSize(Vm).y}get depth(){return this.source.getSize(Vm).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Rt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){Rt(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==E0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _h:t.x=t.x-Math.floor(t.x);break;case Ii:t.x=t.x<0?0:1;break;case xh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _h:t.y=t.y-Math.floor(t.y);break;case Ii:t.y=t.y<0?0:1;break;case xh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Cn.DEFAULT_IMAGE=null;Cn.DEFAULT_MAPPING=E0;Cn.DEFAULT_ANISOTROPY=1;var H0=class H0{constructor(t=0,n=0,i=0,a=1){this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s,l=t.elements,c=l[0],f=l[4],p=l[8],u=l[1],d=l[5],_=l[9],b=l[2],g=l[6],h=l[10];if(Math.abs(f-u)<.01&&Math.abs(p-b)<.01&&Math.abs(_-g)<.01){if(Math.abs(f+u)<.1&&Math.abs(p+b)<.1&&Math.abs(_+g)<.1&&Math.abs(c+d+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let S=(c+1)/2,m=(d+1)/2,E=(h+1)/2,w=(f+u)/4,C=(p+b)/4,y=(_+g)/4;return S>m&&S>E?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=w/i,s=C/i):m>E?m<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(m),i=w/a,s=y/a):E<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(E),i=C/s,a=y/s),this.set(i,a,s,n),this}let x=Math.sqrt((g-_)*(g-_)+(p-b)*(p-b)+(u-f)*(u-f));return Math.abs(x)<.001&&(x=1),this.x=(g-_)/x,this.y=(p-b)/x,this.z=(u-f)/x,this.w=Math.acos((c+d+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Qt(this.x,t.x,n.x),this.y=Qt(this.y,t.y,n.y),this.z=Qt(this.z,t.z,n.z),this.w=Qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Qt(this.x,t,n),this.y=Qt(this.y,t,n),this.z=Qt(this.z,t,n),this.w=Qt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};H0.prototype.isVector4=!0;var ve=H0,bh=class extends Bi{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new ve(0,0,t,n),this.scissorTest=!1,this.viewport=new ve(0,0,t,n),this.textures=[];let a={width:t,height:n,depth:i.depth},s=new Cn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let a=Object.assign({},t.textures[n].image);this.textures[n].source=new uo(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qn=class extends bh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Ol=class extends Cn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=en,this.minFilter=en,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eh=class extends Cn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=en,this.minFilter=en,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kh=class kh{constructor(t,n,i,a,s,r,o,l,c,f,p,u,d,_,b,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,f,p,u,d,_,b,g)}set(t,n,i,a,s,r,o,l,c,f,p,u,d,_,b,g){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=f,h[10]=p,h[14]=u,h[3]=d,h[7]=_,h[11]=b,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kh().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,a=1/jr.setFromMatrixColumn(t,0).length(),s=1/jr.setFromMatrixColumn(t,1).length(),r=1/jr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),f=Math.cos(s),p=Math.sin(s);if(t.order==="XYZ"){let u=r*f,d=r*p,_=o*f,b=o*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=d+_*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=_+d*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*f,d=l*p,_=c*f,b=c*p;n[0]=u+b*o,n[4]=_*o-d,n[8]=r*c,n[1]=r*p,n[5]=r*f,n[9]=-o,n[2]=d*o-_,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*f,d=l*p,_=c*f,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=_+d*o,n[1]=d+_*o,n[5]=r*f,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*f,d=r*p,_=o*f,b=o*p;n[0]=l*f,n[4]=_*c-d,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=d*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,d=r*c,_=o*l,b=o*c;n[0]=l*f,n[4]=b-u*p,n[8]=_*p+d,n[1]=p,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=d*p+_,n[10]=u-b*p}else if(t.order==="XZY"){let u=r*l,d=r*c,_=o*l,b=o*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=u*p+b,n[5]=r*f,n[9]=d*p-_,n[2]=_*p-d,n[6]=o*f,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(IT,t,PT)}lookAt(t,n,i){let a=this.elements;return Hn.subVectors(t,n),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),Qa.crossVectors(i,Hn),Qa.lengthSq()===0&&(Math.abs(i.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),Qa.crossVectors(i,Hn)),Qa.normalize(),Hu.crossVectors(Hn,Qa),a[0]=Qa.x,a[4]=Hu.x,a[8]=Hn.x,a[1]=Qa.y,a[5]=Hu.y,a[9]=Hn.y,a[2]=Qa.z,a[6]=Hu.z,a[10]=Hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],p=i[5],u=i[9],d=i[13],_=i[2],b=i[6],g=i[10],h=i[14],x=i[3],S=i[7],m=i[11],E=i[15],w=a[0],C=a[4],y=a[8],A=a[12],R=a[1],D=a[5],I=a[9],Y=a[13],K=a[2],F=a[6],W=a[10],H=a[14],Q=a[3],tt=a[7],ut=a[11],ht=a[15];return s[0]=r*w+o*R+l*K+c*Q,s[4]=r*C+o*D+l*F+c*tt,s[8]=r*y+o*I+l*W+c*ut,s[12]=r*A+o*Y+l*H+c*ht,s[1]=f*w+p*R+u*K+d*Q,s[5]=f*C+p*D+u*F+d*tt,s[9]=f*y+p*I+u*W+d*ut,s[13]=f*A+p*Y+u*H+d*ht,s[2]=_*w+b*R+g*K+h*Q,s[6]=_*C+b*D+g*F+h*tt,s[10]=_*y+b*I+g*W+h*ut,s[14]=_*A+b*Y+g*H+h*ht,s[3]=x*w+S*R+m*K+E*Q,s[7]=x*C+S*D+m*F+E*tt,s[11]=x*y+S*I+m*W+E*ut,s[15]=x*A+S*Y+m*H+E*ht,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],f=t[2],p=t[6],u=t[10],d=t[14],_=t[3],b=t[7],g=t[11],h=t[15],x=l*d-c*u,S=o*d-c*p,m=o*u-l*p,E=r*d-c*f,w=r*u-l*f,C=r*p-o*f;return n*(b*x-g*S+h*m)-i*(_*x-g*E+h*w)+a*(_*S-b*E+h*C)-s*(_*m-b*w+g*C)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],a=t[8],s=t[1],r=t[5],o=t[9],l=t[2],c=t[6],f=t[10];return n*(r*f-o*c)-i*(s*f-o*l)+a*(s*c-r*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],p=t[9],u=t[10],d=t[11],_=t[12],b=t[13],g=t[14],h=t[15],x=n*o-i*r,S=n*l-a*r,m=n*c-s*r,E=i*l-a*o,w=i*c-s*o,C=a*c-s*l,y=f*b-p*_,A=f*g-u*_,R=f*h-d*_,D=p*g-u*b,I=p*h-d*b,Y=u*h-d*g,K=x*Y-S*I+m*D+E*R-w*A+C*y;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/K;return t[0]=(o*Y-l*I+c*D)*F,t[1]=(a*I-i*Y-s*D)*F,t[2]=(b*C-g*w+h*E)*F,t[3]=(u*w-p*C-d*E)*F,t[4]=(l*R-r*Y-c*A)*F,t[5]=(n*Y-a*R+s*A)*F,t[6]=(g*m-_*C-h*S)*F,t[7]=(f*C-u*m+d*S)*F,t[8]=(r*I-o*R+c*y)*F,t[9]=(i*R-n*I-s*y)*F,t[10]=(_*w-b*m+h*x)*F,t[11]=(p*m-f*w-d*x)*F,t[12]=(o*A-r*D-l*y)*F,t[13]=(n*D-i*A+a*y)*F,t[14]=(b*S-_*E-g*x)*F,t[15]=(f*E-p*S+u*x)*F,this}scale(t){let n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,f=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,f*o+i,f*l-a*r,0,c*l-a*o,f*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){let a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,f=r+r,p=o+o,u=s*c,d=s*f,_=s*p,b=r*f,g=r*p,h=o*p,x=l*c,S=l*f,m=l*p,E=i.x,w=i.y,C=i.z;return a[0]=(1-(b+h))*E,a[1]=(d+m)*E,a[2]=(_-S)*E,a[3]=0,a[4]=(d-m)*w,a[5]=(1-(u+h))*w,a[6]=(g+x)*w,a[7]=0,a[8]=(_+S)*C,a[9]=(g-x)*C,a[10]=(1-(u+b))*C,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){let a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=jr.set(a[0],a[1],a[2]).length(),o=jr.set(a[4],a[5],a[6]).length(),l=jr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),mi.copy(this);let c=1/r,f=1/o,p=1/l;return mi.elements[0]*=c,mi.elements[1]*=c,mi.elements[2]*=c,mi.elements[4]*=f,mi.elements[5]*=f,mi.elements[6]*=f,mi.elements[8]*=p,mi.elements[9]*=p,mi.elements[10]*=p,n.setFromRotationMatrix(mi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,a,s,r,o=_i,l=!1){let c=this.elements,f=2*s/(n-t),p=2*s/(i-a),u=(n+t)/(n-t),d=(i+a)/(i-a),_,b;if(l)_=s/(r-s),b=r*s/(r-s);else if(o===_i)_=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===Nl)_=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=_i,l=!1){let c=this.elements,f=2/(n-t),p=2/(i-a),u=-(n+t)/(n-t),d=-(i+a)/(i-a),_,b;if(l)_=1/(r-s),b=r/(r-s);else if(o===_i)_=-2/(r-s),b=-(r+s)/(r-s);else if(o===Nl)_=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};kh.prototype.isMatrix4=!0;var Ne=kh,jr=new P,mi=new Ne,IT=new P(0,0,0),PT=new P(1,1,1),Qa=new P,Hu=new P,Hn=new P,AS=new Ne,wS=new zi,Fi=class e{constructor(t=0,n=0,i=0,a=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],f=a[9],p=a[2],u=a[6],d=a[10];switch(n){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Qt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return AS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(AS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return wS.setFromEuler(this),this.setFromQuaternion(wS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fi.DEFAULT_ORDER="XYZ";var Il=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},BT=0,CS=new P,Qr=new zi,ha=new Ne,ku=new P,Tl=new P,zT=new P,FT=new zi,RS=new P(1,0,0),DS=new P(0,1,0),US=new P(0,0,1),NS={type:"added"},VT={type:"removed"},$r={type:"childadded",child:null},Gm={type:"childremoved",child:null},ci=class e extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:BT++}),this.uuid=tc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new P,n=new Fi,i=new zi,a=new P(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Lt}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Qr.setFromAxisAngle(t,n),this.quaternion.multiply(Qr),this}rotateOnWorldAxis(t,n){return Qr.setFromAxisAngle(t,n),this.quaternion.premultiply(Qr),this}rotateX(t){return this.rotateOnAxis(RS,t)}rotateY(t){return this.rotateOnAxis(DS,t)}rotateZ(t){return this.rotateOnAxis(US,t)}translateOnAxis(t,n){return CS.copy(t).applyQuaternion(this.quaternion),this.position.add(CS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(RS,t)}translateY(t){return this.translateOnAxis(DS,t)}translateZ(t){return this.translateOnAxis(US,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ha.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?ku.copy(t):ku.set(t,n,i);let a=this.parent;this.updateWorldMatrix(!0,!1),Tl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ha.lookAt(Tl,ku,this.up):ha.lookAt(ku,Tl,this.up),this.quaternion.setFromRotationMatrix(ha),a&&(ha.extractRotation(a.matrixWorld),Qr.setFromRotationMatrix(ha),this.quaternion.premultiply(Qr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Nt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(NS),$r.child=t,this.dispatchEvent($r),$r.child=null):Nt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(VT),Gm.child=t,this.dispatchEvent(Gm),Gm.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ha.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ha.multiply(t.parent.matrixWorld)),t.applyMatrix4(ha),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(NS),$r.child=t,this.dispatchEvent($r),$r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tl,t,zT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tl,FT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,a=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let p=l[c];s(t.shapes,p)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),f=r(t.images),p=r(t.shapes),u=r(t.skeletons),d=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){let l=[];for(let c in o){let f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let a=t.children[i];this.add(a.clone())}return this}};ci.DEFAULT_UP=new P(0,1,0);ci.DEFAULT_MATRIX_AUTO_UPDATE=!0;ci.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Hs=class extends ci{constructor(){super(),this.isGroup=!0,this.type="Group"}},GT={type:"move"},ho=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let g=n.getJointPose(b,i),h=this._getHandJoint(c,b);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=f.position.distanceTo(p.position),d=.02,_=.005;c.inputState.pinching&&u>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(GT)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Hs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},MM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$a={h:0,s:0,l:0},Xu={h:0,s:0,l:0};function Hm(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Gt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Xn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=Kt.workingColorSpace){if(t=UT(t,1),n=Qt(n,0,1),i=Qt(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Hm(r,s,t+1/3),this.g=Hm(r,s,t),this.b=Hm(r,s,t-1/3)}return Kt.colorSpaceToWorking(this,a),this}setStyle(t,n=Xn){function i(s){s!==void 0&&parseFloat(s)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Rt("Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Xn){let i=MM[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ga(t.r),this.g=ga(t.g),this.b=ga(t.b),this}copyLinearToSRGB(t){return this.r=lo(t.r),this.g=lo(t.g),this.b=lo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xn){return Kt.workingToColorSpace(fn.copy(this),t),Math.round(Qt(fn.r*255,0,255))*65536+Math.round(Qt(fn.g*255,0,255))*256+Math.round(Qt(fn.b*255,0,255))}getHexString(t=Xn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(fn.copy(this),n);let i=fn.r,a=fn.g,s=fn.b,r=Math.max(i,a,s),o=Math.min(i,a,s),l,c,f=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=f<=.5?p/(r+o):p/(2-r-o),r){case i:l=(a-s)/p+(a<s?6:0);break;case a:l=(s-i)/p+2;break;case s:l=(i-a)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(fn.copy(this),n),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=Xn){Kt.workingToColorSpace(fn.copy(this),t);let n=fn.r,i=fn.g,a=fn.b;return t!==Xn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL($a),this.setHSL($a.h+t,$a.s+n,$a.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL($a),t.getHSL(Xu);let i=Pm($a.h,Xu.h,n),a=Pm($a.s,Xu.s,n),s=Pm($a.l,Xu.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new Gt;Gt.NAMES=MM;var Pl=class extends ci{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}},gi=new P,fa=new P,km=new P,da=new P,to=new P,eo=new P,LS=new P,Xm=new P,Wm=new P,qm=new P,Ym=new ve,Zm=new ve,Jm=new ve,as=class e{constructor(t=new P,n=new P,i=new P){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),gi.subVectors(t,n),a.cross(gi);let s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){gi.subVectors(a,n),fa.subVectors(i,n),km.subVectors(t,n);let r=gi.dot(gi),o=gi.dot(fa),l=gi.dot(km),c=fa.dot(fa),f=fa.dot(km),p=r*c-o*o;if(p===0)return s.set(0,0,0),null;let u=1/p,d=(c*l-o*f)*u,_=(r*f-o*l)*u;return s.set(1-d-_,_,d)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,da)===null?!1:da.x>=0&&da.y>=0&&da.x+da.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,da)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,da.x),l.addScaledVector(r,da.y),l.addScaledVector(o,da.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return Ym.setScalar(0),Zm.setScalar(0),Jm.setScalar(0),Ym.fromBufferAttribute(t,n),Zm.fromBufferAttribute(t,i),Jm.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(Ym,s.x),r.addScaledVector(Zm,s.y),r.addScaledVector(Jm,s.z),r}static isFrontFacing(t,n,i,a){return gi.subVectors(i,n),fa.subVectors(t,n),gi.cross(fa).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gi.subVectors(this.c,this.b),fa.subVectors(this.a,this.b),gi.cross(fa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return e.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,a=this.b,s=this.c,r,o;to.subVectors(a,i),eo.subVectors(s,i),Xm.subVectors(t,i);let l=to.dot(Xm),c=eo.dot(Xm);if(l<=0&&c<=0)return n.copy(i);Wm.subVectors(t,a);let f=to.dot(Wm),p=eo.dot(Wm);if(f>=0&&p<=f)return n.copy(a);let u=l*p-f*c;if(u<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(to,r);qm.subVectors(t,s);let d=to.dot(qm),_=eo.dot(qm);if(_>=0&&d<=_)return n.copy(s);let b=d*c-l*_;if(b<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(eo,o);let g=f*_-d*p;if(g<=0&&p-f>=0&&d-_>=0)return LS.subVectors(s,a),o=(p-f)/(p-f+(d-_)),n.copy(a).addScaledVector(LS,o);let h=1/(g+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(to,r).addScaledVector(eo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},rs=class{constructor(t=new P(1/0,1/0,1/0),n=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(vi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(vi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=vi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,vi):vi.fromBufferAttribute(s,r),vi.applyMatrix4(t.matrixWorld),this.expandByPoint(vi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wu.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wu.copy(i.boundingBox)),Wu.applyMatrix4(t.matrixWorld),this.union(Wu)}let a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vi),vi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Al),qu.subVectors(this.max,Al),no.subVectors(t.a,Al),io.subVectors(t.b,Al),ao.subVectors(t.c,Al),ts.subVectors(io,no),es.subVectors(ao,io),Bs.subVectors(no,ao);let n=[0,-ts.z,ts.y,0,-es.z,es.y,0,-Bs.z,Bs.y,ts.z,0,-ts.x,es.z,0,-es.x,Bs.z,0,-Bs.x,-ts.y,ts.x,0,-es.y,es.x,0,-Bs.y,Bs.x,0];return!Km(n,no,io,ao,qu)||(n=[1,0,0,0,1,0,0,0,1],!Km(n,no,io,ao,qu))?!1:(Yu.crossVectors(ts,es),n=[Yu.x,Yu.y,Yu.z],Km(n,no,io,ao,qu))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},pa=[new P,new P,new P,new P,new P,new P,new P,new P],vi=new P,Wu=new rs,no=new P,io=new P,ao=new P,ts=new P,es=new P,Bs=new P,Al=new P,qu=new P,Yu=new P,zs=new P;function Km(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){zs.fromArray(e,s);let o=a.x*Math.abs(zs.x)+a.y*Math.abs(zs.y)+a.z*Math.abs(zs.z),l=t.dot(zs),c=n.dot(zs),f=i.dot(zs);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}var qe=new P,Zu=new $t,HT=0,Wn=class extends Bi{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:HT++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=c0,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Zu.fromBufferAttribute(this,n),Zu.applyMatrix3(t),this.setXY(n,Zu.x,Zu.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyMatrix3(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyMatrix4(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyNormalMatrix(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.transformDirection(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=El(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=An(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=El(n,this.array)),n}setX(t,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=El(n,this.array)),n}setY(t,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=El(n,this.array)),n}setZ(t,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=El(n,this.array)),n}setW(t,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=An(n,this.array),i=An(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=An(n,this.array),i=An(i,this.array),a=An(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=An(n,this.array),i=An(i,this.array),a=An(a,this.array),s=An(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==c0&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var Bl=class extends Wn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var zl=class extends Wn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var li=class extends Wn{constructor(t,n,i){super(new Float32Array(t),n,i)}},kT=new rs,wl=new P,jm=new P,fo=class{constructor(t=new P,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):kT.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wl.subVectors(t,this.center);let n=wl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(wl,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jm.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wl.copy(t.center).add(jm)),this.expandByPoint(wl.copy(t.center).sub(jm))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},XT=0,oi=new Ne,Qm=new ci,so=new P,kn=new rs,Cl=new rs,tn=new P,Vi=class e extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:XT++}),this.uuid=tc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(RT(t)?zl:Bl)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Lt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return oi.makeRotationFromQuaternion(t),this.applyMatrix4(oi),this}rotateX(t){return oi.makeRotationX(t),this.applyMatrix4(oi),this}rotateY(t){return oi.makeRotationY(t),this.applyMatrix4(oi),this}rotateZ(t){return oi.makeRotationZ(t),this.applyMatrix4(oi),this}translate(t,n,i){return oi.makeTranslation(t,n,i),this.applyMatrix4(oi),this}scale(t,n,i){return oi.makeScale(t,n,i),this.applyMatrix4(oi),this}lookAt(t){return Qm.lookAt(t),Qm.updateMatrix(),this.applyMatrix4(Qm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(so).negate(),this.translate(so.x,so.y,so.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let a=0,s=t.length;a<s;a++){let r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new li(i,3))}else{let i=Math.min(t.length,n.count);for(let a=0;a<i;a++){let s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){let s=n[i];kn.setFromBufferAttribute(s),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fo);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(kn.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){let o=n[s];Cl.setFromBufferAttribute(o),this.morphTargetsRelative?(tn.addVectors(kn.min,Cl.min),kn.expandByPoint(tn),tn.addVectors(kn.max,Cl.max),kn.expandByPoint(tn)):(kn.expandByPoint(Cl.min),kn.expandByPoint(Cl.max))}kn.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)tn.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(tn));if(n)for(let s=0,r=n.length;s<r;s++){let o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)tn.fromBufferAttribute(o,c),l&&(so.fromBufferAttribute(t,c),tn.add(so)),a=Math.max(a,i.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,a=n.normal,s=n.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new P,l[y]=new P;let c=new P,f=new P,p=new P,u=new $t,d=new $t,_=new $t,b=new P,g=new P;function h(y,A,R){c.fromBufferAttribute(i,y),f.fromBufferAttribute(i,A),p.fromBufferAttribute(i,R),u.fromBufferAttribute(s,y),d.fromBufferAttribute(s,A),_.fromBufferAttribute(s,R),f.sub(c),p.sub(c),d.sub(u),_.sub(u);let D=1/(d.x*_.y-_.x*d.y);isFinite(D)&&(b.copy(f).multiplyScalar(_.y).addScaledVector(p,-d.y).multiplyScalar(D),g.copy(p).multiplyScalar(d.x).addScaledVector(f,-_.x).multiplyScalar(D),o[y].add(b),o[A].add(b),o[R].add(b),l[y].add(g),l[A].add(g),l[R].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let y=0,A=x.length;y<A;++y){let R=x[y],D=R.start,I=R.count;for(let Y=D,K=D+I;Y<K;Y+=3)h(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}let S=new P,m=new P,E=new P,w=new P;function C(y){E.fromBufferAttribute(a,y),w.copy(E);let A=o[y];S.copy(A),S.sub(E.multiplyScalar(E.dot(A))).normalize(),m.crossVectors(w,A);let D=m.dot(l[y])<0?-1:1;r.setXYZW(y,S.x,S.y,S.z,D)}for(let y=0,A=x.length;y<A;++y){let R=x[y],D=R.start,I=R.count;for(let Y=D,K=D+I;Y<K;Y+=3)C(t.getX(Y+0)),C(t.getX(Y+1)),C(t.getX(Y+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Wn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let a=new P,s=new P,r=new P,o=new P,l=new P,c=new P,f=new P,p=new P;if(t)for(let u=0,d=t.count;u<d;u+=3){let _=t.getX(u+0),b=t.getX(u+1),g=t.getX(u+2);a.fromBufferAttribute(n,_),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,g),f.subVectors(r,s),p.subVectors(a,s),f.cross(p),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,g),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=n.count;u<d;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),f.subVectors(r,s),p.subVectors(a,s),f.cross(p),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)tn.fromBufferAttribute(t,n),tn.normalize(),t.setXYZ(n,tn.x,tn.y,tn.z)}toNonIndexed(){function t(o,l){let c=o.array,f=o.itemSize,p=o.normalized,u=new c.constructor(l.length*f),d=0,_=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?d=l[b]*o.data.stride+o.offset:d=l[b]*f;for(let h=0;h<f;h++)u[_++]=c[d++]}return new Wn(u,f,p)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,a=this.attributes;for(let o in a){let l=a[o],c=t(l,i);n.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let f=0,p=c.length;f<p;f++){let u=c[f],d=t(u,i);l.push(d)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let a={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let p=0,u=c.length;p<u;p++){let d=c[p];f.push(d.toJSON(t.data))}f.length>0&&(a[l]=f,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let a=t.attributes;for(let c in a){let f=a[c];this.setAttribute(c,f.clone(n))}let s=t.morphAttributes;for(let c in s){let f=[],p=s[c];for(let u=0,d=p.length;u<d;u++)f.push(p[u].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,f=r.length;c<f;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var WT=0,qs=class extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=tc(),this.name="",this.type="Material",this.blending=Xs,this.side=va,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ch,this.blendDst=uh,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Rt(`Material: parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){Rt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(i.blending=this.blending),this.side!==va&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ch&&(i.blendSrc=this.blendSrc),this.blendDst!==uh&&(i.blendDst=this.blendDst),this.blendEquation!==ss&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==l0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){let r=[];for(let o in s){let l=s[o];delete l.metadata,r.push(l)}return r}if(n){let s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $t().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ma=new P,$m=new P,Ju=new P,ns=new P,t0=new P,Ku=new P,e0=new P,Th=class{constructor(t=new P,n=new P(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ma)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=ma.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ma.copy(this.origin).addScaledVector(this.direction,n),ma.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){$m.copy(t).add(n).multiplyScalar(.5),Ju.copy(n).sub(t).normalize(),ns.copy(this.origin).sub($m);let s=t.distanceTo(n)*.5,r=-this.direction.dot(Ju),o=ns.dot(this.direction),l=-ns.dot(Ju),c=ns.lengthSq(),f=Math.abs(1-r*r),p,u,d,_;if(f>0)if(p=r*l-o,u=r*o-l,_=s*f,p>=0)if(u>=-_)if(u<=_){let b=1/f;p*=b,u*=b,d=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u<=-_?(p=Math.max(0,-(-r*s+o)),u=p>0?-s:Math.min(Math.max(-s,-l),s),d=-p*p+u*(u+2*l)+c):u<=_?(p=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(p=Math.max(0,-(r*s+o)),u=p>0?s:Math.min(Math.max(-s,-l),s),d=-p*p+u*(u+2*l)+c);else u=r>0?-s:s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),a&&a.copy($m).addScaledVector(Ju,u),d}intersectSphere(t,n){ma.subVectors(t.center,this.origin);let i=ma.dot(this.direction),a=ma.dot(ma)-i*i,s=t.radius*t.radius;if(a>s)return null;let r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l,c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),f>=0?(s=(t.min.y-u.y)*f,r=(t.max.y-u.y)*f):(s=(t.max.y-u.y)*f,r=(t.min.y-u.y)*f),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,ma)!==null}intersectTriangle(t,n,i,a,s){t0.subVectors(n,t),Ku.subVectors(i,t),e0.crossVectors(t0,Ku);let r=this.direction.dot(e0),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ns.subVectors(this.origin,t);let l=o*this.direction.dot(Ku.crossVectors(ns,Ku));if(l<0)return null;let c=o*this.direction.dot(t0.cross(ns));if(c<0||l+c>r)return null;let f=-o*ns.dot(e0);return f<0?null:this.at(f/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fl=class extends qs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=g0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},OS=new Ne,Fs=new Th,ju=new fo,IS=new P,Qu=new P,$u=new P,th=new P,n0=new P,eh=new P,PS=new P,nh=new P,Rn=class extends ci{constructor(t=new Vi,n=new Fl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){let i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);let o=this.morphTargetInfluences;if(s&&o){eh.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let f=o[l],p=s[l];f!==0&&(n0.fromBufferAttribute(p,t),r?eh.addScaledVector(n0,f):eh.addScaledVector(n0.sub(n),f))}n.add(eh)}return n}raycast(t,n){let i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ju.copy(i.boundingSphere),ju.applyMatrix4(s),Fs.copy(t.ray).recast(t.near),!(ju.containsPoint(Fs.origin)===!1&&(Fs.intersectSphere(ju,IS)===null||Fs.origin.distanceToSquared(IS)>(t.far-t.near)**2))&&(OS.copy(s).invert(),Fs.copy(t.ray).applyMatrix4(OS),!(i.boundingBox!==null&&Fs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Fs)))}_computeIntersections(t,n,i){let a,s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,b=u.length;_<b;_++){let g=u[_],h=r[g.materialIndex],x=Math.max(g.start,d.start),S=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let m=x,E=S;m<E;m+=3){let w=o.getX(m),C=o.getX(m+1),y=o.getX(m+2);a=ih(this,h,t,i,c,f,p,w,C,y),a&&(a.faceIndex=Math.floor(m/3),a.face.materialIndex=g.materialIndex,n.push(a))}}else{let _=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let g=_,h=b;g<h;g+=3){let x=o.getX(g),S=o.getX(g+1),m=o.getX(g+2);a=ih(this,r,t,i,c,f,p,x,S,m),a&&(a.faceIndex=Math.floor(g/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,b=u.length;_<b;_++){let g=u[_],h=r[g.materialIndex],x=Math.max(g.start,d.start),S=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let m=x,E=S;m<E;m+=3){let w=m,C=m+1,y=m+2;a=ih(this,h,t,i,c,f,p,w,C,y),a&&(a.faceIndex=Math.floor(m/3),a.face.materialIndex=g.materialIndex,n.push(a))}}else{let _=Math.max(0,d.start),b=Math.min(l.count,d.start+d.count);for(let g=_,h=b;g<h;g+=3){let x=g,S=g+1,m=g+2;a=ih(this,r,t,i,c,f,p,x,S,m),a&&(a.faceIndex=Math.floor(g/3),n.push(a))}}}};function qT(e,t,n,i,a,s,r,o){let l;if(t.side===_n?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===va,o),l===null)return null;nh.copy(o),nh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(nh);return c<n.near||c>n.far?null:{distance:c,point:nh.clone(),object:e}}function ih(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,Qu),e.getVertexPosition(l,$u),e.getVertexPosition(c,th);let f=qT(e,t,n,i,Qu,$u,th,PS);if(f){let p=new P;as.getBarycoord(PS,Qu,$u,th,p),a&&(f.uv=as.getInterpolatedAttribute(a,o,l,c,p,new $t)),s&&(f.uv1=as.getInterpolatedAttribute(s,o,l,c,p,new $t)),r&&(f.normal=as.getInterpolatedAttribute(r,o,l,c,p,new P),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};as.getNormal(Qu,$u,th,u.normal),f.face=u,f.barycoord=p}return f}var Ah=class extends Cn{constructor(t=null,n=1,i=1,a,s,r,o,l,c=en,f=en,p,u){super(null,r,o,l,c,f,a,s,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var i0=new P,YT=new P,ZT=new Lt,Oi=class{constructor(t=new P(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let a=i0.subVectors(i,n).cross(YT.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let a=t.delta(i0),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(a,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||ZT.getNormalMatrix(t),a=this.coplanarPoint(i0).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vs=new fo,JT=new $t(.5,.5),ah=new P,Vl=class{constructor(t=new Oi,n=new Oi,i=new Oi,a=new Oi,s=new Oi,r=new Oi){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=_i,i=!1){let a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],f=s[4],p=s[5],u=s[6],d=s[7],_=s[8],b=s[9],g=s[10],h=s[11],x=s[12],S=s[13],m=s[14],E=s[15];if(a[0].setComponents(c-r,d-f,h-_,E-x).normalize(),a[1].setComponents(c+r,d+f,h+_,E+x).normalize(),a[2].setComponents(c+o,d+p,h+b,E+S).normalize(),a[3].setComponents(c-o,d-p,h-b,E-S).normalize(),i)a[4].setComponents(l,u,g,m).normalize(),a[5].setComponents(c-l,d-u,h-g,E-m).normalize();else if(a[4].setComponents(c-l,d-u,h-g,E-m).normalize(),n===_i)a[5].setComponents(c+l,d+u,h+g,E+m).normalize();else if(n===Nl)a[5].setComponents(l,u,g,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vs)}intersectsSprite(t){Vs.center.set(0,0,0);let n=JT.distanceTo(t.center);return Vs.radius=.7071067811865476+n,Vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vs)}intersectsSphere(t){let n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let a=n[i];if(ah.x=a.normal.x>0?t.max.x:t.min.x,ah.y=a.normal.y>0?t.max.y:t.min.y,ah.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(ah)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Gl=class extends Cn{constructor(t=[],n=us,i,a,s,r,o,l,c,f){super(t,n,i,a,s,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var _a=class extends Cn{constructor(t,n,i=yi,a,s,r,o=en,l=en,c,f=Pi,p=1){if(f!==Pi&&f!==fs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,a,s,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new uo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},wh=class extends _a{constructor(t,n=yi,i=us,a,s,r=en,o=en,l,c=Pi){let f={width:t,height:t,depth:1},p=[f,f,f,f,f,f];super(t,t,n,i,a,s,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hl=class extends Cn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},po=class e extends Vi{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};let o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);let l=[],c=[],f=[],p=[],u=0,d=0;_("z","y","x",-1,-1,i,n,t,r,s,0),_("z","y","x",1,-1,i,n,-t,r,s,1),_("x","z","y",1,1,t,i,n,a,r,2),_("x","z","y",1,-1,t,i,-n,a,r,3),_("x","y","z",1,-1,t,n,i,a,s,4),_("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new li(c,3)),this.setAttribute("normal",new li(f,3)),this.setAttribute("uv",new li(p,2));function _(b,g,h,x,S,m,E,w,C,y,A){let R=m/C,D=E/y,I=m/2,Y=E/2,K=w/2,F=C+1,W=y+1,H=0,Q=0,tt=new P;for(let ut=0;ut<W;ut++){let ht=ut*D-Y;for(let _t=0;_t<F;_t++){let ne=_t*R-I;tt[b]=ne*x,tt[g]=ht*S,tt[h]=K,c.push(tt.x,tt.y,tt.z),tt[b]=0,tt[g]=0,tt[h]=w>0?1:-1,f.push(tt.x,tt.y,tt.z),p.push(_t/C),p.push(1-ut/y),H+=1}}for(let ut=0;ut<y;ut++)for(let ht=0;ht<C;ht++){let _t=u+ht+F*ut,ne=u+ht+F*(ut+1),de=u+(ht+1)+F*(ut+1),te=u+(ht+1)+F*ut;l.push(_t,ne,te),l.push(ne,de,te),Q+=6}o.addGroup(d,Q,A),d+=Q,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ys=class e extends Vi{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};let s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,f=l+1,p=t/o,u=n/l,d=[],_=[],b=[],g=[];for(let h=0;h<f;h++){let x=h*u-r;for(let S=0;S<c;S++){let m=S*p-s;_.push(m,-x,0),b.push(0,0,1),g.push(S/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let x=0;x<o;x++){let S=x+c*h,m=x+c*(h+1),E=x+1+c*(h+1),w=x+1+c*h;d.push(S,m,w),d.push(m,E,w)}this.setIndex(d),this.setAttribute("position",new li(_,3)),this.setAttribute("normal",new li(b,3)),this.setAttribute("uv",new li(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ks(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let a=e[n][i];if(BS(a))a.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone();else if(Array.isArray(a))if(BS(a[0])){let s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();t[n][i]=s}else t[n][i]=a.slice();else t[n][i]=a}}return t}function dn(e){let t={};for(let n=0;n<e.length;n++){let i=Ks(e[n]);for(let a in i)t[a]=i[a]}return t}function BS(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function KT(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function I0(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var bM={clone:Ks,merge:dn},jT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,QT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vn=class extends qs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jT,this.fragmentShader=QT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=KT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let a in this.uniforms){let r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let a=t.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new Gt().setHex(a.value);break;case"v2":this.uniforms[i].value=new $t().fromArray(a.value);break;case"v3":this.uniforms[i].value=new P().fromArray(a.value);break;case"v4":this.uniforms[i].value=new ve().fromArray(a.value);break;case"m3":this.uniforms[i].value=new Lt().fromArray(a.value);break;case"m4":this.uniforms[i].value=new Ne().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ch=class extends vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Rh=class extends qs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Dh=class extends qs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function sh(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}var os=class{constructor(t,n,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,a=n[i],s=n[i-1];t:{e:{let r;n:{i:if(!(t<a)){for(let o=i+2;;){if(a===void 0){if(t<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=a,a=n[++i],t<a)break e}r=n.length;break n}if(!(t>=s)){let o=n[1];t<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(a=s,s=n[--i-1],t>=s)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(a=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,a)}return this.interpolate_(i,s,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,a=this.valueSize,s=t*a;for(let r=0;r!==a;++r)n[r]=i[s+r];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Uh=class extends os{constructor(t,n,i,a){super(t,n,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:s0,endingEnd:s0}}intervalChanged_(t,n,i){let a=this.parameterPositions,s=t-2,r=t+1,o=a[s],l=a[r];if(o===void 0)switch(this.getSettings_().endingStart){case r0:s=t,o=2*n-i;break;case o0:s=a.length-2,o=n+a[s]-a[s+1];break;default:s=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case r0:r=t,l=2*i-n;break;case o0:r=1,l=i+a[1]-a[0];break;default:r=t-1,l=n}let c=(i-n)*.5,f=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=s*f,this._offsetNext=r*f}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,d=this._weightNext,_=(i-n)/(a-n),b=_*_,g=b*_,h=-u*g+2*u*b-u*_,x=(1+u)*g+(-1.5-2*u)*b+(-.5+u)*_+1,S=(-1-d)*g+(1.5+d)*b+.5*_,m=d*g-d*b;for(let E=0;E!==o;++E)s[E]=h*r[f+E]+x*r[c+E]+S*r[l+E]+m*r[p+E];return s}},Nh=class extends os{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=(i-n)/(a-n),p=1-f;for(let u=0;u!==o;++u)s[u]=r[c+u]*p+r[l+u]*f;return s}},Lh=class extends os{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},Oh=class extends os{interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this.inTangents,p=this.outTangents;if(!f||!p){let _=(i-n)/(a-n),b=1-_;for(let g=0;g!==o;++g)s[g]=r[c+g]*b+r[l+g]*_;return s}let u=o*2,d=t-1;for(let _=0;_!==o;++_){let b=r[c+_],g=r[l+_],h=d*u+_*2,x=p[h],S=p[h+1],m=t*u+_*2,E=f[m],w=f[m+1],C=(i-n)/(a-n),y,A,R,D,I;for(let Y=0;Y<8;Y++){y=C*C,A=y*C,R=1-C,D=R*R,I=D*R;let F=I*n+3*D*C*x+3*R*y*E+A*a-i;if(Math.abs(F)<1e-10)break;let W=3*D*(x-n)+6*R*C*(E-x)+3*y*(a-E);if(Math.abs(W)<1e-10)break;C=C-F/W,C=Math.max(0,Math.min(1,C))}s[_]=I*b+3*D*C*S+3*R*y*w+A*g}return s}},Yn=class{constructor(t,n,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=sh(n,this.TimeBufferType),this.values=sh(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:sh(t.times,Array),values:sh(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Lh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Nh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Uh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new Oh(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Rl:n=this.InterpolantFactoryMethodDiscrete;break;case yh:n=this.InterpolantFactoryMethodLinear;break;case lh:n=this.InterpolantFactoryMethodSmooth;break;case a0:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Rt("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rl;case this.InterpolantFactoryMethodLinear:return yh;case this.InterpolantFactoryMethodSmooth:return lh;case this.InterpolantFactoryMethodBezier:return a0}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]*=t}return this}trim(t,n){let i=this.times,a=i.length,s=0,r=a-1;for(;s!==a&&i[s]<t;)++s;for(;r!==-1&&i[r]>n;)--r;if(++r,s!==0||r!==a){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=i.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Nt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,s=i.length;s===0&&(Nt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Nt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Nt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(a!==void 0&&DT(a))for(let o=0,l=a.length;o!==l;++o){let c=a[o];if(isNaN(c)){Nt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===lh,s=t.length-1,r=1;for(let o=1;o<s;++o){let l=!1,c=t[o],f=t[o+1];if(c!==f&&(o!==1||c!==t[0]))if(a)l=!0;else{let p=o*i,u=p-i,d=p+i;for(let _=0;_!==i;++_){let b=n[p+_];if(b!==n[u+_]||b!==n[d+_]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let d=0;d!==i;++d)n[u+d]=n[p+d]}++r}}if(s>0){t[r]=t[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,a=new i(this.name,t,n);return a.createInterpolant=this.createInterpolant,a}};Yn.prototype.ValueTypeName="";Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=yh;var ls=class extends Yn{constructor(t,n,i){super(t,n,i)}};ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=Rl;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;var Ih=class extends Yn{constructor(t,n,i,a){super(t,n,i,a)}};Ih.prototype.ValueTypeName="color";var Ph=class extends Yn{constructor(t,n,i,a){super(t,n,i,a)}};Ph.prototype.ValueTypeName="number";var Bh=class extends os{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(a-n),c=t*o;for(let f=c+o;c!==f;c+=4)zi.slerpFlat(s,0,r,c-o,r,c,l);return s}},kl=class extends Yn{constructor(t,n,i,a){super(t,n,i,a)}InterpolantFactoryMethodLinear(t){return new Bh(this.times,this.values,this.getValueSize(),t)}};kl.prototype.ValueTypeName="quaternion";kl.prototype.InterpolantFactoryMethodSmooth=void 0;var cs=class extends Yn{constructor(t,n,i){super(t,n,i)}};cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=Rl;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var zh=class extends Yn{constructor(t,n,i,a){super(t,n,i,a)}};zh.prototype.ValueTypeName="vector";var Fh=class{constructor(t,n,i){let a=this,s=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(f){o++,s===!1&&a.onStart!==void 0&&a.onStart(f,r,o),s=!0},this.itemEnd=function(f){r++,a.onProgress!==void 0&&a.onProgress(f,r,o),r===o&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(f){a.onError!==void 0&&a.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,p){return c.push(f,p),this},this.removeHandler=function(f){let p=c.indexOf(f);return p!==-1&&c.splice(p,2),this},this.getHandler=function(f){for(let p=0,u=c.length;p<u;p+=2){let d=c[p],_=c[p+1];if(d.global&&(d.lastIndex=0),d.test(f))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},EM=new Fh,Vh=class{constructor(t){this.manager=t!==void 0?t:EM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(a,s){i.load(t,a,n,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Vh.DEFAULT_MATERIAL_NAME="__DEFAULT";var rh=new P,oh=new zi,Li=new P,Xl=class extends ci{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=_i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(rh,oh,Li),Li.x===1&&Li.y===1&&Li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rh,oh,Li.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(rh,oh,Li),Li.x===1&&Li.y===1&&Li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rh,oh,Li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},is=new P,zS=new $t,FS=new $t,wn=class extends Xl{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Sh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Im*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sh*2*Math.atan(Math.tan(Im*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(is.x,is.y).multiplyScalar(-t/is.z),is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(is.x,is.y).multiplyScalar(-t/is.z)}getViewSize(t,n){return this.getViewBounds(t,zS,FS),n.subVectors(FS,zS)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Im*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var Zs=class extends Xl{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var ro=-90,oo=1,Gh=class extends ci{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new wn(ro,oo,t,n);a.layers=this.layers,this.add(a);let s=new wn(ro,oo,t,n);s.layers=this.layers,this.add(s);let r=new wn(ro,oo,t,n);r.layers=this.layers,this.add(r);let o=new wn(ro,oo,t,n);o.layers=this.layers,this.add(o);let l=new wn(ro,oo,t,n);l.layers=this.layers,this.add(l);let c=new wn(ro,oo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(let c of n)this.remove(c);if(t===_i)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Nl)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,l,c,f]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,f),t.setRenderTarget(p,u,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},Hh=class extends wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var P0="\\[\\]\\.:\\/",$T=new RegExp("["+P0+"]","g"),B0="[^"+P0+"]",tA="[^"+P0.replace("\\.","")+"]",eA=/((?:WC+[\/:])*)/.source.replace("WC",B0),nA=/(WCOD+)?/.source.replace("WCOD",tA),iA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",B0),aA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",B0),sA=new RegExp("^"+eA+nA+iA+aA+"$"),rA=["material","materials","bones","map"],u0=class{constructor(t,n,i){let a=i||Ae.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,a)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,s=i.length;a!==s;++a)i[a].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ae=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($T,"")}static parseTrackName(t){let n=sA.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},a=i.nodeName&&i.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let s=i.nodeName.substring(a+1);rA.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,a),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},a=i(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)t[n++]=i[a]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,a=n.propertyName,s=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===c){c=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[a];if(r===void 0){let c=n.nodeName;Nt("PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=u0;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var CR=new Float32Array(1);var k0=class k0{constructor(t,n,i,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,a){let s=this.elements;return s[0]=t,s[2]=n,s[1]=i,s[3]=a,this}};k0.prototype.isMatrix2=!0;var h0=k0;function z0(e,t,n,i){let a=oA(i);switch(n){case R0:return e*t;case U0:return e*t/a.components*a.byteLength;case jh:return e*t/a.components*a.byteLength;case ds:return e*t*2/a.components*a.byteLength;case Qh:return e*t*2/a.components*a.byteLength;case D0:return e*t*3/a.components*a.byteLength;case hi:return e*t*4/a.components*a.byteLength;case $h:return e*t*4/a.components*a.byteLength;case Zl:case Jl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Kl:case jl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ef:case af:return Math.max(e,16)*Math.max(t,8)/4;case tf:case nf:return Math.max(e,8)*Math.max(t,8)/2;case sf:case rf:case lf:case cf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case of:case Ql:case uf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ff:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case df:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pf:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case mf:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case gf:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case vf:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case _f:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xf:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case yf:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Sf:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Mf:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case bf:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ef:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Tf:case Af:case wf:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Cf:case Rf:return Math.ceil(e/4)*Math.ceil(t/4)*8;case $l:case Df:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function oA(e){switch(e){case Zn:case T0:return{byteLength:1,components:1};case go:case A0:case Hi:return{byteLength:2,components:1};case Jh:case Kh:return{byteLength:2,components:4};case yi:case Zh:case Si:return{byteLength:4,components:1};case w0:case C0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xh}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xh);function YM(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function lA(e){let t=new WeakMap;function n(o,l){let c=o.array,f=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,f),o.onUploadCallback();let d;if(c instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=e.SHORT;else if(c instanceof Uint32Array)d=e.UNSIGNED_INT;else if(c instanceof Int32Array)d=e.INT;else if(c instanceof Int8Array)d=e.BYTE;else if(c instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let f=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,f);else{p.sort((d,_)=>d.start-_.start);let u=0;for(let d=1;d<p.length;d++){let _=p[u],b=p[d];b.start<=_.start+_.count+1?_.count=Math.max(_.count,b.start+b.count-_.start):(++u,p[u]=b)}p.length=u+1;for(let d=0,_=p.length;d<_;d++){let b=p[d];e.bufferSubData(c,b.start*f.BYTES_PER_ELEMENT,f,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var cA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_A=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,SA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,MA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,EA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,TA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,CA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,RA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,DA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,UA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,NA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,LA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,OA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,IA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,PA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,BA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FA="gl_FragColor = linearToOutputTexel( gl_FragColor );",VA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,GA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,HA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,XA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,YA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,JA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$A=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ew=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ow=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,uw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hw=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,fw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_w=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ew=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Aw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ww=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Nw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Lw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ow=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Fw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ww=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,qw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$w=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,t3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,e3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,n3=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,i3=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a3=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,s3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,o3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,l3=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,c3=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u3=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f3=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,g3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,v3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,x3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y3=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S3=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,M3=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,E3=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T3=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A3=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w3=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,C3=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R3=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D3=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,U3=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N3=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L3=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,O3=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I3=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P3=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B3=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F3=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V3=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G3=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:cA,alphahash_pars_fragment:uA,alphamap_fragment:hA,alphamap_pars_fragment:fA,alphatest_fragment:dA,alphatest_pars_fragment:pA,aomap_fragment:mA,aomap_pars_fragment:gA,batching_pars_vertex:vA,batching_vertex:_A,begin_vertex:xA,beginnormal_vertex:yA,bsdfs:SA,iridescence_fragment:MA,bumpmap_pars_fragment:bA,clipping_planes_fragment:EA,clipping_planes_pars_fragment:TA,clipping_planes_pars_vertex:AA,clipping_planes_vertex:wA,color_fragment:CA,color_pars_fragment:RA,color_pars_vertex:DA,color_vertex:UA,common:NA,cube_uv_reflection_fragment:LA,defaultnormal_vertex:OA,displacementmap_pars_vertex:IA,displacementmap_vertex:PA,emissivemap_fragment:BA,emissivemap_pars_fragment:zA,colorspace_fragment:FA,colorspace_pars_fragment:VA,envmap_fragment:GA,envmap_common_pars_fragment:HA,envmap_pars_fragment:kA,envmap_pars_vertex:XA,envmap_physical_pars_fragment:ew,envmap_vertex:WA,fog_vertex:qA,fog_pars_vertex:YA,fog_fragment:ZA,fog_pars_fragment:JA,gradientmap_pars_fragment:KA,lightmap_pars_fragment:jA,lights_lambert_fragment:QA,lights_lambert_pars_fragment:$A,lights_pars_begin:tw,lights_toon_fragment:nw,lights_toon_pars_fragment:iw,lights_phong_fragment:aw,lights_phong_pars_fragment:sw,lights_physical_fragment:rw,lights_physical_pars_fragment:ow,lights_fragment_begin:lw,lights_fragment_maps:cw,lights_fragment_end:uw,lightprobes_pars_fragment:hw,logdepthbuf_fragment:fw,logdepthbuf_pars_fragment:dw,logdepthbuf_pars_vertex:pw,logdepthbuf_vertex:mw,map_fragment:gw,map_pars_fragment:vw,map_particle_fragment:_w,map_particle_pars_fragment:xw,metalnessmap_fragment:yw,metalnessmap_pars_fragment:Sw,morphinstance_vertex:Mw,morphcolor_vertex:bw,morphnormal_vertex:Ew,morphtarget_pars_vertex:Tw,morphtarget_vertex:Aw,normal_fragment_begin:ww,normal_fragment_maps:Cw,normal_pars_fragment:Rw,normal_pars_vertex:Dw,normal_vertex:Uw,normalmap_pars_fragment:Nw,clearcoat_normal_fragment_begin:Lw,clearcoat_normal_fragment_maps:Ow,clearcoat_pars_fragment:Iw,iridescence_pars_fragment:Pw,opaque_fragment:Bw,packing:zw,premultiplied_alpha_fragment:Fw,project_vertex:Vw,dithering_fragment:Gw,dithering_pars_fragment:Hw,roughnessmap_fragment:kw,roughnessmap_pars_fragment:Xw,shadowmap_pars_fragment:Ww,shadowmap_pars_vertex:qw,shadowmap_vertex:Yw,shadowmask_pars_fragment:Zw,skinbase_vertex:Jw,skinning_pars_vertex:Kw,skinning_vertex:jw,skinnormal_vertex:Qw,specularmap_fragment:$w,specularmap_pars_fragment:t3,tonemapping_fragment:e3,tonemapping_pars_fragment:n3,transmission_fragment:i3,transmission_pars_fragment:a3,uv_pars_fragment:s3,uv_pars_vertex:r3,uv_vertex:o3,worldpos_vertex:l3,background_vert:c3,background_frag:u3,backgroundCube_vert:h3,backgroundCube_frag:f3,cube_vert:d3,cube_frag:p3,depth_vert:m3,depth_frag:g3,distance_vert:v3,distance_frag:_3,equirect_vert:x3,equirect_frag:y3,linedashed_vert:S3,linedashed_frag:M3,meshbasic_vert:b3,meshbasic_frag:E3,meshlambert_vert:T3,meshlambert_frag:A3,meshmatcap_vert:w3,meshmatcap_frag:C3,meshnormal_vert:R3,meshnormal_frag:D3,meshphong_vert:U3,meshphong_frag:N3,meshphysical_vert:L3,meshphysical_frag:O3,meshtoon_vert:I3,meshtoon_frag:P3,points_vert:B3,points_frag:z3,shadow_vert:F3,shadow_frag:V3,sprite_vert:G3,sprite_frag:H3},dt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Xi={basic:{uniforms:dn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:dn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:dn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:dn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:dn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:dn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:dn([dt.points,dt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:dn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:dn([dt.common,dt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:dn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:dn([dt.sprite,dt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:dn([dt.common,dt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:dn([dt.lights,dt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Xi.physical={uniforms:dn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Lf={r:0,b:0,g:0},k3=new Ne,ZM=new Lt;ZM.set(-1,0,0,0,1,0,0,0,1);function X3(e,t,n,i,a,s){let r=new Gt(0),o=a===!0?0:1,l,c,f=null,p=0,u=null;function d(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){let m=x.backgroundBlurriness>0;S=t.get(S,m)}return S}function _(x){let S=!1,m=d(x);m===null?g(r,o):m&&m.isColor&&(g(m,1),S=!0);let E=e.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(x,S){let m=d(S);m&&(m.isCubeTexture||m.mapping===ql)?(c===void 0&&(c=new Rn(new po(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Ks(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=m,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(k3.makeRotationFromEuler(S.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ZM),c.material.toneMapped=Kt.getTransfer(m.colorSpace)!==oe,(f!==m||p!==m.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,f=m,p=m.version,u=e.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):m&&m.isTexture&&(l===void 0&&(l=new Rn(new Ys(2,2),new vn({name:"BackgroundMaterial",uniforms:Ks(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:va,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=m,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(m.colorSpace)!==oe,m.matrixAutoUpdate===!0&&m.updateMatrix(),l.material.uniforms.uvTransform.value.copy(m.matrix),(f!==m||p!==m.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,f=m,p=m.version,u=e.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,S){x.getRGB(Lf,I0(e)),n.buffers.color.setClear(Lf.r,Lf.g,Lf.b,S,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,S=1){r.set(x),o=S,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(r,o)},render:_,addToRenderList:b,dispose:h}}function W3(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=u(null),s=a,r=!1;function o(D,I,Y,K,F){let W=!1,H=p(D,K,Y,I);s!==H&&(s=H,c(s.object)),W=d(D,K,Y,F),W&&_(D,K,Y,F),F!==null&&t.update(F,e.ELEMENT_ARRAY_BUFFER),(W||r)&&(r=!1,m(D,I,Y,K),F!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return e.createVertexArray()}function c(D){return e.bindVertexArray(D)}function f(D){return e.deleteVertexArray(D)}function p(D,I,Y,K){let F=K.wireframe===!0,W=i[I.id];W===void 0&&(W={},i[I.id]=W);let H=D.isInstancedMesh===!0?D.id:0,Q=W[H];Q===void 0&&(Q={},W[H]=Q);let tt=Q[Y.id];tt===void 0&&(tt={},Q[Y.id]=tt);let ut=tt[F];return ut===void 0&&(ut=u(l()),tt[F]=ut),ut}function u(D){let I=[],Y=[],K=[];for(let F=0;F<n;F++)I[F]=0,Y[F]=0,K[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:Y,attributeDivisors:K,object:D,attributes:{},index:null}}function d(D,I,Y,K){let F=s.attributes,W=I.attributes,H=0,Q=Y.getAttributes();for(let tt in Q)if(Q[tt].location>=0){let ht=F[tt],_t=W[tt];if(_t===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(_t=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(_t=D.instanceColor)),ht===void 0||ht.attribute!==_t||_t&&ht.data!==_t.data)return!0;H++}return s.attributesNum!==H||s.index!==K}function _(D,I,Y,K){let F={},W=I.attributes,H=0,Q=Y.getAttributes();for(let tt in Q)if(Q[tt].location>=0){let ht=W[tt];ht===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(ht=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(ht=D.instanceColor));let _t={};_t.attribute=ht,ht&&ht.data&&(_t.data=ht.data),F[tt]=_t,H++}s.attributes=F,s.attributesNum=H,s.index=K}function b(){let D=s.newAttributes;for(let I=0,Y=D.length;I<Y;I++)D[I]=0}function g(D){h(D,0)}function h(D,I){let Y=s.newAttributes,K=s.enabledAttributes,F=s.attributeDivisors;Y[D]=1,K[D]===0&&(e.enableVertexAttribArray(D),K[D]=1),F[D]!==I&&(e.vertexAttribDivisor(D,I),F[D]=I)}function x(){let D=s.newAttributes,I=s.enabledAttributes;for(let Y=0,K=I.length;Y<K;Y++)I[Y]!==D[Y]&&(e.disableVertexAttribArray(Y),I[Y]=0)}function S(D,I,Y,K,F,W,H){H===!0?e.vertexAttribIPointer(D,I,Y,F,W):e.vertexAttribPointer(D,I,Y,K,F,W)}function m(D,I,Y,K){b();let F=K.attributes,W=Y.getAttributes(),H=I.defaultAttributeValues;for(let Q in W){let tt=W[Q];if(tt.location>=0){let ut=F[Q];if(ut===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(ut=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(ut=D.instanceColor)),ut!==void 0){let ht=ut.normalized,_t=ut.itemSize,ne=t.get(ut);if(ne===void 0)continue;let de=ne.buffer,te=ne.type,q=ne.bytesPerElement,rt=te===e.INT||te===e.UNSIGNED_INT||ut.gpuType===Zh;if(ut.isInterleavedBufferAttribute){let et=ut.data,Ot=et.stride,It=ut.offset;if(et.isInstancedInterleavedBuffer){for(let Ct=0;Ct<tt.locationSize;Ct++)h(tt.location+Ct,et.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Ct=0;Ct<tt.locationSize;Ct++)g(tt.location+Ct);e.bindBuffer(e.ARRAY_BUFFER,de);for(let Ct=0;Ct<tt.locationSize;Ct++)S(tt.location+Ct,_t/tt.locationSize,te,ht,Ot*q,(It+_t/tt.locationSize*Ct)*q,rt)}else{if(ut.isInstancedBufferAttribute){for(let et=0;et<tt.locationSize;et++)h(tt.location+et,ut.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let et=0;et<tt.locationSize;et++)g(tt.location+et);e.bindBuffer(e.ARRAY_BUFFER,de);for(let et=0;et<tt.locationSize;et++)S(tt.location+et,_t/tt.locationSize,te,ht,_t*q,_t/tt.locationSize*et*q,rt)}}else if(H!==void 0){let ht=H[Q];if(ht!==void 0)switch(ht.length){case 2:e.vertexAttrib2fv(tt.location,ht);break;case 3:e.vertexAttrib3fv(tt.location,ht);break;case 4:e.vertexAttrib4fv(tt.location,ht);break;default:e.vertexAttrib1fv(tt.location,ht)}}}}x()}function E(){A();for(let D in i){let I=i[D];for(let Y in I){let K=I[Y];for(let F in K){let W=K[F];for(let H in W)f(W[H].object),delete W[H];delete K[F]}}delete i[D]}}function w(D){if(i[D.id]===void 0)return;let I=i[D.id];for(let Y in I){let K=I[Y];for(let F in K){let W=K[F];for(let H in W)f(W[H].object),delete W[H];delete K[F]}}delete i[D.id]}function C(D){for(let I in i){let Y=i[I];for(let K in Y){let F=Y[K];if(F[D.id]===void 0)continue;let W=F[D.id];for(let H in W)f(W[H].object),delete W[H];delete F[D.id]}}}function y(D){for(let I in i){let Y=i[I],K=D.isInstancedMesh===!0?D.id:0,F=Y[K];if(F!==void 0){for(let W in F){let H=F[W];for(let Q in H)f(H[Q].object),delete H[Q];delete F[W]}delete Y[K],Object.keys(Y).length===0&&delete i[I]}}}function A(){R(),r=!0,s!==a&&(s=a,c(s.object))}function R(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:g,disableUnusedAttributes:x}}function q3(e,t,n){let i;function a(l){i=l}function s(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,f){f!==0&&(e.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let u=0;for(let d=0;d<f;d++)u+=c[d];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function Y3(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(C){return!(C!==hi&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===Hi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Zn&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Si&&!y)}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",f=l(c);f!==c&&(Rt("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),S=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=e.getParameter(e.MAX_SAMPLES),w=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:_,maxTextureSize:b,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:m,maxSamples:E,samples:w}}function Z3(e){let t=this,n=null,i=0,a=!1,s=!1,r=new Oi,o=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let d=p.length!==0||u||i!==0||a;return a=u,i=p.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){n=f(p,u,0)},this.setState=function(p,u,d){let _=p.clippingPlanes,b=p.clipIntersection,g=p.clipShadows,h=e.get(p);if(!a||_===null||_.length===0||s&&!g)s?f(null):c();else{let x=s?0:i,S=x*4,m=h.clippingState||null;l.value=m,m=f(_,u,S,d);for(let E=0;E!==S;++E)m[E]=n[E];h.clippingState=m,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(p,u,d,_){let b=p!==null?p.length:0,g=null;if(b!==0){if(g=l.value,_!==!0||g===null){let h=d+b*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<h)&&(g=new Float32Array(h));for(let S=0,m=d;S!==b;++S,m+=4)r.copy(p[S]).applyMatrix4(x,o),r.normal.toArray(g,m),g[m+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,g}}var ps=4,TM=[.125,.215,.35,.446,.526,.582],js=20,J3=256,ec=new Zs,AM=new Gt,X0=null,W0=0,q0=0,Y0=!1,K3=new P,If=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,a=100,s={}){let{size:r=256,position:o=K3}=s;X0=this._renderer.getRenderTarget(),W0=this._renderer.getActiveCubeFace(),q0=this._renderer.getActiveMipmapLevel(),Y0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=RM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=CM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(X0,W0,q0),this._renderer.xr.enabled=Y0,t.scissorTest=!1,_o(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===us||t.mapping===Js?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),X0=this._renderer.getRenderTarget(),W0=this._renderer.getActiveCubeFace(),q0=this._renderer.getActiveMipmapLevel(),Y0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Hi,format:hi,colorSpace:Dl,depthBuffer:!1},a=wM(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wM(t,n,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=j3(s)),this._blurMaterial=$3(s,t,n),this._ggxMaterial=Q3(s,t,n)}return a}_compileMaterial(t){let n=new Rn(new Vi,t);this._renderer.compile(n,ec)}_sceneToCubeUV(t,n,i,a,s){let l=new wn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,d=p.toneMapping;p.getClearColor(AM),p.toneMapping=xi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(a),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rn(new po,new Fl({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,h=!1,x=t.background;x?x.isColor&&(g.color.copy(x),t.background=null,h=!0):(g.color.copy(AM),h=!0);for(let S=0;S<6;S++){let m=S%3;m===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[S],s.y,s.z)):m===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[S]));let E=this._cubeSize;_o(a,m*E,S>2?E:0,E,E),p.setRenderTarget(a),h&&p.render(b,l),p.render(t,l)}p.toneMapping=d,p.autoClear=u,t.background=x}_textureToCubeUV(t,n){let i=this._renderer,a=t.mapping===us||t.mapping===Js;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=RM()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=CM());let s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;let o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;_o(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,ec)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){let a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),u=0+c*1.25,d=p*u,{_lodMax:_}=this,b=this._sizeLods[i],g=3*b*(i>_-ps?i-_+ps:0),h=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=_-n,_o(s,g,h,3*b,2*b),a.setRenderTarget(s),a.render(o,ec),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,_o(t,g,h,3*b,2*b),a.setRenderTarget(t),a.render(o,ec)}_blur(t,n,i,a,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Nt("blur direction must be either latitudinal or longitudinal!");let f=3,p=this._lodMeshes[a];p.material=c;let u=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*js-1),b=s/_,g=isFinite(s)?1+Math.floor(f*b):js;g>js&&Rt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${js}`);let h=[],x=0;for(let C=0;C<js;++C){let y=C/b,A=Math.exp(-y*y/2);h.push(A),C===0?x+=A:C<g&&(x+=2*A)}for(let C=0;C<h.length;C++)h[C]=h[C]/x;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:S}=this;u.dTheta.value=_,u.mipInt.value=S-i;let m=this._sizeLods[a],E=3*m*(a>S-ps?a-S+ps:0),w=4*(this._cubeSize-m);_o(n,E,w,3*m,2*m),l.setRenderTarget(n),l.render(p,ec)}};function j3(e){let t=[],n=[],i=[],a=e,s=e-ps+1+TM.length;for(let r=0;r<s;r++){let o=Math.pow(2,a);t.push(o);let l=1/o;r>e-ps?l=TM[r-e+ps-1]:r===0&&(l=0),n.push(l);let c=1/(o-2),f=-c,p=1+c,u=[f,f,p,f,p,p,f,f,p,p,f,p],d=6,_=6,b=3,g=2,h=1,x=new Float32Array(b*_*d),S=new Float32Array(g*_*d),m=new Float32Array(h*_*d);for(let w=0;w<d;w++){let C=w%3*2/3-1,y=w>2?0:-1,A=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];x.set(A,b*_*w),S.set(u,g*_*w);let R=[w,w,w,w,w,w];m.set(R,h*_*w)}let E=new Vi;E.setAttribute("position",new Wn(x,b)),E.setAttribute("uv",new Wn(S,g)),E.setAttribute("faceIndex",new Wn(m,h)),i.push(new Rn(E,null)),a>ps&&a--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function wM(e,t,n){let i=new qn(e,t,n);return i.texture.mapping=ql,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _o(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function Q3(e,t,n){return new vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:J3,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function $3(e,t,n){let i=new Float32Array(js),a=new P(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:js,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function CM(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function RM(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function zf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pf=class extends qn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new Gl(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new po(5,5,5),s=new vn({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:ui});s.uniforms.tEquirect.value=n;let r=new Rn(a,s),o=n.minFilter;return n.minFilter===hs&&(n.minFilter=ln),new Gh(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}};function tC(e){let t=new WeakMap,n=new WeakMap,i=null;function a(u,d=!1){return u==null?null:d?r(u):s(u)}function s(u){if(u&&u.isTexture){let d=u.mapping;if(d===Wh||d===qh)if(t.has(u)){let _=t.get(u).texture;return o(_,u.mapping)}else{let _=u.image;if(_&&_.height>0){let b=new Pf(_.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let d=u.mapping,_=d===Wh||d===qh,b=d===us||d===Js;if(_||b){let g=n.get(u),h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new If(e)),g=_?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{let x=u.image;return _&&x&&x.height>0||b&&x&&l(x)?(i===null&&(i=new If(e)),g=_?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",f),g.texture):null}}}return u}function o(u,d){return d===Wh?u.mapping=us:d===qh&&(u.mapping=Js),u}function l(u){let d=0,_=6;for(let b=0;b<_;b++)u[b]!==void 0&&d++;return d===_}function c(u){let d=u.target;d.removeEventListener("dispose",c);let _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function f(u){let d=u.target;d.removeEventListener("dispose",f);let _=n.get(d);_!==void 0&&(n.delete(d),_.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:p}}function eC(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let a=e.getExtension(i);return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let a=n(i);return a===null&&ks("WebGLRenderer: "+i+" extension not supported."),a}}}function nC(e,t,n,i){let a={},s=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",r),delete a[u.id];let d=s.get(u);d&&(t.remove(d),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let d in u)t.update(u[d],e.ARRAY_BUFFER)}function c(p){let u=[],d=p.index,_=p.attributes.position,b=0;if(_===void 0)return;if(d!==null){let x=d.array;b=d.version;for(let S=0,m=x.length;S<m;S+=3){let E=x[S+0],w=x[S+1],C=x[S+2];u.push(E,w,w,C,C,E)}}else{let x=_.array;b=_.version;for(let S=0,m=x.length/3-1;S<m;S+=3){let E=S+0,w=S+1,C=S+2;u.push(E,w,w,C,C,E)}}let g=new(_.count>=65535?zl:Bl)(u,1);g.version=b;let h=s.get(p);h&&t.remove(h),s.set(p,g)}function f(p){let u=s.get(p);if(u){let d=p.index;d!==null&&u.version<d.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:f}}function iC(e,t,n){let i;function a(p){i=p}let s,r;function o(p){s=p.type,r=p.bytesPerElement}function l(p,u){e.drawElements(i,u,s,p*r),n.update(u,i,1)}function c(p,u,d){d!==0&&(e.drawElementsInstanced(i,u,s,p*r,d),n.update(u,i,d))}function f(p,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,p,0,d);let b=0;for(let g=0;g<d;g++)b+=u[g];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function aC(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:Nt("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function sC(e,t,n){let i=new WeakMap,a=new ve;function s(r,o,l){let c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0,u=i.get(o);if(u===void 0||u.count!==p){let A=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],S=0;d===!0&&(S=1),_===!0&&(S=2),b===!0&&(S=3);let m=o.attributes.position.count*S,E=1;m>t.maxTextureSize&&(E=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let w=new Float32Array(m*E*4*p),C=new Ol(w,m,E,p);C.type=Si,C.needsUpdate=!0;let y=S*4;for(let R=0;R<p;R++){let D=g[R],I=h[R],Y=x[R],K=m*E*4*R;for(let F=0;F<D.count;F++){let W=F*y;d===!0&&(a.fromBufferAttribute(D,F),w[K+W+0]=a.x,w[K+W+1]=a.y,w[K+W+2]=a.z,w[K+W+3]=0),_===!0&&(a.fromBufferAttribute(I,F),w[K+W+4]=a.x,w[K+W+5]=a.y,w[K+W+6]=a.z,w[K+W+7]=0),b===!0&&(a.fromBufferAttribute(Y,F),w[K+W+8]=a.x,w[K+W+9]=a.y,w[K+W+10]=a.z,w[K+W+11]=Y.itemSize===4?a.w:1)}}u={count:p,texture:C,size:new $t(m,E)},i.set(o,u),o.addEventListener("dispose",A)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let d=0;for(let b=0;b<c.length;b++)d+=c[b];let _=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(e,"morphTargetBaseInfluence",_),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function rC(e,t,n,i,a){let s=new WeakMap;function r(c){let f=a.render.frame,p=c.geometry,u=t.get(c,p);if(s.get(u)!==f&&(t.update(u),s.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==f&&(d.update(),s.set(d,f))}return u}function o(){s=new WeakMap}function l(c){let f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:r,dispose:o}}var oC={[v0]:"LINEAR_TONE_MAPPING",[_0]:"REINHARD_TONE_MAPPING",[x0]:"CINEON_TONE_MAPPING",[y0]:"ACES_FILMIC_TONE_MAPPING",[M0]:"AGX_TONE_MAPPING",[b0]:"NEUTRAL_TONE_MAPPING",[S0]:"CUSTOM_TONE_MAPPING"};function lC(e,t,n,i,a,s){let r=new qn(t,n,{type:e,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new _a(t,n):void 0}),o=new qn(t,n,{type:Hi,depthBuffer:!1,stencilBuffer:!1}),l=new Vi;l.setAttribute("position",new li([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new li([0,2,0,0,2,0],2));let c=new Ch({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Rn(l,c),p=new Zs(-1,1,1,-1,0,1),u=null,d=null,_=!1,b,g=null,h=[],x=!1;this.setSize=function(S,m){r.setSize(S,m),o.setSize(S,m);for(let E=0;E<h.length;E++){let w=h[E];w.setSize&&w.setSize(S,m)}},this.setEffects=function(S){h=S,x=h.length>0&&h[0].isRenderPass===!0;let m=r.width,E=r.height;for(let w=0;w<h.length;w++){let C=h[w];C.setSize&&C.setSize(m,E)}},this.begin=function(S,m){if(_||S.toneMapping===xi&&h.length===0)return!1;if(g=m,m!==null){let E=m.width,w=m.height;(r.width!==E||r.height!==w)&&this.setSize(E,w)}return x===!1&&S.setRenderTarget(r),b=S.toneMapping,S.toneMapping=xi,!0},this.hasRenderPass=function(){return x},this.end=function(S,m){S.toneMapping=b,_=!0;let E=r,w=o;for(let C=0;C<h.length;C++){let y=h[C];if(y.enabled!==!1&&(y.render(S,w,E,m),y.needsSwap!==!1)){let A=E;E=w,w=A}}if(u!==S.outputColorSpace||d!==S.toneMapping){u=S.outputColorSpace,d=S.toneMapping,c.defines={},Kt.getTransfer(u)===oe&&(c.defines.SRGB_TRANSFER="");let C=oC[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(g),S.render(f,p),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}var JM=new Cn,K0=new _a(1,1),KM=new Ol,jM=new Eh,QM=new Gl,DM=[],UM=[],NM=new Float32Array(16),LM=new Float32Array(9),OM=new Float32Array(4);function yo(e,t,n){let i=e[0];if(i<=0||i>0)return e;let a=t*n,s=DM[a];if(s===void 0&&(s=new Float32Array(a),DM[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ke(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Ff(e,t){let n=UM[t];n===void 0&&(n=new Int32Array(t),UM[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function cC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function uC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2fv(this.addr,t),Ke(n,t)}}function hC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Je(n,t))return;e.uniform3fv(this.addr,t),Ke(n,t)}}function fC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4fv(this.addr,t),Ke(n,t)}}function dC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;OM.set(i),e.uniformMatrix2fv(this.addr,!1,OM),Ke(n,i)}}function pC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;LM.set(i),e.uniformMatrix3fv(this.addr,!1,LM),Ke(n,i)}}function mC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;NM.set(i),e.uniformMatrix4fv(this.addr,!1,NM),Ke(n,i)}}function gC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function vC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2iv(this.addr,t),Ke(n,t)}}function _C(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3iv(this.addr,t),Ke(n,t)}}function xC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4iv(this.addr,t),Ke(n,t)}}function yC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function SC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2uiv(this.addr,t),Ke(n,t)}}function MC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3uiv(this.addr,t),Ke(n,t)}}function bC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4uiv(this.addr,t),Ke(n,t)}}function EC(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(K0.compareFunction=n.isReversedDepthBuffer()?Nf:Uf,s=K0):s=JM,n.setTexture2D(t||s,a)}function TC(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||jM,a)}function AC(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||QM,a)}function wC(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||KM,a)}function CC(e){switch(e){case 5126:return cC;case 35664:return uC;case 35665:return hC;case 35666:return fC;case 35674:return dC;case 35675:return pC;case 35676:return mC;case 5124:case 35670:return gC;case 35667:case 35671:return vC;case 35668:case 35672:return _C;case 35669:case 35673:return xC;case 5125:return yC;case 36294:return SC;case 36295:return MC;case 36296:return bC;case 35678:case 36198:case 36298:case 36306:case 35682:return EC;case 35679:case 36299:case 36307:return TC;case 35680:case 36300:case 36308:case 36293:return AC;case 36289:case 36303:case 36311:case 36292:return wC}}function RC(e,t){e.uniform1fv(this.addr,t)}function DC(e,t){let n=yo(t,this.size,2);e.uniform2fv(this.addr,n)}function UC(e,t){let n=yo(t,this.size,3);e.uniform3fv(this.addr,n)}function NC(e,t){let n=yo(t,this.size,4);e.uniform4fv(this.addr,n)}function LC(e,t){let n=yo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function OC(e,t){let n=yo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function IC(e,t){let n=yo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function PC(e,t){e.uniform1iv(this.addr,t)}function BC(e,t){e.uniform2iv(this.addr,t)}function zC(e,t){e.uniform3iv(this.addr,t)}function FC(e,t){e.uniform4iv(this.addr,t)}function VC(e,t){e.uniform1uiv(this.addr,t)}function GC(e,t){e.uniform2uiv(this.addr,t)}function HC(e,t){e.uniform3uiv(this.addr,t)}function kC(e,t){e.uniform4uiv(this.addr,t)}function XC(e,t,n){let i=this.cache,a=t.length,s=Ff(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));let r;this.type===e.SAMPLER_2D_SHADOW?r=K0:r=JM;for(let o=0;o!==a;++o)n.setTexture2D(t[o]||r,s[o])}function WC(e,t,n){let i=this.cache,a=t.length,s=Ff(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||jM,s[r])}function qC(e,t,n){let i=this.cache,a=t.length,s=Ff(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||QM,s[r])}function YC(e,t,n){let i=this.cache,a=t.length,s=Ff(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||KM,s[r])}function ZC(e){switch(e){case 5126:return RC;case 35664:return DC;case 35665:return UC;case 35666:return NC;case 35674:return LC;case 35675:return OC;case 35676:return IC;case 5124:case 35670:return PC;case 35667:case 35671:return BC;case 35668:case 35672:return zC;case 35669:case 35673:return FC;case 5125:return VC;case 36294:return GC;case 36295:return HC;case 36296:return kC;case 35678:case 36198:case 36298:case 36306:case 35682:return XC;case 35679:case 36299:case 36307:return WC;case 35680:case 36300:case 36308:case 36293:return qC;case 36289:case 36303:case 36311:case 36292:return YC}}var j0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=CC(n.type)}},Q0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ZC(n.type)}},$0=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let a=this.seq;for(let s=0,r=a.length;s!==r;++s){let o=a[s];o.setValue(t,n[o.id],i)}}},Z0=/(\w+)(\])?(\[|\.)?/g;function IM(e,t){e.seq.push(t),e.map[t.id]=t}function JC(e,t,n){let i=e.name,a=i.length;for(Z0.lastIndex=0;;){let s=Z0.exec(i),r=Z0.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){IM(n,c===void 0?new j0(o,e,t):new Q0(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new $0(o),IM(n,p)),n=p}}}var xo=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);JC(o,l,this)}let a=[],s=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(t,n,i,a){let s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){let a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){let o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){let i=[];for(let a=0,s=t.length;a!==s;++a){let r=t[a];r.id in n&&i.push(r)}return i}};function PM(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var KC=37297,jC=0;function QC(e,t){let n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var BM=new Lt;function $C(e){Kt._getMatrix(BM,Kt.workingColorSpace,e);let t=`mat3( ${BM.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case Ul:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function zM(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+QC(e.getShaderSource(t),o)}else return s}function t2(e,t){let n=$C(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var e2={[v0]:"Linear",[_0]:"Reinhard",[x0]:"Cineon",[y0]:"ACESFilmic",[M0]:"AgX",[b0]:"Neutral",[S0]:"Custom"};function n2(e,t){let n=e2[t];return n===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Of=new P;function i2(){Kt.getLuminanceCoefficients(Of);let e=Of.x.toFixed(4),t=Of.y.toFixed(4),n=Of.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a2(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ic).join(`
`)}function s2(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function r2(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){let s=e.getActiveAttrib(t,a),r=s.name,o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function ic(e){return e!==""}function FM(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function VM(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var o2=/^[ \t]*#include +<([\w\d./]+)>/gm;function tg(e){return e.replace(o2,c2)}var l2=new Map;function c2(e,t){let n=kt[t];if(n===void 0){let i=l2.get(t);if(i!==void 0)n=kt[i],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return tg(n)}var u2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function GM(e){return e.replace(u2,h2)}function h2(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function HM(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var f2={[Wl]:"SHADOWMAP_TYPE_PCF",[mo]:"SHADOWMAP_TYPE_VSM"};function d2(e){return f2[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var p2={[us]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE",[ql]:"ENVMAP_TYPE_CUBE_UV"};function m2(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":p2[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var g2={[Js]:"ENVMAP_MODE_REFRACTION"};function v2(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":g2[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var _2={[g0]:"ENVMAP_BLENDING_MULTIPLY",[oM]:"ENVMAP_BLENDING_MIX",[lM]:"ENVMAP_BLENDING_ADD"};function x2(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":_2[e.combine]||"ENVMAP_BLENDING_NONE"}function y2(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function S2(e,t,n,i){let a=e.getContext(),s=n.defines,r=n.vertexShader,o=n.fragmentShader,l=d2(n),c=m2(n),f=v2(n),p=x2(n),u=y2(n),d=a2(n),_=s2(s),b=a.createProgram(),g,h,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ic).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ic).join(`
`),h.length>0&&(h+=`
`)):(g=[HM(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ic).join(`
`),h=[HM(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==xi?"#define TONE_MAPPING":"",n.toneMapping!==xi?kt.tonemapping_pars_fragment:"",n.toneMapping!==xi?n2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,t2("linearToOutputTexel",n.outputColorSpace),i2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ic).join(`
`)),r=tg(r),r=FM(r,n),r=VM(r,n),o=tg(o),o=FM(o,n),o=VM(o,n),r=GM(r),o=GM(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===L0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===L0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let S=x+g+r,m=x+h+o,E=PM(a,a.VERTEX_SHADER,S),w=PM(a,a.FRAGMENT_SHADER,m);a.attachShader(b,E),a.attachShader(b,w),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function C(D){if(e.debug.checkShaderErrors){let I=a.getProgramInfoLog(b)||"",Y=a.getShaderInfoLog(E)||"",K=a.getShaderInfoLog(w)||"",F=I.trim(),W=Y.trim(),H=K.trim(),Q=!0,tt=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,b,E,w);else{let ut=zM(a,E,"vertex"),ht=zM(a,w,"fragment");Nt("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+ut+`
`+ht)}else F!==""?Rt("WebGLProgram: Program Info Log:",F):(W===""||H==="")&&(tt=!1);tt&&(D.diagnostics={runnable:Q,programLog:F,vertexShader:{log:W,prefix:g},fragmentShader:{log:H,prefix:h}})}a.deleteShader(E),a.deleteShader(w),y=new xo(a,b),A=r2(a,b)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(b,KC)),R},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jC++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=w,this}var M2=0,eg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new ng(t),n.set(t,i)),i}},ng=class{constructor(t){this.id=M2++,this.code=t,this.usedTimes=0}};function b2(e){return e===ds||e===Ql||e===$l}function E2(e,t,n,i,a,s){let r=new Il,o=new eg,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,A,R,D,I,Y){let K=D.fog,F=I.geometry,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Q=t.get(y.envMap||W,H),tt=Q&&Q.mapping===ql?Q.image.height:null,ut=d[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Rt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let ht=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,_t=ht!==void 0?ht.length:0,ne=0;F.morphAttributes.position!==void 0&&(ne=1),F.morphAttributes.normal!==void 0&&(ne=2),F.morphAttributes.color!==void 0&&(ne=3);let de,te,q,rt;if(ut){let yt=Xi[ut];de=yt.vertexShader,te=yt.fragmentShader}else{de=y.vertexShader,te=y.fragmentShader;let yt=o.getVertexShaderStage(y),_e=o.getFragmentShaderStage(y);o.update(y,yt,_e),q=yt.id,rt=_e.id}let et=e.getRenderTarget(),Ot=e.state.buffers.depth.getReversed(),It=I.isInstancedMesh===!0,Ct=I.isBatchedMesh===!0,De=!!y.map,Ht=!!y.matcap,ae=!!Q,Wt=!!y.aoMap,qt=!!y.lightMap,Ue=!!y.bumpMap&&y.wireframe===!1,Le=!!y.normalMap,Be=!!y.displacementMap,Bt=!!y.emissiveMap,Dt=!!y.metalnessMap,ee=!!y.roughnessMap,N=y.anisotropy>0,we=y.clearcoat>0,St=y.dispersion>0,T=y.iridescence>0,v=y.sheen>0,O=y.transmission>0,B=N&&!!y.anisotropyMap,k=we&&!!y.clearcoatMap,nt=we&&!!y.clearcoatNormalMap,it=we&&!!y.clearcoatRoughnessMap,X=T&&!!y.iridescenceMap,Z=T&&!!y.iridescenceThicknessMap,lt=v&&!!y.sheenColorMap,mt=v&&!!y.sheenRoughnessMap,ct=!!y.specularMap,ot=!!y.specularColorMap,Tt=!!y.specularIntensityMap,Et=O&&!!y.transmissionMap,Ut=O&&!!y.thicknessMap,U=!!y.gradientMap,at=!!y.alphaMap,J=y.alphaTest>0,st=!!y.alphaHash,ft=!!y.extensions,$=xi;y.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&($=e.toneMapping);let Mt={shaderID:ut,shaderType:y.type,shaderName:y.name,vertexShader:de,fragmentShader:te,defines:y.defines,customVertexShaderID:q,customFragmentShaderID:rt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ct,batchingColor:Ct&&I._colorsTexture!==null,instancing:It,instancingColor:It&&I.instanceColor!==null,instancingMorph:It&&I.morphTexture!==null,outputColorSpace:et===null?e.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:De,matcap:Ht,envMap:ae,envMapMode:ae&&Q.mapping,envMapCubeUVHeight:tt,aoMap:Wt,lightMap:qt,bumpMap:Ue,normalMap:Le,displacementMap:Be,emissiveMap:Bt,normalMapObjectSpace:Le&&y.normalMapType===hM,normalMapTangentSpace:Le&&y.normalMapType===N0,packedNormalMap:Le&&y.normalMapType===N0&&b2(y.normalMap.format),metalnessMap:Dt,roughnessMap:ee,anisotropy:N,anisotropyMap:B,clearcoat:we,clearcoatMap:k,clearcoatNormalMap:nt,clearcoatRoughnessMap:it,dispersion:St,iridescence:T,iridescenceMap:X,iridescenceThicknessMap:Z,sheen:v,sheenColorMap:lt,sheenRoughnessMap:mt,specularMap:ct,specularColorMap:ot,specularIntensityMap:Tt,transmission:O,transmissionMap:Et,thicknessMap:Ut,gradientMap:U,opaque:y.transparent===!1&&y.blending===Xs&&y.alphaToCoverage===!1,alphaMap:at,alphaTest:J,alphaHash:st,combine:y.combine,mapUv:De&&_(y.map.channel),aoMapUv:Wt&&_(y.aoMap.channel),lightMapUv:qt&&_(y.lightMap.channel),bumpMapUv:Ue&&_(y.bumpMap.channel),normalMapUv:Le&&_(y.normalMap.channel),displacementMapUv:Be&&_(y.displacementMap.channel),emissiveMapUv:Bt&&_(y.emissiveMap.channel),metalnessMapUv:Dt&&_(y.metalnessMap.channel),roughnessMapUv:ee&&_(y.roughnessMap.channel),anisotropyMapUv:B&&_(y.anisotropyMap.channel),clearcoatMapUv:k&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(y.sheenRoughnessMap.channel),specularMapUv:ct&&_(y.specularMap.channel),specularColorMapUv:ot&&_(y.specularColorMap.channel),specularIntensityMapUv:Tt&&_(y.specularIntensityMap.channel),transmissionMapUv:Et&&_(y.transmissionMap.channel),thicknessMapUv:Ut&&_(y.thicknessMap.channel),alphaMapUv:at&&_(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Le||N),vertexNormals:!!F.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!F.attributes.uv&&(De||at),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||F.attributes.normal===void 0&&Le===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ot,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:ne,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:$,decodeVideoTexture:De&&y.map.isVideoTexture===!0&&Kt.getTransfer(y.map.colorSpace)===oe,decodeVideoTextureEmissive:Bt&&y.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(y.emissiveMap.colorSpace)===oe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Gi,flipSided:y.side===_n,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ft&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&y.extensions.multiDraw===!0||Ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function g(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)A.push(R),A.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(h(A,y),x(A,y),A.push(e.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function h(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function x(y,A){r.disableAll(),A.instancing&&r.enable(0),A.instancingColor&&r.enable(1),A.instancingMorph&&r.enable(2),A.matcap&&r.enable(3),A.envMap&&r.enable(4),A.normalMapObjectSpace&&r.enable(5),A.normalMapTangentSpace&&r.enable(6),A.clearcoat&&r.enable(7),A.iridescence&&r.enable(8),A.alphaTest&&r.enable(9),A.vertexColors&&r.enable(10),A.vertexAlphas&&r.enable(11),A.vertexUv1s&&r.enable(12),A.vertexUv2s&&r.enable(13),A.vertexUv3s&&r.enable(14),A.vertexTangents&&r.enable(15),A.anisotropy&&r.enable(16),A.alphaHash&&r.enable(17),A.batching&&r.enable(18),A.dispersion&&r.enable(19),A.batchingColor&&r.enable(20),A.gradientMap&&r.enable(21),A.packedNormalMap&&r.enable(22),A.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),A.fog&&r.enable(0),A.useFog&&r.enable(1),A.flatShading&&r.enable(2),A.logarithmicDepthBuffer&&r.enable(3),A.reversedDepthBuffer&&r.enable(4),A.skinning&&r.enable(5),A.morphTargets&&r.enable(6),A.morphNormals&&r.enable(7),A.morphColors&&r.enable(8),A.premultipliedAlpha&&r.enable(9),A.shadowMapEnabled&&r.enable(10),A.doubleSided&&r.enable(11),A.flipSided&&r.enable(12),A.useDepthPacking&&r.enable(13),A.dithering&&r.enable(14),A.transmission&&r.enable(15),A.sheen&&r.enable(16),A.opaque&&r.enable(17),A.pointsUvs&&r.enable(18),A.decodeVideoTexture&&r.enable(19),A.decodeVideoTextureEmissive&&r.enable(20),A.alphaToCoverage&&r.enable(21),A.numLightProbeGrids>0&&r.enable(22),A.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function S(y){let A=d[y.type],R;if(A){let D=Xi[A];R=bM.clone(D.uniforms)}else R=y.uniforms;return R}function m(y,A){let R=f.get(A);return R!==void 0?++R.usedTimes:(R=new S2(e,A,y,a),c.push(R),f.set(A,R)),R}function E(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),f.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function C(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:S,acquireProgram:m,releaseProgram:E,releaseShaderCache:w,programs:c,dispose:C}}function T2(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function A2(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function kM(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function XM(){let e=[],t=0,n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,_,b,g,h){let x=e[t];return x===void 0?(x={id:u.id,object:u,geometry:d,material:_,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:g,group:h},e[t]=x):(x.id=u.id,x.object=u,x.geometry=d,x.material=_,x.materialVariant=r(u),x.groupOrder=b,x.renderOrder=u.renderOrder,x.z=g,x.group=h),t++,x}function l(u,d,_,b,g,h){let x=o(u,d,_,b,g,h);_.transmission>0?i.push(x):_.transparent===!0?a.push(x):n.push(x)}function c(u,d,_,b,g,h){let x=o(u,d,_,b,g,h);_.transmission>0?i.unshift(x):_.transparent===!0?a.unshift(x):n.unshift(x)}function f(u,d,_){n.length>1&&n.sort(u||A2),i.length>1&&i.sort(d||kM),a.length>1&&a.sort(d||kM),_&&(n.reverse(),i.reverse(),a.reverse())}function p(){for(let u=t,d=e.length;u<d;u++){let _=e[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:p,sort:f}}function w2(){let e=new WeakMap;function t(i,a){let s=e.get(i),r;return s===void 0?(r=new XM,e.set(i,[r])):a>=s.length?(r=new XM,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function C2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new P,color:new Gt};break;case"SpotLight":n={position:new P,direction:new P,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":n={color:new Gt,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=n,n}}}function R2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var D2=0;function U2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function N2(e){let t=new C2,n=R2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let a=new P,s=new Ne,r=new Ne;function o(c){let f=0,p=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let d=0,_=0,b=0,g=0,h=0,x=0,S=0,m=0,E=0,w=0,C=0;c.sort(U2);for(let A=0,R=c.length;A<R;A++){let D=c[A],I=D.color,Y=D.intensity,K=D.distance,F=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ds?F=D.shadow.map.texture:F=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=I.r*Y,p+=I.g*Y,u+=I.b*Y;else if(D.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(D.sh.coefficients[W],Y);C++}else if(D.isDirectionalLight){let W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,Q=n.get(D);Q.shadowIntensity=H.intensity,Q.shadowBias=H.bias,Q.shadowNormalBias=H.normalBias,Q.shadowRadius=H.radius,Q.shadowMapSize=H.mapSize,i.directionalShadow[d]=Q,i.directionalShadowMap[d]=F,i.directionalShadowMatrix[d]=D.shadow.matrix,x++}i.directional[d]=W,d++}else if(D.isSpotLight){let W=t.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(I).multiplyScalar(Y),W.distance=K,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,i.spot[b]=W;let H=D.shadow;if(D.map&&(i.spotLightMap[E]=D.map,E++,H.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[b]=H.matrix,D.castShadow){let Q=n.get(D);Q.shadowIntensity=H.intensity,Q.shadowBias=H.bias,Q.shadowNormalBias=H.normalBias,Q.shadowRadius=H.radius,Q.shadowMapSize=H.mapSize,i.spotShadow[b]=Q,i.spotShadowMap[b]=F,m++}b++}else if(D.isRectAreaLight){let W=t.get(D);W.color.copy(I).multiplyScalar(Y),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=W,g++}else if(D.isPointLight){let W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let H=D.shadow,Q=n.get(D);Q.shadowIntensity=H.intensity,Q.shadowBias=H.bias,Q.shadowNormalBias=H.normalBias,Q.shadowRadius=H.radius,Q.shadowMapSize=H.mapSize,Q.shadowCameraNear=H.camera.near,Q.shadowCameraFar=H.camera.far,i.pointShadow[_]=Q,i.pointShadowMap[_]=F,i.pointShadowMatrix[_]=D.shadow.matrix,S++}i.point[_]=W,_++}else if(D.isHemisphereLight){let W=t.get(D);W.skyColor.copy(D.color).multiplyScalar(Y),W.groundColor.copy(D.groundColor).multiplyScalar(Y),i.hemi[h]=W,h++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=u;let y=i.hash;(y.directionalLength!==d||y.pointLength!==_||y.spotLength!==b||y.rectAreaLength!==g||y.hemiLength!==h||y.numDirectionalShadows!==x||y.numPointShadows!==S||y.numSpotShadows!==m||y.numSpotMaps!==E||y.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=b,i.rectArea.length=g,i.point.length=_,i.hemi.length=h,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=m,i.spotShadowMap.length=m,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=m+E-w,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,y.directionalLength=d,y.pointLength=_,y.spotLength=b,y.rectAreaLength=g,y.hemiLength=h,y.numDirectionalShadows=x,y.numPointShadows=S,y.numSpotShadows=m,y.numSpotMaps=E,y.numLightProbes=C,i.version=D2++)}function l(c,f){let p=0,u=0,d=0,_=0,b=0,g=f.matrixWorldInverse;for(let h=0,x=c.length;h<x;h++){let S=c[h];if(S.isDirectionalLight){let m=i.directional[p];m.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),m.direction.sub(a),m.direction.transformDirection(g),p++}else if(S.isSpotLight){let m=i.spot[d];m.position.setFromMatrixPosition(S.matrixWorld),m.position.applyMatrix4(g),m.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),m.direction.sub(a),m.direction.transformDirection(g),d++}else if(S.isRectAreaLight){let m=i.rectArea[_];m.position.setFromMatrixPosition(S.matrixWorld),m.position.applyMatrix4(g),r.identity(),s.copy(S.matrixWorld),s.premultiply(g),r.extractRotation(s),m.halfWidth.set(S.width*.5,0,0),m.halfHeight.set(0,S.height*.5,0),m.halfWidth.applyMatrix4(r),m.halfHeight.applyMatrix4(r),_++}else if(S.isPointLight){let m=i.point[u];m.position.setFromMatrixPosition(S.matrixWorld),m.position.applyMatrix4(g),u++}else if(S.isHemisphereLight){let m=i.hemi[b];m.direction.setFromMatrixPosition(S.matrixWorld),m.direction.transformDirection(g),b++}}}return{setup:o,setupView:l,state:i}}function WM(e){let t=new N2(e),n=[],i=[],a=[];function s(u){p.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){t.setup(n)}function f(u){t.setupView(n,u)}let p={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:c,setupLightsView:f,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function L2(e){let t=new WeakMap;function n(a,s=0){let r=t.get(a),o;return r===void 0?(o=new WM(e),t.set(a,[o])):s>=r.length?(o=new WM(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var O2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,I2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,P2=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],B2=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],qM=new Ne,nc=new P,J0=new P;function z2(e,t,n){let i=new Vl,a=new $t,s=new $t,r=new ve,o=new Rh,l=new Dh,c={},f=n.maxTextureSize,p={[va]:_n,[_n]:va,[Gi]:Gi},u=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:O2,fragmentShader:I2}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let _=new Vi;_.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Rn(_,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wl;let h=this.type;this.render=function(w,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===HS&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Wl);let A=e.getRenderTarget(),R=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),I=e.state;I.setBlending(ui),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let Y=h!==this.type;Y&&C.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(F=>F.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,F=w.length;K<F;K++){let W=w[K],H=W.shadow;if(H===void 0){Rt("WebGLShadowMap:",W,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;a.copy(H.mapSize);let Q=H.getFrameExtents();a.multiply(Q),s.copy(H.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/Q.x),a.x=s.x*Q.x,H.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/Q.y),a.y=s.y*Q.y,H.mapSize.y=s.y));let tt=e.state.buffers.depth.getReversed();if(H.camera._reversedDepth=tt,H.map===null||Y===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===mo){if(W.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new qn(a.x,a.y,{format:ds,type:Hi,minFilter:ln,magFilter:ln,generateMipmaps:!1}),H.map.texture.name=W.name+".shadowMap",H.map.depthTexture=new _a(a.x,a.y,Si),H.map.depthTexture.name=W.name+".shadowMapDepth",H.map.depthTexture.format=Pi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=en,H.map.depthTexture.magFilter=en}else W.isPointLight?(H.map=new Pf(a.x),H.map.depthTexture=new wh(a.x,yi)):(H.map=new qn(a.x,a.y),H.map.depthTexture=new _a(a.x,a.y,yi)),H.map.depthTexture.name=W.name+".shadowMap",H.map.depthTexture.format=Pi,this.type===Wl?(H.map.depthTexture.compareFunction=tt?Nf:Uf,H.map.depthTexture.minFilter=ln,H.map.depthTexture.magFilter=ln):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=en,H.map.depthTexture.magFilter=en);H.camera.updateProjectionMatrix()}let ut=H.map.isWebGLCubeRenderTarget?6:1;for(let ht=0;ht<ut;ht++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,ht),e.clear();else{ht===0&&(e.setRenderTarget(H.map),e.clear());let _t=H.getViewport(ht);r.set(s.x*_t.x,s.y*_t.y,s.x*_t.z,s.y*_t.w),I.viewport(r)}if(W.isPointLight){let _t=H.camera,ne=H.matrix,de=W.distance||_t.far;de!==_t.far&&(_t.far=de,_t.updateProjectionMatrix()),nc.setFromMatrixPosition(W.matrixWorld),_t.position.copy(nc),J0.copy(_t.position),J0.add(P2[ht]),_t.up.copy(B2[ht]),_t.lookAt(J0),_t.updateMatrixWorld(),ne.makeTranslation(-nc.x,-nc.y,-nc.z),qM.multiplyMatrices(_t.projectionMatrix,_t.matrixWorldInverse),H._frustum.setFromProjectionMatrix(qM,_t.coordinateSystem,_t.reversedDepth)}else H.updateMatrices(W);i=H.getFrustum(),m(C,y,H.camera,W,this.type)}H.isPointLightShadow!==!0&&this.type===mo&&x(H,y),H.needsUpdate=!1}h=this.type,g.needsUpdate=!1,e.setRenderTarget(A,R,D)};function x(w,C){let y=t.update(b);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new qn(a.x,a.y,{format:ds,type:Hi})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,e.setRenderTarget(w.mapPass),e.clear(),e.renderBufferDirect(C,null,y,u,b,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,e.setRenderTarget(w.map),e.clear(),e.renderBufferDirect(C,null,y,d,b,null)}function S(w,C,y,A){let R=null,D=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)R=D;else if(R=y.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let I=R.uuid,Y=C.uuid,K=c[I];K===void 0&&(K={},c[I]=K);let F=K[Y];F===void 0&&(F=R.clone(),K[Y]=F,C.addEventListener("dispose",E)),R=F}if(R.visible=C.visible,R.wireframe=C.wireframe,A===mo?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:p[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let I=e.properties.get(R);I.light=y}return R}function m(w,C,y,A,R){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===mo)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);let Y=t.update(w),K=w.material;if(Array.isArray(K)){let F=Y.groups;for(let W=0,H=F.length;W<H;W++){let Q=F[W],tt=K[Q.materialIndex];if(tt&&tt.visible){let ut=S(w,tt,A,R);w.onBeforeShadow(e,w,C,y,Y,ut,Q),e.renderBufferDirect(y,null,Y,ut,w,Q),w.onAfterShadow(e,w,C,y,Y,ut,Q)}}}else if(K.visible){let F=S(w,K,A,R);w.onBeforeShadow(e,w,C,y,Y,F,null),e.renderBufferDirect(y,null,Y,F,w,null),w.onAfterShadow(e,w,C,y,Y,F,null)}}let I=w.children;for(let Y=0,K=I.length;Y<K;Y++)m(I[Y],C,y,A,R)}function E(w){w.target.removeEventListener("dispose",E);for(let y in c){let A=c[y],R=w.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function F2(e,t){function n(){let U=!1,at=new ve,J=null,st=new ve(0,0,0,0);return{setMask:function(ft){J!==ft&&!U&&(e.colorMask(ft,ft,ft,ft),J=ft)},setLocked:function(ft){U=ft},setClear:function(ft,$,Mt,yt,_e){_e===!0&&(ft*=yt,$*=yt,Mt*=yt),at.set(ft,$,Mt,yt),st.equals(at)===!1&&(e.clearColor(ft,$,Mt,yt),st.copy(at))},reset:function(){U=!1,J=null,st.set(-1,0,0,0)}}}function i(){let U=!1,at=!1,J=null,st=null,ft=null;return{setReversed:function($){if(at!==$){let Mt=t.get("EXT_clip_control");$?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT),at=$;let yt=ft;ft=null,this.setClear(yt)}},getReversed:function(){return at},setTest:function($){$?et(e.DEPTH_TEST):Ot(e.DEPTH_TEST)},setMask:function($){J!==$&&!U&&(e.depthMask($),J=$)},setFunc:function($){if(at&&($=SM[$]),st!==$){switch($){case hh:e.depthFunc(e.NEVER);break;case fh:e.depthFunc(e.ALWAYS);break;case dh:e.depthFunc(e.LESS);break;case Ws:e.depthFunc(e.LEQUAL);break;case ph:e.depthFunc(e.EQUAL);break;case mh:e.depthFunc(e.GEQUAL);break;case gh:e.depthFunc(e.GREATER);break;case vh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}st=$}},setLocked:function($){U=$},setClear:function($){ft!==$&&(ft=$,at&&($=1-$),e.clearDepth($))},reset:function(){U=!1,J=null,st=null,ft=null,at=!1}}}function a(){let U=!1,at=null,J=null,st=null,ft=null,$=null,Mt=null,yt=null,_e=null;return{setTest:function(xe){U||(xe?et(e.STENCIL_TEST):Ot(e.STENCIL_TEST))},setMask:function(xe){at!==xe&&!U&&(e.stencilMask(xe),at=xe)},setFunc:function(xe,Mi,bi){(J!==xe||st!==Mi||ft!==bi)&&(e.stencilFunc(xe,Mi,bi),J=xe,st=Mi,ft=bi)},setOp:function(xe,Mi,bi){($!==xe||Mt!==Mi||yt!==bi)&&(e.stencilOp(xe,Mi,bi),$=xe,Mt=Mi,yt=bi)},setLocked:function(xe){U=xe},setClear:function(xe){_e!==xe&&(e.clearStencil(xe),_e=xe)},reset:function(){U=!1,at=null,J=null,st=null,ft=null,$=null,Mt=null,yt=null,_e=null}}}let s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap,f={},p={},u={},d=new WeakMap,_=[],b=null,g=!1,h=null,x=null,S=null,m=null,E=null,w=null,C=null,y=new Gt(0,0,0),A=0,R=!1,D=null,I=null,Y=null,K=null,F=null,W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,Q=0,tt=e.getParameter(e.VERSION);tt.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(tt)[1]),H=Q>=1):tt.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),H=Q>=2);let ut=null,ht={},_t=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),de=new ve().fromArray(_t),te=new ve().fromArray(ne);function q(U,at,J,st){let ft=new Uint8Array(4),$=e.createTexture();e.bindTexture(U,$),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Mt=0;Mt<J;Mt++)U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY?e.texImage3D(at,0,e.RGBA,1,1,st,0,e.RGBA,e.UNSIGNED_BYTE,ft):e.texImage2D(at+Mt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ft);return $}let rt={};rt[e.TEXTURE_2D]=q(e.TEXTURE_2D,e.TEXTURE_2D,1),rt[e.TEXTURE_CUBE_MAP]=q(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[e.TEXTURE_2D_ARRAY]=q(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),rt[e.TEXTURE_3D]=q(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),et(e.DEPTH_TEST),r.setFunc(Ws),Ue(!1),Le(f0),et(e.CULL_FACE),Wt(ui);function et(U){f[U]!==!0&&(e.enable(U),f[U]=!0)}function Ot(U){f[U]!==!1&&(e.disable(U),f[U]=!1)}function It(U,at){return u[U]!==at?(e.bindFramebuffer(U,at),u[U]=at,U===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=at),U===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=at),!0):!1}function Ct(U,at){let J=_,st=!1;if(U){J=d.get(at),J===void 0&&(J=[],d.set(at,J));let ft=U.textures;if(J.length!==ft.length||J[0]!==e.COLOR_ATTACHMENT0){for(let $=0,Mt=ft.length;$<Mt;$++)J[$]=e.COLOR_ATTACHMENT0+$;J.length=ft.length,st=!0}}else J[0]!==e.BACK&&(J[0]=e.BACK,st=!0);st&&e.drawBuffers(J)}function De(U){return b!==U?(e.useProgram(U),b=U,!0):!1}let Ht={[ss]:e.FUNC_ADD,[XS]:e.FUNC_SUBTRACT,[WS]:e.FUNC_REVERSE_SUBTRACT};Ht[qS]=e.MIN,Ht[YS]=e.MAX;let ae={[ZS]:e.ZERO,[JS]:e.ONE,[KS]:e.SRC_COLOR,[ch]:e.SRC_ALPHA,[nM]:e.SRC_ALPHA_SATURATE,[tM]:e.DST_COLOR,[QS]:e.DST_ALPHA,[jS]:e.ONE_MINUS_SRC_COLOR,[uh]:e.ONE_MINUS_SRC_ALPHA,[eM]:e.ONE_MINUS_DST_COLOR,[$S]:e.ONE_MINUS_DST_ALPHA,[iM]:e.CONSTANT_COLOR,[aM]:e.ONE_MINUS_CONSTANT_COLOR,[sM]:e.CONSTANT_ALPHA,[rM]:e.ONE_MINUS_CONSTANT_ALPHA};function Wt(U,at,J,st,ft,$,Mt,yt,_e,xe){if(U===ui){g===!0&&(Ot(e.BLEND),g=!1);return}if(g===!1&&(et(e.BLEND),g=!0),U!==kS){if(U!==h||xe!==R){if((x!==ss||E!==ss)&&(e.blendEquation(e.FUNC_ADD),x=ss,E=ss),xe)switch(U){case Xs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case d0:e.blendFunc(e.ONE,e.ONE);break;case p0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case m0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Nt("WebGLState: Invalid blending: ",U);break}else switch(U){case Xs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case d0:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case p0:Nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case m0:Nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Nt("WebGLState: Invalid blending: ",U);break}S=null,m=null,w=null,C=null,y.set(0,0,0),A=0,h=U,R=xe}return}ft=ft||at,$=$||J,Mt=Mt||st,(at!==x||ft!==E)&&(e.blendEquationSeparate(Ht[at],Ht[ft]),x=at,E=ft),(J!==S||st!==m||$!==w||Mt!==C)&&(e.blendFuncSeparate(ae[J],ae[st],ae[$],ae[Mt]),S=J,m=st,w=$,C=Mt),(yt.equals(y)===!1||_e!==A)&&(e.blendColor(yt.r,yt.g,yt.b,_e),y.copy(yt),A=_e),h=U,R=!1}function qt(U,at){U.side===Gi?Ot(e.CULL_FACE):et(e.CULL_FACE);let J=U.side===_n;at&&(J=!J),Ue(J),U.blending===Xs&&U.transparent===!1?Wt(ui):Wt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),s.setMask(U.colorWrite);let st=U.stencilWrite;o.setTest(st),st&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Bt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?et(e.SAMPLE_ALPHA_TO_COVERAGE):Ot(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(U){D!==U&&(U?e.frontFace(e.CW):e.frontFace(e.CCW),D=U)}function Le(U){U!==VS?(et(e.CULL_FACE),U!==I&&(U===f0?e.cullFace(e.BACK):U===GS?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ot(e.CULL_FACE),I=U}function Be(U){U!==Y&&(H&&e.lineWidth(U),Y=U)}function Bt(U,at,J){U?(et(e.POLYGON_OFFSET_FILL),(K!==at||F!==J)&&(K=at,F=J,r.getReversed()&&(at=-at),e.polygonOffset(at,J))):Ot(e.POLYGON_OFFSET_FILL)}function Dt(U){U?et(e.SCISSOR_TEST):Ot(e.SCISSOR_TEST)}function ee(U){U===void 0&&(U=e.TEXTURE0+W-1),ut!==U&&(e.activeTexture(U),ut=U)}function N(U,at,J){J===void 0&&(ut===null?J=e.TEXTURE0+W-1:J=ut);let st=ht[J];st===void 0&&(st={type:void 0,texture:void 0},ht[J]=st),(st.type!==U||st.texture!==at)&&(ut!==J&&(e.activeTexture(J),ut=J),e.bindTexture(U,at||rt[U]),st.type=U,st.texture=at)}function we(){let U=ht[ut];U!==void 0&&U.type!==void 0&&(e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function St(){try{e.compressedTexImage2D(...arguments)}catch(U){Nt("WebGLState:",U)}}function T(){try{e.compressedTexImage3D(...arguments)}catch(U){Nt("WebGLState:",U)}}function v(){try{e.texSubImage2D(...arguments)}catch(U){Nt("WebGLState:",U)}}function O(){try{e.texSubImage3D(...arguments)}catch(U){Nt("WebGLState:",U)}}function B(){try{e.compressedTexSubImage2D(...arguments)}catch(U){Nt("WebGLState:",U)}}function k(){try{e.compressedTexSubImage3D(...arguments)}catch(U){Nt("WebGLState:",U)}}function nt(){try{e.texStorage2D(...arguments)}catch(U){Nt("WebGLState:",U)}}function it(){try{e.texStorage3D(...arguments)}catch(U){Nt("WebGLState:",U)}}function X(){try{e.texImage2D(...arguments)}catch(U){Nt("WebGLState:",U)}}function Z(){try{e.texImage3D(...arguments)}catch(U){Nt("WebGLState:",U)}}function lt(U){return p[U]!==void 0?p[U]:e.getParameter(U)}function mt(U,at){p[U]!==at&&(e.pixelStorei(U,at),p[U]=at)}function ct(U){de.equals(U)===!1&&(e.scissor(U.x,U.y,U.z,U.w),de.copy(U))}function ot(U){te.equals(U)===!1&&(e.viewport(U.x,U.y,U.z,U.w),te.copy(U))}function Tt(U,at){let J=c.get(at);J===void 0&&(J=new WeakMap,c.set(at,J));let st=J.get(U);st===void 0&&(st=e.getUniformBlockIndex(at,U.name),J.set(U,st))}function Et(U,at){let st=c.get(at).get(U);l.get(at)!==st&&(e.uniformBlockBinding(at,st,U.__bindingPointIndex),l.set(at,st))}function Ut(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),f={},p={},ut=null,ht={},u={},d=new WeakMap,_=[],b=null,g=!1,h=null,x=null,S=null,m=null,E=null,w=null,C=null,y=new Gt(0,0,0),A=0,R=!1,D=null,I=null,Y=null,K=null,F=null,de.set(0,0,e.canvas.width,e.canvas.height),te.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:et,disable:Ot,bindFramebuffer:It,drawBuffers:Ct,useProgram:De,setBlending:Wt,setMaterial:qt,setFlipSided:Ue,setCullFace:Le,setLineWidth:Be,setPolygonOffset:Bt,setScissorTest:Dt,activeTexture:ee,bindTexture:N,unbindTexture:we,compressedTexImage2D:St,compressedTexImage3D:T,texImage2D:X,texImage3D:Z,pixelStorei:mt,getParameter:lt,updateUBOMapping:Tt,uniformBlockBinding:Et,texStorage2D:nt,texStorage3D:it,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:B,compressedTexSubImage3D:k,scissor:ct,viewport:ot,reset:Ut}}function V2(e,t,n,i,a,s,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $t,f=new WeakMap,p=new Set,u,d=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(T,v){return _?new OffscreenCanvas(T,v):Ll("canvas")}function g(T,v,O){let B=1,k=St(T);if((k.width>O||k.height>O)&&(B=O/Math.max(k.width,k.height)),B<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let nt=Math.floor(B*k.width),it=Math.floor(B*k.height);u===void 0&&(u=b(nt,it));let X=v?b(nt,it):u;return X.width=nt,X.height=it,X.getContext("2d").drawImage(T,0,0,nt,it),Rt("WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+nt+"x"+it+")."),X}else return"data"in T&&Rt("WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),T;return T}function h(T){return T.generateMipmaps}function x(T){e.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function m(T,v,O,B,k,nt=!1){if(T!==null){if(e[T]!==void 0)return e[T];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let it;B&&(it=t.get("EXT_texture_norm16"),it||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=v;if(v===e.RED&&(O===e.FLOAT&&(X=e.R32F),O===e.HALF_FLOAT&&(X=e.R16F),O===e.UNSIGNED_BYTE&&(X=e.R8),O===e.UNSIGNED_SHORT&&it&&(X=it.R16_EXT),O===e.SHORT&&it&&(X=it.R16_SNORM_EXT)),v===e.RED_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.R8UI),O===e.UNSIGNED_SHORT&&(X=e.R16UI),O===e.UNSIGNED_INT&&(X=e.R32UI),O===e.BYTE&&(X=e.R8I),O===e.SHORT&&(X=e.R16I),O===e.INT&&(X=e.R32I)),v===e.RG&&(O===e.FLOAT&&(X=e.RG32F),O===e.HALF_FLOAT&&(X=e.RG16F),O===e.UNSIGNED_BYTE&&(X=e.RG8),O===e.UNSIGNED_SHORT&&it&&(X=it.RG16_EXT),O===e.SHORT&&it&&(X=it.RG16_SNORM_EXT)),v===e.RG_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RG8UI),O===e.UNSIGNED_SHORT&&(X=e.RG16UI),O===e.UNSIGNED_INT&&(X=e.RG32UI),O===e.BYTE&&(X=e.RG8I),O===e.SHORT&&(X=e.RG16I),O===e.INT&&(X=e.RG32I)),v===e.RGB_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RGB8UI),O===e.UNSIGNED_SHORT&&(X=e.RGB16UI),O===e.UNSIGNED_INT&&(X=e.RGB32UI),O===e.BYTE&&(X=e.RGB8I),O===e.SHORT&&(X=e.RGB16I),O===e.INT&&(X=e.RGB32I)),v===e.RGBA_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),O===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),O===e.UNSIGNED_INT&&(X=e.RGBA32UI),O===e.BYTE&&(X=e.RGBA8I),O===e.SHORT&&(X=e.RGBA16I),O===e.INT&&(X=e.RGBA32I)),v===e.RGB&&(O===e.UNSIGNED_SHORT&&it&&(X=it.RGB16_EXT),O===e.SHORT&&it&&(X=it.RGB16_SNORM_EXT),O===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),O===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),v===e.RGBA){let Z=nt?Ul:Kt.getTransfer(k);O===e.FLOAT&&(X=e.RGBA32F),O===e.HALF_FLOAT&&(X=e.RGBA16F),O===e.UNSIGNED_BYTE&&(X=Z===oe?e.SRGB8_ALPHA8:e.RGBA8),O===e.UNSIGNED_SHORT&&it&&(X=it.RGBA16_EXT),O===e.SHORT&&it&&(X=it.RGBA16_SNORM_EXT),O===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),O===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function E(T,v){let O;return T?v===null||v===yi||v===vo?O=e.DEPTH24_STENCIL8:v===Si?O=e.DEPTH32F_STENCIL8:v===go&&(O=e.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===yi||v===vo?O=e.DEPTH_COMPONENT24:v===Si?O=e.DEPTH_COMPONENT32F:v===go&&(O=e.DEPTH_COMPONENT16),O}function w(T,v){return h(T)===!0||T.isFramebufferTexture&&T.minFilter!==en&&T.minFilter!==ln?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function C(T){let v=T.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&f.delete(v),v.isHTMLTexture&&p.delete(v)}function y(T){let v=T.target;v.removeEventListener("dispose",y),D(v)}function A(T){let v=i.get(T);if(v.__webglInit===void 0)return;let O=T.source,B=d.get(O);if(B){let k=B[v.__cacheKey];k.usedTimes--,k.usedTimes===0&&R(T),Object.keys(B).length===0&&d.delete(O)}i.remove(T)}function R(T){let v=i.get(T);e.deleteTexture(v.__webglTexture);let O=T.source,B=d.get(O);delete B[v.__cacheKey],r.memory.textures--}function D(T){let v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(v.__webglFramebuffer[B]))for(let k=0;k<v.__webglFramebuffer[B].length;k++)e.deleteFramebuffer(v.__webglFramebuffer[B][k]);else e.deleteFramebuffer(v.__webglFramebuffer[B]);v.__webglDepthbuffer&&e.deleteRenderbuffer(v.__webglDepthbuffer[B])}else{if(Array.isArray(v.__webglFramebuffer))for(let B=0;B<v.__webglFramebuffer.length;B++)e.deleteFramebuffer(v.__webglFramebuffer[B]);else e.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&e.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&e.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let B=0;B<v.__webglColorRenderbuffer.length;B++)v.__webglColorRenderbuffer[B]&&e.deleteRenderbuffer(v.__webglColorRenderbuffer[B]);v.__webglDepthRenderbuffer&&e.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let O=T.textures;for(let B=0,k=O.length;B<k;B++){let nt=i.get(O[B]);nt.__webglTexture&&(e.deleteTexture(nt.__webglTexture),r.memory.textures--),i.remove(O[B])}i.remove(T)}let I=0;function Y(){I=0}function K(){return I}function F(T){I=T}function W(){let T=I;return T>=a.maxTextures&&Rt("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+a.maxTextures),I+=1,T}function H(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function Q(T,v){let O=i.get(T);if(T.isVideoTexture&&N(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){let B=T.image;if(B===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ot(O,T,v);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,O.__webglTexture,e.TEXTURE0+v)}function tt(T,v){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Ot(O,T,v);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,O.__webglTexture,e.TEXTURE0+v)}function ut(T,v){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Ot(O,T,v);return}n.bindTexture(e.TEXTURE_3D,O.__webglTexture,e.TEXTURE0+v)}function ht(T,v){let O=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){It(O,T,v);return}n.bindTexture(e.TEXTURE_CUBE_MAP,O.__webglTexture,e.TEXTURE0+v)}let _t={[_h]:e.REPEAT,[Ii]:e.CLAMP_TO_EDGE,[xh]:e.MIRRORED_REPEAT},ne={[en]:e.NEAREST,[cM]:e.NEAREST_MIPMAP_NEAREST,[Yl]:e.NEAREST_MIPMAP_LINEAR,[ln]:e.LINEAR,[Yh]:e.LINEAR_MIPMAP_NEAREST,[hs]:e.LINEAR_MIPMAP_LINEAR},de={[fM]:e.NEVER,[vM]:e.ALWAYS,[dM]:e.LESS,[Uf]:e.LEQUAL,[pM]:e.EQUAL,[Nf]:e.GEQUAL,[mM]:e.GREATER,[gM]:e.NOTEQUAL};function te(T,v){if(v.type===Si&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===ln||v.magFilter===Yh||v.magFilter===Yl||v.magFilter===hs||v.minFilter===ln||v.minFilter===Yh||v.minFilter===Yl||v.minFilter===hs)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,_t[v.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,_t[v.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,_t[v.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,ne[v.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,ne[v.minFilter]),v.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,de[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===en||v.minFilter!==Yl&&v.minFilter!==hs||v.type===Si&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,a.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function q(T,v){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",C));let B=v.source,k=d.get(B);k===void 0&&(k={},d.set(B,k));let nt=H(v);if(nt!==T.__cacheKey){k[nt]===void 0&&(k[nt]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,O=!0),k[nt].usedTimes++;let it=k[T.__cacheKey];it!==void 0&&(k[T.__cacheKey].usedTimes--,it.usedTimes===0&&R(v)),T.__cacheKey=nt,T.__webglTexture=k[nt].texture}return O}function rt(T,v,O){return Math.floor(Math.floor(T/O)/v)}function et(T,v,O,B){let nt=T.updateRanges;if(nt.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,v.width,v.height,O,B,v.data);else{nt.sort((mt,ct)=>mt.start-ct.start);let it=0;for(let mt=1;mt<nt.length;mt++){let ct=nt[it],ot=nt[mt],Tt=ct.start+ct.count,Et=rt(ot.start,v.width,4),Ut=rt(ct.start,v.width,4);ot.start<=Tt+1&&Et===Ut&&rt(ot.start+ot.count-1,v.width,4)===Et?ct.count=Math.max(ct.count,ot.start+ot.count-ct.start):(++it,nt[it]=ot)}nt.length=it+1;let X=n.getParameter(e.UNPACK_ROW_LENGTH),Z=n.getParameter(e.UNPACK_SKIP_PIXELS),lt=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,v.width);for(let mt=0,ct=nt.length;mt<ct;mt++){let ot=nt[mt],Tt=Math.floor(ot.start/4),Et=Math.ceil(ot.count/4),Ut=Tt%v.width,U=Math.floor(Tt/v.width),at=Et,J=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Ut),n.pixelStorei(e.UNPACK_SKIP_ROWS,U),n.texSubImage2D(e.TEXTURE_2D,0,Ut,U,at,J,O,B,v.data)}T.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,X),n.pixelStorei(e.UNPACK_SKIP_PIXELS,Z),n.pixelStorei(e.UNPACK_SKIP_ROWS,lt)}}function Ot(T,v,O){let B=e.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(B=e.TEXTURE_2D_ARRAY),v.isData3DTexture&&(B=e.TEXTURE_3D);let k=q(T,v),nt=v.source;n.bindTexture(B,T.__webglTexture,e.TEXTURE0+O);let it=i.get(nt);if(nt.version!==it.__version||k===!0){if(n.activeTexture(e.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let J=Kt.getPrimaries(Kt.workingColorSpace),st=v.colorSpace===xa?null:Kt.getPrimaries(v.colorSpace),ft=v.colorSpace===xa||J===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft)}n.pixelStorei(e.UNPACK_ALIGNMENT,v.unpackAlignment);let Z=g(v.image,!1,a.maxTextureSize);Z=we(v,Z);let lt=s.convert(v.format,v.colorSpace),mt=s.convert(v.type),ct=m(v.internalFormat,lt,mt,v.normalized,v.colorSpace,v.isVideoTexture);te(B,v);let ot,Tt=v.mipmaps,Et=v.isVideoTexture!==!0,Ut=it.__version===void 0||k===!0,U=nt.dataReady,at=w(v,Z);if(v.isDepthTexture)ct=E(v.format===fs,v.type),Ut&&(Et?n.texStorage2D(e.TEXTURE_2D,1,ct,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,ct,Z.width,Z.height,0,lt,mt,null));else if(v.isDataTexture)if(Tt.length>0){Et&&Ut&&n.texStorage2D(e.TEXTURE_2D,at,ct,Tt[0].width,Tt[0].height);for(let J=0,st=Tt.length;J<st;J++)ot=Tt[J],Et?U&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ot.width,ot.height,lt,mt,ot.data):n.texImage2D(e.TEXTURE_2D,J,ct,ot.width,ot.height,0,lt,mt,ot.data);v.generateMipmaps=!1}else Et?(Ut&&n.texStorage2D(e.TEXTURE_2D,at,ct,Z.width,Z.height),U&&et(v,Z,lt,mt)):n.texImage2D(e.TEXTURE_2D,0,ct,Z.width,Z.height,0,lt,mt,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Et&&Ut&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,ct,Tt[0].width,Tt[0].height,Z.depth);for(let J=0,st=Tt.length;J<st;J++)if(ot=Tt[J],v.format!==hi)if(lt!==null)if(Et){if(U)if(v.layerUpdates.size>0){let ft=z0(ot.width,ot.height,v.format,v.type);for(let $ of v.layerUpdates){let Mt=ot.data.subarray($*ft/ot.data.BYTES_PER_ELEMENT,($+1)*ft/ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,$,ot.width,ot.height,1,lt,Mt)}v.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,Z.depth,lt,ot.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,ct,ot.width,ot.height,Z.depth,0,ot.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Et?U&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,Z.depth,lt,mt,ot.data):n.texImage3D(e.TEXTURE_2D_ARRAY,J,ct,ot.width,ot.height,Z.depth,0,lt,mt,ot.data)}else{Et&&Ut&&n.texStorage2D(e.TEXTURE_2D,at,ct,Tt[0].width,Tt[0].height);for(let J=0,st=Tt.length;J<st;J++)ot=Tt[J],v.format!==hi?lt!==null?Et?U&&n.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ot.width,ot.height,lt,ot.data):n.compressedTexImage2D(e.TEXTURE_2D,J,ct,ot.width,ot.height,0,ot.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Et?U&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ot.width,ot.height,lt,mt,ot.data):n.texImage2D(e.TEXTURE_2D,J,ct,ot.width,ot.height,0,lt,mt,ot.data)}else if(v.isDataArrayTexture)if(Et){if(Ut&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,ct,Z.width,Z.height,Z.depth),U)if(v.layerUpdates.size>0){let J=z0(Z.width,Z.height,v.format,v.type);for(let st of v.layerUpdates){let ft=Z.data.subarray(st*J/Z.data.BYTES_PER_ELEMENT,(st+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,st,Z.width,Z.height,1,lt,mt,ft)}v.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,lt,mt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,ct,Z.width,Z.height,Z.depth,0,lt,mt,Z.data);else if(v.isData3DTexture)Et?(Ut&&n.texStorage3D(e.TEXTURE_3D,at,ct,Z.width,Z.height,Z.depth),U&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,lt,mt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,ct,Z.width,Z.height,Z.depth,0,lt,mt,Z.data);else if(v.isFramebufferTexture){if(Ut)if(Et)n.texStorage2D(e.TEXTURE_2D,at,ct,Z.width,Z.height);else{let J=Z.width,st=Z.height;for(let ft=0;ft<at;ft++)n.texImage2D(e.TEXTURE_2D,ft,ct,J,st,0,lt,mt,null),J>>=1,st>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in e){let J=e.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Z.parentNode!==J){J.appendChild(Z),p.add(v),J.onpaint=st=>{let ft=st.changedElements;for(let $ of p)ft.includes($.image)&&($.needsUpdate=!0)},J.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,Z);else{let ft=e.RGBA,$=e.RGBA,Mt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,ft,$,Mt,Z)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Et&&Ut){let J=St(Tt[0]);n.texStorage2D(e.TEXTURE_2D,at,ct,J.width,J.height)}for(let J=0,st=Tt.length;J<st;J++)ot=Tt[J],Et?U&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,lt,mt,ot):n.texImage2D(e.TEXTURE_2D,J,ct,lt,mt,ot);v.generateMipmaps=!1}else if(Et){if(Ut){let J=St(Z);n.texStorage2D(e.TEXTURE_2D,at,ct,J.width,J.height)}U&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,lt,mt,Z)}else n.texImage2D(e.TEXTURE_2D,0,ct,lt,mt,Z);h(v)&&x(B),it.__version=nt.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function It(T,v,O){if(v.image.length!==6)return;let B=q(T,v),k=v.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+O);let nt=i.get(k);if(k.version!==nt.__version||B===!0){n.activeTexture(e.TEXTURE0+O);let it=Kt.getPrimaries(Kt.workingColorSpace),X=v.colorSpace===xa?null:Kt.getPrimaries(v.colorSpace),Z=v.colorSpace===xa||it===X?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let lt=v.isCompressedTexture||v.image[0].isCompressedTexture,mt=v.image[0]&&v.image[0].isDataTexture,ct=[];for(let $=0;$<6;$++)!lt&&!mt?ct[$]=g(v.image[$],!0,a.maxCubemapSize):ct[$]=mt?v.image[$].image:v.image[$],ct[$]=we(v,ct[$]);let ot=ct[0],Tt=s.convert(v.format,v.colorSpace),Et=s.convert(v.type),Ut=m(v.internalFormat,Tt,Et,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,at=nt.__version===void 0||B===!0,J=k.dataReady,st=w(v,ot);te(e.TEXTURE_CUBE_MAP,v);let ft;if(lt){U&&at&&n.texStorage2D(e.TEXTURE_CUBE_MAP,st,Ut,ot.width,ot.height);for(let $=0;$<6;$++){ft=ct[$].mipmaps;for(let Mt=0;Mt<ft.length;Mt++){let yt=ft[Mt];v.format!==hi?Tt!==null?U?J&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt,0,0,yt.width,yt.height,Tt,yt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt,Ut,yt.width,yt.height,0,yt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt,0,0,yt.width,yt.height,Tt,Et,yt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt,Ut,yt.width,yt.height,0,Tt,Et,yt.data)}}}else{if(ft=v.mipmaps,U&&at){ft.length>0&&st++;let $=St(ct[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,st,Ut,$.width,$.height)}for(let $=0;$<6;$++)if(mt){U?J&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ct[$].width,ct[$].height,Tt,Et,ct[$].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ut,ct[$].width,ct[$].height,0,Tt,Et,ct[$].data);for(let Mt=0;Mt<ft.length;Mt++){let _e=ft[Mt].image[$].image;U?J&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt+1,0,0,_e.width,_e.height,Tt,Et,_e.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt+1,Ut,_e.width,_e.height,0,Tt,Et,_e.data)}}else{U?J&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Tt,Et,ct[$]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ut,Tt,Et,ct[$]);for(let Mt=0;Mt<ft.length;Mt++){let yt=ft[Mt];U?J&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt+1,0,0,Tt,Et,yt.image[$]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Mt+1,Ut,Tt,Et,yt.image[$])}}}h(v)&&x(e.TEXTURE_CUBE_MAP),nt.__version=k.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ct(T,v,O,B,k,nt){let it=s.convert(O.format,O.colorSpace),X=s.convert(O.type),Z=m(O.internalFormat,it,X,O.normalized,O.colorSpace),lt=i.get(v),mt=i.get(O);if(mt.__renderTarget=v,!lt.__hasExternalTextures){let ct=Math.max(1,v.width>>nt),ot=Math.max(1,v.height>>nt);k===e.TEXTURE_3D||k===e.TEXTURE_2D_ARRAY?n.texImage3D(k,nt,Z,ct,ot,v.depth,0,it,X,null):n.texImage2D(k,nt,Z,ct,ot,0,it,X,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),ee(v)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,B,k,mt.__webglTexture,0,Dt(v)):(k===e.TEXTURE_2D||k>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,B,k,mt.__webglTexture,nt),n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(T,v,O){if(e.bindRenderbuffer(e.RENDERBUFFER,T),v.depthBuffer){let B=v.depthTexture,k=B&&B.isDepthTexture?B.type:null,nt=E(v.stencilBuffer,k),it=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;ee(v)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Dt(v),nt,v.width,v.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,Dt(v),nt,v.width,v.height):e.renderbufferStorage(e.RENDERBUFFER,nt,v.width,v.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,it,e.RENDERBUFFER,T)}else{let B=v.textures;for(let k=0;k<B.length;k++){let nt=B[k],it=s.convert(nt.format,nt.colorSpace),X=s.convert(nt.type),Z=m(nt.internalFormat,it,X,nt.normalized,nt.colorSpace);ee(v)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Dt(v),Z,v.width,v.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,Dt(v),Z,v.width,v.height):e.renderbufferStorage(e.RENDERBUFFER,Z,v.width,v.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ht(T,v,O){let B=v.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let k=i.get(v.depthTexture);if(k.__renderTarget=v,(!k.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),B){if(k.__webglInit===void 0&&(k.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),k.__webglTexture===void 0){k.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture),te(e.TEXTURE_CUBE_MAP,v.depthTexture);let lt=s.convert(v.depthTexture.format),mt=s.convert(v.depthTexture.type),ct;v.depthTexture.format===Pi?ct=e.DEPTH_COMPONENT24:v.depthTexture.format===fs&&(ct=e.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ct,v.width,v.height,0,lt,mt,null)}}else Q(v.depthTexture,0);let nt=k.__webglTexture,it=Dt(v),X=B?e.TEXTURE_CUBE_MAP_POSITIVE_X+O:e.TEXTURE_2D,Z=v.depthTexture.format===fs?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(v.depthTexture.format===Pi)ee(v)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,X,nt,0,it):e.framebufferTexture2D(e.FRAMEBUFFER,Z,X,nt,0);else if(v.depthTexture.format===fs)ee(v)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,X,nt,0,it):e.framebufferTexture2D(e.FRAMEBUFFER,Z,X,nt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(T){let v=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let B=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),B){let k=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,B.removeEventListener("dispose",k)};B.addEventListener("dispose",k),v.__depthDisposeCallback=k}v.__boundDepthTexture=B}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let B=0;B<6;B++)Ht(v.__webglFramebuffer[B],T,B);else{let B=T.texture.mipmaps;B&&B.length>0?Ht(v.__webglFramebuffer[0],T,0):Ht(v.__webglFramebuffer,T,0)}else if(O){v.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(n.bindFramebuffer(e.FRAMEBUFFER,v.__webglFramebuffer[B]),v.__webglDepthbuffer[B]===void 0)v.__webglDepthbuffer[B]=e.createRenderbuffer(),De(v.__webglDepthbuffer[B],T,!1);else{let k=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,nt=v.__webglDepthbuffer[B];e.bindRenderbuffer(e.RENDERBUFFER,nt),e.framebufferRenderbuffer(e.FRAMEBUFFER,k,e.RENDERBUFFER,nt)}}else{let B=T.texture.mipmaps;if(B&&B.length>0?n.bindFramebuffer(e.FRAMEBUFFER,v.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=e.createRenderbuffer(),De(v.__webglDepthbuffer,T,!1);else{let k=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,nt=v.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,nt),e.framebufferRenderbuffer(e.FRAMEBUFFER,k,e.RENDERBUFFER,nt)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Wt(T,v,O){let B=i.get(T);v!==void 0&&Ct(B.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),O!==void 0&&ae(T)}function qt(T){let v=T.texture,O=i.get(T),B=i.get(v);T.addEventListener("dispose",y);let k=T.textures,nt=T.isWebGLCubeRenderTarget===!0,it=k.length>1;if(it||(B.__webglTexture===void 0&&(B.__webglTexture=e.createTexture()),B.__version=v.version,r.memory.textures++),nt){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let Z=0;Z<v.mipmaps.length;Z++)O.__webglFramebuffer[X][Z]=e.createFramebuffer()}else O.__webglFramebuffer[X]=e.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<v.mipmaps.length;X++)O.__webglFramebuffer[X]=e.createFramebuffer()}else O.__webglFramebuffer=e.createFramebuffer();if(it)for(let X=0,Z=k.length;X<Z;X++){let lt=i.get(k[X]);lt.__webglTexture===void 0&&(lt.__webglTexture=e.createTexture(),r.memory.textures++)}if(T.samples>0&&ee(T)===!1){O.__webglMultisampledFramebuffer=e.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<k.length;X++){let Z=k[X];O.__webglColorRenderbuffer[X]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,O.__webglColorRenderbuffer[X]);let lt=s.convert(Z.format,Z.colorSpace),mt=s.convert(Z.type),ct=m(Z.internalFormat,lt,mt,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),ot=Dt(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,ot,ct,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+X,e.RENDERBUFFER,O.__webglColorRenderbuffer[X])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=e.createRenderbuffer(),De(O.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(nt){n.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture),te(e.TEXTURE_CUBE_MAP,v);for(let X=0;X<6;X++)if(v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ct(O.__webglFramebuffer[X][Z],T,v,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,Z);else Ct(O.__webglFramebuffer[X],T,v,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);h(v)&&x(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(it){for(let X=0,Z=k.length;X<Z;X++){let lt=k[X],mt=i.get(lt),ct=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ct,mt.__webglTexture),te(ct,lt),Ct(O.__webglFramebuffer,T,lt,e.COLOR_ATTACHMENT0+X,ct,0),h(lt)&&x(ct)}n.unbindTexture()}else{let X=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(X=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(X,B.__webglTexture),te(X,v),v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ct(O.__webglFramebuffer[Z],T,v,e.COLOR_ATTACHMENT0,X,Z);else Ct(O.__webglFramebuffer,T,v,e.COLOR_ATTACHMENT0,X,0);h(v)&&x(X),n.unbindTexture()}T.depthBuffer&&ae(T)}function Ue(T){let v=T.textures;for(let O=0,B=v.length;O<B;O++){let k=v[O];if(h(k)){let nt=S(T),it=i.get(k).__webglTexture;n.bindTexture(nt,it),x(nt),n.unbindTexture()}}}let Le=[],Be=[];function Bt(T){if(T.samples>0){if(ee(T)===!1){let v=T.textures,O=T.width,B=T.height,k=e.COLOR_BUFFER_BIT,nt=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,it=i.get(T),X=v.length>1;if(X)for(let lt=0;lt<v.length;lt++)n.bindFramebuffer(e.FRAMEBUFFER,it.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,it.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,it.__webglMultisampledFramebuffer);let Z=T.texture.mipmaps;Z&&Z.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,it.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,it.__webglFramebuffer);for(let lt=0;lt<v.length;lt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(k|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(k|=e.STENCIL_BUFFER_BIT)),X){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,it.__webglColorRenderbuffer[lt]);let mt=i.get(v[lt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,mt,0)}e.blitFramebuffer(0,0,O,B,0,0,O,B,k,e.NEAREST),l===!0&&(Le.length=0,Be.length=0,Le.push(e.COLOR_ATTACHMENT0+lt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Le.push(nt),Be.push(nt),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Le))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),X)for(let lt=0;lt<v.length;lt++){n.bindFramebuffer(e.FRAMEBUFFER,it.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.RENDERBUFFER,it.__webglColorRenderbuffer[lt]);let mt=i.get(v[lt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,it.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.TEXTURE_2D,mt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,it.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let v=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[v])}}}function Dt(T){return Math.min(a.maxSamples,T.samples)}function ee(T){let v=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function N(T){let v=r.render.frame;f.get(T)!==v&&(f.set(T,v),T.update())}function we(T,v){let O=T.colorSpace,B=T.format,k=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Dl&&O!==xa&&(Kt.getTransfer(O)===oe?(B!==hi||k!==Zn)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Nt("WebGLTextures: Unsupported texture color space:",O)),v}function St(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=Y,this.getTextureUnits=K,this.setTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=tt,this.setTexture3D=ut,this.setTextureCube=ht,this.rebindTextures=Wt,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=Ue,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=ee,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function G2(e,t){function n(i,a=xa){let s,r=Kt.getTransfer(a);if(i===Zn)return e.UNSIGNED_BYTE;if(i===Jh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Kh)return e.UNSIGNED_SHORT_5_5_5_1;if(i===w0)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===C0)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===T0)return e.BYTE;if(i===A0)return e.SHORT;if(i===go)return e.UNSIGNED_SHORT;if(i===Zh)return e.INT;if(i===yi)return e.UNSIGNED_INT;if(i===Si)return e.FLOAT;if(i===Hi)return e.HALF_FLOAT;if(i===R0)return e.ALPHA;if(i===D0)return e.RGB;if(i===hi)return e.RGBA;if(i===Pi)return e.DEPTH_COMPONENT;if(i===fs)return e.DEPTH_STENCIL;if(i===U0)return e.RED;if(i===jh)return e.RED_INTEGER;if(i===ds)return e.RG;if(i===Qh)return e.RG_INTEGER;if(i===$h)return e.RGBA_INTEGER;if(i===Zl||i===Jl||i===Kl||i===jl)if(r===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Zl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Kl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Zl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Jl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Kl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tf||i===ef||i===nf||i===af)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===tf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ef)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===nf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===af)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sf||i===rf||i===of||i===lf||i===cf||i===Ql||i===uf)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===sf||i===rf)return r===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===of)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===lf)return s.COMPRESSED_R11_EAC;if(i===cf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ql)return s.COMPRESSED_RG11_EAC;if(i===uf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hf||i===ff||i===df||i===pf||i===mf||i===gf||i===vf||i===_f||i===xf||i===yf||i===Sf||i===Mf||i===bf||i===Ef)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ff)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===df)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_f)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bf)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ef)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tf||i===Af||i===wf)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Tf)return r===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Af)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cf||i===Rf||i===$l||i===Df)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$l)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Df)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var H2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ig=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Hl(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new vn({vertexShader:H2,fragmentShader:k2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Rn(new Ys(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ag=class extends Bi{constructor(t,n){super();let i=this,a=null,s=1,r=null,o="local-floor",l=1,c=null,f=null,p=null,u=null,d=null,_=null,b=typeof XRWebGLBinding<"u",g=new ig,h={},x=n.getContextAttributes(),S=null,m=null,E=[],w=[],C=new $t,y=null,A=new wn;A.viewport=new ve;let R=new wn;R.viewport=new ve;let D=[A,R],I=new Hh,Y=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let rt=E[q];return rt===void 0&&(rt=new ho,E[q]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(q){let rt=E[q];return rt===void 0&&(rt=new ho,E[q]=rt),rt.getGripSpace()},this.getHand=function(q){let rt=E[q];return rt===void 0&&(rt=new ho,E[q]=rt),rt.getHandSpace()};function F(q){let rt=w.indexOf(q.inputSource);if(rt===-1)return;let et=E[rt];et!==void 0&&(et.update(q.inputSource,q.frame,c||r),et.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){a.removeEventListener("select",F),a.removeEventListener("selectstart",F),a.removeEventListener("selectend",F),a.removeEventListener("squeeze",F),a.removeEventListener("squeezestart",F),a.removeEventListener("squeezeend",F),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",H);for(let q=0;q<E.length;q++){let rt=w[q];rt!==null&&(w[q]=null,E[q].disconnect(rt))}Y=null,K=null,g.reset();for(let q in h)delete h[q];t.setRenderTarget(S),d=null,u=null,p=null,a=null,m=null,te.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(q){if(a=q,a!==null){if(S=t.getRenderTarget(),a.addEventListener("select",F),a.addEventListener("selectstart",F),a.addEventListener("selectend",F),a.addEventListener("squeeze",F),a.addEventListener("squeezestart",F),a.addEventListener("squeezeend",F),a.addEventListener("end",W),a.addEventListener("inputsourceschange",H),x.xrCompatible!==!0&&await n.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,Ot=null,It=null;x.depth&&(It=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,et=x.stencil?fs:Pi,Ot=x.stencil?vo:yi);let Ct={colorFormat:n.RGBA8,depthFormat:It,scaleFactor:s};p=this.getBinding(),u=p.createProjectionLayer(Ct),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new qn(u.textureWidth,u.textureHeight,{format:hi,type:Zn,depthTexture:new _a(u.textureWidth,u.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let et={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(a,n,et),a.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new qn(d.framebufferWidth,d.framebufferHeight,{format:hi,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),te.setContext(a),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(q){for(let rt=0;rt<q.removed.length;rt++){let et=q.removed[rt],Ot=w.indexOf(et);Ot>=0&&(w[Ot]=null,E[Ot].disconnect(et))}for(let rt=0;rt<q.added.length;rt++){let et=q.added[rt],Ot=w.indexOf(et);if(Ot===-1){for(let Ct=0;Ct<E.length;Ct++)if(Ct>=w.length){w.push(et),Ot=Ct;break}else if(w[Ct]===null){w[Ct]=et,Ot=Ct;break}if(Ot===-1)break}let It=E[Ot];It&&It.connect(et)}}let Q=new P,tt=new P;function ut(q,rt,et){Q.setFromMatrixPosition(rt.matrixWorld),tt.setFromMatrixPosition(et.matrixWorld);let Ot=Q.distanceTo(tt),It=rt.projectionMatrix.elements,Ct=et.projectionMatrix.elements,De=It[14]/(It[10]-1),Ht=It[14]/(It[10]+1),ae=(It[9]+1)/It[5],Wt=(It[9]-1)/It[5],qt=(It[8]-1)/It[0],Ue=(Ct[8]+1)/Ct[0],Le=De*qt,Be=De*Ue,Bt=Ot/(-qt+Ue),Dt=Bt*-qt;if(rt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Dt),q.translateZ(Bt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),It[10]===-1)q.projectionMatrix.copy(rt.projectionMatrix),q.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{let ee=De+Bt,N=Ht+Bt,we=Le-Dt,St=Be+(Ot-Dt),T=ae*Ht/N*ee,v=Wt*Ht/N*ee;q.projectionMatrix.makePerspective(we,St,T,v,ee,N),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ht(q,rt){rt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(rt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(a===null)return;let rt=q.near,et=q.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(et=g.depthFar)),I.near=R.near=A.near=rt,I.far=R.far=A.far=et,(Y!==I.near||K!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),Y=I.near,K=I.far),I.layers.mask=q.layers.mask|6,A.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;let Ot=q.parent,It=I.cameras;ht(I,Ot);for(let Ct=0;Ct<It.length;Ct++)ht(It[Ct],Ot);It.length===2?ut(I,A,R):I.projectionMatrix.copy(A.projectionMatrix),_t(q,I,Ot)};function _t(q,rt,et){et===null?q.matrix.copy(rt.matrixWorld):(q.matrix.copy(et.matrixWorld),q.matrix.invert(),q.matrix.multiply(rt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(rt.projectionMatrix),q.projectionMatrixInverse.copy(rt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Sh*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(q){return h[q]};let ne=null;function de(q,rt){if(f=rt.getViewerPose(c||r),_=rt,f!==null){let et=f.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let Ot=!1;et.length!==I.cameras.length&&(I.cameras.length=0,Ot=!0);for(let Ht=0;Ht<et.length;Ht++){let ae=et[Ht],Wt=null;if(d!==null)Wt=d.getViewport(ae);else{let Ue=p.getViewSubImage(u,ae);Wt=Ue.viewport,Ht===0&&(t.setRenderTargetTextures(m,Ue.colorTexture,Ue.depthStencilTexture),t.setRenderTarget(m))}let qt=D[Ht];qt===void 0&&(qt=new wn,qt.layers.enable(Ht),qt.viewport=new ve,D[Ht]=qt),qt.matrix.fromArray(ae.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ae.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Ht===0&&(I.matrix.copy(qt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ot===!0&&I.cameras.push(qt)}let It=a.enabledFeatures;if(It&&It.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){p=i.getBinding();let Ht=p.getDepthInformation(et[0]);Ht&&Ht.isValid&&Ht.texture&&g.init(Ht,a.renderState)}if(It&&It.includes("camera-access")&&b){t.state.unbindTexture(),p=i.getBinding();for(let Ht=0;Ht<et.length;Ht++){let ae=et[Ht].camera;if(ae){let Wt=h[ae];Wt||(Wt=new Hl,h[ae]=Wt);let qt=p.getCameraImage(ae);Wt.sourceTexture=qt}}}}for(let et=0;et<E.length;et++){let Ot=w[et],It=E[et];Ot!==null&&It!==void 0&&It.update(Ot,rt,c||r)}ne&&ne(q,rt),rt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:rt}),_=null}let te=new YM;te.setAnimationLoop(de),this.setAnimationLoop=function(q){ne=q},this.dispose=function(){}}},X2=new Ne,$M=new Lt;$M.set(-1,0,0,0,1,0,0,0,1);function W2(e,t){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,I0(e)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function a(g,h,x,S,m){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),p(g,h)):h.isMeshPhongMaterial?(s(g,h),f(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),u(g,h),h.isMeshPhysicalMaterial&&d(g,h,m)):h.isMeshMatcapMaterial?(s(g,h),_(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),b(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(r(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,x,S):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===_n&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===_n&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let x=t.get(h),S=x.envMap,m=x.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(X2.makeRotationFromEuler(m)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply($M),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function r(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,x,S){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*x,g.scale.value=S*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function f(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function p(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function d(g,h,x){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===_n&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,h){h.matcap&&(g.matcap.value=h.matcap)}function b(g,h){let x=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function q2(e,t,n,i){let a={},s={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,E){let w=E.program;i.uniformBlockBinding(m,w)}function c(m,E){let w=a[m.id];w===void 0&&(g(m),w=f(m),a[m.id]=w,m.addEventListener("dispose",x));let C=E.program;i.updateUBOMapping(m,C);let y=t.render.frame;s[m.id]!==y&&(u(m),s[m.id]=y)}function f(m){let E=p();m.__bindingPointIndex=E;let w=e.createBuffer(),C=m.__size,y=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,w),e.bufferData(e.UNIFORM_BUFFER,C,y),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,w),w}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let E=a[m.id],w=m.uniforms,C=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let y=0,A=w.length;y<A;y++){let R=w[y];if(Array.isArray(R))for(let D=0,I=R.length;D<I;D++)d(R[D],y,D,C);else d(R,y,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(m,E,w,C){if(b(m,E,w,C)===!0){let y=m.__offset,A=m.value;if(Array.isArray(A)){let R=0;for(let D=0;D<A.length;D++){let I=A[D],Y=h(I);_(I,m.__data,R),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(R+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,m.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,y,m.__data)}}function _(m,E,w){typeof m=="number"||typeof m=="boolean"?E[0]=m:m.isMatrix3?(E[0]=m.elements[0],E[1]=m.elements[1],E[2]=m.elements[2],E[3]=0,E[4]=m.elements[3],E[5]=m.elements[4],E[6]=m.elements[5],E[7]=0,E[8]=m.elements[6],E[9]=m.elements[7],E[10]=m.elements[8],E[11]=0):ArrayBuffer.isView(m)?E.set(new m.constructor(m.buffer,m.byteOffset,E.length)):m.toArray(E,w)}function b(m,E,w,C){let y=m.value,A=E+"_"+w;if(C[A]===void 0)return typeof y=="number"||typeof y=="boolean"?C[A]=y:ArrayBuffer.isView(y)?C[A]=y.slice():C[A]=y.clone(),!0;{let R=C[A];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function g(m){let E=m.uniforms,w=0,C=16;for(let A=0,R=E.length;A<R;A++){let D=Array.isArray(E[A])?E[A]:[E[A]];for(let I=0,Y=D.length;I<Y;I++){let K=D[I],F=Array.isArray(K.value)?K.value:[K.value];for(let W=0,H=F.length;W<H;W++){let Q=F[W],tt=h(Q),ut=w%C,ht=ut%tt.boundary,_t=ut+ht;w+=ht,_t!==0&&C-_t<tt.storage&&(w+=C-_t),K.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=w,w+=tt.storage}}}let y=w%C;return y>0&&(w+=C-y),m.__size=w,m.__cache={},this}function h(m){let E={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(E.boundary=4,E.storage=4):m.isVector2?(E.boundary=8,E.storage=8):m.isVector3||m.isColor?(E.boundary=16,E.storage=12):m.isVector4?(E.boundary=16,E.storage=16):m.isMatrix3?(E.boundary=48,E.storage=48):m.isMatrix4?(E.boundary=64,E.storage=64):m.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(E.boundary=16,E.storage=m.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",m),E}function x(m){let E=m.target;E.removeEventListener("dispose",x);let w=r.indexOf(E.__bindingPointIndex);r.splice(w,1),e.deleteBuffer(a[E.id]),delete a[E.id],delete s[E.id]}function S(){for(let m in a)e.deleteBuffer(a[m]);r=[],a={},s={}}return{bind:l,update:c,dispose:S}}var Y2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ki=null;function Z2(){return ki===null&&(ki=new Ah(Y2,16,16,ds,Hi),ki.name="DFG_LUT",ki.minFilter=ln,ki.magFilter=ln,ki.wrapS=Ii,ki.wrapT=Ii,ki.generateMipmaps=!1,ki.needsUpdate=!0),ki}var Bf=class{constructor(t={}){let{canvas:n=_M(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Zn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;let b=d,g=new Set([$h,Qh,jh]),h=new Set([Zn,yi,go,vo,Jh,Kh]),x=new Uint32Array(4),S=new Int32Array(4),m=new P,E=null,w=null,C=[],y=[],A=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,I=null,Y=null,K=null,F=null;this._outputColorSpace=Xn;let W=0,H=0,Q=null,tt=-1,ut=null,ht=new ve,_t=new ve,ne=null,de=new Gt(0),te=0,q=n.width,rt=n.height,et=1,Ot=null,It=null,Ct=new ve(0,0,q,rt),De=new ve(0,0,q,rt),Ht=!1,ae=new Vl,Wt=!1,qt=!1,Ue=new Ne,Le=new P,Be=new ve,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Dt=!1;function ee(){return Q===null?et:1}let N=i;function we(M,L){return n.getContext(M,L)}try{let M={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Xh}`),n.addEventListener("webglcontextlost",_e,!1),n.addEventListener("webglcontextrestored",xe,!1),n.addEventListener("webglcontextcreationerror",Mi,!1),N===null){let L="webgl2";if(N=we(L,M),N===null)throw we(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Nt("WebGLRenderer: "+M.message),M}let St,T,v,O,B,k,nt,it,X,Z,lt,mt,ct,ot,Tt,Et,Ut,U,at,J,st,ft,$;function Mt(){St=new eC(N),St.init(),st=new G2(N,St),T=new Y3(N,St,t,st),v=new F2(N,St),T.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),Y=N.createFramebuffer(),K=N.createFramebuffer(),F=N.createFramebuffer(),O=new aC(N),B=new T2,k=new V2(N,St,v,B,T,st,O),nt=new tC(R),it=new lA(N),ft=new W3(N,it),X=new nC(N,it,O,ft),Z=new rC(N,X,it,ft,O),U=new sC(N,T,k),Tt=new Z3(B),lt=new E2(R,nt,St,T,ft,Tt),mt=new W2(R,B),ct=new w2,ot=new L2(St),Ut=new X3(R,nt,v,Z,_,l),Et=new z2(R,Z,T),$=new q2(N,O,T,v),at=new q3(N,St,O),J=new iC(N,St,O),O.programs=lt.programs,R.capabilities=T,R.extensions=St,R.properties=B,R.renderLists=ct,R.shadowMap=Et,R.state=v,R.info=O}Mt(),b!==Zn&&(A=new lC(b,n.width,n.height,o,a,s));let yt=new ag(R,N);this.xr=yt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let M=St.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=St.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(M){M!==void 0&&(et=M,this.setSize(q,rt,!1))},this.getSize=function(M){return M.set(q,rt)},this.setSize=function(M,L,G=!0){if(yt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}q=M,rt=L,n.width=Math.floor(M*et),n.height=Math.floor(L*et),G===!0&&(n.style.width=M+"px",n.style.height=L+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(q*et,rt*et).floor()},this.setDrawingBufferSize=function(M,L,G){q=M,rt=L,et=G,n.width=Math.floor(M*G),n.height=Math.floor(L*G),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(b===Zn){Nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ht)},this.getViewport=function(M){return M.copy(Ct)},this.setViewport=function(M,L,G,z){M.isVector4?Ct.set(M.x,M.y,M.z,M.w):Ct.set(M,L,G,z),v.viewport(ht.copy(Ct).multiplyScalar(et).round())},this.getScissor=function(M){return M.copy(De)},this.setScissor=function(M,L,G,z){M.isVector4?De.set(M.x,M.y,M.z,M.w):De.set(M,L,G,z),v.scissor(_t.copy(De).multiplyScalar(et).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(M){v.setScissorTest(Ht=M)},this.setOpaqueSort=function(M){Ot=M},this.setTransparentSort=function(M){It=M},this.getClearColor=function(M){return M.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor(...arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,G=!0){let z=0;if(M){let V=!1;if(Q!==null){let gt=Q.texture.format;V=g.has(gt)}if(V){let gt=Q.texture.type,xt=h.has(gt),pt=Ut.getClearColor(),bt=Ut.getClearAlpha(),At=pt.r,Ft=pt.g,Xt=pt.b;xt?(x[0]=At,x[1]=Ft,x[2]=Xt,x[3]=bt,N.clearBufferuiv(N.COLOR,0,x)):(S[0]=At,S[1]=Ft,S[2]=Xt,S[3]=bt,N.clearBufferiv(N.COLOR,0,S))}else z|=N.COLOR_BUFFER_BIT}L&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),I=M},this.dispose=function(){n.removeEventListener("webglcontextlost",_e,!1),n.removeEventListener("webglcontextrestored",xe,!1),n.removeEventListener("webglcontextcreationerror",Mi,!1),Ut.dispose(),ct.dispose(),ot.dispose(),B.dispose(),nt.dispose(),Z.dispose(),ft.dispose(),$.dispose(),lt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",bg),yt.removeEventListener("sessionend",Eg),gs.stop()};function _e(M){M.preventDefault(),O0("WebGLRenderer: Context Lost."),D=!0}function xe(){O0("WebGLRenderer: Context Restored."),D=!1;let M=O.autoReset,L=Et.enabled,G=Et.autoUpdate,z=Et.needsUpdate,V=Et.type;Mt(),O.autoReset=M,Et.enabled=L,Et.autoUpdate=G,Et.needsUpdate=z,Et.type=V}function Mi(M){Nt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function bi(M){let L=M.target;L.removeEventListener("dispose",bi),Tb(L)}function Tb(M){Ab(M),B.remove(M)}function Ab(M){let L=B.get(M).programs;L!==void 0&&(L.forEach(function(G){lt.releaseProgram(G)}),M.isShaderMaterial&&lt.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,G,z,V,gt){L===null&&(L=Bt);let xt=V.isMesh&&V.matrixWorld.determinantAffine()<0,pt=Rb(M,L,G,z,V);v.setMaterial(z,xt);let bt=G.index,At=1;if(z.wireframe===!0){if(bt=X.getWireframeAttribute(G),bt===void 0)return;At=2}let Ft=G.drawRange,Xt=G.attributes.position,wt=Ft.start*At,ue=(Ft.start+Ft.count)*At;gt!==null&&(wt=Math.max(wt,gt.start*At),ue=Math.min(ue,(gt.start+gt.count)*At)),bt!==null?(wt=Math.max(wt,0),ue=Math.min(ue,bt.count)):Xt!=null&&(wt=Math.max(wt,0),ue=Math.min(ue,Xt.count));let ze=ue-wt;if(ze<0||ze===1/0)return;ft.setup(V,z,pt,G,bt);let Oe,pe=at;if(bt!==null&&(Oe=it.get(bt),pe=J,pe.setIndex(Oe)),V.isMesh)z.wireframe===!0?(v.setLineWidth(z.wireframeLinewidth*ee()),pe.setMode(N.LINES)):pe.setMode(N.TRIANGLES);else if(V.isLine){let cn=z.linewidth;cn===void 0&&(cn=1),v.setLineWidth(cn*ee()),V.isLineSegments?pe.setMode(N.LINES):V.isLineLoop?pe.setMode(N.LINE_LOOP):pe.setMode(N.LINE_STRIP)}else V.isPoints?pe.setMode(N.POINTS):V.isSprite&&pe.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(St.get("WEBGL_multi_draw"))pe.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let cn=V._multiDrawStarts,vt=V._multiDrawCounts,Un=V._multiDrawCount,ie=bt?it.get(bt).bytesPerElement:1,Jn=B.get(z).currentProgram.getUniforms();for(let Ei=0;Ei<Un;Ei++)Jn.setValue(N,"_gl_DrawID",Ei),pe.render(cn[Ei]/ie,vt[Ei])}else if(V.isInstancedMesh)pe.renderInstances(wt,ze,V.count);else if(G.isInstancedBufferGeometry){let cn=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,vt=Math.min(G.instanceCount,cn);pe.renderInstances(wt,ze,vt)}else pe.render(wt,ze)};function Mg(M,L,G){M.transparent===!0&&M.side===Gi&&M.forceSinglePass===!1?(M.side=_n,M.needsUpdate=!0,uc(M,L,G),M.side=va,M.needsUpdate=!0,uc(M,L,G),M.side=Gi):uc(M,L,G)}this.compile=function(M,L,G=null){G===null&&(G=M),w=ot.get(G),w.init(L),y.push(w),G.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),M!==G&&M.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();let z=new Set;return M.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let gt=V.material;if(gt)if(Array.isArray(gt))for(let xt=0;xt<gt.length;xt++){let pt=gt[xt];Mg(pt,G,V),z.add(pt)}else Mg(gt,G,V),z.add(gt)}),w=y.pop(),z},this.compileAsync=function(M,L,G=null){let z=this.compile(M,L,G);return new Promise(V=>{function gt(){if(z.forEach(function(xt){B.get(xt).currentProgram.isReady()&&z.delete(xt)}),z.size===0){V(M);return}setTimeout(gt,10)}St.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Zf=null;function wb(M){Zf&&Zf(M)}function bg(){gs.stop()}function Eg(){gs.start()}let gs=new YM;gs.setAnimationLoop(wb),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(M){Zf=M,yt.setAnimationLoop(M),M===null?gs.stop():gs.start()},yt.addEventListener("sessionstart",bg),yt.addEventListener("sessionend",Eg),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){Nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;I!==null&&I.renderStart(M,L);let G=yt.enabled===!0&&yt.isPresenting===!0,z=A!==null&&(Q===null||G)&&A.begin(R,Q);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(L),L=yt.getCamera()),M.isScene===!0&&M.onBeforeRender(R,M,L,Q),w=ot.get(M,y.length),w.init(L),w.state.textureUnits=k.getTextureUnits(),y.push(w),Ue.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),ae.setFromProjectionMatrix(Ue,_i,L.reversedDepth),qt=this.localClippingEnabled,Wt=Tt.init(this.clippingPlanes,qt),E=ct.get(M,C.length),E.init(),C.push(E),yt.enabled===!0&&yt.isPresenting===!0){let xt=R.xr.getDepthSensingMesh();xt!==null&&Jf(xt,L,-1/0,R.sortObjects)}Jf(M,L,0,R.sortObjects),E.finish(),R.sortObjects===!0&&E.sort(Ot,It,L.reversedDepth),Dt=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,Dt&&Ut.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Wt===!0&&Tt.beginShadows();let V=w.state.shadowsArray;if(Et.render(V,M,L),Wt===!0&&Tt.endShadows(),(z&&A.hasRenderPass())===!1){let xt=E.opaque,pt=E.transmissive;if(w.setupLights(),L.isArrayCamera){let bt=L.cameras;if(pt.length>0)for(let At=0,Ft=bt.length;At<Ft;At++){let Xt=bt[At];Ag(xt,pt,M,Xt)}Dt&&Ut.render(M);for(let At=0,Ft=bt.length;At<Ft;At++){let Xt=bt[At];Tg(E,M,Xt,Xt.viewport)}}else pt.length>0&&Ag(xt,pt,M,L),Dt&&Ut.render(M),Tg(E,M,L)}Q!==null&&H===0&&(k.updateMultisampleRenderTarget(Q),k.updateRenderTargetMipmap(Q)),z&&A.end(R),M.isScene===!0&&M.onAfterRender(R,M,L),ft.resetDefaultState(),tt=-1,ut=null,y.pop(),y.length>0?(w=y[y.length-1],k.setTextureUnits(w.state.textureUnits),Wt===!0&&Tt.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,I!==null&&I.renderEnd()};function Jf(M,L,G,z){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ae.intersectsSprite(M)){z&&Be.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ue);let xt=Z.update(M),pt=M.material;pt.visible&&E.push(M,xt,pt,G,Be.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ae.intersectsObject(M))){let xt=Z.update(M),pt=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Be.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Be.copy(xt.boundingSphere.center)),Be.applyMatrix4(M.matrixWorld).applyMatrix4(Ue)),Array.isArray(pt)){let bt=xt.groups;for(let At=0,Ft=bt.length;At<Ft;At++){let Xt=bt[At],wt=pt[Xt.materialIndex];wt&&wt.visible&&E.push(M,xt,wt,G,Be.z,Xt)}}else pt.visible&&E.push(M,xt,pt,G,Be.z,null)}}let gt=M.children;for(let xt=0,pt=gt.length;xt<pt;xt++)Jf(gt[xt],L,G,z)}function Tg(M,L,G,z){let{opaque:V,transmissive:gt,transparent:xt}=M;w.setupLightsView(G),Wt===!0&&Tt.setGlobalState(R.clippingPlanes,G),z&&v.viewport(ht.copy(z)),V.length>0&&cc(V,L,G),gt.length>0&&cc(gt,L,G),xt.length>0&&cc(xt,L,G),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Ag(M,L,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){let wt=St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new qn(1,1,{generateMipmaps:!0,type:wt?Hi:Zn,minFilter:hs,samples:Math.max(4,T.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}let gt=w.state.transmissionRenderTarget[z.id],xt=z.viewport||ht;gt.setSize(xt.z*R.transmissionResolutionScale,xt.w*R.transmissionResolutionScale);let pt=R.getRenderTarget(),bt=R.getActiveCubeFace(),At=R.getActiveMipmapLevel();R.setRenderTarget(gt),R.getClearColor(de),te=R.getClearAlpha(),te<1&&R.setClearColor(16777215,.5),R.clear(),Dt&&Ut.render(G);let Ft=R.toneMapping;R.toneMapping=xi;let Xt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),Wt===!0&&Tt.setGlobalState(R.clippingPlanes,z),cc(M,G,z),k.updateMultisampleRenderTarget(gt),k.updateRenderTargetMipmap(gt),St.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let ue=0,ze=L.length;ue<ze;ue++){let Oe=L[ue],{object:pe,geometry:cn,material:vt,group:Un}=Oe;if(vt.side===Gi&&pe.layers.test(z.layers)){let ie=vt.side;vt.side=_n,vt.needsUpdate=!0,wg(pe,G,z,cn,vt,Un),vt.side=ie,vt.needsUpdate=!0,wt=!0}}wt===!0&&(k.updateMultisampleRenderTarget(gt),k.updateRenderTargetMipmap(gt))}R.setRenderTarget(pt,bt,At),R.setClearColor(de,te),Xt!==void 0&&(z.viewport=Xt),R.toneMapping=Ft}function cc(M,L,G){let z=L.isScene===!0?L.overrideMaterial:null;for(let V=0,gt=M.length;V<gt;V++){let xt=M[V],{object:pt,geometry:bt,group:At}=xt,Ft=xt.material;Ft.allowOverride===!0&&z!==null&&(Ft=z),pt.layers.test(G.layers)&&wg(pt,L,G,bt,Ft,At)}}function wg(M,L,G,z,V,gt){M.onBeforeRender(R,L,G,z,V,gt),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),V.onBeforeRender(R,L,G,z,M,gt),V.transparent===!0&&V.side===Gi&&V.forceSinglePass===!1?(V.side=_n,V.needsUpdate=!0,R.renderBufferDirect(G,L,z,V,M,gt),V.side=va,V.needsUpdate=!0,R.renderBufferDirect(G,L,z,V,M,gt),V.side=Gi):R.renderBufferDirect(G,L,z,V,M,gt),M.onAfterRender(R,L,G,z,V,gt)}function uc(M,L,G){L.isScene!==!0&&(L=Bt);let z=B.get(M),V=w.state.lights,gt=w.state.shadowsArray,xt=V.state.version,pt=lt.getParameters(M,V.state,gt,L,G,w.state.lightProbeGridArray),bt=lt.getProgramCacheKey(pt),At=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,z.fog=L.fog;let Ft=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=nt.get(M.envMap||z.environment,Ft),z.envMapRotation=z.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,At===void 0&&(M.addEventListener("dispose",bi),At=new Map,z.programs=At);let Xt=At.get(bt);if(Xt!==void 0){if(z.currentProgram===Xt&&z.lightsStateVersion===xt)return Rg(M,pt),Xt}else pt.uniforms=lt.getUniforms(M),I!==null&&M.isNodeMaterial&&I.build(M,G,pt),M.onBeforeCompile(pt,R),Xt=lt.acquireProgram(pt,bt),At.set(bt,Xt),z.uniforms=pt.uniforms;let wt=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(wt.clippingPlanes=Tt.uniform),Rg(M,pt),z.needsLights=Ub(M),z.lightsStateVersion=xt,z.needsLights&&(wt.ambientLightColor.value=V.state.ambient,wt.lightProbe.value=V.state.probe,wt.directionalLights.value=V.state.directional,wt.directionalLightShadows.value=V.state.directionalShadow,wt.spotLights.value=V.state.spot,wt.spotLightShadows.value=V.state.spotShadow,wt.rectAreaLights.value=V.state.rectArea,wt.ltc_1.value=V.state.rectAreaLTC1,wt.ltc_2.value=V.state.rectAreaLTC2,wt.pointLights.value=V.state.point,wt.pointLightShadows.value=V.state.pointShadow,wt.hemisphereLights.value=V.state.hemi,wt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,wt.spotLightMatrix.value=V.state.spotLightMatrix,wt.spotLightMap.value=V.state.spotLightMap,wt.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=w.state.lightProbeGridArray.length>0,z.currentProgram=Xt,z.uniformsList=null,Xt}function Cg(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=xo.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function Rg(M,L){let G=B.get(M);G.outputColorSpace=L.outputColorSpace,G.batching=L.batching,G.batchingColor=L.batchingColor,G.instancing=L.instancing,G.instancingColor=L.instancingColor,G.instancingMorph=L.instancingMorph,G.skinning=L.skinning,G.morphTargets=L.morphTargets,G.morphNormals=L.morphNormals,G.morphColors=L.morphColors,G.morphTargetsCount=L.morphTargetsCount,G.numClippingPlanes=L.numClippingPlanes,G.numIntersection=L.numClipIntersection,G.vertexAlphas=L.vertexAlphas,G.vertexTangents=L.vertexTangents,G.toneMapping=L.toneMapping}function Cb(M,L){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;m.setFromMatrixPosition(L.matrixWorld);for(let G=0,z=M.length;G<z;G++){let V=M[G];if(V.texture!==null&&V.boundingBox.containsPoint(m))return V}return null}function Rb(M,L,G,z,V){L.isScene!==!0&&(L=Bt),k.resetTextureUnits();let gt=L.fog,xt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?L.environment:null,pt=Q===null?R.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Kt.workingColorSpace,bt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,At=nt.get(z.envMap||xt,bt),Ft=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xt=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),wt=!!G.morphAttributes.position,ue=!!G.morphAttributes.normal,ze=!!G.morphAttributes.color,Oe=xi;z.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Oe=R.toneMapping);let pe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,cn=pe!==void 0?pe.length:0,vt=B.get(z),Un=w.state.lights;if(Wt===!0&&(qt===!0||M!==ut)){let ye=M===ut&&z.id===tt;Tt.setState(z,M,ye)}let ie=!1;z.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Un.state.version||vt.outputColorSpace!==pt||V.isBatchedMesh&&vt.batching===!1||!V.isBatchedMesh&&vt.batching===!0||V.isBatchedMesh&&vt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&vt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&vt.instancing===!1||!V.isInstancedMesh&&vt.instancing===!0||V.isSkinnedMesh&&vt.skinning===!1||!V.isSkinnedMesh&&vt.skinning===!0||V.isInstancedMesh&&vt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&vt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&vt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&vt.instancingMorph===!1&&V.morphTexture!==null||vt.envMap!==At||z.fog===!0&&vt.fog!==gt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Tt.numPlanes||vt.numIntersection!==Tt.numIntersection)||vt.vertexAlphas!==Ft||vt.vertexTangents!==Xt||vt.morphTargets!==wt||vt.morphNormals!==ue||vt.morphColors!==ze||vt.toneMapping!==Oe||vt.morphTargetsCount!==cn||!!vt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,vt.__version=z.version);let Jn=vt.currentProgram;ie===!0&&(Jn=uc(z,L,V),I&&z.isNodeMaterial&&I.onUpdateProgram(z,Jn,vt));let Ei=!1,Sa=!1,er=!1,me=Jn.getUniforms(),Fe=vt.uniforms;if(v.useProgram(Jn.program)&&(Ei=!0,Sa=!0,er=!0),z.id!==tt&&(tt=z.id,Sa=!0),vt.needsLights){let ye=Cb(w.state.lightProbeGridArray,V);vt.lightProbeGrid!==ye&&(vt.lightProbeGrid=ye,Sa=!0)}if(Ei||ut!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),me.setValue(N,"projectionMatrix",M.projectionMatrix),me.setValue(N,"viewMatrix",M.matrixWorldInverse);let ba=me.map.cameraPosition;ba!==void 0&&ba.setValue(N,Le.setFromMatrixPosition(M.matrixWorld)),T.logarithmicDepthBuffer&&me.setValue(N,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&me.setValue(N,"isOrthographic",M.isOrthographicCamera===!0),ut!==M&&(ut=M,Sa=!0,er=!0)}if(vt.needsLights&&(Un.state.directionalShadowMap.length>0&&me.setValue(N,"directionalShadowMap",Un.state.directionalShadowMap,k),Un.state.spotShadowMap.length>0&&me.setValue(N,"spotShadowMap",Un.state.spotShadowMap,k),Un.state.pointShadowMap.length>0&&me.setValue(N,"pointShadowMap",Un.state.pointShadowMap,k)),V.isSkinnedMesh){me.setOptional(N,V,"bindMatrix"),me.setOptional(N,V,"bindMatrixInverse");let ye=V.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),me.setValue(N,"boneTexture",ye.boneTexture,k))}V.isBatchedMesh&&(me.setOptional(N,V,"batchingTexture"),me.setValue(N,"batchingTexture",V._matricesTexture,k),me.setOptional(N,V,"batchingIdTexture"),me.setValue(N,"batchingIdTexture",V._indirectTexture,k),me.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&me.setValue(N,"batchingColorTexture",V._colorsTexture,k));let Ma=G.morphAttributes;if((Ma.position!==void 0||Ma.normal!==void 0||Ma.color!==void 0)&&U.update(V,G,Jn),(Sa||vt.receiveShadow!==V.receiveShadow)&&(vt.receiveShadow=V.receiveShadow,me.setValue(N,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&L.environment!==null&&(Fe.envMapIntensity.value=L.environmentIntensity),Fe.dfgLUT!==void 0&&(Fe.dfgLUT.value=Z2()),Sa){if(me.setValue(N,"toneMappingExposure",R.toneMappingExposure),vt.needsLights&&Db(Fe,er),gt&&z.fog===!0&&mt.refreshFogUniforms(Fe,gt),mt.refreshMaterialUniforms(Fe,z,et,rt,w.state.transmissionRenderTarget[M.id]),vt.needsLights&&vt.lightProbeGrid){let ye=vt.lightProbeGrid;Fe.probesSH.value=ye.texture,Fe.probesMin.value.copy(ye.boundingBox.min),Fe.probesMax.value.copy(ye.boundingBox.max),Fe.probesResolution.value.copy(ye.resolution)}xo.upload(N,Cg(vt),Fe,k)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(xo.upload(N,Cg(vt),Fe,k),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&me.setValue(N,"center",V.center),me.setValue(N,"modelViewMatrix",V.modelViewMatrix),me.setValue(N,"normalMatrix",V.normalMatrix),me.setValue(N,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){let ye=z.uniformsGroups;for(let ba=0,nr=ye.length;ba<nr;ba++){let Dg=ye[ba];$.update(Dg,Jn),$.bind(Dg,Jn)}}return Jn}function Db(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Ub(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(M,L,G){let z=B.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),B.get(M.texture).__webglTexture=L,B.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let G=B.get(M);G.__webglFramebuffer=L,G.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(M,L=0,G=0){Q=M,W=L,H=G;let z=null,V=!1,gt=!1;if(M){let pt=B.get(M);if(pt.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(N.FRAMEBUFFER,pt.__webglFramebuffer),ht.copy(M.viewport),_t.copy(M.scissor),ne=M.scissorTest,v.viewport(ht),v.scissor(_t),v.setScissorTest(ne),tt=-1;return}else if(pt.__webglFramebuffer===void 0)k.setupRenderTarget(M);else if(pt.__hasExternalTextures)k.rebindTextures(M,B.get(M.texture).__webglTexture,B.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Ft=M.depthTexture;if(pt.__boundDepthTexture!==Ft){if(Ft!==null&&B.has(Ft)&&(M.width!==Ft.image.width||M.height!==Ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(M)}}let bt=M.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(gt=!0);let At=B.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(At[L])?z=At[L][G]:z=At[L],V=!0):M.samples>0&&k.useMultisampledRTT(M)===!1?z=B.get(M).__webglMultisampledFramebuffer:Array.isArray(At)?z=At[G]:z=At,ht.copy(M.viewport),_t.copy(M.scissor),ne=M.scissorTest}else ht.copy(Ct).multiplyScalar(et).floor(),_t.copy(De).multiplyScalar(et).floor(),ne=Ht;if(G!==0&&(z=Y),v.bindFramebuffer(N.FRAMEBUFFER,z)&&v.drawBuffers(M,z),v.viewport(ht),v.scissor(_t),v.setScissorTest(ne),V){let pt=B.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,pt.__webglTexture,G)}else if(gt){let pt=L;for(let bt=0;bt<M.textures.length;bt++){let At=B.get(M.textures[bt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+bt,At.__webglTexture,G,pt)}}else if(M!==null&&G!==0){let pt=B.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pt.__webglTexture,G)}tt=-1},this.readRenderTargetPixels=function(M,L,G,z,V,gt,xt,pt=0){if(!(M&&M.isWebGLRenderTarget)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=B.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(bt=bt[xt]),bt){v.bindFramebuffer(N.FRAMEBUFFER,bt);try{let At=M.textures[pt],Ft=At.format,Xt=At.type;if(M.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pt),!T.textureFormatReadable(Ft)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Xt)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-z&&G>=0&&G<=M.height-V&&N.readPixels(L,G,z,V,st.convert(Ft),st.convert(Xt),gt)}finally{let At=Q!==null?B.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(M,L,G,z,V,gt,xt,pt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=B.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(bt=bt[xt]),bt)if(L>=0&&L<=M.width-z&&G>=0&&G<=M.height-V){v.bindFramebuffer(N.FRAMEBUFFER,bt);let At=M.textures[pt],Ft=At.format,Xt=At.type;if(M.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pt),!T.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,wt),N.bufferData(N.PIXEL_PACK_BUFFER,gt.byteLength,N.STREAM_READ),N.readPixels(L,G,z,V,st.convert(Ft),st.convert(Xt),0);let ue=Q!==null?B.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,ue);let ze=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await yM(N,ze,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,wt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,gt),N.deleteBuffer(wt),N.deleteSync(ze),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,G=0){let z=Math.pow(2,-G),V=Math.floor(M.image.width*z),gt=Math.floor(M.image.height*z),xt=L!==null?L.x:0,pt=L!==null?L.y:0;k.setTexture2D(M,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,xt,pt,V,gt),v.unbindTexture()},this.copyTextureToTexture=function(M,L,G=null,z=null,V=0,gt=0){let xt,pt,bt,At,Ft,Xt,wt,ue,ze,Oe=M.isCompressedTexture?M.mipmaps[gt]:M.image;if(G!==null)xt=G.max.x-G.min.x,pt=G.max.y-G.min.y,bt=G.isBox3?G.max.z-G.min.z:1,At=G.min.x,Ft=G.min.y,Xt=G.isBox3?G.min.z:0;else{let Fe=Math.pow(2,-V);xt=Math.floor(Oe.width*Fe),pt=Math.floor(Oe.height*Fe),M.isDataArrayTexture?bt=Oe.depth:M.isData3DTexture?bt=Math.floor(Oe.depth*Fe):bt=1,At=0,Ft=0,Xt=0}z!==null?(wt=z.x,ue=z.y,ze=z.z):(wt=0,ue=0,ze=0);let pe=st.convert(L.format),cn=st.convert(L.type),vt;L.isData3DTexture?(k.setTexture3D(L,0),vt=N.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(k.setTexture2DArray(L,0),vt=N.TEXTURE_2D_ARRAY):(k.setTexture2D(L,0),vt=N.TEXTURE_2D),v.activeTexture(N.TEXTURE0),v.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,L.flipY),v.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),v.pixelStorei(N.UNPACK_ALIGNMENT,L.unpackAlignment);let Un=v.getParameter(N.UNPACK_ROW_LENGTH),ie=v.getParameter(N.UNPACK_IMAGE_HEIGHT),Jn=v.getParameter(N.UNPACK_SKIP_PIXELS),Ei=v.getParameter(N.UNPACK_SKIP_ROWS),Sa=v.getParameter(N.UNPACK_SKIP_IMAGES);v.pixelStorei(N.UNPACK_ROW_LENGTH,Oe.width),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Oe.height),v.pixelStorei(N.UNPACK_SKIP_PIXELS,At),v.pixelStorei(N.UNPACK_SKIP_ROWS,Ft),v.pixelStorei(N.UNPACK_SKIP_IMAGES,Xt);let er=M.isDataArrayTexture||M.isData3DTexture,me=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let Fe=B.get(M),Ma=B.get(L),ye=B.get(Fe.__renderTarget),ba=B.get(Ma.__renderTarget);v.bindFramebuffer(N.READ_FRAMEBUFFER,ye.__webglFramebuffer),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,ba.__webglFramebuffer);for(let nr=0;nr<bt;nr++)er&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,B.get(M).__webglTexture,V,Xt+nr),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,B.get(L).__webglTexture,gt,ze+nr)),N.blitFramebuffer(At,Ft,xt,pt,wt,ue,xt,pt,N.DEPTH_BUFFER_BIT,N.NEAREST);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||M.isRenderTargetTexture||B.has(M)){let Fe=B.get(M),Ma=B.get(L);v.bindFramebuffer(N.READ_FRAMEBUFFER,K),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,F);for(let ye=0;ye<bt;ye++)er?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Fe.__webglTexture,V,Xt+ye):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Fe.__webglTexture,V),me?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ma.__webglTexture,gt,ze+ye):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ma.__webglTexture,gt),V!==0?N.blitFramebuffer(At,Ft,xt,pt,wt,ue,xt,pt,N.COLOR_BUFFER_BIT,N.NEAREST):me?N.copyTexSubImage3D(vt,gt,wt,ue,ze+ye,At,Ft,xt,pt):N.copyTexSubImage2D(vt,gt,wt,ue,At,Ft,xt,pt);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else me?M.isDataTexture||M.isData3DTexture?N.texSubImage3D(vt,gt,wt,ue,ze,xt,pt,bt,pe,cn,Oe.data):L.isCompressedArrayTexture?N.compressedTexSubImage3D(vt,gt,wt,ue,ze,xt,pt,bt,pe,Oe.data):N.texSubImage3D(vt,gt,wt,ue,ze,xt,pt,bt,pe,cn,Oe):M.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,gt,wt,ue,xt,pt,pe,cn,Oe.data):M.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,gt,wt,ue,Oe.width,Oe.height,pe,Oe.data):N.texSubImage2D(N.TEXTURE_2D,gt,wt,ue,xt,pt,pe,cn,Oe);v.pixelStorei(N.UNPACK_ROW_LENGTH,Un),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie),v.pixelStorei(N.UNPACK_SKIP_PIXELS,Jn),v.pixelStorei(N.UNPACK_SKIP_ROWS,Ei),v.pixelStorei(N.UNPACK_SKIP_IMAGES,Sa),gt===0&&L.generateMipmaps&&N.generateMipmap(vt),v.unbindTexture()},this.initRenderTarget=function(M){B.get(M).__webglFramebuffer===void 0&&k.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?k.setTextureCube(M,0):M.isData3DTexture?k.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?k.setTexture2DArray(M,0):k.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){W=0,H=0,Q=null,v.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}};var ac=["pronta","ouvindo","pensando","falando"];function tb(e=Math.random){let t=.1,n=0,i=0;return(a,s,r)=>{let o=ac.includes(a?.estado)?a.estado:"pronta",l;return typeof a?.nivel=="number"?l=.08+Math.max(0,Math.min(1,a.nivel))*.95:o==="falando"?(s>i&&(n=e()<.15?.05:.35+e()*.65,i=s+.09+e()*.16),l=n):o==="ouvindo"?l=.18+.12*Math.max(0,Math.sin(s*5.3)*Math.sin(s*1.7)):o==="pensando"?l=.14+.08*Math.sin(s*2.6):l=.08+.04*Math.sin(s*.9),t+=(l-t)*Math.min(1,r*(l>t?14:5)),t}}function eb(){let e={pronta:1,ouvindo:0,pensando:0,falando:0};return(t,n)=>{let i=ac.includes(t)?t:"pronta",a=Math.min(1,n*3);for(let r of ac)e[r]+=((r===i?1:0)-e[r])*a;let s=ac.reduce((r,o)=>r+e[o],0)||1;for(let r of ac)e[r]/=s;return{...e}}}function Gf(e=1){let t=Math.min(1.8,Math.max(1,Number(e)||1));return{raio:1.5/t,centroY:-.5+(t-1)*.75}}var Qs={y:-.5+.3,distancia:7.5},nb={y:-.95,z:-.1},So={min:[-1.85,-2.7,-1.15],max:[1.85,1.22,1.2]},ib=e=>Number.isInteger(e)?`${e}.0`:String(e),ab=`
  float elipsoide(vec3 p, vec3 r){ float k0 = length(p / r); float k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / k1; }
  float uniao(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
  // a menos b, com a borda arredondada
  float tira(float a, float b, float k){ return -uniao(-a, b, k); }
  vec2 gira(vec2 v, float a){ float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }

  const vec3 PIVO = vec3(0.0, ${ib(nb.y)}, ${ib(nb.z)});

  // a cabe\xE7a, nas coordenadas dela (q): raspada, um oval alto (de frente, quase uma elipse que
  // afina no queixo), com o queixo \xE0 frente da garganta
  float cabeca(vec3 q, out float orelha){
    // o perfil: quanto mais baixo, mais para a frente (o queixo); e a mand\xEDbula desce com a fala
    vec3 m = q;
    m.z -= 0.26 * smoothstep(-0.2, -1.0, q.y);
    m.y += uBoca * 0.085 * smoothstep(-0.66, -0.8, q.y) * smoothstep(-0.2, 0.25, m.z);
    vec3 r = m - vec3(0.0, 0.02, -0.05);
    float aperta = 1.0 + 0.3 * smoothstep(-0.55, -1.0, r.y);
    r.x *= aperta;
    float d = elipsoide(r, vec3(0.72, 1.02, 0.8)) / aperta;
    // a nuca, mais cheia
    d = uniao(d, elipsoide(q - vec3(0.0, 0.16, -0.24), vec3(0.62, 0.78, 0.7)), 0.2);
    // as orelhas: placas finas, de lado, abrindo para fora
    vec3 o = vec3(abs(q.x), q.y, q.z) - vec3(0.71, -0.23, -0.12);
    o.xz = gira(o.xz, -0.68);
    o.xy = gira(o.xy, 0.12);
    orelha = elipsoide(o, vec3(0.08, 0.32, 0.19));
    d = uniao(d, orelha, 0.06);
    // as \xF3rbitas: duas covas rasas (pegam um fio de luz na p\xE1lpebra de cima)
    vec3 e = vec3(abs(m.x), m.y, m.z) - vec3(0.24, -0.14, 0.72);
    d = tira(d, elipsoide(e, vec3(0.15, 0.08, 0.07)), 0.1);
    // o nariz: uma crista discreta (baixa: de lado, um nariz alto acendia um risco laranja no rosto)
    d = uniao(d, elipsoide(m - vec3(0.0, -0.4, 0.66), vec3(0.05, 0.15, 0.07)), 0.14);
    // a boca: l\xE1bios finos que mal aparecem e, falando, uma fenda que abre
    vec3 b = m - vec3(0.0, -0.69, 0.5);
    d = uniao(d, elipsoide(b, vec3(0.14, 0.035, 0.05)), 0.06);
    d = tira(d, elipsoide(b - vec3(0.0, -0.012 - uBoca * 0.03, 0.05), vec3(0.11, 0.002 + uBoca * 0.055, 0.1)), 0.02);
    return d;
  }

  // o corpo, parado: pesco\xE7o longo, trap\xE9zio caindo para os ombros e o alto do peito
  float corpo(vec3 p){
    p.y -= uRespira * 0.016;
    float d = elipsoide(p - vec3(0.0, -1.2, -0.2), vec3(0.4, 0.8, 0.36));
    // o tronco: quanto mais alto, mais estreito \u2014 os ombros descem em rampa desde o pesco\xE7o
    vec3 t = p - vec3(0.0, -2.3, -0.18);
    float estreita = 1.0 + 0.9 * smoothstep(-2.0, -1.45, p.y);
    t.x *= estreita;
    d = uniao(d, elipsoide(t, vec3(1.85, 0.85, 0.6)) / estreita, 0.3);
    return d;
  }

  // as mechas compridas acompanham a cabe\xE7a em cima e o corpo embaixo (onde pousam nos ombros)
  vec3 noCabelo(vec3 p, vec3 q){
    vec3 h = mix(p, q, smoothstep(-1.6, -0.4, p.y));
    // o balan\xE7o: as pontas mexem mais que a raiz
    h.x += sin(uTempo * 0.9 + h.y * 1.7) * 0.014 * smoothstep(0.0, -1.6, h.y);
    return h;
  }

  // o cabelo: longo, com a franja caindo de lado, preso atr\xE1s das orelhas (elas ficam de fora,
  // acendendo quando a Lisa escuta) e descendo por tr\xE1s do pesco\xE7o at\xE9 pousar nos ombros. Com
  // uCabelo < 1 ele encolhe para dentro do cr\xE2nio e some (a troca de cabelo desliza em vez de pular).
  float cabelo(vec3 p, vec3 q){
    if (uCabelo < 0.01) return 9.0;
    vec3 h = noCabelo(p, q);
    // a calota: um pouco maior que o cr\xE2nio
    float d = elipsoide(h - vec3(0.0, 0.13, -0.1), vec3(0.79, 1.0, 0.9));
    // abre o rosto com a linha do cabelo inclinada: a franja desce de um lado e cobre um canto da testa
    vec3 a = h - vec3(0.0, -0.45, 0.62);
    a.xy = gira(a.xy, 0.2);
    d = tira(d, elipsoide(a, vec3(0.62, 0.98, 0.72)), 0.1);
    // as orelhas ficam de fora: abaixo da t\xEAmpora e na frente da nuca, nada de cabelo
    d = tira(d, max(h.y - 0.02, -h.z - 0.3), 0.12);
    // as mechas: dos lados, atr\xE1s das orelhas e do pesco\xE7o, descendo at\xE9 os ombros
    vec3 l = vec3(abs(h.x), h.y, h.z) - vec3(0.56, -0.95, -0.48);
    l.xy = gira(l.xy, -0.1);
    float mechas = elipsoide(l, vec3(0.34, 1.32, 0.32));
    // e o volume das costas, que junta as duas
    mechas = uniao(mechas, elipsoide(h - vec3(0.0, -0.7, -0.6), vec3(0.8, 1.2, 0.32)), 0.3);
    d = uniao(d, mechas, 0.2);
    return d + (1.0 - uCabelo) * 0.35;
  }

  float forma(vec3 p, out float orelha, out float fio){
    vec3 q = PIVO + uCabeca * (p - PIVO);
    fio = cabelo(p, q);
    return uniao(uniao(cabeca(q, orelha), fio, 0.04), corpo(p), 0.05);
  }
`,Vf=(e,t,n)=>Math.min(n,Math.max(t,e));function sb(e,t,n=1,i=1100){let a=Math.max(1,Math.min(e,t));return Vf(Math.min(n||1,i/a),.35,3)}var K2=[{id:"longo",nome:"Longo",descricao:"Cabelo comprido, com franja de lado e preso atr\xE1s das orelhas"},{id:"raspado",nome:"Raspado",descricao:"A cabe\xE7a raspada da foto de refer\xEAncia"}],sg=[{id:"termico",nome:"T\xE9rmico",profundo:"#6b1d0b",meio:"#e8692a",borda:"#ffecc8",halo:"#5cc6d6",haloPensando:"#86b4ff"},{id:"holograma",nome:"Holograma",profundo:"#0b2470",meio:"#2f86ff",borda:"#dcf4ff",halo:"#9a7dff",haloPensando:"#d08bff"},{id:"neon",nome:"Neon",profundo:"#4d0a4f",meio:"#ff3fa4",borda:"#ffe0f3",halo:"#46c8ff",haloPensando:"#9d8bff"},{id:"aurora",nome:"Aurora",profundo:"#06372f",meio:"#17c48e",borda:"#e2fff0",halo:"#b58cff",haloPensando:"#7fb6ff"},{id:"ouro",nome:"Ouro",profundo:"#4a2604",meio:"#e0a020",borda:"#fff4d4",halo:"#a8d8ff",haloPensando:"#c9b2ff"},{id:"prata",nome:"Prata",profundo:"#26282c",meio:"#8f949c",borda:"#ffffff",halo:"#c8d2e0",haloPensando:"#c6c2ff"}],rg={cabelo:"longo",paleta:"termico"},og="lisa-rosto",lg="lisa-rosto";function cg(e){let t=e&&typeof e=="object"?e:{};return{cabelo:K2.some(n=>n.id===t.cabelo)?t.cabelo:rg.cabelo,paleta:sg.some(n=>n.id===t.paleta)?t.paleta:rg.paleta}}function Hf(){try{return cg(JSON.parse(localStorage.getItem(og)||"null"))}catch{return{...rg}}}function ug(e,t){let n=sg.find(i=>i.id===e)||sg[0];return[n.borda,n.meio,t==="pensando"?n.haloPensando:n.halo,n.profundo]}function rb(){let e={boca:0,calorBoca:0,calorOrelha:0,onda:0,yaw:0,pitch:0,roll:0},t=(n,i,a,s)=>n+(i-n)*Math.min(1,a*s);return({pesos:n,amp:i,t:a,dt:s,ponteiro:r=null,reduzido:o=!1})=>{let l=n.falando*Vf((i-.1)*1.5,0,1);e.boca=t(e.boca,l,s,l>e.boca?22:12),e.calorBoca=t(e.calorBoca,n.falando*(.2+i*.9),s,12),e.calorOrelha=t(e.calorOrelha,n.ouvindo*(.35+i*1.3),s,9),e.onda=t(e.onda,n.pensando,s,2.5);let c=!!r&&a-r.quando<4,f=c?n.pronta+n.ouvindo:0,p=c?Vf(r.x,-1.5,1.5):0,u=c?Vf(r.y,-1.5,1.5):0,d=Math.sin(a*.31)*.12*(n.pronta+n.falando*.6)+n.pensando*(.2+Math.sin(a*.4)*.06)+f*p*.3+n.falando*Math.sin(a*1.7)*i*.06,_=Math.sin(a*.23)*.035-n.pensando*.15-f*u*.16+n.falando*Math.sin(a*3.1)*i*.05+n.ouvindo*(.06+Math.sin(a*2.2)*.025),b=n.ouvindo*.11+Math.sin(a*.19)*.025-n.pensando*.05;e.yaw=t(e.yaw,d,s,3),e.pitch=t(e.pitch,_,s,4),e.roll=t(e.roll,b,s,2.5);let g=o?.35:1;return{boca:e.boca,calorBoca:e.calorBoca,calorOrelha:e.calorOrelha,onda:e.onda,respira:Math.sin(a*1.15)*g,yaw:e.yaw*g,pitch:e.pitch*g,roll:e.roll*g}}}var hb=[{id:"jogo",nome:"Videogame",duracao:12},{id:"cantarola",nome:"Cantarola",duracao:9.5}],$s={primeira:30,entre:[45,90],saida:.7},pg="lisa-brincadeira";var fg=e=>hb.find(t=>t.id===e)?.duracao??0,j2={vidro:7.2},Q2=e=>fg(e)||j2[e]||0;function fb({acaso:e=Math.random}={}){let t=null,n=null,i=null,a=(r,o)=>{t=r+o},s=r=>{n&&n.saindo==null&&(n.saindo=r)};return{gesto(r,{fraco:o=!1}={}){o&&n?.pedida||s(r),a(r,$s.primeira)},pedir(r,o){fg(r)&&(n={id:r,inicio:o,saindo:null,pedida:!0},i=r)},passo(r,o="pronta"){if(t==null&&a(r,$s.primeira),o!=="pronta"&&(s(r),a(r,$s.primeira)),n){let l=r-n.inicio,c=1;if(n.saindo!=null&&(c=1-(r-n.saindo)/$s.saida),c<=0||l>=fg(n.id)){let f=c>0;return n=null,f&&a(r,$s.entre[0]+e()*($s.entre[1]-$s.entre[0])),null}return{id:n.id,s:l,peso:Math.max(0,Math.min(1,c))}}if(r>=t){let l=hb.filter(f=>f.id!==i),c=l[Math.min(l.length-1,Math.floor(e()*l.length))].id;return n={id:c,inicio:r,saindo:null},i=c,{id:c,s:0,peso:1}}return null}}}var kf=(e,t,n)=>Math.min(n,Math.max(t,e)),Xf=e=>{let t=kf(e,0,1);return t*t*(3-2*t)},Mo=(e,t,n)=>Xf((e-t)/(n-t)),Dn=(e,t,n,i,a)=>Mo(e,t,n)*(1-Mo(e,i,a)),db=(e,t,n)=>e.map((i,a)=>i+(t[a]-i)*n),hg=(e,t,n)=>{let i=Math.abs(e-t)/n;return i>=1?0:Xf(1-i)},ya=(e,t)=>e.map((n,i)=>n+t[i]),sc=(e,t)=>e.map(n=>n*t),$2=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],tR=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],pb=e=>sc(e,1/Math.hypot(...e)),mb={mao:[-1.05,-2.9,1],jogo:[0,-2.9,.9]},Wf=[-.88,-.74,1.6],tr={parada:.28,armando:.08,batendo:.68},mg=e=>pb([.1,Math.cos(e),Math.sin(e)]),gb=[0,.6,-.22],eR=[.05,.82,-.53],ob=[1.45,1.8],nR=[0,-1.02,1.3];function gg(e,t){let n=[Math.cos(t),Math.sin(t),0],i=pb(ya(n,sc(e,-$2(n,e))));return[i,e,tR(e,i)]}var vg=(e,t,[n,i,a])=>ya(t,ya(sc(e[0],n),ya(sc(e[1],i),sc(e[2],a)))),rc={cabeca:[.5,.75,.2],boca:[.12,-.72,.66]},iR=[[2.6,"pi"],[3.3,"\u2605"],[4,"pi pi"],[5.1,"\u2726"],[5.9,"+1"],[6.7,"\u2605"],[7.6,"pi"]],lb=[.5,1.1,1.7,2.6,3.2,3.8,4.7,5.3,5.9,6.8,7.4],cb=["\u266A","\u266B","\u2669","\u266C"],qf=()=>({cabeca:{yaw:0,pitch:0,roll:0},boca:0,calorBoca:0,mao:null,mao2:null,jogo:null,batidas:[],falas:[],notas:[]}),aR=ya(mb.mao,[0,-.7,0]),sR=vg(gg(mg(tr.batendo),0),Wf,eR),rR=vg(gg(mg(tr.parada),0),Wf,gb);function oR(e,t,n){let i=qf(),a=Mo(e,.15,1.2)*(1-Mo(e,5.6,6.9))*t,s=[Wf[0]*(n-1),0,0],r=tr.parada,o=0;for(let u of ob){let d=e-u;r+=(tr.armando-tr.parada)*hg(e,u-.15,.1),d>-.07&&d<.2&&(o+=d<0?Xf(1+d/.07):1-Xf(d/.2))}r+=(tr.batendo-tr.parada)*o;let l=gg(mg(r*a),0),c=ya(db(aR,ya(Wf,s),a),[0,0,.05*o*a]),f=vg(l,c,gb);i.mao={centro:f,eixos:l,pulso:c,cotovelo:[c[0]-.12,-3.1,c[2]-.5]},i.batidas=ob.map(u=>({idade:e-u,ponto:ya(sR,s)})),i.cabeca.yaw=-.13*Dn(e,.3,1,2.3,2.9)*t,i.cabeca.pitch=.05*Dn(e,1,1.4,2.6,3.2)*t,i.cabeca.roll=.14*Dn(e,3,3.6,5.2,6)*t;let p=.5*(hg(e,1.5,.16)+hg(e,1.85,.16))+.32*(.5+.5*Math.sin(e*19))*Dn(e,3.2,3.3,4.2,4.4);return i.boca=p*t,i.calorBoca=p*.8*t,i.falas=[{texto:"toc toc",ponto:ya(rR,s),desvio:[0,-130],opacidade:Dn(e,1.45,1.6,2.9,3.2)*t},{texto:"tem algu\xE9m a\xED?",ponto:rc.cabeca,desvio:[0,0],opacidade:Dn(e,3.1,3.3,5.3,5.7)*t}],i}var ub=.84;function lR(e,t){let n=qf(),i=Mo(e,.2,1.4)*(1-Mo(e,10.4,11.6)),a=Dn(e,1.3,1.8,10,10.5),s=Dn(e,8.6,8.85,9.25,9.7),r=db(mb.jogo,nR,i*t);r[0]+=(.014*Math.sin(e*7.3)+.006*Math.sin(e*17.1))*a*t,r[1]+=(.008*Math.sin(e*11.3)+.09*s)*t;let o=Math.floor(e*8),l=Math.sin(o*12.9898)*43758.5453%1,c=a*(.72+.28*Math.abs(l))*(1+.4*s)*t;n.jogo={pos:r,giro:.95-.35*i+.04*Math.sin(e*1.7)*a,tela:c},n.cabeca.pitch=(.22*Dn(e,.6,1.5,10,11)-.26*s)*t,n.cabeca.yaw=.05*Math.sin(e*1.3)*a*t,n.cabeca.roll=(.04*Math.sin(e*.9)*a+.06*s)*t;let f=.3*(.5+.5*Math.sin(e*17))*Dn(e,.6,.7,1.6,1.8)+.4*s;n.boca=f*t,n.calorBoca=f*.8*t,n.falas=[{texto:"uma partidinha\u2026",ponto:rc.cabeca,desvio:[0,0],opacidade:Dn(e,.5,.7,2.4,2.8)*t},{texto:"passei de fase!",ponto:rc.cabeca,desvio:[0,0],opacidade:Dn(e,8.7,8.9,10.2,10.6)*t}];let p=[r[0],r[1]+.3,r[2]+.18];return n.notas=iR.map(([u,d],_)=>({chave:`j${_}`,simbolo:d,ponto:p,idade:e-u,vida:1.3,deriva:[(_%2?1:-1)*(18+_*4),-70],tamanho:d.length>1?15:20,opacidade:t})).filter(u=>u.idade>=0&&u.idade<u.vida),n}function cR(e,t){let n=qf(),i=Dn(e,.2,1,8.4,9.4)*t,a=lb.reduce((s,r)=>Math.max(s,e>=r?Math.exp(-(e-r)*4.5):0),0);return n.cabeca.roll=.11*Math.sin(2*Math.PI*e/1.2)*i,n.cabeca.yaw=.06*Math.sin(2*Math.PI*e/2.4+.5)*i,n.cabeca.pitch=-.07*i,n.boca=(.05+.1*a)*i,n.calorBoca=(.25+.5*a)*i,n.falas=[{texto:"hm-hm-hmm \u266A",ponto:rc.cabeca,desvio:[0,0],opacidade:Dn(e,.6,.8,2.6,3)*t}],n.notas=lb.map((s,r)=>({chave:`c${r}`,simbolo:cb[r%cb.length],ponto:rc.boca,idade:e-s,vida:2.1,deriva:[80+r%3*22,-110-r%2*30],tamanho:20+r%3*4,opacidade:t})).filter(s=>s.idade>=0&&s.idade<s.vida),n}var uR={vidro:oR,jogo:lR,cantarola:cR};function vb(e,t,n=1,{proporcao:i=1.3}={}){let a=uR[e];return a?a(kf(t,0,Q2(e)),kf(n,0,1),hR(i)):qf()}var hR=e=>kf(.74+(Number(e)-.5)*.52,.74,1);function _g([e,t,n],{raio:i,centroY:a}){let s=a+(Qs.y- -.5),r=Qs.distancia/Math.max(.05,Qs.distancia-n);return[e*r/i,(s+r*(t-s)-a)/i]}function xg(e,t,n,i,a){let[s,r]=_g(e,t),o=.5*Math.min(n,i)*a;return[n/2+s*o,i/2-r*o]}function yg(e){let t=So.max[2];return e?.mao&&(t=Math.max(t,e.mao.centro[2]+.75)),e?.mao2&&(t=Math.max(t,e.mao2.centro[2]+.75)),e?.jogo&&(t=Math.max(t,e.jogo.pos[2]+.5)),t}var _b=`
  // um cone de pontas redondas (uma falange, um antebra\xE7o): afina de a para b
  float cone(vec3 p, vec3 a, vec3 b, float ra, float rb){ vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - mix(ra, rb, h); }
  float caixinha(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }

  // um dedo (no espa\xE7o da m\xE3o: o pulso na origem, os dedos para +y, as costas da m\xE3o para +z e o polegar
  // para +x): da junta da base b, com as tr\xEAs falanges c e as dobras a (na base, no meio e na ponta),
  // dobrando para o lado da palma
  float dedo(vec3 l, vec3 b, vec3 c, float r, vec3 a){
    float a2 = a.x + a.y;
    float a3 = a2 + a.z;
    vec3 j1 = b + c.x * vec3(0.0, cos(a.x), -sin(a.x));
    vec3 j2 = j1 + c.y * vec3(0.0, cos(a2), -sin(a2));
    vec3 j3 = j2 + c.z * vec3(0.0, cos(a3), -sin(a3));
    return min(min(cone(l, b, j1, r, r * 0.93), cone(l, j1, j2, r * 0.93, r * 0.86)), cone(l, j2, j3, r * 0.86, r * 0.78));
  }

  float maoFechada(vec3 l){
    float d = caixinha(l - vec3(0.0, 0.45, -0.02), vec3(0.31, 0.38, 0.1), 0.1);
    d = uniao(d, elipsoide(l - vec3(0.2, 0.3, -0.12), vec3(0.15, 0.24, 0.1)), 0.08);
    // indicador, m\xE9dio, anelar e m\xEDnimo: 95\xB0 na base, 100\xB0 no meio e 60\xB0 na ponta
    vec3 a = vec3(1.66, 1.75, 1.05);
    float dd = dedo(l, vec3(0.25, 0.84, 0.0), vec3(0.4, 0.24, 0.18), 0.083, a);
    dd = min(dd, dedo(l, vec3(0.085, 0.88, 0.01), vec3(0.44, 0.27, 0.19), 0.087, a));
    dd = min(dd, dedo(l, vec3(-0.08, 0.86, 0.0), vec3(0.41, 0.25, 0.18), 0.081, a));
    dd = min(dd, dedo(l, vec3(-0.235, 0.8, -0.01), vec3(0.33, 0.2, 0.16), 0.07, a));
    d = uniao(d, dd, 0.05);
    // o polegar: da base, perto do pulso, at\xE9 cruzar na frente do indicador e do m\xE9dio
    float po = cone(l, vec3(0.24, 0.14, -0.08), vec3(0.38, 0.44, -0.3), 0.12, 0.1);
    po = min(po, cone(l, vec3(0.38, 0.44, -0.3), vec3(0.3, 0.7, -0.5), 0.1, 0.088));
    po = min(po, cone(l, vec3(0.3, 0.7, -0.5), vec3(0.05, 0.76, -0.54), 0.088, 0.078));
    d = uniao(d, po, 0.05);
    // o pulso
    return uniao(d, elipsoide(l - vec3(0.0, 0.0, -0.02), vec3(0.25, 0.16, 0.17)), 0.12);
  }

  // um dedo esticado: da base b, na dire\xE7\xE3o u, com as tr\xEAs falanges c (quase retas: a m\xE3o aberta
  // encostada no vidro)
  float dedoReto(vec3 l, vec3 b, vec3 u, vec3 c, float r){
    vec3 j1 = b + u * c.x;
    vec3 j2 = j1 + u * c.y;
    vec3 j3 = j2 + u * c.z;
    return min(min(cone(l, b, j1, r, r * 0.93), cone(l, j1, j2, r * 0.93, r * 0.86)), cone(l, j2, j3, r * 0.86, r * 0.78));
  }

  float maoAberta(vec3 l){
    // a palma, achatada, e o "gordinho" do polegar
    float d = caixinha(l - vec3(0.0, 0.45, 0.0), vec3(0.3, 0.37, 0.08), 0.07);
    d = uniao(d, elipsoide(l - vec3(0.2, 0.27, -0.04), vec3(0.15, 0.22, 0.1)), 0.08);
    // indicador, m\xE9dio, anelar e m\xEDnimo, esticados e um pouco abertos
    float dd = dedoReto(l, vec3(0.22, 0.8, 0.0), normalize(vec3(0.12, 1.0, -0.05)), vec3(0.38, 0.23, 0.17), 0.088);
    dd = min(dd, dedoReto(l, vec3(0.075, 0.84, 0.0), normalize(vec3(0.03, 1.0, -0.05)), vec3(0.42, 0.26, 0.18), 0.092));
    dd = min(dd, dedoReto(l, vec3(-0.075, 0.82, 0.0), normalize(vec3(-0.06, 1.0, -0.05)), vec3(0.39, 0.24, 0.17), 0.087));
    dd = min(dd, dedoReto(l, vec3(-0.22, 0.76, 0.0), normalize(vec3(-0.17, 1.0, -0.05)), vec3(0.3, 0.19, 0.15), 0.076));
    d = uniao(d, dd, 0.05);
    // o polegar, aberto para o lado
    float po = cone(l, vec3(0.25, 0.18, -0.04), vec3(0.42, 0.36, -0.06), 0.115, 0.1);
    po = min(po, cone(l, vec3(0.42, 0.36, -0.06), vec3(0.53, 0.52, -0.05), 0.1, 0.09));
    po = min(po, cone(l, vec3(0.53, 0.52, -0.05), vec3(0.58, 0.66, -0.04), 0.09, 0.08));
    d = uniao(d, po, 0.05);
    // o pulso
    return uniao(d, elipsoide(l - vec3(0.0, 0.0, 0.0), vec3(0.25, 0.16, 0.15)), 0.12);
  }

  // a m\xE3o aberta no tamanho do m\xEDmico (ESCALA_DA_PALMA da fechada), com a esfera que a cont\xE9m
  float palmaNoVidro(vec3 l){
    vec3 a = l / ${ub.toFixed(2)};
    float esfera = length(a - vec3(0.05, 0.8, 0.0)) - 0.98;
    return (esfera > 0.12 ? esfera : maoAberta(a)) * ${ub.toFixed(2)};
  }

  float punho(vec3 p){
    if (uMao.w < 0.01) return 9.0;
    float braco = cone(p, uPulso, uCotovelo, 0.2, 0.3);
    vec3 l = uMaoEixos * (p - uPulso);
    if (uMaoAberta > 0.5) return uniao(palmaNoVidro(l), braco, 0.1);
    float esfera = length(l - vec3(0.03, 0.5, -0.2)) - 0.78;
    return uniao(esfera > 0.12 ? esfera : maoFechada(l), braco, 0.1);
  }

  float outraMao(vec3 p){
    if (uMao2.w < 0.01) return 9.0;
    float braco = cone(p, uPulso2, uCotovelo2, 0.2, 0.3);
    return uniao(palmaNoVidro(uMaoEixos2 * (p - uPulso2)), braco, 0.1);
  }

  // o corpo do videogame: um ret\xE2ngulo de cantos bem redondos (1,1 \xD7 0,58), fino
  float corpoDoJogo(vec3 l){
    vec2 q = abs(l.xy) - vec2(0.55, 0.29) + 0.15;
    float r = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.15;
    vec2 w = vec2(r, abs(l.z) - 0.05);
    return length(max(w, 0.0)) + min(max(w.x, w.y), 0.0) - 0.015;
  }

  // a m\xE3o na ponta direita do aparelho (a da esquerda \xE9 o espelho), no espa\xE7o dele: x ao longo da
  // largura, y para o alto, z para as costas (o lado da c\xE2mera)
  float maoNoJogo(vec3 m){
    float d = elipsoide(m - vec3(0.68, -0.05, 0.03), vec3(0.17, 0.3, 0.2));
    // m\xE9dio, anelar e m\xEDnimo, abra\xE7ando as costas
    float dd = min(cone(m, vec3(0.74, 0.06, 0.15), vec3(0.54, 0.07, 0.14), 0.082, 0.078), cone(m, vec3(0.54, 0.07, 0.14), vec3(0.36, 0.06, 0.1), 0.078, 0.068));
    dd = min(dd, min(cone(m, vec3(0.74, -0.09, 0.15), vec3(0.55, -0.1, 0.14), 0.078, 0.074), cone(m, vec3(0.55, -0.1, 0.14), vec3(0.39, -0.1, 0.1), 0.074, 0.064)));
    dd = min(dd, min(cone(m, vec3(0.72, -0.22, 0.13), vec3(0.58, -0.24, 0.13), 0.068, 0.064), cone(m, vec3(0.58, -0.24, 0.13), vec3(0.46, -0.23, 0.1), 0.064, 0.056)));
    // o indicador, dobrado por cima da borda (no bot\xE3o de cima)
    dd = min(dd, min(cone(m, vec3(0.74, 0.2, 0.12), vec3(0.6, 0.31, 0.07), 0.08, 0.076), cone(m, vec3(0.6, 0.31, 0.07), vec3(0.47, 0.34, -0.01), 0.076, 0.066)));
    d = uniao(d, dd, 0.05);
    // o polegar, na frente, nos bot\xF5es
    float po = min(cone(m, vec3(0.74, -0.16, -0.06), vec3(0.6, -0.06, -0.12), 0.1, 0.088), cone(m, vec3(0.6, -0.06, -0.12), vec3(0.46, 0.0, -0.11), 0.088, 0.076));
    return uniao(d, po, 0.05);
  }

  float aparelho(vec3 p, out float maos){
    maos = 9.0;
    if (uJogo.w < 0.01) return 9.0;
    vec3 l = p - uJogo.xyz;
    l.yz = gira(l.yz, -uJogoGiro);
    vec3 m = vec3(abs(l.x), l.y, l.z);
    float esfera = length(m - vec3(0.62, 0.0, 0.03)) - 0.48;
    maos = esfera > 0.1 ? esfera : maoNoJogo(m);
    // os antebra\xE7os: do pulso, embaixo de cada ponta, descendo para fora da tela
    vec2 pulso = gira(vec2(-0.3, 0.02), uJogoGiro);
    vec3 w = vec3(abs(p.x - uJogo.x), p.y, p.z);
    vec3 a = vec3(0.74, uJogo.y + pulso.x, uJogo.z + pulso.y);
    maos = uniao(maos, cone(w, a, a + vec3(0.5, -2.4, -0.7), 0.19, 0.28), 0.1);
    return corpoDoJogo(l);
  }
`;var Mb=ir(oc(),1),lc=e=>Number.isInteger(e)?`${e}.0`:String(e),pR=e=>`vec3(${e.map(lc).join(", ")})`,mR=`
  precision highp float;
  uniform vec2 uRes;
  uniform float uRaio, uCentroY;
  uniform float uOcup, uTempo, uGrao, uAquece, uBoca, uCalorBoca, uCalorOrelha, uOnda, uRespira, uCabelo, uDensidade;
  uniform mat3 uCabeca;
  uniform vec3 uC0, uC1, uC2, uC3;
  // as brincadeiras (src/lib/brincadeirasDoRosto.js): o punho, o videogame, as batidas no vidro e a
  // frente da caixa marchada (o punho no vidro fica bem mais perto da c\xE2mera que o busto)
  uniform vec4 uMao, uJogo;
  uniform mat3 uMaoEixos;
  uniform vec3 uPulso, uCotovelo;
  uniform float uMaoAberta;
  // a segunda m\xE3o (a do m\xEDmico, sempre aberta)
  uniform vec4 uMao2;
  uniform mat3 uMaoEixos2;
  uniform vec3 uPulso2, uCotovelo2;
  uniform float uJogoGiro, uJogoTela, uFrente;
  uniform vec3 uBatida1, uBatida2;
  // sempre 0, mas o compilador n\xE3o sabe (BEYOND-0012): os la\xE7os que come\xE7am nele n\xE3o s\xE3o desenrolados
  uniform int uZero;
  ${ab}
  ${_b}

  // o busto e, nas brincadeiras, as m\xE3os e o videogame: coisa.x \xE9 a dist\xE2ncia at\xE9 a pele de fora do
  // busto (o punho, as m\xE3os abertas, as que seguram o jogo), coisa.y at\xE9 o aparelho
  float cena(vec3 p, out float orelha, out float fio, out vec2 coisa){
    float d = forma(p, orelha, fio);
    coisa = vec2(9.0);
    if (uMao.w + uMao2.w + uJogo.w < 0.01) return d;
    float maos;
    float ap = aparelho(p, maos);
    coisa = vec2(min(min(punho(p), outraMao(p)), maos), ap);
    return min(d, min(coisa.x, coisa.y));
  }
  // o meio da tela do videogame (virada para ela) e para onde ela olha
  vec3 telaDoJogo(){ return uJogo.xyz + vec3(0.0, gira(vec2(0.03, -0.07), uJogoGiro)); }
  vec3 normalDaTela(){ return vec3(0.0, gira(vec2(0.0, -1.0), uJogoGiro)); }

  // o vidro: cada batida dos n\xF3s (ou palma do m\xEDmico que encosta) faz uma onda leve na tela a partir de
  // onde tocou (b.xy, em uv; b.z \xE9 a idade em segundos, < 0 antes de tocar) e um clar\xE3o r\xE1pido no
  // ponto \u2014 leve: \xE9 uma batida de porta, n\xE3o um soco (02/11/2026)
  void batida(vec3 b, vec2 uv, inout vec2 desvio, inout float luz){
    if (b.z < 0.0 || b.z > 2.5) return;
    vec2 d = uv - b.xy;
    float r = length(d);
    float frente = r - b.z * 0.85;
    float some = exp(-b.z * 2.2);
    desvio += d / max(r, 0.001) * sin(frente * 42.0) * exp(-frente * frente * 50.0) * 0.007 * some;
    luz += exp(-frente * frente * 700.0) * some * 0.3 + exp(-r * r * 300.0) * exp(-b.z * 8.0) * 0.45;
  }

  float acaso(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float ruido(vec2 x){
    vec2 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(acaso(i), acaso(i + vec2(1.0, 0.0)), f.x), mix(acaso(i + vec2(0.0, 1.0)), acaso(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  // os fios do cabelo: riscos compridos que descem da raiz (em volta da cabe\xE7a, ao longo da altura)
  float fiosEm(vec3 p){
    vec3 q = PIVO + uCabeca * (p - PIVO);
    vec3 h = noCabelo(p, q);
    float a = atan(h.x, h.z);
    return ruido(vec2(a * 14.0, h.y * 1.2)) * 0.6 + ruido(vec2(a * 44.0, h.y * 3.0)) * 0.4;
  }

  // a normal medida com um passo e: com passo largo, \xE9 a normal de uma superf\xEDcie "borrada" \u2014 os
  // tra\xE7os pequenos (\xF3rbitas, nariz, boca) s\xF3 sugerem, como na foto.
  // Num la\xE7o, e n\xE3o em quatro chamadas (BEYOND-0012: "trava o navegador ao abrir o Assistente"): o
  // compilador do Windows (Direct3D) e o do celular copiam a cena inteira \u2014 busto, m\xE3os, videogame \u2014
  // em cada chamada, e com nove c\xF3pias o shader levava segundos para compilar com a tela parada. Os
  // quatro cantos do tetraedro s\xE3o os mesmos de antes: (1,-1,-1), (-1,-1,1), (-1,1,-1), (1,1,1).
  vec3 normalEm(vec3 p, float e){
    float o, f;
    vec2 c;
    vec3 n = vec3(0.0);
    for (int i = uZero; i < 4; i++) {
      vec3 k = 2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0;
      n += k * cena(p + k * e, o, f, c);
    }
    return normalize(n);
  }

  // o calor em cor (na t\xE9rmica: preto \u2192 vermelho escuro \u2192 laranja \u2192 creme \u2192 quase branco)
  vec3 rampa(float x){
    vec3 c = mix(vec3(0.0), uC0, smoothstep(0.2, 0.4, x));
    c = mix(c, uC2, smoothstep(0.36, 0.58, x));
    c = mix(c, uC1, smoothstep(0.54, 0.8, x));
    return mix(c, mix(uC1, vec3(1.0), 0.55), smoothstep(0.84, 1.06, x));
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * min(uRes.x, uRes.y) * uOcup);
    // as batidas no vidro entortam a tela em volta de onde o punho bateu
    vec2 desvio = vec2(0.0);
    float luzDoVidro = 0.0;
    batida(uBatida1, uv, desvio, luzDoVidro);
    batida(uBatida2, uv, desvio, luzDoVidro);
    uv += desvio;
    // o enquadramento (enquadramentoDoRosto): a c\xE2mera acompanha o centro, um pouco acima dele
    vec3 ro = vec3(0.0, uCentroY + ${lc(Number((Qs.y- -.5).toFixed(4)))}, ${lc(Qs.distancia)});
    vec3 rd = normalize(vec3(uv.x * uRaio, uCentroY + uv.y * uRaio, 0.0) - ro);
    // o gr\xE3o: muda ~24 vezes por segundo, como um filme (parado com "reduzir movimento"); um gr\xE3o
    // por pixel da tela (n\xE3o do desenho), para ele n\xE3o mudar de tamanho com a resolu\xE7\xE3o
    vec2 celula = floor(gl_FragCoord.xy / max(uDensidade, 1.0));
    float grao = acaso(celula + fract(uGrao * 0.1271) * 517.0);
    float grao2 = acaso(celula.yx * 1.37 + fract(uGrao * 0.0731) * 311.0);

    // s\xF3 marcha quem cruza a caixa do busto
    vec3 inv = 1.0 / (rd + vec3(1e-6));
    vec3 t0 = (${pR(So.min)} - ro) * inv, t1 = (vec3(${lc(So.max[0])}, ${lc(So.max[1])}, uFrente) - ro) * inv;
    vec3 ta = min(t0, t1), tb = max(t0, t1);
    float entra = max(max(ta.x, ta.y), ta.z), sai = min(min(tb.x, tb.y), tb.z);

    vec3 cor = vec3(0.0);
    float objeto = 0.0; // 1 quando o pixel \xE9 do punho, das m\xE3os ou do videogame
    float coisaPerto = 9.0; // o quanto o raio passou perto deles (o halo deles tamb\xE9m escapa do c\xEDrculo)
    float dmin = 9.0, orelhaPerto = 9.0, fioPerto = 9.0, tPerto = 0.0; // a menor dist\xE2ncia do raio ao busto (e \xE0s orelhas e ao cabelo, ali)
    float y = uCentroY + uv.y * uRaio;
    if (sai > entra) {
      float t = max(entra, 0.0), orelha = 9.0, fio = 9.0, d = 9.0;
      vec2 coisa = vec2(9.0);
      bool achou = false;
      for (int i = uZero; i < 80; i++) {
        d = cena(ro + rd * t, orelha, fio, coisa);
        coisaPerto = min(coisaPerto, min(coisa.x, coisa.y));
        if (d < dmin) { dmin = d; orelhaPerto = orelha; fioPerto = fio; tPerto = t; }
        if (d < 0.0015) { achou = true; break; }
        t += d * 0.8;
        if (t > sai) break;
      }
      // a normal medida UMA vez, para os dois casos abaixo (uma chamada a menos de normalEm \xE9 uma c\xF3pia
      // a menos da cena no shader compilado \u2014 BEYOND-0012): fina nas m\xE3os e no aparelho, larga no busto
      bool naCoisa = achou && min(coisa.x, coisa.y) < 0.004;
      vec3 p = ro + rd * t;
      vec3 nn = achou ? normalEm(p, naCoisa ? 0.012 : 0.07) : vec3(0.0, 0.0, 1.0);
      if (naCoisa) {
        // o punho, as m\xE3os e o videogame: sem os tra\xE7os do rosto, e com a normal fina (o aparelho e os
        // dedos s\xE3o menores que o passo largo do rosto). A m\xE3o \xE9 quente inteira, como numa c\xE2mera
        // t\xE9rmica de verdade \u2014 e \xE9 assim que os n\xF3s e os dedos aparecem; o pl\xE1stico \xE9 frio por dentro
        // e acende s\xF3 na borda e do lado da tela, que est\xE1 virada para ela
        y = p.y;
        float frente = clamp(dot(nn, -rd), 0.0, 1.0);
        float calor = 1.13 - 1.27 * frente;
        if (coisa.x <= coisa.y) {
          // a m\xE3o mais quente que o bra\xE7o, para o olho ir para ela
          float naMao = max(max(smoothstep(0.85, 0.5, length(p - uMao.xyz)) * step(0.01, uMao.w),
            smoothstep(0.85, 0.5, length(p - uMao2.xyz)) * step(0.01, uMao2.w)),
            smoothstep(1.15, 0.85, length(p - uJogo.xyz)) * step(0.01, uJogo.w));
          calor = 0.98 - 0.72 * frente + 0.2 * naMao;
        } else {
          vec3 l = p - uJogo.xyz;
          l.yz = gira(l.yz, -uJogoGiro);
          calor = calor * 0.85 + uJogoTela * 0.8 * smoothstep(-0.005, -0.045, l.z);
        }
        cor = rampa((calor + (grao - 0.5) * 0.12) * uAquece);
        objeto = 1.0;
      } else if (achou) {
        y = p.y;
        vec3 q = PIVO + uCabeca * (p - PIVO);
        float frente = clamp(dot(nn, -rd), 0.0, 1.0);
        // a borda \xE9 quente: quanto mais de lado a c\xE2mera v\xEA a superf\xEDcie, mais calor (uma faixa larga
        // e macia, como na foto: o creme na silhueta, o laranja e o vermelho para dentro)
        float calor = 1.13 - 1.27 * frente;
        // as orelhas, finas, ficam quentes inteiras; esquentam mais ouvindo
        float naOrelha = smoothstep(0.07, 0.0, orelha);
        calor += naOrelha * (0.75 + uCalorOrelha * 0.45 * (0.85 + 0.15 * sin(uTempo * 9.0)));
        // o cabelo (as orelhas, na frente dele, continuam pele)
        float naCabelo = smoothstep(0.03, 0.0, fio) * smoothstep(0.0, 0.03, orelha) * step(0.01, uCabelo);
        // os ombros e o alto do peito s\xE3o quentes; o meio, embaixo do pesco\xE7o, fica na sombra
        float ombro = smoothstep(-1.45, -1.95, p.y) * smoothstep(0.15, 0.7, abs(p.x) + (-1.5 - p.y) * 0.3);
        calor += ombro * 0.8 * (1.0 - naCabelo * 0.6);
        // o pesco\xE7o \xE9 morno (a garganta, de frente, continua mais escura que as laterais)
        calor += smoothstep(-0.95, -1.15, p.y) * smoothstep(-1.75, -1.45, p.y) * 0.1;
        // o meio do rosto, de frente, \xE9 frio; o nariz quase some (de lado, acenderia um risco)
        calor -= smoothstep(0.75, 0.97, frente) * 0.08 * step(-0.95, q.y);
        vec3 dn = (q - vec3(0.0, -0.4, 0.66)) * vec3(6.0, 2.8, 5.0);
        calor -= exp(-dot(dn, dn)) * 0.4;
        // falando: a boca e a garganta esquentam no ritmo da voz
        vec3 db = q - vec3(0.0, -0.73, 0.66);
        float boca = exp(-dot(db * vec3(0.8, 6.0, 1.0), db) * 22.0);
        float garganta = exp(-p.x * p.x * 14.0) * smoothstep(-0.95, -1.12, p.y) * smoothstep(-1.75, -1.4, p.y) * step(0.0, nn.z);
        calor += uCalorBoca * (boca * 0.75 + garganta * 0.55);
        // pensando: uma faixa de calor sobe pelo alto da cabe\xE7a, de baixo para cima, e recome\xE7a
        float sobe = fract(uTempo * 0.28);
        float onda = exp(-pow((q.y - mix(-0.25, 1.15, sobe)) * 6.0, 2.0)) * smoothstep(-0.5, 0.2, q.y) * step(-0.95, q.y);
        calor += uOnda * onda * 0.5 * smoothstep(0.0, 0.15, sobe) * smoothstep(1.0, 0.8, sobe);
        // o cabelo \xE9 mais frio que a pele por dentro, riscado de fios; a borda dele acende igual
        if (naCabelo > 0.0) calor = mix(calor, calor * 0.72 + 0.2 + (fiosEm(p) - 0.5) * 0.8, naCabelo);
        // o videogame ilumina o rosto de baixo: o que est\xE1 de frente para a tela dele esquenta
        if (uJogo.w > 0.01) {
          vec3 ate = telaDoJogo() - p;
          float longe = length(ate);
          calor += uJogoTela * 1.2 * exp(-longe * 2.2) * max(dot(nn, ate / longe), 0.0) * max(dot(-ate / longe, normalDaTela()), 0.0);
        }
        // o gr\xE3o mexe na fronteira das cores (o pontilhado da foto)
        calor += (grao - 0.5) * 0.12;
        cor = rampa(calor * uAquece);
      }
    }
    // o halo: fora do busto, quanto mais perto o raio passou, mais luz \u2014 branco-lil\xE1s colado na
    // borda, ciano um pouco mais longe, sumindo no preto
    if (dmin > 0.0015 && dmin < 1.0) {
      float perto = exp(-dmin * 16.0);
      vec3 lilas = mix(uC1, vec3(0.9, 0.84, 1.0), 0.6);
      vec3 h = mix(lilas, uC3, smoothstep(0.005, 0.04, dmin));
      // ouvindo, o halo em volta das orelhas acende e pulsa com o que chega
      float escuta = min(uCalorOrelha, 1.2) * smoothstep(0.08, 0.0, orelhaPerto - dmin) * (0.8 + 0.2 * sin(uTempo * 9.0));
      // em volta do cabelo, o halo sai em fios (a borda desfiada de um cabelo contra a luz)
      float desfia = 1.0;
      if (uCabelo > 0.01 && fioPerto - dmin < 0.03) desfia = mix(1.0, 0.45 + 1.1 * fiosEm(ro + rd * tPerto), smoothstep(0.03, 0.0, fioPerto - dmin));
      cor += h * (perto * 0.95 * desfia + exp(-dmin * 8.0) * 0.2 + escuta * exp(-dmin * 13.0) * 0.6) * uAquece * (0.85 + 0.3 * grao2);
    }
    // a luz da tela do videogame vaza em volta dele
    if (uJogo.w > 0.01) {
      float raioDaTela = length(cross(rd, telaDoJogo() - ro));
      cor += mix(uC3, vec3(0.8, 1.0, 0.9), 0.3) * uJogoTela * exp(-raioDaTela * 6.0) * 0.4 * uAquece;
    }
    // embaixo e dos lados, os ombros somem antes da borda da tela (e do c\xEDrculo do visual, numa
    // \xE1rea larga) \u2014 nunca um corte seco. O punho e o videogame s\xF3 somem na borda da tela: o c\xEDrculo
    // apagaria a m\xE3o, que fica ao lado do rosto
    vec2 f = gl_FragCoord.xy / uRes;
    float r = length(vec2(uv.x, min(uv.y, 0.0)));
    objeto = max(objeto, smoothstep(0.3, 0.0, coisaPerto));
    cor *= smoothstep(0.0, 0.2, f.y) * smoothstep(0.0, 0.1, f.x) * smoothstep(1.0, 0.9, f.x) * mix(smoothstep(1.32, 1.05, r), 1.0, objeto);
    // o gr\xE3o do filme por cima de tudo (e um p\xF3 leve no fundo, em volta do busto)
    cor *= 0.84 + 0.32 * grao;
    cor += mix(uC1, vec3(1.0), 0.3) * 0.9 * (grao2 * grao2) * 0.035 * smoothstep(1.25, 0.2, length(uv)) * uAquece;
    // o vidro est\xE1 na frente de tudo: a onda e o clar\xE3o das batidas n\xE3o somem na borda
    cor += mix(uC1, vec3(1.0), 0.5) * luzDoVidro * uAquece;
    cor = min(cor, vec3(1.0));
    gl_FragColor = vec4(cor, max(cor.r, max(cor.g, cor.b)));
  }
`,gR="void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }";function Sg({obterSinal:e,ocupacao:t=.78,ajustes:n=null,zoom:i=1,brincadeiras:a=!1}){let s=(0,ms.useRef)(null),r=(0,ms.useRef)(e);r.current=e;let o=(0,ms.useRef)(a);o.current=a;let l=(0,ms.useRef)(n);l.current=n;let c=(0,ms.useRef)(i);return c.current=i,(0,ms.useEffect)(()=>{let f=s.current;if(!f)return;let p;try{p=new Bf({antialias:!1,alpha:!0,premultipliedAlpha:!0,powerPreference:"high-performance"})}catch{return}p.setClearColor(0,0),f.appendChild(p.domElement),Object.assign(p.domElement.style,{display:"block",width:"100%",height:"100%"});let u=new Pl,d=new Zs(-1,1,1,-1,0,10),_=Hf(),b=Bt=>{_=Bt?.detail||Hf()},g=Bt=>{Bt.key===og&&(_=Hf())};window.addEventListener(lg,b),window.addEventListener("storage",g);let h=()=>l.current?cg(l.current):_,x=h(),S=ug(x.paleta,"pronta"),m={uRes:{value:new $t(1,1)},uRaio:{value:Gf(i).raio},uCentroY:{value:Gf(i).centroY},uOcup:{value:t},uTempo:{value:0},uGrao:{value:0},uAquece:{value:0},uBoca:{value:0},uCalorBoca:{value:0},uCalorOrelha:{value:0},uOnda:{value:0},uRespira:{value:0},uCabelo:{value:x.cabelo==="longo"?1:0},uDensidade:{value:1},uCabeca:{value:new Lt},uC0:{value:new Gt(S[3])},uC1:{value:new Gt(S[0])},uC2:{value:new Gt(S[1])},uC3:{value:new Gt(S[2])},uMao:{value:new ve(0,0,0,0)},uMaoEixos:{value:new Lt},uPulso:{value:new P},uCotovelo:{value:new P},uMaoAberta:{value:0},uMao2:{value:new ve(0,0,0,0)},uMaoEixos2:{value:new Lt},uPulso2:{value:new P},uCotovelo2:{value:new P},uJogo:{value:new ve(0,0,0,0)},uJogoGiro:{value:0},uJogoTela:{value:0},uFrente:{value:yg(null)},uBatida1:{value:new P(0,0,-1)},uBatida2:{value:new P(0,0,-1)},uZero:{value:0}},E=new Ys(2,2),w=new vn({uniforms:m,vertexShader:gR,fragmentShader:mR,transparent:!0,depthWrite:!1,depthTest:!1,blending:ui}),C=new Rn(E,w);C.frustumCulled=!1,u.add(C);let A=!!window.matchMedia?.("(pointer: coarse)").matches?820:1100,R=new $t,D={w:1,h:1},I=()=>{let Bt=f.clientWidth,Dt=f.clientHeight;!Bt||!Dt||(D.w=Bt,D.h=Dt,p.setPixelRatio(sb(Bt,Dt,window.devicePixelRatio||1,A)),p.setSize(Bt,Dt,!1),p.getDrawingBufferSize(R),m.uRes.value.copy(R),m.uDensidade.value=p.getPixelRatio())},Y=new ResizeObserver(I);Y.observe(f),I();let K=fb(),F=()=>performance.now()/1e3,W=()=>K.gesto(F()),H=["pointerdown","keydown","wheel","touchstart"];H.forEach(Bt=>window.addEventListener(Bt,W,{passive:!0})),document.addEventListener("visibilitychange",W);let Q=Bt=>{o.current&&K.pedir(Bt?.detail,F())};window.addEventListener(pg,Q);let tt=document.createElement("div");Object.assign(tt.style,{position:"absolute",inset:"0",pointerEvents:"none"}),f.appendChild(tt);let ut=[0,1].map(()=>{let Bt=document.createElement("div");return Object.assign(Bt.style,{position:"absolute",left:"0",top:"0",padding:"7px 14px",borderRadius:"16px",background:"rgba(6, 8, 12, 0.78)",border:"1px solid",whiteSpace:"nowrap",font:"600 15px/1.2 var(--bb-fonte, system-ui, sans-serif)",letterSpacing:"0.02em",opacity:"0",willChange:"transform, opacity"}),tt.appendChild(Bt),Bt}),ht=new Map,_t=null,ne=(Bt,Dt,ee)=>{_t!==x.paleta&&(_t=x.paleta,ut.forEach(St=>Object.assign(St.style,{color:ee[0],borderColor:ee[2],boxShadow:`0 0 18px ${ee[2]}55`})),ht.forEach(St=>{St.style.color=ee[1]}));let N=m.uOcup.value;ut.forEach((St,T)=>{let v=Bt?.falas?.[T],O=v?v.opacidade:0;if(O<=.001){St.style.opacity!=="0"&&(St.style.opacity="0");return}St.textContent!==v.texto&&(St.textContent=v.texto);let[B,k]=xg(v.ponto,Dt,D.w,D.h,N),nt=Math.min(D.w-90,Math.max(90,B+v.desvio[0])),it=Math.max(40,k+v.desvio[1]);St.style.opacity=O.toFixed(3),St.style.transform=`translate(${nt.toFixed(1)}px, ${it.toFixed(1)}px) translate(-50%, -100%) scale(${(.9+.1*O).toFixed(3)})`});let we=new Set;for(let St of Bt?.notas||[]){we.add(St.chave);let T=ht.get(St.chave);T||(T=document.createElement("span"),Object.assign(T.style,{position:"absolute",left:"0",top:"0",fontWeight:"700",color:ee[1],textShadow:`0 0 10px ${ee[2]}`,willChange:"transform, opacity"}),tt.appendChild(T),ht.set(St.chave,T)),T.textContent!==St.simbolo&&(T.textContent=St.simbolo);let v=St.idade/St.vida,[O,B]=xg(St.ponto,Dt,D.w,D.h,N),k=Math.min(1,St.idade/.25)*Math.min(1,(1-v)/.4)*(St.opacidade??1);T.style.fontSize=`${St.tamanho}px`,T.style.opacity=Math.max(0,k).toFixed(3),T.style.transform=`translate(${(O+St.deriva[0]*v+Math.sin(St.idade*5)*6).toFixed(1)}px, ${(B+St.deriva[1]*v).toFixed(1)}px) translate(-50%, -50%) rotate(${(Math.sin(St.idade*3)*12).toFixed(1)}deg)`}ht.forEach((St,T)=>{!we.has(T)&&St.style.opacity!=="0"&&(St.style.opacity="0")})},de={x:0,y:0,quando:-99},te=Bt=>{K.gesto(F(),{fraco:!0});let Dt=f.getBoundingClientRect();!Dt.width||!Dt.height||(de.x=(Bt.clientX-Dt.left)/Dt.width*2-1,de.y=-((Bt.clientY-Dt.top)/Dt.height*2-1),de.quando=performance.now()/1e3)};window.addEventListener("pointermove",te,{passive:!0});let q=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,rt=tb(),et=eb(),Ot=rb(),It=[new Gt,new Gt,new Gt,new Gt],Ct=new Fi,De=new Ne,Ht=-1,ae=performance.now()/1e3,Wt=0,qt,Ue=Bt=>{let Dt=Bt/1e3,ee=Math.min(.05,Math.max(0,Dt-ae)),N=Dt-ae;ae=Dt,Ht<0&&(Ht=Dt),Wt=N>.034?Wt+1:Math.max(0,Wt-1),Wt>45&&A>420&&(A=Math.max(420,Math.round(A*.85)),Wt=0,I());let we={estado:"pronta",nivel:null};try{we=r.current?.()||we}catch{}let St=rt(we,Dt,ee),T=et(we.estado,ee);x=h();let v=ug(x.paleta,we.estado);v.forEach((Et,Ut)=>It[Ut].set(Et));let O=Math.min(1,ee*2.5);m.uC1.value.lerp(It[0],O),m.uC2.value.lerp(It[1],O),m.uC3.value.lerp(It[2],O),m.uC0.value.lerp(It[3],O);let B=Gf(c.current),k=q?1:Math.min(1,ee*2.5);m.uRaio.value+=(B.raio-m.uRaio.value)*k,m.uCentroY.value+=(B.centroY-m.uCentroY.value)*k;let nt=x.cabelo==="longo"?1:0,it=m.uCabelo;it.value=q?nt:it.value+(nt-it.value)*Math.min(1,ee*2.2),Math.abs(it.value-nt)<.002&&(it.value=nt);let X=Ot({pesos:T,amp:q?St*.5:St,t:Dt,dt:ee,ponteiro:de,reduzido:q}),Z=o.current&&!q?K.passo(Dt,we.estado):null,lt=m.uRes.value.x/Math.max(1,m.uRes.value.y),mt=Z?vb(Z.id,Z.s,Z.peso,{proporcao:lt}):null,ct=mt?.cabeca;Ct.set(X.pitch+(ct?.pitch||0),X.yaw+(ct?.yaw||0),X.roll+(ct?.roll||0)),m.uCabeca.value.setFromMatrix4(De.makeRotationFromEuler(Ct)).transpose(),m.uBoca.value=Math.max(X.boca,mt?.boca||0),m.uCalorBoca.value=Math.max(X.calorBoca,mt?.calorBoca||0);let ot=(Et,[Ut,U,at,J])=>{if(!Et){Ut.value.w=0;return}let{centro:st,eixos:[ft,$,Mt],pulso:yt,cotovelo:_e}=Et;Ut.value.set(st[0],st[1],st[2],1),U.value.set(ft[0],ft[1],ft[2],$[0],$[1],$[2],Mt[0],Mt[1],Mt[2]),at.value.set(yt[0],yt[1],yt[2]),J.value.set(_e[0],_e[1],_e[2])};ot(mt?.mao,[m.uMao,m.uMaoEixos,m.uPulso,m.uCotovelo]),ot(mt?.mao2,[m.uMao2,m.uMaoEixos2,m.uPulso2,m.uCotovelo2]),m.uMaoAberta.value=mt?.mao?.aberta?1:0,mt?.jogo?(m.uJogo.value.set(mt.jogo.pos[0],mt.jogo.pos[1],mt.jogo.pos[2],1),m.uJogoGiro.value=mt.jogo.giro,m.uJogoTela.value=mt.jogo.tela):(m.uJogo.value.w=0,m.uJogoTela.value=0),m.uFrente.value=yg(mt);let Tt={raio:m.uRaio.value,centroY:m.uCentroY.value};[m.uBatida1,m.uBatida2].forEach((Et,Ut)=>{let U=mt?.batidas?.[Ut];if(U&&U.idade>=0){let[at,J]=_g(U.ponto,Tt);Et.value.set(at,J,U.idade)}else Et.value.set(0,0,-1)}),ne(mt,Tt,v),m.uCalorOrelha.value=X.calorOrelha,m.uOnda.value=X.onda,m.uRespira.value=X.respira,m.uTempo.value=q?Dt*.4:Dt,m.uGrao.value=q||window.LisaGraoParado?0:Math.floor(Dt*24),m.uAquece.value=q?1:Math.min(1,(Dt-Ht)/1.3),p.render(u,d),qt=requestAnimationFrame(Ue)},Le=!0,Be=()=>{Le&&(qt=requestAnimationFrame(Ue))};return p.compileAsync(u,d).then(Be,Be),()=>{Le=!1,cancelAnimationFrame(qt),Y.disconnect(),window.removeEventListener("pointermove",te),window.removeEventListener(lg,b),window.removeEventListener("storage",g),H.forEach(Bt=>window.removeEventListener(Bt,W)),document.removeEventListener("visibilitychange",W),window.removeEventListener(pg,Q),tt.remove(),E.dispose(),w.dispose(),p.dispose(),p.domElement.remove()}},[t]),(0,Mb.jsx)("div",{ref:s,"aria-hidden":"true",style:{position:"absolute",inset:0}})}var Eb=ir(oc());function vR(e,t,n,i){let a=(0,bb.createRoot)(e),s=i&&i.ocupacao||.72;return a.render((0,Eb.jsx)(Sg,{obterSinal:t,ajustes:n,ocupacao:s,zoom:1})),()=>a.unmount()}function _R(){try{let e=document.createElement("canvas");return!!(e.getContext("webgl2")||e.getContext("webgl"))}catch{return!1}}window.LisaRosto={montar:vR,temWebgl:_R};})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
