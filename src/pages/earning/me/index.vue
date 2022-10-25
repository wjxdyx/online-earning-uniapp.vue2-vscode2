<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">
        <navigation-bar front-color="#000000" background-color="#fbeec4" />
    </page-meta>
    <view class="page-main app-page">
        <MineHeader></MineHeader>
        <!-- 提现信息 -->
        <view class="page-main flex flex-row between flex-center"
            style="background: #f7dc4f; padding: 10px; border-radius: 5px">
           
            <view class="flex-center  flex flex-col">
                <text style="font-size: 12px">累计任务收益</text>
                <text style="font-weight: bold; font-size: 12px">¥{{user.historyWithdraw/100}}</text>
            </view>
            <view class="flex-center  flex flex-col">
                <text style="font-size: 12px">累计提现</text>
                <text style="font-weight: bold; font-size: 12px">¥{{ user.historyWithdraw/100}}</text>
            </view>

            <view class="flex-center " >
                <u-tag text="余额明细" color="#000" borderColor="#000" plain shape="circle" @click="routeGo('/pages/earning/me/wallet/index')">
                </u-tag>
            </view>
            <view class="flex-center" >
                <u-tag text="立即提现" color="#000" plain shape="circle" bgColor="#fff" borderColor="#fff"  @click="routeGo('/pages/earning/me/wallet/withdraw')">
                </u-tag>
            </view>
        </view>

        <!-- 我完成的任务 -->
        <view class="page-main box" style="margin-top: 10px; padding: 5px 15px 5px 15px">
            <!-- header -->
            <view class="flex-row between flex-center" style=" height: 30px;
                    margin-bottom: 8px;
                    border-bottom: 1px solid #eee;
                ">
                <text style="font-weight: bold">任务详情</text>
                <view class="flex-row flex-center font-color-value" @click="routeGo('/pages/earning/me/mytask/index')">
                    <text class="font-color-value" style="font-size: 12px; font-weight: bold">查看全部</text>
                    <u-icon name="arrow-right" size="14"></u-icon>
                </view>
            </view>
            <view class="flex-row between flex-center">
                <CBadge @click.stop="
                    routeGo('/pages/earning/me/index/task', { tabsIndex: 0 })
                ">
                </CBadge>
                <CBadge @click.stop="
                    routeGo('/pages/earning/me/index/task', { tabsIndex: 1 })
                " title="待审核">
                </CBadge>
                <CBadge @click.stop="
                    routeGo('/pages/earning/me/index/task', { tabsIndex: 2 })
                " title="已成功">
                </CBadge>
                <CBadge @click.stop="
                    routeGo('/pages/earning/me/index/task', { tabsIndex: 3 })
                " title="未成功">
                </CBadge>
            </view>
        </view>
        <!-- 我完成的任务 -->
        <view class="page-main box" style="margin-top: 10px; padding: 5px 15px 5px 15px">
            <!-- header -->
            <view class="flex-row between flex-center" style="    height: 30px;
                    margin-bottom: 8px;
                    border-bottom: 1px solid #eee;
                ">
                <text style="font-weight: bold">排行榜</text>
            </view>
            <view class="flex-row between flex-center">
                <CBadge :show-badge="false" @click.stop="routeGo('/pages/earning/me/salary', { tabsIndex: 0 })"
                    title="未成功">
                </CBadge>
                <CBadge :show-badge="false" @click.stop="routeGo('/pages/earning/me/salary', { tabsIndex: 1 })"
                    title="周榜">
                </CBadge>
                <CBadge :show-badge="false" @click.stop="routeGo('/pages/earning/me/salary', { tabsIndex: 2 })"
                    title="月榜">
                </CBadge>
                <CBadge :show-badge="false" @click.stop="routeGo('/pages/earning/me/salary', { tabsIndex: 3 })"
                    title="季榜">
                </CBadge>
            </view>
        </view>

        <!-- 我发布的任务 -->

        <view class="page-main box" style="margin-top: 10px; padding: 10px">
            <!-- header -->
            <view class="flex-row between flex-center" @click="routeGo('/pages/earning/me/index/takeTask')">
                <text style="font-weight: bold">我发布的任务</text>
                <view class="flex-row flex-center font-color-value">
                    <text class="font-color-value" style="font-size: 12px; font-weight: bold">发布/管理任务</text>
                    <u-icon name="arrow-right" size="14"></u-icon>
                </view>
            </view>
        </view>

        <view class="page-main box" style="margin-top: 10px; padding: 10px">
            <!-- header -->
            <view class="flex-row between flex-center" @click="routeGo('/pages/earning/me/feedback')">
                <text style="font-weight: bold">问题反馈</text>
                <view class="flex-row flex-center font-color-value">
                    <u-icon name="arrow-right" size="14"></u-icon>
                </view>
            </view>
        </view>
 
        <view class="page-main box" style="margin-top: 10px; padding: 10px">
            <!-- header -->
            <view class="flex-row between flex-center" @click="routeGo('/pages/earning/me/medal')">
                <text style="font-weight: bold">加入会员</text>
                <view class="flex-row flex-center font-color-value">
                    <u-icon name="arrow-right" size="14"></u-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import config from '@/config'
