import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app';
// Vue.prototype.serveipd="http://www.tangtangluosc.cn/ttl";
Vue.prototype.serveipd="http://192.168.0.198:6789/wroot_ck_war_exploded/";
let hei;
uni.getSystemInfo({
	success: function(res) {
		 hei=res.statusBarHeight;
	}
})
Vue.prototype.statusBarHeight = hei
Vue.prototype.statusWindowHeight = hei + 44

const app = new Vue({
  
});

app.$mount()
