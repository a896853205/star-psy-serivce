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
  router.put('/description', jwt, controller.descriptions.update);
  router.get('/statistic', jwt, controller.feedback.statistic);
  router.get('/chart', jwt, controller.feedback.chart);

  // 小程序路由
  router.post('/user', controller.users.saveUser);
  router.post('/feedback', controller.feedback.saveFeedback);

  router.get('/image', controller.image.getFile);
};
