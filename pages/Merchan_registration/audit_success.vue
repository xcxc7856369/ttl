<template>
	<view class="content_box">
	<view class='navigation' :style="{height:height}">
		<image src="../../static/Merchan_registration/back.png" mode=""></image>
		<text>商家入驻申请</text>
	</view>
		<image src="../../static/Merchan_registration/img.png" mode=""></image>
		<text class="h1">提交审核成功</text>
		<text class="p">入主申请提交成功，工作人员会尽快</text>
		<text class="p">和您取得联系，请耐心等待</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				height:'',
			}
		},
		onLoad(){
			this.getTopheight();
		},
		methods:{
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.top = 65 + "px";
						that.height = res.statusBarHeight + 44 + "px";
					}
				})
			},
		}
	}
</script>

<style>
		@import "../../common/Merchan_registration.css";
		.content_box{
		}
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
