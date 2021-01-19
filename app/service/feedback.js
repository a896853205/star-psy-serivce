/**
 * feedback数据库操作
 */
const Service = require('egg').Service;
const Sequelize = require('sequelize');
class FeedbackService extends Service {
  /**
   * 获取统计数据
   */
  async findstatisticData() {
    const Op = Sequelize.Op;
    // 获取今日增加数
    let day = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000);
    const todayIncrease = await this.ctx.model.Feedbacks.count({
      where: {
        createdAt: {
          [Op.gt]: day,
        },
      },
    });
    // 获取最低评价组合，以及最高评价组合
    let lowEvaluation = {
      lowEvaluationMark: 0.0,
      lowSunSignName: '',
      lowMoonSignName: '',
    };
    let topEvaluation = {
      topEvaluationMark: 0.0,
      topSunSignName: '',
      topMoonSignName: '',
    };
    const results = await this.ctx.model.Feedbacks.findAll({
      attributes: [
        'descriptionId',
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'group_mark'],
      ],
      include: [
        {
          model: this.app.model.Descriptions,
          arrtibutes: ['sunSign', 'moonSign'],
        },
      ],
      group: 'descriptionId',
      order: Sequelize.fn('AVG', Sequelize.col('mark')),
    });
    if (results !== []) {
      const { sunSign, moonSign } = results[0].dataValues.description;
      const lowSignGroup = results[0].dataValues.group_mark.toFixed(2);
      const { dataValues: lowSunSign } = await this.ctx.model.Signs.findOne({
        where: { id: sunSign },
        attributes: ['name'],
      });
      const { dataValues: lowMoonSign } = await this.ctx.model.Signs.findOne({
        where: { id: moonSign },
        attributes: ['name'],
      });
      lowEvaluation = {
        lowEvaluationMark: lowSignGroup,
        lowSunSignName: lowSunSign.name,
        lowMoonSignName: lowMoonSign.name,
      };
      // 获取最高评价数
      const { sunSign: topSunSignId, moonSign: topMoonSignId } = results[
        results.length - 1
      ].dataValues.description;
      const topSignGroup = results[
        results.length - 1
      ].dataValues.group_mark.toFixed(2);
      const { dataValues: topSunSign } = await this.ctx.model.Signs.findOne({
        where: { id: topSunSignId },
        attributes: ['name'],
      });
      const { dataValues: topMoonSign } = await this.ctx.model.Signs.findOne({
        where: { id: topMoonSignId },
        arrtibutes: ['name'],
      });
      topEvaluation = {
        topEvaluationMark: topSignGroup,
        topSunSignName: topSunSign.name,
        topMoonSignName: topMoonSign.name,
      };
    }

    // 总评价分数，以及平均分数
    const resultsData = await this.ctx.model.Feedbacks.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('mark')), 'sum_mark'],
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'avg_mark'],
      ],
    });
    const sumEvaluation = resultsData.dataValues.sum_mark;
    const avgEvaluation = resultsData.dataValues.avg_mark.toFixed(2);
    return {
      todayIncrease,
      lowEvaluation,
      topEvaluation,
      sumEvaluation,
      avgEvaluation,
    };
  }
}

module.exports = FeedbackService;
