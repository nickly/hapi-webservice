'use strict';
module.exports = {
    skin: {
        "default": "52kj",
        "localhost:8000": "52kj",
        "localhost:8001": "gpc"
    },
    cdnUrl: { development: '', beta: '', release: '' }, //"http://rescsjm.56hx.com/",     
    api: {
        uri: { development: 'http://mweb1.api.csj.roycdn.com/api/', beta: 'http://127.0.0.1:9002/api/', release: 'http://127.0.0.1:9001/api/' },
        ad: {
            url: { development: 'http://ad.1396c.com/service/adjs', beta: 'http://a.591dyd.com/service/adjs', release: 'http://a.591dyd.com/service/adjs' }
        },
        error: {
            "error": "请求出错"
        }
    },
    lotterys: {
        "52kj": {
            pk10: {
                text: "北京赛车PK10",
                code: "pk10",
                url: "/pk10/history"
            },
            cqssc: {
                text: "重庆时时彩",
                code: "cqssc",
                url: "/cqssc/history"
            },
            gdkl10: {
                text: "广东快乐十分",
                code: "gdkl10",
                url: "/gdkl10/history"
            },
            xync: {
                text: "幸运农场",
                code: "xync",
                url: "/xync/history"
            },
            jsk3: {
                text: "江苏快3",
                code: "jsk3",
                url: "/jsk3/history"
            }
        },
        "gpc": {
            pk10: {
                text: "北京赛车PK10",
                code: "pk10",
                url: "/pk10/history"
            },
            cqssc: {
                text: "重庆时时彩",
                code: "cqssc",
                url: "/cqssc/history"
            },
            gdkl10: {
                text: "广东快乐十分",
                code: "gdkl10",
                url: "/gdkl10/history"
            },
            xync: {
                text: "幸运农场",
                code: "xync",
                url: "/xync/history"
            },
            jsk3: {
                text: "江苏快3",
                code: "jsk3",
                url: "/jsk3/history"
            }
        }
    },
    website: {
        "52kj": {
            hostName: 'm.52kjwang.com',
            videoHostName: 'www.1399p.com'
        },
        "gpc": {
            hostName: 'm.52kjwang.com',
            videoHostName: 'www.1399p.com'
        },

    }
};