import { mapGetters } from 'vuex'
import CBadge from './index/CBadge'
import MineHeader from './index/mineHeader'
import { getPhone, uploadFile } from '@/api/index'
import { urlEncode } from "@/utils/index.js";
export default {
    components: { CBadge, MineHeader },
    data() {
        return {
            baseUrl: config.baseUrl,
        }
    },
    onLoad() {
        console.log(this.CustomBar,this.StatusBar)
    },
    onReady() {
        this.$nextTick(() => {
            console.log(this.$refs.PhoneRef)
        })
    },
    computed: {
        ...mapGetters(['getPhone', 'getNickname', 'getAvatar', 'getRole', 'getUserAmt', 'getUserHistoryIncome']),
    },
    mounted() {
     
    },
    watch: {
        getAvatar: function (newVal) {
            console.log(newVal, 'change,nickname')
            this.$forceUpdate()
        },
    },
    methods: {
        routeGo(url, params) {
            // console.log(url, uni.$u.route(url, params));
            // console.log(url, uni.$u.route('/pages/earning/index/taskPage', params))
            console.log(url, params);

            uni.navigateTo({
                url: url + '?' + urlEncode(params)
            })
        },
        setChangeNickname(e) {
            console.log(e, this.getNickname)
            this.$store
                .dispatch('saveUserInfo', { nickname: e.detail.value })
                .then((r) => {
                    console.log(r, 'nuve')
                })
        },
        // 绑定手机号
        getPhoneNumber(e) {
            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                this.$store.dispatch('getPhoneNumber', e.detail).then((r) => { })
            }
        },
        onChooseAvatar(e) {
            const { avatarUrl } = e.detail
            this.avatarUrl = avatarUrl
            console.log(avatarUrl, e)
            this.$forceUpdate()
            uploadFile(
                avatarUrl,
                'avatar',
                {},
                {
                    authorization: this.$store.state.authorization,
                }
            ).then((r) => {
                console.log(r)
            })
        },
    },
}
</script>

<style lang="scss">
c-badge {
    .u-badge--not-dot {
        position: absolute;
        right: -5px;
        top: -5px;
        padding: 5px !important;
    }
}

.avatar-wrapper {
    background: #ffffff00;
    border: initial;
    box-shadow: initial;
    padding: 0px;
}

.avatar-wrapper::after {
    border: 0px;
    padding: 0px;
}

.user-phone {
    font-size: 12px;
    background-color: initial;
    text-align: left;
    padding: 0;
}

.user-phone::after {
    border: 0px;
}

.weui-input {
    min-width: 10px;
    width: 100px;
}
</style>
