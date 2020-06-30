Namespace('jp.mixi.ui')
.use('jp.mixi.ui.memberlist MemberList')
.use('jp.mixi.ui.grouplist GroupList')
.define(function(ns){ns.provide({MemberList:ns.MemberList,GroupList:ns.GroupList});});Namespace('jp.mixi.ui.form.widget.recaptcha.v2')
.use('jp.co.mixi.dom.dataset.formatter format')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.ui.recaptcha.v2 recaptcha')
.define(function(ns){'use strict';function submitPreventer(evt){evt.preventDefault();return false;}
function createHiddenInput(form,name){var d=document.createElement('input');d.type='hidden';d.name=name;return form.appendChild(d);}
function setHiddenValue(form,name,token){if(!form[name]){createHiddenInput(form,name);}
form[name].value=token;}
function attach(formElement,dataset){if(!ns.gateway('can_verify_recaptcha_v2'))return;var data=ns.format({tokenFieldName:'string'},dataset);function onSubmit(){ns.recaptcha.solve(function(token){setHiddenValue(formElement,data.tokenFieldName,token);formElement.submit();});}
formElement.addEventListener('submit',submitPreventer);ns.recaptcha.ready(function(){formElement.addEventListener('submit',onSubmit);});}
ns.provide({registerElement:attach});});Namespace('jp.mixi.ui.form.widget.recaptcha.v3')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.ui.recaptcha.v3 recaptcha')
.define(function(ns){'use strict';function attach(formElement,dataset){if(!ns.gateway('can_verify_recaptcha_v3'))return;var actionName=dataset.actionName;var tokenFieldName=dataset.tokenFieldName;formElement.addEventListener('submit',function(evt){evt.preventDefault();return false;});ns.recaptcha.onReady(function(){formElement.addEventListener('submit',function(evt){ns.recaptcha.solve(actionName,function(token){appendToken(formElement,tokenFieldName,token);formElement.submit();});});});}
function appendToken(formElement,tokenFieldName,token){if(!formElement[tokenFieldName]){var input=document.createElement('input');input.type='hidden';input.name=tokenFieldName;input.value=token;formElement.appendChild(input);}}
ns.provide({registerElement:attach});});Namespace('jp.mixi.ui.form.widget.email.normalize')
.define(function(ns){'use strict';ns.provide({registerElement:function(element,dataset){$j(element).focusout(function(event){var elem=event.target;elem.value=elem.value.replace(/[\s]/g,'');elem.value=elem.value.replace(/[\uFF01-\uFF5E]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xfee0);});});}});});Namespace('jp.mixi.ui.recaptcha.v2')
.use('jp.co.mixi.gateway gateway')
.define(function(ns){'use strict';var loadCallbacks=[];var solveCallbacks=[];var recaptchaId;var recaptchaLoading=false;function recaptchaLoaded(){return!!recaptchaId;}
function consume(list,args){while(list.length>0){list.shift().apply(null,args);}}
function onload(){consume(loadCallbacks,[]);}
function onsolve(token){consume(solveCallbacks,[token]);}
function solveReCAPTCHA(callback){if(!recaptchaLoaded()){throw new Error('reCAPTCHA v2 is not loaded (yet).');}
solveCallbacks.push(callback);var token=grecaptcha.getResponse(recaptchaId);if(token){onsolve(token);}else{grecaptcha.execute(recaptchaId);}}
function createRecaptchaWidgetContainer(){var d=document.createElement('div');d.setAttribute('style','position:fixed;left:0;top:0;z-index:1;');var s=document.getElementsByTagName('body')[0];return s.insertBefore(d,s.firstChild);}
function render(){var container=createRecaptchaWidgetContainer();recaptchaId=grecaptcha.render(container,{sitekey:ns.gateway('recaptcha_v2_sitekey'),callback:onsolve,'error-callback':function(arg){throw new Error(arg);},size:'invisible',isolated:true});}
function loadReCAPTHA(callback){loadCallbacks.push(callback);if(recaptchaLoading){return;}
if(recaptchaLoaded()){return onload();}
recaptchaLoading=true;window.mixiuirecaptchaonloadcallback=function(){delete window.mixiuirecaptchaonloadcallback;render();recaptchaLoading=false;onload();};var d=document.createElement('script');d.type='text/javascript';d.async=true;d.defer=true;d.src='https://www.google.com/recaptcha/api.js?hl=ja&onload=mixiuirecaptchaonloadcallback&render=explicit';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(d,s);}
ns.provide({recaptcha:{ready:loadReCAPTHA,solve:solveReCAPTCHA}});});Namespace('jp.mixi.ui.recaptcha.v3')
.use('jp.co.mixi.gateway gateway')
.define(function(ns){'use strict';var isLoaded=false;var isLoading=false;var maxRetryTimes=10;var retryIntervalUnit=50;var siteKey=ns.gateway('recaptcha_v3_sitekey');function initialize(){if(isLoaded||isLoading)return;isLoading=true;var script=document.createElement('script');script.type='text/javascript';script.async=true;script.defer=true;script.src='https://www.google.com/recaptcha/api.js?render='+siteKey;var scripts=document.getElementsByTagName('script')[0];scripts.parentNode.insertBefore(script,scripts);script.onload=script.onreadystatechange=function(){if(!this.readyState||this.readyState==='loaded'||this.readyState==='complete'){grecaptcha.ready(function(){isLoading=false;isLoaded=true;});script.onload=script.onreadystatechange=null;}};}
function onLoad(callback,retryTimes){if(isLoaded){callback();}
else{if(!retryTimes)retryTimes=1;if(retryTimes<=maxRetryTimes){setTimeout(function(){onLoad(callback,++retryTimes)},retryIntervalUnit*retryTimes);}}}
function onReady(callback){initialize();onLoad(callback);}
function solve(actionName,callback){if(!isLoaded){throw new Error('reCAPTCHA v3 is not loaded (yet).');}
grecaptcha.execute(siteKey,{action:actionName}).then(callback);}
ns.provide({recaptcha:{onReady:onReady,solve:solve}});});Namespace('jp.mixi.ui.commentphotobutton')
.use('brook.util through,cond')
.use('jp.co.mixi.lang.class defineClass')
.use('jp.mixi.model.comment isAttachedPhotoInResponse')
.use('jp.co.mixi.ui.form.resetattachedfile resetAttachedFile')
.define(function(ns){'use strict';var CommentPhotoButton=ns.defineClass({initialize:function(inputElement,toggleElement,toggleClass,model){this.$inputElement=$j(inputElement);this.$toggleElement=$j(toggleElement);this.toggleClass=toggleClass;this.model=model;},onclick:function(){},eventify:function(){var self=this;this.$inputElement.on('click',_.bind(this.onclick,this));this.$inputElement.on('change',function(e){var filePath=self.$inputElement.val();if(filePath){self._activate();self.model.notify('attachPhoto').run(filePath);}});this.model.method('detachPhoto').observe(ns.through(function(v){self._deactivate();}));this.model.method('willAttachPhoto').observe(ns.through(function(v){self.$inputElement.click();}));this.model.method('create').observe(ns.cond(ns.isAttachedPhotoInResponse,ns.through(function(v){self._deactivate();})));},isAttachedPhoto:function(){return!!this.$inputElement.val();},inputElement:function(){return this.$inputElement[0];},_activate:function(){this.$toggleElement.addClass(this.toggleClass);},_deactivate:function(){this.$toggleElement.removeClass(this.toggleClass);ns.resetAttachedFile(this.$inputElement);}});ns.provide({CommentPhotoButton:CommentPhotoButton});});Namespace('jp.mixi.ui.commentphotopreview')
.use('brook.util through')
.use('jp.co.mixi.lang.class defineClass')
.define(function(ns){"use strict";var CommentPhotoPreview=ns.defineClass({initialize:function(containerElement,filePathElement,deleteButtonElement,model){this.$el=$j(containerElement);this.$filePath=$j(filePathElement);this.$deleteButton=$j(deleteButtonElement);this.model=model;},eventify:function(){var self=this;this.model.method("attachPhoto").observe(ns.through(function(filePath){self._displayFilePath(filePath);self._show();}));this.$filePath.on("click",function(e){self.model.notify("willAttachPhoto").run();});this.model.method("create").observe(ns.through(function(v){self._hide();}));this.$deleteButton.on("click",function(e){self._hide();self.model.notify("detachPhoto").run();});},_displayFilePath:function(filePath){this.$filePath.text(filePath);},_clearFilePath:function(){this.$filePath.text("");},_show:function(){this.$el.show();},_hide:function(){this.$el.hide();this._clearFilePath();}});ns.provide({CommentPhotoPreview:CommentPhotoPreview});});Namespace('jp.mixi.ui.feedbackmemberlist')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.animation *')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.lang.string tuneForm,tuneHtml')
.use('jp.mixi.model.feedback createFeedbackModel')
.use('brook promise')
.use('jp.co.mixi.lang.class *')
.define(function(ns){var FeedbackElement=(function(){var Klass=function(element,member,feedback){this.element=element;this.datasets=$D(element);this.member=member;this.feedback=feedback;this.nickname=this.element.querySelector(this.datasets.nicknameClass||undefined);this.control=this.element.querySelector(this.datasets.controlRef||undefined);this.removeCallback=function(){};this.initialize();};(function(){this.initialize=function(){if(this.nickname){this.nickname.innerHTML=ns.tuneHtml(this.member.name);this.nickname.setAttribute('href',ns.gateway('url_mixi_prefix_ssl')+'show_profile.pl?id='+ns.tuneForm(this.member.member_id));}
if(this.control){this.control.addEventListener('click',function(e){this.feedback.remove(function(){ns.Transition(this.element)
.from({opacity:1,transform:ns.CSSTransform.translate(0,0)})
.to({opacity:0,transform:ns.CSSTransform.translate(0,0)})
.callback(function(){this.element.parentNode.removeChild(this.element);this.removeCallback(this.member.member_id);}.bind(this));}.bind(this));}.bind(this));}};}).apply(Klass.prototype);return Klass;})();FeedbackElement.create=function(member,feedback,removeCallback){var FEEDBACK_ELEMENT_BASE_TMPLATE='<li data-nickname-class=".JS_nickname" data-control-ref=".ctrl a"></li>';var FEEDBACK_ELEMENT_LEFT_USER_TMPLATE='<p>退会したユーザー</p>';var FEEDBACK_ELEMENT_ACTIVE_USER_TMPLATE='<p><a href="javascript:void(0);" class="JS_nickname"></a></p>';var FEEDBACK_ELEMENT_DELETE_TMPLATE='<p class="ctrl"><a href="javascript:void(0);">削除する</a></p>';var toElement=function(template){var tmp=document.createElement('div');tmp.innerHTML=template;return tmp.querySelector('*');};var baseElement=toElement(FEEDBACK_ELEMENT_BASE_TMPLATE);var deleteElement=toElement(FEEDBACK_ELEMENT_DELETE_TMPLATE);var userElement;if(!member.name&&member.nickname)member.name=member.nickname
if(member.name&&member.member_id){userElement=toElement(FEEDBACK_ELEMENT_ACTIVE_USER_TMPLATE);}else{userElement=toElement(FEEDBACK_ELEMENT_LEFT_USER_TMPLATE);}
baseElement.appendChild(userElement);if(member.can_delete)baseElement.appendChild(deleteElement);var feedbackElement=new FeedbackElement(baseElement,member,feedback);feedbackElement.removeCallback=removeCallback;return feedbackElement.element;};var Pager=(function(){var Klass=function(options){this.contents=options.contents;this.perPage=options.perPage;this.currentPage=options.startPage;this.currentNumber=0;this.initialize();};(function(){this.initialize=function(){};this.current=function(){var startIndex=this.perPage*this.currentPage;var endIndex=(this.perPage*(this.currentPage+1))-1;return{startIndex:startIndex,endIndex:endIndex}}
this.prev=function(){throw("mock method");}
this.next=function(){var range=this.current();this.currentPage++;return range;}}).apply(Klass.prototype);return Klass;})();var FeedbackMemberList=(function(){var START_PAGE=0;var ENTRY_ROW_NUMBER=20;var Klass=function(windowManager,feedbackObject,feedbackParam,memberCallback,removeCallback){this.windowManager=windowManager;this.element=windowManager.getCurrentElement();this.datasets=$D(this.element);this.feedbackObject=feedbackObject;this.feedbackParam=feedbackParam;this.list=[];this.memberCallback=memberCallback||function(){};this.removeCallback=removeCallback||function(){};this.container=this.element.querySelector(this.datasets.containerClass||undefined);this.loading=this.element.querySelector(this.datasets.loadingClass||undefined);this.more=this.element.querySelector(this.datasets.moreClass||undefined);this.close=this.element.querySelector(this.datasets.closeClass||undefined);this.initialize();};(function(){this.initialize=function(){this.more.addEventListener('click',function(){this.expand();}.bind(this));this.close.addEventListener('click',function(){this.element.style.height="700px";this.windowManager.close(function(){});}.bind(this));};this.open=function(){this.element.style.height="";this.loading.show();this.memberCallback(function(memberList){this.loading.hide();this.more.show();this.list=[];this.container.innerHTML='';memberList.forEach(function(member){var feedbackParam={};for(var i in this.feedbackParam)feedbackParam[i]=this.feedbackParam[i];feedbackParam.feedback_member_id=member.member_id;var feedback=new this.feedbackObject(feedbackParam);var element=FeedbackElement.create(member,feedback,this.removeCallback);element.hide();this.list.push(element);this.container.appendChild(element);}.bind(this));this.pager=new Pager({startPage:START_PAGE,perPage:ENTRY_ROW_NUMBER});this.expand();}.bind(this));};this.expand=function(){var range=this.pager.next();var lastIndex=this.list.length-1;for(var i=range.startIndex;i<=range.endIndex;i++){if(this.list[i]){this.list[i].show();}
if(i>=lastIndex){return this.finishExpand();}}};this.finishExpand=function(){this.more.hide();this.loading.hide();};}).apply(Klass.prototype);return Klass;})();var createFeedbackObjectClassFromModel=function(serviceName){var FeedbackModelAdapter=ns.defineClass({initialize:function(param){this.param=param;this.model=ns.createFeedbackModel(serviceName,{owner_id:param.owner_id,id:param.id});},remove:function(callback){this.model.notify('delete')
.subscribe(callback,{owner_id:this.param.owner_id,id:this.param.id,feedback_member_id:this.param.feedback_member_id,device:'touch'});}});return FeedbackModelAdapter;};ns.provide({FeedbackMemberList:FeedbackMemberList,createFeedbackObjectClassFromModel:createFeedbackObjectClassFromModel,});});Namespace('jp.mixi.ui.friendselector')
.use('jp.co.mixi.helper Pager')
.use('jp.mixi.ui MemberList')
.use('jp.mixi.ui GroupList')
.define(function(ns){var FriendSelector=(function(){var searchParentTag=function(tag,element){return(!element)?undefined:(element.tagName==tag)?element:arguments.callee(tag,element.parentNode);};var Klass=function(windowManager,defaultIdList,useSelected,groupVisibilityFiliter,MemberListModel,maxFriend){this.windowManager=windowManager;this.defaultIdList=(defaultIdList&&defaultIdList.length!=0)?defaultIdList.slice(0):[];this.areaElement=this.windowManager.getCurrentElement();this.moreLink=this.areaElement.querySelector('#moreLink');this.loadingLink=this.areaElement.querySelector('#loadingLink');this.groupSelect=this.areaElement.querySelector('#groupSelect');this.stateElement=this.areaElement.querySelector('#state');this.memberListTable=this.areaElement.querySelector('#memberList');this.submitButton=this.areaElement.querySelector('#fixedButton');this.useSelected=useSelected;if(MemberListModel){this.memberList=new MemberListModel(this.memberListTable,this.defaultIdList);}else{this.memberList=new ns.MemberList(this.memberListTable,this.defaultIdList);}
this.memberList.setEvents({onAnimated:this.hideLoading.bind(this),onMemberSelected:this.onMemberSelected.bind(this)});this.selectedMemberList=[];this.selectLimit=maxFriend!==void(0)?maxFriend:parseInt($D(this.memberListTable).selectLimit)||1000;this.updateSelectedCount();this.toggleElement();this.groupList=new ns.GroupList(this.groupSelect,useSelected,groupVisibilityFiliter);this.events={"more":this.onMore.bind(this),"change":this.onGroupChanged.bind(this)};this.perPage=30;this.callbacks=[];};(function(){this.setSelectedMember=function(idList){this.memberList.forEach(function(id){this.friends.forEach(function(friend){friend.selected=(friend.member_id==id)?true:false;}.bind(this));}.bind(this));};this.setDefaultIdList=function(){this.defaultIdList.forEach(function(id){var friend=this.model.getFriendById([id])[0];if(friend&&(friend.can_select===undefined||friend.can_select)){friend.selected=true;this.selectedMemberList.push(id);}}.bind(this));};this.open=function(callback){this.showLoading();this.model.load(function(){if(this.model.status.error===null||this.model.status.error===0||this.model.status.error==="0"){this.setDefaultIdList();this.updateSelectedCount();this.toggleElement();if(this.selectedMemberList.length&&this.useSelected){this.selectedGroup('selected');}
this.setGroupList();var friends=this.getGroupFriends();this.pager=new ns.Pager(friends.length,this.perPage,1);this.setMemberListPage(1);}else{this.loadingLink.hide();this.memberList.addNothing();}
if(callback&&typeof callback=='function'){callback();}}.bind(this));};this.addEventListener=function(eventName,listener){if(!this.callbacks[eventName])this.callbacks[eventName]=[];this.callbacks[eventName].push(listener);};this.fire=function(eventName){(this.callbacks[eventName]||[]).forEach(function(callback){callback();});};this.close=function(){this.showLoading();this.detach();this.selectedMemberList=[];this.groupList.reset();this.memberList.reset();this.updateSelectedCount();};this.attach=function(){this.moreLink.addEventListener('click',this.events.more,false);this.groupSelect.addEventListener('change',this.events.change,false);};this.detach=function(){this.moreLink.removeEventListener('click',this.events.more,false);this.groupSelect.removeEventListener('change',this.events.change,false);};this.onMore=function(){this.showLoading();this.setMemberListPage(this.pager.nextPage());};this.onGroupChanged=function(){this.showLoading();this.groupList.refreshSelectedGroup();var friends=this.getGroupFriends();this.pager=new ns.Pager(friends.length,this.perPage,1);this.setMemberListPage(1);};this.isMemberSelected=function(memberId){return this.selectedMemberList.some(function(selected){return(selected==memberId);});};this.isSelectLimit=function(){return(this.selectedMemberList.length>=this.selectLimit)?true:false;};this.onMemberSelected=function(event){var element=searchParentTag('TD',event.target);if(element){var newId=element.getAttribute("data-member-id");this.toggle(newId);if(this.error){this.error.hide("errorEmptySelect");}
this.updateSelectedCount();this.toggleElement();}};this.select=function(newId){if(!this.isSelectLimit()){this.memberList.select(newId);this.model.getFriendById([newId])[0].selected=true;this.selectedMemberList.push(newId);this.fire('selected');}};this.unselect=function(newId){this.memberList.unselect(newId);this.model.getFriendById([newId])[0].selected=false;this.selectedMemberList=this.selectedMemberList.filter(function(member){return(member!=newId);});};this.toggle=function(newId){if(!this.isMemberSelected(newId)){this.select(newId);}
else{this.unselect(newId);}};this.updateSelectedCount=function(){if(this.stateElement){this.stateElement.innerHTML="残り "+this.selectedMemberList.length+"/"+this.selectLimit+"人";}};this.toggleElement=function(element){var stateElement=this.stateElement;var submitButton=this.submitButton;if(this.selectedMemberList.length>this.selectLimit){$j(stateElement).addClass("isLimit");$j(submitButton).attr("disabled","disabled");}else{$j(stateElement).removeClass("isLimit");$j(submitButton).removeAttr("disabled");}};this.setMemberListPage=function(page){if(!page){return;}
var friends=this.getGroupFriends();var pager=this.pager;pager.currentPage(page);if(this.windowManager.forceDisplayCurrentOpenWindow){this.windowManager.forceDisplayCurrentOpenWindow();}
if(pager.currentPage()==pager.firstPage()){this.memberList.set(friends.slice(pager.skipped(),pager.last()));}
else{this.memberList.add(friends.slice(pager.skipped(),pager.last()));}};this.getGroupFriends=function(){var group=this.groupList.selectedGroup();return(group=='selected')?this.model.getFriendById(this.selectedFriend()):this.model.getGroupFriends(group);}
this.getFriendById=function(ids){return this.model.getFriendById(ids);}
this.setGroupList=function(){this.groupList.set(this.model.getGroups());}
this.setError=function(error){this.error=error;};this.source=function(model,options){this.model=new model(options);};this.selectedGroup=function(newGroup){return this.groupList.selectedGroup(newGroup);};this.selectedFriendDetails=function(){var selectedFriendIds=this.selectedFriend();return this.model.getFriendById(selectedFriendIds);};this.selectedFriend=function(){var sortedSelectedMemberList=[];var sortedFriendList=this.model.getFriends();for(var i=0;i<sortedFriendList.length;i++){for(var j=0;j<this.selectedMemberList.length;j++){if(sortedFriendList[i].member_id==this.selectedMemberList[j]){sortedSelectedMemberList.push(this.selectedMemberList[j]);break;}}}
this.selectedMemberList=sortedSelectedMemberList;return this.selectedMemberList;};this.showLoading=function(){this.moreLink.hide();this.loadingLink.show();};this.hideLoading=function(){window.setTimeout(function(){this.loadingLink.hide();if(!this.pager.nextPage()){this.moreLink.hide();}
else{this.moreLink.show();}}.bind(this),500);};}).apply(Klass.prototype);return Klass;})();ns.provide({FriendSelector:FriendSelector,});});Namespace('jp.mixi.ui.grouplist')
.define(function(ns){var GroupList=(function(){var Klass=function(element,enableReselect,visibilityFiliter){this.groupSelect=element;if(enableReselect===undefined)enableReselect=true;this.enableReselect=enableReselect;this.groupOptions=$A(this.groupSelect.querySelectorAll('option'));this.visibilityFiliter=visibilityFiliter||function(groups){return groups};};(function(){this.attach=function(){};this._renderGroups=function(groups){var _self=this;var visibleGroups=_self.visibilityFiliter(groups);visibleGroups.forEach(function(group){_self.groupSelect.add(_self.createOption(group));});};this.set=function(groups){this.reset();var all=groups.filter(function(group){return(group.tag_id&&group.tag_id=="all");})[0];var buddy=groups.filter(function(group){return(group.tag_id&&group.tag_id=="buddy");})[0];this._renderGroups([all,buddy]);var restrictedGroups=groups.filter(function(group){return(group.tag_id&&group.tag_id!=="all"&&group.tag_id!=="buddy");});if(this.enableReselect){this.groupSelect.add(this.createOption({tag_id:"selected",name:"選択済み"}));}
var isExistVisibleGroup=this.visibilityFiliter(restrictedGroups).length?true:false;if(isExistVisibleGroup){var optionGroup=document.createElement('optgroup');optionGroup.label='一部の友人まで';this.groupSelect.appendChild(optionGroup);this._renderGroups(restrictedGroups);}
this.groupOptions=$A(this.groupSelect.querySelectorAll('option'));};this.createOption=function(group){var memberCount=(group.member_count!==undefined)?"("+group.member_count+")":"";var option=document.createElement('option');option.value=group.tag_id;if(group.tag_id==this.selectedGroup()){option.selected=true;}
option.text=group.name+memberCount;return option;};this.reset=function(){if(!this.groupOptions){return;}
this.groupOptions.forEach(_.bind(function(option){this.groupSelect.remove(0);},this));var optionGroup=this.groupSelect.querySelector('optgroup');if(optionGroup){this.groupSelect.removeChild(optionGroup);}};this.selectedGroup=function(newGroup){if(newGroup){this._selectedGroup=newGroup;this.groupOptions.forEach(function(group){if(group.value==newGroup){group.selected=true;}
else{group.selected=false;}});}
return this._selectedGroup;};this.refreshSelectedGroup=function(){this.selectedGroup(this.groupOptions[this.groupSelect.selectedIndex||0].value);}}).apply(Klass.prototype);return Klass;})();ns.provide({GroupList:GroupList});});Namespace('jp.mixi.ui.memberlist')
.use('jp.co.mixi.animation *')
.use('jp.co.mixi.helper Pager')
.use('jp.co.mixi.lang.string tuneHtml')
.define(function(ns){var MemberList=(function(){var Klass=function(element){this.memberListTable=element;this.datasets=$D(element);this.nothing=$$0(this.datasets.nothingRef);this.rowCount=3;this.cellHeight=110;this.memberMap={};this.events={onAnimated:function(){},onMemberSelected:function(){},};};(function(){this.set=function(members){this.resetViewAnimation(function(){this.add(members);}.bind(this));};this.add=function(members){if(members.length==0){this.addNothing();return this.events.onAnimated.call();}
var pager=new ns.Pager(members.length,this.rowCount,1);var next=pager.nextPage();var oldHeight=this.memberListTable.parentNode.offsetHeight;var newHeight=oldHeight;oldHeight+='px';do{var tr=document.createElement('tr');for(var i=0;i<pager.perPage();i++){if(i>pager.countOnCurrentPage()-1){tr.appendChild(this.createRow());}
else{var td=this.createRow(members[pager.skipped()+i]);tr.appendChild(td);}}
this.memberListTable.appendChild(tr);this.memberListTable.parentNode.style.height=oldHeight;newHeight+=tr.offsetHeight;next=pager.nextPage();pager.currentPage(next);}while(next);newHeight+='px';window.setTimeout(this.moreAnimation.bind(this,oldHeight,newHeight),50);};this.moreAnimation=function(oldHeight,newHeight){ns.Transition(this.memberListTable.parentNode,{duration:400})
.to({height:newHeight,})
.callback(this.events.onAnimated);}
this.addNothing=function(){this.nothing.show();};this.createRow=function(member){if(!member){var td=document.createElement('td');td.appendChild(document.createTextNode(" "));return td;}
var td=document.createElement('td');td.style.height=this.cellHeight+"px";td.setAttribute("data-member-id",member.member_id);td.appendChild(this.createCell(member));if(member.msg_state!==undefined){var p=document.createElement('p');p.className="state";p.appendChild(document.createTextNode(member.msg_state));td.appendChild(p);}
if(member.can_select===false){td.className="invalid";}
else{if(member.selected){td.className="selected";}
td.addEventListener('click',this.events.onMemberSelected,false);}
this.memberMap[member.member_id]=td;return td;};this.createCell=function(member){var nickname=member.nickname+"("+member.member_count+")";var element;if(member.can_select){element=document.createElement('a');element.setAttribute('href','javascript:void(0)');}
else{element=document.createElement('p');}
var spanimg=document.createElement('span');spanimg.className="image";var img=document.createElement('img');img.setAttribute("alt",nickname);img.setAttribute("src",member.photo);spanimg.appendChild(img);element.appendChild(spanimg);var span=document.createElement('span');span.className="name";span.innerHTML=ns.tuneHtml(nickname);element.appendChild(span);return element;};this.reset=function(){this.resetView();};this.resetViewAnimation=function(callback){if($A(this.memberListTable.querySelectorAll("tr")).length){ns.Transition(this.memberListTable.parentNode,{duration:400})
.to({height:"0px",})
.callback(function(){this.resetView();callback();}.bind(this));}
else{this.resetView();callback();}};this.resetView=function(){var trList=$A(this.memberListTable.querySelectorAll("tr"));for(var i=0;i<trList.length;i++){this.memberListTable.deleteRow(0);}
this.memberListTable.parentNode.style.height="0px";this.nothing.hide();};this.onMemberSelected=function(event){if(this.isSelected)return;var element=this.searchParentTag('TD',event.target);if(element){var newId=element.getAttribute("data-member-id");this.toggle(newId);}};this.searchParentTag=function(tag,element){return(!element)?undefined:(element.tagName==tag)?element:arguments.callee(tag,element.parentNode);};this.isMemberSelected=function(memberId){return this.selectedMemberList.some(function(selected){return(selected==memberId);});};this.select=function(newId){this.memberMap[newId].className="selected";};this.unselect=function(newId){this.memberMap[newId].removeAttribute("class");};this.setEvents=function(events){this.events=events;};}).apply(Klass.prototype);return Klass;})();ns.provide({MemberList:MemberList});});Namespace('jp.mixi.ui.popup')
.use('jp.co.mixi.ui.slideupwindow *')
.define(function(ns){var SimplePopup=(function(){var Klass=function(id,callback,popupWindowManager){this.id=id;this.callback=callback;this.areaElement=document.getElementById(this.id);this.dataset=$D(this.areaElement);this.closeButton=$A(this.areaElement.querySelectorAll('.simplePopupCloseButton'));this.fixedButton=$A(this.areaElement.querySelectorAll('.simplePopupFixedButton'));this.popupWindowManager=popupWindowManager?popupWindowManager:ns.SlideupWindowManager;this.events={close:this.onClose.bind(this),fixed:this.onFixed.bind(this),};};(function(){this.open=function(callback){this.popupWindowManager.open(this.id,function(windowManager){this.windowManager=windowManager;this.attach();if(callback&&typeof callback=='function'){callback();}}.bind(this));};this.close=function(flag){this.popupWindowManager.close(function(){this.callback(flag);this.detach();}.bind(this));};this.attach=function(){if(this.closeButton){this.closeButton.forEach(function(button){button.addEventListener('click',this.events.close,false)}.bind(this));}
if(this.fixedButton){this.fixedButton.forEach(function(button){button.addEventListener('click',this.events.fixed,false)}.bind(this));}};this.detach=function(){if(this.closeButton){this.closeButton.forEach(function(button){button.removeEventListener('click',this.events.close,false)}.bind(this));}
if(this.fixedButton){this.fixedButton.forEach(function(button){button.removeEventListener('click',this.events.fixed,false)}.bind(this));}};this.onClose=function(){this.close(false);};this.onFixed=function(){this.close(true);};}).apply(Klass.prototype);return Klass;})();ns.provide({SimplePopup:SimplePopup});});Namespace('jp.mixi.ui.readmore')
.use('brook.util through')
.use('brook.widget bindAllWidget')
.use('jp.co.mixi.lang.class defineClass')
.use('jp.co.mixi.ui.template getTemplateByElementId')
.use('jp.mixi.model.rpc.factory createRPCPromiseByLoginStatus')
.define(function(ns){'use strict';var ReadMoreUI=ns.defineClass({initialize:function(args){this.methodName=args.methodName;this.entryListKey=args.entryListKey;this.templateId=args.templateId;this.jContentContainer=args.jContentContainer;this.baseElementForScroll;this.scrollPosition;this._setPublicPromises();},_setPublicPromises:function(){this.readMore=ns.createRPCPromiseByLoginStatus(this.methodName);this.appendEntries=ns.through(_.bind(this._appendEntries,this));this.prependEntries=ns.through(_.bind(this._prependEntries,this));this.restoreScrollPosition=ns.through(_.bind(this._restoreScrollPosition,this));},_appendEntries:function(v){var result=v.response.result;if(!result)return;var html=_
.map(result[this.entryListKey],_.bind(this._getHTMLForEntry,this))
.join("");this.jContentContainer.append(html);ns.bindAllWidget.run();},_prependEntries:function(v){var result=v.response.result;if(!result)return;if(this.jContentContainer.children().length){this.baseElementForScroll=this.jContentContainer.children().eq(0);this.relativePosition=$j(window).scrollTop()-this.baseElementForScroll.offset().top;}
var html=_
.map(result[this.entryListKey],_.bind(this._getHTMLForEntry,this))
.join("");this.jContentContainer.prepend(html);ns.bindAllWidget.run();},_restoreScrollPosition:function(v){if(this.baseElementForScroll){window.scroll(0,this.baseElementForScroll.offset().top+this.relativePosition);this.baseElementForScroll=null;}},_getHTMLForEntry:function(param){var template=ns.getTemplateByElementId(this.templateId);template.param(param);return template.output();}});ns.provide({createReadMoreUI:function(args){return new ReadMoreUI(args);}});});