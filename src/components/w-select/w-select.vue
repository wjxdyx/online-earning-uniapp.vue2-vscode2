<template>

    <view>
        <text>{{selValue['label']}}</text>
        <u-picker ref="CategoryRef" 
        placeholder="标题" :show="visible" :columns="list" border="none" keyName="label"
            @confirm="changeHandler"></u-picker>


    </view>
</template>

<script>
import config from '@/config'


import { mapGetters } from 'vuex'
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: ()=>{
                return []
            },
        },
        value:{
            type:String|Number,
            default:''
        }
    },
    data() {
        return {
            selValue: [],
            selIndex:[],
   

        }
    },
    computed: {

    },
    created() {
        // this.$refs.CategoryRef.setIndexs(2)
        this.findValue(this.value)
    },
    watch:{
        value:function(newVal){
            this.findValue(newVal)
        }
    },  
    methods: {
        findValue(newVal){
            this.list[0].forEach(ele => {
           
                if(ele.id==newVal){
                    this.selValue = ele
                }
            });
        },
        changeHandler(value) {
            console.log(value);
            this.selIndex= value.indexs[0]
            this.selValue= value.value[0]
            // this.selValue = e
            this.$emit('update:visible', false)
            this.$emit('input', value.value[0]['id'])
        },
 


    },
}
</script>
<style>
.container {
    padding: 10px;
}

#editor {
    width: 100%;
    height: 300px;
    background-color: #CCCCCC;
}

button {
    margin-top: 10px;
}
</style>
