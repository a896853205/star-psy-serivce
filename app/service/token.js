/**
 * service: 用于在user登录的时候对返回的数据用jwt进行加密返回token
 */
const Service = require("egg").Service;
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../../key.js");

// FIXME: 这里把Get删除更好一些，因为可能后面会有验证token的逻辑加到这里。
// FIXME: 文件命名不是驼峰
class TokenService extends Service {
  async createToken(params) {
    // FIXME: secret是密码，需要有具体的密码在最外层的key文件中，可以叫tokenSecret
    const jwtToken = jwt.sign(params, tokenSecret);
    return jwtToken;
  }
}

module.exports = TokenService;
