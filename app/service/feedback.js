/**
 * feedback数据库操作
 */
const Service = require('egg').Service;
const Sequelize = require('sequelize');
class FeedbackService extends Service {
  /**
   * 今日增加数
   */
  async todayIncrease() {
    const Op = Sequelize.Op;
    const todayEarlyMorning = new Date().setHours(0, 0, 0, 0);

    return await this.ctx.model.Feedbacks.count({
      where: {
        createdAt: {
          [Op.gt]: todayEarlyMorning,
        },
      },
    });
  }

  /**
   * 最高组合平均数, 最低组合平均数
   */
  async topAndBottomEvaluation() {
    let lowEvaluation = {
        lowEvaluationMark: '0.00',
        lowSunSignName: '--',
        lowMoonSignName: '--',
      },
      topEvaluation = {
        topEvaluationMark: '0.00',
        topSunSignName: '--',
        topMoonSignName: '--',
      };

    const { count, rows } = await this.ctx.model.Feedbacks.findAndCountAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('mark')), 'groupMark']],
      include: [
        {
          model: this.app.model.Descriptions,
          include: [
            {
              model: this.app.model.Signs,
              attributes: ['name'],
              as: 'moonSignI',
            },
            {
              model: this.app.model.Signs,
              attributes: ['name'],
              as: 'sunSignI',
            },
          ],
        },
      ],
      group: 'descriptionId',
      order: Sequelize.fn('AVG', Sequelize.col('mark')),
      distinct: true,
    });

    if (count.length !== 0) {
      // 获取最低评价数
      const lowSign = rows[0];
      console.log(lowSign);
      const lowSignGroup = lowSign.dataValues.groupMark.toFixed(2);
      const lowSunSignName = lowSign.Description.sunSignI.name;
      const lowMoonSignName = lowSign.Description.moonSignI.name;
      lowEvaluation = {
        lowEvaluationMark: lowSignGroup,
        lowSunSignName,
        lowMoonSignName,
      };

      // 获取最高评价数
      const topSign = rows[count.length - 1];
      const topSignGroup = topSign.dataValues.groupMark.toFixed(2);
      const topSunSignName = topSign.Description.sunSignI.name;
      const topMoonSignName = topSign.Description.moonSignI.name;
      topEvaluation = {
        topEvaluationMark: topSignGroup,
        topSunSignName,
        topMoonSignName,
      };
    }

    return { topEvaluation, lowEvaluation };
  }

  /**
   *  总评价分数，以及平均分数
   */
  async totalEvaluation() {
    const resultsData = await this.ctx.model.Feedbacks.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('mark')), 'sumMark'],
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'avgMark'],
      ],
      raw: true,
    });

    const sumEvaluation = resultsData.sumMark;
    const avgEvaluation = resultsData.avgMark
      ? resultsData.avgMark.toFixed(2)
      : '';

    return { sumEvaluation, avgEvaluation };
  }

  /**
   * @description 获取统计数据
   * @return { todayIncrease, lowEvaluation, topEvaluation, sumEvaluation, avgEvaluation } 今天增加数, 最低平均数, 最高平均数, 总数, 总平均数
   */
  async feedbackStatistic() {
    const [
      todayIncrease,
      topAndBottomEvaluation,
      totalEvaluation,
    ] = await Promise.all([
      this.todayIncrease(),
      this.topAndBottomEvaluation(),
      this.totalEvaluation(),
    ]);

    return {
      todayIncrease,
      lowEvaluation: topAndBottomEvaluation.lowEvaluation,
      topEvaluation: topAndBottomEvaluation.topEvaluation,
      sumEvaluation: totalEvaluation.sumEvaluation,
      avgEvaluation: totalEvaluation.avgEvaluation,
    };
  }

  /**
   * @description: 获取星座图表顺序
   * @param {*}
   * @return {*}
   */
  async feedbackChart() {
    let chartData = {
      sunSignList: ['sunSign'],
      moonSignList: [], // [{moonSignName, groupMark}]
    };
  }
}

module.exports = FeedbackService;
