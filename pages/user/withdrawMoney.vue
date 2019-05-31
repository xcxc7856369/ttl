<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">提现</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="top">
				<view class="title">提现金额(手续费2%)</view>
				<view class="money"><text>￥</text><input type="text" focus="true" v-model="money"></view>
				<view class="tip"><text>可提现金额 ￥{{ allmoney }}</text> <text class="red" @tap="getAllmoney">全部提现</text></view>
			</view>
			<view class="mode">
				<view class="mode_list">
					<view class="alipay">
						<image src="../../static/zfb.png" mode=""></image>
						<text>支付宝</text>
					</view>
					<view class="choice" @tap="zfb()">
						<image :src="key==-1?xz:wxz" mode=""></image>
					</view>
				</view>
				<view class="mode_list" v-for="(item,index) in card" :key="index">
					<view class="alipay">
						<image src="../../static/zfb.png" mode=""></image>
						<text>建设银行({{ item.bankCardEnd }})</text>
					</view>
					<view class="choice" @tap="choice(index)">
						<image :src="key==index?xz:wxz" mode=""></image>
					</view>
				</view>
			</view>
			<view class="bind">
				<navigator url="./bindCard" hover-class="none">添加银行卡</navigator>
			</view>
			<button type="primary" class="btn" @tap="extract()">立即提现</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		 
		data() {
			return {
				height: '',
				merchantId: '',
				allmoney: '',
				money: '',
				card: '',
				key: -1,
				xz: "../../static/user/xz.png",
				wxz: "../../static/user/wxz.png",
				type: 1,
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.getinfor();
				}
			});
		},
		onReady() {
			this.getTopheight();
		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.height = res.statusBarHeight + 44 + "px";
					}
				})
			},
			getinfor: function() {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/money/balance",
					method: 'GET',
					data: {
						merchantId: that.merchantId
					},
					success: res => {
						that.allmoney = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
				uni.request({
					url: this.serveipd + "/api/merchant/money/selectMerchantBank",
					method: 'GET',
					data: {
						merchantId: that.merchantId
					},
					success: res => {
						console.log(res);
						that.card = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getAllmoney: function() {
				this.money = this.allmoney
			},
			choice: function(index) {
				this.key = index;
				this.type = 2;
			},
			zfb: function() {
				this.key = -1;
				this.type = 1;
			},
			extract: function() {
				let that = this;
				let num = /^[1-9]\d{0,7}(\.\d{1,3})?$|^0(\.\d{1,3})?$/
				if (that.money == '') {
					uni.showToast({
						title: '请输入金额',
						icon: "none"
					})
					return
				} else if (!num.test(that.money)) {
					uni.showToast({
						title: '金额输入有误',
						icon: "none"
					})
					return
				}
				let brokerage = that.money * 0.02;
				let bankCard = '';
				if (that.type == 1) {
					// 支付宝
				} else {
					bankCard = that.card[that.key].bankCardno
				}
				if (parseInt(that.money) + brokerage <= that.allmoney) {
					uni.request({
						url: this.serveipd + "api/merchant/money/merchantWithdrawal",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							merchantId: that.merchantId,
							money: that.money,
							handlingFee: brokerage,
							type: that.type,
							bankCard: bankCard
						},
						success: res => {
							if (res.data) {
								uni.showToast({
									title: '提现成功',
									duration: 2000,
									success() {
										setTimeout(function() {
											uni.switchTab({
												url:"./index"
											})
										}, 2000)
									}
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.showToast({
						title:"余额不足",
						icon:"none"
					})
				}
			},
		}
	}
</script>

<style>
	@import url("../../common/user/withdrawMoney.css");
</style>
