import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import config from '@/config'

let lifeData = {};

try {
    // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
    lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}
// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['user', 'authorization','test'];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
    // 判断变量名是否在需要存储的数组中
    if (saveStateKeys.indexOf(key) != -1) {
        // 获取本地存储的lifeData对象，将变量添加到对象中
        let tmp = uni.getStorageSync('lifeData');
        // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
        uni.setStorageSync('lifeData', tmp);
    }
}
const store = new Vuex.Store({
    state: {
        // 用户信息
        user:lifeData.user || {
            avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
            phone: '点击绑定参与任务',
            nickname: '未命名',
            username: '未命名',
            historyIncome: 0,
            amt: 0,
            role: [],
        },
        // authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZnJlZS5jbiIsImF1ZCI6Imh0dHA6Ly9mcmVlLmNuIiwiaWF0IjoxNjQ2NjIwNjUxLCJuYmYiOjE2NDY2MjA2NTAsImV4cCI6MTY0NjYyNzg1MSwiZGF0YSI6eyJ1c2VyaWQiOiJ6cSJ9fQ.XvlFcjBjPSLv-5TKxoDKmSA2qZy_C5BP40IOrVBmAIjexbaOGdmpz7FGiHCK703LiA06p4NbVpLtZbgwgn5HBRjTWZyo47a0dd-6dTXUin-5SHRUcOHEqdDnhrwHg72KzgLYjTwDBzdYXrEQak_q0ZZ9YdygIhZN9gJhR3lF_lI'
        authorization:  lifeData.authorization ?lifeData.authorization :'',
        test:'',
        authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VycGdqLmNvbSIsImF1ZCI6Imh0dHA6Ly9lcnBnai5jb20iLCJpYXQiOjE2NjY2NjE4ODEsIm5iZiI6MTY2NjY2MTg4MCwiZXhwIjoxNjY2NzMzODgxLCJkYXRhIjp7InVzZXJuYW1lIjoiIiwibmlja25hbWUiOiJ0ZXN0IiwidG9rZW4iOiJTT1FSdVVMaFVTanV6QzZ3bEVHWm16bjlXVzNmY1hoT1FyZEpmenc1U2IwPSJ9fQ.S0CPfnSVc-aISCgqk_S1zvoypAtL924NG0fEtlITR51P1LYT6gev_hmkCz1WBeuRinXYNW0OZN83RSWR7gcoHSoVeV7xScF5a0yVrCLFobwrlIHSWX1rxZSLnhcU8GwM4KszX1TeWt2sBju7vSzyUQQjE2cXA8As5pRb6G-KAqQ'
    },
    getters: {
        getPhone: state => {
            return state.user.phone
        },
        getNickname: state => {
            return state.user.nickname
        },
        getUsername: state => {
            return state.user.username
        },
        getAvatar: state => {
            return state.user.avatar
        },
        getRole: state => {
            return state.user.role
        },
        getAuthorization: state => {
            return state.authorization
        },
        getUserAmt: state => {
            return state.user.amt
        },
        getUserHistoryIncome: state => {
            return state.user.historyIncome
        },
    },
    mutations: {
        $uStore(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let saveKey = '';
            let len = nameArr.length;
            if (len >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
                saveKey = nameArr[0];
            } else {
                // 单层级变量，在state就是一个普通变量的情况
                state[payload.name] = payload.value;
                saveKey = payload.name;
            }
            // 保存变量到本地，见顶部函数定义
            saveLifeData(saveKey, state[saveKey])
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.baseUrl + '/admin/login/index', //仅为示例，并非真实接口地址。
                    data: data,
                    success: (res) => {
                        if (res.data.code == 101) {
                            uni.$u.vuex('authorization',res.data.token)
                      
                            // this.state.authorization = res.data.token

                            res.data.data.avatar = config.baseUrl + '/admin/upload/image?p=' + res.data.data.avatar
                            uni.$u.vuex('user',res.data.data)
                            resolve(res.data)
                        }
                        reject(res.data)
                    },
                    fail: error => {
                        reject(error)
                    }
                });
            })

        },
        // 修改昵称
        saveUserInfo(data) {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.baseUrl + '/admin/index/saveUserInfo',
                    header: {
                        authorization: this.state.authorization
                    },
                    data: data,
                    success: (res) => {
                        if (res.data.code == 101) {

                            // this.state.user = res.data.data
                            uni.$u.vuex('user',res.data.data)
                            resolve(res.data)
                        }
                        reject(res.data)
                    },
                    fail: error => {
                        reject(error)
                    }
                });
            })
        },
        getMineInfo({ commit }, data) {
            // commit('$uStore', 'asd',2)
      
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.baseUrl + '/admin/index/center',
                    header: {
                        authorization: this.state.authorization
                    },
                    data: data,
                    success: (res) => {

                        if (res.data.code == 101) {
                            res.data.data.avatar = config.baseUrl + '/admin/upload/image?p=' + res.data.data.avatar
                            // this.state.user = res.data.data
                            uni.$u.vuex('user',res.data.data)
                            resolve(res.data)
                        } else {

                            uni.$u.toast(res.data.data)
                            reject(res.data)
                        }
                    },
                    fail: error => {
                        console.log(error);
                        reject(error)
                    }
                });
            })
        },
        getPhoneNumber({ commit }, data) {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.baseUrl + '/admin/index/phone',
                    header: {
                        authorization: this.state.authorization
                    },
                    data: data,
                    success: (res) => {
                        if (res.data.code == 101) {
                            // this.state.user.phone = res.data.data
                            uni.$u.vuex('user.phone',res.data.data)
                            resolve(res.data)
                        } else {

                            uni.$u.toast(res.data.data)
                            reject(res.data)
                        }
                    },
                    fail: error => {
                        // console.log(error);
                        reject(error)
                    }
                });
            })
        }
    }
})

export default store
