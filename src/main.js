import Vue from 'vue';
import App from './App';

App.mpType = 'app';


// 引入全局uView
import uView from 'uview-ui';

Vue.use(uView);
uni.$u.config.unit = 'rpx'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

Vue.prototype.$store = store

Vue.config.productionTip = false;

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';
import Json from './Json' //测试用数据
const msg = (title, icon = 'none', duration = 1500, mask = false) => {
	// 全局统一提示
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const loading = (statu, title = '加载中') => {
	// Loading
	if (Boolean(statu) === false) {
		uni.hideLoading();
	} else {
		uni.showLoading({
			title
		});
	}
}

const json = type => {
	// 模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}
Vue.filter('phone', function (value) {
	if (!value) return '';
	let str = value;
	str = str.replace(new RegExp("[^0-9]+", "g"), "")
	if (str.length == 11) {
		str = str.toString().replace(/(\d{3})\d*(\d{3})/, '$1*****$2')
	} else {
		str = str.toString().replace(/(\d{3})\d*(\d{3})/, '$1******$2')
	}
	return str;
})
Vue.prototype.$api = {
	msg,
	json,
	loading
}
// VueI18n
Vue.use(VueI18n);
const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
});

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;
uni.getSystemInfo({
	success: function (e) {
		// #ifndef MP
		Vue.prototype.StatusBar = e.statusBarHeight
		if (e.platform == 'android') {
			Vue.prototype.CustomBar = e.statusBarHeight + 50
		} else {
			Vue.prototype.CustomBar = e.statusBarHeight + 45
		}
		// #endif
		// #ifdef MP-WEIXIN
		Vue.prototype.StatusBar = e.statusBarHeight
		let custom = wx.getMenuButtonBoundingClientRect()
		Vue.prototype.Custom = custom
		Vue.prototype.CustomBar =
			custom.bottom + custom.top - e.statusBarHeight
		// #endif
		// #ifdef MP-ALIPAY
		Vue.prototype.StatusBar = e.statusBarHeight
		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
		// #endif
	},
})
const app = new Vue({
	i18n,
	store,
	...App
});

// 引入请求封装
require('@/api/request.js')(app)

app.$mount();
// 获取微信openid
// 小程序特有的样式
/* #ifdef MP */
import { uniLogin } from '@/utils/index';
uniLogin().then(r => {
	return app.$store.dispatch("login", { code: r.code, type: 'wx' })

}).then(r => {
	console.log(r, 333);
})
/* #endif */
