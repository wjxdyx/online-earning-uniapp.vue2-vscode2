<script>
// import {  } from "@/api";
export default {
    data() {
        return {}
    },
    created() {
        // #ifdef APP-PLUS
        plus.navigator.closeSplashscreen()
        // #endif
 

    },
    
    onLaunch: function (query) {
        console.log(this.authorization);
        if (!this.authorization) {
            uni.$u.route('pages/login/login')
        } else {
            uni.$u.route({url:'pages/earning/index/index',type:'tab'})
            this.$store.dispatch('getMineInfo')
        }
        uni.$u.routeIntercept = (e, callback) => {
            console.log(e,callback);
            // let auth = permission(this.vuex_permission, e.url.split('?')[0]);
            // if (!auth) {
            // this.$u.toast('请开通会员');
            // }
            // callback(true);
        }
   
    },
    onShow: function () {},
    onHide: function () {},
    mounted() {
        console.log(222233,this.authorization);
    },
}
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/common/demo.scss';
</style>

<style>
/* .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    width: 100%;
    height: 100%;
} */
</style>
