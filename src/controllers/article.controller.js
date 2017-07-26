import { BaseController } from './base.controller';
import { ArticleService } from '../services/article.service';

export class ArticleController extends BaseController {
    constructor(endpoint) {
        super(endpoint);
        this.articleService = new ArticleService();
    }


    /**
     * 资讯列表
     * @param {*} request 
     * @param {*} reply 
     */

    list(request, reply) {

        return this.articleService.articleList(request.query.sumId, request.query.pageSize, request.query.page,0).then((json) => {
            let seo = { title: "资讯列表111", keywords: "资讯列表", description: '资讯列表' };
            let data = json.Result;
            //头部返回按钮连接地址
            let url = '';
            if (request.query.sumId > 0 && data.List.length > 0) {
                var dataArticle = data.List[0];
                seo.title = dataArticle.LotteryName + "技巧_" + dataArticle.LotteryName + "投注技巧";
                seo.keywords = dataArticle.LotteryName + "技巧," + dataArticle.LotteryName + "投注技巧";
                seo.description = "【52开奖网】" + dataArticle.LotteryName + "技巧频道提供" + dataArticle.LotteryName + "推荐计划," + dataArticle.LotteryName + "推荐号码等功能";
                url = '/' + (dataArticle.LotteryCode=="shishicai"?"cqssc":dataArticle.LotteryCode) + '/history';
            }

            let title = "技巧文章";
            if (data.List.length > 0) {
                title = data.List[0].LotteryName + "技巧文章";
            }

            let context = {
                data: data.List,
                title: title,
                url: url,
                layout: {
                    header: 'articleHeader'
                },
                seo: seo,
                sumId: request.query.sumId
            };
            this.render(context, request, reply);

        });
    }

    /**
     * 资讯详情
     * @param {*} request 
     * @param {*} reply 
     */
    details(request, reply) {


        return this.articleService.details(request.query.id).then((json) => {
            var seo = {};
            let url = "/article/list?sumId=" + json.Result.SubcolumnId;
            if (request.query.home) {
                url = "/"
            }
            if (json && json.Result && json.Result) {
                var details = json.Result.Details;
                seo = { title: details.SeoTitle == "" ? json.Result.Title : details.SeoTitle, keywords: details.SeoKeywords, description: details.SeoDescription };

            }
            let context = {
                data: json.Result,
                title: "文章详情",
                url: url,
                layout: {
                    header: 'articleHeader'
                },
                seo: seo
            };
            this.render(context, request, reply);

        });
    }

    getlist(request, reply) {
        return this.articleService.articleList(request.query.sumId, request.query.pageSize, request.query.page,0).then((json) => {
            let data = json.Result;
            this.html(`article/_list`, {
                data: data.List
            }, request, reply);
        });
    }

}