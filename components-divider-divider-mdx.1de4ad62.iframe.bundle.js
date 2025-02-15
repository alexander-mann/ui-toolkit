/*! For license information please see components-divider-divider-mdx.1de4ad62.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[21],{"./.yarn/__virtual__/@mdx-js-react-virtual-31f7b5a72f/0/cache/@mdx-js-react-npm-3.1.0-a91217d996-c5a9c495f4.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>createLucideIcon});var react=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");const mergeClasses=(...classes)=>classes.filter(((className,index,array)=>Boolean(className)&&""!==className.trim()&&array.indexOf(className)===index)).join(" ").trim();var defaultAttributes={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Icon=(0,react.forwardRef)((({color="currentColor",size=24,strokeWidth=2,absoluteStrokeWidth,className="",children,iconNode,...rest},ref)=>(0,react.createElement)("svg",{ref,...defaultAttributes,width:size,height:size,stroke:color,strokeWidth:absoluteStrokeWidth?24*Number(strokeWidth)/Number(size):strokeWidth,className:mergeClasses("lucide",className),...rest},[...iconNode.map((([tag,attrs])=>(0,react.createElement)(tag,attrs))),...Array.isArray(children)?children:[children]]))),createLucideIcon=(iconName,iconNode)=>{const Component=(0,react.forwardRef)((({className,...props},ref)=>{return(0,react.createElement)(Icon,{ref,iconNode,className:mergeClasses(`lucide-${string=iconName,string.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,className),...props});var string}));return Component.displayName=`${iconName}`,Component}},"./src/components/button/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonVariant,Mp:()=>ButtonSize});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/tailwind.ts"),class_variance_authority__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const ButtonVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent",ghost:"ghost"},ButtonSize={sm:"sm",default:"default",lg:"lg",icon:"icon"},buttonVariants=(0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__.F)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit w-fit",{variants:{variant:{[ButtonVariant.default]:"bg-primary text-primary-foreground hover:bg-primary/80",[ButtonVariant.secondary]:"bg-secondary text-secondary-foreground hover:bg-secondary/80",[ButtonVariant.outline]:"bg-transparent border border-input text-input hover:bg-primary/20",[ButtonVariant.destructive]:"bg-destructive text-destructive-foreground hover:bg-destructive/80",[ButtonVariant.success]:"bg-success text-success-foreground hover:bg-success/80",[ButtonVariant.accent]:"bg-accent text-accent-foreground hover:bg-accent/80",[ButtonVariant.ghost]:"hover:bg-primary/20"},size:{[ButtonSize.sm]:"px-3 py-2 text-xs",[ButtonSize.default]:"px-4 py-3",[ButtonSize.lg]:"px-8 py-3 text-lg",[ButtonSize.icon]:"p-1.5 rounded-full"}},defaultVariants:{variant:ButtonVariant.default,size:ButtonSize.default}}),Button=({variant,size,children,className,...props})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:(0,_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(buttonVariants({variant,size,className})),...props},children);Button.__docgenInfo={description:"",methods:[],displayName:"Button",composes:["ButtonHTMLAttributes","VariantProps"]}},"./src/components/card/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>Card,_:()=>CardVariant});var react=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs");const CardVariant={default:"default",outline:"outline"},cardVariants=(0,dist.F)("rounded-lg p-4 border-2 border-card",{variants:{variant:{[CardVariant.default]:"bg-card text-card-foreground",[CardVariant.outline]:""}},defaultVariants:{variant:CardVariant.default}}),Card=({variant,children,className,...props})=>react.createElement("div",{className:(0,tailwind.cn)(cardVariants({variant,className})),...props},children);Card.__docgenInfo={description:"",methods:[],displayName:"Card"}},"./src/components/divider/divider.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.yarn/__virtual__/@mdx-js-react-virtual-31f7b5a72f/0/cache/@mdx-js-react-npm-3.1.0-a91217d996-c5a9c495f4.zip/node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist/index.mjs"),_divider_stories__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/components/index.ts"),__webpack_require__("./src/components/divider/divider.stories.tsx"));function _createMdxContent(props){const _components={h2:"h2",h3:"h3",h4:"h4",...(0,_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.hE,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"a-horizontal-or-vertical-line-that-separates-content-with-customizable-spacing-and-orientation",children:"A horizontal or vertical line that separates content, with customizable spacing and orientation."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.kL,{dark:!0,language:"tsx",code:"\nimport { Divider } from '@alexandermann/ui-toolkit'\n\n<div className=\"w-[600px]\">\n  <p>Default divider</p>\n  <Divider {...args} />\n  <p>Content below</p>\n</div>\n"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.BasicUsage,sourceState:"none"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"custom-spacing",children:"Custom spacing"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.CustomSpacing}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"vertical",children:"Vertical"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.Vertical})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./src/components/divider/divider.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicUsage:()=>BasicUsage,CustomSpacing:()=>CustomSpacing,Vertical:()=>Vertical,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Divider",component:___WEBPACK_IMPORTED_MODULE_1__.cG,argTypes:{orientation:{description:"Orientation of divider",options:Object.values(___WEBPACK_IMPORTED_MODULE_1__.E3),table:{type:{summary:"horizontal | vertical"},defaultValue:{summary:___WEBPACK_IMPORTED_MODULE_1__.E3.Horizontal}},control:!1},className:{table:{disable:!0}}}},BasicUsage={render:args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"w-[600px]"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Default divider"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,args),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Content below"))},CustomSpacing={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex flex-col gap-8 w-[600px]"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"With custom spacing"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,{className:"my-8"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"More content"))},Vertical={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,"Left"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,{orientation:"vertical",className:"mx-4 h-6"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,"Right"))},__namedExportsOrder=["BasicUsage","CustomSpacing","Vertical"];BasicUsage.parameters={...BasicUsage.parameters,docs:{...BasicUsage.parameters?.docs,source:{originalSource:'{\n  render: args => <div className="w-[600px]">\n      <p>Default divider</p>\n      <Divider {...args} />\n      <p>Content below</p>\n    </div>\n}',...BasicUsage.parameters?.docs?.source}}},CustomSpacing.parameters={...CustomSpacing.parameters,docs:{...CustomSpacing.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col gap-8 w-[600px]">\n      <p>With custom spacing</p>\n      <Divider className="my-8" />\n      <p>More content</p>\n    </div>\n}',...CustomSpacing.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center">\n      <span>Left</span>\n      <Divider orientation="vertical" className="mx-4 h-6" />\n      <span>Right</span>\n    </div>\n}',...Vertical.parameters?.docs?.source}}}},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{nD:()=>Accordion,Ex:()=>Badge,vj:()=>BadgeSize,xU:()=>BadgeVariant,lG:()=>Dialog,EV:()=>DialogSize,cG:()=>Divider,E3:()=>DividerOrientation});var button_button=__webpack_require__("./src/components/button/button.tsx"),react=(__webpack_require__("./src/components/card/index.ts"),__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js")),tailwind=__webpack_require__("./src/utils/tailwind.ts"),dist=__webpack_require__("./.yarn/cache/class-variance-authority-npm-0.7.1-74a7beaf7c-e05ba26ef9.zip/node_modules/class-variance-authority/dist/index.mjs"),createLucideIcon=__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js");const X=(0,createLucideIcon.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var react_dom=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/index.js");const DialogSize={sm:"sm",default:"default",lg:"lg"},dialogVariants=(0,dist.F)("flex flex-col gap-6 h-fit bg-background p-5 rounded-lg",{variants:{size:{[DialogSize.sm]:"w-[300px] max-h-[200px]",[DialogSize.default]:"w-[600px] max-h-[500px]",[DialogSize.lg]:"w-[1000px] max-h-[800px]"}},defaultVariants:{size:DialogSize.default}}),Dialog=({title,children,size,triggerElement,className,usePortal})=>{const[isOpen,setIsOpen]=(0,react.useState)(!1),toggleModal=()=>{setIsOpen(!isOpen)},ModalContent=react.createElement("div",{className:"fixed z-[1000] inset-0 flex items-center justify-center bg-black/50",onClick:toggleModal},react.createElement("div",{role:"dialog","aria-labelledby":"dialog-label","aria-modal":"true",className:(0,tailwind.cn)(dialogVariants({size,className}))},react.createElement("div",{className:"flex justify-between items-center"},react.createElement("h1",{id:"dialog-label",className:"text-2xl font-medium"},title),react.createElement(button_button.$n,{variant:"ghost",size:"icon",onClick:toggleModal,"aria-label":"Close modal"},react.createElement(X,{size:16}))),react.createElement("div",{className:"overflow-y-auto flex flex-col gap-2",tabIndex:0},children)));return react.createElement(react.Fragment,null,react.createElement("button",{type:"button",onClick:toggleModal},triggerElement),isOpen&&(usePortal?(0,react_dom.createPortal)(ModalContent,document.body):ModalContent))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{title:{required:!0,tsType:{name:"string"},description:""},triggerElement:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},usePortal:{required:!1,tsType:{name:"boolean"},description:""}},composes:["HTMLAttributes","VariantProps"]};const BadgeVariant={default:"default",secondary:"secondary",outline:"outline",destructive:"destructive",success:"success",accent:"accent"},BadgeSize={default:"default",lg:"lg"},badgeVariants=(0,dist.F)("inline-flex gap-1 items-center border w-fit rounded-full px-2.5 py-0.5 text-xs font-medium",{variants:{variant:{[BadgeVariant.default]:"bg-primary text-primary-foreground border-primary",[BadgeVariant.secondary]:"bg-secondary text-secondary-foreground border-secondary",[BadgeVariant.outline]:"border-input text-input",[BadgeVariant.destructive]:"bg-destructive text-destructive-foreground border-destructive",[BadgeVariant.success]:"bg-success text-success-foreground border-success",[BadgeVariant.accent]:"bg-accent text-accent-foreground border-accent"},size:{[BadgeSize.default]:"text-xs [&>svg]:size-3 ",[BadgeSize.lg]:"text-sm [&>svg]:size-4 "}},defaultVariants:{variant:BadgeVariant.default,size:BadgeSize.default}}),Badge=({variant,size,className,children,...props})=>react.createElement("span",{className:(0,tailwind.cn)(badgeVariants({variant,size,className})),...props},children);Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]};const ChevronDown=(0,createLucideIcon.A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),Accordion=({title,children,id})=>{const[isExpanded,setIsExpanded]=(0,react.useState)(!1);return react.createElement("div",{className:"flex flex-col"},react.createElement("button",{onClick:()=>{setIsExpanded(!isExpanded)},"aria-expanded":isExpanded,"aria-controls":id,className:"py-4 w-full flex items-center justify-between underline"},title,react.createElement(ChevronDown,{size:16,className:(0,tailwind.cn)("transition-all duration-300",{"rotate-180":isExpanded})})),isExpanded&&react.createElement("div",{id,className:"pb-4 transition-all duration-300 text-muted-foreground"},children))};Accordion.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{title:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},id:{required:!0,tsType:{name:"string"},description:""}}};const DividerOrientation={Horizontal:"horizontal",Vertical:"vertical"},dividerVariants=(0,dist.F)("opacity-30",{variants:{orientation:{[DividerOrientation.Horizontal]:"border-b w-full",[DividerOrientation.Vertical]:"h-full border-l w-fit"}},defaultVariants:{orientation:DividerOrientation.Horizontal}}),Divider=({className,orientation="horizontal"})=>react.createElement("div",{className:(0,tailwind.cn)(dividerVariants({orientation,className}))});Divider.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{className:{required:!1,tsType:{name:"string"},description:""},orientation:{defaultValue:{value:"'horizontal'",computed:!1},required:!1}},composes:["ButtonHTMLAttributes","VariantProps"]}},"./src/utils/tailwind.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/clsx-npm-2.1.1-96125b98be-acd3e1ab9d.zip/node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/tailwind-merge-npm-3.0.1-a661130fac-a058ca9d4d.zip/node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}}}]);