/*! For license information please see components-dialog-dialog-stories.198d5d8f.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_alexandermann_ui_toolkit=self.webpackChunk_alexandermann_ui_toolkit||[]).push([[41],{"./src/components/dialog/dialog.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ActionDialog:()=>ActionDialog,BasicUsage:()=>BasicUsage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>dialog_stories});var react=__webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js");const Trash2=(0,__webpack_require__("./node_modules/.pnpm/lucide-react@0.475.0_react@19.0.0/node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);var components=__webpack_require__("./src/components/index.ts");const dialog_stories={title:"Components/Dialog",component:components.lG,argTypes:{size:{description:"Size of modal",options:Object.values(components.EV),table:{type:{summary:"string"},defaultValue:{summary:components.EV.default}},control:"select"},triggerElement:{table:{disable:!0}},usePortal:{description:"Whether to render the modal in a portal",options:[!0,!1],table:{type:{summary:"boolean"},defaultValue:{summary:"false"}},control:void 0},open:{description:"Whether to open the modal (controlled)",options:[!0,!1],table:{type:{summary:"boolean"}}}},parameters:{exclude:["triggerElement"]}},BasicUsage={args:{title:"Title",usePortal:!0},render:props=>react.createElement(components.lG,{...props,triggerElement:react.createElement("a",{className:"underline hover:opacity-80"},"Open Modal")},react.createElement("p",null,"Lorem ipsum odor amet, consectetuer adipiscing elit. Interdum pretium quisque sed primis nunc conubia. Orci nostra eros magna dui sociosqu etiam odio. Tristique lacus sociosqu pellentesque praesent sollicitudin. Duis diam cras varius mattis dapibus ut eros dictum. Orci suscipit nisi lacus nulla non dictumst aliquet. Viverra sem conubia libero vel vitae facilisis consequat ipsum aliquet. Tempor nunc dolor ad mattis nullam. Phasellus malesuada nunc in platea semper consequat in."),react.createElement("p",null,"Facilisis fusce sit dignissim; praesent morbi inceptos. Eleifend euismod sit odio; primis vitae lectus. Ac lacinia metus natoque venenatis metus egestas. Faucibus mus dis dictum nisl pharetra cras purus enim neque. Gravida ante aliquet integer; sem dignissim nascetur in consectetur. Id bibendum maximus orci sit, mauris sit adipiscing venenatis tincidunt. Accumsan mi cubilia euismod etiam; ac volutpat mus blandit adipiscing. Mattis ad vitae nibh torquent accumsan. Mus ultrices dictum nisi condimentum ut."),react.createElement("p",null,"Mattis vel taciti nec scelerisque dictumst ante dignissim semper. Ultrices cubilia hac pellentesque ante amet. Fusce tristique proin ultrices nisl quisque lectus ipsum tincidunt. Netus praesent eros nisi justo laoreet velit proin tristique. Ullamcorper mauris elit per, placerat phasellus convallis sollicitudin torquent. Sociosqu adipiscing aliquet class auctor magnis maecenas. Ligula blandit ligula nunc vulputate torquent vel velit. Velit faucibus parturient eu proin pretium justo."))},ActionDialog={render:()=>{const[open,setOpen]=(0,react.useState)(!1);return react.createElement(components.lG,{usePortal:!0,title:"Delete all data",size:"sm",open,onOpenChange:setOpen,triggerElement:react.createElement(components.$n,{variant:"destructive",className:"w-80 gap-2"},react.createElement(Trash2,{className:"size-4"}),"Delete data ",open?"open":"closed")},react.createElement("div",{className:"flex flex-col gap-4"},react.createElement("p",null,"Are you sure you want to delete all of your data?"),react.createElement(components.$n,{variant:"destructive",className:"w-full gap-2",onClick:()=>setOpen(!1)},react.createElement(Trash2,{className:"size-5"}),"Delete data")))}},__namedExportsOrder=["BasicUsage","ActionDialog"];BasicUsage.parameters={...BasicUsage.parameters,docs:{...BasicUsage.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Title',\n    usePortal: true\n  },\n  render: props => <Dialog {...props} triggerElement={<a className=\"underline hover:opacity-80\">Open Modal</a>}>\n      <p>\n        Lorem ipsum odor amet, consectetuer adipiscing elit. Interdum pretium\n        quisque sed primis nunc conubia. Orci nostra eros magna dui sociosqu\n        etiam odio. Tristique lacus sociosqu pellentesque praesent sollicitudin.\n        Duis diam cras varius mattis dapibus ut eros dictum. Orci suscipit nisi\n        lacus nulla non dictumst aliquet. Viverra sem conubia libero vel vitae\n        facilisis consequat ipsum aliquet. Tempor nunc dolor ad mattis nullam.\n        Phasellus malesuada nunc in platea semper consequat in.\n      </p>\n      <p>\n        Facilisis fusce sit dignissim; praesent morbi inceptos. Eleifend euismod\n        sit odio; primis vitae lectus. Ac lacinia metus natoque venenatis metus\n        egestas. Faucibus mus dis dictum nisl pharetra cras purus enim neque.\n        Gravida ante aliquet integer; sem dignissim nascetur in consectetur. Id\n        bibendum maximus orci sit, mauris sit adipiscing venenatis tincidunt.\n        Accumsan mi cubilia euismod etiam; ac volutpat mus blandit adipiscing.\n        Mattis ad vitae nibh torquent accumsan. Mus ultrices dictum nisi\n        condimentum ut.\n      </p>\n      <p>\n        Mattis vel taciti nec scelerisque dictumst ante dignissim semper.\n        Ultrices cubilia hac pellentesque ante amet. Fusce tristique proin\n        ultrices nisl quisque lectus ipsum tincidunt. Netus praesent eros nisi\n        justo laoreet velit proin tristique. Ullamcorper mauris elit per,\n        placerat phasellus convallis sollicitudin torquent. Sociosqu adipiscing\n        aliquet class auctor magnis maecenas. Ligula blandit ligula nunc\n        vulputate torquent vel velit. Velit faucibus parturient eu proin pretium\n        justo.\n      </p>\n    </Dialog>\n}",...BasicUsage.parameters?.docs?.source}}},ActionDialog.parameters={...ActionDialog.parameters,docs:{...ActionDialog.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [open, setOpen] = useState(false);\n    return <Dialog usePortal title="Delete all data" size="sm" open={open} onOpenChange={setOpen} triggerElement={<Button variant="destructive" className="w-80 gap-2">\n            <Trash2 className="size-4" />\n            Delete data {open ? \'open\' : \'closed\'}\n          </Button>}>\n        <div className="flex flex-col gap-4">\n          <p>Are you sure you want to delete all of your data?</p>\n          <Button variant="destructive" className="w-full gap-2" onClick={() => setOpen(false)}>\n            <Trash2 className="size-5" />\n            Delete data\n          </Button>\n        </div>\n      </Dialog>;\n  }\n}',...ActionDialog.parameters?.docs?.source}}}}}]);