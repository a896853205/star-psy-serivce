const Controller = require('egg').Controller;
const Result = require('../util/result');
class ErrorsController extends Controller {
  /**
   * 获取前端错误日志
   */
  async errorLog() {
    const { ctx } = this;
    ctx.validate(
      {
        error: { require, type: 'object' },
        errorInfo: { require, type: 'object' },
        userAgent: { require, type: 'string' },
      },
      ctx.request.body
    );
    const { error, errorInfo, userAgent } = ctx.request.body;
    // 错误日志导入数据库
    await this.ctx.service.errors.saveErrorLog(
      JSON.stringify(error),
      JSON.stringify(errorInfo),
      userAgent
    );
    ctx.body = new Result();
  }
}

module.exports = ErrorsController;
