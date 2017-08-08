/**
 * 公用方法
 * */

/**
 * 为日期对象添加格式化输出
 * 调用： new Date().Format("yyyy-MM-dd") or new Date().Format("yyyy-MM-dd hh:mm:ss")  
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getTimeByDateStr(stringTime){
	var s = stringTime.split(" "); 
	var s1 = s[0].split("-"); 
	var s2 = s[1].split(":");
	if(s2.length==2){
		s2.push("00");
	}
	
	return new Date(s1[0],s1[1]-1,s1[2],s2[0],s2[1],s2[2]).getTime();
	
	// 火狐不支持该方法，IE CHROME支持
	//var dt = new Date(stringTime.replace(/-/, "/"));
	//return dt.getTime();
}

// 时长转化
function getDurationStr(num){
	var seconds = Math.floor(num % 60);
	var minites = Math.floor(num / 60 % 60);
	var hours   = Math.floor(num / 60 / 60);
	var ret = "";
	ret += " " + (hours<10?("0"+hours):hours) + ":";
	ret += (minites<10?("0"+minites):minites) + ":";
	ret += seconds<10?("0"+seconds):seconds;
	return ret;
}

function isValidIP(ip) {  
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;  
    if (reSpaceCheck.test(ip)) {  
        ip.match(reSpaceCheck);  
        if (RegExp.$1<=255&&RegExp.$1>=0  
          &&RegExp.$2<=255&&RegExp.$2>=0  
          &&RegExp.$3<=255&&RegExp.$3>=0  
          &&RegExp.$4<=255&&RegExp.$4>=0)  
        {  
            return true;   
        }
        else{  
            return false;  
        }  
    }
    else{  
        return false;  
    }  
}  