<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">添加银行卡</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="div">
				<text class="title">持卡人:</text>
				<input type="text" placeholder="请输入持卡人姓名" v-model="name">
			</view>
			<view class="div">
				<text class="title">银行卡账号:</text>
				<input type="text" placeholder="请输入银行卡账号" v-model="card_num">
			</view>
			<view class="div">
				<text class="title">身份证号:</text>
				<input type="text" placeholder="请输入身份证号" v-model="user_num">
			</view>
			<view class="div">
				<text class="title">手机号码:</text>
				<input type="text" placeholder="请输入手机号码" v-model="phone_num">
			</view>
			<view class="div">
				<text class="title">短信验证:</text>
				<input type="text" placeholder="请输入短信验证码" v-model="note">
				<button class="getNumber" @tap="getNumber" :disabled="tg" :class="{active:tg}">{{ s }}</button>
			</view>
			<button type="primary" class="add" @tap="add">确认添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				name: '',
				card_num: '',
				user_num: '',
				phone_num: '',
				note: '',
				s: '获取验证码',
				tg: false,
				merchantId:'',
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
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
			getNumber: function() {
				let that = this;
				that.tg = true;
				let s = 30;
				let item = setInterval(function() {
					that.s = s--;
					if (that.s == 0) {
						that.tg = false;
						that.s = "获取验证码"
						clearInterval(item);
					}
				}, 1000)

				uni.request({
					url: that.serveipd + '/api/merchant/money/smsCode',
					method: 'GET',
					data: {
						mobile: that.phone_num,
					},
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			add: function() {
				let that = this;
				let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
				let cardNum = /^([1-9]{1})(\d{14}|\d{18})$/;
				let userNum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				let phoneNum=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
				if (that.name == "") {
					uni.showToast({
						title: '姓名不能为空',
						icon: "none",
					});
					return
				} else if (!reg.test(that.name)) {
					uni.showToast({
						title: '姓名输入有误',
						icon: "none",
					});
					return
				};
				if (that.card_num == "") {
					uni.showToast({
						title: '银行卡号不能为空',
						icon: "none",
					});
					return
				} else if (!cardNum.test(that.card_num)) {
					uni.showToast({
						title: '银行卡号输入有误',
						icon: "none",
					});
					return
				};
				if (that.user_num == "") {
					uni.showToast({
						title: '身份证号不能为空',
						icon: "none",
					});
					return
				} else if (!userNum.test(that.user_num)) {
					uni.showToast({
						title: '身份证号输入有误',
						icon: "none",
					});
					return
				};
				if(that.phone_num==""){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none",
					});
					return
				}else if(!phoneNum.test(that.phone_num)){
					uni.showToast({
						title: '手机号输入有误',
						icon: "none",
					});
					return
				};
				uni.request({
					url:that.serveipd+"/api/merchant/money/verifyMerchantBankCard",
					method:"POST",
					data:{
						accountName:that.name,
						bankCardno:that.card_num,
						idNumber:that.user_num,
						mobile:that.phone_num,
						smsCode:that.note,
						merchantId:that.merchantId,
					}
				})
			},
		}
	}
</script>

<style>
	@import url("../../common/user/bindCard.css");
</style>
