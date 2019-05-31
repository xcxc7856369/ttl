<template>
	<view class="content_box">
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator open-type="navigateBack">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<text>商户入驻申请</text>
		</view>
		<!-- 步骤条 -->
		<view class='step' :style="{paddingTop:height}">
			<view :style="{color:orange,borderBottom:underline1}">
				<image :src="step.basic_page" mode=""></image> 基本信息
			</view>
			<view :style="{color:shop_color,borderBottom:underline2}">
				<image :src="step.shop_page" mode=""></image>门店信息
			</view>
			<view :style="{color:next3,borderBottom:underline3}">
				<image :src="step.next_3" mode=""></image>营业资质
			</view>
		</view>
		<!-- 信息列表 -->
		<!-- 基础信息 -->
		<view class='infor_list' :style="{left:step_next+'vw',marginTop:top}">
			<view class="basic_page infor_box">
				<view class="basic_content">
					<view class='tips div'>请填写以下信息</view>
					<view class="div">
						<text>企业名称</text>
						<input confirmtype="text" :class="{error:enterprise_error}" placeholder="请输入企业名称" v-model="enterprise_name" />
					</view>
					<view class="div">
						<text>联系人姓名</text>
						<input confirmtype="text" :class="{error:user_error}" value="" placeholder="请输入联系人姓名" v-model="user_name" />
					</view>
					<view class="div">
						<text>手机号</text>
						<input confirmtype="text" :class="{error:phone_error }" value="" placeholder="请输入手机号" v-model="phone_number" />
					</view>
					<view class="div">
						<text>接单电话</text>
						<input confirmtype="text" :class="{error:order_error}" value="" placeholder="请输入接单电话" v-model="ordercall" />
					</view>
					<view class=" div img_verification_box">
						<text>图形码</text>
						<input confirmtype="text" :class="{error:img_error}" value="" placeholder="请输入图形码" v-model="img_number" />
						<image class="verification" :src="picCode" @click='yanzheng'></image>
					</view>
					<view class="sms div">
						<text>验证码</text>
						<input confirmtype="text" :class="{error:code_error}" value="" placeholder="请输入验证码" v-model="verification_code" />
						<button confirmtype="primary" :class="[butDis?smsF:smsT]" @tap="fasong" :disabled="butDis"> {{ now }} </button>
					</view>
				</view>
				<button class='basic_step_next step_next' confirmtype="primary" @tap='basic_step_next'>下一步</button>
			</view>
			<!-- 门店信息 -->
			<view class='shop_page infor_box'>
				<view class="basic_content">
					<view class='tips div'>请继续填写以下信息</view>
					<view class="div category">
						<text>经营品类</text>
						<picker mode="selector" :value="index" :range="category" @change="categoryColumn" style="display: inline-block;">
							<input confirmtype="text" placeholder="请选择" v-model="pickerProducts">
							<!-- 	<view>{{category[0][index[0]]}},{{ category[1][index[1]]}}</view> -->
						</picker>
					</view>
					<view class="div">
						<text>门店区域</text>
						<picker mode="multiSelector" :value="multiIndex" :range="citylist" @columnchange="showCityData" style="display: inline-block;">
							<input confirmtype="text" placeholder="请选择" @tap="showCityData" v-model="citytext">
						</picker>
					</view>
					<view class="div">
						<text>门店地址</text>
						<input confirmtype="text" value="" placeholder="请输入门店地址" v-model="store_address_1" />
					</view>
					<view class="div div_photo">
						<text>门头近景和远景</text>
						<view class="add_img">
							<view v-for="(image,index) in mendianlist" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image"></image>
							</view>
							<image @tap="add_near" :src="qua.seniority" mode=""></image>
						</view>
					</view>
					<view class=" div div_photo">
						<text>店内环境</text>
						<view class="add_img">
							<view v-for="(image,index) in outPiclist" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image"></image>
							</view>
							<image @tap="add_inside" :src="shop.inside" mode=""></image>
						</view>
					</view>
					<view class="div div_photo">
						<text>店铺商标</text>
						<view class="add_img">
							<image @tap="add_trademark" :src="shop.trademark" mode=""></image>
						</view>
					</view>
				</view>
				<button class='step_next' confirmtype="primary" @tap='shop_step_next'>下一步</button>
			</view>
			<!-- 营业资质 -->
			<view class='qualifications_page infor_box'>
				<view class="basic_content">
					<view class='tips div'>请继续填写以下信息后提交审核</view>
					<view class="div div_photo">
						<text>营业执照</text>
						<view class="add_img">
							<image @tap="add_business" :src="qua.business" mode=""></image>
						</view>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.store_error}" placeholder="请输入门店地址" v-model="qua.store_address" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.merchant_error}" value="" placeholder="请输入商户名称" v-model="qua.merchant_name" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.registration_error}" value="" placeholder="请输入注册号/统一社会信用代码" v-model="qua.registration_number" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.legal_error  }" value="" placeholder="请输入法定代表人/经营者" v-model="qua.legal_person" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.place_error}" value="" placeholder="请输入经营场所" v-model="qua.place" />
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<input confirmtype="text" :class="{error:qua.business_error }" value="" placeholder="请输入营业执照到期时间" v-model="qua.business_end_time" />
						</picker>
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="register_time">
							<input confirmtype="text" :class="{error:qua. register_error }" value="" placeholder="请输入注册时间" v-model="qua.register_time" />
						</picker>

					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.mechanism_error}" value="" placeholder="请输入发证/登记机关" v-model="qua.mechanism" />
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="approval_time">
							<input confirmtype="text" :class="{error:qua.approval_error}" value="" placeholder="请输入核准时间" v-model="qua.approval_time" />
						</picker>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.business_error}" value="" placeholder="请输入经营范围 非必填" v-model="qua.business_scope" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.registered_error}" value="" placeholder="请输入注册资金 非必填" v-model="qua.registered_capital" />
					</view>
					<view class="div div_photo">
						<text>手持身份证正面</text>
						<view class="add_img">
							<image @tap="add_positive" :src="qua.positive" mode=""></image>
						</view>
					</view>
					<view class="div div_photo">
						<text>手持身份证反面</text>
						<view class="add_img">
							<image @tap="add_back" :src="qua.back" mode=""></image>
						</view>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error: qua.name_error }" value="" placeholder="请输入姓名" v-model="qua.name" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error: qua.idCard_error }" value="" placeholder="请输入身份证号" v-model="qua.idCard" />
					</view>
					<view class="div sex">
						<text>性别</text>
						<radio-group @change="radioChange">
							<label class="uni-list-cell" v-for="(item, index) in qua.items" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index ===qua.current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.nation_error }" value="" placeholder="请输入民族" v-model="qua.nation" />
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="birthday">
							<input confirmtype="text" :class="{error: qua.birthday_error}" value="" placeholder="请输入出生日期" v-model="qua.birthday" />
						</picker>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua. address_error}" value="" placeholder="请输入身份证地址" v-model="qua.address" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.visa_error}" value="" placeholder="请输入签证机关" v-model="qua.visa_agency" />
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="validity">
							<input confirmtype="text" :class="{error:qua.validity_error}" value="" placeholder="请输入身份证有效期" v-model="qua.validity" />
						</picker>
					</view>
					<view class="div div_photo">
						<text>许可证照片上传</text>
						<view class="add_img">
							<image @tap="add_Licence" :src="qua.Licence" mode=""></image>
						</view>
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.management_error}" value="" placeholder="请输入经营者名称" v-model="qua.management_name" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error: qua.legal_2_error }" value="" placeholder="请输入法定代表人" v-model="qua.legal_person_2" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.licence_number_error}" value="" placeholder="请输入许可证编号" v-model="qua.licence_number" />
					</view>
					<view class="div">
						<input confirmtype="text" :class="{error:qua.license_address_error}" value="" placeholder="请输入许可证门店地址" v-model="qua.license_address" />
					</view>
					<view class="div">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="permit_time">
							<input confirmtype="text" :class="{error:qua.permit_time_error }" value="" placeholder="请输入许可证有效期" v-model="qua.permit_time" />
						</picker>
					</view>
					<view class="div div_photo">
						<text>资质上传(2-4张)</text>
						<view class="add_img">
							<view v-for="(image,index) in imagelist" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image"></image>
							</view>
							<image @tap="add_seniority" :src="qua.seniority" mode=""></image>
						</view>
					</view>
				</view>
				<button class='step_next' confirmtype="primary" @tap='submission'>提交</button>
			</view>
		</view>
	</view>
