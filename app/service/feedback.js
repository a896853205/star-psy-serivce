/**
 * feedback数据库操作
 */
const Service = require('egg').Service;
const Sequelize = require('sequelize');
class FeedbackService extends Service {
<<<<<<< HEAD
  // 获取今日增加数
  async getTodayIncrease() {
    const Op = Sequelize.Op;
    const todayEarlyMorning = new Date().setHours(0, 0, 0, 0);
    console.log('今日凌晨时间为：', todayEarlyMorning);
=======
  /**
   * 获取统计数据
   * @returns
   */
  // FIXME: 这里最好给出@returns例子, 因为返回值实在太复杂, 然后可以拆分成函数, 三个函数呗, function1, function23, function4.
  async findstatisticData() {
    // FIXME: 使用Promise.all优化(可以优化的地方优化), 返回数据比较复杂, 可以在开头定义变量, 然后在后面慢慢填充.
    const Op = Sequelize.Op;
    // 获取今日增加数
    const todayEarlyMorning = new Date().setHours(0, 0, 0, 0);
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
    const todayIncrease = await this.ctx.model.Feedbacks.count({
      where: {
        createdAt: {
          [Op.gt]: todayEarlyMorning,
        },
      },
    });
<<<<<<< HEAD
    console.log('今日增加的访问数', todayIncrease);
    return todayIncrease;
  }

  // 获取最低评价组合，以及最高评价组合
  async getEvaluation() {
=======

    // 获取最低评价组合，以及最高评价组合
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
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
    // FIXME: 这里永远等true ,因为是引用类型比较, 可以使用findAllAndCount, 然后使用这个count数进行判断.
    const { count, rows } = await this.ctx.model.Feedbacks.findAndCountAll({
      attributes: [
<<<<<<< HEAD
        /* 'descriptionId', */
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'groupMark'],
=======
        'descriptionId',
        // FIXME: 驼峰
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'group_mark'],
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
      ],
      include: [
        {
          model: this.app.model.Descriptions,
<<<<<<< HEAD
          // arrtibutes: ['sunSignI', 'moonSignI'],
          include: { model: this.app.model.Signs, attributes: ['name'] },
=======
          arrtibutes: ['sunSign', 'moonSign'],
          // FIXME: 还可以继续include省着后面再Signs.findOne
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
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

<<<<<<< HEAD
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
=======
    // FIXME: 这里永远等true ,因为是引用类型比较, 可以使用findAllAndCount, 然后使用这个count数进行判断.
    if (results !== []) {
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
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
<<<<<<< HEAD
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
   * @param {null}
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
=======
        // FIXME: 驼峰
        [Sequelize.fn('SUM', Sequelize.col('mark')), 'sum_mark'],
        [Sequelize.fn('AVG', Sequelize.col('mark')), 'avg_mark'],
      ],
    });
    const sumEvaluation = resultsData.dataValues.sum_mark;
    const avgEvaluation = resultsData.dataValues.avg_mark.toFixed(2);

    return {
>>>>>>> b2edf71bd86a5a80b8a7098aeb91ca26e1eae97d
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
