<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">团购券验证记录</view>
				<view class="ttl_right">
					<i class="iconfont">&#xe612;</i>
					<view class="ttl_right_btn" @tap="preserve">编辑</view>
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="uni-list">
			<view class="labe_list" v-for="item in coupon" :key="item.value">
				<view class="info">
					<view>团购券码：{{item.ticketNo}}</view>
					<view>验证时间：{{item.usedTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:'',
				windowHeight: '',
				coupon:[],
			}
		},
		onLoad() {
			var that = this;
			that.windowHeight = this.statusBarHeight + 44;
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					that.id = res.data.id;
					that.getinfo();
				}
			})
		},
		methods: {
			getinfo:function(){
				var that=this;
				uni.request({
					url: this.serveipd + "/api/merchant/money/groupTickets",
					method: 'GET',
					data: {
						merchantId:that.id,
					},
					success: res => {
						console.log(res.data);
						that.coupon = res.data.data.datas;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			preserve:function() {
				uni.redirectTo({
					url: '/pages/tool/couponrecord',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	@import "../../common/tool/couponrecord";
</style>
