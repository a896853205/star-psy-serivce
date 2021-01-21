const Controller = require('egg').Controller;
const Result = require('../util/result');
class FeedbackController extends Controller {
  /**
   * 获取统计数据
   */
  async statistic() {
    const { ctx } = this;

    const statisticData = await this.ctx.service.feedback.feedbackStatistic();

    ctx.body = new Result(statisticData);
  }
  /**
   * 获取表格数据
   */
  async chart() {
    const { ctx } = this;
    const chartData = await this.ctx.service.feedback.feedbackChart();
    ctx.body = new Result(chartData);
  }
}

module.exports = FeedbackController;
