(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"11hc":function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r("lSNA")),a=n(r("QILm")),i=n(r("lwsE")),l=n(r("W8MJ")),u=n(r("7W2i")),s=n(r("a1gu")),d=n(r("Nsbk")),c=r("q1tI"),f=(n(r("17x9")),r("YFU0"));function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,d.default)(e);if(t){var o=(0,d.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,s.default)(this,r)}}var v=function(e){(0,u.default)(r,e);var t=y(r);function r(){var e;(0,i.default)(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).isServer=!f.canUseDOM,e.state={apiReady:!e.isServer&&!!window.__VHS__},e.getVHS=function(){return window.__VHS__},e}return(0,l.default)(r,[{key:"componentDidMount",value:function(){var e=this;this.isServer||this.state.apiReady||(0,f.loadApi)((function(){e.setState({apiReady:!0})}))}},{key:"render",value:function(){var e=this.props,t=e.children,r=(0,a.default)(e,["children"]);return this.state.apiReady&&"function"==typeof t?t(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){(0,o.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({VHS:this.getVHS()},r)):null}}]),r}(c.Component);t.default=v,v.defaultProps={children:void 0},v.displayName="DependencyLoader"},"1cNr":function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r("q1tI")),a=n(r("ARn7")),i=n(r("aYbO"));t.default=function(e){return o.default.createElement(a.default,e,o.default.createElement(i.default,e))}},ARn7:function(e,t,r){"use strict";var n=r("284h"),o=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(r("lwsE")),i=o(r("W8MJ")),l=o(r("7W2i")),u=o(r("a1gu")),s=o(r("Nsbk")),d=n(r("q1tI")),c=(o(r("17x9")),o(r("FQbI")));function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,s.default)(e);if(t){var o=(0,s.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,u.default)(this,r)}}var p=function(e){(0,l.default)(r,e);var t=f(r);function r(){var e;(0,a.default)(this,r);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={hasError:!1},e}return(0,i.default)(r,[{key:"componentDidCatch",value:function(){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?d.default.createElement(c.default,{ratio:this.props.ratio,width:this.props.width,height:this.props.height}):this.props.children}}]),r}(d.Component);t.default=p,p.defaultProps={ratio:"16:9",width:"600px",height:"auto"},p.displayName="ErrorBoundary"},FQbI:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r("q1tI")),a=(n(r("17x9")),r("YFU0")),i=function(e,t){return{backgroundColor:"#f7f7f7",position:"relative",width:e,height:t}};function l(e){var t=(0,a.computeAspectRatio)(e);return{display:"flex",height:"100%",paddingBottom:"".concat(t,"%")}}var u=function(e){var t=e.width,r=e.ratio,n=e.height;return o.default.createElement("div",{style:i(t,n)},o.default.createElement("p",{style:{"-webkit-font-smoothing":"antialiased",color:"#333",fontFamily:"'franklin', 'nyt-franklin', arial, helvetica, sans-serif",fontSize:"13px",fontWeight:"700",lineHeight:"13px",padding:"0 30px",margin:0,boxSizing:"border-box",position:"absolute",textAlign:"center",textRendering:"optimizeLegibility",top:"calc(50%)",transform:"translateY(-50%)",width:"100%"}},o.default.createElement("span",{style:{fontSize:"25px",position:"relative",top:"5px"}},"⚠"),"There was an error loading the player. Please refresh to try again."),o.default.createElement("div",{style:l(r)}))};u.displayName="ErrorSlate",u.defaultProps={ratio:"16:9",width:"600px",height:"auto"};var s=u;t.default=s},HNQ6:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=function(t){return i.default.createElement(l.default,null,(function(r){return i.default.createElement(e,(0,a.default)({},r,t))}))};try{var r=e.propTypes,n=(r.VHS,(0,o.default)(r,["VHS"]),e.defaultProps),u=(n.VHS,(0,o.default)(n,["VHS"]));t.defaultProps=u}catch(e){}return t.displayName="WithDependencyLoader(".concat(e.displayName,")"),t};var o=n(r("QILm")),a=n(r("pVnL")),i=n(r("q1tI")),l=n(r("11hc"))},L0Nc:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};t.default=n},R99I:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r("pVnL")),a=n(r("q1tI")),i=n(r("ARn7")),l=n(r("RMtu"));t.default=function(e){return a.default.createElement(i.default,(0,o.default)({},e,{height:"40px",ratio:"0"}),a.default.createElement(l.default,e))}},RMtu:function(e,t,r){"use strict";var n=r("TqRt"),o=r("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,i,l,u=n(r("lSNA")),s=n(r("lwsE")),d=n(r("W8MJ")),c=n(r("7W2i")),f=n(r("a1gu")),p=n(r("Nsbk")),y=o(r("q1tI")),v=(n(r("17x9")),n(r("HNQ6")));function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){(0,u.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,p.default)(e);if(t){var o=(0,p.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,f.default)(this,r)}}var g={INITIALIZING:"initializing",LOAD_NEW_VIDEO:"load_new_video",READY:"ready",LOAD_START:"loadstart",PLAY:"play",PAUSE:"pause",ENDED:"ended"},m={INITIALIZING:"onInitializing",READY:"onReady",LOAD_START:"onLoadStart",PLAY:"onPlay",PAUSE:"onPause",ENDED:"onEnded"},S=["className","playerClassName","playerRef","VHS","onReady","onLoadStart","onPlay","onPause","onEnded","onErrorLoadingPlayer"],O=(0,v.default)((l=i=function(e){(0,c.default)(r,e);var t=P(r);function r(){var e;(0,s.default)(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).playerStatus=null,e.state={playerCreated:!1},e}return(0,d.default)(r,[{key:"componentDidMount",value:function(){if(null===this.playerStatus){if(!this.props.VHS){throw console.error("VHS did not load"),"function"==typeof this.props.onErrorLoadingPlayer&&this.props.onErrorLoadingPlayer(),new Error("VHS did not load")}this.initPlayer()}}},{key:"shouldComponentUpdate",value:function(e,t){return null!==this.playerStatus&&e.src!==this.props.src||this.state.playerCreated!==t.playerCreated}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.updatePlayer(e)}},{key:"componentWillUnmount",value:function(){this.destroyPlayer()}},{key:"initPlayer",value:function(){var e=this;this.playerStatus=g.INITIALIZING,this.destroyPlayer((function(){e.player=e.props.VHS.audio(e.playerConfig),e.bindPlayerEvents(),e.setState((function(){return{playerCreated:!0}})),"function"==typeof e.props.playerRef&&e.props.playerRef(e.player)}))}},{key:"bindPlayerEvents",value:function(){var e=this;Object.keys(this.player.events).filter((function(e){return void 0!==g[e]})).forEach((function(t){e.player.on(e.player.events[t],(function(){e.playerStatus=e.player.events[t];var r=m[t],n=e.props[r];"function"==typeof n&&n()}))}))}},{key:"updatePlayer",value:function(e){if(this.player){if("string"==typeof e.src&&e.src!==this.props.src&&this.player.load({src:e.src}),this.props.audioControls.layout!==e.audioControls.layout){var t=this.player.store.getState();t.plugins.audioControls.layout=e.audioControls.layout,this.player.store.setState(t)}if(this.props.forceHover!==e.forceHover){var r=this.player.store.getState();r.plugins.audioControls.forceHover=e.forceHover,this.player.store.setState(r)}}}},{key:"destroyPlayer",value:function(e){this.playerStatus=null,this.player&&"function"==typeof this.player.destroy?this.player.destroy(e):"function"==typeof e&&e()}},{key:"render",value:function(){var e=this,t=this.props,r=t.audioControls,n=t.className,o=t.playerClassName,a=t.width,i=t.forceError,l=t.style;if(i)throw new Error("Forced error for error boundary testing.");var u="react-vhs-container";"string"==typeof n&&(u+=" ".concat(n));var s="react-vhs-player";"string"==typeof o&&(s+=" ".concat(o));var d={width:a};"v2"===r.version&&(d.height="100%",d.width="100%",d.position="relative",d.WebkitTapHighlightColor="transparent"),d=E(E({},d),l);var c={},f=E({height:"40px",padding:"0"},r),p=f.height,v=f.padding;return c.height=p,c.padding=v,y.default.createElement("div",{className:u,style:d},y.default.createElement("div",{ref:function(t){e.playerElement=t},className:s,style:c}))}},{key:"propsForConfig",get:function(){var e=this;return Object.keys(this.props).reduce((function(t,r){return-1===S.indexOf(r)?E(E({},t),{},(0,u.default)({},r,e.props[r])):t}),{})}},{key:"playerConfig",get:function(){var e=this.propsForConfig;return e.container=this.playerElement,e}}]),r}(y.Component),i.displayName="AudioPlayer",i.defaultProps={className:void 0,onErrorLoadingPlayer:void 0,playerClassName:void 0,playerRef:void 0,style:{},width:"100%",forceHover:!1,onReady:void 0,onLoadStart:void 0,onPlay:void 0,onPause:void 0,onEnded:void 0,env:"production",audioControls:{}},a=l))||a;O.displayName="AudioPlayer";var b=O;t.default=b},"S+vP":function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a,i=n(r("cDf5")),l=n(r("zrfs")),u="object"===("undefined"==typeof window?"undefined":(0,i.default)(window))&&(null===(o=window.vi)||void 0===o||null===(a=o.env)||void 0===a?void 0:a.VHS_BASE_URL)?"".concat(window.vi.env.VHS_BASE_URL,"vhs.min.js"):"https://static01.nyt.com/video-static/vhs3/vhs.min.js",s=function(e){var t=window||{},r=null;t.VHS_PLAYER_DEPS_LOADING?r=t.setInterval((function(){t.__VHS__&&(t.VHS_PLAYER_DEPS_LOADING=null,t.clearInterval(r),e())}),100):(t.VHS_PLAYER_DEPS_LOADING=!0,(0,l.default)(u,e))};t.default=s},U7vG:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){if("string"!=typeof e&&(e="16:9"),e.match(/\d+%/))return e;e.match(/\d+\.\d+/)&&!e.match(/:/)&&(e="".concat(e,":1"));var t=0,r=e.split(":");return 2===r.length&&(t=Math.round(r[1]/r[0]*1e4)/100),t};t.default=n},UIP5:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"VideoPlayer",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"AudioPlayer",{enumerable:!0,get:function(){return a.default}});var o=n(r("1cNr")),a=n(r("R99I"))},YFU0:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isNumeric",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"loadApi",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"canUseDOM",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"computeAspectRatio",{enumerable:!0,get:function(){return l.default}});var o=n(r("L0Nc")),a=n(r("S+vP")),i=n(r("rCSJ")),l=n(r("U7vG"))},aYbO:function(e,t,r){"use strict";var n=r("TqRt"),o=r("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,i,l,u=n(r("lSNA")),s=n(r("lwsE")),d=n(r("W8MJ")),c=n(r("7W2i")),f=n(r("a1gu")),p=n(r("Nsbk")),y=o(r("q1tI")),v=(n(r("17x9")),n(r("HNQ6"))),h=r("YFU0");function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){(0,u.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,p.default)(e);if(t){var o=(0,p.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,f.default)(this,r)}}var m={INITIALIZING:"initializing",LOAD_NEW_VIDEO:"load_new_video",MEDIA_ELEMENT_MOUNTED:"mediaelementmounted",AD_STARTED:"adstarted",AD_COMPLETED:"adcompleted",AD_SKIPPED:"adskipped",READY:"ready",LOAD_START:"loadstart",PLAY:"play",PAUSE:"pause",ENDED:"ended",GO_FULLSCREEN:"gofullscreen",EXIT_FULLSCREEN:"exitfullscreen"},S={INITIALIZING:"onInitializing",LOAD_NEW_VIDEO:"onLoadNewVideo",MEDIA_ELEMENT_MOUNTED:"onMediaElementMounted",AD_STARTED:"onAdStarted",AD_COMPLETED:"onAdCompleted",AD_SKIPPED:"onAdSkipped",READY:"onReady",LOAD_START:"onLoadStart",PLAY:"onPlay",PAUSE:"onPause",ENDED:"onEnded",GO_FULLSCREEN:"onGoFullscreen",EXIT_FULLSCREEN:"onExitFullscreen"},O=["className","playerClassName","playerRef","VHS","onInitializing","onLoadNewVideo","onMediaElementMounted","onAdStarted","onAdCompleted","onAdSkipped","onReady","onLoadStart","onPlay","onPause","onEnded","onGoFullscreen","onExitFullscreen","onErrorLoadingPlayer"],b=(0,v.default)((l=i=function(e){(0,c.default)(r,e);var t=g(r);function r(){var e;(0,s.default)(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).playerStatus=null,e.state={playerCreated:!1},e}return(0,d.default)(r,[{key:"componentDidMount",value:function(){if(null===this.playerStatus){if(!this.props.VHS){throw console.error("VHS did not load"),"function"==typeof this.props.onErrorLoadingPlayer&&this.props.onErrorLoadingPlayer(),new Error("VHS did not load")}this.initPlayer()}}},{key:"shouldComponentUpdate",value:function(e,t){return null!==this.playerStatus&&e.id!==this.props.id||this.state.playerCreated!==t.playerCreated}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.updatePlayer(e)}},{key:"componentWillUnmount",value:function(){this.destroyPlayer()}},{key:"initPlayer",value:function(){var e=this;this.playerStatus=m.INITIALIZING,this.destroyPlayer((function(){e.player=e.props.VHS(e.playerConfig),e.bindPlayerEvents(),e.setState((function(){return{playerCreated:!0}})),"function"==typeof e.props.playerRef&&e.props.playerRef(e.player)}))}},{key:"bindPlayerEvents",value:function(){var e=this;Object.keys(this.player.events).filter((function(e){return void 0!==m[e]})).forEach((function(t){e.player.on(e.player.events[t],(function(){e.playerStatus=e.player.events[t];var r=S[t],n=e.props[r];if("function"==typeof n){for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];n.apply(void 0,a.concat([e.player]))}}))}))}},{key:"updatePlayer",value:function(e){this.player&&(0,h.isNumeric)(e.id)&&(0,h.isNumeric)(this.props.id)&&e.id!==this.props.id&&this.player.load(e.id)}},{key:"destroyPlayer",value:function(e){this.playerStatus=null,this.player&&"function"==typeof this.player.destroy?this.player.destroy(e):"function"==typeof e&&e()}},{key:"render",value:function(){var e=this,t=this.props,r=t.className,n=t.playerClassName,o=t.ratio,a=t.width;if(t.forceError)throw new Error("Forced error for error boundary testing.");var i=(0,h.computeAspectRatio)(o),l="react-vhs-container";"string"==typeof r&&(l+=" ".concat(r));var u="react-vhs-player";"string"==typeof n&&(u+=" ".concat(n));var s={position:"relative",width:a},d={};return"number"==typeof i&&0!==i?(s.height="auto",d.height=0,d.paddingBottom="".concat(i,"%")):s.height="100%",y.default.createElement("div",{className:l,style:s},y.default.createElement("div",{ref:function(t){e.playerElement=t},className:u,style:d}))}},{key:"propsForConfig",get:function(){var e=this;return Object.keys(this.props).reduce((function(t,r){return-1===O.indexOf(r)?P(P({},t),{},(0,u.default)({},r,e.props[r])):t}),{})}},{key:"playerConfig",get:function(){var e=this.propsForConfig;return e.width="100%",e.height="100%",e.container=this.playerElement,e}}]),r}(y.Component),i.displayName="VideoPlayer",i.defaultProps={className:void 0,onErrorLoadingPlayer:void 0,playerClassName:void 0,playerRef:void 0,width:"100%",height:"100%",onInitializing:void 0,onLoadNewVideo:void 0,onMediaElementMounted:void 0,onAdStarted:void 0,onAdCompleted:void 0,onAdSkipped:void 0,onReady:void 0,onLoadStart:void 0,onPlay:void 0,onPause:void 0,onEnded:void 0,onGoFullscreen:void 0,onExitFullscreen:void 0,controls:!0,env:"production",eventTracker:!1},a=l))||a;b.displayName="VideoPlayer";var _=b;t.default=_},rCSJ:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=!("undefined"==typeof window||!window.document||!window.document.createElement);t.default=n},zrfs:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e,t){if("function"==typeof requirejs)requirejs([e],(function(e){return t(e)}));else{var r=document.getElementsByTagName("head")[0],n=document.createElement("script");n.loaded=!1,n.async=1;var o=function(){n.readyState&&!/^c|loade/.test(n.readyState)||n.loaded||(n.loaded=!0,n.onerror=null,n.onreadystatechange=null,n.onload=null,t())};n.onload=o,n.onerror=o,n.src=e,r.insertBefore(n,r.lastChild)}};t.default=n}}]);
//# sourceMappingURL=vendors~audio~capsule~cityguides~collections~home~liveblog~paidpost~regionCapsule~story~trending~video-ac2839a7a8b2c78a431a.js.map