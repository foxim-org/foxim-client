import { get, post } from './http.config'
//好友列表
export function findMyFriends(params = {}) {
  return get('api/v1/contacts/findMyFriends', params)
}
//群组列表
export function findGroup() {
  return get('api/v1/groups/findgroup')
}
//搜索联系人
export function searchFriend(params: string) {
  return get(`/api/v1/user/search?userSearch=${params}`)
}
//加好友前查看资料
export function showInfoBefore(id = "") {
  return get(`/api/v1/user/simple/${id}`)
}
//加好友
export function addFriend(id:string) {
  return get(`/api/v1/contacts/addContacts/${id}`)
}
//修改联系人关系
export function friendSet(params = {}) {
  return post("/api/v1/contacts/contactId", params)
}
//好友置顶
export function contactTop(params = {}) {
  return post("/api/v1/contacts/setContact", params)
}
//好友免打扰
export function userNotDisturb(params = {}) {
  return post("/api/v1/contacts/notDisturb", params)
}
//删好友
export function deleteFriend(id = "") {
  return post(`/api/v1/contacts/remove/${id}`)
}
//lahei好友
export function blackFriend(params = {}) {
  return post(`/api/v1/contacts/block`, params)
}
//新增群
export function newGroup(params = {}) {
  return post('api/v1/groups/new', params)
}
//群聊天界面

export function findName(params = {}) {
  return post('/api/v1/groups/findGroupName', params)
}
//登录
export function login(params = {}) {
  return post('/api/v1/user/login', params)
}
//登录
export function regist(params = {}) {
  return post('/api/v1/user/register', params)
}
//根据token
export function getInfoByToken() {
  return get('/api/v1/user/findById')
}
//查看群成员
export function findGroupMember(params = {}) {
  return get('/api/v1/groups/users', params)
}
//设置群管理员
export function setgroupGuilder(data = {}) {
  return post("/api/v1/groups/setmod", data)
}
//查找群
export function searchGroupInfo(params = {}) {
  return get('/api/v1/groups/searchGroupInfo', params)
}
//取消群管理员
export function removegroupGuilder(data = {}) {
  return post("/api/v1/groups/unsetmod", data)
}
//踢出群聊
export function removegroup(data = {}) {
  return post("/api/v1/groups/kick", data)
}
//查看群设置
export function viewGroupSetting(data = {}) {
  return post("/api/v1/groups/ViewGroupSettings", data)
}
//加入群聊
export function addgroup(data = {}) {
  return post("/api/v1/groups/add", data)
}
//用户退出群聊
export function quitgroup(params = {}) {
  return post("/api/v1/groups/quit", params)
}
//解散群
export function removegroupbyleader(params = {}) {
  return post("/api/v1/groups/remove", params)
}
//更新群资料
export function updateGroupInfo(params = {}) {
  return post("/api/v1/groups/update", params)
}
//私聊信息历史记录
export function geiMessages(params = '') {
  return get(`/api/v1/private-message/getPrivateMessages/${params}`)
}
//获取最近联系人列表
export function GetRecent() {
  return get(`/api/v1/contacts/recents`)
}
export function getGroupMessage(params = '') {
  return get(`/api/v1/groups/messages/${params}`)
}
//查看朋友圈
export function findFriendsCircle() {
  return get('/api/v1/timelines')
}
//查看朋友圈
export function findFriendsCircleSomeone(friendsId: any) {
  return get(`/api/v1/timelines/${friendsId}`)
}
//查看朋友圈
export function publishFriendsCircle(params = {}) {
  return post('/api/v1/timelines', params)
}
//点赞朋友圈
export function likeTimeFriendsCircle(params = {}) {
  return post('/api/v1/timelines/likeTimelines', params)
}
//回复朋友圈
export function replyFriendsCircle(params = {}) {
  return post('/api/v1/timelines/replyTimelines', params)
}
//群机器人
export function botInfo(params = {}) {
  return post('/api/v1/bots/setting/autoForward', params)
}

