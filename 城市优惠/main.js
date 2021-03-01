import Vue from 'vue'
import App from './App'
import interfaces from './interfaces/index';
import proxy from './utils/request';

let pro = proxy(uni.request, interfaces);
console.log(pro);
Object.keys(pro).forEach(key => {
    Vue.prototype[key] = pro[key];
})
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
