function showBuildUnit(e) {
  var roleRealId = e.roleRealId;
  return !(roleRealId == 1 || roleRealId == 2 || roleRealId == 6);
}



module.exports = {
  showBuildUnit: showBuildUnit
}