<template>
	<button bubble="true" :class="['myp-btn-raw', 'myp-flex-row', 'myp-justify-center', 'myp-align-center', 'myp-position-relative', 'myp-border-'+border, 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, (disabled||loading)?'myp-disabled':'']" :style="boxStyle" :hover-class="(!disabled && !loading) ? ('myp-hover-'+hover): ''" :app-parameter="appParameter" :open-type="openType" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" @contact="toCantactCallback" @error="toErrorCallback" @getphonenumber="toPhoneCallback" @getuserinfo="toInfoCallback" @launchapp="toAppCallback" @opensetting="toSettingCallback">
		<slot>
			<myp-loading-indicator v-if="loading" :width="loadingWidth" :height="loadingHeight" :src="loadingSrc"></myp-loading-indicator>
			<myp-icon v-if="!loading && icon && icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :boxStyle="iconBoxStyle" :iconStyle="iconStyle"></myp-icon>
			<text v-if="text&&text.length>0" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
			<myp-icon v-if="icon2 && icon2.length > 0" :name="icon2" :type="icon2Type" :size="icon2Size" :boxStyle="mrIcon2BoxStyle" :iconStyle="icon2Style"></myp-icon>
		</slot>
		<slot name="extra"></slot>
	</button>
</template>

<script>
	export default {
		props: {
			/**
			 * open-type
			 */
			openType: {
				type: String,
				default: ''
			},
			/**
			 * app-parameter
			 */
			appParameter: {
				type: String,
				default: ''
			},
			/**
			 * session-form
			 */
			sessionFrom: {
				type: String,
				default: ''
			},
			/**
			 * send-message-title
			 */
			sendMessageTitle: {
				type: String,
				default: ''
			},
			/**
			 * send-message-path
			 */
			sendMessagePath: {
				type: String,
				default: ''
			},
			/**
			 * send-message-img
			 */
			sendMessageImg: {
				type: String,
				default: ''
			},
			/**
			 * show-massage-card
			 */
			showMessageCard: {
				type: Boolean,
				default: false
			},
			/**
			 * ????????????
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * ????????????
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * ????????????
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * ????????????
			 */
			icon2: {
				type: String,
				default: ''
			},
			/**
			 * ?????????loading??????
			 */
			loading: {
				type: Boolean,
				default: false
			},
			/**
			 * loading????????????????????????
			 */
			loadingSrc: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			/**
			 * ????????????
			 */
			height: {
				type: String,
				default: 'l'
			},
			/**
			 * ????????????hover??????: opacity/bg/bg-opacity
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * ????????????
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * ????????????
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * ?????????????????????????????????????????????
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * ?????????????????????
			 */
			highlight: {
				type: Boolean,
				default: false
			},
			/**
			 * ??????????????????????????????
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * ??????????????????
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * ??????????????????
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * ????????????????????????
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * ????????????????????????
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * ????????????????????????
			 */
			icon2Type: {
				type: String,
				default: 'text'
			},
			/**
			 * ????????????????????????
			 */
			icon2Size: {
				type: String,
				default: 'l'
			},
			/**
			 * ????????????
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * ????????????
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * ????????????????????????
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * ??????????????????
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * ????????????????????????
			 */
			icon2BoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * ??????????????????
			 */
			icon2Style: {
				type: String,
				default: ''
			},
			/**
			 * loading???????????????
			 */
			loadingWidth: {
				type: String,
				default: '36rpx'
			},
			/**
			 * loading???????????????
			 */
			loadingHeight: {
				type: String,
				default: '36rpx'
			}
		},
		computed: {
			mrTextStyle() {
				let _style = ''
				if (this.text && this.text.length > 0) {
					if (this.loading) {
						_style += `margin-left: ${this.space};`
					} else {
						if (this.icon && this.icon.length > 0) {
							_style += `margin-left: ${this.space};`
						}
					}
				}
				_style += this.textStyle
				return _style
			},
			mrIcon2BoxStyle() {
				let _style = ''
				_style += `margin-left: ${this.space};`
				return _style + this.icon2BoxStyle
			}
		},
		methods: {
			toCantactCallback(e) {
				this.$emit("contact", e)
			},
			toErrorCallback(e) {
				this.$emit("error", e)
			},
			toPhoneCallback(e) {
				this.$emit("phone", e)
			},
			toInfoCallback(e) {
				this.$emit("userinfo", e)
			},
			toAppCallback(e) {
				this.$emit("launch", e)
			},
			toSettingCallback(e) {
				this.$emit("setting", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-btn-raw {
		/* #ifndef APP-NVUE */
		padding: 0;
		margin: 0;
		/* #endif */
		/* #ifdef APP-NVUE */
		padding-left: 0;
		padding-right: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-left: 0;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 0;
		/* #endif */
		
		/* #ifndef APP-NVUE */
		&:after {
			border: none;
		}
		/* #endif */
	}
</style>
