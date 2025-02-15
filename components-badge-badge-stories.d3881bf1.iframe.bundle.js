/*! For license information please see components-badge-badge-stories.d3881bf1.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[41,211],{"./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>createLucideIcon});var react=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");const mergeClasses=(...classes)=>classes.filter(((className,index,array)=>Boolean(className)&&""!==className.trim()&&array.indexOf(className)===index)).join(" ").trim();var defaultAttributes={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Icon=(0,react.forwardRef)((({color="currentColor",size=24,strokeWidth=2,absoluteStrokeWidth,className="",children,iconNode,...rest},ref)=>(0,react.createElement)("svg",{ref,...defaultAttributes,width:size,height:size,stroke:color,strokeWidth:absoluteStrokeWidth?24*Number(strokeWidth)/Number(size):strokeWidth,className:mergeClasses("lucide",className),...rest},[...iconNode.map((([tag,attrs])=>(0,react.createElement)(tag,attrs))),...Array.isArray(children)?children:[children]]))),createLucideIcon=(iconName,iconNode)=>{const Component=(0,react.forwardRef)((({className,...props},ref)=>{return(0,react.createElement)(Icon,{ref,iconNode,className:mergeClasses(`lucide-${string=iconName,string.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,className),...props});var string}));return Component.displayName=`${iconName}`,Component}},"./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/icons/paw-print.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>PawPrint});const PawPrint=(0,__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]])},"./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/cjs/react-dom.production.js":(__unused_webpack_module,exports,__webpack_require__)=>{var React=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");function formatProdErrorMessage(code){var url="https://react.dev/errors/"+code;if(1<arguments.length){url+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)url+="&args[]="+encodeURIComponent(arguments[i])}return"Minified React error #"+code+"; visit "+url+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function noop(){}var Internals={d:{f:noop,r:function(){throw Error(formatProdErrorMessage(522))},D:noop,C:noop,L:noop,m:noop,X:noop,S:noop,M:noop},p:0,findDOMNode:null},REACT_PORTAL_TYPE=Symbol.for("react.portal");var ReactSharedInternals=React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function getCrossOriginStringAs(as,input){return"font"===as?"":"string"==typeof input?"use-credentials"===input?input:"":void 0}exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Internals,exports.createPortal=function(children,container){var key=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!container||1!==container.nodeType&&9!==container.nodeType&&11!==container.nodeType)throw Error(formatProdErrorMessage(299));return function createPortal$1(children,containerInfo,implementation){var key=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:REACT_PORTAL_TYPE,key:null==key?null:""+key,children,containerInfo,implementation}}(children,container,null,key)},exports.flushSync=function(fn){var previousTransition=ReactSharedInternals.T,previousUpdatePriority=Internals.p;try{if(ReactSharedInternals.T=null,Internals.p=2,fn)return fn()}finally{ReactSharedInternals.T=previousTransition,Internals.p=previousUpdatePriority,Internals.d.f()}},exports.preconnect=function(href,options){"string"==typeof href&&(options?options="string"==typeof(options=options.crossOrigin)?"use-credentials"===options?options:"":void 0:options=null,Internals.d.C(href,options))},exports.prefetchDNS=function(href){"string"==typeof href&&Internals.d.D(href)},exports.preinit=function(href,options){if("string"==typeof href&&options&&"string"==typeof options.as){var as=options.as,crossOrigin=getCrossOriginStringAs(as,options.crossOrigin),integrity="string"==typeof options.integrity?options.integrity:void 0,fetchPriority="string"==typeof options.fetchPriority?options.fetchPriority:void 0;"style"===as?Internals.d.S(href,"string"==typeof options.precedence?options.precedence:void 0,{crossOrigin,integrity,fetchPriority}):"script"===as&&Internals.d.X(href,{crossOrigin,integrity,fetchPriority,nonce:"string"==typeof options.nonce?options.nonce:void 0})}},exports.preinitModule=function(href,options){if("string"==typeof href)if("object"==typeof options&&null!==options){if(null==options.as||"script"===options.as){var crossOrigin=getCrossOriginStringAs(options.as,options.crossOrigin);Internals.d.M(href,{crossOrigin,integrity:"string"==typeof options.integrity?options.integrity:void 0,nonce:"string"==typeof options.nonce?options.nonce:void 0})}}else null==options&&Internals.d.M(href)},exports.preload=function(href,options){if("string"==typeof href&&"object"==typeof options&&null!==options&&"string"==typeof options.as){var as=options.as,crossOrigin=getCrossOriginStringAs(as,options.crossOrigin);Internals.d.L(href,as,{crossOrigin,integrity:"string"==typeof options.integrity?options.integrity:void 0,nonce:"string"==typeof options.nonce?options.nonce:void 0,type:"string"==typeof options.type?options.type:void 0,fetchPriority:"string"==typeof options.fetchPriority?options.fetchPriority:void 0,referrerPolicy:"string"==typeof options.referrerPolicy?options.referrerPolicy:void 0,imageSrcSet:"string"==typeof options.imageSrcSet?options.imageSrcSet:void 0,imageSizes:"string"==typeof options.imageSizes?options.imageSizes:void 0,media:"string"==typeof options.media?options.media:void 0})}},exports.preloadModule=function(href,options){if("string"==typeof href)if(options){var crossOrigin=getCrossOriginStringAs(options.as,options.crossOrigin);Internals.d.m(href,{as:"string"==typeof options.as&&"script"!==options.as?options.as:void 0,crossOrigin,integrity:"string"==typeof options.integrity?options.integrity:void 0})}else Internals.d.m(href)},exports.requestFormReset=function(form){Internals.d.r(form)},exports.unstable_batchedUpdates=function(fn,a){return fn(a)},exports.useFormState=function(action,initialState,permalink){return ReactSharedInternals.H.useFormState(action,initialState,permalink)},exports.useFormStatus=function(){return ReactSharedInternals.H.useHostTransitionStatus()},exports.version="19.0.0"},"./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{!function checkDCE(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE)}catch(err){console.error(err)}}(),module.exports=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/cjs/react-dom.production.js")},"./src/components/badge/badge.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicUsage:()=>BasicUsage,Variants:()=>Variants,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),lucide_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/icons/paw-print.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Badge",component:___WEBPACK_IMPORTED_MODULE_1__.Ex,argTypes:{variant:{description:"Variant of badge",options:Object.values(___WEBPACK_IMPORTED_MODULE_1__.xU),table:{type:{summary:"string"},defaultValue:{summary:___WEBPACK_IMPORTED_MODULE_1__.xU.default}},control:"select"},size:{description:"Size of badge",options:Object.values(___WEBPACK_IMPORTED_MODULE_1__.vj),table:{type:{summary:"string"},defaultValue:{summary:___WEBPACK_IMPORTED_MODULE_1__.vj.default}},control:"select"},children:{description:"The content to display inside the badge",table:{type:{summary:"string | ReactNode"}},control:"text"}}},BasicUsage={args:{children:"Label"},render:props=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.Ex,props)},Variants={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex flex-wrap gap-2"},Object.values(___WEBPACK_IMPORTED_MODULE_1__.xU).map((variant=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{key:variant,className:"flex flex-col gap-2 items-center"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.Ex,{variant},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,null)," Label"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.Ex,{variant,size:___WEBPACK_IMPORTED_MODULE_1__.vj.lg},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,null)," Label")))))},__namedExportsOrder=["BasicUsage","Variants"];BasicUsage.parameters={...BasicUsage.parameters,docs:{...BasicUsage.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: 'Label'\n  },\n  render: props => <Badge {...props} />\n}",...BasicUsage.parameters?.docs?.source}}},Variants.parameters={...Variants.parameters,docs:{...Variants.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-wrap gap-2">\n      {Object.values(BadgeVariant).map(variant => <div key={variant} className="flex flex-col gap-2 items-center">\n          <Badge variant={variant}>\n            <PawPrint /> Label\n          </Badge>\n          <Badge variant={variant} size={BadgeSize.lg}>\n            <PawPrint /> Label\n          </Badge>\n        </div>)}\n    </div>\n}',...Variants.parameters?.docs?.source}}}},"./src/components/button/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonVariant,Mp:()=>ButtonSize});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/tailwind.ts"),class_variance_authority__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const ButtonVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent",ghost:"ghost"},ButtonSize={sm:"sm",default:"default",lg:"lg",icon:"icon"},buttonVariants=(0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__.F)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit w-fit",{variants:{variant:{[ButtonVariant.default]:"bg-primary text-primary-foreground hover:bg-primary/80",[ButtonVariant.secondary]:"bg-secondary text-secondary-foreground hover:bg-secondary/80",[ButtonVariant.outline]:"bg-transparent border border-input text-input hover:bg-primary/20",[ButtonVariant.destructive]:"bg-destructive text-destructive-foreground hover:bg-destructive/80",[ButtonVariant.success]:"bg-success text-success-foreground hover:bg-success/80",[ButtonVariant.accent]:"bg-accent text-accent-foreground hover:bg-accent/80",[ButtonVariant.ghost]:"hover:bg-primary/20"},size:{[ButtonSize.sm]:"px-3 py-2 text-xs",[ButtonSize.default]:"px-4 py-3",[ButtonSize.lg]:"px-8 py-3 text-lg",[ButtonSize.icon]:"p-1.5 rounded-full"}},defaultVariants:{variant:ButtonVariant.default,size:ButtonSize.default}}),Button=({variant,size,children,className,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:(0,_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(buttonVariants({variant,size,className})),...props},children);Button.__docgenInfo={description:"",methods:[],displayName:"Button",composes:["ButtonHTMLAttributes","VariantProps"]}},"./src/components/card/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card,_:()=>CardVariant});var react=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const CardVariant={default:"default",outline:"outline"},cardVariants=(0,dist.F)("rounded-lg p-4 border-2 border-card",{variants:{variant:{[CardVariant.default]:"bg-card text-card-foreground",[CardVariant.outline]:""}},defaultVariants:{variant:CardVariant.default}}),Card=({variant,children,className,...props})=>react.createElement("div",{className:(0,tailwind.cn)(cardVariants({variant,className})),...props},children);Card.__docgenInfo={description:"",methods:[],displayName:"Card"}},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{nD:()=>Accordion,Ex:()=>Badge,vj:()=>BadgeSize,xU:()=>BadgeVariant,lG:()=>Dialog,EV:()=>DialogSize,cG:()=>Divider,E3:()=>DividerOrientation});var button_button=__webpack_require__("./src/components/button/button.tsx"),react=(__webpack_require__("./src/components/card/index.ts"),__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js")),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs"),createLucideIcon=__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js");const X=(0,createLucideIcon.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var react_dom=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/index.js");const DialogSize={sm:"sm",default:"default",lg:"lg"},dialogVariants=(0,dist.F)("flex flex-col gap-6 h-fit bg-background p-5 rounded-lg",{variants:{size:{[DialogSize.sm]:"w-[300px] max-h-[200px]",[DialogSize.default]:"w-[600px] max-h-[500px]",[DialogSize.lg]:"w-[1000px] max-h-[800px]"}},defaultVariants:{size:DialogSize.default}}),Dialog=({title,children,size,triggerElement,className,usePortal})=>{const[isOpen,setIsOpen]=(0,react.useState)(!1),toggleModal=()=>{setIsOpen(!isOpen)},ModalContent=react.createElement("div",{className:"fixed z-[1000] inset-0 flex items-center justify-center bg-black/50",onClick:toggleModal},react.createElement("div",{role:"dialog","aria-labelledby":"dialog-label","aria-modal":"true",className:(0,tailwind.cn)(dialogVariants({size,className}))},react.createElement("div",{className:"flex justify-between items-center"},react.createElement("h1",{id:"dialog-label",className:"text-2xl font-medium"},title),react.createElement(button_button.$n,{variant:"ghost",size:"icon",onClick:toggleModal,"aria-label":"Close modal"},react.createElement(X,{size:16}))),react.createElement("div",{className:"overflow-y-auto flex flex-col gap-2",tabIndex:0},children)));return react.createElement(react.Fragment,null,react.createElement("button",{type:"button",onClick:toggleModal},triggerElement),isOpen&&(usePortal?(0,react_dom.createPortal)(ModalContent,document.body):ModalContent))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{title:{required:!0,tsType:{name:"string"},description:""},triggerElement:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},usePortal:{required:!1,tsType:{name:"boolean"},description:""}},composes:["HTMLAttributes","VariantProps"]};const BadgeVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent"},BadgeSize={default:"default",lg:"lg"},badgeVariants=(0,dist.F)("inline-flex gap-1 items-center border w-fit rounded-full px-2.5 py-0.5 text-xs font-medium",{variants:{variant:{[BadgeVariant.default]:"bg-primary text-primary-foreground border-primary",[BadgeVariant.secondary]:"bg-secondary text-secondary-foreground border-secondary",[BadgeVariant.outline]:"border-input text-input",[BadgeVariant.destructive]:"bg-destructive text-destructive-foreground border-destructive",[BadgeVariant.success]:"bg-success text-success-foreground border-success",[BadgeVariant.accent]:"bg-accent text-accent-foreground border-accent"},size:{[BadgeSize.default]:"text-xs [&>svg]:size-3 ",[BadgeSize.lg]:"text-sm [&>svg]:size-4 "}},defaultVariants:{variant:BadgeVariant.default,size:BadgeSize.default}}),Badge=({variant,size,className,children,...props})=>react.createElement("span",{className:(0,tailwind.cn)(badgeVariants({variant,size,className})),...props},children);Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]};const ChevronDown=(0,createLucideIcon.A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),Accordion=({title,children,id})=>{const[isExpanded,setIsExpanded]=(0,react.useState)(!1);return react.createElement("div",{className:"flex flex-col"},react.createElement("button",{onClick:()=>{setIsExpanded(!isExpanded)},"aria-expanded":isExpanded,"aria-controls":id,className:"py-4 w-full flex items-center justify-between underline"},title,react.createElement(ChevronDown,{size:16,className:(0,tailwind.cn)("transition-all duration-300",{"rotate-180":isExpanded})})),isExpanded&&react.createElement("div",{id,className:"pb-4 transition-all duration-300 text-muted-foreground"},children))};Accordion.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{title:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},id:{required:!0,tsType:{name:"string"},description:""}}};const DividerOrientation={Horizontal:"horizontal",Vertical:"vertical"},dividerVariants=(0,dist.F)("opacity-30",{variants:{orientation:{[DividerOrientation.Horizontal]:"border-b w-full",[DividerOrientation.Vertical]:"h-full border-l w-fit"}},defaultVariants:{orientation:DividerOrientation.Horizontal}}),Divider=({className,orientation="horizontal"})=>react.createElement("div",{className:(0,tailwind.cn)(dividerVariants({orientation,className}))});Divider.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{className:{required:!1,tsType:{name:"string"},description:""},orientation:{defaultValue:{value:"'horizontal'",computed:!1},required:!1}},composes:["ButtonHTMLAttributes","VariantProps"]}},"./src/utils/tailwind.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/clsx-npm-2.1.1-96125b98be-acd3e1ab9d.zip/node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/tailwind-merge-npm-3.0.1-a661130fac-a058ca9d4d.zip/node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}}}]);