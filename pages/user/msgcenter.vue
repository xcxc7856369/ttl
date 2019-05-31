<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">消息中心</view>
				<view class="ttl_right" @tap="checkoff=!checkoff">编辑</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="info" v-for="(item,index) in infor" :key="index">
			<view @tap="check_box(item.id)">
				<image v-show="checkoff" class="check" :src="arr.indexOf(item.id)!=-1?xz:wxz" mode=""></image>
			</view>
			<view :class="[checkoff?'active':'notice']">
				<view class="info_top">
					<view class="info_title">
						<text>系统通知</text>
						<!-- <view class="info_circle"></view> -->
					</view>
					<view class="info_time">
						{{ item.creatTime.slice(0,10)==nowtime?item.creatTime.slice(-8): item.creatTime.slice(0,10)}}
					</view>
				</view>
				<view class="info_state">
					订单{{ item.orderno }}已{{ item.status==1?"完成交易":"取消交易" }}
				</view>
			</view>
		</view>
		<view class="bottom" v-show="checkoff">
			<view class="allElection" @tap="allElection">全选</view>
			<view class="del" @tap="del">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				checkoff: false,
				id: "",
				infor: [],
				nowtime: '',
				arr: [],
				xz: "../../static/user/xz.png",
				wxz: "../../static/user/wxz.png",
			};
		},
		onLoad() {
			var that = this;
			that.windowHeight = this.statusBarHeight + 44;

			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					that.id = res.data.id;
					that.getinfo();
				}
			})
		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			getinfo: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchant/auth/selectMessageList",
					method: 'GET',
					data: {
						merchantId: that.id
					},
					success: res => {
						that.infor = res.data.data;
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
				let time = new Date();
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				if (m < 10) {
					m = "0" + m
				};
				if (d < 10) {
					d = "0" + d
				}
				that.nowtime = y + "-" + m + "-" + d;
				console.log(that.nowtime)
			},
			check_box: function(id) {
				console.log(id);
				let a = this.arr.indexOf(id);
				if (a != -1) {
					this.arr.splice(this.arr.indexOf(id), 1)
				} else {
					this.arr.push(id);
				}
			},
			allElection: function() {
				if (this.arr.length == this.infor.length) {
					this.arr = [];
				} else {
					this.arr = [];
					for (let i = 0; i < this.infor.length; i++) {
						this.arr.push(this.infor[i].id)
					}
				}
			},
			del: function(e) {
				let that = this;
				uni.request({
					url: that.serveipd + "api/merchant/auth/deleteMessageList",
					// header: {
					// 	'Content-type': 'application/x-www-form-urlencoded'
					// },
					method: "POST",
					data: {
						ids: that.arr
					},
					success(res) {
						if(res.code==0){
							that.getinfo();
						}
					}
				})

			}
		},
	}
</script>

<style>
	@import url("../../common/user/msg.css");
</style>
