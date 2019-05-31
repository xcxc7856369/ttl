<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">店铺管理</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="store">
			<text>营业中</text>
			<view class="store_s">
				<switch @change="switch1Change" :checked="storeone"/>
			</view>
		</view>
		<view class="store">
			<text>休息</text>
			<view class="store_s">
				<switch @change="switch3Change" :checked="storethree"/>
			</view>
		</view>
		<view class="store">
			<text>致忙</text>
			<view class="store_s">
				<switch @change="switch4Change" :checked="storefour"/>
			</view>
		</view>
	</view>	
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				state:'',
				storeone:false,
				storetwo:false,
				storethree:false,
				storefour:false,
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
			getinfo:function(){
				var that=this;
				uni.request({
					url: that.serveipd+'/api/merchant/auth/info/'+that.id,
					method: 'GET',
					data: {
						id:that.id
					},
					success: res => {
						that.state=res.data.data.state;
						switch (that.state){
							case 1:
								that.storeone=true;
								console.log(that.storeone);
								that.storetwo=false;
								that.storethree=false;
								that.storefour=false;
								break;
							case 2:
							console.log('22');
								that.storeone=false;
								that.storetwo=true;
								that.storethree=false;
								that.storefour=false;
							   break;
							case 3:
							console.log('33');
								that.storeone=false;
								that.storetwo=false;
								that.storethree=true;
								that.storefour=false;
							   break;
							case 4:
							console.log('44');
								that.storeone=false;
								that.storetwo=false;
								that.storethree=false;
								that.storefour=true;
							   break;
							default:
							console.log('aaaaaa');
								break;
						}
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
			switch1Change:function(e){
				var that=this;
				if(e.target.value == true){
					that.storeone=true;
					that.storetwo=false;
					that.storethree=false;
					that.storefour=false;
					that.state=1;
				}else{
					that.storeone=false;
					that.storetwo=true;
					that.state=2;
				}
				uni.request({
					url:that.serveipd+"/api/merchant/auth/code",
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						statusCode:parseInt(that.state),
						id:parseInt(that.id),
					},
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			switch3Change:function(e){
				var that=this;
				if(e.target.value == true){
				 	that.storeone=false;
				 	that.storetwo=false;
				 	that.storethree=true;
				 	that.storefour=false;
					that.state=3;
				}else{
					that.storethree=false;
					that.storetwo=true;
					that.state=2;
				}
				uni.request({
					url:that.serveipd+"/api/merchant/auth/code",
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						statusCode:parseInt(that.state),
						id:parseInt(that.id),
					},
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			switch4Change:function(e){
				var that=this;
				if(e.target.value == true){
				  	that.storeone=false;
				  	that.storetwo=false;
				  	that.storethree=false;
				  	that.storefour=true;
					that.state=4;
				}else{
					that.storethree=false;
					that.storetwo=true;
					that.state=2;
				}
				uni.request({
					url:that.serveipd+"/api/merchant/auth/code",
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						statusCode:parseInt(that.state),
						id:parseInt(that.id),
					},
					success: res => {
					},
					fail: () => {},
					complete: () => {}
				});
			},
		},
	}
</script>

<style>
	.chunck{
		width:100vw;
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
		width: 50vw;
		margin-left:1rem;
		color:#333333;
		font-size:26upx;
	}
	.store_s{
		width: 20vw;
		height:2.5rem;
	}
</style>
