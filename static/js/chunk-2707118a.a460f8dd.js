(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2707118a"],{1148:function(t,e,i){"use strict";var s=i("a691"),n=i("1d80");t.exports="".repeat||function(t){var e=String(n(this)),i="",a=s(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(i+=e);return i}},"1d21":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"row justify-center text-center text-h4 text-grey-10"},[t._v(" "+t._s(t.work.name)+" ")]),i("div",{staticClass:"row justify-center q-mt-md"},[i("div",{staticClass:"col-sm-8"},[i("div",{staticClass:"row text-h6 q-mt-sm"},[i("div",{staticClass:"col-auto"},[t._v(" Создатель работы: ")]),i("div",{staticClass:"col-auto text-primary q-ml-sm"},[t._v(" "+t._s(t.creator)+" ")])]),i("div",{staticClass:"row text-h6 q-mt-sm"},[i("div",{staticClass:"col-auto"},[t._v(" Статус работы: ")]),i("div",{staticClass:"col-auto text-primary q-ml-sm"},[t._v(" "+t._s(t.work.status)+" ")])]),i("div",{staticClass:"row text-h6 q-mt-sm"},[i("div",{staticClass:"col-auto q-mr-sm"},[t._v(" Оценка рецензента: "+t._s(t.work.reviewerScore)+" ")]),t._v(" | "),i("div",{staticClass:"col-auto q-ml-sm"},[t._v(" Оценка руководителя: "+t._s(t.work.directorScore)+" ")])]),i("div",{staticClass:"row text-h6 q-mt-sm"},[i("a",{staticClass:"col-auto text-primary q-mr-sm cursor-pointer",attrs:{href:t.work.workLink,target:"_blank"}},[t._v(" Ссылка на работу ")]),t._v(" | "),i("a",{staticClass:"col-auto q-ml-sm text-primary q-mr-sm cursor-pointer",attrs:{href:t.work.documentLink,target:"_blank"}},[t._v(" Ссылка на документацию ")])]),i("div",{staticClass:"row text-h6 q-mt-sm items-center"},[i("div",{staticClass:"col-auto"},[t._v(" Комментарий создателя: ")]),i("div",{staticClass:"col-auto q-ml-sm text-body1"},[t._v(" "+t._s(t.work.comment)+" ")])]),i("div",{staticClass:"row text-h6 q-mt-sm items-center"},[i("div",{staticClass:"col-auto"},[t._v(" Срок окончания: ")]),i("div",{staticClass:"col-auto q-ml-sm text-negative"},[t._v(" "+t._s(t.deadline)+" ")])])])]),t.isInfoTask?[i("div",{staticClass:"row justify-center text-h5 q-mt-md"},[t._v(" Проверки: ")]),i("div",{staticClass:"row justify-center q-mt-lg"},[i("div",{staticClass:"col-sm-8 text-body1"},[t._l(t.work.checks,(function(e,s){return i("div",{key:s,staticClass:"row items-center"},[i("div",{staticClass:"col-6 text-bold"},[t._v(" "+t._s(t.username(e.userId))+" ")]),i("div",{staticClass:"col-4"},[t._v(" "+t._s(e.comment)+" ")]),i("div",{staticClass:"col-2 text-primary text-h5"},[t._v(" "+t._s(-1===e.value?"-":e.value)+" ")])])})),i("q-separator",{staticClass:"q-my-md"}),i("div",{staticClass:"row items-center"},[i("div",{staticClass:"col-6 text-bold"},[t._v(" Всего проверок: "+t._s(t.work.checks.length)+" ")]),i("div",{staticClass:"col-1 text-green-8"}),i("div",{staticClass:"col-3 text-bold"},[t._v(" Средний балл: ")]),i("div",{staticClass:"col-2 text-primary text-h5"},[t._v(" "+t._s(-1===t.work.totalScore?"-":t.work.totalScore)+" ")])])],2)])]:[i("div",{staticClass:"row justify-center"},[i("q-knob",{staticClass:"text-blue-9 q-my-sm",attrs:{min:0,max:10,step:.1,"show-value":"",size:"10em",color:"blue-9"},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}},[t._v(" "+t._s(t.score)+"/10 ")])],1),i("div",{staticClass:"row justify-center"},[i("q-input",{staticClass:"col-sm-8 text-body1",attrs:{placeholder:"Ваш комментарий / вопросы по проверке",type:"textarea",autogrow:""},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1)],i("div",{staticClass:"row justify-center q-mt-lg"},[i("q-btn",{staticClass:"col-sm-8",attrs:{color:"blue-9",size:"md"},on:{click:t.saveTask}},[t._v(" "+t._s(t.isInfoTask?"Назад к списку работ":"Закончить проверку")+" ")])],1)],2)},n=[],a=(i("b0c0"),i("96cf"),i("1da1")),o=i("2b0e"),r=o["a"].extend({name:"Task",data:function(){return{id:-1,score:5,comment:"",isInfoTask:!1,interval:0}},computed:{work:function(){return this.$store.getters.work(this.id)},deadline:function(){if(!this.work.deadline)return"Дедлайн не установлен";var t={year:"numeric",month:"long",day:"numeric"};return new Date(this.work.deadline).toLocaleDateString("ru-RU",t)},creator:function(){var t=this.$store.getters.user(this.work.creatorId)||this.$store.getters.me;return this.$store.getters.shortName(t)}},created:function(){this.isInfoTask="TaskInfo"===this.$route.name,this.id=this.$route.params.id,this.work?(this.loadData(),this.interval=setInterval(this.loadData,5e3)):this.$router.push({name:"Tasks"})},beforeDestroy:function(){clearInterval(this.interval)},methods:{loadData:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$store.dispatch("loadWorks"),t.$store.dispatch("loadChecks");case 2:case"end":return e.stop()}}),e)})))()},saveTask:function(){if(this.isInfoTask)this.$router.push({name:"Tasks"});else{var t=this.$store.dispatch("setCheck",{workId:this.id,score:this.score,comment:this.comment});t&&this.$router.push({name:"TaskInfo",params:{id:this.id+""}})&&(this.isInfoTask=!0)}},username:function(t){var e=this.$store.getters.user(t)||this.$store.getters.me;return this.$store.getters.longName(e)}}}),c=r,l=i("2877"),u=(i("caad"),i("a9e3"),i("b680"),i("ac1f"),i("1276"),i("498a"),i("5530")),d=i("d882"),h=i("7937"),v=i("dde5"),m=i("0cd3"),f=(i("99af"),i("87e8")),p=i("6642"),b=50,_=2*b,g=_*Math.PI,y=Math.round(1e3*g)/1e3,k=o["a"].extend({name:"QCircularProgress",mixins:[f["a"],p["a"]],props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,thickness:{type:Number,default:.2,validator:function(t){return t>=0&&t<=1}},angle:{type:Number,default:0},indeterminate:Boolean,showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},computed:{normalizedValue:function(){return Object(h["a"])(this.value,this.min,this.max)},svgStyle:function(){return{transform:"rotate3d(0, 0, 1, ".concat(this.angle-90,"deg)")}},circleStyle:function(){if(!0!==this.instantFeedback&&!0!==this.indeterminate)return{transition:"stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"}},dir:function(){return(!0===this.$q.lang.rtl?-1:1)*(this.reverse?-1:1)},viewBox:function(){return _/(1-this.thickness/2)},viewBoxAttr:function(){return"".concat(this.viewBox/2," ").concat(this.viewBox/2," ").concat(this.viewBox," ").concat(this.viewBox)},strokeDashOffset:function(){var t=1-(this.normalizedValue-this.min)/(this.max-this.min);return this.dir*t*g},strokeWidth:function(){return this.thickness/2*this.viewBox},attrs:function(){return{role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":!0===this.indeterminate?void 0:this.normalizedValue}}},methods:{__getCircle:function(t,e){var i=e.thickness,s=e.offset,n=e.color,a=e.cls;return t("circle",{staticClass:"q-circular-progress__"+a,class:void 0!==n?"text-".concat(n):null,style:this.circleStyle,attrs:{fill:"transparent",stroke:"currentColor","stroke-width":i,"stroke-dasharray":y,"stroke-dashoffset":s,cx:this.viewBox,cy:this.viewBox,r:b}})}},render:function(t){var e=[];void 0!==this.centerColor&&"transparent"!==this.centerColor&&e.push(t("circle",{staticClass:"q-circular-progress__center",class:"text-".concat(this.centerColor),attrs:{fill:"currentColor",r:b-this.strokeWidth/2,cx:this.viewBox,cy:this.viewBox}})),void 0!==this.trackColor&&"transparent"!==this.trackColor&&e.push(this.__getCircle(t,{cls:"track",thickness:this.strokeWidth,offset:0,color:this.trackColor})),e.push(this.__getCircle(t,{cls:"circle",thickness:this.strokeWidth,offset:this.strokeDashOffset,color:this.color}));var i=[t("svg",{staticClass:"q-circular-progress__svg",style:this.svgStyle,attrs:{focusable:"false",viewBox:this.viewBoxAttr,"aria-hidden":"true"}},e)];return!0===this.showValue&&i.push(t("div",{staticClass:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:this.fontSize}},void 0!==this.$scopedSlots.default?this.$scopedSlots.default():[t("div",[this.normalizedValue])])),t("div",{staticClass:"q-circular-progress",class:"q-circular-progress--".concat(!0===this.indeterminate?"in":"","determinate"),style:this.sizeStyle,on:Object(u["a"])({},this.qListeners),attrs:this.attrs},Object(v["b"])(i,this,"internal"))}}),w=i("f89c"),x=(i("c975"),i("0967")),C=i("3627"),q=i("2248");function j(t,e,i){var s,n=Object(d["h"])(t),a=n.left-e.event.x,o=n.top-e.event.y,r=Math.abs(a),c=Math.abs(o),l=e.direction;!0===l.horizontal&&!0!==l.vertical?s=a<0?"left":"right":!0!==l.horizontal&&!0===l.vertical?s=o<0?"up":"down":!0===l.up&&o<0?(s="up",r>c&&(!0===l.left&&a<0?s="left":!0===l.right&&a>0&&(s="right"))):!0===l.down&&o>0?(s="down",r>c&&(!0===l.left&&a<0?s="left":!0===l.right&&a>0&&(s="right"))):!0===l.left&&a<0?(s="left",r<c&&(!0===l.up&&o<0?s="up":!0===l.down&&o>0&&(s="down"))):!0===l.right&&a>0&&(s="right",r<c&&(!0===l.up&&o<0?s="up":!0===l.down&&o>0&&(s="down")));var u=!1;if(void 0===s&&!1===i){if(!0===e.event.isFirst||void 0===e.event.lastDir)return{};s=e.event.lastDir,u=!0,"left"===s||"right"===s?(n.left-=a,r=0,a=0):(n.top-=o,c=0,o=0)}return{synthetic:u,payload:{evt:t,touch:!0!==e.event.mouse,mouse:!0===e.event.mouse,position:n,direction:s,isFirst:e.event.isFirst,isFinal:!0===i,duration:Date.now()-e.event.time,distance:{x:r,y:c},offset:{x:a,y:o},delta:{x:n.left-e.event.lastX,y:n.top-e.event.lastY}}}}function O(t){var e=t.__qtouchpan;void 0!==e&&(void 0!==e.event&&e.end(),Object(d["b"])(e,"main"),Object(d["b"])(e,"temp"),!0===x["a"].is.firefox&&Object(d["j"])(t,!1),void 0!==e.styleCleanup&&e.styleCleanup(),delete t.__qtouchpan)}var S=0,B={name:"touch-pan",bind:function(t,e){var i=e.value,s=e.modifiers;if(void 0!==t.__qtouchpan&&(O(t),t.__qtouchpan_destroyed=!0),!0===s.mouse||!0===x["a"].has.touch){var n={uid:"qvtp_"+S++,handler:i,modifiers:s,direction:Object(C["a"])(s),noop:d["g"],mouseStart:function(t){Object(C["c"])(t,n)&&Object(d["e"])(t)&&(Object(d["a"])(n,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),n.start(t,!0))},touchStart:function(t){if(Object(C["c"])(t,n)){var e=Object(C["b"])(t.target);Object(d["a"])(n,"temp",[[e,"touchmove","move","notPassiveCapture"],[e,"touchcancel","end","passiveCapture"],[e,"touchend","end","passiveCapture"]]),n.start(t)}},start:function(e,i){!0===x["a"].is.firefox&&Object(d["j"])(t,!0),n.lastEvt=e;var a=Object(d["h"])(e);if(!0===i||!0===s.stop){if(!0!==n.direction.all&&(!0!==i||!0!==n.direction.mouseAllDir)){var o=e.type.indexOf("mouse")>-1?new MouseEvent(e.type,e):new TouchEvent(e.type,e);!0===e.defaultPrevented&&Object(d["i"])(o),!0===e.cancelBubble&&Object(d["k"])(o),o.qClonedBy=void 0===e.qClonedBy?[n.uid]:e.qClonedBy.concat(n.uid),o.qKeyEvent=e.qKeyEvent,o.qClickOutside=e.qClickOutside,n.initialEvent={target:e.target,event:o}}Object(d["k"])(e)}n.event={x:a.left,y:a.top,time:Date.now(),mouse:!0===i,detected:!1,isFirst:!0,isFinal:!1,lastX:a.left,lastY:a.top}},move:function(t){if(void 0!==n.event){n.lastEvt=t;var e=!0===n.event.mouse,i=function(){a(t,e),!0!==s.preserveCursor&&(document.documentElement.style.cursor="grabbing"),!0===e&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Object(q["a"])(),n.styleCleanup=function(t){if(n.styleCleanup=void 0,!0!==s.preserveCursor&&(document.documentElement.style.cursor=""),document.body.classList.remove("non-selectable"),!0===e){var i=function(){document.body.classList.remove("no-pointer-events--children")};void 0!==t?setTimeout((function(){i(),t()}),50):i()}else void 0!==t&&t()}};if(!0!==n.event.detected){if(!0===n.direction.all||!0===e&&!0===n.modifiers.mouseAllDir)return i(),n.event.detected=!0,void n.move(t);var o=Object(d["h"])(t),r=o.left-n.event.x,c=o.top-n.event.y,l=Math.abs(r),u=Math.abs(c);l!==u&&(!0===n.direction.horizontal&&l>u||!0===n.direction.vertical&&l<u||!0===n.direction.up&&l<u&&c<0||!0===n.direction.down&&l<u&&c>0||!0===n.direction.left&&l>u&&r<0||!0===n.direction.right&&l>u&&r>0?(n.event.detected=!0,n.move(t)):n.end(t,!0))}else{!0!==n.event.isFirst&&a(t,n.event.mouse);var h=j(t,n,!1),v=h.payload,m=h.synthetic;void 0!==v&&(!1===n.handler(v)?n.end(t):(void 0===n.styleCleanup&&!0===n.event.isFirst&&i(),n.event.lastX=v.position.left,n.event.lastY=v.position.top,n.event.lastDir=!0===m?void 0:v.direction,n.event.isFirst=!1))}}},end:function(e,i){if(void 0!==n.event){if(Object(d["b"])(n,"temp"),!0===x["a"].is.firefox&&Object(d["j"])(t,!1),!0===i)void 0!==n.styleCleanup&&n.styleCleanup(),!0!==n.event.detected&&void 0!==n.initialEvent&&n.initialEvent.target.dispatchEvent(n.initialEvent.event);else if(!0===n.event.detected){!0===n.event.isFirst&&n.handler(j(void 0===e?n.lastEvt:e,n).payload);var s=j(void 0===e?n.lastEvt:e,n,!0),a=s.payload,o=function(){n.handler(a)};void 0!==n.styleCleanup?n.styleCleanup(o):o()}n.event=void 0,n.initialEvent=void 0,n.lastEvt=void 0}}};t.__qtouchpan=n,!0===s.mouse&&Object(d["a"])(n,"main",[[t,"mousedown","mouseStart","passive".concat(!0===s.mouseCapture?"Capture":"")]]),!0===x["a"].has.touch&&Object(d["a"])(n,"main",[[t,"touchstart","touchStart","passive".concat(!0===s.capture?"Capture":"")],[t,"touchmove","noop","notPassiveCapture"]])}function a(t,e){!0===s.mouse&&!0===e?Object(d["l"])(t):(!0===s.stop&&Object(d["k"])(t),!0===s.prevent&&Object(d["i"])(t))}},update:function(t,e){var i=e.oldValue,s=e.value,n=t.__qtouchpan;void 0!==n&&i!==s&&("function"!==typeof s&&n.end(),n.handler=s)},unbind:function(t){void 0===t.__qtouchpan_destroyed?O(t):delete t.__qtouchpan_destroyed}},$=[34,37,40,33,39,38],F=o["a"].extend({name:"QKnob",mixins:[{props:k.options.props},w["b"]],directives:{TouchPan:B},props:{step:{type:Number,default:1,validator:function(t){return t>=0}},tabindex:{type:[Number,String],default:0},disable:Boolean,readonly:Boolean},data:function(){return{model:this.value,dragging:!1}},watch:{value:function(t){if(t<this.min)this.model=this.min;else{if(!(t>this.max))return void(t!==this.model&&(this.model=t));this.model=this.max}this.model!==this.value&&(this.$emit("input",this.model),this.$emit("change",this.model))}},computed:{classes:function(){return"q-knob non-selectable"+(!0===this.editable?" q-knob--editable":!0===this.disable?" disabled":"")},editable:function(){return!1===this.disable&&!1===this.readonly},decimals:function(){return(String(this.step).trim("0").split(".")[1]||"").length},computedStep:function(){return 0===this.step?1:this.step},computedInstantFeedback:function(){return!0===this.instantFeedback||!0===this.dragging},onEvents:function(){return!0===this.$q.platform.is.mobile?{click:this.__click}:{mousedown:this.__activate,click:this.__click,keydown:this.__keydown,keyup:this.__keyup}},attrs:function(){var t={role:"slider","aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.value};return!0===this.editable?t.tabindex=this.tabindex:t["aria-".concat(!0===this.disable?"disabled":"readonly")]="",t}},methods:{__updateCenterPosition:function(){var t=this.$el.getBoundingClientRect(),e=t.top,i=t.left,s=t.width,n=t.height;this.centerPosition={top:e+n/2,left:i+s/2}},__pan:function(t){t.isFinal?(this.__updatePosition(t.evt,!0),this.dragging=!1):t.isFirst?(this.__updateCenterPosition(),this.dragging=!0,this.__updatePosition(t.evt)):this.__updatePosition(t.evt)},__click:function(t){this.__updateCenterPosition(),this.__updatePosition(t,!0)},__keydown:function(t){if($.includes(t.keyCode)){Object(d["l"])(t);var e=([34,33].includes(t.keyCode)?10:1)*this.computedStep,i=[34,37,40].includes(t.keyCode)?-e:e;this.model=Object(h["a"])(parseFloat((this.model+i).toFixed(this.decimals)),this.min,this.max),this.__updateValue()}},__keyup:function(t){$.includes(t.keyCode)&&this.__updateValue(!0)},__activate:function(t){this.__updateCenterPosition(),this.__updatePosition(t)},__updatePosition:function(t,e){var i=this.centerPosition,s=Object(d["h"])(t),n=Math.abs(s.top-i.top),a=Math.sqrt(Math.pow(n,2)+Math.pow(Math.abs(s.left-i.left),2)),o=Math.asin(n/a)*(180/Math.PI);o=s.top<i.top?i.left<s.left?90-o:270+o:i.left<s.left?o+90:270-o,this.angle&&(o=Object(h["c"])(o-this.angle,0,360)),!0===this.$q.lang.rtl&&(o=360-o);var r=this.min+o/360*(this.max-this.min);if(0!==this.step){var c=this.computedStep,l=r%c;r=r-l+(Math.abs(l)>=c/2?(l<0?-1:1)*c:0),r=parseFloat(r.toFixed(this.decimals))}r=Object(h["a"])(r,this.min,this.max),this.$emit("drag-value",r),this.model!==r&&(this.model=r),this.__updateValue(e)},__updateValue:function(t){this.value!==this.model&&this.$emit("input",this.model),!0===t&&this.$emit("change",this.model)},__getNameInput:function(){return this.$createElement("input",{attrs:this.formAttrs})}},render:function(t){var e={class:this.classes,attrs:this.attrs,props:Object(u["a"])(Object(u["a"])({},this.$props),{},{value:this.model,instantFeedback:this.computedInstantFeedback})};return!0===this.editable&&(e.on=this.onEvents,e.directives=Object(m["a"])(this,"dir",[{name:"touch-pan",value:this.__pan,modifiers:{prevent:!0,stop:!0,mouse:!0}}]),void 0!==this.name&&(e.scopedSlots={internal:this.__getNameInput})),t(k,e,Object(v["c"])(this,"default"))}}),E=i("27f9"),P=i("eb85"),I=i("9c40"),M=i("93dc"),T=i.n(M),z=Object(l["a"])(c,s,n,!1,null,null,null);e["default"]=z.exports;T()(z,"components",{QKnob:F,QInput:E["a"],QSeparator:P["a"],QBtn:I["a"]})},2248:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var s=i("0967");function n(){if(void 0!==window.getSelection){var t=window.getSelection();void 0!==t.empty?t.empty():void 0!==t.removeAllRanges&&(t.removeAllRanges(),!0!==s["b"].is.mobile&&t.addRange(document.createRange()))}else void 0!==document.selection&&document.selection.empty()}},"408a":function(t,e,i){var s=i("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=s(t))throw TypeError("Incorrect invocation");return+t}},7937:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"d",(function(){return o}));i("99af"),i("a15b"),i("fb6a"),i("b680");function s(t){return t.charAt(0).toUpperCase()+t.slice(1)}function n(t,e,i){return i<=e?e:Math.min(i,Math.max(e,t))}function a(t,e,i){if(i<=e)return e;var s=i-e+1,n=e+(t-e)%s;return n<e&&(n=s+n),0===n?0:n}function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0";if(void 0===t||null===t)return t;var s=""+t;return s.length>=e?s:new Array(e-s.length+1).join(i)+s}},b680:function(t,e,i){"use strict";var s=i("23e7"),n=i("a691"),a=i("408a"),o=i("1148"),r=i("d039"),c=1..toFixed,l=Math.floor,u=function(t,e,i){return 0===e?i:e%2===1?u(t,e-1,i*t):u(t*t,e/2,i)},d=function(t){var e=0,i=t;while(i>=4096)e+=12,i/=4096;while(i>=2)e+=1,i/=2;return e},h=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!r((function(){c.call({})}));s({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,i,s,r,c=a(this),h=n(t),v=[0,0,0,0,0,0],m="",f="0",p=function(t,e){var i=-1,s=e;while(++i<6)s+=t*v[i],v[i]=s%1e7,s=l(s/1e7)},b=function(t){var e=6,i=0;while(--e>=0)i+=v[e],v[e]=l(i/t),i=i%t*1e7},_=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==v[t]){var i=String(v[t]);e=""===e?i:e+o.call("0",7-i.length)+i}return e};if(h<0||h>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(m="-",c=-c),c>1e-21)if(e=d(c*u(2,69,1))-69,i=e<0?c*u(2,-e,1):c/u(2,e,1),i*=4503599627370496,e=52-e,e>0){p(0,i),s=h;while(s>=7)p(1e7,0),s-=7;p(u(10,s,1),0),s=e-1;while(s>=23)b(1<<23),s-=23;b(1<<s),p(1,1),b(2),f=_()}else p(0,i),p(1<<-e,0),f=_()+o.call("0",h);return h>0?(r=f.length,f=m+(r<=h?"0."+o.call("0",h-r)+f:f.slice(0,r-h)+"."+f.slice(r-h))):f=m+f,f}})},eb85:function(t,e,i){"use strict";i("99af");var s=i("5530"),n=i("2b0e"),a=i("b7fa"),o=i("87e8"),r={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},c={xs:2,sm:4,md:8,lg:16,xl:24};e["a"]=n["a"].extend({name:"QSeparator",mixins:[a["a"],o["a"]],props:{spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},computed:{orientation:function(){return!0===this.vertical?"vertical":"horizontal"},classPrefix:function(){return" q-separator--".concat(this.orientation)},insetClass:function(){return!1!==this.inset?"".concat(this.classPrefix,"-").concat(r[this.inset]):""},classes:function(){return"q-separator".concat(this.classPrefix).concat(this.insetClass)+(void 0!==this.color?" bg-".concat(this.color):"")+(!0===this.isDark?" q-separator--dark":"")},style:function(){var t={};if(void 0!==this.size&&(t[!0===this.vertical?"width":"height"]=this.size),!1!==this.spaced){var e=!0===this.spaced?"".concat(c.md,"px"):this.spaced in c?"".concat(c[this.spaced],"px"):this.spaced,i=!0===this.vertical?["Left","Right"]:["Top","Bottom"];t["margin".concat(i[0])]=t["margin".concat(i[1])]=e}return t},attrs:function(){return{role:"separator","aria-orientation":this.orientation}}},render:function(t){return t("hr",{staticClass:"q-separator",class:this.classes,style:this.style,attrs:this.attrs,on:Object(s["a"])({},this.qListeners)})}})}}]);