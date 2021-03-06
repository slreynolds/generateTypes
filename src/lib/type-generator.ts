export default class TypeGenerator {
  /**
   * returns array of 
   */
  objectAssignMinimum(a : string[], b : string[]) : string[]{
    let res : string[] = [];
    for (let key of a) {
      if(b.includes(key)){
        res.push(key);
      }
    }
    return res;
  }

  camelCase(s : string) : string{
    return s.split("_")
      .map(d => d.substr(0,1).toUpperCase() + d.substr(1))
      .join("");
  }

  normalizeKeyName(s : string) : string{
    let alphaNumeric = new RegExp(/\W/);
    if(!alphaNumeric.test(s))
      return s;
    let regex = /'/gi;
    return '\'' + s.replace(regex, '\\\'') + '\'';
  }

  getTypes(list : any[]) : string{
    return list.map(d => typeof d + "").reduce((prev, cur) => prev === cur ? prev : "any");
  }

  parseObject(s : any ) : any[]{
    let obj : any = {};
    let out = "";
    for (let [key, value] of Object.entries(s)) {
      let typeOfValue = typeof value;
      key = this.normalizeKeyName(key);
      if(Array.isArray(value)){
        if(value.length > 0){
          let arrayType = this.getTypes(value);
          if(arrayType === "object"){
            let key2 = this.camelCase(key);
            out += this.generateTypes(key2, value)[0];
            obj[key] = key2 + "[]";
          }else{
            obj[key] = arrayType + "[]";
          }
        }else{
          obj[key] = "any[]";
        }
      }else if(value === undefined || value === null){
        obj[key] = "null";
      }else if(typeOfValue === "object"){
        let r = this.generateTypes("", value);
        out += r[0];
        obj[key] = JSON.parse(r[1]);
      }else{
        obj[key] = typeOfValue;
      }
    }
    return [obj, out];
  }

  generateTypes(objName : string, s : any) : string[]{
    let out = "";
    let obj : any = {};
    if(Array.isArray(s)){
      let optObj : any = {};
      // find first and extract as basis
      let min = s.map(d => Object.keys(d))
          .reduce((prev, cur) => this.objectAssignMinimum(prev, cur));

      for (let v of s) {
        for (let [key, value] of Object.entries(v)) {
          if(min.includes(key)){
            // cool
          }else{
            optObj[key] = Array.isArray(value) ? 'array' : typeof value;
          }
        }
      }

      // TODO: should iterate over the array to find outliers
      let [a,b] = this.parseObject(s[0]);
      obj = a;
      out += b;
      /*
      for (let key of min) {
        obj[key] = [...new Set(s.map(d => typeof d[key] + ""))]
          .reduce((prev,cur) => prev + " | " + cur);
      }
      */
      for (let [key, value] of Object.entries(optObj)) {
        key = this.normalizeKeyName(key);
        if(value === 'array'){
          let values = s.filter(d => d[key]).map(d => d[key]);
          if(values.length === 0){
            obj[key + '?'] = "any[]";
          }else{
            let arrayType = this.getTypes(values[0]);
            if(arrayType === "object"){
              let key2 = this.camelCase(key);
              out += this.generateTypes(key2, values)[0];
              obj[key + '?'] = key2 + "[]";
            }else{
              obj[key + '?'] = arrayType + "[]";
            }
          }
        }else if(value === 'object'){
          let values = s.filter(d => d[key]).map(d => d[key]);
          let r = this.generateTypes("", values);
          //out += r[0];
          obj[key + "?"] = JSON.parse(r[1]);
        }else{
          // TODO: here too
          obj[key + "?"] = value;
        }
        // if the optional obj is in the first object too
        if(obj[key]){
          delete obj[key];
        }
      }
      if(objName === ""){
        return [out, JSON.stringify(obj, null, 2) + "\n"];
      }

      return ["type " + objName + " = " + JSON.stringify(obj, null, 2) + "\n"
            + out, ""];
    }
    let [a,b] = this.parseObject(s);
    obj = a;
    out += b;

    if(objName === ""){
      return [out, JSON.stringify(obj, null, 2) + "\n"];
    }
    return ["type " + objName + " = " + JSON.stringify(obj, null, 2) + "\n"
           + out, ""];
  }

  magic(objName : string, json : any) : string{
    let result = "";
    let parsed = typeof json === 'string' ? JSON.parse(json) : json;
    console.log('json is: ', parsed);
    if(Array.isArray(parsed)){
      result += "type " + objName + "s = " + objName + "[]\n";
    }
    result += this.generateTypes(objName, parsed)[0];
    result = result.replace(/\"/g, '');
    return result;
  }

  magicPromise(objName : string, json : any) : Promise<string>{
    return new Promise((resolve, reject) => {
      resolve(this.magic(objName, json));
    });
  }

}