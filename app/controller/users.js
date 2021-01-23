const Controller = require('egg').Controller;

const Result = require('../util/result');
const sunSignAndMoonSignByTime = require('../util/sunSignAndMoonSignByTime');

class UsersController extends Controller {
  async saveUser() {
    const { ctx } = this;

    ctx.validate(
      {
        name: { require, type: 'string' },
        year: {
          require,
          type: 'int',
          min: 1900,
          max: 9999,
          convertType: 'int',
        },
        month: { require, type: 'int', min: 0, max: 12, convertType: 'int' },
        day: { require, type: 'int', min: 0, max: 31, convertType: 'int' },
        hour: { require, type: 'int', min: 0, max: 24, convertType: 'int' },
        minute: { require, type: 'int', min: 0, max: 60, convertType: 'int' },
        timeZone: { require, type: 'string' },
      },
      ctx.request.body
    );

    const { name, year, month, day, hour, minute, timeZone } = ctx.request.body;

    const { sunSignName, moonSignName } = sunSignAndMoonSignByTime(
      year,
      month,
      day,
      hour,
      minute
    );

    const [sunSign, moonSign] = await Promise.all([
      this.ctx.service.signs.findIdByName(sunSignName),
      this.ctx.service.signs.findIdByName(moonSignName),
    ]);

    const [saveUserResult, description] = await Promise.all([
      this.ctx.service.users.saveUser({
        name,
        year,
        month,
        day,
        hour,
        minute,
        timeZone,
        sunSign: sunSign.id,
        moonSign: moonSign.id,
      }),
      this.ctx.service.descriptions.findDescriptionBySunSignAndMoonSign(
        sunSign.id,
        moonSign.id
      ),
    ]);

    if (!description || !saveUserResult) {
      ctx.status = 400;
      ctx.body = new Result(undefined, '参数错误');
      return;
    }

    ctx.body = new Result({ description, user: saveUserResult });
  }
}

module.exports = UsersController;
