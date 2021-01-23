const Controller = require('egg').Controller;

const Result = require('../util/result');

class DescriptionsController extends Controller {
  async descriptions() {
    const { ctx } = this;

    ctx.validate(
      {
        sunSign: { require, type: 'int', min: 0, max: 11, convertType: 'int' },
        moonSign: { require, type: 'int', min: 0, max: 11, convertType: 'int' },
      },
      ctx.query
    );

    const { sunSign, moonSign } = ctx.query;

    const description = await this.ctx.service.descriptions.findDescriptionBySunSignAndMoonSign(
      sunSign,
      moonSign
    );

    if (!description) {
      ctx.status = 400;
      ctx.body = new Result(undefined, '参数错误');
      return;
    }

    ctx.body = new Result(description);
  }
  async update() {
    const { ctx } = this;

    ctx.validate(
      {
        description: { require, type: 'string', convertType: 'string' },
        sunSignId: {
          require,
          type: 'int',
          min: 0,
          max: 11,
          convertType: 'int',
        },
        moonSignId: {
          require,
          type: 'int',
          min: 0,
          max: 11,
          convertType: 'int',
        },
      },
      ctx.query
    );

    const { description, sunSignId, moonSignId } = ctx.query;
    const updateResult = await this.ctx.service.descriptions.descriptionUpdate(
      sunSignId,
      moonSignId,
      description
    );

    if (updateResult[0] < 1) {
      ctx.status = 400;
      ctx.body = new Result(undefined, '修改失败！');
      return;
    }

    ctx.body = new Result(updateResult);
  }
}

module.exports = DescriptionsController;
