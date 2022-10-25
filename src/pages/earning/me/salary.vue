<!-- 薪资排行 -->
<template>
    <view>
        <u-tabs
            style="background-image: #ffffff"
            :list="list1"
            @click="ChangeClickTabs"
        ></u-tabs>

        <view class="contaier" style="background-color: #ffffff">
            <view class="top_bg">
                <view class="one_box">
                    <!-- 第二名 -->
                    <view class="top3">
                        <view class="num_two">
                            <!-- <image class="huangguan2" src="@/static/rank/two.png"></image> -->
                            <image
                                class="top3_head"
                                :src="perviewUrl + topData2.avatar"
                            ></image>
                            <!-- <view class="top_name">{{twoName}}</view> -->
                            <view class="top_name">{{
                                topData2.phone | phone
                            }}</view>
                            <view class="top_sy"
                                >{{ topData2.nickname }}*{{ topData2.income
                                }}<span>元</span></view
                            >
                        </view>
                    </view>

                    <!-- 第一名 -->
                    <view class="top3">
                        <view class="num_one">
                            <!-- <image class="huangguan1" src="@/static/rank/one.png"></image> -->
                            <image
                                class="top3_head"
                                :src="perviewUrl + topData1.avatar"
                            ></image>
                            <!-- <view class="top_name">{{twoName}}</view> -->
                            <view class="top_name">{{
                                topData1.phone | phone
                            }}</view>
                            <view class="top_sy"
                                >{{ topData1.nickname }}*{{ topData1.income
                                }}<span>元</span></view
                            >
                        </view>
                    </view>

                    <!-- 第三名 -->
                    <view class="top3">
                        <view class="num_three">
                            <image
                                class="top3_head"
                                :src="perviewUrl + topData3.avatar"
                            ></image>
                            <!-- <view class="top_name">{{twoName}}</view> -->
                            <view class="top_name">{{
                                topData3.phone | phone
                            }}</view>
                            <view class="top_sy"
                                >{{ topData3.nickname }}*{{ topData3.income
                                }}<span>元</span></view
                            >
                        </view>
                    </view>
                </view>

                <view class="number_sy_box">
                    <view class="number_sy_box_title">
                        <text>统计</text>
                        <text
                            style="
                                position: absolute;
                                right: 20rpx;
                                z-index: 9999;
                                font-size: 24rpx;
                                color: #c3c3c3;
                            "
                        >
                            截止：{{ nowTime }}
                        </text>
                    </view>
                    <view class="number_sy_main">
                        <view
                            style="
                                width: 50%;
                                text-align: center;
                                border-right: 1px solid #eee;
                            "
                        >
                            <view class="number_num1">{{ income }}元</view>
                            <view class="danwei">评价佣金</view>
                        </view>
                        <view
                            style="
                                width: 50%;
                                text-align: center;
                                z-index: 9999;
                            "
                        >
                            <view class="number_num2">{{ volum * 100 }}%</view>
                            <view class="danwei">任务完成率</view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="rankList_box">
                <view
                    class="rankItem"
                    v-for="(item, index) in rankList"
                    :key="index"
                >
                    <view class="rankIndex">
                        <text>{{ index + 4 }}</text>
                    </view>
                    <view class="HeardBox">
                        <image
                            class="rankHeard"
                            :src="perviewUrl + item.avatar"
                        ></image>
                    </view>

                    <view class="NameBox">
                        <view class="userName text-bold">{{
                            item.phone | phone
                        }}</view>
                        <view class="userPost text-gray"></view>
                        <view class="color_ccc"
                            >{{ item.nickname }}|
                            <text class="text-blue">{{ item.income }}</text
                            >元</view
                        >
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getSalary } from '@/api/index.js'
import config from '@/config.js'
export default {
    data() {
        return {
            perviewUrl: config.perviewUrl,
            list1: [
                {
                    name: '日榜',
                    value: 'day',
                },
                {
                    name: '周榜',
                    value: 'week',
                },
                {
                    name: '月榜',
                    value: 'mouth',
                },
                {
                    name: '季榜',
                    value: 'quarter',
                },
            ],
            income: undefined,
            volum: undefined,
            topList: [],
            rankList: [
                {
                    headimgurl: 'http://cdn.zhoukaiwen.com/head4.jpg',
                    name: '张 *',
                    post: '',
                    city: '深圳',
                    salary: '17500',
                },
            ],
        }
    },
    onLoad() {
        this.getTime()
        this.ChangeClickTabs(this.list1[2])
    },
    computed: {
        topData1: function () {
            return this.topList[0] || {}
        },
        topData2: function () {
            return this.topList[1] || {}
        },
        topData3: function () {
            return this.topList[2] || {}
        },
    },
    methods: {
        // 切换榜单
        ChangeClickTabs(e) {
            getSalary({ between: e.value }).then((r) => {
                this.income = r.data.income
                this.volum = r.data.p
                this.rankList = r.data.data.splice(3)
                this.topList = r.data.data
                console.log(this.rankList, this.topList)
            })
        },
        getTime: function () {
            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate()

            var timer = year + '-' + month + '-' + day
            this.nowTime = timer
            console.log(this.nowTime)
        },
    },
    filters: {},
}
</script>

