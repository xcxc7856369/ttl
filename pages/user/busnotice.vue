<template>
	<view class="box">
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">店铺公告</view>
				<view class="ttl_right">
					<view class="ttl_right_btn" @tap="preserve">保存</view>
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="busnotice">
			<view class="text_view">
				<textarea class="notice" maxlength="1000" placeholder="请输入店铺公告..." @input="bindTextAreaBlur" v-model="bustext">
			</textarea>
			</view>
			<view class="wordnum">{{wordnumer}}/1000</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				wordnumer: 0,
				id: '',
				bustext: '',
				windowHeight: '',
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
			getinfo: function() {
				var that = this;
				uni.request({
					url: that.serveipd + '/api/merchant/auth/info/' + that.id,
					method: 'GET',
					data: {
						id: that.id
					},
					success: res => {
						that.bustext = res.data.data.shopAnnouncement;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bindTextAreaBlur: function(e) {
				var that = this;
				that.wordnumer = e.target.value.length;
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			preserve: function() {
				var that = this;
				uni.request({
					url: this.serveipd + '/api/merchant/auth/announcement',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						id: parseInt(that.id),
						shopAnnouncement: that.bustext,
					},
					success: res => {
						uni.showToast({
							title: res.data.msg,
							icon:'none',
							mask: false,
							duration: 1500
						});
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
	.busnotice{
		width: 100vw;
		background-color: #FFFFFF;
	}
	.text_view {
		display: flex;
		justify-content: center;
		width: 100vw;
		margin-top: 0.5rem;
	}

	.notice {
		width: 90%;
		height: 25rem;
		padding-top: 0.5rem;
		line-height: 1.2rem;
		font-size: 26upx;
	}

	.wordnum {
		width: 90%;
		height: 1rem;
		font-size: 26upx;
		color: #333333;
		margin: 3rem auto 0;
		text-align: right;
	}
</style>