</template>
<script>
	function getDate(confirmtype) {
		const date = new Date();
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
				top: '',
				underline1: "2px solid #E33E09",
				underline2: "",
				underline3: "",
				height: '',
				provinceId: '',
				cityId: '',
				areaId: '',
				id: '',
				cityData: '',
				citytext: '',
				citylist: [
					[],
					[],
					[]
				],
				otherProvePiclist: [],
				permitPic: Number,
				identityBack: Number,
				identityPositive: Number,
				licensePic: Number,
				sex: 0,
				shopTrademark: Number,
				outPiclist: [],
				outPic: [],
				mendian: [],
				mendianlist: [],
				imagelist: [],
				next3: "#DDDDDD",
				shop_color: "#DDDDDD",
				orange: "#E33D09",
				store_address_1: '',
				multiIndex: [0, 0, 0],
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				time: '12:01',
				date: "",
				enterprise_name: '',
				user_name: '',
				phone_number: '',
				ordercall:'',
				img_number: '',
				verification_code: '',
				error: {
					border: "1px solid red"
				},
				user_error: false,
				phone_error: false,
				order_error:false,
				enterprise_error: false,
				img_error: false,
				code_error: false,
				pickerText: '',
				pickerProducts: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				img_url: '',
				uuid: '',
				picCode: '',
				now: '发送验证码',
				butDis: false,
				smsF: 'smsF',
				smsT: 'smsT',
				userId: Number,
				green: '',
				orange: '',
				step_next: "",
				index: 0,
				timeindex: 0,
				category: [],
				shop_page: '',
				step: {
					basic_success: false,
					shop_success: false,
					basic_page: "../../static/Merchan_registration/01.png",
					shop_page: "../../static/Merchan_registration/02.png",
					next_page_switch: false,
					next_3: "../../static/Merchan_registration/03.png",
				},
				shop: {
					near: "../../static/Merchan_registration/icon_addimg.png",
					far: "../../static/Merchan_registration/icon_addimg.png",
					inside: "../../static/Merchan_registration/icon_addimg.png",
					trademark: "../../static/Merchan_registration/icon_addimg.png",
					shop_page_switch: false,
				},
				qua: {
					// 开关 标红
					idCard_error: false,
					store_error: false,
					merchant_error: false,
					registration_error: false,
					legal_error: false,
					place_error: false,
					business_error: false,
					register_error: false,
					mechanism_error: false,
					approval_error: false,
					business_error: false,
					registered_error: false,
					name_error: false,
					nation_error: false,
					birthday_error: false,
					address_error: false,
					visa_error: false,
					validity_error: false,
					management_error: false,
					legal_2_error: false,
					licence_number_error: false,
					license_address_error: false,
					permit_time_error: false,
					// 双向数据绑定变量
					idCard: '',
					store_address: '',
					merchant_name: '',
					registration_number: '',
					legal_person: '',
					place: '',
					business_end_time: '',
					register_time: '',
					mechanism: '',
					approval_time: '',
					business_scope: '',
					registered_capital: '',
					name: '',
					nation: '',
					birthday: '',
					address: "",
					visa_agency: '',
					validity: '',
					management_name: '',
					legal_person_2: '',
					licence_number: '',
					license_address: '',
					permit_time: '',
					//
					business: "../../static/Merchan_registration/icon_addimg.png",
					positive: "../../static/Merchan_registration/icon_addimg.png",
					back: "../../static/Merchan_registration/icon_addimg.png",
					Licence: "../../static/Merchan_registration/icon_addimg.png",
					items: [{
						value: '0',
						name: "男",
						checked: 'true'
					}, {
						value: '1',
						name: '女'
					}],
					current: 0,
					seniority: '../../static/Merchan_registration/icon_addimg.png',
				},
			}
		},
		computed: {},
		onLoad(option) {
			this.userId = parseInt(option.id);
		},
		onReady() {
			this.getTopheight();
			this.yanzheng();
			this.showCategory();
			this.getCityData();
		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.top = res.statusBarHeight + 44 + 50 + 'px';
						that.height = res.statusBarHeight + 44 + "px";
						console.log(that.top)
					}
				})
			},
			getCityData: function() {
				console.log(1);
				let province = [];
				let city = [];
				let county = [];
				uni.request({
					url: this.serveipd + "/api/merchant/auth/cities",
					method: 'GET',
					data: {},
					success: res => {
						for (let i = 0; i < res.data.data[0].area.length; i++) {
							province.push(res.data.data[0].area[i].name);
						}
						this.citylist[0] = province;
						for (let i = 0; i < res.data.data[0].area[0].area.length; i++) {
							city.push(res.data.data[0].area[0].area[i].name);
						}
						this.citylist[1] = city;
						for (let i = 0; i < res.data.data[0].area[0].area[0].area.length; i++) {
							county.push(res.data.data[0].area[0].area[0].area[i].name);
						}
						this.citylist[2] = county;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			showCityData: function(e) {
				var that = this;
				let province = [];
				let city = [];
				let county = [];
				if (e.detail.column != 2) {
					that.multiIndex[1] = 0;
					that.multiIndex[2] = 0;
				}
				that.multiIndex[e.detail.column] = e.detail.value;
				uni.request({
					url: this.serveipd + "/api/merchant/auth/cities",
					method: 'GET',
					data: {},
					success: res => {
						switch (e.detail.column) {
							case 0:
								for (let i = 0; i < res.data.data[0].area[e.detail.value].area.length; i++) {
									province.push(res.data.data[0].area[e.detail.value].area[i].name);
								}
								that.citylist[1] = province;
								for (let i = 0; i < res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].area.length; i++) {
									city.push(res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].area[i].name);
								}
								that.citylist[2] = city;
								break;
							case 1:

								for (let i = 0; i < res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].area.length; i++) {
									county.push(res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].area[i].name);
								}
								that.citylist[2] = county;
								this.$forceUpdate();
								break;
						}
						that.provinceId = res.data.data[0].area[that.multiIndex[0]].id;
						that.cityId = res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].id;
						that.areaId = res.data.data[0].area[that.multiIndex[0]].area[that.multiIndex[1]].area[that.multiIndex[2]].id;

					},
					fail: () => {},
					complete: () => {}
				});

				that.citytext = that.citylist[0][that.multiIndex[0]] + "-" + that.citylist[1][that.multiIndex[1]] + "-" + that.citylist[
					2][that.multiIndex[2]];
				this.$forceUpdate();

			},
			input_val: function(val) {
				if (this.val == "") {
					uni.showToast({
						title: '输入内容不能为空',
						icon: "none",
						duration: 2000
					});
				}
			},
			yanzheng: function() {
				var that = this;
				var timestamp2 = (new Date()).valueOf();
				var namb = Math.ceil(Math.random() * 1000999);
				that.uuid = timestamp2 + namb;
				that.picCode = this.serveipd + "/api/merchant/auth/picCode?userId=" + that.userId + "&uuid=" + that.uuid;
			},
			// 下一步
			basic_step_next: function() {
				var that = this;
				let reg_name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
				let reg_phone = /^1[34578]\d{9}$/;
				// 企业名称判断
				if (this.enterprise_name == "") {
					this.enterprise_error = true;
					uni.showToast({
						title: '企业名不能为空',
						icon: "none",
						duration: 2000
					});
					return false;
				} else {
					this.enterprise_error = false;
					// 联系人姓名判断
					if (!reg_name.test(this.user_name)) {
						this.user_error = true;
						uni.showToast({
							title: '您的输入有误请重新输入',
							icon: "none",
							duration: 2000
						});
						return false;
					} else {
						this.user_error = false;
						// 手机号码判断
						if (!reg_phone.test(this.phone_number)) {
							this.phone_error = true;
							uni.showToast({
								title: '您的输入有误请重新输入',
								icon: "none",
								duration: 2000
							});
							return false;
						} else {
							this.phone_error = false;
							// 接单电话
							if (!reg_phone.test(this.ordercall)) {
								this.phone_error = true;
								uni.showToast({
									title: '您的输入有误请重新输入',
									icon: "none",
									duration: 2000
								});
								return false;
							} else {
								this.phone_error = false;

								if (this.img_number == "") {
									this.img_error = true;
									uni.showToast({
										title: '验证码不能为空',
										icon: "none",
										duration: 2000
									});
									return false;
								} else {
									this.img_error = false;
									uni.request({
										url: this.serveipd + "/api/merchant/auth/smsCodeValidate",
										method: 'GET',
										data: {
											mobile: that.phone_number,
											name: that.enterprise_name,
											smscode: that.verification_code,
										},
										success: res => {
											if (res.data.code == 703) {
												that.code_error = true;
												uni.showToast({
													title: '无效的短信验证码',
													icon: "none",
													duration: 2000
												});
												return false;
											};
											if (res.data.code == 801) {
												that.code_error = true;
												uni.showToast({
													title: '当前手机号已注册',
													icon: "none",
													duration: 2000
												});
												return false;
											};
											if (res.data.code == 816) {
												that.code_error = true;
												uni.showToast({
													title: '企业名称已存在',
													icon: "none",
													duration: 2000
												});
												return false;
											};
											if (res.data.code == 0) {
												that.code_error = false;
												// 门店信息滑动
												this.orange = "green";
												this.shop_color = "#E33D09";
												this.underline1 = "";
												this.underline2 = "2px solid #E33E09";
												this.step.basic_page = "../../static/Merchan_registration/01_green.png";
												this.step.shop_page = "../../static/Merchan_registration/02_orange.png";
												// this.step.next_page_switch = true;
												this.step_next = -100;
												return;
											};
										},
										fail: () => {},
										complete: () => {}
									});

								}


							};

						};
					};
				}



			}, // step_next底部 
			// 发送短信验证
			fasong: function() {
				var that = this;
				uni.request({
					url: this.serveipd + "/api/merchant/auth/smsCode",
					method: 'GET',
					data: {
						mobile: that.phone_number,
						picCode: that.img_number,
						userId: that.userId,
					},
					success: res => {
						if (res.data.code == 0) {
							that.img_error = false;
							return false;
						};
						if (res.data.code == 702) {
							that.img_error = true,
								uni.showToast({
									title: '发送短信验证码失败',
									icon: "none",
									duration: F2000
								});
							return false;
						};
						if (res.data.code == 706) {
							that.img_error = true,
								uni.showToast({
									title: '验证码超时',
									icon: "none",
									duration: 2000
								});
							return false;
						};
						if (res.data.code == 705) {
							that.img_error = true,
								uni.showToast({
									title: '无效的验证码',
									icon: "none",
									duration: 2000
								});
							return false;
						};
					},
					fail: () => {},
					complete: () => {}
				});
				var currentTime = 5;
				that.butDis = true;
				var interval = setInterval(function() {
					currentTime--;
					that.now = currentTime + " S";
					if (currentTime <= 0) {
						clearInterval(interval);
						that.now = '重新发送';
						that.butDis = false;
					}
				}, 1000);
			}, //发短息结束
			// 拍照相册 添加图片
			// 近景远景
			add_near: function() {
				var that = this;
				uni.chooseImage({
					count: 2, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.mendianlist.push(url[0].path);
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.mendian.push(JSON.parse(uploadFileRes.data).id);
							}
						});
					}
				});
			},
			// 店内环境
			add_inside: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.outPiclist.push(url[0].path);
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.outPic.push(JSON.parse(uploadFileRes.data).id);
								console.log(that.outPic);
							}
						});
					}
				});
			},
			// 商标
			add_trademark: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.shop.trademark = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.shopTrademark = parseInt((JSON.parse(uploadFileRes.data).id));
							}
						});
					}
				});
			},
			add_seniority: function() {
				var that = this;
				let urllist = '';
				if (this.imagelist.length >= 4) {

				} else {
					uni.chooseImage({
						count: 1, //默认9
						sizeconfirmtype: ['original', 'compressed'],
						success: (res) => {
							console.log(res);
							const url = res.tempFiles;
							this.imagelist.push(url[0].path);
							uni.uploadFile({
								url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
								filePath: url[0].path,
								name: 'upfile',
								formData: {},
								success: (uploadFileRes) => {
									that.otherProvePiclist.push(JSON.parse(uploadFileRes.data).id);
									console.log(that.otherProvePiclist)
								}
							});
						}
					});
				}
			},
			add_positive: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.qua.positive = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.identityBack = parseInt((JSON.parse(uploadFileRes.data).id));
							}
						});
					}
				});
			},
			add_back: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.qua.back = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.identityPositive = parseInt((JSON.parse(uploadFileRes.data).id));
							}
						});
					}
				});
			},
			add_Licence: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.qua.Licence = url[0].path;
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

			// 门店信息  下一步
			shop_step_next: function() {
				if (this.pickerProducts == "") {
					uni.showToast({
						title: '请选择经营品类',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.citytext == "") {
					uni.showToast({
						title: '请选择门店区域',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.store_address_1 == "") {
					uni.showToast({
						title: '请输入门店地址',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.mendianlist.length == 0) {
					uni.showToast({
						title: '请输入门店近景远景',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.shop.trademark == "../../static/Merchan_registration/icon_addimg.png") {
					uni.showToast({
						title: '请输入店铺商标',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				}
				this.underline2 = '';
				this.underline3 = "2px solid #E33E09";
				this.shop_color = "green";
				this.step.shop_page = "../../static/Merchan_registration/02_green.png";
				this.next3 = "#E33D09",
					this.step.next_3 = "../../static/Merchan_registration/03_orange.png",
					this.step_next = -200;
			},
			showCategory: function(e) {
				var that = this;
				let list = [];
				uni.request({
					url: this.serveipd + '/api/merchant/auth/categories',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						this.categorylist = res.data.data;
						for (let i = 0; i < res.data.data.length; i++) {
							that.category.push(res.data.data[i].name);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			categoryColumn: function(e) {
				let that = this;
				this.index = e.detail.value;
				this.pickerProducts = this.category[this.index];
				this.id = this.categorylist[this.index].id;
				console.log(this.id);
			},

			// 营业资质
			radioChange: function(evt) {
				for (let i = 0; i < this.qua.items.length; i++) {
					if (this.qua.items[i].value === evt.target.value) {
						this.qua.current = i;
						console.log(this.qua.items[i].value);
						break;
					}
				}
			},
			add_business: function() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						const url = res.tempFiles;
						that.qua.business = url[0].path;
						uni.uploadFile({
							url: that.serveipd + "/ajax/upfile", //仅为示例，非真实的接口地址
							filePath: url[0].path,
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.licensePic = parseInt((JSON.parse(uploadFileRes.data).id));
							}
						});
					}
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.timeindex = e.target.value
			},

			bindDateChange: function(e) {
				this.qua.business_end_time = e.target.value
			},
			register_time: function(e) {
				this.qua.register_time = e.target.value
			},
			approval_time: function(e) {
				this.qua.approval_time = e.target.value
			},
			birthday: function(e) {
				this.qua.birthday = e.target.value
			},
			validity: function(e) {
				this.qua.validity = e.target.value
			},
			permit_time: function(e) {
				this.qua.permit_time = e.target.value
			},
			// 提交
			submission: function() {
				var that = this;
				let regExpress = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
				if (this.qua.business == "../../static/Merchan_registration/icon_addimg.png") {
					uni.showToast({
						title: '请输入营业执照',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				};
				if (this.qua.store_address == "") {
					this.qua.store_error = true;
					uni.showToast({
						title: '门店地址不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.store_address)) {
					this.qua.store_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.store_error = false;
				};
				if (this.qua.merchant_name == "") {
					this.qua.merchant_error = true;
					uni.showToast({
						title: '商户名称不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.merchant_name)) {
					this.qua.merchant_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.merchant_error = false;
				};

				if (this.qua.registration_number == "") {
					this.qua.registration_error = true;
					uni.showToast({
						title: '注册账号/统一社会信用代码不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.registration_number)) {
					this.qua.registration_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.registration_error = false;
				};
				if (this.qua.legal_person == "") {
					this.qua.legal_error = true;
					uni.showToast({
						title: '法人代表/经营者不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.legal_person)) {
					this.qua.legal_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.legal_error = false;
				};
				if (this.qua.place == "") {
					this.qua.place_error = true;
					uni.showToast({
						title: '经营场所不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.place)) {
					this.qua.place_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.place_error = false;
				};
				if (this.qua.business_end_time == "") {
					this.qua.business_error = true;
					uni.showToast({
						title: '请选择营业执照到期时间',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.business_error = false;
				};
				if (this.qua.register_time == "") {
					this.qua.register_error = true;
					uni.showToast({
						title: '请选择注册时间',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.register_error = false;
				};
				if (this.qua.mechanism == "") {
					this.qua.mechanism_error = true;
					uni.showToast({
						title: '发证/登记机关不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.mechanism)) {
					this.qua.mechanism_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.mechanism_error = false;
				};

				if (this.qua.approval_time == "") {
					this.qua.approval_error = true;
					uni.showToast({
						title: '请选择核准时间',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.approval_error = false;
				};
				if (this.qua.positive == "../../static/Merchan_registration/icon_addimg.png") {
					uni.showToast({
						title: '请输入手持身份证正面',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				};
				if (this.qua.back == "../../static/Merchan_registration/icon_addimg.png") {
					uni.showToast({
						title: '请输入手持身份证反面',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				};
				if (this.qua.name == "") {
					this.qua.name_error = true;
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.name)) {
					this.qua.name_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.name_error = false;
				};
				if (this.qua.idCard == "") {
					this.qua.idCard_error = true;
					uni.showToast({
						title: '身份证号不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.idCard)) {
					this.qua.idCard_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.idCard_error = false;
				};
				if (this.qua.nation == "") {
					this.qua.nation_error = true;
					uni.showToast({
						title: '民族不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.nation)) {
					this.qua.nation_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.nation_error = false;
				};
				if (this.qua.birthday == "") {
					this.qua.birthday_error = true;
					uni.showToast({
						title: '请选择出生日期',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.birthday_error = false;
				};

				if (this.qua.address == "") {
					this.qua.address_error = true;
					uni.showToast({
						title: '地址不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.address)) {
					this.qua.address_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.address_error = false;
				};
				if (this.qua.visa_agency == "") {
					this.qua.visa_error = true;
					uni.showToast({
						title: '签证机关不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.visa_agency)) {
					this.qua.visa_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.visa_error = false;
				};
				if (this.qua.validity == "") {
					this.qua.validity_error = true;
					uni.showToast({
						title: '请选择有效期',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.validity_error = false;
				};
				if (this.qua.Licence == "../../static/Merchan_registration/icon_addimg.png") {
					uni.showToast({
						title: '请输入许可证',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				};
				if (this.qua.management_name == "") {
					this.qua.management_error = true;
					uni.showToast({
						title: '经营者名称不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.management_name)) {
					this.qua.management_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.management_error = false;
				};
				if (this.qua.legal_person_2 == "") {
					this.qua.legal_2_error = true;
					uni.showToast({
						title: '法定代表人不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.legal_person_2)) {
					this.qua.legal_2_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.legal_2_error = false;
				};
				if (this.qua.licence_number == "") {
					this.qua.licence_number_error = true;
					uni.showToast({
						title: '许可证编号不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.licence_number)) {
					this.qua.licence_number_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.licence_number_error = false;
				};
				if (this.qua.license_address == "") {
					this.qua.license_address_error = true;
					uni.showToast({
						title: '许可证地址不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else if (regExpress.test(this.qua.license_address)) {
					this.qua.license_address_error = true;
					uni.showToast({
						title: '输入内容不能包含特殊字符',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.license_address_error = false;
				};
				if (this.qua.permit_time == "") {
					this.qua.permit_time_error = true;
					uni.showToast({
						title: '请选择有效期',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				} else {
					this.qua.permit_time_error = false;
				};
				if (this.imagelist.length < 2) {
					uni.showToast({
						title: '请上至少上传2张资质图像',
						icon: "none",
						mask: false,
						duration: 1500
					});
					return;
				};
				uni.showLoading({
					title: '正在提交'
				});
				uni.request({
					url: this.serveipd + "/api/merchant/auth/submitAudit/" + that.userId,
					method: 'post',
					data: {
						name: that.enterprise_name,
						contactName: that.user_name,
						mobile: that.phone_number,
						singleLineTel:that.ordercall,
						shopAddress: that.store_address_1,
						inPic: that.mendian.toString(),
						interiorpics: that.outPiclist.toString(),
						shopTrademark: that.shopTrademark,
						sex: that.sex,
						licensePic: that.licensePic,
						licenseRegcode: that.qua.registration_number,
						licenseRepresentative: that.qua.legal_person,
						licensePlace: that.qua.place,
						permitDate: that.qua.business_end_time,
						licenseRegistrationTime: that.qua.register_time,
						licenseRegistrationAuthority: that.qua.mechanism,
						licenseApprovalDate: that.qua.approval_time,
						licenseScope: that.qua.business_scope,
						licenseCapital: that.qua.registered_capital,
						identityPositive: that.identityPositive,
						identityBack: that.identityBack,
						realName: that.qua.name,
						idCard: that.qua.idCard,
						nation: that.qua.nation,
						dateBirth: that.qua.birthday,
						identityAddress: that.qua.address,
						identityAuthority: that.qua.visa_agency,
						identityValidity: that.qua.validity,
						permitPic: that.permitPic,
						permitName: that.qua.management_name,
						permitRepresentative: that.qua.legal_person_2,
						permitNumber: that.qua.licence_number,
						permitAddress: that.qua.license_address,
						permitValidiconfirmtyperiod: that.qua.permit_time,
						otherProvePic: that.otherProvePiclist.toString(),
						categoryId: that.id,
						provinceId: that.provinceId,
						cityId: that.cityId,
						areaId: that.areaId,
					},
					success: res => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/Merchan_registration/audit_success',
						});
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	@import "../../common/Merchan_registration.css";
</style>
