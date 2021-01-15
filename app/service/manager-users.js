/**
 * 管理员用户的数据库操作
 */
const Service = require("egg").Service;

class ManagerUsersService extends Service {
  async findManagerUsersByPassword(password) {
    const managerUsers = await this.ctx.model.ManagerUsers.findOne({
      where: { password: `${password}` },
    });
    return managerUsers;
  }
}

module.exports = ManagerUsersService;