<style lang="scss">
.top_bg {
    width: 750rpx;
    height: 650rpx;
    background: url(http://cdn.zhoukaiwen.com/rank_bg.png) no-repeat;
    background-size: 750rpx;
    position: relative;
}

.one_box {
    width: 750rpx;
    height: 260rpx;
    position: absolute;
    left: 0;
    bottom: 110rpx;
    display: flex;
    justify-content: space-around;
}

.one_box .top3 {
    width: 210rpx;
    height: 280rpx;
}

.top_name {
    width: 100%;
    height: 55rpx;
    line-height: 60rpx;
    color: #f2f2f2;
    font-size: 26rpx;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.top_sy {
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.top_sy span {
    font-size: 20rpx !important;
}

.num_one {
    position: relative;
}

.huangguan1 {
    width: 60px;
    height: 60px;
    position: absolute;
    right: -10rpx;
    top: -18 * 2rpx;
}

.num_one .top3_head {
    width: 150rpx;
    height: 150rpx;
    border-radius: 100%;
    margin: 15rpx 0 0 30rpx;
    border: 4rpx solid #ffdd3c;
}

.num_two {
    position: relative;
}

.huangguan2 {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    right: 15rpx;
}

.num_two .top3_head {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
    margin: 45rpx 0 0 45rpx;
    border: 4rpx solid #bcdcdf;
}

.num_three {
    position: relative;
}

.huangguan2 {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    right: 15rpx;
}

.num_three .top3_head {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
    margin: 45rpx 0 0 45rpx;
    border: 4rpx solid #e29d85;
}

// 第二块
.number_sy_box {
    width: 600rpx;
    height: 210rpx;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20rpx;
    bottom: -185rpx;

    z-index: 999;
    padding: 22rpx;
    box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1);
}

.number_sy_box_title {
    color: #888888;
    // font-weight: 500;
    font-size: 28rpx;
    display: flex;
    z-index: 9999;
    justify-content: space-between;
}

.number_sy_main {
    width: 100%;
    height: 124rpx;
    padding-top: 20rpx;
    line-height: 52rpx;
    // background: red;
    display: flex;
    justify-content: space-around;
    position: relative;
}

.xiaoding_bg {
    position: absolute;
    right: -22rpx;
    bottom: -30rpx;
    width: 180rpx;
}

.number_num1 {
    font-size: 40rpx;
    font-weight: 500;
    color: #2fc04f;
}

.number_num2 {
    font-size: 40rpx;
    font-weight: 500;
    color: #4bac7f;
}

.danwei {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 26rpx;
    color: #c9c9c9;
}

// 列表
.rankList_box {
    width: 750rpx;
    min-height: 200rpx;
    margin-top: 200rpx;
}

.rankItem:last-child {
    border: none;
}

.rankItem {
    width: 700rpx;
    height: 140rpx;
    margin: 0px auto;
    border-bottom: 1px solid #e9e9e9;
}

.rankIndex {
    width: 60rpx;
    height: 140rpx;
    line-height: 140rpx;
    text-align: center;
    color: #cccccc;
    font-size: 40rpx;
    float: left;
}

.HeardBox {
    width: 100rpx;
    height: 100rpx;
    margin: 20rpx;
    border-radius: 100%;
    overflow: hidden;
    float: left;
    margin-right: 25rpx;
    margin-left: 10rpx !important;
}

.HeardBox image {
    width: 100%;
    height: 100%;
}

.NameBox {
    width: 400rpx;
    height: 140rpx;
    float: left;
    padding-top: 10rpx;
    box-sizing: border-box;
}

.NameBox view {
    height: 50rpx;
    line-height: 70rpx;
}

.userName {
    min-width: 90rpx;
    font-size: 30rpx;
    float: left;
    margin-right: 20rpx;
}

.download_box {
    width: 80rpx;
    height: 140rpx;
    // background-color: red;
    float: right;
}

.download_box image {
    width: 45rpx;
    margin: 50rpx auto;
    display: block;
}
</style>
