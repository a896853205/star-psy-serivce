// const Result = require('../util/result');

// module.exports = () => {
//   /**
//    * manager-user 认证
//    * @param {*} ctx
//    * @param {*} next
//    */
//   return async (ctx, next) => {
//     await next();

//     const id = ctx.payload.id;

//     const { service } = ctx.app;

//     if (!id) {
//       ctx.status = 401;
//       ctx.body = new Result(undefined, '时间过长请重新的登录');
//       return;
//     }

//     const user = await service.managerUser.findManagerUsersById(id);

//     if (!user) {
//       ctx.status = 401;
//       ctx.body = new Result(undefined, '时间过长请重新的登录');
//       return;
//     }
//   };
// };
