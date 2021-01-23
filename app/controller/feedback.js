const Controller = require('egg').Controller;
const Result = require('../util/result');
class FeedbackController extends Controller {
  /**
   * 获取统计数据
   */
  async statistic() {
    const { ctx } = this;

    const statisticData = await ctx.service.feedback.feedbackStatistic();

    ctx.body = new Result(statisticData);
  }

  async saveFeedback() {
    const { ctx } = this;

    ctx.validate(
      {
        userId: { require, type: 'int', convertType: 'int' },
        descriptionId: { require, type: 'int', convertType: 'int' },
        mark: { require, type: 'int', min: 1, max: 100, convertType: 'int' },
      },
      ctx.request.body
    );

    const { userId, descriptionId, mark } = ctx.request.body;

    const feedbackResult = ctx.service.feedback.saveFeedback({
      userId,
      descriptionId,
      mark,
    });

    if (!feedbackResult) {
      ctx.status = 400;
      ctx.body = new Result(undefined, '参数不合法');
    }

    ctx.body = new Result(undefined, '感谢反馈!');
  }
}

module.exports = FeedbackController;
