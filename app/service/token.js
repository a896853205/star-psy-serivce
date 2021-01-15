const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../../key.js');

class TokenService extends Service {
  /**
   * 用于在managerUser登录的时候对返回的数据用jwt进行加密返回token
   * @param {object} params 加密对象
   */
  async createToken(params) {
    return jwt.sign(params, tokenSecret);
  }
}

module.exports = TokenService;
