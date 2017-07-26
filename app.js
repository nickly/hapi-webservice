'use strict';
module.exports = {
	skin: {
		"default": "52kj",
		"localhost:8000": "52kj",
		"localhost:8001": "gpc"
	},
	cdnUrl: '', //"http://rescsjm.56hx.com/",     
	api: {
		//uri: 'http://wap.api.1396c.com/api/',
		uri: 'http://m.api.1399p.com/api/',
		ad: {
			websiteId: 43
		},
		error: {
			"error": "请求出错"
		} 
	},
	lotterys: { 
			"52kj": [
				{
					text: "北京赛车PK10", code: "pk10",url:"/pk10/history"
				},
				{
					text: "重庆时时彩", code: "cqssc",url:"/cqssc/history"
				},
				{
					text: "广东快乐十分", code: "gdkl10",url:"/gdkl10/history"
				},
				{
					text: "幸运农场", code: "xync",url:"/xync/history"
				},
				{
					text: "江苏快3", code: "csk3",url:"/csk3/history"
				}
			],
			"gpc": [
				{
					text: "北京赛车PK10", code: "pk10",url:"/pk10/history"
				},
				{
					text: "重庆时时彩", code: "cqssc",url:"/cqssc/history"
				},
				{
					text: "广东快乐十分", code: "gdkl10",url:"/gdkl10/history"
				},
				{
					text: "幸运农场", code: "xync",url:"/xync/history"
				},
				{
					text: "江苏快3", code: "csk3",url:"/csk3/history"
				}
			]
		}
};