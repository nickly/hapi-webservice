import { BaseService } from './base.service'
import cacheService from './cache.service';


export class ArticleService extends BaseService {

    constructor() {
        super();
        this.lotteryCode = 'article';
    }


    /**
     * 资讯列表
     * sumId 资讯分类
     * //sumId 对应彩种分类id
     *  //61 "重庆时时彩", "shishicai" 
     *  //62,"广东快乐十分", "gdkl10" 
     *  //63, "北京赛车pk10", "pk10"
     *  //65, "江苏骰宝(快3)", "jsk3";
     *  //67, "幸运农场", "xync" ;
     *  //69, "幸运飞艇", "xyft" ;
     *  //80, "快乐8", "kl8" ;
     *  //72, "上海时时乐", "xyft" ;
     *  //78, "广东11选5", "gd11x5" ;
     *  //77, "江西11选5", "jx11x5" ;
     *  //76, "十一运夺金", "sy11x5" ;
     *  //75, "天津时时彩", "tjssc" ;
     *  //74, "新疆时时彩", "xjssc" ;
     *  //73, "圣地彩", "xjssc" ;
     *  //79, "排列3", "pl3" ;
     *  //80, "福彩3D", "fc3d" ;
     * pageSize 页大小
     * page 页索引
     * type 1获取每个分类 最新一条，0获取所有分类 按时间倒序
     */
    articleList(sumId, pageSize, page, type) {

            let cacheOpt = { key: `article_aritclcList`, expired: 50000 };
            cacheOpt = {...cacheOpt, ...this.cacheSetting['articleList'] };

            const httpOpt = { url: `article/getarticleseolist` };

            if (sumId >= 0) {
                httpOpt.qs = { sumId: sumId, pageSize: pageSize, page: page, type: type };

                cacheOpt.key += `_${sumId}_${pageSize}_${page}_${type}`;
            }
            return this.httpGet(httpOpt, cacheOpt);
        }
        /**
         * 资讯详情
         * id 资讯id
         */
    details(id) {

        let cacheOpt = { key: `article_details`, expired: 50000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['details'] };

        //,method:"GET",json:false,headers:{}
        const httpOpt = { url: `article/details` };

        if (id) {
            httpOpt.qs = { id: id }
            cacheOpt.key += `_${id}`;
        }

        return this.httpGet(httpOpt, cacheOpt);
    }

}