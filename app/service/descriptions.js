const Service = require('egg').Service;

class DescriptionsService extends Service {
  async findDescriptionBySunSignAndMoonSign(sunSign, moonSign) {
    return await this.ctx.model.descriptions.findOne({
      where: { sunSign, moonSign },
    });
  }

  async descriptionUpdate(sunSignId, moonSignId, description) {
    const updateResult = await this.ctx.model.descriptions.update(
      { description },
      {
        where: {
          sunSign: sunSignId,
          moonSign: moonSignId,
        },
      }
    );
    return updateResult;
  }
}

module.exports = DescriptionsService;
