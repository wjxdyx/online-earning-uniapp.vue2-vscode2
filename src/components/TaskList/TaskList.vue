<template>
    <uni-list
        class="tasklist"
        style="overflow-y: auto;"
        :style="{ height: height }"
    >
        <uni-list-item v-for="(item, index) in listData" :key="item[id]" class="" >
            <template #body>

                <TaskItem
        
                :value="item"
                class=""
                :key="item[id] + '-item'"
                @click="routeGo('pages/earning/index/taskPage',item[id])"
                ></TaskItem>
            </template>
        </uni-list-item>
    </uni-list>
</template>

<script>
export default {
    props: {
        enableBackToTop: {
            type: [Boolean, String],
            default: false,
        },
        id: {
            type: String,
            default: 'task_id',
        },
        height: {
            type: [String],
            default: '100rpx',
        },
        listData: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    name: 'TaskPage',
    data() {
        return {
            // keyIndex:0,//防止taskitem.vue watch(()=value=>{报错})
            indexList: [],
            TaskItemData: {
                cover: 'https://cdn.uviewui.com/uview/album/1.jpg',
                title: '话费换现金',
                des: '1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬1阿斯蒂芬阿斯蒂芬阿斯蒂芬',
                creater: 'asfasdf',
                progress_index: 1,
                progress_count: 100,
                create_time: '2022-07-22 08:12:11',
            },
        }
    },
    onLoad(params) {},
    created() {
        this.loadmore()
    },
    mounted() {},
    watch: {
  
    },
    methods: {
        routeGo(url, params) {
            // console.log(url,        uni.$u.route('/pages/earning/index/taskPage', params))
    
            uni.navigateTo({
                url:'/pages/earning/index/taskPage?task_id='+params
            })
        },
        // 滚动到底部 加载新的数据
        scrolltolower() {
            // this.loadmore()
        },
        // 加载新的数据
        loadmore() {
            this.indexList = []
            for (let i = 0; i < 10; i++) {
                this.indexList.push({
                    url: i,
                })
            }
        },
    },
}
</script>
<style lang="scss">

</style>
