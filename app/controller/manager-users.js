const Controller = require('egg').Controller;

class ManagerUsersController extends Controller {
  /**
   * 用户授权获取token
   */
  async authortion() {
    const { ctx } = this;
    const { password } = ctx.query;
    if (!password) {
      ctx.status = 400;
      return;
    }
    const managerUsers = await this.ctx.service.managerUsers.findManagerUsersByPassword(
      password
    );
    if (managerUsers) {
      const params = { id: managerUsers.id, nickname: managerUsers.name };
      // jwt生成token
      const jwtToken = await ctx.service.token.createToken(params);
      ctx.body = {
        token: jwtToken,
      };
    } else {
      console.log('查找失败');
    }
  }
}

module.exports = ManagerUsersController;
