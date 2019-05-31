<template>
	<view class="content" style="background-image:url(../../static/login/register_bg.png)">
		<view class="box">
			<view class="reg_view">
				<view class="title">
					<image src="../../static/login/reg_phone.png" alt=""></image>
				</view>
				<input class="reg_input" placeholder="请输入手机号" v-model="denglu.phone" placeholder-style="color:#fff;" />
			</view>
			<view class="reg_view">
				<view class="title">
					<image src="../../static/login/reg_password.png" alt=""></image>
				</view>
				<input class="reg_input" placeholder="请输入密码" v-model="denglu.password" placeholder-style="color:#fff;" :password="denglu.imgtype" />
				<view class="pw_view">
					<image :src="denglu.pwtype" class="codeimg" @click='pwshow'></image>
				</view>
			</view>
			<view class="forget_view">
				<view class="forget_a" @tap="forgetfuc">忘记密码？</view>
			</view>
			<view class="btn_view">
				<button class="login" @tap="login_tap">登录</button>
			</view>
			<view class="btn_view">
				<button class="register" @tap="reg_page">新用户注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				denglu: {
					phone: '',
					password: '',
					mescode: '',
					pwtype: '../../static/login/eye_close.png',
					imgtype: true,
					datastate: '1',
				}
			}
		},
		created() {
			var that=this;
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					uni.request({
						url:that.serveipd+"/api/merchant/auth/approval",
						method: 'POST',
						header: {
						'content-type': 'application/x-www-form-urlencoded',
					     },
						data:{
							customerId:res.data.userid,
						},
						success(e) {
							if (e.data.data.status == 1) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/in_audit',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};
							if (e.data.data.status == 2) {
								uni.switchTab({
									url: '/pages/new_order/new_order',
								})
							};
							if (e.data.data.status == 3) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/not_pass?id='+res.data.userid,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};
							if (e.data.data.status == 4) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/Merchan_registration?id=' + res.data.data.customer.id,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};	
						}
					})
				}
			})
		},
		methods: {
			forgetfuc: function() {
				uni.navigateTo({
					url: './retrieve',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			pwshow: function() {
				var that = this;
				if (that.denglu.datastate == '1') {
					that.denglu.pwtype = '../../static/login/eye_open.png';
					that.denglu.datastate = '2';
					that.denglu.imgtype = false;
				} else {
					that.denglu.pwtype = '../../static/login/eye_close.png';
					that.denglu.datastate = '1';
					that.denglu.imgtype = true;
				}
			},
			login_tap: function() {
				var that = this;
				uni.request({
					url: this.serveipd + '/api/merchant/auth/login',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						mobile: that.denglu.phone,
						password: that.denglu.password
					},
					success: (res) => {
						console.log(res.data.data.id);
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: false,
							duration: 1500
						});
						if (res.data.code == 0) {
							if (res.data.data.status == 2) {
								uni.switchTab({
									url: '/pages/new_order/new_order',
								})
							};
							if (res.data.data.status == 4) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/Merchan_registration?id=' + res.data.data.customer.id,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};
							if (res.data.data.status == 1) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/in_audit',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};
							if (res.data.data.status == 3) {
								uni.navigateTo({
									url: '/pages/Merchan_registration/not_pass'+res.data.data.customer.id,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							};
							uni.setStorage({
								key: 'userinfo',
								data: {
									mobile: that.denglu.phone,
									password: that.denglu.password,
									id: res.data.data.id,
									userid: res.data.data.customer.id,
									status: res.data.data.status
								}
							});
						};

					},
					fail: (err) => {
						uni.showToast({
							title: '登陆失败',
							mask: false,
							icon: 'none',
							duration: 1500
						});
					},
					complete: () => {}
				});
			},
			reg_page: function() {
				uni.navigateTo({
					url: '/pages/login/register',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
	}

	.box {
		display: flex;
		width: 72%;
		margin: 0 auto;
		flex-direction: column;
		padding-top: 180upx;
		box-sizing: border-box;
	}

	.reg_view {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-bottom: 1px solid #fff;
		padding-bottom: 19upx;
		margin-top: 40upx;
	}

	.reg_view_two {
		border: none;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 17%;
		overflow: hidden;
	}

	.title image {
		width: 35%;
		height: 39upx;
	}

	.reg_input {
		width: 60%;
		color: #fff;
		height: 39upx;
		line-height: 39upx;
		font-size: 24upx;
	}

	.forget_view {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 80upx;
		line-height: 80upx;
	}

	.forget_a {
		color: #fff;
		font-size: 24upx;
	}

	.btn_view {
		width: 100%;
		height: 100upx;
		border-radius: 5upx;
		margin: 50upx auto 0;
	}

	.login {
		width: 100%;
		height: 100%;
		background-color: #fff;
		color: #E33E09;
		line-height: 100upx;
		font-size: 36upx;
	}

	.register {
		width: 100%;
		height: 100%;
		color: #fff;
		background-color: #FF520C;
		border: 1px solid #fff;
		line-height: 100upx;
		font-size: 36upx;
	}

	.pw_view {
		width: 23%;
		display: flex;
		height: 39upx;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-top: 9upx;
	}

	.pw_view image {
		width: 32upx;
		height: 18upx;
	}
</style>
