<template>
	<view class="content" style="background-image:url(../../static/login/register_bg.png)">
		<view class="box">
			<view class="reg_view">
				<view class="title"><img src="../../static/login/reg_phone.png" alt=""></view>
				<input class="reg_input" placeholder="请输入手机号" v-model="denglu.phone" placeholder-style="color:#fff;"/>
			</view>
			<view class="reg_view">
				<view class="title"><img src="../../static/login/reg_password.png" alt=""></view>
				<input class="reg_input" placeholder="请输入密码" v-model="denglu.password" placeholder-style="color:#fff;"/>
			</view>
			<view class="forget_view">
				<navigator url="" class="forget_a">忘记密码？</navigator>
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
					mescode:'',
				}
			}
		},
		onLoad() {

		},
		methods: {
			login_tap: function() {
				var that = this;
				uni.request({
					url: this.serveipd+'/api/merchant/auth/login',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						mobile: that.denglu.phone,
						password: that.denglu.password
					},
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log('错误');
					},
					complete: () => {}
				});
			},
			reg_page:function(){
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
		width:100%;
		height:100vh;
		background-size: 100% 100%;
	}
	.box {
		display:flex;
		width:72%;
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
		padding-bottom:19upx;
		margin-top:40upx;
	}
	.reg_view_two{
		border:none;
	}
	.title {
		display:flex;
		justify-content: center;
		align-items: center;
		width:17%;
		overflow: hidden;
	}
	.title img {
		width:35%;
		height:39upx;
	}
	.reg_input {
		width:60%;
		color:#fff;
		height:39upx;
		line-height:39upx;
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
</style>
