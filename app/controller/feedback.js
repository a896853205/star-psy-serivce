const Controller = require('egg').Controller;
const Result = require('../util/result');
class FeedbackController extends Controller {
  /**
   * 获取统计数据
   */
  async statistic() {
    const { ctx } = this;
    const statisticData = await this.ctx.service.feedback.findstatisticData();
    ctx.body = new Result({
      statisticData,
    });
  }
}

module.exports = FeedbackController;
