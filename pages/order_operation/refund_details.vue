<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class='left' open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">退款订单详情</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}" v-for="(item,index) in orderInfor" :key="index">
			<view class="h3">商品清单</view>
			<view class="detailed_list">
				<view class="order_details">
					<view class="sp_list_infor" v-for="(sp,i) in item.riderNewOrders" :key="i">
						<text class="name">{{ sp.name }}</text>
						<view class="right">
							<text class="number">X{{ sp.number }}</text>
							<text class="money">￥{{ sp.singlePrice }}</text>
						</view>
					</view>
				</view>
				<view class="cost">
					<view class="transport_cost"><text>配送费</text><text>￥{{ item.commodityFeeBox.delivery }}</text></view>
					<view class="box_cost"><text>餐盒费</text><text>￥{{ item.commodityFeeBox.lunch }}</text></view>
					<view class="payment">
						<text>总计:￥{{ item.totalFee }}</text>
						<text>实付：<text class="red">￥{{ item.amount }}</text></text>
					</view>
				</view>
			</view>
			<view class="h3">订单信息</view>
			<view class="order_infor ">
				<view><text class="title">订单号码</text><text> {{ item.orderno }}</text></view>
				<view><text class="title">申请时间</text><text> {{ item.createTime }}</text></view>
				<view><text class="title">退款金额</text><text class="red">{{ item.amount }}</text></view>
				<view><text class="title">退款原因</text><text></text></view>
			</view>
			<view class="btn_box">
				<view class="refuse" @tap="tg=true">拒绝退款</view>
				<view class="agree" @tap="agree()">同意退款</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view class="mask" v-show="tg">
			<view class="norms">
				<view class="title">拒绝原因</view>
				<view><input type="text" placeholder="请输入退款原因" v-model="refuseToReason"></view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="determine()">确定</text></texte>
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
				orderno: '',
				orderInfor: [],
				merchantId: '',
				tg:'',
				refuseToReason:'',
			}
		},
		onLoad(e) {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
				}
			});
			that.orderno = e.orderno;
			that.loadInfor();
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
			loadInfor: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchant/order/refund",
					method: 'GET',
					data: {
						orderno: that.orderno,
					},
					success(res) {
						that.orderInfor.push(res.data.data);
						console.log(that.orderInfor);
					}
				});
			},
			agree: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchant/order/agreeToRefund",
					method: "GET",
					data: {
						orderno: that.orderno
					},
					success(res) {
						console.log(res);
						uni.showToast({
							title: '退款成功',
							mask: false,
							duration: 2000,
							success() {
								setTimeout(function() {
									uni.navigateTo({
										url:"./refund"
									})
								}, 2000);

							}
						});

					}
				})
			},
			// 取消
			cancel:function(){
				this.tg=false;
				this.refuseToReason='';
			},
			// 确定拒绝
			determine:function () {
				this.tg=false;
				this.refuse();
			},
			refuse: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchant/order/merchantRefusedToRefund",
					method: "GET",
					data: {
						orderno: that.orderno,
						merchantId: that.merchantId,
						refuseToReason:that.refuseToReason,
					},
					success(res) {
						uni.showToast({
							title: '已拒绝退款',
							mask: false,
							duration: 2000,
							success() {
								setTimeout(function() {
										uni.navigateTo({
										url:"./refund"
									})
								}, 2000);

							}
						});
					}
				})
			},
		}
	}
</script>

<style>
	@import url("../../common/refund_details.css");
	@import url("../../common/new_order.css");
</style>
