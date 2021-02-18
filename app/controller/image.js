const Controller = require('egg').Controller;
const fs = require('fs');

class ImageController extends Controller {
  async getFile() {
    const { ctx } = this;
    const { name } = ctx.query;
    ctx.set('content-type', 'image/jpeg');

    switch (name) {
      case 'title.png':
        ctx.body = fs.createReadStream('app/static/auth/title.png');
        return;
      case 'subTitle.png':
        ctx.body = fs.createReadStream('app/static/form/subTitle.png');
        return;
      case 'download.png':
        ctx.body = fs.createReadStream('app/static/feedback/download.png');
        return;
      case 'background.png':
        ctx.body = fs.createReadStream('app/static/des/background.png');
        return;
      case 'qrcode-background.png':
        ctx.body = fs.createReadStream('app/static/background/qrcode-background.png');
        return;
      default:
        return;
    }
  }
}

module.exports = ImageController;
