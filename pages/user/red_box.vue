<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">创建红包</view>
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
					<text v-show="endTime==''">请选择结束时间</text>
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
					<text v-else>{{ grant }}</text>
					<image src="../../static/user/right.png" mode=""></image>
				</view>
			</view>
			<button type="primary" @tap="sub">确定</button>
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
				limit_bt: true,
				grant: '',
				merchantId: '',
				price: '',
				number: '',
				activitiesId: '',
				modify: "/api/merchant/red/modify",
				establish: "/api/merchant/red/envelope",
				address: '',
			}
		},
		onLoad(res) {
			let that = this;
			console.log(res)
			that.activitiesId = res.activitiesId;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					if (res.activitiesId != undefined) {
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
			},
			limit: function(e) {
				console.log(e.detail.value)
				this.limit_bt = e.detail.value;
			},
			sub: function() {
				let that = this;
				if (that.activitiesId == undefined) {
					that.address = that.establish;
				} else {
					that.address = that.modify;
				}
				uni.showLoading({
					title: '生成红包活动中',
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
				if (this.limit_bt) {
					that.number = that.grant;
				} else {
					that.number = '';
				}

				uni.request({
					url: that.serveipd + that.address,
					method: "POST",
					data: {
						id: parseInt(that.activitiesId),
						merchantId: that.merchantId,
						startTime: that.startTime,
						endTime: that.endTime,
						price: that.price,
						quantity: that.number,
						consumedAllHours: that.limit_bt ? 1 : 0,
					},
					success(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							mask: false,
							duration: 1500,
							success() {
								if (res.data.code == 0) {
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
			}, // 获取信息,用来修改内容
			getInfor: function() {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/red/information",
					header: {
						'content_type': 'application/json'
					},
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						id: that.activitiesId,
					},
					success: res => {
						that.startTime = res.data.data.startTime;
						that.endTime = res.data.data.endTime;
						that.price = res.data.data.price;
						if (res.data.data.consumedAllHours == 1) {
							that.limit_bt = true;
							that.grant = res.data.data.quantity;
						} else {
							that.limit_bt = false;
							that.grant = "无限制"
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

	input {
		text-align: right;
	}

	.div_list {
		padding: 0 20upx;
	}

	.div_list .put {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		width: 96vw;
		margin: 10vh auto;
		background: #ED721F !important;
	}
</style>
