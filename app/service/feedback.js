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
    console.log('今日凌晨时间为：', todayEarlyMorning);
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
    const lowEvaluation = {
      lowEvaluationMark: 0.0,
      lowSunSignName: '',
      lowMoonSignName: '',
    };
    const topEvaluation = {
      topEvaluationMark: 0.0,
      topSunSignName: '',
      topMoonSignName: '',
    };
    // FIXME: 这里永远等true ,因为是引用类型比较, 可以使用findAllAndCount, 然后使用这个count数进行判断.
    const { count, rows } = await this.ctx.model.Feedbacks.findAndCountAll({
      attributes: [
        /* 'descriptionId', */
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'groupMark'],
      ],
      include: [
        {
          model: this.app.model.Descriptions,
          // arrtibutes: ['sunSignI', 'moonSignI'],
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
        /* {
          model: this.app.model.Descriptions,
          arrtibutes: ['sunSign'],
          include: [
            { model: this.app.model.Signs, attributes: ['name'] },
          ],
        },
        {
          model: this.app.model.Descriptions,
          arrtibutes: ['moonSign'],
          include: [
            { model: this.app.model.Signs, attributes: ['name'] },
          ],
        }  */
      ],
      group: 'descriptionId',
      order: Sequelize.fn('AVG', Sequelize.col('mark')),
      distinct: true,
    });

    console.log('这是加了两个fix之后的两个联表查询结果count', count);
    // console.log('这是加了两个fix之后的两个联表查询结果rows', rows);
    console.dir(rows);
    // const sign1 = rows[0].dataValues.description;
    const lowSign = rows[0].description;
    console.log('获取的description:', lowSign);
    console.log('获取的sign:', lowSign.sign);

    /* console.log(
      '我试图从这一堆的rows中抽丝剥茧出mark，和星座名字',
      lowSign.groupMark,
      lowSign.description.dataValues.sign,
      lowSign.description._previousDataValues.sign,
    ); */

    /* if (count.length !== 0 ) {
      const { sunSign, moonSign } = results[0].dataValues.description;
      const lowSignGroup = results[0].dataValues.groupMark.toFixed(2);
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
      // 获取最高评价数
      const { sunSign: topSunSignId, moonSign: topMoonSignId } = results[
        results.length - 1
      ].dataValues.description;
      const topSignGroup = results[
        results.length - 1
      ].dataValues.groupMark.toFixed(2);
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
    } */
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
    console.log(
      'feedback的service层获取的统计数据为',
      todayIncrease,
      evaluation,
      evaluationNumber
    );
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
