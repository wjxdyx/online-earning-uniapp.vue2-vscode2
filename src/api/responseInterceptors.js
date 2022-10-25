/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
        // 自定义参数
        const custom = response.config?.custom
        if (data.code !== 101) { // 服务端返回的状态码不等于200，则reject()
            uni.$u.
                toast(data.msg)
            if (data.code == -1) {
                // 重新登陆
                uni.navigateTo({
                    url: '/pages/login/login'
                })

            }
            return Promise.reject(data)
        }

        return data || {}
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/

        return Promise.reject(response)
    })
}