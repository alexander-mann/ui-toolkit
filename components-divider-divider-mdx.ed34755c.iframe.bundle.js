(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[21,935],{"./node_modules/.pnpm/@mdx-js+react@3.1.0_@types+react@19.0.12_react@19.0.0/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/.pnpm/@storybook+blocks@8.6.10_react-dom@19.0.0_react@19.0.0_storybook@8.6.10/node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+blocks@8.6.10_react-dom@19.0.0_react@19.0.0_storybook@8.6.10/node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/.pnpm/@storybook+core@8.6.10_prettier@3.5.3_storybook@8.6.10/node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+core@8.6.10_prettier@3.5.3_storybook@8.6.10/node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/.pnpm/@storybook+core@8.6.10_prettier@3.5.3_storybook@8.6.10/node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+core@8.6.10_prettier@3.5.3_storybook@8.6.10/node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./src/components/divider/divider.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/jsx-runtime.js"),_home_runner_work_ui_toolkit_ui_toolkit_node_modules_pnpm_storybook_addon_docs_8_6_10_types_react_19_0_12_storybook_8_6_10_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@mdx-js+react@3.1.0_@types+react@19.0.12_react@19.0.0/node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@8.6.10_react-dom@19.0.0_react@19.0.0_storybook@8.6.10/node_modules/@storybook/blocks/dist/index.mjs"),_divider_stories__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/components/index.ts"),__webpack_require__("./src/components/divider/divider.stories.tsx"));function _createMdxContent(props){const _components={h2:"h2",h3:"h3",h4:"h4",...(0,_home_runner_work_ui_toolkit_ui_toolkit_node_modules_pnpm_storybook_addon_docs_8_6_10_types_react_19_0_12_storybook_8_6_10_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.hE,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"a-horizontal-or-vertical-line-that-separates-content-with-customizable-spacing-and-orientation",children:"A horizontal or vertical line that separates content, with customizable spacing and orientation."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.kL,{dark:!0,language:"tsx",code:"\nimport { Divider } from '@alexandermann/ui-toolkit'\n\n<div className=\"w-[600px]\">\n  <p>Default divider</p>\n  <Divider {...args} />\n  <p>Content below</p>\n</div>\n"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.BasicUsage,sourceState:"none"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"custom-spacing",children:"Custom spacing"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.CustomSpacing}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"vertical",children:"Vertical"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_divider_stories__WEBPACK_IMPORTED_MODULE_3__.Vertical})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_toolkit_ui_toolkit_node_modules_pnpm_storybook_addon_docs_8_6_10_types_react_19_0_12_storybook_8_6_10_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./src/components/divider/divider.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicUsage:()=>BasicUsage,CustomSpacing:()=>CustomSpacing,Vertical:()=>Vertical,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Divider",component:___WEBPACK_IMPORTED_MODULE_1__.cG,argTypes:{orientation:{description:"Orientation of divider",options:Object.values(___WEBPACK_IMPORTED_MODULE_1__.E3),table:{type:{summary:"horizontal | vertical"},defaultValue:{summary:___WEBPACK_IMPORTED_MODULE_1__.E3.Horizontal}},control:!1},className:{table:{disable:!0}}}},BasicUsage={render:args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"w-[600px]"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Default divider"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,args),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"Content below"))},CustomSpacing={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex flex-col gap-8 w-[600px]"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"With custom spacing"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,{className:"my-8"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"More content"))},Vertical={render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"flex items-center"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,"Left"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.cG,{orientation:"vertical",className:"mx-4 h-6"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,"Right"))},__namedExportsOrder=["BasicUsage","CustomSpacing","Vertical"];BasicUsage.parameters={...BasicUsage.parameters,docs:{...BasicUsage.parameters?.docs,source:{originalSource:'{\n  render: args => <div className="w-[600px]">\n      <p>Default divider</p>\n      <Divider {...args} />\n      <p>Content below</p>\n    </div>\n}',...BasicUsage.parameters?.docs?.source}}},CustomSpacing.parameters={...CustomSpacing.parameters,docs:{...CustomSpacing.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col gap-8 w-[600px]">\n      <p>With custom spacing</p>\n      <Divider className="my-8" />\n      <p>More content</p>\n    </div>\n}',...CustomSpacing.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex items-center">\n      <span>Left</span>\n      <Divider orientation="vertical" className="mx-4 h-6" />\n      <span>Right</span>\n    </div>\n}',...Vertical.parameters?.docs?.source}}}}}]);