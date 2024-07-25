"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // const schedule = require("node-schedule");
    // const timeChecker = "*/10 * * * * *";
    // // const timeChecker = "* * * * * *";
    // schedule.scheduleJob("cron-jon", timeChecker, async () => {
    //   const dataToken = ""
    //   const message = {
    //     notification: {
    //       title: "Billing",
    //       body: `Saatnya minum obat`,
    //     },
    //     data: {
    //       type: "billing received",
    //     },
    //     android: {
    //       notification: {
    //         sound: "default",
    //       },
    //     },
    //     token: dataToken,
    //   };
    //   await admin.messaging().send(message);
    //   console.log("scheduler active !");
    //   // const find = await strapi.db
    //   //   .query("api::customer-service.customer-service")
    //   //   .findMany();
    //   // console.log(find);
    //   console.log("==========================");
    // });
  },
};
