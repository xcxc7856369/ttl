<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">收款码</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="title_view">
			<image src="../../static/tool/payicon.png" class="payicon"></image>
			<text class="title">二维码收款</text>
		</view>
		<view class="box">
			<view class="qrcode">
				<image :src="qrimg"></image>
			</view>
			<view class="qrtext">扫一扫，向我付款</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				qrimg:'',
				windowHeight: '',
			}
		},
		onLoad() {
			var that=this;
			that.windowHeight = this.statusBarHeight + 44;
			uni.getStorage({
				key:'userinfo',
				success:function(res) {
					that.id=res.data.id;
					that.getinfo();
				}
			})
		},
		methods:{
			getinfo:function(){
				var that=this;
				uni.request({
					url: that.serveipd+'/api/merchant/auth/info/'+that.id,
					method: 'GET',
					data: {
						id:that.id
					},
					success: res => {
						that.qrimg=res.data.data.qrcodeUrl;
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
		}
		
	}
</script>

<style>
	page{
		background-color:#ED721F;
	}
	.title_view{
		width:90%;
		display: flex;
		justify-content: flex-start;
		background-color: #EEEEEE;
		height: 3.rem;
		line-height: 3rem;
		margin:0.5rem auto 0;
		border-top-left-radius: 0.2rem;
		border-top-right-radius: 0.2rem;
	}
	.payicon{
		width: 1rem;
		height: 1rem;
		margin-top: 1rem;
		margin-left: 1rem;
	}
	.title{
		font-size: 26upx;
		margin-left: 0.5rem;
		color:#ED721F;
	}
	.box{
		width:90%;
		margin:0 auto;
		background-color: #fff;
		height: 24rem;
		overflow: hidden;
	}
	.qrcode{
		width:15rem;
		height: 15rem;
		margin:3rem auto 0;
		margin-top: 3rem;
	}
	.qrcode image{
		width:100%;
		height:100%;
	}
	.qrtext{
		width:100%;
		text-align: center;
		color:#333333;
		font-size: 27upx;
		height: 1rem;
		line-height: 1rem;
		margin-top: 1rem;
	}
</style>
