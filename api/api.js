const requestUrl = {
  nameList: '/api/project/nameList', //获取名称集合(还会有其他信息)，用作列表展示使用
  nameListForTable: '/api/project/nameListForTable', //数据表搜索框list集合
  projectCardList: '/api/project/list', //项目卡片信息

  updateBaseInfo: '/api/control/xmxx/updateBaseInfo', //修改项目基本信息
  updateFiveInfo: '/api/control/xmxx/updateFiveInfo', //修改项目五方信息
  updateMoneyInfo: '/api/control/xmxx/updateMoneyInfo', //修改项目资金信息
  getAllRedDotNum: '/api/control/getAllRedDotNum', //获取所有操作台内的红点数

  getTimeNode: '/api/control/jhjd/getTimeNode', //获取计划进度填写时间节点信息
  getPlanInfoMap: '/api/control/jhjd/getPlanInfoMap', //根据时间节点获取计划集合信息
  getScheduleInfoMap: '/api/control/jhjd/getScheduleInfoMap',//根据时间节点获取进度集合信息
  insertPlanList: '/api/control/jhjd/insertPlanList', //插入计划完成情况
  insertScheduleList: '/api/control/jhjd/insertScheduleList',//插入进度情况
  getStepAndNodeName: '/api/control/jhjd/getStepAndNodeName',//获取6大步骤42节点名称
  insertSchedulePast: '/api/control/jhjd/insertSchedulePast',//插入往期的进度数据
  getPastSchedulePlanList: '/api/control/jhjd/getPastSchedulePlanList',

  commitProblem: '/api/control/aqjc/commitProblem', // 安全检查提交问题
  listProblem: '/api/control/aqjc/listProblem', // 安全检查问题列表
  listProblemByStatus: '/api/control/aqjc/listProblemByStatus', // 根据状态获取安全检查问题列表
  getProblemById: '/api/control/aqjc/getProblemById', // 根据id获取安全检查提问列表
  
  listQualityByStatus: '/api/control/aqjc/listQualityByStatus', // 根据状态获取质量检查问题列表
  getQualityById: '/api/control/aqjc/getQualityById', // 根据id获取质量检查提问列表
  commitQuality: '/api/control/zljc/commitQuality', // 质量检查提交问题
  listQuality: '/api/control/zljc/listQuality', // 质量检查问题列表

  projectInformation: '/api/baseInformation/baseInformation/list',//获取项目信息
  GetGqXx: '/api/gqxx', //根据项目id获取工期信息
  SaveGqXx: '/api/gqxx/save', //保存工期信息
  SaveKgMsg: '/api/gqxx/kg-msg/save', //保存开工信息
  DeleteKgMsg: '/api/gqxx/kg-msg/delete', //删除开工信息

  tptxList: '/api/tptx/pmTptx/list', //图片图像
}


module.exports = requestUrl