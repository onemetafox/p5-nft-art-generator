function calculateFeatures(tokenData) {
  class Rnd {
    constructor() {
        this.useA = !1;
        let n = function (n) {
            let f = parseInt(n.substr(0, 8), 16),
                z = parseInt(n.substr(8, 8), 16),
                e = parseInt(n.substr(16, 8), 16),
                P = parseInt(n.substr(24, 8), 16);
            return function () {
                let n = ((((f |= 0) + (z |= 0)) | 0) + (P |= 0)) | 0;
                return (P = (P + 1) | 0), (f = z ^ (z >>> 9)), (z = ((e |= 0) + (e << 3)) | 0), (e = ((e = (e << 21) | (e >>> 11)) + n) | 0), (n >>> 0) / 4294967296;
            };
        };
        (this.prngA = new n(tokenData.hash.substr(2, 32))), (this.prngB = new n(tokenData.hash.substr(34, 32)));
        for (let n = 0; n < 1e6; n += 2) this.prngA(), this.prngB();
    }
    random_dec() {
        return (this.useA = !this.useA), this.useA ? this.prngA() : this.prngB();
    }
    random_num(n, f) {
        return n + (f - n) * this.random_dec();
    }
    random_int(n, f) {
        return Math.floor(this.random_num(n, f + 1));
    }
    random_bool(n) {
        return this.random_dec() < n;
    }
    random_choice(n) {
        return n[this.random_int(0, n.length - 1)];
    }
    reset() {
        this.seed = this.originalSeed;
    }
  }
  var rnd = new Rnd();
  
  var data={};
  var angoff = Math.floor(rnd.random_int(0, 360));

  if(22.5>angoff && angoff>0){
    data["Rotation"] = "north";
  }else if(67.5>angoff && angoff>22.5){
    data["Rotation"] = "northeast";
  }else if(112.5>angoff && angoff>67.5){
    data["Rotation"] = "east";
  }else if(157.5>angoff && angoff>112.5){
    data["Rotation"] = "southeast";
  }else if(202.5>angoff && angoff>157.5){
    data["Rotation"] = "south";
  }else if(247.5>angoff && angoff>202.5){
    data["Rotation"] = "southwest";
  }else if(292.5 >angoff && angoff > 247.5){
    data["Rotation"] = "west";
  }else{
    data["Rotation"] = "northwest";
  }
  var inversion = true
  var test = rnd.random_int(0, 1);
  console.log(test);
  if (1 == test && true == inversion) {
    inversion = false;
    data["Inversion"] = "hibernal";
  }else{
    data["Inversion"] = "maelstrom";
  }

  var image = rnd.random_choice([0,1,2,3,4])

  /*if(image.includes("/wDltzBKAACASElEQVR42ux9jZYbOc4r8P4vfc/")){
    data["Pattern"] = "to live is the rarest thing in the world"
  }else if(image.includes("/wDltzBKAAC1+klEQVR42uR9iZYryXEr8P8//c")){
    data["Pattern"] = "ever and anon gazing";
  }else if(image.includes("/wDltzBKAADGEUlEQVR42uS9gXbkVg4jCvz/T")){
    data["Pattern"] = "not their sky vortex"
  }else if(image.includes("/wDltzBKAACedElEQVR42uy9i3LkSq4rCvz/T")){
    data["Pattern"] = "of the high pastured";
  }else{
    data["Pattern"] = "a boisterous stream in a boulder choked channel";
  }*/
  switch(image){
    case 0: data["Pattern"] = "to live is the rarest thing in the world"; break;
    case 1: data["Pattern"] = "ever and anon gazing"; break;
    case 2: data["Pattern"] = "not their sky vortex"; break;
    case 3: data["Pattern"] = "of the high pastured"; break
    case 4: data["Pattern"] = "a boisterous stream in a boulder choked channel"; break
  }
  
  var colorGroups = [
    "0, 0, 0;52, 52, 52;27, 18, 18;40, 40, 43;53, 57, 53;81, 65, 79;178, 190, 181;54, 69, 79;169, 169, 169;128, 128, 128;129, 133, 137;211, 211, 211;137, 148, 153;229, 228, 226;192, 192, 192;112, 128, 144;132, 136, 132;113, 121, 126",
    "149, 69, 53;205, 127, 50;218, 160, 109;233, 116, 81;110, 38, 14;193, 154, 107;123, 63, 0;210, 125, 45;111, 78, 55;131, 67, 51;184, 115, 51;129, 65, 65;92, 64, 51;152, 133, 88;194, 178, 128;229, 170, 112;150, 105, 25;240, 230, 140;196, 164, 132;150, 121, 105;74, 4, 4;128, 70, 27;139, 69, 19;160, 82, 45;210, 180, 140;72, 60, 50;245, 222, 179",
    "0, 255, 255;240, 255, 255;137, 207, 240;0, 0, 255;115, 147, 179;0, 150, 255;95, 158, 160;0, 71, 171;100, 149, 237;0, 0, 139;111, 143, 175;20, 52, 164;125, 249, 255;96, 130, 182;63, 0, 255;173, 216, 230;25, 25, 112;0, 0, 128;31, 81, 255;167, 199, 231;182, 208, 226;150, 222, 209;65, 105, 225;15, 82, 186;135, 206, 235;70, 130, 180;0, 128, 128;64, 224, 208;4, 55, 242;8, 24, 168",
    "127, 255, 212;69, 75, 27;9, 121, 105;175, 225, 175;223, 255, 0;2, 48, 32;80, 200, 120;95, 133, 117;79, 121, 66;34, 139, 34;124, 252, 0;0, 128, 0;53, 94, 59;0, 163, 108;42, 170, 138;76, 187, 23;144, 238, 144;50, 205, 50;71, 135, 120;11, 218, 81;152, 251, 152;138, 154, 91;236, 255, 220;128, 128, 0;193, 225, 193;201, 204, 63;180, 196, 36;147, 197, 114;46, 139, 87;159, 226, 191;0, 158, 96;0, 255, 127;64, 181, 173;64, 130, 109;8, 143, 143",
    "244, 196, 48;255, 191, 0;255, 172, 28;204, 85, 0;227, 150, 62;242, 140, 40;255, 127, 80;139, 64, 0;228, 155, 15;218, 165, 32;255, 213, 128;244, 187, 68;255, 95, 31;204, 119, 34;255, 165, 0;250, 200, 152;236, 88, 0;227, 83, 53;255, 117, 24;255, 95, 21;240, 128, 0;255, 170, 51",
    "51, 206, 177;242, 210, 189;222, 49, 99;248, 131, 121;201, 169, 166;255, 105, 180;255, 182, 193;243, 207, 198;248, 200, 220;250, 160, 160;255, 192, 203;248, 152, 128;227, 11, 92;243, 58, 106;224, 191, 184;194, 30, 86;224, 17, 95;250, 128, 114;227, 115, 131;169, 92, 104;227, 115, 94",
    "59, 43, 104;191, 64, 191;112, 41, 99;170, 51, 106;48, 25, 52;72, 50, 72;93, 63, 211;230, 230, 250;203, 195, 227;207, 159, 255;170, 152, 169;224, 176, 255;145, 95, 109;119, 7, 55;218, 112, 214;195, 177, 225;204, 204, 255;103, 49, 71;128, 0, 128;149, 53, 83;216, 191, 216;99, 3, 48;127, 0, 255;189, 181, 213;129, 19, 49",
    "36, 8, 8;170, 74, 68;238, 75, 43;128, 0, 32;196, 30, 58;215, 0, 64;210, 4, 45;220, 20, 60;123, 24, 24;154, 42, 42;192, 64, 0;128, 0, 0;152, 104, 104;255, 0, 0;165, 42, 42;145, 56, 49;255, 36, 0;250, 95, 85;124, 48, 48;164, 42, 4;227, 66, 52;114, 47, 55;255, 68, 51",
    "34, 221, 202;237, 234, 222;245, 245, 220;249, 246, 238;255, 248, 220;255, 253, 208;240, 234, 214;255, 255, 240;233, 220, 201;255, 222, 173;250, 249, 246;252, 245, 229;255, 229, 180;226, 223, 210;255, 245, 238;243, 229, 171;255, 255, 255;250, 213, 165",
    "25, 193, 110;255, 234, 0;253, 218, 13;255, 255, 143;228, 208, 10;139, 128, 0;238, 220, 130;228, 155, 15;255, 215, 0;255, 192, 0;252, 245, 95;248, 222, 126;250, 250, 51;251, 236, 93;255, 219, 88;250, 218, 94;255, 250, 160;196, 180, 84;255, 255, 0"
  ]
  var groups = [];
  var colors = [];
  for (colors = [], n = 0; n < 5; n++) {
      var color = rnd.random_choice(colorlist);
      colors.push(color);
  }
  for(var i = 0 ; i < 10 ; i++){
    
    var tempGroup = colorGroups[i].replace(/\s/g, '');
    for (var k = 0 ; k < 5; k++){
      if(tempGroup.includes(JSON.stringify(colors[k]).slice(1, -1).replace(/\s/g, ''))){
        groups.push("G"+i);
      }
    }
  }
  var patterns = {
    "the blacks and grays": "G1, G1, G1, G1, G1",
    "the browns":"G2, G2, G2, G2, G2",
    "the blues":"G3, G3, G3, G3, G3 ",
    "the greens":"G4, G4, G4, G4, G4 ",
    "the oranges":"G5, G5, G5, G5, G5 ",
    "the pinks":"G6, G6, G6, G6, G6 ",
    "the violets":"G7, G7, G7, G7, G7 ",
    "the reds":"G8, G8, G8, G8, G8 ",
    "the pales":"G9, G9, G9, G9, G9 ",
    "the yellows":"G10, G10, G10, G10, G10 ",
    "the land and the sea": "G3, G4, G4, G4, G4; G3, G3, G4, G4, G4; G3, G3, G3, G4, G4;G3, G3, G3, G3, G4;G2, G3, G3, G3, G4;G2, G3, G3, G4, G4;G2, G3, G4, G4, G4;G2, G2, G3, G3, G4;G2, G2, G3, G4, G4 ",
    "the sky and the water":"G3, G9, G9, G9, G9;G3, G3, G9, G9, G9;G3, G3, G3, G9, G9;G3, G3, G3, G3, G9 ",
    "fire":"G5, G5, G5, G5, G8; G5, G5, G5, G8, G8; G5, G5, G8, G8, G8; G5, G8, G8, G8, G8",
    "primary education":"G3, G3, G3, G8, G10;G3, G4, G8, G8, G10; G3, G3, G8, G10, G10;G3, G8, G8, G8, G10;G3, G8, G8, G10, G10;G3, G8, G10, G10, G10",
    "rainbows":"G3, G4, G5, G8, G10;G4, G5, G7, G8, G10",
    "the trees": "G4, G2, G2, G2, G2;G4, G4, G2, G2, G2;G4, G4, G4, G2, G2;G4, G4, G4, G4, G2",
    "the dreams": "G6, G9, G9, G9, G9;G6, G6, G9, G9, G9;G6, G6, G6, G9, G9;G6, G6, G6, G6, G9 ",
    "the sun":"G10, G8, G5, G10, G5;G10, G8, G5, G10, G8;G10, G8, G5, G10, G10;G10, G8, G5, G8, G8;G10, G8, G5, G8, G5;G10, G8, G5, G5, G5",
    "the dirt and ants": "G1, G2, G2, G2, G2;G1, G1, G2, G2, G2;G1, G1, G1, G2, G2;G1, G1, G1, G1, G2",
    "canaries in the permafrost": "G10, G9, G9, G9, G9;G10, G10, G9, G9, G9;G10, G10, G10, G9, G9;G10, G10, G10, G10, G9 "
  }
  data["Palette"] = "";
  for (const [key, value] of Object.entries(patterns)) {
    var groupStr = value.replace(/\s/g, '');
    if(groupStr.includes(JSON.stringify(groups.sort()).slice(1, -1).replace(/\s/g, ''))){
      data["Palette"] = key;
    }
  }
  if(data["Palette"]==""){
    data["Palette"] = "as the tributaries merge";
  }
  //data["Hash"] = tokenData.hash;

  /*var shapecolors = [];
  for (shapecolors = [], n = 0; n < 5; n++) shapecolors.push([random_int(0, 150), random_int(0, 150), random_int(0, 150), 10]);*/
  //return data;
  console.log(data);
  return data;
}