<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<image src="../../static/Merchan_registration/back.png" mode=""></image>
			<text>未通过</text>
		</view>
			<view class="content" :style="{paddingTop:height}">
				<image class="img" src="../../static/Merchan_registration/not_pass.png" mode=""></image>
				<text class="h1">审核未通过</text>
				<text class="p">入驻申请审核未通过，请重新申请入驻</text>
				<text class="p">对您造成的不便敬请谅解</text>
			</view>
			<button type="primary" @tap="apply">重新发起入驻申请</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				height:'',
				userid:'',
			}
		},
		onLoad(e){
		this.userid=e.id;
		},
		onReady(){
				this.getTopheight();
		},
		methods:{
				getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.height = res.statusBarHeight + 44 + "px";
					}
				})
			},
			apply:function(){
				uni.navigateTo({
					url:"/pages/Merchan_registration/Merchan_registration?id="+this.userid,
				})
			}
		}
	}
</script>

<style>
	.img{
		display: block;
		width: 327.08upx;
		height: 262.5upx;
		margin: 20vw auto 0; 	
	}
	text{
		display: block;
		font-size: 45.83upx;
		text-align: center;
	}
	.h1{
		display: block;
		color:#000000;
		margin: 20px 0;
	}
	.p{
		font-size: 30.55upx;
		color:#888888;
	}
	button{
		width: 80vw;
		margin: 0 auto; 
		font-size: 16px;
		margin-top: 20vw;
		background: #ED721F !important;
	}
</style>
