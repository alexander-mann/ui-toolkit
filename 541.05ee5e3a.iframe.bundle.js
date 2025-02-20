/*! For license information please see 541.05ee5e3a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[541],{"./src/components/button/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonVariant,Mp:()=>ButtonSize});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/tailwind.ts"),class_variance_authority__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const ButtonVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent",ghost:"ghost"},ButtonSize={sm:"sm",default:"default",lg:"lg",icon:"icon"},buttonVariants=(0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__.F)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit w-fit",{variants:{variant:{[ButtonVariant.default]:"bg-primary text-primary-foreground hover:bg-primary/80",[ButtonVariant.secondary]:"bg-secondary text-secondary-foreground hover:bg-secondary/80",[ButtonVariant.outline]:"bg-transparent border border-input text-input hover:bg-primary/20",[ButtonVariant.destructive]:"bg-destructive text-destructive-foreground hover:bg-destructive/80",[ButtonVariant.success]:"bg-success text-success-foreground hover:bg-success/80",[ButtonVariant.accent]:"bg-accent text-accent-foreground hover:bg-accent/80",[ButtonVariant.ghost]:"hover:bg-primary/20"},size:{[ButtonSize.sm]:"px-3 py-2 text-xs",[ButtonSize.default]:"px-4 py-3",[ButtonSize.lg]:"px-8 py-3 text-lg",[ButtonSize.icon]:"p-1.5 rounded-full"}},defaultVariants:{variant:ButtonVariant.default,size:ButtonSize.default}}),Button=({variant,size,children,className,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:(0,_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(buttonVariants({variant,size,className})),...props},children);Button.__docgenInfo={description:"",methods:[],displayName:"Button",composes:["ButtonHTMLAttributes","VariantProps"]}},"./src/components/card/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card,_:()=>CardVariant});var react=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const CardVariant={default:"default",outline:"outline"},cardVariants=(0,dist.F)("rounded-lg p-4 border-2 border-card",{variants:{variant:{[CardVariant.default]:"bg-card text-card-foreground",[CardVariant.outline]:""}},defaultVariants:{variant:CardVariant.default}}),Card=({variant,children,className,...props})=>react.createElement("div",{className:(0,tailwind.cn)(cardVariants({variant,className})),...props},children);Card.__docgenInfo={description:"",methods:[],displayName:"Card"}},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{nD:()=>Accordion,Ex:()=>Badge,vj:()=>BadgeSize,xU:()=>BadgeVariant,$n:()=>button_button.$n,lG:()=>Dialog,EV:()=>DialogSize,cG:()=>Divider,E3:()=>DividerOrientation,pd:()=>Input,UE:()=>SortDirection,XI:()=>Table,tU:()=>Tabs});var button_button=__webpack_require__("./src/components/button/button.tsx"),react=(__webpack_require__("./src/components/card/index.ts"),__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js")),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs"),createLucideIcon=__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js");const X=(0,createLucideIcon.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var react_dom=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/index.js");const DialogSize={sm:"sm",default:"default",lg:"lg"},dialogVariants=(0,dist.F)("flex flex-col gap-6 h-fit bg-background p-5 rounded-lg",{variants:{size:{[DialogSize.sm]:"w-[300px] max-h-[300px]",[DialogSize.default]:"w-[600px] max-h-[500px]",[DialogSize.lg]:"w-[1000px] max-h-[800px]"}},defaultVariants:{size:DialogSize.default}}),Dialog=({title,children,size,triggerElement,className,usePortal})=>{const[isOpen,setIsOpen]=(0,react.useState)(!1),dialogRef=(0,react.useRef)(null);(0,react.useEffect)((()=>{const handleClickOutside=event=>{dialogRef.current&&!dialogRef.current.contains(event.target)&&setIsOpen(!1)};return isOpen&&document.addEventListener("mousedown",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside)}}),[isOpen]);const toggleModal=()=>{setIsOpen(!isOpen)},ModalContent=react.createElement("div",{className:"fixed z-[1000] inset-0 flex items-center justify-center bg-black/50"},react.createElement("div",{ref:dialogRef,role:"dialog","aria-labelledby":"dialog-label","aria-modal":"true",className:(0,tailwind.cn)(dialogVariants({size,className}))},react.createElement("div",{className:"flex justify-between items-center"},react.createElement("h1",{id:"dialog-label",className:"text-2xl font-medium"},title),react.createElement(button_button.$n,{variant:"ghost",size:"icon",onClick:toggleModal,"aria-label":"Close modal"},react.createElement(X,{size:16}))),react.createElement("div",{className:"overflow-y-auto flex flex-col gap-2",tabIndex:0},children)));return react.createElement(react.Fragment,null,react.createElement("span",{onClick:toggleModal},triggerElement),isOpen&&(usePortal?(0,react_dom.createPortal)(ModalContent,document.body):ModalContent))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{title:{required:!0,tsType:{name:"string"},description:""},triggerElement:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},usePortal:{required:!1,tsType:{name:"boolean"},description:""}},composes:["HTMLAttributes","VariantProps"]};const BadgeVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent"},BadgeSize={default:"default",lg:"lg"},badgeVariants=(0,dist.F)("inline-flex gap-1 items-center border w-fit rounded-full px-2.5 py-0.5 text-xs font-medium",{variants:{variant:{[BadgeVariant.default]:"bg-primary text-primary-foreground border-primary",[BadgeVariant.secondary]:"bg-secondary text-secondary-foreground border-secondary",[BadgeVariant.outline]:"border-input text-input",[BadgeVariant.destructive]:"bg-destructive text-destructive-foreground border-destructive",[BadgeVariant.success]:"bg-success text-success-foreground border-success",[BadgeVariant.accent]:"bg-accent text-accent-foreground border-accent"},size:{[BadgeSize.default]:"text-xs [&>svg]:size-3 ",[BadgeSize.lg]:"text-sm [&>svg]:size-4 "}},defaultVariants:{variant:BadgeVariant.default,size:BadgeSize.default}}),Badge=({variant,size,className,children,...props})=>react.createElement("span",{className:(0,tailwind.cn)(badgeVariants({variant,size,className})),...props},children);Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]};const ChevronDown=(0,createLucideIcon.A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),Accordion=({title,children,id})=>{const[isExpanded,setIsExpanded]=(0,react.useState)(!1);return react.createElement("div",{className:"flex flex-col"},react.createElement("button",{onClick:()=>{setIsExpanded(!isExpanded)},"aria-expanded":isExpanded,"aria-controls":id,className:"py-4 w-full flex items-center justify-between underline"},title,react.createElement(ChevronDown,{size:16,className:(0,tailwind.cn)("transition-all duration-300",{"rotate-180":isExpanded})})),isExpanded&&react.createElement("div",{id,className:"pb-4 transition-all duration-300 text-muted-foreground"},children))};Accordion.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{title:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},id:{required:!0,tsType:{name:"string"},description:""}}};const DividerOrientation={Horizontal:"horizontal",Vertical:"vertical"},dividerVariants=(0,dist.F)("opacity-30",{variants:{orientation:{[DividerOrientation.Horizontal]:"border-b w-full",[DividerOrientation.Vertical]:"h-full border-l w-fit"}},defaultVariants:{orientation:DividerOrientation.Horizontal}}),Divider=({className,orientation="horizontal"})=>react.createElement("div",{className:(0,tailwind.cn)(dividerVariants({orientation,className}))});Divider.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{className:{required:!1,tsType:{name:"string"},description:""},orientation:{defaultValue:{value:"'horizontal'",computed:!1},required:!1}},composes:["ButtonHTMLAttributes","VariantProps"]};const Input=({label,id,hasError,errorMessage,...props})=>react.createElement("div",{className:"flex flex-col gap-1"},react.createElement("label",{htmlFor:id,className:"text-sm"},label),react.createElement("input",{id,className:(0,tailwind.cn)("w-full rounded-md border px-3 py-2 text-sm bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",hasError&&"border-destructive"),...props}),hasError&&react.createElement("p",{className:"text-xs text-destructive"},errorMessage));Input.__docgenInfo={description:"",methods:[],displayName:"Input",props:{label:{required:!0,tsType:{name:"string"},description:""},id:{required:!0,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:""},errorMessage:{required:!1,tsType:{name:"string"},description:""}}};var SortDirection=function(SortDirection){return SortDirection.Asc="ascending",SortDirection.Desc="descending",SortDirection}({});const Table=({caption,headers,rows,defaultSort})=>{const[sortedColumn,setSortedColumn]=(0,react.useState)(defaultSort?.label||headers[0].label),[sortDirection,setSortDirection]=(0,react.useState)(defaultSort?.direction||"descending");return react.createElement("table",{className:"table-auto w-full mx-auto"},caption&&react.createElement("caption",{className:"text-lg font-medium text-left mb-2"},caption),react.createElement("thead",{className:"sticky top-0"},react.createElement("tr",{className:"bg-muted"},headers.map(((header,index)=>react.createElement("th",{key:header.label,className:(0,tailwind.cn)("text-left p-3 font-medium",0===index&&"pl-4",index===headers.length-1&&"pr-4"),"aria-sort":sortedColumn===headers[index].label?sortDirection:void 0},header.sortable?react.createElement("button",{className:"flex items-center gap-2 hover:opacity-50",onClick:()=>{setSortedColumn(header.label),setSortDirection("descending"===sortDirection&&header.label===sortedColumn?"ascending":"descending")}},header.label,sortedColumn===header.label?react.createElement(ChevronDown,{"aria-hidden":!0,className:(0,tailwind.cn)("size-4","ascending"===sortDirection&&"rotate-180")}):react.createElement("span",{className:"size-4"})):header.label))))),react.createElement("tbody",{className:"max-h-[500px] overflow-y-auto"},rows.sort(((a,b)=>{const index=headers.findIndex((header=>header.label===sortedColumn));return"ascending"===sortDirection?a[index].localeCompare(b[index]):b[index].localeCompare(a[index])})).map(((row,index)=>react.createElement("tr",{key:index,className:(0,tailwind.cn)(index%2!=0&&"bg-muted/50")},row.map(((cell,index)=>react.createElement("td",{key:cell,className:(0,tailwind.cn)("p-3",0===index&&"pl-4",index===row.length-1&&"pr-4")},cell))))))))};Table.__docgenInfo={description:"",methods:[],displayName:"Table",props:{caption:{required:!1,tsType:{name:"string"},description:""},headers:{required:!0,tsType:{name:"Array",elements:[{name:"TableHeader"}],raw:"TableHeader[]"},description:""},rows:{required:!0,tsType:{name:"Array",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"}],raw:"string[][]"},description:""},defaultSort:{required:!1,tsType:{name:"DefaultSort"},description:""}}};const Tabs=({data})=>{const[activeTab,setActiveTab]=(0,react.useState)(0);return react.createElement("div",null,react.createElement("div",{className:"flex",role:"tablist"},data.map(((tab,index)=>{const isActive=activeTab===index;return react.createElement("button",{id:`tab-${index}`,role:"tab",disabled:isActive,"aria-selected":isActive,className:(0,tailwind.cn)("whitespace-nowrap border border-muted-foreground py-2 px-4 bg-muted-foreground/10 hover:bg-muted-foreground/30 first-of-type:rounded-tl-md last-of-type:rounded-tr-md disabled:bg-transparent",isActive?"border-b-0":"border-muted-foreground/50 border-b-muted-foreground"),key:`${tab.label}-tab`,onClick:()=>setActiveTab(index)},tab.label)})),react.createElement("span",{className:"border-b w-full"})),react.createElement("div",{className:"border border-t-0 border-muted-foreground p-4 w-full rounded-md rounded-t-none"},data.map(((tab,index)=>{const isActive=activeTab===index;return react.createElement("div",{id:`tabpanel-${index}`,role:"tabpanel","aria-labelledby":`tab-${index}`,hidden:!isActive,key:`${tab.label}-panel`},tab.content)}))))};Tabs.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"TabData"}],raw:"TabData[]"},description:""}}};__webpack_require__("./src/components/toast/index.ts")}}]);