const requestUrl = {
  nameList: '/api/project/nameList', //获取名称集合(还会有其他信息)，用作列表展示使用
  nameListForTable: '/api/project/nameListForTable', //数据表搜索框list集合
  
  getAllRedDotNum: '/api/control/getAllRedDotNum', //获取所有操作台内的红点数
  getTimeNode: '/api/control/xmxx/getTimeNode', //获取计划进度填写时间节点信息
  getPlanInfoMap: '/api/control/xmxx/getPlanInfoMap', //根据时间节点获取集合信息
  insertPlanList: '/api/control/xmxx/insertPlanList', //插入计划完成情况
  projectInformation: '/api/baseInformation/baseInformation/list',//获取项目信息
  GetGqXx: '/api/gqxx', //根据项目id获取工期信息
  SaveGqXx: '/api/gqxx/save', //保存工期信息
  SaveKgMsg: '/api/gqxx/kg-msg/save', //保存开工信息
  DeleteKgMsg: '/api/gqxx/kg-msg/delete', //删除开工信息
}


module.exports = requestUrl