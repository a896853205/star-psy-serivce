module.exports = class Result {
  /**
   * 返回对象
   * @param {*} mainData 真实的data
   * @param {*} msg 想要展示的提示信息
   */
  constructor(mainData, msg) {
    this.mainData = mainData;
    this.msg = msg;
  }
};
