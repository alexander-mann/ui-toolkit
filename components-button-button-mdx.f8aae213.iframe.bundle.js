/*! For license information please see components-button-button-mdx.f8aae213.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[519],{"./.yarn/__virtual__/@mdx-js-react-virtual-31f7b5a72f/0/cache/@mdx-js-react-npm-3.1.0-a91217d996-c5a9c495f4.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./.yarn/__virtual__/@storybook-core-virtual-305ea80b38/0/cache/@storybook-core-npm-8.5.5-b7605fbf7c-1ae3206ce4.zip/node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/icons/paw-print.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>PawPrint});const PawPrint=(0,__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]])},"./src/components/button/button.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.yarn/__virtual__/@mdx-js-react-virtual-31f7b5a72f/0/cache/@mdx-js-react-npm-3.1.0-a91217d996-c5a9c495f4.zip/node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./.yarn/__virtual__/@storybook-blocks-virtual-895dec5e35/0/cache/@storybook-blocks-npm-8.5.5-2ec9773778-face30a3ec.zip/node_modules/@storybook/blocks/dist/index.mjs"),_button_stories__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/components/index.ts"),__webpack_require__("./src/components/button/button.stories.tsx"));function _createMdxContent(props){const _components={h2:"h2",h3:"h3",h4:"h4",...(0,_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.hE,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.VY,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"a-simple-button-component",children:"A simple button component."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.kL,{dark:!0,language:"tsx",code:"\nimport { Button } from '@alexandermann/ui-toolkit'\n\n<Button>Label</Button>\n"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.BasicUsage,sourceState:"none"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"default",children:"Default"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"secondary",children:"Secondary"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Secondary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"outline",children:"Outline"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Outline}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"destructive",children:"Destructive"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Destructive}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"success",children:"Success"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Success}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"accent",children:"Accent"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Accent}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"ghost",children:"Ghost"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_button_stories__WEBPACK_IMPORTED_MODULE_3__.Ghost})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_toolkit_ui_toolkit_yarn_virtual_storybook_addon_docs_virtual_11443d3451_0_cache_storybook_addon_docs_npm_8_5_5_10e6919751_4604d01bb1_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./src/components/button/button.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Accent:()=>Accent,BasicUsage:()=>BasicUsage,Default:()=>Default,Destructive:()=>Destructive,Ghost:()=>Ghost,Outline:()=>Outline,Secondary:()=>Secondary,Success:()=>Success,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),lucide_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.yarn/__virtual__/lucide-react-virtual-21eb3c01b3/0/cache/lucide-react-npm-0.475.0-76625aba31-706d7eb382.zip/node_modules/lucide-react/dist/esm/icons/paw-print.js"),_button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/button/button.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Button",component:_button__WEBPACK_IMPORTED_MODULE_1__.$n,argTypes:{children:{description:"Button label",table:{type:{summary:"string"}},control:"text"},variant:{description:"Variant of button",options:Object.values(_button__WEBPACK_IMPORTED_MODULE_1__.Ak),table:{type:{summary:"string"},defaultValue:{summary:_button__WEBPACK_IMPORTED_MODULE_1__.Ak.default}},control:"select"},size:{description:"Size of button",options:Object.values(_button__WEBPACK_IMPORTED_MODULE_1__.Mp),table:{type:{summary:"string"},defaultValue:{summary:_button__WEBPACK_IMPORTED_MODULE_1__.Mp.default}},control:"select"}}},BasicUsage={args:{children:"Label"},render:props=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,props)},Default={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"default",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"default"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"default",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"default",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"default",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Secondary={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"secondary",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"secondary"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"secondary",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"secondary",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"secondary",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Outline={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"outline",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"outline"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"outline",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"outline",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"outline",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Destructive={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"destructive",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"destructive"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"destructive",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"destructive",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"destructive",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Success={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"success",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"success"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"success",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"success",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"success",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Accent={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"accent",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"accent"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"accent",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"accent",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"accent",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},Ghost={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center gap-4"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"ghost",size:"sm"},"Small"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"ghost"},"Default"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"ghost",disabled:!0},"Disabled"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"ghost",size:"lg"},"Large"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_button__WEBPACK_IMPORTED_MODULE_1__.$n,{variant:"ghost",size:"icon","aria-label":"Do something"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__.A,{className:"size-5"})))},__namedExportsOrder=["BasicUsage","Default","Secondary","Outline","Destructive","Success","Accent","Ghost"];BasicUsage.parameters={...BasicUsage.parameters,docs:{...BasicUsage.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: 'Label'\n  },\n  render: props => <Button {...props} />\n}",...BasicUsage.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="default" size="sm">\n        Small\n      </Button>\n      <Button variant="default">Default</Button>\n      <Button variant="default" disabled>\n        Disabled\n      </Button>\n      <Button variant="default" size="lg">\n        Large\n      </Button>\n      <Button variant="default" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Default.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="secondary" size="sm">\n        Small\n      </Button>\n      <Button variant="secondary">Default</Button>\n      <Button variant="secondary" disabled>\n        Disabled\n      </Button>\n      <Button variant="secondary" size="lg">\n        Large\n      </Button>\n      <Button variant="secondary" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Secondary.parameters?.docs?.source}}},Outline.parameters={...Outline.parameters,docs:{...Outline.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="outline" size="sm">\n        Small\n      </Button>\n      <Button variant="outline">Default</Button>\n      <Button variant="outline" disabled>\n        Disabled\n      </Button>\n      <Button variant="outline" size="lg">\n        Large\n      </Button>\n      <Button variant="outline" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Outline.parameters?.docs?.source}}},Destructive.parameters={...Destructive.parameters,docs:{...Destructive.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="destructive" size="sm">\n        Small\n      </Button>\n      <Button variant="destructive">Default</Button>\n      <Button variant="destructive" disabled>\n        Disabled\n      </Button>\n      <Button variant="destructive" size="lg">\n        Large\n      </Button>\n      <Button variant="destructive" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Destructive.parameters?.docs?.source}}},Success.parameters={...Success.parameters,docs:{...Success.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="success" size="sm">\n        Small\n      </Button>\n      <Button variant="success">Default</Button>\n      <Button variant="success" disabled>\n        Disabled\n      </Button>\n      <Button variant="success" size="lg">\n        Large\n      </Button>\n      <Button variant="success" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Success.parameters?.docs?.source}}},Accent.parameters={...Accent.parameters,docs:{...Accent.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="accent" size="sm">\n        Small\n      </Button>\n      <Button variant="accent">Default</Button>\n      <Button variant="accent" disabled>\n        Disabled\n      </Button>\n      <Button variant="accent" size="lg">\n        Large\n      </Button>\n      <Button variant="accent" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Accent.parameters?.docs?.source}}},Ghost.parameters={...Ghost.parameters,docs:{...Ghost.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center gap-4">\n      <Button variant="ghost" size="sm">\n        Small\n      </Button>\n      <Button variant="ghost">Default</Button>\n      <Button variant="ghost" disabled>\n        Disabled\n      </Button>\n      <Button variant="ghost" size="lg">\n        Large\n      </Button>\n      <Button variant="ghost" size="icon" aria-label="Do something">\n        <PawPrint className="size-5" />\n      </Button>\n    </div>\n}',...Ghost.parameters?.docs?.source}}}}}]);