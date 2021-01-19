const Controller = require('egg').Controller;

const Result = require('../util/result');

class ManagerUsersController extends Controller {
  /**
   * 用户授权获取token
   */
  async authortion() {
    const { ctx, app } = this;
    const { password } = ctx.query;
    const errors = app.validator.validate(
      {
        password: { type: 'password', require: true, allowEmpty: false },
      },
      ctx.query
    );
    if (errors) {
      ctx.status = 400;
      ctx.body = new Result(undefined, '请输入密码');
    } else {
      const managerUsers = await this.ctx.service.managerUsers.findManagerUsersByPassword(
        password
      );

      if (managerUsers) {
        const params = { id: managerUsers.id, nickname: managerUsers.name };
        // jwt生成token
        const jwtToken = await ctx.service.token.createToken(params);
        ctx.body = new Result({
          token: jwtToken,
        });
      } else {
        ctx.status = 400;
        ctx.body = new Result(undefined, '密码错误');
      }
    }
  }
}

module.exports = ManagerUsersController;
