import config from '../config';
import auth from './auth/index.js';
import test from './test/index.js'
let collection = [
    auth,
	test
];

function arrangeInterfacesObject () {
    let result = [];
    collection.forEach(obj => {
		console.log(obj)
        // 解构出来域名,对象集合
        let { api, objects } = obj;
        let node_api = '';
		Object.keys(config).forEach(key => {
            if (api === key) {
                node_api = config[key];
            }
        })
        console.log(node_api);
        objects.forEach(item => {
            // 解构出模块名,基本通用的url,接口对象集合
            let { objName, base, interfaces } = item;
			console.log(item)
            // 如果base不为空,拼上
            base = base ? `${base}` : '';
            let node = { objName };
            node['urls'] = interfaces.map(el => {
                let _url = el.url || '';
                // 拼接后的url
                let url = node_api + base + _url;
                let _el = Object.assign({}, el);
                _el.url = url;
                return _el;
            })
            result.push(node);
        });
    })
	console.log(result);
    return result;
}

export default arrangeInterfacesObject();