import Type from './dataType';

/**
 * 用实际的参数替换占位符
 * @param {String} url 请求接口路径
 * @param {String || Number || Array} param url的参数
 * @param {RegExp} reg reg 正则规则
 * @return {String} url参数替换之后的结果 
 */
function replaceUrlPlaceholder (url, param, reg) {
    let _P = param;
    if (_P && !Type.isArray(_p)) {
        _P = [_P];
    }
    _P.forEach(item => {
        url = url.replace(reg, item);
    })
    return url;
}

export default function create (request, interfaces) {
    let result = {};
    // 循环所有模块
    interfaces.forEach(item => {
        let obj = {};
        // 循环模块下接口集合
        item.urls.forEach(el => {
            // 将调用接口的方法绑定到模块下，用接口的id做为key
            obj[el.id] = function(urlP, data) {
                let { url , method } = el;
                let reg = new RegExp(/\{.+?}/);
                // 如果url上没占位符或者第一个参数是一个JSON对象，则认为第一个参数就是请求的参数
                if (!reg.test(url) || Type.IsObject(urlP)) {
                    data = urlP;
                } else {
                    // 用第一个参数替换url上的占位符
                    url = replaceUrlPlaceholder(url, urlP, reg);
                }
                // 删掉url上所有的占位符，防止出错
                url = url.replace(new RegExp(/\/\{.+?}/), '');
                // 基本的请求参数
                let requestParam = {
                    url,
                    data,
                    method: method ? method.toUpperCase() : 'GET'
                };
                // 获取其他配置
                ['header', 'dataType', 'responseType'].forEach(key => {
                    if(el.hasOwnProperty(key)) {
                        requestParam[key] = el[key];

                    }
                })
                // 返回promise对象
                return new Promise((resolve, reject) => {
                    request({
                        ...requestParam,
                        success: res => {
                            resolve(res);
                        },
                        fail: err => {
                            reject(err);
                        }
                    })
                })
            }
        })
        // 每个模块下包含的接口
        result[`$${item.objName}`] = obj;
    })
    return result;
}