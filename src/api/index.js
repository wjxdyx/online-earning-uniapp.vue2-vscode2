// 引入配置
import config from '@/config'
const { http } = uni.$u
// 获取菜单
// export const fetchMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
// 微信登陆
export const login = (params, config = {}) => http.post('/admin/login/index', params, config)
// 微信获取手机号
export const getPhone = (params, config = {}) => http.post('/admin/index/phone', params, config)
export const getCateogry = (params, config = {}) => http.post('/earn/category/index', params, config)
export const getTaskList = (params, config = {}) => http.post('/earn/index/tasklist', params, config)
export const getTaskPage = (params, config = {}) => http.get('/earn/index/task', {params}, config)
// 个人中心//已用store.getMineInfo 替代
export const getMineCenter = (params, config = {}) => http.get('/admin/index/center', {params}, config)
// 接取任务
export const getTakeTask = (params, config = {}) => http.get('/earn/index/takeTask', {params}, config)
// 我的任务
export const getMineTask = (params, config = {}) => http.get('/earn/index/userTaskList', {params}, config)
// 我的某一个任务详细
export const getMineTaskDetail = (params, config = {}) => http.get('/earn/index/userTask', {params}, config)
// 提交我我的任务材料
export const saveMineTask = (params, config = {}) => http.post('/earn/index/takeTaskContent', params, config)
// 发布任务
export const publicTask = (params) => http.post('/earn/index/createTask', params)
// 立即提现
export const getWithdrawal = (params) => http.post('/admin/index/withdrawal', params)
// 往来明细
export const getWalletRevExp = (params) => http.post('/admin/index/wallet', params)
// 获取验证码
export const getVerifyCode = (params) => http.post('/admin/login/sms', params)
//注册账户
export const regAcc = (params) => http.post('/admin/login/reg', params)
//重置密码
export const forgetPwd = (params) => http.post('/admin/login/forget', params)
//排行榜
export const getSalary = (params) => http.post('/earn/index/salary', params)

// 文件上传
export const uploadFile = (filePath,fileName='avatar',formData={},header={}) => {

    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: config.baseUrl+'/admin/upload/'+fileName, 
            filePath: filePath,
            header:header,
            name: fileName,
            formData: formData,
            success: (uploadFileRes) => {
                uploadFileRes.data = JSON.parse(uploadFileRes.data)
                resolve(uploadFileRes.data)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
}
// 文件上传
export const upSumbit = (url,filePath,fileName='avatar',formData={},header={}) => {

    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: config.baseUrl+url, 
            filePath: filePath,
            header:header,
            name: fileName,
            formData: formData,
            success: (uploadFileRes) => {
                uploadFileRes.data = JSON.parse(uploadFileRes.data)
                resolve(uploadFileRes.data)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
}