//群机器人id
export function getBoID(groupId = "") {
  return get(`/api/v1/bots/get/${groupId}`)
} 
//群置顶
export function groupTop(id) {
  return get(`/api/v1/groups/groupTop/${id}`)
}
//群免打扰
export function notDisturb(id) {
  return get(`/api/v1/groups/notDisturb/${id}`)
}
//群免打扰
export function welcomeGroup(params = {}) {
  return post('/api/v1/bots/setting/joinGroup', params)
}
//修改用户资料
export function setUserInfo(params = {}) {
  return post('/api/v1/user/setUserInfo', params)
}
//上传
export function fileUpload(params = {}) {
  return post('/api/v1/file/upload', params)
}
//修改用户资料
export function setUserAvatarUrl(params = {}) {
  return post('/api/v1/user/setUserAvatarUrl', params)
}
//修改用户资料
export function setGroupAvatarUrl(params = {}) {
  return post('/api/v1/groups/setGroupAvatarUrl', params)
}
//同意申请列表
export function setUserList(params: string) {
  return get(`/api/v1/user/userList?search=${params}`)
}
//好友申请列表
export function friReList() {
  return get(`/api/v1/contacts/contactsRequests`)
}
//同意好友请求
export function agreeFri(id:string) {
  return get(`/api/v1/contacts/agreeContacts/${id}`)
}
//检验验证码
export function checkCodes(params) {
  return post(`/api/v1/sms/verify?code=${params.code}&mobile=${params.phone}`,params)
}
//发送验证码
export function codes(params) {
  return post(`/api/v1/sms/codes/?mobile=${params}`)
}
//发送验证码
export function codesLogin(params={}) {
  return post(`/api/v1/user/loginMobile?code=${params.code}&mobile=${params.phone}`)
}
//发送验证码
export function codesregister(params={}) {
  return post(`/api/v1/user/registerMobile`,params)
}
//修改密码
// export function setPas(params={}) {
//   return post(`/api/v1/user/setUserMobilePwd`,params)
// }
export function setPas(params={}) {
  return post(`/api/v1/user/setPwd`,params)
}
//更新转发请求
export function setForwardTime(params={}) {
  return post(`/api/v1/contacts/setForwardTime`,params)
}
//获取最近转发列表

export function getForwardList() {
  return get(`/api/v1/contacts/getForwardList`,)
}
//获取链接
export function searchUrl() {
  return get(`/api/v1/searchUrl/`,)
}
//获取video token
export function getVideoToken(params={}) {
  return post(`/livekit/api/v1/grant-livekit-token`,params)
}
//获取登录logo图片
export function logoImg() {
  return get(`/api/v1/admin/lookLogoAvatarUrl`,)
}
//获取关于我们
export function AboutWith() {
  return get(`/api/v1/user/AboutWith`,)
}
//验证token
export function loginWithToken(token:any) {
  return get(`/admin/adminInfo?token=${token}`)
}

//底部导航栏
export function lookNavigation() {
  return get(`/api/v1/admin/lookNavigation`)
}
//清空聊天记录
export function deleteMessages(params:string) {
  return post(`/api/v1/groups/deleteMessages?groupId=${params}`,)
}
//发送群申请
export function addGroup(params:string) {
  return get(`/api/v1/groups/addGroup/${params}`,)
}
//查看群申请
export function groupRequests() {
  return get(`/api/v1/groups/groupRequests`,)
}
//同意群申请
export function agreeGroup(params={}) {
  return get(`/api/v1/groups/agreeGroup`,params)
}
//查看群资料
export function lookGroup(params = {}) {
  return get(`/api/v1/groups/lookGroup`,params)
}
//单聊清除聊天记录
export function emptyPrivateMessages(params={}) {
  return get(`/api/v1/private-message/emptyPrivateMessages`,params)
}
//设置全员禁言
export function silentAll(params={}) {
  return get(`/api/v1/groups/silentAll`,params)
}
//设置全员禁言
export function viewSilent(params={}) {
  return get(`/api/v1/groups/viewSilent`,params)
}
//设置禁言
export function silent(params={}) { 
  return get(`/api/v1/groups/silent`,params)
}
//解除禁言
export function notSilent(params={}) {
  return get(`/api/v1/groups/notSilent`,params)
}
//查看单个用户是否禁言
export function lookGroupUserSilent(params={}) {
  return get(`/api/v1/groups/lookGroupUserSilent`,params)
}
export function checkFriends(params:string) {
  return get(`/api/v1/contacts/see/${params}`)
}