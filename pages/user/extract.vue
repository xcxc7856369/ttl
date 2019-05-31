<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">自提设置</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="store">
			<text>到店自取</text>
			<view class="store_s">
				<switch @change="switch1Change" :checked="pickupstate" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pickup:'',
				pickupstate:false,
				id:'',
				windowHeight:'',
			}
		},
		onLoad() {
			var that=this;
			that.windowHeight = this.statusBarHeight+44;
			uni.getStorage({
				key:'userinfo',
				success:function(res) {
					that.id=res.data.id;
					that.getinfo();
				}
			})
		},
		methods: {
			switch1Change:function(e){
				var that=this;
				if(e.target.value== false){
					that.pickup=0;
					that.pickupstate =false;
				}else{
					that.pickup=1;
					that.pickupstate =true;
				}
				console.log(that.pickup);
				uni.request({
					url:that.serveipd+"/api/merchant/auth/store",
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						pickUp:parseInt(that.pickup),
						id:that.id,
					},
					success: res => {
						console.log(res);
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
			getinfo:function(){
				var that=this;
				uni.request({
					url: that.serveipd+'/api/merchant/auth/info/'+that.id,
					method: 'GET',
					data: {
						id:that.id
					},
					success: res => {
						that.pickup=res.data.data.pickUp;
						console.log(res.data.data.pickUp);
						if(that.pickup == '0'){
							that.pickupstate =false;
						}else{
							that.pickupstate =true;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style>
	.chunck{
		width:100%;
		height:0.5rem;
		background:rgba(238,238,238,1);
	}
	.store{
		display: flex;
		justify-content:space-between;
		border-bottom: 1px solid #ddd;
		height: 2.5rem;
		line-height: 2.5rem;
	}
	.store text{
		width: 50%;
		margin-left:1rem;
		color:#333333;
		font-size:26upx;
	}
	.store_s{
		width: 20%;
		height:2.5rem;
	}
</style>
