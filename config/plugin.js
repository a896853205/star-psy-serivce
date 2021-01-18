/** @type Egg.EggPlugin */
module.exports = {
  // 配置跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // had enabled by egg
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
