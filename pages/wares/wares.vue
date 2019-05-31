2<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<view class="left"></view>
			<view class="title">{{ shopname }}</view>
			<navigator class="add_wares right" url="add_wares" hover-class="none">
				<image src="../../static/tj.png" mode=""></image>
			</navigator>
		</view>
		<view class="top_box" :style="{top:height}">
			<view class="sort">
				<view class="title" @tap='open' :class="{tab_active:KG}"><text>全部分类</text>
					<image :src="KG?up:dow" mode=""></image>
				</view>
				<scroll-view class="list" :class="{active:KG}" scroll-y="true" style="height:400upx">
					<view v-for="(item,index) in allCategories" :key="item.id" @tap="getCommodity(item.id)">{{ item.name }}</view>
				</scroll-view>
			</view>
			<view class="sort">
				<view class="title" @tap='open_screen' :class="{tab_active:KG_sc}"><text>筛选</text>
					<image :src="KG_sc?up:dow" mode=""></image>
				</view>
				<view class="list right" :class="{active:KG_sc}">
					<view v-for="(item,index) in state" :key="index" @tap="screen(index)">{{ item }}</view>
				</view>
			</view>
		</view>
		<view class="content" :style="{paddingTop:height_a}">
			<view class="wares_box">
				<view class="wares_list" v-for="(item,index) in commodities" :key="item.id">
					<view>
						<image :src="item.iconUrl" mode=""></image>
					</view>
					<view class="wares_infor">
						<text class="name">{{ item.name }}</text>
						<text class="sales_volume">月售{{ item.sell_num }}</text>
						<view>
							<text class="money">￥{{ item.price }}</text>
							<button class="down" :class="[key==index?'off_shelf':'']" @tap="cease(item.id,index)" v-if="item.enabled!=0">下架</button>
							<button class="down off_shelf" v-else>已下架</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				height_a: '',
				KG: false,
				KG_sc: false,
				state: ["在售中", "已售空", "已下架"],
				allCategories: [],
				commodities: [],
				id: '',
				dow: '../../static/x.png',
				up: '../../static/s.png',
				key:-1,
				page:1,
				shopname:'',
			}
		},
		onLoad() {
	
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.shopname=e.data.name;
					that.getSort();
				}
			});
		},
		// 上拉加载
		onReachBottom() {
			this.page++;
			this.downCommodity();
		},
		onReady() {
			this.getTopheight();
		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.height = res.statusBarHeight + 44 + "px";
						that.height_a = res.statusBarHeight + 44 + 50 + "px";
					}
				})
			},
			open: function() {
				this.KG = !this.KG;
				this.KG_sc = false;
			},
			open_screen: function() {
				this.KG_sc = !this.KG_sc;
				this.KG = false;
			},
			getSort: function() {
				let that = this;
				that.allCategories=[];
				uni.request({
					url: this.serveipd + '/api/merchantApi/allCategories',
					method: 'GET',
					data: {
						merchantId: that.merchantId,
					},
					success: res => {
						console.log(res);
						for (let i = 0; i < res.data.data.length; i++) {
							that.allCategories.push(res.data.data[i])
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getCommodity: function(category_id) {
				this.KG = !this.KG;
				let that = this;
				that.id = category_id;
				that.page=1;
				that.commodities=[];
				uni.showLoading();
				uni.request({
					url: this.serveipd + "/api/merchantApi/classified",
					method: "GET",
					data: {
						merchantId: that.merchantId,
						category_id: category_id
					},
					success(res) {
						console.log(res)
						uni.hideLoading();
						let list = [];
						list=res.data.data.datas;
						that.commodities=(that.commodities.concat(list));
					}
				})
			},
			downCommodity: function() {
				let that = this;
				uni.showLoading();
				uni.request({
					url: this.serveipd + "/api/merchantApi/classified",
					method: "GET",
					data: {
						merchantId: that.merchantId,
						category_id: that.id,
						page:that.page
					},
					success(res) {
						console.log(res);
						uni.hideLoading();
						let list = [];
						list=res.data.data.datas;
						if(list.length==0){
							uni.showToast({
								title:"没有更多数据",
								icon:"none"
							})
						}
					    that.commodities=that.commodities.concat(list);
					}
				})
			},
			screen: function(commodityStatus) {
				this.KG_sc = !this.KG_sc;
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchantApi/screen",
					method: "GET",
					data: {
						merchantId: that.merchantId,
						commodityStatus: commodityStatus,
						category_id: that.id
					},
					success(res) {
						console.log(res);
						let list = [];
						for (let i = 0; i < res.data.data.datas.length; i++) {
							list.push(res.data.data.datas[i]);
						}
						that.commodities = list;
					}
				});
			},
			// 下架
			cease: function(id, index) {
				let that = this;
				uni.request({
					url: this.serveipd + "/api/merchantApi/lowerShelf",
					method: "GET",
					data: {
						id: id,
						enabled: 0,
					},
					success(res) {
						let result=that.commodities.find(item=>item.id==id);
						result.enabled =0;
						console.log(res);
					}
				})
			},
		}
	}
</script>

<style>
	@import url("../../common/wares.css");
</style>
