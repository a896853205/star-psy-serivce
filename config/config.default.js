const Result = require('../app/util/result'),
  { tokenSecret } = require('../key');
/* eslint valid-jsdoc: "off" */
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    onerror: {
      accepts: () => 'json',
      json(err, ctx) {
        if (err.code === 'invalid_param') {
          ctx.status = 400;

          if (!ctx.body) {
            ctx.body = new Result(undefined, '参数不合法');
            return;
          }

          if (!ctx.body.msg) {
            ctx.body = new Result(undefined, '参数不合法');
            return;
          }
        }

        if (err.name === 'AuthenticationError') {
          ctx.status = err.status;
          ctx.body = new Result(undefined, '请重新登录');
          return;
        }

        ctx.status = 500;
      },
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610517627948_427';

  // add your middleware config here
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 取消安全证书验证
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: ["*"], // 白名单
  };

  config.cors = {
    origin: '*', // 跨任何域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 被允许的请求方式
  };

  config.passportJwt = {
    secret: tokenSecret,
  };

  return {
    ...config,
    ...userConfig,
  };
};
