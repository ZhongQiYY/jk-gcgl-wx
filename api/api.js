const requestValue = {
  nameList: '/api/project/nameList', //获取名称集合(还会有其他信息)，用作列表展示使用
  getTimeNode: '/api/control/xmxx/getTimeNode', //获取计划进度填写时间节点信息
  getPlanInfoMap: '/api/control/xmxx/getPlanInfoMap', //根据时间节点获取集合信息
  insertPlanList: '/api/control/xmxx/insertPlanList' //插入计划完成情况
}


module.exports = requestValue