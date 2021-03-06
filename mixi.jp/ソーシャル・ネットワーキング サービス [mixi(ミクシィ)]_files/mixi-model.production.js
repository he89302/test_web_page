Namespace('jp.mixi.model.application.interactivebanner')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){'use strict';var PROCEDURE_PREFIX='jp.mixi.application.interactivebanner.'
var model;ns.provide({createInteractiveBannerModel:function(){if(!model){model=ns.createModel({'find':ns.promise().bind(ns.createRPCPromise(_.sprintf('%s%s',PROCEDURE_PREFIX,'find')),ns.whenExpiredSessionToReload)});}
return model;}});})
Namespace('jp.mixi.model.community.bbs.comment')
.use('brook promise')
.use('brook.util cond')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc JSONPRC')
.define(function(ns){var createComment=ns.promise()
.bind(ns.getRPCPromiseCreator('jp.mixi.community.bbs.comment.create'))
.bind(ns.whenExpiredSessionToReload);var model=ns.createModel({'create':createComment});ns.provide({getBBSCommentModel:function(){return model;}});});Namespace('jp.mixi.model.fan.member')
.use('brook promise')
.use('brook.model createModel')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.model.utils whenExpiredSessionToReload')
.define(function(ns){var postKey=ns.gateway('rpc_post_key');var rpc=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:postKey,internal_encoding:'utf8'});var subscribedEntriesRequest=rpc.createRPCPromise('jp.mixi.fan.member.subscribed.getSubscribedEntries');var createMemberRequest=rpc.createRPCPromise('jp.mixi.fan.member.follower.create');var deleteMemberRequest=rpc.createRPCPromise('jp.mixi.fan.member.follower.delete');var subscribeFeedRequest=rpc.createRPCPromise('jp.mixi.fan.member.subscribed.enable');var unsubscribeFeedRequest=rpc.createRPCPromise('jp.mixi.fan.member.subscribed.disable');var models={};var getSubscribedEntriesModel=function(memberId){var key=memberId;if(models[key]){return models[key];}
var model=ns.createModel();model.addMethod('getSubscribedEntries',ns.promise()
.bind(subscribedEntriesRequest)
.bind(ns.whenExpiredSessionToReload));models[key]=model;return model;}
var getMemberModel=function(memberId,pageId,from,via){var key=memberId+':'+pageId;if(!via)via='pc';if(!from)from='';if(models[key]){return models[key];}
var model=ns.createModel();var request={member_id:memberId,page_id:pageId,via:via,from:from};var prepareRequestPromise=ns.promise(function(n,val){n(request);});model.addMethod('create',prepareRequestPromise
.bind(createMemberRequest));model.addMethod('delete',prepareRequestPromise
.bind(deleteMemberRequest));model.addMethod('subscribe',prepareRequestPromise
.bind(subscribeFeedRequest));model.addMethod('unsubscribe',prepareRequestPromise
.bind(unsubscribeFeedRequest));models[key]=model;return model;};ns.provide({getMemberModel:getMemberModel,getSubscribedEntriesModel:getSubscribedEntriesModel});});Namespace('jp.mixi.model.footprints.creator')
.use('brook promise')
.use('jp.co.mixi.lang.class defineClass')
.define(function(ns){"use strict";var FootPrintsCreator=ns.defineClass({initialize:function(rpcClient){this.rpc=rpcClient;},isValidCreateRequest:function(params){return params.target_member_id&&params.source_id;},buildRequestParams:function(requestPromise,params){if(params&&!this.isValidCreateRequest(params))return false;var requestParams={target_member_id:params.target_member_id,source:{source_id:params.source_id,source_resource_id:params.source_resource_id},destination:{destination_id:0,destination_resource_id:params.destination_resource_id}};return requestPromise(requestParams);},getPromise:function(){return ns.promise()
.bind(_.bind(this.buildRequestParams,this))
.bind(this.rpc.createRPCPromise('jp.mixi.visitor.createFootprints'));}});ns.provide({FootPrintsCreator:FootPrintsCreator});});Namespace('jp.mixi.model.nearby.spot')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var model=ns.createModel({'create':ns.promise().bind(ns.createRPCPromise('jp.mixi.nearby.create'),ns.whenExpiredSessionToReload)});ns.provide({getNearbySpotModel:function(){return model;}});});Namespace('jp.mixi.model.relation.bidirectional')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var model=ns.createModel({'find':ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.bidirectional.find'),ns.whenExpiredSessionToReload)});ns.provide({getBidirectionalModel:function(){return model;}});});Namespace('jp.mixi.model.relation.group')
.use('brook promise')
.use('brook.model createModel')
.use('brook.util cond,through,match,debug')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var cachedResult={};var isSuccess=function(rpcResult){return rpcResult.response.isSuccess();};var setCache=function(method){return ns.through(function(rpcResult){cachedResult[method]=rpcResult;});};var cacheUpdaterOf={'whenCreate':ns.through(function(rpcResult){if(!cachedResult.find){return;}
var created=rpcResult.response.result;var cachedGroups=cachedResult.find.response.result;cachedGroups.push(created);}),'whenUpdate':ns.through(function(rpcResult){if(!cachedResult.find){return;}
var updated=rpcResult.response.result;var cachedGroups=cachedResult.find.response.result;var beforeGroup=_.find(cachedGroups,function(group){return(group.group_id==updated.group_id);});var index=_(cachedGroups).indexOf(beforeGroup);cachedGroups[index]=updated;}),'whenDelete':ns.through(function(rpcResult){if(!cachedResult.find){return;}
var deletedId=rpcResult.request.group_id;var cachedGroups=cachedResult.find.response.result;var deleteGroup=_.find(cachedGroups,function(group){return group.group_id==deletedId;});cachedGroups.splice(_(cachedGroups).indexOf(deleteGroup),1);})};var model=ns.createModel({'create':ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.group.create'),ns.cond(isSuccess,cacheUpdaterOf.whenCreate),ns.whenExpiredSessionToReload),'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.group.lookup'),ns.whenExpiredSessionToReload),'find':ns.promise(function(next,request){if(cachedResult.find){next(cachedResult.find);}else{ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.group.find'),ns.whenExpiredSessionToReload,ns.cond(isSuccess,setCache('find'))).subscribe(next,request);}}),'delete':ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.group.delete'),ns.cond(isSuccess,cacheUpdaterOf.whenDelete),ns.whenExpiredSessionToReload),'update':ns.promise().bind(ns.createRPCPromise('jp.mixi.relation.group.update'),ns.cond(isSuccess,cacheUpdaterOf.whenUpdate),ns.whenExpiredSessionToReload)});ns.provide({getGroupModel:function(){return model;}});});Namespace('jp.mixi.model.rpc.factory')
.use('jp.mixi.model.utils createRPCPromise')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.gateway gateway')
.define(function(ns){'use strict';var createRPCPromiseByLoginStatus=function(methodName){var rpcPromise;if(isPublic()){var publicRPC=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'none'});rpcPromise=publicRPC.createRPCPromise(methodName);}else{rpcPromise=ns.createRPCPromise(methodName);}
return rpcPromise;};function isPublic(){return!(ns.gateway('login_member_id'));}
ns.provide({createRPCPromiseByLoginStatus:createRPCPromiseByLoginStatus});});Namespace('jp.mixi.model.voice.topic.motivator')
.use('brook.util through')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.model.voice createVoiceModel')
.define(function(ns){'use strict';var TOPICS=ns.gateway('motivator_voice_topics')||[];ns.createVoiceModel().method('create').observe(ns.through(function(rpcResponse){_.each(TOPICS,function(topic){if(topic.id==rpcResponse.request.topic_id){topic.is_answered=1;}});}));function __getAll(isShuffled){return isShuffled?_.shuffle(TOPICS):TOPICS;}
function __getUnanswered(isShuffled){return _.filter(__getAll(isShuffled),function(topic){return!topic.is_answered;});}
function __getOne(){var unansweredTopics=__getUnanswered(true);return _.isEmpty(unansweredTopics)?__getAll(true)[0]:unansweredTopics[0];}
ns.provide({getAllTopics:__getAll,getUnansweredTopics:__getUnanswered,getOneTopic:__getOne});});Namespace('jp.mixi.model.voice.latestfeedback')
.use('brook.util from,through')
.use('brook.model createModel')
.use('jp.co.mixi.lang parseIntAsDecimal')
.use('jp.mixi.model.feedback createFeedbackModel')
.define(function(ns){'use strict';var createModel=function(service,param){param.service_type='voice';var latestFeedback={};var feedbackModel=ns.createFeedbackModel(service,param);var model=ns.createModel({'update':ns.through(function(v){})});var callFindByLatest=ns.from(param).bind(feedbackModel.notify('findByLatest'));var updateLatestFeedback=ns.through(function(v){var result=v.response.result;latestFeedback.count=ns.parseIntAsDecimal(result.count);if(latestFeedback.count===0){latestFeedback.isNobody=true;}else{latestFeedback.nickname=result.list[0].user.display_name;latestFeedback.memberId=result.list[0].id;latestFeedback.isNobody=false;}
model.notify('update').run(latestFeedback);});feedbackModel.method('create').observe(callFindByLatest);feedbackModel.method('delete').observe(callFindByLatest);feedbackModel.method('findByLatest').observe(updateLatestFeedback);return model;};ns.provide({createLatestFeedbackModel:createModel});});Namespace('jp.mixi.model.voice.topic')
.use('brook promise')
.use('brook.model createModel')
.use('brook.util cond,through,match,debug')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var lookupCacheOf={};var isSuccess=function(rpcResult){return rpcResult.response.isSuccess();};var setLookupCache=ns.through(function(rpcResult){var id=rpcResult.response.result.topic.id;lookupCacheOf[id]=rpcResult;});var model=ns.createModel({'lookup':ns.promise(function(next,request){var id=request.id;if(lookupCacheOf[id]){next(lookupCacheOf[id]);}else{ns.promise().bind(ns.createRPCPromise('jp.mixi.voice.topic.lookup'),ns.cond(isSuccess,setLookupCache),ns.whenExpiredSessionToReload).subscribe(next,request);}})});ns.provide({getVoiceTopicModel:function(){return model;},createPostFormUrl:function(topicId,ownerId){return'home.pl#!/post/voice/topic_id:'+topicId+'/from_feed_of:'+ownerId;},createVoiceTopicBody:function(body,topicId){return body+' http://mixi.jp/view_voice_topic.pl?topic_id='+topicId;},VOICE_VIA_TOPIC:ns.gateway('voice_topic_via'),getTopicIdFromBody:function(body){var match=/(?:https?:)?\/\/mixi\.jp\/view_voice_topic\.pl\?topic_id=(\d+)$/.exec(body);return match?match[1]:'';},});});Namespace('jp.mixi.model.album')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var model=ns.createModel({'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.album.lookup'),ns.whenExpiredSessionToReload),'pc.widget.photoview.lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.album.lookup'),ns.whenExpiredSessionToReload),'touch.widget.photoview.lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.album.lookup'),ns.whenExpiredSessionToReload),'find':ns.promise().bind(ns.createRPCPromise('jp.mixi.album.find'),ns.whenExpiredSessionToReload),'gettitle':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.getAlbumTitle'),ns.whenExpiredSessionToReload),'getentrytitle':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.getEntryAlbumTitle'),ns.whenExpiredSessionToReload)});ns.provide({createAlbumModel:function(){return model;}});});Namespace("jp.mixi.model.comment")
.use('brook promise')
.use('brook.util cond, ifelse')
.use('brook.model createModel')
.use('jp.mixi.model.utils appendViewerId,changeParamsFormatForFileInputs,createRPCPromise,createFormGatewayRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var createKey=function(param){return param.owner_id+"."+param.id;};var isAttachedPhotoInRequest=function(v){return v.fileInputs?true:false;};var isAttachedPhotoInResponse=function(v){var result=v.response.result;if(!result)return false;var images=result.info.images;if(!images)return false;return images.length?true:false;};var models={};var createModel=function(service,param){if(param&&models[service+"."+createKey(param)]){return models[service+"."+createKey(param)];}
var model=ns.createModel({'create':ns.promise().bind(ns.appendViewerId,ns.cond(isAttachedPhotoInRequest,ns.changeParamsFormatForFileInputs),ns.ifelse(isAttachedPhotoInRequest,ns.createFormGatewayRPCPromise('jp.mixi.'+service+'.comment.create'),ns.createRPCPromise('jp.mixi.'+service+'.comment.create')),ns.whenExpiredSessionToReload),'delete':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.comment.delete'),ns.whenExpiredSessionToReload),'find':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.comment.find'),ns.whenExpiredSessionToReload),'willAttachPhoto':ns.promise(),'attachPhoto':ns.promise(),'detachPhoto':ns.promise()});models[service+"."+createKey(param)]=model;return model;};var deleteModel=function(service,param){if(param&&models[service+"."+createKey(param)]){models[service+"."+createKey(param)]=null;}};var getCommentModel=function(service,param){if(param&&models[service+"."+createKey(param)]){return models[service+"."+createKey(param)];}else{return null;}};ns.provide({createCommentModel:createModel,deleteCommentModel:deleteModel,getCommentModel:getCommentModel,isAttachedPhotoInResponse:isAttachedPhotoInResponse});});Namespace('jp.mixi.model.diary')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var createPreviewParams=ns.promise(function(next,params){next({level:params.level,allow_id_list:params.allow_id_list,body:params.body});});var model=ns.createModel({'create':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.diary.create'),ns.whenExpiredSessionToReload),'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.diary.lookup'),ns.whenExpiredSessionToReload),'preview':ns.promise().bind(createPreviewParams,ns.createRPCPromise('jp.mixi.diary.preview'),ns.whenExpiredSessionToReload)});ns.provide({createDiaryModel:function(){return model;}});});Namespace('jp.mixi.model.easyshare')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var model=ns.createModel({'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.easyshare.lookup'),ns.whenExpiredSessionToReload)});ns.provide({createEasyshareModel:function(){return model;}});});Namespace("jp.mixi.model.feedback")
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var createKey=function(param){if(param.comment_member_id&&param.comment_post_time){return param.comment_member_id+"."+param.comment_post_time;}else{return param.owner_id+"."+param.id;}};var setParam=function(param){return ns.promise(function(next,value){if(!value||!(function(object){for(var o in object){return true;}
return false;})(value))return next(param);return next(value);});};var setFindLimit=ns.promise(function(next,value){value.limit=1;value.offset=0;next(value);});var models={};var createModel=function(service,param){if(models[service+"."+createKey(param)]){return models[service+"."+createKey(param)];}
var model=ns.createModel({'create':ns.promise().bind(setParam(param),ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.feedback.create'),ns.whenExpiredSessionToReload),'delete':ns.promise().bind(setParam(param),ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.feedback.delete'),ns.whenExpiredSessionToReload),'find':ns.promise().bind(setParam(param),ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.feedback.find'),ns.whenExpiredSessionToReload),'findByLatest':ns.promise().bind(setParam(param),setFindLimit,ns.appendViewerId,ns.createRPCPromise('jp.mixi.'+service+'.feedback.find'),ns.whenExpiredSessionToReload)});models[service+"."+createKey(param)]=model;return model;};var deleteModel=function(service,param){if(param&&models[service+"."+createKey(param)]){models[service+"."+createKey(param)]=null;}};ns.provide({createFeedbackModel:createModel,deleteFeedbackModel:deleteModel});});Namespace('jp.mixi.model.footprints')
.use('brook.model createModel')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.gateway gateway')
.use('jp.mixi.model.footprints.creator FootPrintsCreator')
.define(function(ns){"use strict";var POST_KEY=ns.gateway('rpc_post_key');var MEMBER_ID=ns.gateway('login_member_id');var rpcClient=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:POST_KEY});var model=ns.createModel({create:(new ns.FootPrintsCreator(rpcClient)).getPromise()});ns.provide({FootPrintsModel:model});});Namespace('jp.mixi.model.groupmodel')
.use('jp.co.mixi.net HTTPRequester')
.use('jp.co.mixi.lang.class *')
.define(function(ns){var HTTPRequester=ns.HTTPRequester;var TYPE={FOR_DIARY:0,FOR_INVITE_APPLICATION:1};var FriendGroupModel=(function(){var Klass=function(optParams){this.endPoint="/system/ajax_friend_setting.pl";this.postKey=Mixi.Gateway.getParam('ajax_post_key');if(!this.postKey){this.postKey=document.querySelector('[name=ajax_post_key]').value;}
this.appId=Mixi.Gateway.getParam("app_id");this.type=(this.appId)?TYPE.FOR_INVITE_APPLICATION:TYPE.FOR_DIARY;this.groupRequest={mode:"get_tags",post_key:this.postKey};if(Mixi.Gateway.getParam("is_mobage_game")){this.endPoint='/system/game/mobage/ajax_friends.pl';this.groupRequest.app_id=this.appId;}
this.friendRequest={mode:"get_friends",type:"friend_selector",sort:"nickname",post_key:this.postKey};this.target_friends=[];if(this.type==TYPE.FOR_INVITE_APPLICATION){this.friendRequest.app_id=this.appId;this.friendRequest.mode="get_friends_appli_invite";this.friendRequest.filter='notJoinedOnly';if(optParams){if(optParams.filterType){this.friendRequest.filter=optParams.filterType;}
if(optParams.targetUsers&&optParams.targetUsers.fields_){this.target_friends=optParams.targetUsers.fields_.userId;}
if(optParams.sortKey){this.friendRequest.sort=optParams.sortKey;}}}
this.isLoaded=false;this.friends=[];this.friends_has_app=[];this.friends_official=[];this.groups=[];this.has_friend=false;this._map=undefined;};(function(){this.getGroupFriends=function(group){return this.getGroupFriendMap()[group];};this.getGroupFriendMap=function(){if(this._map){return this._map;}
var map={};this.groups.forEach(function(group){map[group.tag_id]=[];});this.friends.forEach(function(friend){if(friend.tag_ids){friend.tag_ids.forEach(function(tagId){map[tagId].push(friend);});}
map.all.push(friend);if(friend.buddy=='1'){map.buddy.push(friend);}}.bind(this));this._map=map;return this._map;};this.getFriendById=function(ids){if(typeof ids=='undefined'||!ids.length){return[];}
var friendMap=this.getFriendMap();return ids.map(function(id){return friendMap[id];})||[];};this.getFriendByUid=function(ids){var friendMap;if(typeof ids=='undefined'||!ids.length){return[];}
friendMap=this.getFriendUidMap();return ids.map(function(id){return friendMap[id];})||[];};this.getFriendMap=function(){var friendMap={};this.friends.forEach(function(friend){friendMap[friend.member_id]=friend;});return friendMap;};this.getFriendUidMap=function(){var friendMap={};this.friends.forEach(function(friend){friendMap[friend.user_id]=friend;});return friendMap;};this.refresh=function(callback){this.isLoaded=false;if(callback&&typeof callback=='function'){this.load(callback);}};this.load=function(callback){if(this.isLoaded){this.loaded(callback);}
this.friends=[];this.friends_official=[];this.friends_has_app=[];this.groups=[];this.friends_hidden=[];var responseCount=0;var responseTotal=2;var connectionError={"error":1,"message":"通信エラー"};(new HTTPRequester()).request({method:HTTPRequester.POST,url:this.endPoint,asynchronous:true,paramPOST:this.friendRequest,otherRequestHeaders:null},function(response){try{var parsedResponse=JSON.parse(response.getRawString());this.status=parsedResponse.status;if(this.status.error==='0'){this.friends=parsedResponse.result.friends;if(this.type==TYPE.FOR_INVITE_APPLICATION){this.friends_has_app=parsedResponse.result.friends_has_app;this.friends_hidden=parsedResponse.result.friends_official;this.friends_hidden=this.friends_hidden.concat(parsedResponse.result.friends_blocked);}}}catch(e){this.status=connectionError;}
responseCount++;if(responseCount==responseTotal){this.loaded(callback);}}.bind(this));(new HTTPRequester()).request({method:HTTPRequester.POST,url:this.endPoint,asynchronous:true,paramPOST:this.groupRequest,otherRequestHeaders:null},function(response){try{var parsedResponse=JSON.parse(response.getRawString());this.groups=parsedResponse.result;this.groups=this.groups.filter(function(group){return(group.tag_id&&group.tag_id!=="unclassified");});}catch(e){this.status=connectionError;}
this.tags=this.groups.filter(function(group){return(group.tag_id&&group.tag_id!=="all"&&group.tag_id!=="unclassified"&&group.tag_id!=="buddy");});responseCount++;if(responseCount==responseTotal){this.loaded(callback);}}.bind(this));};this.mergeFriendsParam=function(){var filter=this.friendRequest.filter;this.friends.forEach(function(friend){var has_app=!this.friends_has_app.every(function(friend_id){return(friend.member_id==friend_id)?false:true;}.bind(this));if(filter==='joinedOnly'&&!has_app){friend.can_select=false;friend.msg_state='※アプリ未登録';}
else if(filter==='notJoinedOnly'&&has_app){friend.can_select=false;friend.msg_state='※すでに利用中';}
else{friend.can_select=true;}}.bind(this));};this.loaded=function(callback){this.isLoaded=true;this.has_friend=false;this.has_error=this.status.error!=='0'?true:false;if(this.type==TYPE.FOR_INVITE_APPLICATION){this.mergeFriendsParam();this.filterHiddenMember();}
if(this.friends.length){this.preLoading();this.has_friend=true;}
if(callback&&typeof callback=='function'){callback();}};this.preLoading=function(){this.friends.forEach(function(member){var img=document.createElement('img');img.src=member.photo;});};this.filterHiddenMember=function(){var friendsMapOfId={},friendsMapOfUid={},groupsMap={},filterMember;this.friends.forEach(function(friend){friendsMapOfId[friend.member_id]=friend;friendsMapOfUid[friend.user_id]=friend;});this.groups.forEach(function(group){groupsMap[group.tag_id]=group;});filterMember=function(friendId,friendsMap,comparer){groupsMap.all.member_count--;var member=friendsMap[friendId];if(member.buddy&&member.buddy=="1"){groupsMap.buddy.member_count--;}
if(member.tag_ids){member.tag_ids.forEach(function(tag_id){groupsMap[tag_id].member_count--;}.bind(this));}
this.friends=this.friends.filter(function(friend){return comparer(friendId,friend);}.bind(this));}.bind(this);this.friends_hidden.forEach(function(friendId){filterMember(friendId,friendsMapOfId,function(friendId,friend){return friendId!=friend.member_id;});});this.has_friend=this.friends.length?true:false;if(this.target_friends.length){this.friends.forEach(function(friend){if(!friend.can_select||this.target_friends.indexOf(friend.user_id)==-1){filterMember(friend.user_id,friendsMapOfUid,function(friendId,friend){return friendId!=friend.user_id;});}}.bind(this));}};this.getFriends=function(){return this.friends;};this.getGroups=function(){return this.groups;};this.getTags=function(){return this.tags;};}).apply(Klass.prototype);return Klass;})();var SimplifiedFriendGroupModel=(function(){var Klass=function(optParams){this.superClass(optParams);this.optParams=optParams;if(!this.optParams){return;}
var that=this;_.each(this.optParams,function(value,key){switch(key){case'friendRequest':that.friendRequest=value;that.friendRequest.post_key=that.postKey;break;case'ajaxUrl':that.endPoint=value;break;}});};ns.inherit(Klass,FriendGroupModel);(function(){this.loaded=function(callback){this.isLoaded=true;this.has_friend=false;if(this.optParams&&this.optParams.onFriendListLoaded&&typeof this.optParams.onFriendListLoaded=='function'){this.optParams.onFriendListLoaded(this.friends,this.groups);}
if(this.friends.length){this.preLoading();this.has_friend=true;}
if(callback&&typeof callback=='function'){callback();}};}).apply(Klass.prototype);return Klass;})();ns.provide({FriendGroupModel:FriendGroupModel,SimplifiedFriendGroupModel:SimplifiedFriendGroupModel});});Namespace("jp.mixi.model.message")
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils appendViewerId,createRPCPromise,whenExpiredSessionToReload')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc.uploader JSONRPCUploader')
.define(function(ns){'use strict';var _createGatewayRPCPromise=function(method){if(!ns.JSONRPCUploader){return ns.promise();}
var postKey=ns.gateway('ajax_post_key')||ns.gateway('rpc_post_key');var service=ns.JSONRPCUploader.createService('system/rpc_form_gateway.pl',{auth_type:'postkey',secret:postKey});return service.createRPCPromise(method);};var model=ns.createModel({'send':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.send'),ns.whenExpiredSessionToReload),'send_with_photo':ns.promise().bind(ns.appendViewerId,_createGatewayRPCPromise('jp.mixi.message.send'),ns.whenExpiredSessionToReload),'findMessages':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.findMessages'),ns.whenExpiredSessionToReload),'findThreads':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.thread.findThreads'),ns.whenExpiredSessionToReload),'lookupThread':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.thread.lookup'),ns.whenExpiredSessionToReload),'findStampCategories':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.stamp.findStampCategories'),ns.whenExpiredSessionToReload),'findStamps':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.stamp.findStamps'),ns.whenExpiredSessionToReload),'sendStamp':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.stamp.sendStamp'),ns.whenExpiredSessionToReload),'get':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.get'),ns.whenExpiredSessionToReload),'addMember':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.thread.inviteThread'),ns.whenExpiredSessionToReload),'leaveThread':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.thread.leaveThread'),ns.whenExpiredSessionToReload),'getMemberInfo':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.getMemberInfo'),ns.whenExpiredSessionToReload),'updateThreadNotifySetting':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.thread.updateThreadNotifySetting'),ns.whenExpiredSessionToReload),'addStar':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.addStar'),ns.whenExpiredSessionToReload),'deleteStar':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.deleteStar'),ns.whenExpiredSessionToReload),'goOnline':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.message.onlinestatus.online'),ns.whenExpiredSessionToReload),'sendFriendRequest':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.friend.createLinkRequest'),ns.whenExpiredSessionToReload)});ns.provide({createMessageModel:function(){return model;}});});Namespace("jp.mixi.model.metasearch")
.use("brook promise")
.use('brook.model createModel')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.logging Log')
.define(function(ns){"use strict";var memberId=ns.gateway('login_member_id');var rpc=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:ns.gateway('rpc_post_key')});var createRequest=function(method){return rpc.createRPCPromise(method).bind(ns.promise(function(next,value){if(value.response.isFailure()){ns.Log.error('requestToServer['+method+']: got JSONRPC error response.');next({error:"got JSONRPC error response"});return;}
next({data:value.response.result});}));};var model=ns.createModel({profile:createRequest('jp.mixi.profile.search.searchByKeyword'),community:createRequest('jp.mixi.community.search'),news:createRequest('jp.mixi.news.entry.search'),voice:ns.promise(function(n,v){var req=v.keyword?createRequest('jp.mixi.voice.public.search'):createRequest('jp.mixi.voice.public.find');req.subscribe(n,v);}),diary:createRequest('jp.mixi.diary.public.search'),review:createRequest('jp.mixi.review.item.search'),game:createRequest('jp.mixi.application.searchFullText'),help:createRequest('jp.mixi.support.help.item.find'),updateSum:ns.promise(),forceSubmit:ns.promise()});ns.provide({metaSearchModel:model});});Namespace('jp.mixi.model.mute')
.use('brook promise')
.use('brook.util mapper')
.use('brook.model createModel')
.use('jp.mixi.model.utils appendViewerId,createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){'use strict';var procedurePrefix=function(service){switch(service){case'diary':return'jp.mixi.diary.mutedmember';break;case'easyshare':return'jp.mixi.easyshare.mutedmember';break;case'game':return'jp.mixi.application.mutedmember';break;case'voice':return'jp.mixi.voice.mutedmember';break;};};var appendMuteResource=function(memberId){return ns.mapper(function(value){var muteResource={muted_member_id:memberId};$j.extend(muteResource,value);return muteResource;});};var createModel=function(service,memberId){var model=ns.createModel({'create':ns.promise().bind(appendMuteResource(memberId),ns.appendViewerId,ns.createRPCPromise(procedurePrefix(service)+'.create'),ns.whenExpiredSessionToReload),'delete':ns.promise().bind(appendMuteResource(memberId),ns.appendViewerId,ns.createRPCPromise(procedurePrefix(service)+'.delete'),ns.whenExpiredSessionToReload),'find':ns.promise().bind(appendMuteResource(memberId),ns.appendViewerId,ns.createRPCPromise(procedurePrefix(service)+'.find'),ns.whenExpiredSessionToReload)});return model;};ns.provide({'createMuteModelByServiceNameAndMemberId':createModel});});Namespace('jp.mixi.model.photo')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils createRPCPromise,whenExpiredSessionToReload')
.define(function(ns){var model=ns.createModel({'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.lookup'),ns.whenExpiredSessionToReload),'pc.widget.photoview.lookup.render':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.lookup'),ns.whenExpiredSessionToReload),'pc.widget.photoview.lookup.store':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.lookup'),ns.whenExpiredSessionToReload),'clickCount':ns.promise().bind(ns.createRPCPromise('jp.mixi.photo.clickCount'))});ns.provide({createPhotoModel:function(){return model;}});});Namespace('jp.mixi.model.platformfeed')
.use('brook promise')
.use('brook.util *')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var nop=ns.through(function(){});ns.provide({createPlatformFeedModel:function(location){var appendLocation=location?ns.mapper(function(request){request.location=location;return request;}):nop;return ns.createModel({'lookup':ns.promise()
.bind(appendLocation,ns.appendViewerId,ns.createRPCPromise('jp.mixi.platform.feed.lookup'),ns.whenExpiredSessionToReload)});}});});Namespace("jp.mixi.model.review")
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var model=ns.createModel({'lookup':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.review.lookup'),ns.whenExpiredSessionToReload)});ns.provide({createReviewModel:function(){return model;}});});Namespace('jp.mixi.model.schedule')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var model=ns.createModel({'lookup':ns.promise().bind(ns.createRPCPromise('jp.mixi.schedule.lookup'),ns.whenExpiredSessionToReload)});ns.provide({createScheduleModel:function(){return model;}});});Namespace('jp.mixi.model.socialstream')
.use('brook promise')
.use('brook.util *')
.use('brook.model *')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.mixi.model.utils whenExpiredSessionToReload')
.define(function(ns){var postKey=ns.gateway('rpc_post_key');var viewerId=ns.gateway('login_member_id');var rpc=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:postKey});var NAME_OF_FEED={"diary":"日記","diary.rss":"日記","easyshare":"チェック","voice":"つぶやき","review":"レビュー","photo":"フォト","schedule":"予定","application":"アプリ更新情報","community.topic.comment":"コメント","community.topic.create":"アクティビティ","community.event.join":"アクティビティ","platform_feed":"バースデー情報","platform_feed.application":"アプリ更新情報","activity.application":"アプリ参加情報","activity.community":"アクティビティ","activity.relation":"アクティビティ","activity.fan.follow":"アクティビティ","activity.fan.create":"アクティビティ","activity.skin.touch.set":"アクティビティ","activity.profile.update":"アクティビティ","activity.profile.image.create":"アクティビティ","activity.profile.image.update":"アクティビティ","profile.image.main.update":"アクティビティ","news.article":"ニュース","voicetopic":"つぶやきネタ"};var RESULT_STRUCTURE_BUILDER={flat:function(creator,result){return result.map(creator);},categorized:function(creator,result){var ret={};ret.flow=result[0].flow.map(creator);ret.stock=result[0].stock.map(creator);ret.activity=result[0].activity.map(creator);return ret;}};var bindBuilder=function(builderName){return ns.promise(function(n,v){v.builder=RESULT_STRUCTURE_BUILDER[builderName];n(v);});};var _reduce=function(array){if(!array){return function(){};}
return function(func,applied){var current=applied||array[0];for(var i=applied?0:1;i<array.length;i++){current=func(current,array[i]);}
return current;};};var getTypeCurry=function(type){return function(object){return Object.prototype.toString.call(object)===type;};};var isArray=getTypeCurry('[object Array]');var isString=getTypeCurry('[object String]');var isObject=getTypeCurry('[object Object]');var _getItem=function(){var args=$A(arguments);var item=args.shift();return _reduce(args)(function(ret,prop){if(!ret){return;}
return ret[prop];},item);};var PREFIX='jp.mixi.socialstream.feed.';var findTimeline=rpc.createRPCPromise(PREFIX+'findTimeline');var findTimelineByObjectType=rpc.createRPCPromise(PREFIX+'findTimelineByObjectType');var findTimelineByUser=rpc.createRPCPromise(PREFIX+'findTimelineByUser');var findCategorizedSummary=rpc.createRPCPromise(PREFIX+'findCategorizedSummary');var findCategorizedMore=rpc.createRPCPromise(PREFIX+'findCategorizedMore');var findTimelineByUpdate=rpc.createRPCPromise(PREFIX+'findTimelineByUpdate');var findCategorizedByUpdate=rpc.createRPCPromise(PREFIX+'findCategorizedByUpdate');var getNewFeedCountTimeline=rpc.createRPCPromise(PREFIX+'getNewFeedCountTimeline');var getNewFeedCountCategorizedSummary=rpc.createRPCPromise(PREFIX+'getNewFeedCountCategorizedSummary');var FeedEntry=function(row){this.row=row;this.getObjectType=function(){return _getItem(this.row,'object','object_type');};this.getObjectName=function(){return NAME_OF_FEED[this.getObjectType()];};this.getCategory=function(){return _getItem(this.row,'category');};};var RPCResult=function(request,response,builder){this.request=request;this.response=response;this.isInitialRequest=function(){return(this.request.timestamp)?false:true;};this.hasEntry=function(){return(this.response.result&&this.response.result.length>0)?true:false;};this.getEntries=function(){if(this.isSuccess()){return builder(createEntry,this.response.result);}
return[];};this.isSuccess=function(){return this.response.isSuccess();};};var createEntry=function(entry){if(isArray(entry)){return entry.map(createEntry);}
return new FeedEntry(entry);};var createRPCResult=function(set){return new RPCResult(set.request,set.response,set.builder);};var requestFilter=ns.mapper(function(request){request.viewer_id=viewerId;return request;});var responseFilter=ns.mapper(function(set){return createRPCResult(set);});var model=ns.createModel();model.addMethod('findTimeline',ns.promise()
.bind(requestFilter)
.bind(findTimeline)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));model.addMethod('findTimelineByObjectType',ns.promise()
.bind(requestFilter)
.bind(findTimelineByObjectType)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));model.addMethod('findTimelineByUser',ns.promise()
.bind(requestFilter)
.bind(findTimelineByUser)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));model.addMethod('findCategorizedSummary',ns.promise()
.bind(requestFilter)
.bind(findCategorizedSummary)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('categorized'))
.bind(responseFilter));model.addMethod('findCategorizedMore',ns.promise()
.bind(requestFilter)
.bind(findCategorizedMore)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));model.addMethod('getNewFeedCountTimeline',ns.promise()
.bind(requestFilter)
.bind(getNewFeedCountTimeline)
.bind(ns.whenExpiredSessionToReload)
.bind(responseFilter));model.addMethod('getNewFeedCountCategorizedSummary',ns.promise()
.bind(requestFilter)
.bind(getNewFeedCountCategorizedSummary)
.bind(ns.whenExpiredSessionToReload)
.bind(responseFilter));model.addMethod('findTimelineByUpdate',ns.promise()
.bind(requestFilter)
.bind(findTimelineByUpdate)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));model.addMethod('findCategorizedByUpdate',ns.promise()
.bind(requestFilter)
.bind(findCategorizedByUpdate)
.bind(ns.whenExpiredSessionToReload)
.bind(bindBuilder('flat'))
.bind(responseFilter));var buildEntries=function(filter,entries){var builderName;if(filter==='timeline'){builderName='flat';}else if(filter==='categorized'){builderName='categorized';}else{throw filter+' is not supported.';}
var builder=RESULT_STRUCTURE_BUILDER[builderName];return builder(createEntry,entries);};ns.provide({getFeedModelInstance:function(){return model;},buildEntries:buildEntries});});Namespace("jp.mixi.model.utils")
.use('brook promise')
.use('brook.util cond,mapper')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc JSONRPC')
.use('jp.co.mixi.nativeproxy isEnableNativeProxy')
.use('jp.co.mixi.net.jsonrpc.uploader')
.use('jp.co.mixi.net.jsonrpc.nativeproxy.uploader')
.define(function(ns){var FormGatewayJSONRPCUploader=ns.jp.co.mixi.net.jsonrpc.uploader.JSONRPCUploader;var NativeProxyJSONRPCUploader=ns.jp.co.mixi.net.jsonrpc.nativeproxy.uploader.JSONRPCUploader;var UNAUTHENTICATION_ERROR_CODE="401";var postKey=ns.gateway('rpc_post_key')||ns.gateway('ajax_post_key');var viewer=ns.gateway('viewer');var rpc=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:postKey});var nativeProxyRPC=ns.JSONRPC.createService('/system/rpc.json',{auth_type:'postkey',secret:postKey},true);if(NativeProxyJSONRPCUploader){var uploaderRPC=NativeProxyJSONRPCUploader.createService('/system/rpc.json',{auth_type:'postkey',secret:postKey});}
var appendViewerId=ns.mapper(function(request){request.viewer_id=viewer?viewer.id:ns.gateway('login_member_id');return request;});var changeParamsFormatForFileInputs=ns.mapper(function(v){var files=v.fileInputs;if(!files)return v;delete v.fileInputs;return{fileInputs:files,params:v};});var createRPCPromise=function(method,isEnableNativeProxyEngine){if(isEnableNativeProxyEngine)
return nativeProxyRPC.createRPCPromise(method);return rpc.createRPCPromise(method);};var createFormGatewayRPCPromise=function(method){var service=FormGatewayJSONRPCUploader.createService('system/rpc_form_gateway.pl',{auth_type:'postkey',secret:postKey});return service.createRPCPromise(method);};var getRPCPromiseCreator=function(method){return ns.promise(function(next,value){var rpcPromise;var data=value;if(ns.isEnableNativeProxy()){if(value&&value.fileInputs){if(!uploaderRPC)throw new Error('required nativeproxy uploader');rpcPromise=uploaderRPC.createRPCPromise(method);}else{rpcPromise=nativeProxyRPC.createRPCPromise(method);}}else{if(value&&value.fileInputs)data=value.params;rpcPromise=rpc.createRPCPromise(method);}
rpcPromise.subscribe(function(v){next(v);},data);});};var whenExpiredSessionToReload=ns.cond(function(value){return(value.response.error&&value.response.error.code==UNAUTHENTICATION_ERROR_CODE);},ns.promise(function(next,value){location.reload();}));ns.provide({appendViewerId:appendViewerId,changeParamsFormatForFileInputs:changeParamsFormatForFileInputs,createRPCPromise:createRPCPromise,createFormGatewayRPCPromise:createFormGatewayRPCPromise,getRPCPromiseCreator:getRPCPromiseCreator,whenExpiredSessionToReload:whenExpiredSessionToReload});});Namespace("jp.mixi.model.voice")
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc.uploader JSONRPCUploader')
.define(function(ns){var _createGatewayRPCPromise=function(method){if(!ns.JSONRPCUploader){return ns.promise();}
var postKey=ns.gateway('ajax_post_key')||ns.gateway('rpc_post_key');var service=ns.JSONRPCUploader.createService('system/rpc_form_gateway.pl',{auth_type:'postkey',secret:postKey});return service.createRPCPromise(method);};var model=ns.createModel({'create':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.voice.create'),ns.whenExpiredSessionToReload),'createWithPhoto':ns.promise().bind(ns.appendViewerId,_createGatewayRPCPromise('jp.mixi.voice.create'),ns.whenExpiredSessionToReload),'lookup':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.voice.lookup'),ns.whenExpiredSessionToReload),'delete':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.voice.delete'),ns.whenExpiredSessionToReload),'getRestrictedViewerList':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.voice.getRestrictedViewerList'),ns.whenExpiredSessionToReload)});ns.provide({createVoiceModel:function(){return model;}});});Namespace("jp.mixi.model.diary.diaryphoto")
.use('brook promise')
.use('brook.model createModel')
.use('jp.co.mixi.gateway gateway')
.use('jp.co.mixi.net.jsonrpc.uploader JSONRPCUploader')
.use('jp.mixi.model.utils *')
.define(function(ns){var createGatewayRPCPromise=function(method){var postKey=ns.gateway('rpc_post_key');var service=ns.JSONRPCUploader.createService('system/rpc_form_gateway.pl',{auth_type:'postkey',secret:postKey});return service.createRPCPromise(method);};var model=ns.createModel({'prepare':createGatewayRPCPromise('jp.mixi.diary.attachment.prepareDiaryPhoto'),'delete':ns.promise()});ns.provide({createPreparedDiaryPhotoModel:function(){return model;}});});Namespace('jp.mixi.model.diary.settings')
.use('brook promise')
.use('brook.model createModel')
.use('jp.mixi.model.utils *')
.define(function(ns){var model=ns.createModel({'getSettings':ns.promise().bind(ns.appendViewerId,ns.createRPCPromise('jp.mixi.diary.settings.lookup'),ns.whenExpiredSessionToReload)});ns.provide({createDiarySettingsModel:function(){return model;}});});