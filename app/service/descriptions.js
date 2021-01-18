const Service = require('egg').Service;

class DescriptionsService extends Service {
  async findDescriptionBySunSignAndMoonSign(sunSign, moonSign) {
    return await this.ctx.model.Descriptions.findOne({
      where: { sunSign, moonSign },
    });
  }
}

module.exports = DescriptionsService;
