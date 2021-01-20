/**
 * feedback数据库操作
 */
const Service = require('egg').Service;
const Sequelize = require('sequelize');
class FeedbackService extends Service {
  // 获取今日增加数
  async getTodayIncrease() {
    const Op = Sequelize.Op;
    const todayEarlyMorning = new Date().setHours(0, 0, 0, 0);
    const todayIncrease = await this.ctx.model.Feedbacks.count({
      where: {
        createdAt: {
          [Op.gt]: todayEarlyMorning,
        },
      },
    });
    console.log('今日增加的访问数', todayIncrease);
    return todayIncrease;
  }
  // 获取最低评价组合，以及最高评价组合
  async getEvaluation() {
    let lowEvaluation = {
      lowEvaluationMark: 0.00,
      lowSunSignName: '',
      lowMoonSignName: '',
    };
    let topEvaluation = {
      topEvaluationMark: 0.00,
      topSunSignName: '',
      topMoonSignName: '',
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
      const lowSign = rows[0].dataValues;
      const lowSignGroup = lowSign.groupMark.toFixed(2);
      const lowSunSign = lowSign.Description.sunSignI.dataValues;
      const lowMoonSign = lowSign.Description.moonSignI.dataValues;
      lowEvaluation = {
        lowEvaluationMark: lowSignGroup,
        lowSunSignName: lowSunSign.name,
        lowMoonSignName: lowMoonSign.name,
      };
      // 获取最高评价数
      const topSign = rows[count.length - 1].dataValues;
      const topSignGroup = topSign.groupMark.toFixed(2);
      const topSunSign = topSign.Description.sunSignI.dataValues;
      const topMoonSign = topSign.Description.moonSignI.dataValues;
      topEvaluation = {
        topEvaluationMark: topSignGroup,
        topSunSignName: topSunSign.name,
        topMoonSignName: topMoonSign.name,
      };
    }
    return { topEvaluation, lowEvaluation };
  }
  // 总评价分数，以及平均分数
  async getEvaluationNumber() {
    const resultsData = await this.ctx.model.Feedbacks.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('mark')), 'sumMark'],
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'avgMark'],
      ],
    });
    const sumEvaluation = resultsData.dataValues.sumMark;
    const avgEvaluation = resultsData.dataValues.avgMark.toFixed(2);
    return { sumEvaluation, avgEvaluation };
  }

  /**
   * @description: 获取统计数据
   * @return { todayIncrease, lowEvaluation, topEvaluation, sumEvaluation, avgEvaluation }
   */
  async findstatisticData() {
    const [todayIncrease, evaluation, evaluationNumber] = await Promise.all([
      this.getTodayIncrease(),
      this.getEvaluation(),
      this.getEvaluationNumber(),
    ]);
    const statisticData = {
      todayIncrease,
      lowEvaluation: evaluation.lowEvaluation,
      topEvaluation: evaluation.topEvaluation,
      sumEvaluation: evaluationNumber.sumEvaluation,
      avgEvaluation: evaluationNumber.avgEvaluation,
    };
    return statisticData;
  }
}

module.exports = FeedbackService;
