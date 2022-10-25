
// 微信登陆
export const uniLogin = (loginType = 'weixin') => {

  return new Promise((resolve, reject) => {
    uni.login({
      provider: loginType,
      success: (loginRes) => {
        resolve(loginRes)
      },
      fail: error => {
        reject(error)
      }
    });
  })
}
export const urlEncode = (obj) => {
  try {
    let KeysObj = Object.keys(obj);

    let params = KeysObj.map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&')
    return params
  } catch (error) {
    return ''
  }
}
export const permission = (menu, url) => {
  return menu.includes(url.split('&')[0]);
}
// 取范围随机数
export const GetRandomNum = (min, max) => {
  var Range = max - min;
  var Rand = Math.random();
  return (min + Math.round(Rand * Range));
}
/**
 * Created by PanJiaChen on 16/11/18.
 */
//get the parent ids
export const get_tree_parent = (list, value, tree_child = []) => {
  for (let row of list) {
    tree_child.push(row)
    if (row.value == value) {

      return tree_child
    }
    if (row.children) {
      if (get_tree_parent(row.children, value, tree_child)) {
        return tree_child
      }
    }
    tree_child.pop(1)
  }
  return false
}
//打乱随机var Arr = [4,1,67,12,45,121,3];

export const randArr = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    var iRand = parseInt(arr.length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
}
/**
 * 判断变量是否为空，
 * @param  {[type]}  param 变量
 * @return {Boolean}      为空返回true，否则返回false。
 */
export const isEmpty = (param) => {
  if (param) {
    var param_type = typeof (param);
    if (param_type == 'object') {
      //要判断的是【对象】或【数组】或【null】等
      if (typeof (param.length) == 'undefined') {
        if (JSON.stringify(param) == "{}") {
          return true;//空值，空对象
        }
      } else if (param.length == 0) {
        return true;//空值，空数组
      }
    } else if (param_type == 'string') {
      //如果要过滤空格等字符
      var new_param = param.trim();
      if (new_param.length == 0) {
        //空值，例如:带有空格的字符串" "。
        return true;
      }
    } else if (param_type == 'boolean') {
      if (!param) {
        return true;
      }
    } else if (param_type == 'number') {
      if (!param) {
        return true;
      }
    }
    return false;//非空值
  } else {
    //空值,例如：
    //(1)null
    //(2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
    //(3)空字符串''、""。
    //(4)数字0、00等，如果可以只输入0，则需要另外判断。
    return true;
  }
}
export const format_answer = (list) => {
  let a = list.map((e) => {
    //声明一个用户自己的回答的答案集合 A;B
    e.replay = []
    if (e.type == 1 || e.type == 2) {
      let a = e.content.split(';');
      let option = [];
      let answer_key = {};
      //切割标准答案
      for (const item of e.standard.split(',')) {
        answer_key[item] = 1
      }
      for (const item of a) {
        let c = item.substr(0, 1);
        let d = item.substr(2, item.length);
        option.push({ name: c, content: d, active: 0, answer_success: false, answer_err: false, answer_key: 0, answer_key: answer_key[c] ? 1 : 0 })
      }
      e.answer_option = option
      // console.log(option)
    }
    if (e.type == 3) {
      let option = [];
      let answer_key = {};
      for (const item of e.standard.split(',')) {

        option.push({ answer_key: item })
      }
      e.answer_option = option
    }
    return e;
  });
  return a
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export const list_to_tree = (list, parent_id = 0, append_empty_children = false) => {

  var ret = [];


  for (var i in list) {

    if (list[i].pid == parent_id) {
      var temp = list_to_tree(list, list[i].id);

      if (temp.length > 0) {

        list[i].children = temp;

      } else {

        if (append_empty_children) {
          list[i].children = append_empty_children;
        }
      }
      ret.push(list[i]);//把当前项保存到临时数组中
    }
  }
  return ret;//递归结束后返回结果

}
/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/
export function GetDateDiff(startTime, endTime, diffType) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
  startTime = startTime.replace(/-/g, "/");
  endTime = endTime.replace(/-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime);      //开始时间
  var eTime = new Date(endTime);  //结束时间
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}
