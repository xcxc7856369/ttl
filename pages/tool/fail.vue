<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">验券</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="viewimg">
			<image src="../../static/tool/fail.png" mode=""></image>
		</view>
		<view class="title">验证失败:{{mes}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				windowHeight: '',
				mes:'',
			}
		},
		onLoad(option){
			var that = this;
			that.mes=option.mes;
			that.windowHeight = this.statusBarHeight + 44;
		},
		methods:{
			back: function() {
			uni.navigateBack({
				delta: 1
			});
			},
		}
	}
</script>

<style>
	.viewimg{
		width:5rem;
		height: 5rem;
		margin:10rem auto 0;
	}
	.viewimg image{
		width: 100%;
		height: 100%;
	}
	.title{
		width:100%;
		height:1rem;
		font-size:28upx;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:1.6rem;
		margin-top: 2rem;
		text-align: center;
	}
</style>
