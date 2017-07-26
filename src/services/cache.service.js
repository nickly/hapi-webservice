import logger from './logger.service';

const cacheService = new class CacheService {

    constructor() {

        this._cache = {};
        this._refer = {};

        // 在这里继续写你的更多代码 ...
    }


    /**
     * 获取缓存中的数据
     */
    get(options) {
        if (!this._refer[options.key] || !this._cache[options.key]) {
            return null;
        }
        //是否过期
        if (new Date().getTime() > this._refer[options.key].expiredTime) {

            logger.debug(`缓存过期:${options.key}`);
            this._cache[options.key] = null;
            return null;
        }

        return this._cache[options.key];
    }

    /**
     * 设置缓存
     * options{key:缓存key,expired:过期时间，单位毫秒}
     * val：缓存数据
     */
    set(options, val) {

        this._cache[options.key] = val;
        this._refer[options.key] = { expiredTime: new Date().getTime() + options.expired };
        logger.debug(`设置缓存:${options.key}`);
    }

}();

export default cacheService;