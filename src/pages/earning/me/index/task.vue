<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">
    </page-meta>
    <view class="app-page">
        <u-navbar title="我的任务管理" :autoBack="false" @leftClick="leftClick" />
        <view :style="{height:CustomBar+'px'}" />

        <u-tabs :current="tabsIndex" :list="tabsCategoryData" @click="tabClick"></u-tabs>
        <u-empty mode="list" v-if="indexList.length===0"  />
        <u-list @scrolltolower="scrolltolower">
            <u-list-item v-for="(item, index) in indexList" :key="index">

                <u-cell :title="`[${index + 1}]`+item.Task.title">
                    <template #label>
                        <view class="flex flex-row between">

                            <!-- <text style="font-size:16rpx">報名時間:{{item.create_time}}</text> -->
                            <text style="font-size:16rpx">金额:{{item.Task.amt/100}}</text>
                        </view>
                    </template>
                    <template #value>
                        <view @click="routeGo('/pages/earning/me/index/saveTask',{task_id:item.task_id})">

                            <text v-if="[0,2].some(e=>e===item.state)" >提交任務材料</text>
                            <text v-else>{{item.stateText}}</text>
                        </view>
                    </template>
                </u-cell>

            </u-list-item>
        </u-list>
       
    </view>
</template>

<script>
import { getMineTask } from "@/api/index.js";
import { urlEncode } from "@/utils/index.js";
export default {
    data() {
        return {
            tabsIndex: 1,
            // 0=进行中,1=待审核,2=待补充,3=已完成,-1=已拒绝
            tabsCategoryData: [
                { name: '进行中', state: 0 },
                { name: '待审核', state: 1 },
                { name: '已完成', state: 3 },
                { name: '已拒绝', state: -1 },
                { name: '待补充', state: 2 },
            ],
            page: {
                index: 1,
                limit: 20,
                state: 0
            },
            indexList: [],
            TaskItemData: {
                cover: 'https://cdn.uviewui.com/uview/album/1.jpg',
                title: '网赚 绝缘子 真空负荷块钱',
                des: '1阿斯蒂芬阿斯蒂芬阿斯蒂芬撒发顺丰三是的发送到阿斯蒂芬是',
                creater: '中国南互电器',
                progress_index: 1,
                progress_count: 100,
                create_time: '2022-07-22 08:12:11'
            },

        }
    },
    onLoad(params) {
        let { tabsIndex } = params
        this.tabsIndex = tabsIndex
        this.page.state = this.tabsCategoryData[tabsIndex].state
        this.loadmore()
    },
    methods: {
        // 详情
        // routeGo(url, params) {
        //     console.log(url);
        //     this.$u.route(url, params)
        // },
        // 点击tab分类 进行中 待审核 已成功 未成功
        tabClick(e) {
            this.page.state = e.state
            this.page.index = 1
            this.loadmore(false)

        },
        // 滚动到底部 加载新的数据
        scrolltolower() {
            this.page.index++
            this.loadmore(true)

            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 5000);
        },
        onPullDownRefresh() {
            this.page.index = 1
            this.loadmore(false);

            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 5000);
        },
        routeGo(url, params) {
            // console.log(url, uni.$u.route(url, params));
            // console.log(url, uni.$u.route('/pages/earning/index/taskPage', params))
                console.log(getCurrentPages());
            uni.navigateTo({
                url: url+'?'+urlEncode(params)
            })
        },
        leftClick() {
          
            uni.switchTab({
                url: '/pages/earning/me/index',
                animationType: 'pop-in',
                animationDuration: 200,
            })
        },
        // 加载新的数据
        loadmore(append = true) {
            let page = JSON.parse(JSON.stringify(this.page))
            page.page = page.index
            getMineTask(page).then(r => {
                if (append) {
                    if (r.count === 0 && page.index != 1) {
                        uni.$u.toast('已经到底了!')
                    }
                    this.indexList = [...this.indexList, ...r.data || []]
                } else {

                    this.indexList = r.data
                }
                uni.stopPullDownRefresh();
            })
        },
    },
}
</script>
