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
      raw: true,
    });

    if (count.length !== 0) {
      // 获取最低评价数
      const lowSign = rows[0];
      const lowSignGroup = lowSign.groupMark.toFixed(2);
      const lowSunSignName = lowSign.description.sunSignI.name;
      const lowMoonSignName = lowSign.description.moonSignI.name;
      lowEvaluation = {
        lowEvaluationMark: lowSignGroup,
        lowSunSignName,
        lowMoonSignName,
      };

      // 获取最高评价数
      const topSign = rows[count.length - 1];
      const topSignGroup = topSign.groupMark.toFixed(2);
      const topSunSignName = topSign.description.sunSignI.name;
      const topMoonSignName = topSign.description.moonSignI.name;
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
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'sumMark'],
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
   * 保存feedback
   * @param {object} { userId, descriptionId, mark } 用户id, 描述id, 分数
   */
  async saveFeedback({ userId, descriptionId, mark }) {
    const hasFeedback = await this.ctx.model.Feedbacks.count({
      where: {
        userId,
        descriptionId,
      },
    });

    if (hasFeedback) {
      await this.ctx.model.Feedbacks.update(
        {
          mark,
        },
        {
          where: {
            userId,
            descriptionId,
          },
        }
      );
    } else {
      await this.ctx.model.Feedbacks.create({
        userId,
        descriptionId,
        mark,
      });
    }

    return true;
  }

  /**
   * @description: 获取星座图表数据
   * @return {Array} chartData 图表数据
   */
  async feedbackChart() {
    const chartData = [];
    const signName = [
      '白羊',
      '狮子',
      '射手',
      '金牛',
      '处女',
      '摩羯',
      '双子',
      '天秤',
      '水瓶',
      '巨蟹',
      '天蝎',
      '双鱼',
    ];

    // 初始化chartData
    signName.forEach((signItem, index) => {
      chartData[index] = {
        sunSign: signItem,
        白羊: '0.00',
        狮子: '0.00',
        射手: '0.00',
        金牛: '0.00',
        处女: '0.00',
        摩羯: '0.00',
        双子: '0.00',
        天秤: '0.00',
        水瓶: '0.00',
        巨蟹: '0.00',
        天蝎: '0.00',
        双鱼: '0.00',
      };
    });

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
      distinct: true,
      raw: true,
    });

    if (count.length > 0) {
      rows.forEach(item => {
        const sunSignName = item.description.sunSignI.name;
        const chartItem = chartData.find(
          chartItem => chartItem.sunSign === sunSignName
        );
        chartItem[item.description.moonSignI.name] = item.groupMark.toFixed(2);
      });
    }

    return chartData;
  }
}

module.exports = FeedbackService;
