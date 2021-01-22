const Service = require('egg').Service;

class SignsService extends Service {
  async findIdByName(signName) {
    return await this.ctx.model.Signs.findOne({
      where: { name: signName },
      raw: true,
    });
  }
}

module.exports = SignsService;
