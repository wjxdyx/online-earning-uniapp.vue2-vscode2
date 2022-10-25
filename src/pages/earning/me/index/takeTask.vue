<template>
    <page-meta background-color="#fbeec4" page-style="color: #1c1c1c" root-font-size="16px">
        <navigation-bar front-color="#000000" background-color="#fbeec4" />
    </page-meta>
    <view class="page-main">
        <navigation-bar front-color="#000000" background-color="#fbeec4" />

        <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
        <u--form labelPosition="left" :model="formData" :rules="rules" ref="form1" labelWidth="200">
            <u-form-item label="行业类目" prop="title" borderBottom ref="title" @click="cateogryVisible=true">
                <!-- <u-select v-model="formData.category_id" :list="categoryData" border="none"></u-select> -->
                <w-select v-model="formData.category_id"  :visible.sync="cateogryVisible" :list="categoryData"></w-select>
                <!-- <u-picker ref="CategoryRef"  placeholder="标题"  :show="cateogryVisible" :columns="categoryData" border="none" keyName="label"  @confirm="changeHandler"></u-picker> -->
            
            </u-form-item>
            <u-form-item label="任务标题" prop="title" borderBottom ref="title">
                <u--input v-model="formData.title" placeholder="标题" border="none"></u--input>
            </u-form-item>
            <u-form-item label="任务数量" prop="task_count" borderBottom ref="task_count">
                <!-- <u--input v-model="formData.task_count" placeholder="任务数" border="none" integer></u--input> -->
                <u-number-box v-model="formData.task_count" inputWidth="100" integer border="none"></u-number-box>

            </u-form-item>
            <!-- <u-form-item label="标签" prop="task_count" borderBottom ref="task_count">
                <u--input v-model="formData.tags" placeholder="标签" border="none"></u--input>
            </u-form-item> -->
            <u-form-item label="任务单价" prop="amt" borderBottom ref="amt">
                <u--input v-model="formData.amt" placeholder="任务结算单价" border="none"></u--input>
                <!-- <u-number-box v-model="formData.amt" inputWidth="100" :asyncChange="true" @change="e=>changeTaskPrice(e)"  decimal-length="1"  border="none"></u-number-box> -->

            </u-form-item>
            <u-form-item label="封面" prop="title" borderBottom ref="title">

                <u-upload width="200" height="200" multiple :previewFullImage="true" :fileList="fileList1" @afterRead="afterRead"
                    @delete="deletePic"  :maxCount="1" :deletable="isEdit">
                </u-upload>
            </u-form-item>
            <u-form-item label="应用下载地址" prop="down_url" borderBottom ref="down_url">
                <u--input v-model="formData.down_url" border="none"></u--input>
            </u-form-item>
            <u-form-item label="任务内容" prop="content" borderBottom ref="content">
                <u--textarea border="surround" v-model="formData.content" placeholder="请输入内容" autoHeight></u--textarea>


            </u-form-item>
        </u--form>

   
        <view v-if="isEdit" class="page-main data-footer-fixed" @click="clickSumbit" style="
                background: #6565d9;
                height: 100rpx;
                display: flex;
                align-content: center;
                align-items: center;
                justify-content: center;
                color: aliceblue;
            ">
            <text>确定发布</text>
        </view>
    </view>
</template>

<script>
import config from '@/config'

import { uploadFile,upSumbit, saveMineTask, getMineTaskDetail, publicTask } from "@/api/index.js";
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            fileList1: [],
            cateogryVisible: false,
            categoryData: [[
                {
                    id: 1,
                    label: '推荐'
                },
                {
                    id: 2,
                    label: '游戏应用'
                },
                {
                    id: 3,
                    label: '应用任务'
                }
            ]],
            formData: {
                category_id: undefined,
                title: '',
                down_url: '',
                content: '',
                tags: ['日结'],
                cover_path: [],
                task_count: 1,
                amt: 0, //单位100
                state: 2,
                lat: 0,
                lng: 0,
            },

            rules: {
                title: {
                    type: 'string',
                    required: true,
                    message: '请填写任务标题',
                    trigger: ['blur', 'change'],
                },
            },
            radio: '',
            switchVal: false,
        }
    },
    computed: {
        ...mapGetters(['getAuthorization']),
        isEdit: function () {
            return [2].some(e => e === this.formData.state)
        }
    },
    created() {
        // this.$refs.CategoryRef.setIndexs(2)
    },
    methods: {
        changeHandler({ value: [e] }) {
            console.log(e);
            this.formData.category_id = e
        },
        changeTaskPrice({ value }) {
            setTimeout(() => {
                this.formData.amt = value
                this.$forceUpdate()
            }, 2000)
        },
        onEditorReady() {
            // #ifdef MP-BAIDU
            this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
            // #endif

            // #ifdef APP-PLUS || H5 ||MP-WEIXIN
            uni.createSelectorQuery().select('#editor').context((res) => {
                this.editorCtx = res.context
            }).exec()
            // #endif
        },

        // 新增图片
        async afterRead(event) {
            // console.log(event);
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file)
            console.log(event);
            // event['file'].forEach((ele) => {
            //     this.formData.cover_path.push({ url:  event['file'].url });
            // });
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url)

            }
        },
        uploadFilePromise(url) {

            uploadFile(url, 'task', {}, { authorization: this.getAuthorization }).then(r => {
                this.fileList1.push({ path: r.data, url: config.perviewUrl + r.data })
            })
        },
        // 删除图片
        deletePic(event) {
            this[`fileList${event.name}`].splice(event.index, 1)
        },
        // 保存我的备课
        clickSumbit() {
            if (!this.isEdit) {
                uni.$u.toast('已提交过，请勿重复提交')
                return
            }
            let formData = JSON.parse(JSON.stringify(this.formData));
            let coverData = this.fileList1.map(e=>e.path)
                // console.log(coverData);
            formData.cover_path = coverData.join(',');
            formData.tags = this.formData.tags.join(',');
            formData.amt *= 100;

            publicTask(formData).then(r => {
                uni.$u.toast(r.msg)
                this.$forceUpdate()
            }).catch(r => {
                uni.$u.toast(r.msg)

            })
        },
    },
}
</script>
<style>
.container {
    padding: 10px;
}



button {
    margin-top: 10px;
}
</style>
