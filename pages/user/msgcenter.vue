<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">消息中心</view>
				<view class="ttl_right" @tap="edit()"> 编辑</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="info">
			<image v-show="checkoff" class="check" src="../../static/user/wxz.png" mode=""></image>
			<view class="notice">
				<view class="info_top">
					<view class="info_title">
						<text>系统通知</text>
						<view class="info_circle"></view>
					</view>
					<view class="info_time">
						14:03
					</view>
				</view>
				<view class="info_state">
					订单12345678已完成交易
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				checkoff:false
			};
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
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			getinfo: function() {
				let that=this;
				uni.request({
					url: that.serveipd+"",
					method: 'GET',
					data: {},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
			edit:function(){
				this.checkoff=true;
			}
		},
	}
</script>

<style>
@import url("../../common/user/msg.css");
</style>
