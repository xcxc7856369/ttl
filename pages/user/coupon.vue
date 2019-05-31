<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">创建优惠券</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="div_list">
				<text>开始日期</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="start_times">
					<text v-show="startTime==''">请选择开始时间</text>
					<text>{{ startTime }}</text>
					<image src="../../static/user/right.png" mode=""></image>
				</picker>
			</view>
			<view class="div_list">
				<text>结束日期</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="endTimes">
					<text v-show="endTime==''">请输入结束时间</text>
					<text>{{ endTime }}</text>
					<image src="../../static/user/right.png" mode=""></image>
				</picker>
			</view>
			<view class="div_list">
				<text>设定金额</text>
				<view class="put">
					<input type="text" placeholder="请输入金额" v-model="price">
					<image src="../../static/user/right.png" mode=""></image>
				</view>
			</view>
			<view class="div_list" @tap="tg='block',grant=''">
				<text>发放数量</text>
				<view>
					<text v-if="grant==''">点击选择</text>
					<text v-else="">{{ grant }}</text>
					<image src="../../static/user/right.png" mode=""></image>
				</view>
			</view>
			<view class="div_list" @tap="coupon_tg='block',money=''">
				<text>消费限制</text>
				<view>
					<text v-if="money==''">点击选择</text>
					<text v-else="">{{ money }}</text>
					<image src="../../static/user/right.png" mode=""></image>
				</view>
			</view>
			<button type="primary" @tap='sub'>确定</button>
			<!-- 发放数量 -->
			<view class="mask" :style="{display:tg}">
				<view class="norms">
					<view class="title">发放数量</view>
					<view class="div_list"><text>限制发放数量</text>
						<switch :checked="limit_bt" @change="limit" />
					</view>
					<view class="div_list" v-show="limit_bt"><text>制定发放数量</text><input class="grant_num" type="text" placeholder="输入数量"
						 v-model="grant"></view>
					<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="determine()">确定</text></texte>
					</view>
				</view>
			</view>
			<!-- 消费限制 -->
			<view class="mask" :style="{display:coupon_tg}">
				<view class="norms">
					<view class="title">消费限制</view>
					<view class="div_list"><text>限制最低消费金额</text>
						<switch :checked="shop_limit_bt" @change="shop_limit" />
					</view>
					<view class="div_list" v-show="shop_limit_bt"><text>设置最低消费金额</text><input class="grant_num" type="text"
						 placeholder="输入金额" v-model="money"></view>
					<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="shop_determine()">确定</text></texte>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(confirmtype) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (confirmtype === 'start') {
			year = year - 100;
		} else if (confirmtype === 'end') {
			year = year + 100;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	};
	export default {
		data() {
			return {
				height: '',
				date: getDate({
					format: true
				}),
				startTime: '',
				endTime: '',
				tg: 'none',
				coupon_tg: 'none',
				limit_bt: true,
				shop_limit_bt: true,
				grant: '',
				money: '',
				price: '',
				merchantId: '',
				number: '',
				activitiesId: '',
				consumption:'',
				minimumConsumptionAmount:"",
				modify: "/api/merchant/red/modifyCoupons",
				establish: "/api/merchant/red/coupon",
				address: '',
			}
		},
		onLoad(res) {
			let that = this;
			console.log(res);
			that.activitiesId = res.activitiesId;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					if(res.activitiesId){
						that.getInfor();
					}	
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
			start_times: function(e) {
				this.startTime = e.target.value
			},
			endTimes: function(e) {
				this.endTime = e.target.value
			},
			// 确认
			determine: function() {
				let num = /^[1-9]\d*$/;
				if (this.limit_bt == false) {
					this.grant = '无限制';
				} else if (this.grant == '') {
					uni.showToast({
						title: '发放数量不能为空',
						icon: 'none',
						mask: false,
						duration: 2000,
					});
					return
				} else if (!num.test(this.grant)) {
					uni.showToast({
						title: '发放数量输入有误',
						icon: 'none',
						mask: false,
						duration: 2000,
					});
					return
				}
				this.tg = "none";

			},
			// 取消
			cancel: function() {
				this.tg = "none";
				this.coupon_tg = "none";
			},
			limit: function(e) {
				this.limit_bt = e.detail.value;
			},
			// 确认
			shop_determine: function() {
				let money = /^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/;
				if (this.shop_limit_bt == false) {
					this.money = '无限制';
				} else if (this.money == '') {
					uni.showToast({
						title: '最低消费不能为空',
						icon: 'none',
						mask: false,
						duration: 2000,
					});
					return
				} else if (!money.test(this.money)) {
					uni.showToast({
						title: '最低消费输入有误',
						icon: 'none',
						mask: false,
						duration: 2000,
					});
					return
				}
				this.coupon_tg = "none";
			},
			shop_limit: function(e) {
				this.shop_limit_bt = e.detail.value;
			},
			sub: function() {
				let that = this;
				console.log(that.activitiesId);
				if (that.activitiesId==undefined) {
					that.address = that.establish;
				} else {
					that.address = that.modify;
				}
				uni.showLoading({
					title: '生成优惠券中',
					mask: false
				});
				let money = /^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/;
				if (that.startTime == '') {
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				if (that.endTime == '') {
					uni.showToast({
						title: '请选择结束时间',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				let a = new Date(that.startTime);
				let b = new Date(that.endTime);
				if (a.getTime() > b.getTime()) {
					uni.showToast({
						title: '结束时间不能小于开始时间',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};

				if (that.price == '') {
					uni.showToast({
						title: '请输入金额',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				} else if (!money.test(that.price)) {
					uni.showToast({
						title: '金额输入有误',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				if (that.grant == '') {
					uni.showToast({
						title: '请选择发放数量',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				if (that.money == '') {
					uni.showToast({
						title: '消费限制不能为空',
						icon: 'none',
						mask: false,
						duration: 2000
					})
					return;
				}
				if (that.limit_bt) {
					that.number = that.grant;
				} else {
					that.number = '';
				}
				if (that.shop_limit_bt) {
					that.minimumConsumptionAmount = that.money;
				} else {
					that.minimumConsumptionAmount = '';
				}
				uni.request({
					url: that.serveipd +that.address,
					method: "POST",
					data: {
						id: parseInt(that.activitiesId),
						startTime: that.startTime,
						endTime: that.endTime,
						price: that.price,
						quantity: that.number,
						minimumConsumptionAmount:that.minimumConsumptionAmount,
						numberStatus: that.limit_bt ? 1 : 0,
						minimumConsumptionStatus: that.shop_limit_bt ? 1 : 0,
						merchantId: that.merchantId,
					},
					success(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							mask: false,
							duration: 1500,
							success() {
								if(res.data.code==0){
										setTimeout(function() {
									uni.redirectTo({
										url: './marketing',
									});
								}, 1500)
								}
							}
						});
						return
					}
				})

			},
			 // 获取信息,用来修改内容
			getInfor: function() {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/red/offerInformation",
					header: {
						'content_type': 'application/json'
					},
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						id: that.activitiesId,
					},
					success: res => {
						console.log(res);
						that.startTime=res.data.data.startTime;
						that.endTime=res.data.data.endTime;
						that.price=res.data.data.price;
						if (res.data.data.numberStatus == 1) {
							that.limit_bt = true;
							that.grant = res.data.data.quantity;
						} else {
							that.limit_bt = false;
							that.grant = "无限制"
						};
						if(res.data.data.minimumConsumptionStatus == 1){
							that.shop_limit_bt=true;
							that.money=res.data.data.minimumConsumptionAmount;
						}else{
								that.shop_limit_bt=false;
								that.money="无限制";
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}


		}
	}
</script>

<style>
	@import url("../../common/group_buy.css");

	page {
		background: #fff;
	}

	.div_list {
		padding: 0 20upx;
	}

	.div_list .put {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.div_list input {
		width: 19vw;
		text-align: right;
	}

	button {
		width: 96vw;
		margin: 10vh auto;
		background: #ED721F !important;
	}
</style>
