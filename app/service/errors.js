const Service = require('egg').Service;

class ErrorsService extends Service {
  /**
   * 错误日志插入数据库
   */
  async saveErrorLog(error, errorInfo, userAgent) {
    return await this.ctx.model.Errors.create({
      error,
      errorInfo,
      userAgent,
    });
  }
}

module.exports = ErrorsService;
