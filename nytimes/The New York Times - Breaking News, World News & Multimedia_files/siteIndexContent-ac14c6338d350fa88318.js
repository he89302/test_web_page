(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{KFDm:function(e,a,i){"use strict";i.r(a);var t=i("gcR/"),n=i.n(t),c=i("q1tI"),o=i.n(c),l=i("Jqp9"),s=i("X6oL"),d=i("i9j7"),r=i.n(d),p=i("wXC7"),u=i.n(p),m=i("KeRS"),h=i.n(m),b=(i("ma9I"),i("2B1R"),i("+2oP"),i("DQNa"),i("sMBO"),i("07d7"),i("JfAA"),i("mRH6"),i("17x9"),i("QWBl"),i("yXV3"),i("pDQq"),i("FZtP"),i("J4zp")),f=i.n(b);function v(e){var a=e.className,i=e.children,t=e.uniqueName,l=e.alwaysOpen,s=e.allowMultiple,d=[];c.Children.forEach(i,(function(e,a){e.props.expanded&&d.push(a)}));var r=Object(c.useState)(d),p=f()(r,2),u=p[0],m=p[1];return n()("div",{className:a,role:"tablist","aria-multiselectable":"true","data-testid":"accordion"},void 0,c.Children.map(i,(function(e,a){return o.a.cloneElement(e,{expanded:-1!==u.indexOf(a),index:a,uid:"".concat(t,"-").concat(a),onClick:function(){return function(e,a){"function"==typeof a&&a();var i=u.slice(0),t=1===i.length&&l,n=i.indexOf(e);-1===n||t?s?i.push(e):i=[e]:i.splice(n,1),m(i)}(a,e.props.onClick)}})})))}v.displayName="Accordion",v.defaultProps={allowMultiple:!1,alwaysOpen:!1,className:" ",children:null};var x=v,g=i("lSNA"),y=i.n(g);function k(e){var a=e.uid,i=e.onClick,t=e.className,s=e.expanded,d=e.expandedClassName,r=e.children;return n()("div",{className:Object(l.cx)(t,y()({},d,s)),"data-testid":"accordion-item"},void 0,c.Children.map(r,(function(e){return o.a.cloneElement(e,{onClick:i,expanded:s,uid:a})})))}k.displayName="AccordionItem",k.defaultProps={onClick:function(){},expanded:!1,expandedClassName:void 0,className:void 0,uid:"",children:null};var N=k;function C(e){var a=e.uid,i=e.expanded,t=e.className,c=e.children,o={};return i||(o.display="none"),n()("div",{className:Object(l.cx)(Object(l.css)(o),t),id:"body-".concat(a),"aria-labelledby":"item-".concat(a),"aria-expanded":i,role:"tabpanel","data-testid":"accordion-item-body"},void 0,c)}C.displayName="AccordionItemBody",C.defaultProps={expanded:!1,className:void 0,uid:"",children:null};var w=C,O=Object(l.css)("cursor:pointer;margin:0;");function j(e){var a=e.uid,i=e.className,t=e.onClick,c=e.expanded,o=e.children;return n()("header",{"aria-controls":"body-".concat(a),id:"item-".concat(a),className:Object(l.cx)(O,i),onClick:t,onKeyUp:function(e){return!t||13!==e.keyCode&&32!==e.keyCode||(t(),!1)},role:"tab",tabIndex:"0","aria-expanded":c,"data-testid":"accordion-item-header"},void 0,o)}j.displayName="AccordionItemHeader",j.defaultProps={expanded:!1,className:void 0,children:null,uid:"",onClick:null};i("zHFu");var D=Object(l.css)("list-style:none;margin:0;padding:0;"),z=(u.a.color.gray60,u.a.breakpoint.medium,u.a.color.gray60,u.a.color.gray60,u.a.breakpoint.large,u.a.breakpoint.maxDesktopContentWidth,Object(l.css)("padding:0 20px;",u.a.breakpoint.medium,"{padding:0 3%;}",u.a.breakpoint.large,"{padding:0;}")),M=Object(l.css)("display:flex;flex-flow:row;"),H=Object(l.css)("display:block;height:44px;vertical-align:middle;width:184px;"),S=Object(l.css)("margin:18px 0 0 auto;"),L=Object(l.css)("color:",u.a.color.blue30,";font-family:",u.a.font.franklinBase,";font-size:11px;font-style:normal;font-weight:",u.a.font.weight.book,";line-height:11px;text-decoration:none;"),I=Object(l.css)("display:block;",u.a.breakpoint.large,"{display:none;}"),P=Object(l.css)("display:none;",u.a.breakpoint.large,"{display:block;}"),V=Object(l.css)("display:flex;margin-top:10px;min-width:600px;"),T=Object(l.css)("flex:1;"),A=Object(l.css)("border-left:1px solid ",u.a.color.gray60,";flex:1;padding-left:15px;"),B=Object(l.css)("color:",u.a.color.gray20,";font-size:13px;font-weight:",u.a.font.weight.bold,";font-family:",u.a.font.franklinBase,";height:25px;line-height:15px;margin:0;text-transform:uppercase;width:150px;"),q=Object(l.css)("margin-bottom:5px;white-space:nowrap;&:last-child{margin-bottom:10px;}"),E=Object(l.css)("color:",u.a.color.black,";display:inline-block;font-family:",u.a.font.franklinBase,";text-decoration:none;text-transform:capitalize;width:150px;&:hover{cursor:pointer;text-decoration:underline;}body.dark &{color:",u.a.color.white,";}"),J=Object(l.css)("&.desktop{display:none;}",u.a.breakpoint.medium,"{&.desktop{display:block;}&.smartphone{display:none;}}"),R=Object(l.css)("border-top:1px solid ",u.a.color.gray70,";color:",u.a.color.gray20,";font-family:",u.a.font.franklinBase,";font-size:13px;font-weight:",u.a.font.weight.bold,";height:44px;letter-spacing:0.04rem;line-height:44px;text-transform:uppercase;.accordionExpanded &{color:",u.a.color.gray45,";}"),F=Object(l.css)(D,";columns:2;padding:0 0 15px;"),K=Object(l.css)("height:34px;line-height:34px;list-style-type:none;&.desktop{display:none;}",u.a.breakpoint.medium,"{&.desktop{display:block;}&.smartphone{display:none;}}"),Q=Object(l.css)("color:",u.a.color.gray20,";display:block;font-family:",u.a.font.franklinBase,";font-size:15px;font-weight:",u.a.font.weight.medium,";height:34px;line-height:34px;text-decoration:none;text-transform:capitalize;"),W=Object(l.css)(E,";font-size:14px;font-weight:",u.a.font.weight.medium,";height:23px;line-height:16px;"),X=Object(l.css)(E,";font-size:16px;font-weight:",u.a.font.weight.bold,";height:25px;line-height:15px;padding-bottom:0;"),U=Object(l.css)(E,";font-size:11px;font-weight:",u.a.font.weight.medium,";height:23px;line-height:21px;"),G=Object(l.css)(D,";border-top:1px solid ",u.a.color.gray60,";margin-top:2px;padding-top:10px;"),Z=Object(l.css)("display:inline-block;height:13px;width:13px;margin-right:7px;vertical-align:middle;"),Y=Object(l.css)(Z,";"),$=Object(l.css)(Z,";"),_=Object(l.css)(Z,";"),ee=Object(l.css)(Z,";"),ae="Listings & More";function ie(e){var a=e.indexData,i=e.uniqueName,t=e.handleAccordionClick,c=function(e){if(t){var a,n,c=(n=a=i,"masthead"===a?n="header":"siteindex"===a&&(n="footer"),n),o=function(e){return"more"===e?ae:e.charAt(0).toUpperCase()+e.slice(1)}(e);t(c,o)}};return n()(x,{uniqueName:i},void 0,a.map((function(e,a){return n()(N,{expandedClassName:"accordionExpanded",expanded:e.expanded,onClick:function(){return c(e.name)}},"".concat(i,"-").concat(a.toString(16)),n()(j,{className:R,index:a},void 0,e.longName||e.name),n()(w,{},void 0,n()("ul",{className:F,"data-testid":"site-index-accordion-list"},void 0,e.pages.map((function(e){return n()("li",{className:Object(l.cx)(K,e.deviceType)},e.link,n()("a",{className:Q,href:e.link,"data-testid":"accordion-item-list-link"},void 0,e.name))})))))})))}ie.displayName="SiteIndexAccordion",ie.defaultProps={handleAccordionClick:null,indexData:[]};var te=ie,ne=(i("fbCW"),i("yq1k"),i("JTJg"),i("HzmA")),ce=(i("yyme"),n()("polygon",{points:"0,-93.6 0,-86.9 6.6,-93.6"})),oe=n()("polygon",{points:"0.9,-86 7.5,-86 7.5,-92.6"}),le=n()("polygon",{points:"0,-98 0,-94.8 8.8,-94.8 8.8,-86 12,-86 12,-98"}),se=n()("path",{d:"M11.9-40c-0.4,1.1-1.2,1.9-2.3,2.4V-40l1.3-1.2l-1.3-1.2V-44c1.2-0.1,2-1,2-2c0-1.4-1.3-1.9-2.1-1.9c-0.2,0-0.3,0-0.6,0.1v0.1c0.1,0,0.2,0,0.3,0c0.5,0,0.9,0.2,0.9,0.7c0,0.4-0.3,0.7-0.8,0.7c-1.3,0-2.8-1.1-4.5-1.1c-1.5,0-2.5,1.1-2.5,2.2c0,1.1,0.6,1.5,1.3,1.7l0-0.1c-0.2-0.1-0.4-0.4-0.4-0.7c0-0.5,0.5-0.9,1-0.9C5.7-45.1,8-44,9.4-44h0.1v1.7l-1.3,1.1L9.5-40v2.4c-0.5,0.2-1.1,0.3-1.7,0.3c-2.2,0-3.6-1.3-3.6-3.5c0-0.5,0.1-1,0.2-1.5l1.1-0.5v4.9l2.2-1v-5l-3.3,1.5c0.3-1,1-1.7,1.8-2l0,0c-2.2,0.5-4.3,2.1-4.3,4.6c0,2.9,2.4,4.8,5.2,4.8C10.2-35.1,11.9-37.1,11.9-40L11.9-40z"}),de=n()("path",{d:"M12.2-23.7c-0.2,0-0.4,0.2-0.4,0.4v0.4L0.4-19.1v2.3l3,1l-0.2,0.6c-0.3,0.8,0.1,1.8,0.9,2.1l1.7,0.7c0.2,0.1,0.4,0.1,0.6,0.1c0.6,0,1.3-0.4,1.5-1l0.4-0.9l3.5,1.2v0.4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4v-10.7C12.6-23.5,12.4-23.7,12.2-23.7M7.1-13.6c-0.2,0.4-0.6,0.6-1,0.4l-1.7-0.7c-0.4-0.2-0.6-0.6-0.4-1l0.3-0.7l3.3,1.1L7.1-13.6z"}),re=n()("path",{d:"M13.1-60.3H3.5v-10.5h9.6V-60.3zM13.1-71.6H3.5c-0.5,0-0.9,0.4-0.9,0.9v2.2H0.9c-0.5,0-0.9,0.4-0.9,0.9v5.2v1.5c0,0.8,0.8,1.5,1.8,1.5h1.7h0h7.4h2.2c0.5,0,0.9-0.4,0.9-0.9v-10.5C14-71.2,13.6-71.6,13.1-71.6"}),pe=n()("polygon",{points:"10.9,-69 5.2,-69 5.2,-68.1 11.4,-68.1 11.4,-69"}),ue=n()("rect",{x:"5.2",y:"-67.3",width:"6.1",height:"0.9"}),me=n()("rect",{x:"5.2",y:"-65.5",width:"6.1",height:"0.9"}),he=n()("path",{d:"M12,6.5H6.5V12H1V6.5h5.5V1H12V6.5zM12,0H1C0.4,0,0,0.5,0,1v11c0,0.6,0.4,1,1,1h11c0.5,0,1-0.4,1-1V1C13,0.5,12.5,0,12,0"}),be=function(e){var a=e.className,i=e.fill;return n()("svg",{className:a,viewBox:"0 0 13 13",fill:i},void 0,ce,oe,le,se,de,re,pe,ue,me,he)};be.displayName="CrosswordIcon",be.defaultProps={className:void 0,fill:u.a.color.black};var fe=be,ve=function(e){var a=e.className,i=e.fill;return n()("svg",{className:a,viewBox:"0 0 10 13"},void 0,n()("path",{fill:i,d:"M9.9,8c-0.4,1.1-1.2,1.9-2.3,2.4V8l1.3-1.2L7.6,5.7V4c1.2-0.1,2-1,2-2c0-1.4-1.3-1.9-2.1-1.9c-0.2,0-0.3,0-0.6,0.1v0.1c0.1,0,0.2,0,0.3,0c0.5,0,0.9,0.2,0.9,0.7c0,0.4-0.3,0.7-0.8,0.7C6,1.7,4.5,0.6,2.8,0.6c-1.5,0-2.5,1.1-2.5,2.2C0.3,4,1,4.3,1.6,4.6l0-0.1C1.4,4.4,1.3,4.1,1.3,3.8c0-0.5,0.5-0.9,1-0.9C3.7,2.9,6,4,7.4,4h0.1v1.7L6.2,6.8L7.5,8v2.4c-0.5,0.2-1.1,0.3-1.7,0.3c-2.2,0-3.6-1.3-3.6-3.5c0-0.5,0.1-1,0.2-1.5l1.1-0.5V10l2.2-1v-5L2.5,5.5c0.3-1,1-1.7,1.8-2l0,0C2.2,3.9,0.1,5.6,0.1,8c0,2.9,2.4,4.8,5.2,4.8C8.2,12.9,9.9,10.9,9.9,8L9.9,8z"}))};ve.displayName="DigitalSubscriptionsIcon",ve.defaultProps={className:void 0,fill:u.a.color.black};var xe=ve,ge=n()("path",{d:"M13.1,11.7H3.5V1.2h9.6V11.7zM13.1,0.4H3.5C3,0.4,2.6,0.8,2.6,1.2v2.2H0.9C0.4,3.4,0,3.8,0,4.3v5.2v1.5c0,0.8,0.8,1.5,1.8,1.5h1.7h0h7.4h2.2c0.5,0,0.9-0.4,0.9-0.9V1.2C14,0.8,13.6,0.4,13.1,0.4"}),ye=n()("polygon",{points:"10.9,3 5.2,3 5.2,3.9 11.4,3.9 11.4,3"}),ke=n()("rect",{x:"5.2",y:"4.7",width:"6.1",height:"0.9"}),Ne=n()("rect",{x:"5.2",y:"6.5",width:"6.1",height:"0.9"}),Ce=function(e){var a=e.className,i=e.fill;return n()("svg",{className:a,viewBox:"0 0 14 13",fill:i},void 0,ge,ye,ke,Ne)};Ce.displayName="HomeDeliveryIcon",Ce.defaultProps={className:void 0,fill:u.a.color.black};var we=Ce,Oe=n()("path",{d:"M12,2.9L9.6,5.2c-0.1,0.1-0.3,0.1-0.4,0C9.1,5.2,9.1,5,9.3,4.9l2.4-2.4c-0.2-0.2-0.3-0.3-0.5-0.5L8.7,4.3c-0.1,0.1-0.3,0.1-0.4,0C8.2,4.3,8.2,4.1,8.4,4l2.4-2.4c-0.3-0.3-0.5-0.5-0.5-0.5L7.6,3.4C7.1,4,6.8,5.1,7.1,5.8c-1.4,1-4.6,3.5-5.1,4c-0.8,0.8-0.4,1.8-0.3,1.9c0,0,0,0,0,0c0,0,0,0,0,0c0.1,0.1,1.1,0.5,1.9-0.3c0.4-0.4,2.9-3.6,3.9-5C8.4,6.9,9.6,6.6,10.2,6l2.3-2.6C12.5,3.4,12.3,3.2,12,2.9z"}),je=n()("path",{d:"M0.8,1.9l0.3-0.3c0.9-0.9,3.2,1.1,3.8,1.7s0.9,1.8,0.4,2.6c1.4,1.1,4.6,3.5,5,3.9c0.8,0.8,0.4,1.8,0.3,1.9c0,0,0,0,0,0c0,0,0,0,0,0c-0.1,0.1-1.1,0.5-1.9-0.3c-0.4-0.4-2.9-3.7-4-5.1C3.9,6.7,2.9,6.4,2.3,5.8S-0.2,2.9,0.8,1.9z"}),De=function(e){var a=e.className,i=e.fill;return n()("svg",{className:a,viewBox:"0 0 13 13",fill:i},void 0,Oe,je)};De.displayName="CookingIcon",De.defaultProps={className:void 0,fill:u.a.color.black};var ze={iconCrossword:fe,iconDigitalSubscriptions:xe,iconHomeDelivery:we,iconCooking:De},Me={iconCrossword:Y,iconDigitalSubscriptions:$,iconHomeDelivery:_,iconCooking:ee},He="Subscribe",Se=function(e){var a,i=e.subscribeData,t=Object(ne.a)().user,c=Object(l.useTheme)(),o="nonsub",s=null==t?void 0:t.entitlements,d=null==t||null===(a=t.demographics)||void 0===a?void 0:a.bundleSubscriptions;return s&&(s.includes("TPR")||s.includes("MTD")||s.includes("MSD")||s.includes("MM"))&&(o="digital"),(null==d?void 0:d.find((function(e){return"H"===e.bundle})))&&(o="hd"),n()("div",{className:A,"aria-labelledby":"site-index-subscribe-label"},void 0,n()("h3",{className:B,id:"site-index-subscribe-label"},void 0,He),n()("ul",{className:D,"data-testid":"site-index-subscribe-list"},void 0,i.productLinks.map((function(e){var a=null;if(e.iconClass){var i,t=ze[e.iconClass]||"i",l=Me[e.iconClass]||e.iconClass;ze[e.iconClass]&&"dark"===(null==c?void 0:c.mode)&&(i=u.a.color.white),a=n()(t,{className:l,fill:i})}return(!e.userType||e.userType.includes(o))&&n()("li",{className:q},e.name,n()("a",{className:X,href:e.link,"data-testid":"site-index-subscribe-list-link"},void 0,a,e.name))}))),n()("ul",{className:D,"data-testid":"site-index-corporate-links"},void 0,i.corporateLinks.map((function(e){return(!e.userType||e.userType.includes(o))&&n()("li",{},e.name,n()("a",{className:U,href:e.link},void 0,e.name))}))),n()("ul",{className:G,"data-testid":"site-index-alternate-links"},void 0,i.alternateLinks.map((function(e){return(!e.userType||e.userType.includes(o))&&n()("li",{},e.name,n()("a",{className:U,href:e.link},void 0,e.name))}))))};Se.displayName="SiteIndexSubscribe",Se.defaultProps={subscribeData:{}};var Le=Se,Ie=function(e){var a=e.indexData,i=e.subscribeData;return n()("div",{className:V,"data-testid":"site-index-section"},void 0,(a||[]).map((function(e,a){return n()("section",{className:T,"aria-labelledby":"site-index-section-label-".concat(a)},a.toString(),n()("h3",{className:B,id:"site-index-section-label-".concat(a)},void 0,e.name),n()("ul",{className:D,"data-testid":"site-index-section-list"},void 0,e.pages.map((function(e){var a=e.name,i=e.link,t=e.deviceType;return n()("li",{className:Object(l.cx)(J,t)},i,n()("a",{className:W,href:i,"data-testid":"site-index-section-list-link"},void 0,a))}))))})),n()(Le,{subscribeData:i}))};Ie.displayName="SiteIndexSections",Ie.defaultProps={indexData:[],subscribeData:{}};var Pe=Ie,Ve=i("pCqE"),Te="Go to Home Page »",Ae=n()(Pe,{indexData:Ve.a,subscribeData:Ve.b});function Be(){var e=Object(l.useTheme)(),a=Object(s.useTracking)();return n()("div",{className:z},void 0,n()("header",{className:M,"data-testid":"site-index-header"},void 0,n()(h.a,{to:"/"},void 0,n()(r.a,{fill:"dark"===(null==e?void 0:e.mode)?u.a.color.white:u.a.color.black,className:H})),(!e||!e.homepage)&&n()("div",{className:S,"data-testid":"go-to-homepage"},void 0,n()(h.a,{to:"/",className:L},void 0,Te))),n()("div",{className:I,"data-testid":"site-index-accordion"},void 0,n()(te,{handleAccordionClick:function(e,i){a.trackEvent({event:"moduleInteraction",interaction:{module:{name:e,context:"section",label:i},type:"click",status:""}})},indexData:Ve.a,uniqueName:"siteindex"})),n()("div",{className:P,"data-testid":"site-index-sections"},void 0,Ae))}Be.displayName="SiteIndexContent";a.default=Be}}]);
//# sourceMappingURL=siteIndexContent-ac14c6338d350fa88318.js.map