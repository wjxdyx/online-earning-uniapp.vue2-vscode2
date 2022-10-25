<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">

    </page-meta>
    <view class="page-main app-pag">
        <u-navbar title="任务材料" :autoBack="false" @leftClick="leftClick" fixed />
        <view :style="{height:CustomBar+'px'}" />

        <view class="flex flex-row between ">
            <u-tag :text="formData.Task?formData.Task.title:'----'" class="w-80 "></u-tag>
            <u-tag :text="formData.stateText" type="warning"></u-tag>

        </view>
        <view>
            <text style="font-size:20rpx">[佣金]:{{formData.Task?formData.Task.amt:'----'}}</text>
        </view>
        <view style="border-top: 2px solid blue;margin:10rpx 0 10rpx 0">
            <text style="font-size:30rpx">任务材料</text>
        </view>
        <view class="p-10">

            <u-upload width="200" height="200" :previewFullImage="true" :fileList="fileList1" @afterRead="afterRead"
                @delete="deletePic" name="1" multiple :maxCount="10" :deletable="isEdit">
            </u-upload>
        </view>

        <view class="data-footer-fixed" style="padding:10rpx" v-if="isEdit">

            <u-button text="提交" @click="clickSumbit"></u-button>
        </view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config'
//  #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
//  #endif
import { uploadFile, saveMineTask, getMineTaskDetail } from "@/api/index.js";
export default {
    components: {},
    props: {

    },
    data() {
        return {
            task_id: undefined,
            tabBarHeight: undefined,
            iStatusBarHeight: undefined,
            fileList1: [],
            formData: {

            },
        };
    },

    mounted() {
        uni.$u.getRect('#tabs-sports').then((res) => {
            console.log(res);
        });
    },
    onLoad: function (params) {
        this.task_id = params['task_id']
        getMineTaskDetail({ task_id: this.task_id }).then(r => {
            this.formData = r.data
            let content = JSON.parse(r.data.content)
            if (content) {

                this.fileList1 = content.map(e => {
                    return { url: config.perviewUrl + e.path, path: e.path };
                })


            }

        })
    },
    created() {
        // uni.hideTabBar();
        let _this = this;

       
    },
    computed: {
        ...mapGetters(['getAuthorization']),
        isEdit: function () {
            return [0, 2].some(e => e === this.formData.state)
        }
    },
    watch: {
        currentLessonGroup: function () { },

    },
    methods: {
        leftClick() {
            uni.navigateBack()
       
        },
        // 删除图片
        deletePic(event) {
            this[`fileList${event.name}`].splice(event.index, 1)
        },
        // 新增图片
        async afterRead(event) {
            // console.log(event);
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file)
            // let fileListLen = this[`fileList${event.name}`].length
            // lists.map((item) => {
            //     this[`fileList${event.name}`].push({
            //         ...item,
            //         status: 'uploading',
            //         message: '上传中'
            //     })
            // })
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url)
                // let item = this[`fileList${event.name}`][fileListLen]
                // this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
                //     status: 'success',
                //     message: '',
                //     url: result
                // }))
                // fileListLen++
            }
        },
        uploadFilePromise(url) {

            uploadFile(url, 'task', {}, { authorization: this.getAuthorization }).then(r => {
                this.fileList1.push({ path: r.data, url: config.perviewUrl + r.data })
            })
        },
        // 
        clickSumbit() {
            if (!this.isEdit) {
                uni.$u.toast('已提交过，请勿重复提交')
                return
            }
            let images = JSON.parse(JSON.stringify(this.fileList1));

            saveMineTask({ task_id: this.task_id, content: JSON.stringify(images) }).then(r => {
                uni.$u.toast(r.msg)
                console.log(r);
                this.formData.state = 1
                this.$forceUpdate()
            }).catch(r => {
                uni.$u.toast(r.msg)

            })
        },


    },
};
</script>

<style lang="scss" scoped>
$leftMenuWidht: 140rpx;

.app {
    width: 750rpx;
}

.tabs-sports {
    box-shadow: 0px 3px 5px -2px #e1e1e1;
}

.formData {
    &-prep-name {
        padding-left: 20rpx;

        border-bottom: 1px solid #eee;
    }

    &-lesson-group_label {
        border: 1px solid #03a9f4;
        // background: #03a9f4;
        border-radius: 5px;
        padding: 0 8px;
        height: 30px;
        width: 200rpx;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: flex-start;

        &-text {
            // color: #fff;
            padding-left: 8px;
            font-size: 12px;
        }
    }
}

// 动作图集
.sports {
    display: flex;
    flex-direction: row;
    margin-top: 10rpx;
    overflow-x: auto;
    padding: 0 15rpx;
}

// 分类里的图片
.sports-image {
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 120rpx;
    padding: 5rpx;
}

.w-check-btn {
    border: 1px solid #fff;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    border-radius: 1000px;
    height: 30px;
    margin-left: 5rpx;
    padding: 0 30rpx;
    color: #000;
}

// 菜单下的动作集
.filter-left {
    width: var($leftMenuWidht);
    font-size: 10px;
    box-shadow: 5px 0px 5px -2px #e1e1e1;

    &-item {
        padding: 15rpx;
        border-bottom: 1px solid #eee;
        cursor: pointer;
    }
}

.filter-main {
    display: flex;
    flex-direction: row;
    padding: 10rpx;
    // margin-left: 140rpx;
    min-height: 300rpx;
    width: 610rpx;

    &-header {
        padding: 10rpx;
    }

    &-content {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        flex-wrap: wrap;
    }
}
</style>
