<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">
        <navigation-bar front-color="#000000" background-color="#fbeec4" />
    </page-meta>
    <view style="position: relative" class="app-page flex flex-col">
        <u-swiper radius="0" :list="advertiseData" keyName="image" height="400" showTitle border-radius="0"
            imgMode="scaleToFill" :autoplay="true" circular></u-swiper>
        <view class="flex-row" style="height: 100rpx; position: relative">
            <u-tabs  @click="tabClick" :list="list4" lineWidth="20" lineHeight="7" :activeStyle="{
                color: '#303133',
                fontWeight: 'bold',
                transform: 'scale(1.05)',
            }" :inactiveStyle="{
                color: '#606266',
                transform: 'scale(1)',
            }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
            </u-tabs>
        </view>
        <u-empty mode="list" v-if="taskListData.length===0"  />
        <TaskList class="" height="800rpx" :list-data="taskListData"></TaskList>
        <!-- <FooterBar></FooterBar> -->
    </view>
</template>

<script>
import data from '@/api/data.js' //筛选菜单数据
import { getTaskList } from "@/api/index.js";
import config from '@/config'
let _this
export default {
    // components: { WTabbar },
    data() {
        return {
            filterData: [],
            defaultSelected: [],
            taskListData: [],
            list4: [
                {
                    name: '推荐',
                    category_id:1,
                    badge: {
                        isDot: true,
                    },
                },
                { name: '游戏任务' ,category_id:2},
                { name: '应用任务' ,category_id:3 },
            ],
            page: {
                index: 1,
                limit: 20,
                category_id: undefined
            },
            advertiseData: [
                {
                    image: 'https://online-earning.xinliangdou.com/runtime/storage/advert/2.png',
                    title: '每天十分钟、轻松拿钱',
                },
                {
                    image: 'https://online-earning.xinliangdou.com/runtime/storage/advert/1.png',
                    title: '在家就能赚钱',
                },
           
            ],
        }
    },
    onLoad() {
        _this = this

        // this.loadmore(false)

    },
    mounted(){
        // this.loadmore(false)
    },
    created(){
        this.loadmore(false)
    },
    methods: {
        //接收菜单结果
        confirm(e) {
            console.log(e)
        },
        tabClick(e) {
            this.page.category_id = e.category_id
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
        // 加载新的数据
        loadmore(append = true) {
            let page = JSON.parse(JSON.stringify(this.page))
            page.page = page.index
            getTaskList(page).then(r => {
                if(r.data){
                    console.log(r.data);
                    r.data=r.data.map(e=>{
                        e.cover_path=config.perviewUrl +e.cover_path
                        return e
                    })
                }
                if (append) {
                    if (r.count === 0 && page.index != 1) {
                        uni.$u.toast('已经到底了!')
                    }
                    this.taskListData = [...this.taskListData, ...r.data || []]
                } else {
              
                    this.taskListData = r.data
                }
                uni.stopPullDownRefresh();
            })
        },
        change(e) {
            console.log(e)
        },
        click(e) {
            console.log(e)
        },
    },
}
</script>

<style>

</style>
