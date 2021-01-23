/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, passport } = app;

  const jwt = passport.authenticate('jwt', {
    session: false,
    successReturnToOrRedirect: null,
  });

  router.get('/', controller.home.index);
  router.get('/authortion', controller.managerUsers.authortion);

  router.get('/description', jwt, controller.descriptions.descriptions);
  router.get('/statistic', jwt, controller.feedback.statistic);

  // 小程序路由
  router.post('/user', controller.users.saveUser);
  router.post('/feedback', controller.feedback.saveFeedback);
};
