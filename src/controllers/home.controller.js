import req from 'request';
import { BaseController } from './base.controller';
import { ArticleService } from '../services/article.service';
import { Pk10Service } from '../services/pk10.service';
import { CqsscService } from '../services/cqssc.service';
import { XyncService } from '../services/xync.service';
import { Gdkl10Service } from '../services/gdkl10.service';
import { Jsk3Service } from '../services/jsk3.service';
/**Controller for 'main'*/
export class HomeController extends BaseController {

    /**Constructor */
    constructor(endpoint) {
        super(endpoint);
        this.articleService = new ArticleService();
        this.pk10Service = new Pk10Service();
        this.cqsscService = new CqsscService();
        this.xyncService = new XyncService();
        this.gdkl10Service = new Gdkl10Service();
        this.jsk3Service = new Jsk3Service();
    }



    /**
     * 首页
     */
    index(request, reply) {



            return this.articleService.articleList(0, 5, 1, 1).then((list) => {
                let context = {
                    //seo, 
                    articles: list == null ? null : list.Result,
                    layout: {
                        header: 'header',
                        footer: 'footer'
                    }
                };
                this.render(context, request, reply);
            });

        }
        /*获取所有开奖信息*/
    getAllAwardData(request, reply) {
        return Promise.all([this.pk10Service.getAwardTimes(), this.cqsscService.getAwardTimes(), this.xyncService.getAwardTimes(), this.gdkl10Service.getAwardTimes(), this.jsk3Service.getAwardTimes()]).then(([awardData1, awardData2, awardData3, awardData4, awardData5]) => {
            let result = [];
            awardData2 = JSON.parse(awardData2.Result);
            awardData3 = JSON.parse(awardData3.Result);
            awardData4 = JSON.parse(awardData4.Result);
            awardData5 = JSON.parse(awardData5.Result);
            awardData2.current.periodNumber = new Date(awardData2.current.awardTime).format('YYYYMMdd') + awardData2.current.periodNumber.toString().zfill(3);
            awardData3.current.periodNumber = new Date(awardData3.current.awardTime).format('YYYYMMdd') + awardData3.current.periodNumber.toString().zfill(3);
            awardData4.current.periodNumber = new Date(awardData4.current.awardTime).format('YYYYMMdd') + awardData4.current.periodNumber.toString().zfill(3);
            awardData5.current.periodNumber = new Date(awardData5.current.awardTime).format('YYYYMMdd') + awardData5.current.periodNumber.toString().zfill(3);
            result.push({ awardData: JSON.parse(awardData1.Result), lotteryCode: 'pk10' });
            result.push({ awardData: awardData2, lotteryCode: 'cqssc' });
            result.push({ awardData: awardData3, lotteryCode: 'xync' });
            result.push({ awardData: awardData4, lotteryCode: 'gdkl10' });
            result.push({ awardData: awardData5, lotteryCode: 'jsk3' });
            this.json(result, request, reply);
        });
    }

    404(request, reply) {
        return this.render({
            url: "/",
            title: "404",
            time: (new Date()).valueOf(),
            layout: {
                header: 'header'
            }
        }, request, reply);
    }
}