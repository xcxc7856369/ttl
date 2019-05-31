<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">基本设置</view>
				<view class="ttl_right">
					<view class="ttl_right_btn" @tap="preserve">保存</view>
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="list_v">
			<text class="title">店铺名称</text>
			<input class="info" v-model="storename"></input>
		</view>

		<view class="list_v">
			<text class="title">接单电话</text>
			<input class="info" v-model="phone"></input>
		</view>
		<view class="list_v">
			<text class="title">负责人电话</text>
			<input class="info" v-model="phone"></input>
		</view>
		<view class="list_v">
			<text class="title">店铺地址</text>
			<input class="info" v-model="address"></input>
		</view>
		<view class="list_v" @tap="tg = 'block'">
			<text class="title">营业时间</text>
			<view class="info">
				{{workTime=="00:00-24:00"?"24小时营业":workTime}}
			</view>
		</view>
		<view class="list_v  logo">
			<text class="title ">店铺商标</text>
			<image :src="old_log" mode="aspectFit" @tap="add_logo"></image>
		</view>
		<view class="list_v logo">
			<text class="title">营业执照/资格证</text>
			<image :src="old_license" mode="aspectFit" @tap="add_license"></image>
		</view>
		<!-- 营业时间弹窗 -->
		<view class="mask" :style="{display:tg}">
			<view class="norms">
				<view class="title">营业时间</view>
				<view class="policy_list"><text>营业日</text>
					<picker mode="multiSelector" @columnchange="weekChange" :value="weekIndex" :range="weekArray">
						<view class="uni-input">{{ day }}</view>
					</picker>
				</view>
				<view class="policy_list"><text>24小时可用</text>
					<switch @change="switchChange" class="switchbtn" :checked="allday" />
				</view>
				<view class="policy_list" v-show="!allday">
					<text>营业时间</text>
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="determine()">确定</text></texte>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				tg: "none",
				id: '',
				storename: '',
				trademark: '',
				phone: '',
				phonetwo: '',
				address: '',
				bushours: '',
				windowHeight: '',
				logo_id: '',
				workDay: '',
				workTime: '',
				day: '选择日期',
				time: '选择时间',
				license_id: '',
				license_src: "../../static/user/sczt.png",
				logo_src: '../../static/user/sczt.png',
				multiArray: [
					['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
						'13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
					],
					['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
						'13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
					],
				],
				multiIndex: [0, 0],
				weekArray: [
					['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				],
				weekIndex: [0, 0],
				workTime: "24小时营业",
				workDay: '周一至周一',
				allday: false,
				old_log: '',
				old_license: '',

			}
		},
		onLoad(res) {
			let that = this;
			that.windowHeight = this.statusBarHeight + 44;
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					that.id = res.data.id;
					that.getinfo();
				}
			})
			console.log(that.workDay, that.workTime)
		},
		methods: {
			// 获取信息
			getinfo: function() {
				var that = this;
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: that.serveipd + '/api/merchant/auth/info/' + that.id,
					method: 'GET',
					data: {
						id: that.id
					},
					success: res => {
						console.log(res.data);
						that.storename = res.data.data.name;
						that.address = res.data.data.shopAddress;
						that.phone = res.data.data.mobile;
						that.old_license = res.data.data.licensePicUrl;
						that.old_log = res.data.data.shopTrademarkUrl;
						if (res.data.data.businessHours == "00:00-24:00") {
							that.workTime = "24小时营业"
						};
						uni.hideLoading();
					},
					fail: () => {},
					complete: () => {}
				});
			},

			// 添加LOGO
			add_logo: function() {
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						this.logo_src = res.tempFilePaths[0];
						this.old_log = this.logo_src;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile",
							filePath: that.logo_src,
							name: 'upfile',
							formData: {},
							success: (res) => {
								console.log(1);
								that.logo_id = parseInt((JSON.parse(res.data).id));
							},
						});
					}
				})
			},
			// 添加执照
			add_license: function() {
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						this.license_src = res.tempFilePaths[0];
						this.old_license = this.license_src;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile",
							filePath: that.license_src,
							name: 'upfile',
							formData: {},
							success: (res) => {
								console.log(2);
								that.license_id = parseInt((JSON.parse(res.data).id));
							},
						});
					}
				})
			},
			// 营业日
			weekChange: function(e) {
				this.weekIndex[e.detail.column] = e.detail.value
				this.day = this.weekArray[0][this.weekIndex[0]] + "至" + this.weekArray[1][this.weekIndex[1]];
				this.$forceUpdate()
			},
			// 营业时间
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				this.time = this.multiArray[0][this.multiIndex[0]] + "-" + this.multiArray[1][this.multiIndex[1]];
				console.log(this.workTime)
				this.$forceUpdate()
			},
			cancel: function() {
				this.tg = "none";
			},
			// 24小时切换
			switchChange: function(e) {
				var that = this;
				that.allday = e.target.value;
				if (e.target.value == true) {
					that.workTime = "00:00-24:00";
					console.log(that.workTime)
				}
				
			},
			// 弹窗确认
			determine: function() {
				this.tg = "none";
				this.workDay = this.day;
				if(this.allday!=true){
					this.workTime = this.time;
				}
			},
			// 保存
			preserve: function() {
				var that = this;
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.serveipd + "/api/merchant/auth/updateBaseInfo",
					method: 'POST',
					data: {
						id: that.id,
						name: that.storename,
						mobile: that.phone,
						shopAddress: that.address,
						businessDay: that.weekIndex.toString(),
						businessHours: that.workTime,
						shopTrademark: that.logo_id,
						licensePic: that.license_id,
					},
					success: res => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: false,
							duration: 1500
						});
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
		},
	}
</script>

<style>
	.policy_list {
		padding: 10upx 0;
		border-bottom: 1px solid #EEEEEE;
	}

	.norms .title {
		margin: 0;
		width: 100%;
	}

	.logo {
		padding: 20upx 0;
		display: flex;
		align-items: center;
	}

	.logo image {
		width: 25vw;
		height: 25vw;
		margin-right: 30upx;
	}

	.chunck {
		width: 100vw;
		height: 0.5rem;
		background: rgba(238, 238, 238, 1);
	}

	.list_v {
		width: 100vw;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
	}

	.title {
		width: 30vw;
		height: 2.5rem;
		line-height: 2.5rem;
		margin-left: 1rem;
		font-size: 27upx;
		color: #333333;
	}

	.info {
		width: 60vw;
		text-align: right;
		margin-right: 1rem;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size: 27upx;
		color: #333333;
	}

	.infotwo {
		text-align: right;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size: 27upx;
	}

	.arrow {
		width: 10vw;
		height: 2.5rem;
		line-height: 2.5rem;
		margin-right: 0.5rem;
		text-align: right;
	}

	.list_nav {
		display: flex;
		justify-content: flex-end;
		width: 50vw;
	}

	.mask {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		z-index: 9999;
	}

	.norms {
		width: 80vw;
		background: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		padding: 30upx;
	}

	.norms .title {
		font-size: 34upx;
		text-align: center;
	}

	.btn {
		margin-top: 40upx;
		display: flex;
		justify-content: space-between;
	}

	.btn text {
		display: block;
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 26upx;
		color: #ED721F;
		border: 1px solid #ED721F;
		border-radius: 10upx;
	}

	.btn .determine {
		color: #fff;
		background: #ED721F;
	}

	.policy_list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
	}

	.policy_list image {
		width: 34upx;
		height: 34upx;
	}
</style>
