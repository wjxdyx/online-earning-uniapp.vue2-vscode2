<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :class="'myp-bg-'+bgType" :style="mrBoxStyle" :scroll-y="mypScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<waterfall :class="['myp-full-flex', 'myp-bg-'+bgType]" :style="mrBoxStyle" ref="myp-scroller" :show-scrollbar="showScrollbar" :column-count="columnCount" :column-width="columnWidthPx" :column-gap="columnGapPx" :left-gap="leftGapPx" :right-gap="rightGapPx" :loadmoreoffset="(mypUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="mypMoreLoad" @scroll="mypScroll">
		<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="refreshStyle" @refresh="mypRefresh"></myp-refresher-n>
		<header>
			<slot name="header"></slot>
		</header>
		<slot></slot>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<!-- or we could put the foot-token after loading -->
		<header v-if="mypUp.use&&!useLoading">
			<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle"></myp-loader>
		</header>
		<myp-loader-n v-if="mypUp.use&&useLoading" ref="myp-loader" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle" @loading="mypLoad"></myp-loader-n>
	</waterfall>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="mypMrScrollContentStyle">
			<view v-if="mypDown.use" :style="mypMrRefreshStyle">
				<myp-refresher :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="refreshStyle"></myp-refresher>
			</view>
			<slot name="header"></slot>
			<!-- content of scroll -->
			<slot></slot>
			<myp-loader v-if="mypUp.use" :isLoading="mypIsUpLoading" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle"></myp-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from '../myp-list/styleMixin.js'
	import refreshLoadCustom from '../myp-list/refreshLoadCustom.js'
	import scrollMixin from '../myp-list/mixin.js'
	import weexActions from '../myp-list/weexActions.js'
	
	import {getPlatform, getPx} from '../utils/system.js'
	
	export default {
		mixins: [styleMixin, refreshLoadCustom, scrollMixin, weexActions],
		props: {
			// #ifdef APP-NVUE
			/**
			 * ????????????loading??????????????????loadmoreofset??????
			 */
			useLoading: {
				type: Boolean,
				default: false
			},
			/**
			 * ??????loadmoreofset?????????????????????
			 */
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			// #endif
			/**
			 * ?????????????????????
			 */
			columnCount: {
				type: [String, Number],
				default: 'auto'
			},
			/**
			 * ??????????????????
			 */
			columnWidth: {
				type: String,
				default: 'auto'
			},
			/**
			 * ?????????????????????
			 */
			columnGap: {
				type: String,
				default: '0'
			},
			/**
			 * ???????????????????????????
			 */
			leftGap: {
				type: String,
				default: '0'
			},
			/**
			 * ???????????????????????????
			 */
			rightGap: {
				type: String,
				default: '0'
			},
			/**
			 * ?????????????????????????????????
			 */
			autoUpdate: {
				type: Boolean,
				default: false
			},
			/**
			 * ?????????????????????
			 */
			down: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: uni.upx2px(140),
						inRate: 0.8,
						outRate: 0.2
					}
				}
			},
			/**
			 * ?????????????????????
			 */
			up: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: 80
					}
				}
			}
		},
		created() {
			// config the down/up
			// #ifndef APP-NVUE
			this.mypDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down)
			this.mypUp = Object.assign({use: true,offset: 80}, this.up)
			// #endif
			// #ifdef APP-NVUE
			this.mypDown = Object.assign(this.down)
			this.mypUp = Object.assign(this.up)
			this.platform = getPlatform()
			// #endif
			// emit this ??????mp????????????????????????
			// this.$emit("inited", this)
			// ?????????????????????emit??????????????????inited???????????????????????????ref???????????????
			// this.$emit("inited")
			setTimeout(()=>{
				this.$emit("inited")
			}, 0)
			if (this.autoUpdate) {
				const that = this
				setTimeout(() => {
					// to refresh data
					this.mypInitContentList()
				}, 10)
			}
		},
		methods: {
		},
		computed: {
			columnWidthPx() {
				if (this.columnWidth === 'auto') {
					return 'auto'
				}
				return getPx(this.columnWidth)
			},
			columnGapPx() {
				return getPx(this.columnGap)
			},
			leftGapPx() {
				return getPx(this.leftGap)
			},
			rightGapPx() {
				return getPx(this.rightGap)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
