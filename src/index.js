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
    // // const admin = require("firebase-admin");
    // const schedule = require("node-schedule");
    // const timeChecker = "*/10 * * * * *"; // Every 10 seconds, starting at seconds past the minute
    // schedule.scheduleJob("cron-jon", timeChecker, async () => {
    //   const findAllUser = await strapi.db
    //     .query("plugin::users-permissions.user")
    //     .findMany({});
    //   for (const item of findAllUser) {
    //     console.log(item.username, "username");
    //     // const message = {
    //     //   notification: {
    //     //     title: "Saatnya Minum Obat",
    //     //     body: `Sudah Jam-nya minum obat yuk.. lapor...`,
    //     //   },
    //     //   data: {
    //     //     type: "waktunya minum obat",
    //     //   },
    //     //   android: {
    //     //     notification: {
    //     //       sound: "default",
    //     //     },
    //     //   },
    //     //   token: dataToken,
    //     // };
    //     // await admin.messaging().send(message);
    //   }
    // });
  },
};
