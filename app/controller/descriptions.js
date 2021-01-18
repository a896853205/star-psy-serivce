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
}

module.exports = DescriptionsController;
