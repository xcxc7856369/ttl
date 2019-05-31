<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class='left' open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">订单统计</view>
			<view class="right"></view>
		</view>	
		<view class="segmented" :style="{top:height}">
			<view class="tab_list" v-for="(item,index) in items" @tap="onTap(index)" :key="index" :class="{active:current===index}">
				{{ item }}
			</view>
		</view>
		<view class="content" :style="{paddingTop:height_a}">
			<view class="segmented_box ">
				<view v-show="current === 0" scroll-y="true">
					<view class="segmented_box">
						<view class="order_list" v-for="(item,index) in orderDays" :key="item.id">
							<view class="top">
								<text><text class="num">{{ orderDays.length-index }}</text>
									<text class="hope" v-if="item.expectTime !='' ">期望{{ item.expectTime }}送达</text></text>
								<text class="state">{{ item.orderStatus }}</text></view>
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
								<text class="income">本单收入</text>
								<text class="money">￥{{ item.income }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 历史 -->
				<view v-show="current === 1" scroll-y="true">
					<view class="segmented_box">
						<view class="order_list" v-for="(item,index) in orders" :key="item.id">
							<view class="top">
								<text><text class="num">{{ orders.length-index }}</text>
									<text class="hope">{{ item.payTime }}</text></text>
								<text class="state">{{ item.orderStatus }}</text></view>
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
								<text class="income">本单收入</text>
								<text class="money">￥{{ item.income }}</text>
							</view>
						</view>
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
				items: ["今日订单", "历史订单"],
				current: 0,
				merchantId: '',
				orders: '',
				opens: -1,
				tg: true,
				height_a: "1px",
				orderDays: "",
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.historical_order();
					that.orderDay();
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
						that.height_a = res.statusBarHeight + 44 + 50 + "px";
					}
				})
			},
			onTap: function(index) {
				if (this.current != index) {
					this.current = index;
				};
			},
			historical_order: function() {
				let that = this;
				uni.request({
					url: this.serveipd + '/api/merchant/order/orderStatistics',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						this.orders = res.data.data.datas;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			orderDay: function() {
				let that = this;
				uni.request({
					url: this.serveipd + '/api/merchant/order/orderDay',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						console.log(res);
						that.orderDays = res.data.data.datas;
					},
					fail: () => {},
					complete: () => {}
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
			wz: function(latitude, longitude) {
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function() {
						console.log('success');
					}
				});
			},
			dh: function(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: function(res) {
						console.log(res)
					}
				});
			},
		}
	}
</script>

<style>
	@import url("../../common/order_statistics.css");
	@import url("../../common/new_order.css");
	@import url("../../common/order_enquiry.css");
</style>
