function isBuildUnit(e) {
  var company = e.company;
  if(company == "科技城" || 
  company == "满园" || 
  company == "西城" || 
  company == "综保区" || 
  company == "中恒工业" || 
  company == "中恒商业" ||  
  company == "磊昇" ||  
  company == "工建"){
    return true;
  }else{
    return false;
  }
}



module.exports = {
  isBuildUnit: isBuildUnit
}