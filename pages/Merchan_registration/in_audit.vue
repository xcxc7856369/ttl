<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<image src="../../static/Merchan_registration/back.png" mode=""></image>
			<text>审核中</text>
		</view>
			<view class="content" :style="{paddingTop:height}">
				<image src="../../static/Merchan_registration/in_audit.png" mode=""></image>
				<text class="h1">审核中</text>
				<text class="p">入驻申请提交成功，工作人员会尽快</text>
				<text class="p">和您取得联系，请耐心等待</text>
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				height:'',
			}
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
		}
	}
</script>

<style>
	@import "../../common/Merchan_registration.css";
	image{
		display: block;
		width: 327.08upx;
		height: 262.5upx;
		margin-top:50vw;
		margin: 50vw auto 0; 	
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
</style>
