// https://www.cnblogs.com/bq-med/p/8796836.html 不记得什么意思了看链接
let getType = (value) => {
	return Object.prototype.toString.call(value).replace(/^\[object\s|\]/g, '');
};

const TYPES = [
	'Number',
	'String',
	'Undefined',
	'Boolean',
	'Object',
	'Function',
	'Symbol',
	'Set',
	'Map',
	'Array',
	'Null'
];

let createMethods = function () {
	let obj = {};
	TYPES.forEach(name => {
		const key = `Is${name}`;
		obj[key] = val => getType(val) === name;
	});
	return obj;
};

export default createMethods();