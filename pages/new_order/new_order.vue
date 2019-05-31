<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<text>{{ shopname }}</text>
		</view>
		<!-- TAB切换 -->
		<view class="content" :style="{paddingTop:height}">
			<view class="segmented">
				<view class="tab_list" v-for="(item,index) in items" @tap="onTap(index)" :key="index" :class="{active:current===index}">
					{{ item }}
				</view>
			</view>
			<!-- 内容区域 -->
			<view class="segmented_box" :style="{marginTop:top}">
				<view v-show="current === 0" scroll-y="true">
					<view class="order_list" v-for="(item,index) in orders" :key="item.id">
						<view class="top">
							<text>
								<text class="num">{{ orders.length-index }}</text>
								<text class="hope" v-if="item.expectTime !='' ">期望{{ item.expectTime }}送达</text>
							</text>
							<text class="state">等待接单</text></view>
						<view class="infor">
							<text class="name">{{ item.consigneeName }}</text>
							<text class="order_number">{{ item.orderno }}</text>
							<text class="address">{{ item.consigneeAddress }}</text>
							<view class="right_btn">
								<image class='wz' @tap="wz(item.dlatitude,item.dlongitude)" src="../../static/new_order/wz.png" mode=""></image>
								<image class="dh" @tap="dh(item.consigneePhone)" src="../../static/new_order/dh.png" mode=""></image>
							</view>
						</view>
						<view class="commodity">
							<view class="commodity_list">
								<text class="much">商品({{ item.orderDetails.length }})</text>
								<view class="open" @tap="open(index)">
									<text>展开</text>
									<image class="rotate" :class="{rotate_start:index==opens}" src="../../static/new_order/down.png" mode=""></image>
								</view>
							</view>
							<view class="sp_list" v-if="index==opens">
								<view class="sp_list_infor" v-for="(sp,i) in item.orderDetails" :key="i">
									<text class="name">{{ sp.name }}</text>
									<view class="right">
										<text class="number">X{{ sp.number }}</text>
										<text class="money">￥{{ sp.singlePrice }}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="remark"><text class="remark_text">备注</text><text class="ask">{{ item.remark }}</text></view>
						<view class="bottom">
							<view>
								<text class="income">本单收入</text>
								<text class="money">￥{{ item.income }}</text>
							</view>
							<text class="receive" @tap="receive(item.orderno)">立即接单</text>
						</view>
					</view>
				</view>
				<!-- 待配送 -->
				<view v-show="current === 1" scroll-y="true">
					<view class="order_list" v-for="(item,index) in wait_orders" :key="item.id">
						<view class="top">
							<text>
								<text class="num">{{ wait_orders.length-index }}</text>
								<text class="hope" v-if="item.expectTime !='' ">期望{{ item.expectTime }}送达</text>
							</text>
							<text class="state">已接单</text>
						</view>
						<view class="infor">
							<text class="name">{{ item.consigneeName }}</text>
							<text class="order_number">{{ item.orderno }}</text>
							<text class="address">{{ item.consigneeAddress }}</text>
							<view class="right_btn">
								<image class='wz' @tap="wz(item.dlatitude,item.dlongitude)" src="../../static/new_order/wz.png" mode=""></image>
								<image class="dh" @tap="dh(item.consigneePhone)" src="../../static/new_order/dh.png" mode=""></image>
							</view>
						</view>
						<view class="commodity">
							<view class="commodity_list">
								<text class="much">商品({{ item.orderDetails.length }})</text>
								<view class="open" @tap="open(index)">
									<text>展开</text>
									<image class="rotate" :class="{rotate_start:index==opens}" src="../../static/new_order/down.png" mode=""></image>
								</view>
							</view>
							<view class="sp_list" v-if="index==opens">
								<view class="sp_list_infor" v-for="(sp,i) in item.orderDetails" :key="i">
									<text class="name">{{ sp.name }}</text>
									<view class="right">
										<text class="number">X{{ sp.number }}</text>
										<text class="money">￥{{ sp.singlePrice }}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="remark"><text class="remark_text">备注</text><text class="ask">{{ item.remark }}</text></view>
						<view class="bottom">
							<view>
								<text class="income">本单收入</text>
								<text class="money">￥{{ item.income }}</text>
							</view>
							<text class="receive" @tap="confirm(item.orderno)">确认配送</text>
						</view>
					</view>
				</view>
				<!-- 催单 -->
				<view v-show="current === 2" scroll-y="true">
					<!-- 					<view class="order_list" v-for="(item,index) in orders" :key="item.id">
						<view class="top">
							<text>
								<text class="num">{{ orders.length-index }}</text>
								<text class="hope" v-if="item.expectTime !='' ">期望{{ item.expectTime }}送达</text>
							</text>
							<text class="state">等待接单</text></view>
						<view class="infor">
							<text class="name">{{ item.consigneeName }}</text>
							<text class="order_number">{{ item.orderno }}</text>
							<text class="address">{{ item.consigneeAddress }}</text>
						</view>
						<text class="much">等{{ item.orderDetails.length }}件商品</text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				items: [
					"新订单",
					"待配送",
					"催单"
				],
				height: '',
				current: 0,
				orders: [],
				top: '',
				latitude: '',
				longitude: '',
				tg: true,
				opens: -1,
				merchantId: '',
				wait_orders: [],
				newOrders_page: 1,
				wait_delivery_page: 1,
				nomore: true,
				index: '',
				shopname:'',

			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.shopname=e.data.name;
					that.down_newOrders();
					that.down_delivery();
					// that.reminder();
				}
			});
		},
		onReady() {
			this.getTopheight();
		},
		onShow() {},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.index == 0) {
				this.down_newOrders();
			} else if (this.index == 1) {
				this.down_delivery();
			}

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载
		onReachBottom() {
			if (this.index == 0) {
				this.newOrders_page++;
				this.load_newOrders();
			} else if (this.index == 1) {
				this.wait_delivery_page++;
				this.wait_delivery();
			}

		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.top = 65 + "px";
						that.height = res.statusBarHeight + 44 + "px";
					}
				})
			},
			onTap: function(index) {
				this.index = index;
				if (this.current != index) {
					this.current = index;
					this.$forceUpdate();
				};

			},
			// 生成新订单
			load_newOrders: function() {
				let that = this;
				uni.showLoading();
				uni.request({
					url: this.serveipd + '/api/merchant/order/newOrders',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						page: that.newOrders_page,
					},
					success: res => {
						uni.hideLoading();
						let neworder = []
						neworder = res.data.data;
						that.orders = that.orders.concat(neworder);
						if (res.data.data.length == 0) {
							uni.showToast({
								title: "没有更多数据了",
								icon: 'none'
							});
							return
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 新订单下拉刷新
			down_newOrders: function() {
				let that=this
				uni.request({
					url: that.serveipd + '/api/merchant/order/newOrders',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						that.orders = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 待配送下拉刷新
			down_delivery: function() {
				let that=this
				uni.request({
					url: that.serveipd + '/api/merchant/order/delivery',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						that.wait_orders = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//待配送列表
			wait_delivery: function() {
				let that = this;
				uni.showLoading();
				uni.request({
					url: that.serveipd + '/api/merchant/order/delivery',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						page: that.wait_delivery_page
					},
					success: res => {
						uni.hideLoading();
						let waitorder = []
						waitorder = res.data.data;
						that.wait_orders = that.wait_orders.concat(waitorder);
						console.log(res);
						if (res.data.data.length == 0) {
							uni.showToast({
								title: "没有更多数据了",
								icon: 'none'
							});
							return
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 催单
			reminder: function() {
				let that = this;
				uni.request({
					url: that.serveipd + '/api/merchant/order/merchantNews',
					method: 'GET',
					data: {
						merchantId: that.merchantId
					},
					success: res => {
						console.log(res);
					}
				});
			},
			wz: function(latitude, longitude) {
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function() {}
				});
			},
			dh: function(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: function(res) {}
				});
			},
			open: function(index) {
				this.tg = !this.tg;
				if (this.opens != index) {
					this.opens = index;
				} else {
					this.opens = -1;
				}
			},
			// 立即接单
			receive: function(orderno) {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/order/newOrder",
					method: 'GET',
					data: {
						orderno: orderno,
						merchantId: that.merchantId,
					},
					success(res) {
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						});
						that.down_newOrders();
					}
				});
			},
			// 确认配送
			confirm: function(orderno) {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/order/confirmDelivery",
					method: 'GET',
					data: {
						orderno: orderno,
					},
					success(res) {
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						});
						that.down_delivery();
					}
				});
			},
		}
	}
</script>

<style>
	@import "../../common/new_order.css";
</style>
