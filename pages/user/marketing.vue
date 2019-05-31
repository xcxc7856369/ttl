<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">营销工具</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="segmented">
				<view class="tab_list" v-for="(item,index) in items" @tap="onTap(index)" :key="index" :class="{active:current===index}">
					{{ item }}
				</view>
			</view>
			<view class="tool" v-show="current === 0" scroll-y="true">
				<view class="group_buy">
					<image src="../../static/user/tgbj.png" mode=""></image>
					<view>
						<text>团购</text>
						<navigator url="/pages/user/group_buy" hover-class="none">点击创建></navigator>
					</view>
				</view>
				<view class="red_box">
					<image src="../../static/user/hbbj.png" mode=""></image>
					<view>
						<text>红包</text>
						<navigator url="/pages/user/red_box" hover-class="none">点击创建></navigator>
					</view>

				</view>
				<view class="discount">
					<image src="../../static/user/yhqbj.png" mode=""></image>
					<view>
						<text>优惠券</text>
						<navigator url="/pages/user/coupon" hover-class="none">点击创建></navigator>
					</view>
				</view>
			</view>
			<view class=" activity_box " v-show="current === 1" scroll-y="true">
				<view class="activity" v-for="(item,index) in activity_list" :key="item.id">
					<view class="top"><text class="title">{{ item.activitiesName  }}</text><text class="state" :class="{green:item.statuss==0,red:item.statuss==1,black:item.statuss==2}">{{ status_list[item.statuss] }}</text></view>
					<view><text>开始时间:{{ item.startTime }}</text></view>
					<view><text>结束时间:{{ item.endTime }}</text></view>
					<view class="bt">
						<text class="del" v-if="item.statuss==0||item.statuss==2" @tap="delete_activity(item.activitiesId,item.type)">删除</text>
						<text class="modify" v-if="item.statuss==0||item.statuss==2" @tap="modify(item.activitiesId,item.type)">修改</text>
						<text class="release" v-if="item.statuss==0||item.statuss==2" @tap="release(item.activitiesId,item.type)">发布</text>
						<text class="release" v-if="item.statuss===1" @tap="close_activity(item.activitiesId,item.type)">关闭</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				current: 0,
				items: ["营销工具", "我的营销"],
				status_list: ["待发布", "进行中", "已结束"],
				merchantId: '',
				activity_list: '',
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.getActivity();
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
			onTap: function(index) {
				if (this.current != index) {
					this.current = index;
				};
				if(index==1){
					this.getActivity();
				}
			},
			// 获取活动列表
			getActivity: function() {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/activity/newActivities",
					method: "GET",
					data: {
						merchantId: that.merchantId,
					},
					success(res) {
						console.log(res);
						that.activity_list = res.data.data.datas;
					}

				})
			},
			// 删除
			delete_activity: function(activitiesId, type) {
				let that = this;
				// 删除优惠券
				if (type == 1) {
					uni.request({
						url: this.serveipd + "/api/merchant/red/deleteCoupons",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							merchantId: that.merchantId,
							id: activitiesId,
						},
						success: res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "删除成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							};

						},
					});
				}
				if (type == 2) {
					// 删除红包
					uni.request({
						url: this.serveipd + "/api/merchant/red/deleteEnvelope",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							merchantId: that.merchantId,
							id: activitiesId
						},
						success: res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "删除成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							}

						},
					});
				}
				if (type == 3) {
					// 删除团购
					uni.request({			
						url: this.serveipd + "/api/merchant/commodity/groupBuy/" + activitiesId + "/delete",
						method: 'GET',
						data: {
							merchantId: that.merchantId,
						},
						success: res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "删除成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							}

						},
					});
				}
			},
			// 修改
			modify: function(activitiesId, type) {
				if (type == 1) {
					uni.navigateTo({
						url: "./coupon?activitiesId=" + activitiesId
					})
				}
				if (type == 2) {
					uni.navigateTo({
						url: "./red_box?activitiesId=" + activitiesId
					})
				}
				if (type == 3) {
					uni.navigateTo({
						url: "./group_buy?activitiesId=" + activitiesId
					})
				}
			},
			// 发布
			release:function(activitiesId,type){
				let that=this;
				if(type==1){
					uni.request({
						url: this.serveipd + "/api/merchant/red/coupons",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							id: activitiesId,
							merchantId: that.merchantId,
						},
						success: res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "发布成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							}
					
						},
					});
				};
				if(type==2){
					uni.request({
						url: this.serveipd + "/api/merchant/red/redEnvelope",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							id: activitiesId,
							merchantId: that.merchantId,
						},
						success: res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "发布成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							}
					
						},
					});
				};
				if(type==3){
					uni.request({
						url: this.serveipd + "/api/merchant/commodity/groupBuy/"+activitiesId+"/publish",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'GET',
						data: {
							merchantId: that.merchantId,
						},
						success: res => {
							console.log(res);
							if (res.data.code == 0) {
								uni.showToast({
									title: "发布成功",
									duration: 1500,
									success() {
										setTimeout(
											function() {
												that.getActivity();
											}, 1500
										)
									}
								});
							}
					
						},
					});
				};
			},
			close_activity:function(activitiesId,type){
				let that=this;
				if(type==1){
					uni.showLoading({
						title:'关闭中'
					})
					uni.request({
						url:this.serveipd+"/api/merchant/red/closeReleaseCoupons",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							id:activitiesId,
							merchantId:that.merchantId,
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({
								title: "已关闭",
								duration: 1500,
								success() {
									setTimeout(
										function() {
											that.getActivity();
										}, 1500
									)
								}
							});
						},

					});
					
				}
				if(type==2){
						uni.showLoading({
						title:'关闭中'
					})
					uni.request({
						url:this.serveipd+"/api/merchant/red/closeRedEnvelope",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data: {
							id:activitiesId,
							merchantId:that.merchantId,
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({
								title: "已关闭",
								duration: 1500,
								success() {
									setTimeout(
										function() {
											that.getActivity();
										}, 1500
									)
								}
							});
						},
					
					});
				}
				if(type==3){
						uni.showLoading({
						title:'关闭中'
					})
					uni.request({
						url:this.serveipd+"/api/merchant/commodity/groupBuy/"+activitiesId+"/close",
						header: {
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'GET',
						data: {
							merchantId:that.merchantId,
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({
								title: "已关闭",
								duration: 1500,
								success() {
									setTimeout(
										function() {
											that.getActivity();
										}, 1500
									)
								}
							});
						},
					
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../../common/marketing.css");
	@import url("../../common/new_order.css");
</style>
