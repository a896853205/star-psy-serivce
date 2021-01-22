const Service = require('egg').Service;

class UsersService extends Service {
  async saveUser({
    name,
    year,
    month,
    day,
    hour,
    minute,
    timeZone,
    sunSign,
    moonSign,
  }) {
    return await this.ctx.model.Users.create({
      name,
      year,
      month,
      day,
      hour,
      minute,
      timeZone,
      sunSign,
      moonSign,
    });
  }
}

module.exports = UsersService;
