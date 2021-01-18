/**
 * 管理员用户的数据库操作
 */
const Service = require('egg').Service;

class ManagerUsersService extends Service {
  async findManagerUsersByPassword(password) {
    return await this.ctx.model.ManagerUsers.findOne({
      where: { password },
    });
  }

  async findManagerUsersById(id) {
    return await this.ctx.model.ManagerUsers.findByPk(id);
  }
}

module.exports = ManagerUsersService;
