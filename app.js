module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    if (user.payload.id) {
      const managerUser = await ctx.service.managerUsers.findManagerUsersById(
        user.payload.id
      );

      if (managerUser) return managerUser;
    }
  });
};
