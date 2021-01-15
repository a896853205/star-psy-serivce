const Controller = require("egg").Controller;

class ManagerUsersController extends Controller {
  // 用户登录
  async login() {
    const { ctx } = this;
    // FIXME: 结构，修正报错
    const password = ctx.query.password;
    // 数据库查找
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
      ctx.body = {
        message: "登陆失败",
      };
    }
  }
}

module.exports = ManagerUsersController;
