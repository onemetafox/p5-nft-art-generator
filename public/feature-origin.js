(function calculateFeatures(tokenData) {
  var data={};
  var angoff = (3.14 / 180) * R.random_int(0, 360);
  if(22.5>angoff>=0){
    data["Rotation"] = "North";
  }else if(67.5>angoff>=22.5){
    data["Rotation"] = "North East";
  }else if(112.5>angoff>=67.5){
    data["Rotation"] = "East";
  }else if(157.5>angoff>=112.5){
    data["Rotation"] = "South East";
  }else if(202.5>angoff>=157.5){
    data["Rotation"] = "South";
  }else if(247.5>angoff>=202.5){
    data["Rotation"] = "South West";
  }else if(292.5 > angoff >= 247.5){
    data["Rotation"] = "West";
  }else{
    data["Rotation"] = "North West";
  }
  var inversion = R.random_int(0,1);
  if(inversion === 0){
    data["Inversion"] = "maelstrom";
  }else{
    data["Inversion"] = "hibernal";
  }
  var image = R.random_choice([0,1,2,3,4]);
  switch(image){
    case 0: data["Pattern"] = "to live is the rarest thing in the world"
    case 1: data["Pattern"] = "ever and anon gazing"
    case 2: data["Pattern"] = "not their sky vortex"
    case 3: data["Pattern"] = "of the high pastured"
    case 4: data["Pattern"] = "a boisterous stream in a boulder choked channel"
  }
  var shapecolors = [];
  for (shapecolors = [], n = 0; n < 5; n++) shapecolors.push([R.random_int(0, 150), R.random_int(0, 150), R.random_int(0, 150), 10]);
  return data;
})(tokenData)