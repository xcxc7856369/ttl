<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">商品添加</view>
			<view class="sub right" @tap="sub()">完成</view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="div add_img">
				<label>商品图片</label>
				<image class='bg_img' :src="Licence" alt=""></image>
				<image @tap="add_wares" src='../../static/sptp.png' mode=""></image>
			</view>
			<view class="wares_infor">
				<view class="div"><label>商品名称</label><input type="text" placeholder="请输入商品名称" v-model="name"></view>
				<view class="div norms_box" @tap="add_norms()">
					<label>规格</label>
					<view class="norms_label" v-if="norms_list_a!=''"><text v-for="(item,index) in norms_list_a" :key="index">{{ item }}</text></view>
					<view class="norms_title" v-else><text>点击添加规格</text></view>
				</view>
				<view class="div"><label>单价</label><input type="number" placeholder="请输入商品单价(元)" v-model="price"></view>
				<view class="div"><label>单位</label> <input type="text" placeholder="请输入商品单位(碗,张,件)" v-model="company"></view>
				<view class="div"><label>库存</label><input type="number" placeholder="请输入库存数量" v-model="stock"></view>
				<view class="div">
					<label>属性</label>
					<picker class="norms_title" mode="selector" :range="sort" :value="default_sort.index" @change="sort_list" v-model="default_sort.sort_name"><text
						 v-if=" default_sort.sort_name=='' ">点击选择属性</text><text v-else style="color:#333">{{ default_sort.sort_name }}</text></picker>
				</view>
			</view>
			<view class='wares_describe_infor'>
				<view class="div">详细描述</view>
				<view class="describe"><textarea name="" id="" cols="20" rows="4" placeholder="描述一下你的商品吧~" v-model="content"></textarea></view>
			</view>
			<view class="div group_buying">
				<text>是否团购商品</text>
				<switch checked @change="change" />
			</view>
		</view>
		<!-- 添加规格弹窗 -->
		<view class="mask" :style="{display:tg}">
			<view class="norms">
				<label>请输入规格</label>
				<view class="norms_text">
					<input type="text" placeholder="如:微辣,加热,冰镇等" v-model="norms">
					<text class="add_norms" @tap="add_norms_label()">添加</text>
				</view>
				<view class="norms_label"><text v-for="(item,index) in norms_list" :key="index">{{ item }}</text></view>
				<view class="btn"><text class="cancel" @tap="cancel()">取消</text><text class="determine" @tap="determine()">确定</text></texte>
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
				permitPic: '',
				Licence: '',
				norms_list: [],
				norms: '',
				tg: 'none',
				norms_list_a: [],
				attribute: '点击选择属性',
				merchantId: '',
				sort: [],
				index: 0,
				sort_name: '',
				id: '',
				id_list: [],
				price: '',
				company: '',
				stock: '',
				content: '',
				change_v: 1,
				default_sort: {
					sort_name: '',
					id: '',
					index: 0,
				}
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.choice();
				}
			});
			uni.getStorage({
				key: 'default_sort',
				success(e) {
					that.default_sort.id = e.data.default_sort.id;
					that.default_sort.sort_name = e.data.default_sort.sort_name;
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
			change: function(e) {
				e.detail.value ? this.change_v = 1 : this.change_v = 0;
				console.log(this.change_v)
			},
			// 添加商品图片
			add_wares: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.Licence = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.permitPic = parseInt((JSON.parse(uploadFileRes.data).id));
							}
						});
					}
				});
			},
			// 弹出规格添加
			add_norms: function() {
				this.tg = "block";
				this.norms_list = [];
				this.norms_list_a = [];
			},
			// 添加规格
			add_norms_label: function() {
				if (this.norms == "") {
					return;
				}
				this.norms_list.push(this.norms);
				this.norms = '';
			},
			// 确认添加规格
			determine: function() {
				this.norms_list_a = this.norms_list;
				this.tg = "none";
			},
			// 取消添加规格
			cancel: function() {
				this.tg = "none";
				this.norms_list = [];
				this.norms_list_a = [];
			},
			// 属性选择
			choice: function() {
				let that = this;
				uni.request({
					url: that.serveipd + "/api/merchantApi/categories",
					method: "GET",
					data: {
						merchantId: that.merchantId
					},
					success(e) {
						console.log(e);
						for (let i = 0; i < e.data.data.length; i++) {
							that.sort.push(e.data.data[i].name);
							that.id_list.push(e.data.data[i].id);
						}
					}
				})
			},
			sort_list: function(e) {
				let that = this;
				that.default_sort.index = e.detail.value;
				that.default_sort.sort_name = that.sort[that.default_sort.index];
				that.default_sort.id = that.id_list[that.default_sort.index];
				uni.setStorage({
					key: 'default_sort',
					data: {
						default_sort: that.default_sort
					}
				});
			},
			// 完成提交
			sub: function() {
				let reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
				let that = this;
				if (that.permitPic == '') {
					uni.showToast({
						title: '请添加商品图片',
						icon: "none",
						duration: 2000
					});
					return;
				};
				if (that.name == '') {
					uni.showToast({
						title: '请输入商品名称',
						icon: "none",
						duration: 2000
					});
					return;
				};
				if (that.price == '') {
					uni.showToast({
						title: '请输入商品单价',
						icon: "none",
						duration: 2000
					});
					return;
				} else if (!reg.test(that.price)) {
					uni.showToast({
						title: '商品单价输入有误，请重新输入',
						icon: "none",
						duration: 2000
					});
					return;
				};
				if (that.company == '') {
					uni.showToast({
						title: '请输入商品单位',
						icon: "none",
						duration: 2000
					});
					return;
				};
				if (that.stock == '') {
					uni.showToast({
						title: '请输入库存数量',
						icon: "none",
						duration: 2000
					});
					return;
				} else if (!reg.test(that.price)) {
					uni.showToast({
						title: '库存数量输入有误，请重新输入',
						icon: "none",
						duration: 2000
					});
					return;
				};
				if (that.default_sort.sort_name == '') {
					uni.showToast({
						title: '请选择属性',
						icon: "none",
						duration: 2000
					});
					return;
				};
				uni.request({
					url: this.serveipd + "/api/merchantApi/addCommodity",
					method: "POST",
					data: {
						merchantId: that.merchantId,
						icon: that.permitPic,
						name: that.name,
						spec: that.norms_list_a.join(","),
						price: that.price,
						company: that.company,
						stock: that.stock,
						category_id: that.default_sort.id,
						content: that.content,
						isgroupbuy: that.change_v

					},
					success(e) {
						if (e.data) {
							uni.showToast({
								title: "添加成功",
								duration: 2000
							});
							// uni.switchTab({
							// 	url:"/pages/wares/wares"
							// })
						}else{
							uni.showToast({
								title: "添加失败",
								duration: 2000
							});
						}


					}
				})
			}
		}
	}
</script>

<style>
	@import "../../common/add_wares.css";
</style>
