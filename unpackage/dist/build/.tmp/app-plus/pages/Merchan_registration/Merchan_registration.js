(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Merchan_registration/Merchan_registration"],{"077f":function(e,t,a){"use strict";a.r(t);var i=a("34df"),r=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t["default"]=r.a},"095f":function(e,t,a){"use strict";var i=a("ca36"),r=a.n(i);r.a},"0d1e":function(e,t,a){"use strict";a("b007");var i=s(a("b0ce")),r=s(a("269f"));function s(e){return e&&e.__esModule?e:{default:e}}Page((0,i.default)(r.default))},"269f":function(e,t,a){"use strict";a.r(t);var i=a("6106"),r=a("077f");for(var s in r)"default"!==s&&function(e){a.d(t,e,function(){return r[e]})}(s);a("095f");var n=a("2877"),o=Object(n["a"])(r["default"],i["a"],i["b"],!1,null,null,null);t["default"]=o.exports},"34df":function(e,t,a){"use strict";(function(e){function a(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e){var t=new Date,a=t.getFullYear(),i=t.getMonth()+1,r=t.getDate();return"start"===e?a-=100:"end"===e&&(a+=100),i=i>9?i:"0"+i,r=r>9?r:"0"+r,"".concat(a,"-").concat(i,"-").concat(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){var e,t;return t={top:"",underline1:"2px solid #E33E09",underline2:"",underline3:"",height:"",provinceId:"",cityId:"",areaId:"",id:"",cityData:"",citytext:"",citylist:[[],[],[]],otherProvePiclist:[],permitPic:Number,identityBack:Number,identityPositive:Number,licensePic:Number,sex:0,shopTrademark:Number,outPiclist:[],outPic:[],mendian:[],mendianlist:[],imagelist:[],next3:"#DDDDDD",shop_color:"#DDDDDD",orange:"#E33D09",store_address_1:"",multiIndex:[0,0,0],date:i({format:!0}),startDate:i("start"),endDate:i("end"),time:"12:01"},a(t,"date",""),a(t,"enterprise_name",""),a(t,"user_name",""),a(t,"phone_number",""),a(t,"ordercall",""),a(t,"img_number",""),a(t,"verification_code",""),a(t,"error",{border:"1px solid red"}),a(t,"user_error",!1),a(t,"phone_error",!1),a(t,"order_error",!1),a(t,"enterprise_error",!1),a(t,"img_error",!1),a(t,"code_error",!1),a(t,"pickerText",""),a(t,"pickerProducts",""),a(t,"mode",""),a(t,"deepLength",1),a(t,"pickerValueDefault",[0]),a(t,"pickerValueArray",[]),a(t,"img_url",""),a(t,"uuid",""),a(t,"picCode",""),a(t,"now","发送验证码"),a(t,"butDis",!1),a(t,"smsF","smsF"),a(t,"smsT","smsT"),a(t,"userId",Number),a(t,"green",""),a(t,"orange",""),a(t,"step_next",""),a(t,"index",0),a(t,"timeindex",0),a(t,"category",[]),a(t,"shop_page",""),a(t,"step",{basic_success:!1,shop_success:!1,basic_page:"../../static/Merchan_registration/01.png",shop_page:"../../static/Merchan_registration/02.png",next_page_switch:!1,next_3:"../../static/Merchan_registration/03.png"}),a(t,"shop",{near:"../../static/Merchan_registration/icon_addimg.png",far:"../../static/Merchan_registration/icon_addimg.png",inside:"../../static/Merchan_registration/icon_addimg.png",trademark:"../../static/Merchan_registration/icon_addimg.png",shop_page_switch:!1}),a(t,"qua",(e={idCard_error:!1,store_error:!1,merchant_error:!1,registration_error:!1,legal_error:!1,place_error:!1,business_error:!1,register_error:!1,mechanism_error:!1,approval_error:!1},a(e,"business_error",!1),a(e,"registered_error",!1),a(e,"name_error",!1),a(e,"nation_error",!1),a(e,"birthday_error",!1),a(e,"address_error",!1),a(e,"visa_error",!1),a(e,"validity_error",!1),a(e,"management_error",!1),a(e,"legal_2_error",!1),a(e,"licence_number_error",!1),a(e,"license_address_error",!1),a(e,"permit_time_error",!1),a(e,"idCard",""),a(e,"store_address",""),a(e,"merchant_name",""),a(e,"registration_number",""),a(e,"legal_person",""),a(e,"place",""),a(e,"business_end_time",""),a(e,"register_time",""),a(e,"mechanism",""),a(e,"approval_time",""),a(e,"business_scope",""),a(e,"registered_capital",""),a(e,"name",""),a(e,"nation",""),a(e,"birthday",""),a(e,"address",""),a(e,"visa_agency",""),a(e,"validity",""),a(e,"management_name",""),a(e,"legal_person_2",""),a(e,"licence_number",""),a(e,"license_address",""),a(e,"permit_time",""),a(e,"business","../../static/Merchan_registration/icon_addimg.png"),a(e,"positive","../../static/Merchan_registration/icon_addimg.png"),a(e,"back","../../static/Merchan_registration/icon_addimg.png"),a(e,"Licence","../../static/Merchan_registration/icon_addimg.png"),a(e,"items",[{value:"0",name:"男",checked:"true"},{value:"1",name:"女"}]),a(e,"current",0),a(e,"seniority","../../static/Merchan_registration/icon_addimg.png"),e)),t},computed:{},onLoad:function(e){this.userId=parseInt(e.id)},onReady:function(){this.getTopheight(),this.yanzheng(),this.showCategory(),this.getCityData()},methods:{getTopheight:function(){var t=this;e.getSystemInfo({success:function(e){t.top=e.statusBarHeight+44+50+"px",t.height=e.statusBarHeight+44+"px",console.log(t.top)}})},getCityData:function(){var t=this;console.log(1);var a=[],i=[],r=[];e.request({url:this.serveipd+"/api/merchant/auth/cities",method:"GET",data:{},success:function(e){for(var s=0;s<e.data.data[0].area.length;s++)a.push(e.data.data[0].area[s].name);t.citylist[0]=a;for(var n=0;n<e.data.data[0].area[0].area.length;n++)i.push(e.data.data[0].area[0].area[n].name);t.citylist[1]=i;for(var o=0;o<e.data.data[0].area[0].area[0].area.length;o++)r.push(e.data.data[0].area[0].area[0].area[o].name);t.citylist[2]=r},fail:function(){},complete:function(){}})},showCityData:function(t){var a=this,i=this,r=[],s=[],n=[];2!=t.detail.column&&(i.multiIndex[1]=0,i.multiIndex[2]=0),i.multiIndex[t.detail.column]=t.detail.value,e.request({url:this.serveipd+"/api/merchant/auth/cities",method:"GET",data:{},success:function(e){switch(t.detail.column){case 0:for(var o=0;o<e.data.data[0].area[t.detail.value].area.length;o++)r.push(e.data.data[0].area[t.detail.value].area[o].name);i.citylist[1]=r;for(var u=0;u<e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].area.length;u++)s.push(e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].area[u].name);i.citylist[2]=s;break;case 1:for(var d=0;d<e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].area.length;d++)n.push(e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].area[d].name);i.citylist[2]=n,a.$forceUpdate();break}i.provinceId=e.data.data[0].area[i.multiIndex[0]].id,i.cityId=e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].id,i.areaId=e.data.data[0].area[i.multiIndex[0]].area[i.multiIndex[1]].area[i.multiIndex[2]].id},fail:function(){},complete:function(){}}),i.citytext=i.citylist[0][i.multiIndex[0]]+"-"+i.citylist[1][i.multiIndex[1]]+"-"+i.citylist[2][i.multiIndex[2]],this.$forceUpdate()},input_val:function(t){""==this.val&&e.showToast({title:"输入内容不能为空",icon:"none",duration:2e3})},yanzheng:function(){var e=this,t=(new Date).valueOf(),a=Math.ceil(1000999*Math.random());e.uuid=t+a,e.picCode=this.serveipd+"/api/merchant/auth/picCode?userId="+e.userId+"&uuid="+e.uuid},basic_step_next:function(){var t=this,a=this,i=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,r=/^1[34578]\d{9}$/;return""==this.enterprise_name?(this.enterprise_error=!0,e.showToast({title:"企业名不能为空",icon:"none",duration:2e3}),!1):(this.enterprise_error=!1,i.test(this.user_name)?(this.user_error=!1,r.test(this.phone_number)?(this.phone_error=!1,r.test(this.ordercall)?(this.phone_error=!1,""==this.img_number?(this.img_error=!0,e.showToast({title:"验证码不能为空",icon:"none",duration:2e3}),!1):(this.img_error=!1,void e.request({url:this.serveipd+"/api/merchant/auth/smsCodeValidate",method:"GET",data:{mobile:a.phone_number,name:a.enterprise_name,smscode:a.verification_code},success:function(i){return 703==i.data.code?(a.code_error=!0,e.showToast({title:"无效的短信验证码",icon:"none",duration:2e3}),!1):801==i.data.code?(a.code_error=!0,e.showToast({title:"当前手机号已注册",icon:"none",duration:2e3}),!1):816==i.data.code?(a.code_error=!0,e.showToast({title:"企业名称已存在",icon:"none",duration:2e3}),!1):0==i.data.code?(a.code_error=!1,t.orange="green",t.shop_color="#E33D09",t.underline1="",t.underline2="2px solid #E33E09",t.step.basic_page="../../static/Merchan_registration/01_green.png",t.step.shop_page="../../static/Merchan_registration/02_orange.png",void(t.step_next=-100)):void 0},fail:function(){},complete:function(){}}))):(this.phone_error=!0,e.showToast({title:"您的输入有误请重新输入",icon:"none",duration:2e3}),!1)):(this.phone_error=!0,e.showToast({title:"您的输入有误请重新输入",icon:"none",duration:2e3}),!1)):(this.user_error=!0,e.showToast({title:"您的输入有误请重新输入",icon:"none",duration:2e3}),!1))},fasong:function(){var t=this;e.request({url:this.serveipd+"/api/merchant/auth/smsCode",method:"GET",data:{mobile:t.phone_number,picCode:t.img_number,userId:t.userId},success:function(a){return 0==a.data.code?(t.img_error=!1,!1):702==a.data.code?(t.img_error=!0,e.showToast({title:"发送短信验证码失败",icon:"none",duration:F2000}),!1):706==a.data.code?(t.img_error=!0,e.showToast({title:"验证码超时",icon:"none",duration:2e3}),!1):705==a.data.code?(t.img_error=!0,e.showToast({title:"无效的验证码",icon:"none",duration:2e3}),!1):void 0},fail:function(){},complete:function(){}});var a=5;t.butDis=!0;var i=setInterval(function(){a--,t.now=a+" S",a<=0&&(clearInterval(i),t.now="重新发送",t.butDis=!1)},1e3)},add_near:function(){var t=this;e.chooseImage({count:2,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.mendianlist.push(i[0].path),e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.mendian.push(JSON.parse(e.data).id)}})}})},add_inside:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.outPiclist.push(i[0].path),e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.outPic.push(JSON.parse(e.data).id),console.log(t.outPic)}})}})},add_trademark:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.shop.trademark=i[0].path,e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.shopTrademark=parseInt(JSON.parse(e.data).id)}})}})},add_seniority:function(){var t=this,a=this;this.imagelist.length>=4||e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(i){console.log(i);var r=i.tempFiles;t.imagelist.push(r[0].path),e.uploadFile({url:a.serveipd+"/ajax/upfile",filePath:r[0].path,name:"upfile",formData:{},success:function(e){a.otherProvePiclist.push(JSON.parse(e.data).id),console.log(a.otherProvePiclist)}})}})},add_positive:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.qua.positive=i[0].path,e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.identityBack=parseInt(JSON.parse(e.data).id)}})}})},add_back:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.qua.back=i[0].path,e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.identityPositive=parseInt(JSON.parse(e.data).id)}})}})},add_Licence:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.qua.Licence=i[0].path,e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.permitPic=parseInt(JSON.parse(e.data).id)}})}})},shop_step_next:function(){""!=this.pickerProducts?""!=this.citytext?""!=this.store_address_1?0!=this.mendianlist.length?"../../static/Merchan_registration/icon_addimg.png"!=this.shop.trademark?(this.underline2="",this.underline3="2px solid #E33E09",this.shop_color="green",this.step.shop_page="../../static/Merchan_registration/02_green.png",this.next3="#E33D09",this.step.next_3="../../static/Merchan_registration/03_orange.png",this.step_next=-200):e.showToast({title:"请输入店铺商标",icon:"none",mask:!1,duration:1500}):e.showToast({title:"请输入门店近景远景",icon:"none",mask:!1,duration:1500}):e.showToast({title:"请输入门店地址",icon:"none",mask:!1,duration:1500}):e.showToast({title:"请选择门店区域",icon:"none",mask:!1,duration:1500}):e.showToast({title:"请选择经营品类",icon:"none",mask:!1,duration:1500})},showCategory:function(t){var a=this,i=this;e.request({url:this.serveipd+"/api/merchant/auth/categories",method:"GET",data:{},success:function(e){console.log(e),a.categorylist=e.data.data;for(var t=0;t<e.data.data.length;t++)i.category.push(e.data.data[t].name)},fail:function(){},complete:function(){}})},categoryColumn:function(e){this.index=e.detail.value,this.pickerProducts=this.category[this.index],this.id=this.categorylist[this.index].id,console.log(this.id)},radioChange:function(e){for(var t=0;t<this.qua.items.length;t++)if(this.qua.items[t].value===e.target.value){this.qua.current=t,console.log(this.qua.items[t].value);break}},add_business:function(){var t=this;e.chooseImage({count:1,sizeconfirmtype:["original","compressed"],success:function(a){var i=a.tempFiles;t.qua.business=i[0].path,e.uploadFile({url:t.serveipd+"/ajax/upfile",filePath:i[0].path,name:"upfile",formData:{},success:function(e){t.licensePic=parseInt(JSON.parse(e.data).id)}})}})},bindPickerChange:function(e){console.log("picker发送选择改变，携带值为："+e.target.value),this.timeindex=e.target.value},bindDateChange:function(e){this.qua.business_end_time=e.target.value},register_time:function(e){this.qua.register_time=e.target.value},approval_time:function(e){this.qua.approval_time=e.target.value},birthday:function(e){this.qua.birthday=e.target.value},validity:function(e){this.qua.validity=e.target.value},permit_time:function(e){this.qua.permit_time=e.target.value},submission:function(){var t=this,a=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;if("../../static/Merchan_registration/icon_addimg.png"!=this.qua.business){if(""==this.qua.store_address)return this.qua.store_error=!0,void e.showToast({title:"门店地址不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.store_address))return this.qua.store_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.store_error=!1,""==this.qua.merchant_name)return this.qua.merchant_error=!0,void e.showToast({title:"商户名称不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.merchant_name))return this.qua.merchant_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.merchant_error=!1,""==this.qua.registration_number)return this.qua.registration_error=!0,void e.showToast({title:"注册账号/统一社会信用代码不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.registration_number))return this.qua.registration_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.registration_error=!1,""==this.qua.legal_person)return this.qua.legal_error=!0,void e.showToast({title:"法人代表/经营者不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.legal_person))return this.qua.legal_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.legal_error=!1,""==this.qua.place)return this.qua.place_error=!0,void e.showToast({title:"经营场所不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.place))return this.qua.place_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.place_error=!1,""==this.qua.business_end_time)return this.qua.business_error=!0,void e.showToast({title:"请选择营业执照到期时间",icon:"none",mask:!1,duration:1500});if(this.qua.business_error=!1,""==this.qua.register_time)return this.qua.register_error=!0,void e.showToast({title:"请选择注册时间",icon:"none",mask:!1,duration:1500});if(this.qua.register_error=!1,""==this.qua.mechanism)return this.qua.mechanism_error=!0,void e.showToast({title:"发证/登记机关不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.mechanism))return this.qua.mechanism_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.mechanism_error=!1,""==this.qua.approval_time)return this.qua.approval_error=!0,void e.showToast({title:"请选择核准时间",icon:"none",mask:!1,duration:1500});if(this.qua.approval_error=!1,"../../static/Merchan_registration/icon_addimg.png"!=this.qua.positive)if("../../static/Merchan_registration/icon_addimg.png"!=this.qua.back){if(""==this.qua.name)return this.qua.name_error=!0,void e.showToast({title:"姓名不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.name))return this.qua.name_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.name_error=!1,""==this.qua.idCard)return this.qua.idCard_error=!0,void e.showToast({title:"身份证号不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.idCard))return this.qua.idCard_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.idCard_error=!1,""==this.qua.nation)return this.qua.nation_error=!0,void e.showToast({title:"民族不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.nation))return this.qua.nation_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.nation_error=!1,""==this.qua.birthday)return this.qua.birthday_error=!0,void e.showToast({title:"请选择出生日期",icon:"none",mask:!1,duration:1500});if(this.qua.birthday_error=!1,""==this.qua.address)return this.qua.address_error=!0,void e.showToast({title:"地址不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.address))return this.qua.address_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.address_error=!1,""==this.qua.visa_agency)return this.qua.visa_error=!0,void e.showToast({title:"签证机关不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.visa_agency))return this.qua.visa_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.visa_error=!1,""==this.qua.validity)return this.qua.validity_error=!0,void e.showToast({title:"请选择有效期",icon:"none",mask:!1,duration:1500});if(this.qua.validity_error=!1,"../../static/Merchan_registration/icon_addimg.png"!=this.qua.Licence){if(""==this.qua.management_name)return this.qua.management_error=!0,void e.showToast({title:"经营者名称不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.management_name))return this.qua.management_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.management_error=!1,""==this.qua.legal_person_2)return this.qua.legal_2_error=!0,void e.showToast({title:"法定代表人不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.legal_person_2))return this.qua.legal_2_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.legal_2_error=!1,""==this.qua.licence_number)return this.qua.licence_number_error=!0,void e.showToast({title:"许可证编号不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.licence_number))return this.qua.licence_number_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.licence_number_error=!1,""==this.qua.license_address)return this.qua.license_address_error=!0,void e.showToast({title:"许可证地址不能为空",icon:"none",mask:!1,duration:1500});if(a.test(this.qua.license_address))return this.qua.license_address_error=!0,void e.showToast({title:"输入内容不能包含特殊字符",icon:"none",mask:!1,duration:1500});if(this.qua.license_address_error=!1,""==this.qua.permit_time)return this.qua.permit_time_error=!0,void e.showToast({title:"请选择有效期",icon:"none",mask:!1,duration:1500});this.qua.permit_time_error=!1,this.imagelist.length<2?e.showToast({title:"请上至少上传2张资质图像",icon:"none",mask:!1,duration:1500}):(e.showLoading({title:"正在提交"}),e.request({url:this.serveipd+"/api/merchant/auth/submitAudit/"+t.userId,method:"post",data:{name:t.enterprise_name,contactName:t.user_name,mobile:t.phone_number,singleLineTel:t.ordercall,shopAddress:t.store_address_1,inPic:t.mendian.toString(),interiorpics:t.outPiclist.toString(),shopTrademark:t.shopTrademark,sex:t.sex,licensePic:t.licensePic,licenseRegcode:t.qua.registration_number,licenseRepresentative:t.qua.legal_person,licensePlace:t.qua.place,permitDate:t.qua.business_end_time,licenseRegistrationTime:t.qua.register_time,licenseRegistrationAuthority:t.qua.mechanism,licenseApprovalDate:t.qua.approval_time,licenseScope:t.qua.business_scope,licenseCapital:t.qua.registered_capital,identityPositive:t.identityPositive,identityBack:t.identityBack,realName:t.qua.name,idCard:t.qua.idCard,nation:t.qua.nation,dateBirth:t.qua.birthday,identityAddress:t.qua.address,identityAuthority:t.qua.visa_agency,identityValidity:t.qua.validity,permitPic:t.permitPic,permitName:t.qua.management_name,permitRepresentative:t.qua.legal_person_2,permitNumber:t.qua.licence_number,permitAddress:t.qua.license_address,permitValidiconfirmtyperiod:t.qua.permit_time,otherProvePic:t.otherProvePiclist.toString(),categoryId:t.id,provinceId:t.provinceId,cityId:t.cityId,areaId:t.areaId},success:function(t){e.hideLoading(),e.navigateTo({url:"/pages/Merchan_registration/audit_success"})},fail:function(){},complete:function(){}}))}else e.showToast({title:"请输入许可证",icon:"none",mask:!1,duration:1500})}else e.showToast({title:"请输入手持身份证反面",icon:"none",mask:!1,duration:1500});else e.showToast({title:"请输入手持身份证正面",icon:"none",mask:!1,duration:1500})}else e.showToast({title:"请输入营业执照",icon:"none",mask:!1,duration:1500})}}};t.default=r}).call(this,a("6e42")["default"])},6106:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"content_box"},[a("view",{staticClass:"navigation",style:{height:e.height}},[a("navigator",{attrs:{"open-type":"navigateBack"}},[a("image",{attrs:{src:"../../static/Merchan_registration/back.png",mode:""}})]),a("text",[e._v("商户入驻申请")])],1),a("view",{staticClass:"step",style:{paddingTop:e.height}},[a("view",{style:{color:e.orange,borderBottom:e.underline1}},[a("image",{attrs:{src:e.step.basic_page,mode:""}}),e._v("基本信息")]),a("view",{style:{color:e.shop_color,borderBottom:e.underline2}},[a("image",{attrs:{src:e.step.shop_page,mode:""}}),e._v("门店信息")]),a("view",{style:{color:e.next3,borderBottom:e.underline3}},[a("image",{attrs:{src:e.step.next_3,mode:""}}),e._v("营业资质")])]),a("view",{staticClass:"infor_list",style:{left:e.step_next+"vw",marginTop:e.top}},[a("view",{staticClass:"basic_page infor_box"},[a("view",{staticClass:"basic_content"},[a("view",{staticClass:"tips div"},[e._v("请填写以下信息")]),a("view",{staticClass:"div"},[a("text",[e._v("企业名称")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.enterprise_name,expression:"enterprise_name"}],class:{error:e.enterprise_error},attrs:{confirmtype:"text",placeholder:"请输入企业名称",eventid:"8f10006a-0"},domProps:{value:e.enterprise_name},on:{input:function(t){t.target.composing||(e.enterprise_name=t.target.value)}}})]),a("view",{staticClass:"div"},[a("text",[e._v("联系人姓名")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user_name,expression:"user_name"}],class:{error:e.user_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入联系人姓名",eventid:"8f10006a-1"},domProps:{value:e.user_name},on:{input:function(t){t.target.composing||(e.user_name=t.target.value)}}})]),a("view",{staticClass:"div"},[a("text",[e._v("手机号")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone_number,expression:"phone_number"}],class:{error:e.phone_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入手机号",eventid:"8f10006a-2"},domProps:{value:e.phone_number},on:{input:function(t){t.target.composing||(e.phone_number=t.target.value)}}})]),a("view",{staticClass:"div"},[a("text",[e._v("接单电话")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.ordercall,expression:"ordercall"}],class:{error:e.order_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入接单电话",eventid:"8f10006a-3"},domProps:{value:e.ordercall},on:{input:function(t){t.target.composing||(e.ordercall=t.target.value)}}})]),a("view",{staticClass:" div img_verification_box"},[a("text",[e._v("图形码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.img_number,expression:"img_number"}],class:{error:e.img_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入图形码",eventid:"8f10006a-4"},domProps:{value:e.img_number},on:{input:function(t){t.target.composing||(e.img_number=t.target.value)}}}),a("image",{staticClass:"verification",attrs:{src:e.picCode,eventid:"8f10006a-5"},on:{click:e.yanzheng}})]),a("view",{staticClass:"sms div"},[a("text",[e._v("验证码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.verification_code,expression:"verification_code"}],class:{error:e.code_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入验证码",eventid:"8f10006a-6"},domProps:{value:e.verification_code},on:{input:function(t){t.target.composing||(e.verification_code=t.target.value)}}}),a("button",{class:[e.butDis?e.smsF:e.smsT],attrs:{confirmtype:"primary",disabled:e.butDis,eventid:"8f10006a-7"},on:{tap:e.fasong}},[e._v(e._s(e.now))])],1)]),a("button",{staticClass:"basic_step_next step_next",attrs:{confirmtype:"primary",eventid:"8f10006a-8"},on:{tap:e.basic_step_next}},[e._v("下一步")])],1),a("view",{staticClass:"shop_page infor_box"},[a("view",{staticClass:"basic_content"},[a("view",{staticClass:"tips div"},[e._v("请继续填写以下信息")]),a("view",{staticClass:"div category"},[a("text",[e._v("经营品类")]),a("picker",{staticStyle:{display:"inline-block"},attrs:{mode:"selector",value:e.index,range:e.category,eventid:"8f10006a-10"},on:{change:e.categoryColumn}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.pickerProducts,expression:"pickerProducts"}],attrs:{confirmtype:"text",placeholder:"请选择",eventid:"8f10006a-9"},domProps:{value:e.pickerProducts},on:{input:function(t){t.target.composing||(e.pickerProducts=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("text",[e._v("门店区域")]),a("picker",{staticStyle:{display:"inline-block"},attrs:{mode:"multiSelector",value:e.multiIndex,range:e.citylist,eventid:"8f10006a-12"},on:{columnchange:e.showCityData}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.citytext,expression:"citytext"}],attrs:{confirmtype:"text",placeholder:"请选择",eventid:"8f10006a-11"},domProps:{value:e.citytext},on:{tap:e.showCityData,input:function(t){t.target.composing||(e.citytext=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("text",[e._v("门店地址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.store_address_1,expression:"store_address_1"}],attrs:{confirmtype:"text",value:"",placeholder:"请输入门店地址",eventid:"8f10006a-13"},domProps:{value:e.store_address_1},on:{input:function(t){t.target.composing||(e.store_address_1=t.target.value)}}})]),a("view",{staticClass:"div div_photo"},[a("text",[e._v("门头近景和远景")]),a("view",{staticClass:"add_img"},[e._l(e.mendianlist,function(e,t){return a("view",{key:t},[a("image",{staticClass:"uni-uploader__img",attrs:{src:e,"data-src":e}})])}),a("image",{attrs:{src:e.qua.seniority,mode:"",eventid:"8f10006a-14"},on:{tap:e.add_near}})],2)]),a("view",{staticClass:" div div_photo"},[a("text",[e._v("店内环境")]),a("view",{staticClass:"add_img"},[e._l(e.outPiclist,function(e,t){return a("view",{key:t},[a("image",{staticClass:"uni-uploader__img",attrs:{src:e,"data-src":e}})])}),a("image",{attrs:{src:e.shop.inside,mode:"",eventid:"8f10006a-15"},on:{tap:e.add_inside}})],2)]),a("view",{staticClass:"div div_photo"},[a("text",[e._v("店铺商标")]),a("view",{staticClass:"add_img"},[a("image",{attrs:{src:e.shop.trademark,mode:"",eventid:"8f10006a-16"},on:{tap:e.add_trademark}})])])]),a("button",{staticClass:"step_next",attrs:{confirmtype:"primary",eventid:"8f10006a-17"},on:{tap:e.shop_step_next}},[e._v("下一步")])],1),a("view",{staticClass:"qualifications_page infor_box"},[a("view",{staticClass:"basic_content"},[a("view",{staticClass:"tips div"},[e._v("请继续填写以下信息后提交审核")]),a("view",{staticClass:"div div_photo"},[a("text",[e._v("营业执照")]),a("view",{staticClass:"add_img"},[a("image",{attrs:{src:e.qua.business,mode:"",eventid:"8f10006a-18"},on:{tap:e.add_business}})])]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.store_address,expression:"qua.store_address"}],class:{error:e.qua.store_error},attrs:{confirmtype:"text",placeholder:"请输入门店地址",eventid:"8f10006a-19"},domProps:{value:e.qua.store_address},on:{input:function(t){t.target.composing||(e.qua.store_address=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.merchant_name,expression:"qua.merchant_name"}],class:{error:e.qua.merchant_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入商户名称",eventid:"8f10006a-20"},domProps:{value:e.qua.merchant_name},on:{input:function(t){t.target.composing||(e.qua.merchant_name=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.registration_number,expression:"qua.registration_number"}],class:{error:e.qua.registration_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入注册号/统一社会信用代码",eventid:"8f10006a-21"},domProps:{value:e.qua.registration_number},on:{input:function(t){t.target.composing||(e.qua.registration_number=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.legal_person,expression:"qua.legal_person"}],class:{error:e.qua.legal_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入法定代表人/经营者",eventid:"8f10006a-22"},domProps:{value:e.qua.legal_person},on:{input:function(t){t.target.composing||(e.qua.legal_person=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.place,expression:"qua.place"}],class:{error:e.qua.place_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入经营场所",eventid:"8f10006a-23"},domProps:{value:e.qua.place},on:{input:function(t){t.target.composing||(e.qua.place=t.target.value)}}})]),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-25"},on:{change:e.bindDateChange}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.business_end_time,expression:"qua.business_end_time"}],class:{error:e.qua.business_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入营业执照到期时间",eventid:"8f10006a-24"},domProps:{value:e.qua.business_end_time},on:{input:function(t){t.target.composing||(e.qua.business_end_time=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-27"},on:{change:e.register_time}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.register_time,expression:"qua.register_time"}],class:{error:e.qua.register_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入注册时间",eventid:"8f10006a-26"},domProps:{value:e.qua.register_time},on:{input:function(t){t.target.composing||(e.qua.register_time=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.mechanism,expression:"qua.mechanism"}],class:{error:e.qua.mechanism_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入发证/登记机关",eventid:"8f10006a-28"},domProps:{value:e.qua.mechanism},on:{input:function(t){t.target.composing||(e.qua.mechanism=t.target.value)}}})]),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-30"},on:{change:e.approval_time}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.approval_time,expression:"qua.approval_time"}],class:{error:e.qua.approval_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入核准时间",eventid:"8f10006a-29"},domProps:{value:e.qua.approval_time},on:{input:function(t){t.target.composing||(e.qua.approval_time=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.business_scope,expression:"qua.business_scope"}],class:{error:e.qua.business_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入经营范围 非必填",eventid:"8f10006a-31"},domProps:{value:e.qua.business_scope},on:{input:function(t){t.target.composing||(e.qua.business_scope=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.registered_capital,expression:"qua.registered_capital"}],class:{error:e.qua.registered_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入注册资金 非必填",eventid:"8f10006a-32"},domProps:{value:e.qua.registered_capital},on:{input:function(t){t.target.composing||(e.qua.registered_capital=t.target.value)}}})]),a("view",{staticClass:"div div_photo"},[a("text",[e._v("手持身份证正面")]),a("view",{staticClass:"add_img"},[a("image",{attrs:{src:e.qua.positive,mode:"",eventid:"8f10006a-33"},on:{tap:e.add_positive}})])]),a("view",{staticClass:"div div_photo"},[a("text",[e._v("手持身份证反面")]),a("view",{staticClass:"add_img"},[a("image",{attrs:{src:e.qua.back,mode:"",eventid:"8f10006a-34"},on:{tap:e.add_back}})])]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.name,expression:"qua.name"}],class:{error:e.qua.name_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入姓名",eventid:"8f10006a-35"},domProps:{value:e.qua.name},on:{input:function(t){t.target.composing||(e.qua.name=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.idCard,expression:"qua.idCard"}],class:{error:e.qua.idCard_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入身份证号",eventid:"8f10006a-36"},domProps:{value:e.qua.idCard},on:{input:function(t){t.target.composing||(e.qua.idCard=t.target.value)}}})]),a("view",{staticClass:"div sex"},[a("text",[e._v("性别")]),a("radio-group",{attrs:{eventid:"8f10006a-37",mpcomid:"8f10006a-0"},on:{change:e.radioChange}},e._l(e.qua.items,function(t,i){return a("label",{key:t.value,staticClass:"uni-list-cell"},[a("view",[a("radio",{attrs:{value:t.value,checked:i===e.qua.current}})],1),a("view",[e._v(e._s(t.name))])])}))],1),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.nation,expression:"qua.nation"}],class:{error:e.qua.nation_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入民族",eventid:"8f10006a-38"},domProps:{value:e.qua.nation},on:{input:function(t){t.target.composing||(e.qua.nation=t.target.value)}}})]),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-40"},on:{change:e.birthday}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.birthday,expression:"qua.birthday"}],class:{error:e.qua.birthday_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入出生日期",eventid:"8f10006a-39"},domProps:{value:e.qua.birthday},on:{input:function(t){t.target.composing||(e.qua.birthday=t.target.value)}}})])],1),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.address,expression:"qua.address"}],class:{error:e.qua.address_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入身份证地址",eventid:"8f10006a-41"},domProps:{value:e.qua.address},on:{input:function(t){t.target.composing||(e.qua.address=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.visa_agency,expression:"qua.visa_agency"}],class:{error:e.qua.visa_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入签证机关",eventid:"8f10006a-42"},domProps:{value:e.qua.visa_agency},on:{input:function(t){t.target.composing||(e.qua.visa_agency=t.target.value)}}})]),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-44"},on:{change:e.validity}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.validity,expression:"qua.validity"}],class:{error:e.qua.validity_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入身份证有效期",eventid:"8f10006a-43"},domProps:{value:e.qua.validity},on:{input:function(t){t.target.composing||(e.qua.validity=t.target.value)}}})])],1),a("view",{staticClass:"div div_photo"},[a("text",[e._v("许可证照片上传")]),a("view",{staticClass:"add_img"},[a("image",{attrs:{src:e.qua.Licence,mode:"",eventid:"8f10006a-45"},on:{tap:e.add_Licence}})])]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.management_name,expression:"qua.management_name"}],class:{error:e.qua.management_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入经营者名称",eventid:"8f10006a-46"},domProps:{value:e.qua.management_name},on:{input:function(t){t.target.composing||(e.qua.management_name=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.legal_person_2,expression:"qua.legal_person_2"}],class:{error:e.qua.legal_2_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入法定代表人",eventid:"8f10006a-47"},domProps:{value:e.qua.legal_person_2},on:{input:function(t){t.target.composing||(e.qua.legal_person_2=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.licence_number,expression:"qua.licence_number"}],class:{error:e.qua.licence_number_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入许可证编号",eventid:"8f10006a-48"},domProps:{value:e.qua.licence_number},on:{input:function(t){t.target.composing||(e.qua.licence_number=t.target.value)}}})]),a("view",{staticClass:"div"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.license_address,expression:"qua.license_address"}],class:{error:e.qua.license_address_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入许可证门店地址",eventid:"8f10006a-49"},domProps:{value:e.qua.license_address},on:{input:function(t){t.target.composing||(e.qua.license_address=t.target.value)}}})]),a("view",{staticClass:"div"},[a("picker",{attrs:{mode:"date",value:e.date,start:e.startDate,end:e.endDate,eventid:"8f10006a-51"},on:{change:e.permit_time}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qua.permit_time,expression:"qua.permit_time"}],class:{error:e.qua.permit_time_error},attrs:{confirmtype:"text",value:"",placeholder:"请输入许可证有效期",eventid:"8f10006a-50"},domProps:{value:e.qua.permit_time},on:{input:function(t){t.target.composing||(e.qua.permit_time=t.target.value)}}})])],1),a("view",{staticClass:"div div_photo"},[a("text",[e._v("资质上传(2-4张)")]),a("view",{staticClass:"add_img"},[e._l(e.imagelist,function(e,t){return a("view",{key:t},[a("image",{staticClass:"uni-uploader__img",attrs:{src:e,"data-src":e}})])}),a("image",{attrs:{src:e.qua.seniority,mode:"",eventid:"8f10006a-52"},on:{tap:e.add_seniority}})],2)])]),a("button",{staticClass:"step_next",attrs:{confirmtype:"primary",eventid:"8f10006a-53"},on:{tap:e.submission}},[e._v("提交")])],1)])])},r=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return r})},ca36:function(e,t,a){}},[["0d1e","common/runtime","common/vendor"]]]);