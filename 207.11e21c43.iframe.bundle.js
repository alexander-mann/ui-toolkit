"use strict";(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[207],{"./.yarn/__virtual__/@storybook-react-dom-shim-virtual-0ffced25d2/0/cache/@storybook-react-dom-shim-npm-8.5.5-3a2208cb3c-6e287af90f.zip/node_modules/@storybook/react-dom-shim/dist/react-18.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{renderElement:()=>renderElement,unmountElement:()=>unmountElement});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/cache/react-npm-19.0.0-e33c9aa1c0-86de15d85b.zip/node_modules/react/index.js"),react_dom_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-9eb62e5a63/0/cache/react-dom-npm-19.0.0-b7981c573e-009cc6e575.zip/node_modules/react-dom/client.js"),nodes=new Map;var WithCallback=({callback,children})=>{let once=react__WEBPACK_IMPORTED_MODULE_0__.useRef();return react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect((()=>{once.current!==callback&&(once.current=callback,callback())}),[callback]),children};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let resolve=null,reject=null;return{promise:new Promise(((res,rej)=>{resolve=res,reject=rej})),resolve,reject}});var renderElement=async(node,el,rootOptions)=>{let root=await getReactRoot(el,rootOptions);if(function getIsReactActEnvironment(){return globalThis.IS_REACT_ACT_ENVIRONMENT}())return void root.render(node);let{promise,resolve}=Promise.withResolvers();return root.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(WithCallback,{callback:resolve},node)),promise},unmountElement=(el,shouldUseNewRootApi)=>{let root=nodes.get(el);root&&(root.unmount(),nodes.delete(el))},getReactRoot=async(el,rootOptions)=>{let root=nodes.get(el);return root||(root=react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(el,rootOptions),nodes.set(el,root)),root}}}]);