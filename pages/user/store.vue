<template>
	<view class="box">
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">店铺设置</view>
				<view class="ttl_right"></view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="info">
			<navigator url="/pages/user/basicinfo" class="info_url">
				<text>基本信息</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/user/storemag" class="info_url">
				<text>店铺管理</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/user/extract" class="info_url">
				<text>自提设置</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/user/printer" class="info_url">
				<text>打印机设置</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/scene/scene" class="info_url">
				<text>店铺实景</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/user/busnotice" class="info_url">
				<text>店铺公告</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/user/busintro" class="info_url">
				<text>店铺介绍</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
	</view>
	
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default{
		components: {
			uniIcon
		},
		data(){
			return{
				windowHeight:'',
				uinfo:{
					outpic:'',
					address:'',
					id:'',
				}
			}
		},
		onLoad() {
			var that=this;
			console.log(this.statusWindowHeight);
			that.windowHeight=this.statusWindowHeight;
			console.log(that.windowHeight);
			uni.getStorage({
				key:'userinfo',
				success:function(res) {
					that.uinfo.id=res.data.id;
				}
			})
			
		},
		methods: {
			getinfo:function(){
				var that=this;
				uni.request({
					url: that.serveipd+"/api/merchant/auth/info/"+that.uinfo.id,
					method: 'GET',
					data: {
						id:that.uinfo.id
					},
					success: (res) => {
						that.uinfo.outpic=res.data.data.licensePicUrl;
						that.uinfo.address=res.data.data.address;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			back:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			
		},
	}
</script>

<style>
	.box{
		width: 100%;
	}
	.chunck{
		width:100%;
		height:0.5rem;
		background:rgba(238,238,238,1);
	}
	.info{
		width:100%;
		display: flex;
		justify-content:space-between;
		border-bottom: 1px solid #EEEEEE;
	}
	.info_url{
		width: 100%;
		display:flex;
		justify-content:space-between;
		height: 2.5rem;
		line-height: 2.5rem;
	}
	.info_url text{
		margin-left: 1rem;
		font-size:27upx;
		color: #333333;
	}
	.info_url .uni-icon{
		margin-right: 1rem;
		margin-top:0.7rem;
	}
</style>
