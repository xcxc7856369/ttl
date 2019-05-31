<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<text>鲁西肥牛</text>
		</view>
		<view class="order_menu" :style="{paddingTop:height}">
			<navigator class="menu_list" url='/pages/order_operation/order_enquiry' hover-class="none">
				<image src="../../static/order_operation/cx.png" mode=""></image>
				<text>订单查询</text>
			</navigator>
			<navigator class="menu_list" url='/pages/order_operation/refund' hover-class="none">
				<image src="../../static/order_operation/tk.png" mode=""></image>
				<text>退款订单</text>
			</navigator>
			<navigator class="menu_list" url='/pages/order_operation/order_statistics' hover-class="none">
				<image src="../../static/order_operation/tj.png" mode=""></image>
				<text>订单统计</text>
			</navigator>
		</view>
		<view class="h3">订单金额记录</view>
		<scroll-view class="order_money" scroll-y="true">
			<view class='order_list' v-for="(item,index) in orders" :key="item.id">
				<view class="head_portrait">
					<image :src="item.headpicUrl" mode=""></image>
				</view>
				<view class="order_infor">
					<text class="name p">{{ item.consigneeName }}</text>
					<text class="time p">{{ item.serviceTime }}</text>
					<view class="number p"><text>{{ item.orderDetails[0].name }} 等{{ item.orderDetails.length }}件商品</text><text class="money">￥{{ item.amount }}</text></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				height: '',
				tab_items: [
					"待处理",
					"订单管理",
					"商品管理",
					"我的"
				],
				merchantId:'',
				orders:'',
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.Record();
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
			Record: function() {
				let that = this;
				uni.request({
					url: this.serveipd + '/api/merchant/order/amountRecord',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						this.orders = res.data.data;
						console.log(this.orders);
					},
					fail: () => {},
					complete: () => {}
				});
			},
		},
	}
</script>

<style>
	@import url("../../common/order_operation.css");
	@import url("../../common/new_order.css");
	scroll-view{
		height: 60vh;
	}
</style>
