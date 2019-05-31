<template>
	<view class="content" style="background-image:url(../../static/login/register_bg.png)">
		<view class="box">
			<view class="reg_view">
				<view class="title"><image src="../../static/login/reg_phone.png" alt=""></image></view>
				<input class="reg_input" placeholder="请输入手机号" v-model="regis.phone" placeholder-style="color:#fff;"/>
			</view>
			<view class="reg_view">
				<view class="title"><image src="../../static/login/reg_phone.png" alt=""></image></view>
				<input class="reg_input" placeholder="请输入图形验证码"  v-model="regis.codeimg" placeholder-style="color:#fff;" />
				<view class="yzimg">
					<image :src="regis.picCode" class="codeimg" @click="piccode"></image>
				</view>
			</view>
			<view class="reg_view">
				<view class="title"><image src="../../static/login/reg_code.png" alt=""></image></view>
				<input class="reg_input" placeholder="请输入验证码" v-model="regis.mescode" placeholder-style="color:#fff;" />
				<button class="reg_code" @tap="sendcode" :disabled="regis.butDis">{{regis.now}}</button>
			</view>
			<view class="reg_view">
				<view class="title"><image src="../../static/login/reg_password.png" alt=""></image></view>
				<input class="reg_input" placeholder="请输入新密码" v-model="regis.password" placeholder-style="color:#fff;" :password="regis.imgtype"/>
				<view class="pw_view" ><image :src="regis.pwtype"   @click='pwshow'></image></view>
			</view>
			<view class="btn_view">
				<button class="login" @tap="login_tap">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				regis: {
					yanzhengma:this.serveipd+"/api/auth/smscode",
					zhuce: this.serveipd+'/api/auth/forget',
					phone: '',
					password: '',
					mescode:"",
					dealstate:'',
					uuid:"",
					smscodes:'',
					now:'发送验证码',
					butDis:false,
					codeimg:"",
					picCode:"",
					pwtype:"../../static/login/eye_close.png",
					datastate:"1",
					imgtype:true,
				},
				check: '../../static/login/bg.png',
				check_img:'1',
			}
		},
		onLoad() {
			this.yanzheng();
		},
		methods: {
			pwshow:function(){
				var that= this;
				if(that.regis.datastate == '1'){
					that.regis.pwtype='../../static/login/eye_open.png';
					that.regis.datastate='2';
					that.regis.imgtype=false;
				}else{
					that.regis.pwtype='../../static/login/eye_close.png';
					that.regis.datastate='1';
					that.regis.imgtype=true;
				}
			},
			yanzheng:function(){
				var that=this;
				var timestamp2 = (new Date()).valueOf();
				var namb = Math.ceil(Math.random()*1000999);
				that.regis.uuid = timestamp2 + namb;
				that.regis.picCode=this.serveipd+"/api/auth/picCode?uuid="+that.regis.uuid;
			},
			piccode: function() {
				var that = this;
				var timestamp2 = (new Date()).valueOf();
				var namb = Math.ceil(Math.random()*1000999);
				that.regis.uuid = timestamp2 + namb;
				that.regis.picCode = this.serveipd+"/api/auth/picCode?uuid="+that.regis.uuid;
				console.log(that.regis.picCode );
			},
			sendcode:function(){
				var that = this;
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
				var phoneNum = that.regis.phone;
				var flag = reg.test(phoneNum); 
				if(flag){
					uni.request({
						url: that.regis.yanzhengma, 
						method: 'GET',
						data: {
							mobile: that.regis.phone,
							uuid:that.regis.uuid,
							picCode:that.regis.codeimg,
						},
						success: (res) => {
							that.regis.smscodes = res.data.data;
							var currentTime = 60;
							console.log(res.data.data);
							that.regis.now = currentTime + '秒';
							that.regis.butDis = true;
							var interval = setInterval(function() {
								that.regis.now = currentTime - 1 + '秒';
								currentTime--;
								if (currentTime <= 0) {
									clearInterval(interval);
									that.regis.now = '发送验证码';
									that.regis.butDis = false;
								}
							}, 1000);
						}
					});
				}else{
					uni.showToast({
						title: '请输入正确的手机号',
						icon:"none",
						mask:true,
						duration: 2000
					});
				}
			},
			
			login_tap: function() {
				var that = this;
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
				var phoneNum = that.regis.phone;
				var flag = reg.test(phoneNum);
				if(!flag){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none",
						mask:true,
						duration: 2000
					})
				}
				if(that.regis.mescode == ""){
					uni.showToast({
						title:"请输入验证码",
						icon:'none',
						mask:true,
						duration:2000
					});
					return false;
				}
				if(that.regis.password == ""){
					uni.showToast({
						title:"请输入密码",
						icon:'none',
						mask:true,
						duration:2000
					});
					return false;
				}
				uni.request({
					url: that.regis.zhuce,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						mobile: that.regis.phone,
						password: that.regis.password,
						smscode: that.regis.mescode,
					},
					success: (res) => {
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							mask:true,
							duration:2000
						});
						uni.navigateTo({
							url:'/pages/login/login'
						})
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							title:err.data.msg,
							icon:'none',
							mask:true,
							duration:2000
						})
					},
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
	.title image{
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
		font-size: 20upx;
	}

	.btn_view {
		width: 100%;
		height: 100upx;
		border-radius: 5upx;
		margin: 50upx auto 0;
	}
	.login{
		width: 100%;
		height: 100%;
		background-color:#fff;
		color:#E33E09;
		line-height: 100upx;
	}
	.reg_input_two{
		width: 50%;
	}
	.reg_code{
		width: 25%;
		padding:0;
		font-size: 20upx;
		height: 50upx;
		line-height: 50upx;
		background-color: #fff;
		color:#E33E09;
		border-radius: 20upx;
	}
	.yzimg{
		width: 25%;
		height: 50upx;
	}
	.yzimg image{
		width: 100%;
		height: 100%;
	}
	.deal_text{
		color: #fff;
		font-size: 24upx;
	}
	.check_btn{
		width:24upx;
		height: 24upx;
	}
	.uni-checkbox-input{
		background-color:none;
		border:#fff;
	}
	.agreement_box {
		display: flex;
		height: 60upx;
		line-height: 60upx;
	}
	.agreement_icon {
		width: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 3%;
	}
	.agreement_icon image {
		width: 30upx;
		height: 30upx;
	}
	.agreement_text {
		display: flex;
		font-size: 28upx;
		width: 670upx;
		color: #fff;
	}
	.pw_view{
		width:23%;
		display:flex;
		height: 39upx;
		flex-direction:row;
		justify-content: flex-end;
		align-items:center;
		margin-top: 9upx;
	}
	.pw_view image{
		width: 32upx;
		height: 18upx;
	}
</style>
