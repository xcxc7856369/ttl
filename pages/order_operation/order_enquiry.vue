<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class='left' open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">订单查询</view>
			<view class="right"></view>
		</view>
		<view class="query" :style="{top:height}">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="get_time">
				<input type="text" value="" placeholder="请选择要查询的日期" v-model="time" />
				<image src="../../static/order_operation/down.png" mode=""></image>
			</picker>
			<view class="query_btn" @tap="query()">查询</view>
		</view>
		<!-- 主体部分 -->
		<view class="content" :style="{paddingTop:height_a}">
			<!-- 订单列表 -->
			<view class="segmented_box" v-show="display==true">
				<view class="order_list" v-for="(item,index) in order" :key="item.id"  >
					<view class="top">
						<text><text class="num">{{ order.length-index }}</text>
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
			<view class="no_data" v-show="display==false">没有发现相关数据</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	};
	export default {
		data() {
			return {
				height: '',
				time: '',
				data: '',
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				order: [],
				merchantId: '',
				tg: true,
				opens: -1,
				height_a: "",
				display: "",
				page: 1,
				orderstart:1,
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.orderDay();
				}
			});
		},
		onReady() {
			this.getTopheight();
		},
		// 上拉加载
		onReachBottom() {
			this.page++;
			if(this.orderstart==1){
				this.orderDay();
			}else{
				this.down_query();
			}
		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.height = res.statusBarHeight + 44 + "px";
						that.height_a = res.statusBarHeight + 44 + 45 + "px";
					}
				})
			},
			get_time: function(e) {
				this.time = e.target.value
			},
			wz: function(latitude, longitude) {
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function(res) {
						console.log('res');
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
			query: function() {
				let that = this;
				that.new_order=2;
				that.page=1;
				let neworder = [];
				that.order = [];
				uni.showLoading();
				uni.request({
					url: this.serveipd + '/api/merchant/order/completedTime',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						payTime: that.time,
						page: that.page,
					},
					success: res => {
						uni.hideLoading();
						neworder = res.data.data;
						that.order = that.order.concat(neworder);
						if (that.order.length!=0) {
							that.display = true;
						} else {
							that.display = false;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			down_query: function() {
				let that = this;
				let enquiryOrder = [];
				uni.showLoading({
					
				});
				uni.request({
					url: this.serveipd + '/api/merchant/order/completedTime',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						payTime: that.time,
						page: that.page,
					},
					success: res => {
						uni.hideLoading();
						enquiryOrder = res.data.data;
						if(enquiryOrder.length==0){
							uni.showToast({
								title:"没有更多数据了",
								icon:"none"
							})
						}
						that.order = that.order.concat(neworder);
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
			orderDay: function() {
				let that = this;
				let new_order=[];
				uni.showLoading({
					
				});
				uni.request({
					url: this.serveipd + '/api/merchant/order/orderDay',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
						page:that.page
					},
					success: res => {
						uni.hideLoading();
						new_order = res.data.data;
						if(new_order.length==0){
							uni.showToast({
								title:"没有更多数据了",
								icon:"none"
							})
							return
						}
						that.order=	that.order.concat(new_order);
						console.log(that.order.length);
						if (that.order.length!=0) {
							that.display = true;
						} else {
							that.display = false;
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},

		}
	}
</script>

<style>
	@import "../../common/order_enquiry.css";
	@import "../../common/new_order.css";
</style>
