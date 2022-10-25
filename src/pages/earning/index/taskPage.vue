<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">
        <navigation-bar front-color="#000000" background-color="#fbeec4" />
    </page-meta>
    <view class="app-page">
        <u-navbar title="详情" :autoBack="true" fixed />
        <view :style="{height:CustomBar+'px'}">
       
        </view>

        <!-- header -->
        <view class="page-main">
            <!-- title -->
            <view class="flex-row between flex-center">
                <text style="font-size: 36rpx; font-weight: bold">{{ pageData.title }}</text>
                <text style=" font-size: 28rpx;font-weight: bold;color: #f56c6c;">¥{{ pageData.amt / 100 }}/次</text>
            </view>
            <!-- 工资收益 -->
            <view style="margin-top: 10rpx" class="flex-row between ">
                <view>
                    <text style="font-size: 12px" class="font-color-value">任务审核方:{{ pageData.task_nickname }}</text>
                </view>
              
            </view>
            <!-- 标签描述 -->
            <view style="margin-top: 10rpx" class="">
                <view style="margin-right: 10rpx" class="flex-row between flex-center">
                    <view style="margin-right: 10rpx" v-for="item in pageData['tags']" :key="item">
                        <u-tag :text="item" size="mini" plain type="error"></u-tag>
                    </view>
                    <text style="font-size: 12px" class="font-color-value">人气:{{ pageData.browse_count }}</text>
                </view>
            </view>
        </view>
        <u-gap height="5" bgColor="#eee"></u-gap>

        <!-- 详细内容 -->
        <view class="page-main" style="padding-top: 10rpx; width: 100%; font-size: 24rpx">
            <view class="flex flex-row between" style="padding: 15rpx 0 15rpx 0">
                <!-- <u-avatar-group :urls="urls" size="16" gap="0.4"></u-avatar-group> -->
                <text class="font-color-value" style="font-size: 18rpx">报名人数:{{ pageData.apply_count }}</text>
                <text class="font-color-value" style="font-size: 18rpx">完成数:{{ pageData.finish_count }}</text>
                <text class="font-color-value" style="font-size: 18rpx">总数:{{ pageData.task_count }}</text>
            </view>
            <u-gap height="1" bgColor="#3c9cff"></u-gap>
            <text style="font-weight: bold; margin-top: 20rpx" @click="handleClick">任务详情</text>
            <!-- <view class="read-more" :class="{noReadMore:showReadMore}">

                </view> -->

            <u-parse :content="pageData.content" style="margin-top: 20rpx" @load="load"></u-parse>
        </view>
        <!-- 相关推荐 -->
        <!-- <view class="page-main" style="padding-top: 10rpx; width: 100%; font-size: 24rpx">
            <text style="font-weight: bold; margin-top: 20rpx" @click="handleClick">相关推荐</text>
            <view> 

                <TaskItem v-model="TaskItemData" style="border-bottom:1px solid red"></TaskItem>
             
            </view>
        </view> -->

        <view class="page-main data-footer-fixed" @click="clickTake" style="
                background: #6565d9;
                height: 100rpx;
                display: flex;
                align-content: center;
                align-items: center;
                justify-content: center;
                color: aliceblue;
            ">
            <text>接任务</text>
        </view>
    </view>
</template>

<script>
import { getTaskPage, getTakeTask } from '@/api/index.js'
let _this
export default {
    name: 'TaskPage',
    data() {
        return {
            showReadMore: false,
            task_id: undefined,
            tabBarHeight: undefined,
            iStatusBarHeight: undefined,
            pageData: {},
            TaskItemData: {
                cover: 'https://cdn.uviewui.com/uview/album/1.jpg',
                title: 'sadfasdf',
                des: '1阿斯蒂芬阿斯蒂芬阿斯蒂芬撒发顺丰三是的发送到阿斯蒂芬是',
                creater: 'asdfasdf',
                progress_index: 1,
                progress_count: 100,
                create_time: '2022-07-22 08:12:11',
            },

        }
    },
    onLoad(params) {
        _this = this

   
        this.task_id = params['task_id']
        getTaskPage(params).then((r) => {
            if(!r.data['tags']){
                r.data['tags']=[]
            }else{

                r.data['tags'] = r.data['tags'].split(',')
            }
            this.pageData = r.data
        })
    },
    mounted() { },
    methods: {
        clickTake() {
            getTakeTask({ task_id: this.task_id })
                .then((r) => {
                    uni.$u.toast(r.msg)
                })
                .catch((r) => {
                    console.log(r)
                    uni.$u.toast(r.msg)
                })
        },
        handleClick() {
            this.showReadMore = !this.showReadMore
        },
        leftClick(url, params) {
            console.log(url, params, 33333);
            // uni.$u.route({
            // 	url: '/pages/earning/index/index',
            // 	type:'switchTab'
            // })


            uni.switchTab({
                url: '/pages/earning/index/index',
                animationType: 'pop-in',
                animationDuration: 200,
            })
        },
        load() { },
    },
}
</script>
<style lang="scss">
// .page-main {
//     padding: 15px;
// }
// #ifndef APP-PLUS
page {
    width: 750rpx;
    color: var($fontColor);
    background: #fff !important;
}

// #endif
// #ifdef APP-PLUS
.app-page {
    width: 750rpx;
    color: var($fontColor);
    background: #fff !important;
}

// #endif
</style>
