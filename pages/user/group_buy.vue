<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">创建团购</view>
			<view class="right" @tap="sub()">提交</view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="title">上传主图<text>(上传一张主图，尺寸比例为100*100)</text></view>
			<view class="main_img">
				<image mode="aspectFit" :src="main_img" @tap="add_main_img"></image>
			</view>
			<view class="title">上传详情图<text>(最多上传9张)</text></view>
			<view class="img_list" :class="{active:!img_list[0]}">
				<view v-for="(item,index) in img_list" :key="index">
					<image mode="aspectFit" :src="item" alt=""></image>
					<image class='clear' @tap="clear(index)" src="../../static/user/sc.png" alt=""></image>
				</view>
				<view class="add_img" @tap="add_img">
					<image mode="aspectFit" src="../../static/user/add.png" alt=""></image>
				</view>
				<view class="photo" @tap="add_img" v-if="img_list.length==0">
					<image class="fm" src="../../static/user/scxqt.png"></image>
				</view>
			</view>
			<view class="div">
				<view class="div_list"><text>团购标题</text><input type="text" placeholder="请输入团购标题" v-model="buy_title"></view>
				<view class="div_list"><text>团购价格</text><input type="text" placeholder="请输入团购价格" v-model="buy_price"></view>
			</view>
			<view class="div">
				<view class="div_list" @tap="tg = 'block'">
					<text>团购政策</text>
					<view>
						<text v-if="policy_selection.length==0">请选择团购政策</text>
						<text v-else>{{ policy_selection.join(",") }}</text>
						<image src="../../static/user/right.png" mode=""></image>
					</view>
				</view>
				<view class="div_list" @tap="valid_tg='block'">
					<text>有效期</text>
					<view>
						<text v-if="startTime==''||endTime==''">请选择有效期</text>
						<text v-else>{{ startTime}}至{{ endTime }}</text>
						<image src="../../static/user/right.png" mode=""></image>
					</view>
				</view>
				<view class="div_list" @tap="Shopping='block'">
					<text>消费时间</text>
					<view>
						<text v-if="shop_time==''">请选择消费时间</text>
						<text v-else>{{ shop_time }}</text>
						<image src="../../static/user/right.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="notice">
				<view class="notice_title">购买须知</view>
				<view class="notice_list" v-for="(item,index) in notice" :key="index" @tap="select(index)">
					<view>
						<image src="../../static/user/dian.png" mode=""></image><text>{{ item }}</text>
					</view>
					<view>
						<image :src="notice_btn[index].state?selection:unchecked" mode=""></image>
					</view>
				</view>
			</view>
			<view class="introduce">
				<text class="title">套餐介绍</text>
				<view>
					<text>
						套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介绍文字套餐介
					</text>
				</view>
			</view>
		</view>
		<!-- 政策选择弹窗 -->
		<view class="mask" :style="{display:tg}">
			<view class="norms">
				<view class="title">团购政策</view>
				<view class="policy_list" @tap="choice(index)" v-for="(item,index) in policy" :key="index"><text>{{ item }}</text>
					<image :src='switch_list[index].selected?selection:unchecked' mode=""></image>
				</view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="determine()">确定</text></texte>
				</view>
			</view>
		</view>
		<!-- 有效期选择弹窗 -->
		<view class="mask" :style="{display:valid_tg}">
			<view class="norms">
				<view class="title">有效期</view>
				<view class="div_list">
					<text>开始日期</text>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="start_times">
						<text v-show="startTime==''">请选择开始时间</text>
						<text>{{ startTime }}</text>
					</picker>
				</view>
				<view class="div_list">
					<text>结束日期</text>
					<picker mode="date" :value="date" :start="startTime" :end="endDate" @change="endTimes">
						<text v-show="endTime==''">请选择结束时间</text>
						<text>{{ endTime }}</text>
					</picker>
				</view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="time_btn">确定</text></texte>
				</view>
			</view>
		</view>
		<!-- 选择消费时间弹窗 -->
		<view class="mask" :style="{display:Shopping}">
			<view class="norms">
				<view class="title">消费时间</view>
				<view class='policy_list' @tap="same_time=false">
					<image :src="same_time?unchecked:selection" mode=""></image>
					<text>24小时可用</text>
				</view>
				<view class='policy_list' @tap="same_time=true">
					<image :src="same_time?selection:unchecked" mode=""></image>
					<text>部分时间可用</text>
				</view>
				<view v-show="same_time">
					<view class="div_list">
						<text>开始时间</text>
						<picker mode="time" :value="time" start="00:00" end="24:00" @change="start_shop">
							<view v-show="start_shop_time==''">请选择开始时间</view>
							<view class="uni-input">{{start_shop_time}}</view>
						</picker>
					</view>
					<view class="div_list">
						<text>结束时间</text>
						<picker mode="time" :value="time" :start="start_shop_time" end="24:00" @change="end_shop">
							<view v-show="end_shop_time==''">请选择结束时间</view>
							<view class="uni-input">{{end_shop_time}}</view>
						</picker>
					</view>
				</view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="shop_btn">确定</text></texte>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(confirmtype) {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if (confirmtype === 'start') {
			year = year - 100;
		} else if (confirmtype === 'end') {
			year = year + 100;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	};
	export default {
		data() {
			return {
				date: getDate({
					format: true
				}),
				height: '',
				buy_title: '',
				buy_price: '',
				notice: ["无需预约", "提供免费WIFI", "免费停车场", "支持急速退", "商家提供发票", "不同时销售商户其他优惠"],
				notice_btn: [{
					id: 0,
					state: true
				}, {
					id: 1,
					state: true
				}, {
					id: 2,
					state: true
				}, {
					id: 3,
					state: true
				}, {
					id: 4,
					state: true
				}, {
					id: 5,
					state: true
				}],
				main_img: "../../static/user/sczt.png",
				main_id: '',
				img_list: [],
				policy: ["随时退", "过期退", "免预约"],
				selection: "../../static/user/xz.png",
				unchecked: "../../static/user/wxz.png",
				switch_list: [{
					id: 0,
					selected: true
				}, {
					id: 1,
					selected: true
				}, {
					id: 2,
					selected: true
				}],
				selection_list: [],
				selection_text: [],
				policy_selection: [],
				tg: 'none',
				startDate: getDate('start'),
				endDate: getDate('end'),
				startTime: '',
				endTime: '',
				valid_tg: "none",
				Shopping: 'none',
				time: '0:00',
				start_shop_time: '',
				end_shop_time: '',
				shop_time: '',
				shop_time_list: ["24小时可用", "部分时间可用"],
				same_time: false,
				img_id: [],
				merchantId: '',
				activitiesId: '',
				establish: '/api/merchant/commodity/groupBuy/add',
				modify: '/api/merchant/commodity/groupBuy/update',
				address: '',
				new_img: [],
			}
		},
		onLoad(res) {
			console.log(res);
			let that = this;
			that.activitiesId = res.activitiesId;
			console.log(res.activitiesId);
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					if (res.activitiesId != undefined) {
						that.getInfor();
					}
				}
			});
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
					}
				})
			},
			add_main_img: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.main_img = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile",
							filePath: that.main_img,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.main_id = parseInt((JSON.parse(uploadFileRes.data).id));
								console.log(that.main_id)
							},
						});
					}
				});
			},
			add_img: function() {
				if (this.img_list.length == 9) {
					uni.showToast({
						title: '最多只能上传9张',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				};
				var that = this;
				uni.chooseImage({
					count: 9 - that.img_list.length,
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						let new_imgs = [];
						const url = res.tempFiles;
						for (let i = 0; i < url.length; i++) {
							new_imgs.push(url[i].path);
						};
						that.img_list = that.img_list.concat(new_imgs);
						let new_id=[];
						for (let i = 0; i <new_imgs.length; i++) {
							uni.uploadFile({
								url: that.serveipd + "/ajax/upfile",
								filePath: new_imgs[i],
								name: 'upfile',
								formData: {},
								success: (res) => {
									that.img_id.push(JSON.parse(res.data).id);
								}
							});
						};
						console.log(that.img_id)
					}
				});


			},
			clear: function(index) {
				this.img_list.splice(index, 1);
				this.img_id.splice(index, 1);
			},
			// 确认添加政策
			determine: function() {
				this.tg = "none";
				let arr = [];
				let text_list = [];
				for (let i = 0; i < this.switch_list.length; i++) {
					if (this.switch_list[i].selected == true) {
						arr.push(this.switch_list[i].id);
						text_list.push(this.policy[i]);
					}
				}
				this.selection_list = arr;
				this.policy_selection = text_list;
			},
			// 取消添加政策
			cancel: function() {
				this.tg = "none";
				this.valid_tg = "none";
				this.Shopping = 'none';
			},
			choice: function(index) {
				this.switch_list[index].selected = !this.switch_list[index].selected;
			},

			// 开始时间
			start_times: function(e) {
				this.startTime = e.target.value;
			
			},
			// 结束时间
			endTimes: function(e) {
				this.endTime = e.target.value
			},
			time_btn: function() {
				let that = this;
				let a = new Date(that.startTime);
				let b = new Date(that.endTime);
				if (a.getTime() > b.getTime()) {
					uni.showToast({
						title: '结束时间不能小于开始时间',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				this.valid_tg = 'none'
			},
			// 开始消费时间
			start_shop: function(e) {
				this.start_shop_time = e.detail.value
			},
			// 结束消费时间
			end_shop: function(e) {
				this.end_shop_time = e.detail.value
			},
			// 确定消费时间
			shop_btn: function() {
				let that = this;
				if (this.same_time == false) {
					this.shop_time = "24小时可用"
				} else if (this.start_shop_time != '' && this.end_shop_time != '') {

					if (this.start_shop_time > this.end_shop_time) {
						uni.showToast({
							title: '结束时间不能小于开始时间',
							icon: 'none',
							mask: false,
							duration: 2000
						});
						return
					};
					this.shop_time = this.start_shop_time + "至" + this.end_shop_time;
				}
				this.Shopping = 'none';
			},
			// 团购须知
			select: function(index) {
				this.notice_btn[index].state = !this.notice_btn[index].state;
			},
			sub: function() {
				let that = this;
				if (that.activitiesId == undefined) {
					that.address = that.establish;
				} else {
					that.address = that.modify;
				}
				uni.showLoading({
					title: '生成团购中',
					mask: false
				});

				if (that.main_img == '../../static/user/sczt.png') {
					uni.showToast({
						title: '请上传一张主图',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				};
				if (that.img_list.length == 0) {
					uni.showToast({
						title: '请上传详情图',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if (that.buy_title == '') {
					uni.showToast({
						title: '请输入团购标题',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if (that.buy_price == '') {
					uni.showToast({
						title: '请输入团购价格',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if (that.policy_selection.length == 0) {
					uni.showToast({
						title: '请选择团购政策',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if (that.startTime == '' || that.endTime == '') {
					uni.showToast({
						title: '请选择有效期',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				let a = new Date(that.startTime);
				let b = new Date(that.endTime);
				if (a.getTime() > b.getTime()) {
					uni.showToast({
						title: '结束时间不能小于开始时间',
						icon: 'none',
						mask: false,
						duration: 2000
					});
					return
				};
				if (that.shop_time == '') {
					uni.showToast({
						title: '请选择消费时间',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				let tips = [];
				for (let i = 0; i < that.notice_btn.length; i++) {
					if (that.notice_btn[i].state == true) {
						tips.push(that.notice_btn[i].id);
					}
				}
				uni.request({
					url: that.serveipd + that.address,
					method: "POST",
					data: {
						id: that.activitiesId,
						merchantId: that.merchantId,
						consumeStartTime:that.start_shop_time,
						consumeEndTime:that.end_shop_time,
						icon: that.main_id,
						consumedAllHours: !that.same_time,
						images: that.img_id.join(","),
						name: that.buy_title,
						price: that.buy_price,
						labels: that.selection_list.join(','),
						startTime: that.startTime,
						endTime: that.endTime,
						tips: tips.join(',')
					},
					success(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							mask: false,
							duration: 1500,
							success() {
								setTimeout(function() {
									uni.redirectTo({
										url: './marketing',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});

								}, 1500)
							}
						});
					}
				});
			}, // 获取信息，修改
			getInfor: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchant/commodity/groupBuy/" + that.activitiesId,
					method: "GET",
					data: {
						merchantId: that.merchantId,
					},
					success(res) {
						console.log(res)
						let infor = res.data.data;
						that.main_img = infor.iconUrl;
						that.img_list = infor.imageUrls;
						that.buy_title = infor.name;
						that.buy_price = infor.price;
						that.selection_list = infor.labels.split(",");
						that.start_shop_time = infor.consumeStartTime;
						that.end_shop_time = infor.consumeEndTime;
						that.startTime = infor.startTime;
						that.endTime = infor.endTime;
						if (!infor.consumedAllHours) {
							that.shop_time = infor.consumeStartTime + "至" + infor.consumeEndTime;
						} else {
							that.shop_time = "24小时可用";
						};
						that.switch_list = [{
							id: 0,
							selected: false
						}, {
							id: 1,
							selected: false
						}, {
							id: 2,
							selected: false
						}];
						let text = [];
						let arr = infor.labels.split(',');
						for (let i = 0; i < arr.length; i++) {
							text.push(that.policy[arr[i]]);
							that.switch_list[arr[i]].selected = true;
						}
						that.policy_selection = text;
						that.notice_btn = [{
							id: 0,
							state: false
						}, {
							id: 1,
							state: false
						}, {
							id: 2,
							state: false
						}, {
							id: 3,
							state: false
						}, {
							id: 4,
							state: false
						}, {
							id: 5,
							state: false
						}];
						let arr_2 = infor.tips.split(',');
						for (let i = 0; i < arr_2.length; i++) {
							that.notice_btn[arr_2[i]].state = true;
						}
					}
				})

			}
		}
	}
</script>

<style>
	@import url("../../common/group_buy.css");
</style>
