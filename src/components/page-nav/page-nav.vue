<template>
    <page-meta
        background-color="#fbeec4"
        page-style="color: #1c1c1c"
        root-font-size="16px"
    >
        <navigation-bar front-color="#000000" background-color="#fbeec4" />
    </page-meta>
</template>

<script>
export default {
    props: {
        desc: String,
        title: String,
    },
    data() {
        return {
            version: uni.$u.config.v,
        }
    },
    methods: {
        jumpToWx() {
            // #ifdef MP-WEIXIN
            uni.navigateToMiniProgram({
                appId: 'wx3be833c4a263e0c2',
            })
            // #endif
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
