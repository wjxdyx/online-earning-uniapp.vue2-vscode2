<template>
    <view class="forget">
        <view class="content">
            <!-- 主体 -->
            <view class="main">
                <view class="tips">若你忘记了密码，可在此重置新密码。</view>
                <wInput
                    v-model="phoneData"
                    type="text"
                    maxlength="11"
                    placeholder="请输入手机号码"
                ></wInput>
                <wInput
                    v-model="passData"
                    type="password"
                    maxlength="11"
                    placeholder="请输入新密码"
                    isShowPass
                ></wInput>

                <wInput
                    v-model="verCode"
                    type="number"
                    maxlength="4"
                    placeholder="验证码"
                    isShowCode
                    codeText="获取重置码"
                    setTime="30"
                    ref="runCode"
                    @setCode="getVerCode()"
                ></wInput>
            </view>

            <wButton
                class="wbutton"
                text="重置密码"
                :rotate="isRotate"
                @click.native="startRePass()"
            ></wButton>
        </view>
    </view>
</template>

<script>
let _this
import wInput from './components/watch-login/watch-input.vue' //input
import wButton from './components/watch-login/watch-button.vue' //button
import { forgetPwd, getVerifyCode } from '@/api/index.js'

export default {
    data() {
        return {
            phoneData: '', //电话
            passData: '', //密码
            verCode: '', //验证码
            isRotate: false, //是否加载旋转
        }
    },
    components: {
        wInput,
        wButton,
    },
    mounted() {
        _this = this
    },
    methods: {
        getVerCode() {
            //获取验证码
            if (_this.phoneData.length != 11) {
                uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: '手机号不正确',
                })
                return false
            }
            getVerifyCode({ phone: _this.phoneData }).then((r) => {
                _this.$refs.runCode.$emit('runCode') //触发倒计时（一般用于请求成功验证码后调用）
            })

            setTimeout(function () {
                _this.$refs.runCode.$emit('runCode', 0) //假装模拟下需要 终止倒计时
            }, 1000 * 60)
        },
        startRePass() {
            //重置密码
            if (this.isRotate) {
                //判断是否加载中，避免重复点击请求
                return false
            }
            if (this.phoneData.length != 11) {
                uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: '手机号不正确',
                })
                return false
            }
            if (this.passData.length < 6) {
                uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: '密码不正确',
                })
                return false
            }
            if (this.verCode.length != 4) {
                uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: '验证码不正确',
                })
                return false
            }
			_this.isRotate = true
			forgetPwd({phone:this.phoneData,password:this.passData,type:'phone',code:this.verCode}).then(r=>{
				console.log(r);
				_this.isRotate = false
				uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: '重置成功',
                })
			}).catch(r=>{
				_this.isRotate = false
				uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: r.msg,
                })
			})
       
            setTimeout(function () {
                _this.isRotate = false
            }, 3000)
        },
    },
}
</script>

<style>
@import url('./components/watch-login/css/icon.css');
@import url('./components/main.css');
</style>
