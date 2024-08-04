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
    const admin = require("firebase-admin");
    const schedule = require("node-schedule");
    const moment = require("moment-timezone");

    var serviceAccount = {
      type: "service_account",
      project_id: "mobiarv",
      private_key_id: "c64ddd7d77e47cfce39195aa98939fe0e1670a54",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdY7SZe0aYHqFv\npAaqn9LeqLKyD+WtfeDKfKcRho0q+hdiBbX2qwGs6EsVXynaEIbfhw6Nd0NEvAKu\nwRTrXosBt79WhNQrUhgL5hICTdTRXFTtd368CaQ9AQ5WYn9tX9THfJ6uhmyBCIP6\nKPFrvirt/UuyUSQ1339iLGln89kAmpDXedUvOi+61xiDjx1HxLdaVfpDtow0bqge\nWcea55tlZv99Z+eDUs+9RLP2XLruOKb69J7ZB8OYm8zRtrSASfrAcsGPTar9tgnp\ngnVARbbHnjpCndoQaGXnUKibdXk0G3poAl9WjIAgLiv57Z9GScwkWOUnR+JkIpzE\nNn0hYfQlAgMBAAECggEAAYsiVBe8vngqbnMW2iyD3fiPFi1f/0cEMq7mbRD33ldE\nAlV6sBEYDLe1G1KTQGsjwf9gDFg4NOaYED8KcyMY4RoXV/15inU4MuNbsooIz4AS\nLNTZJSVO9HlA/ktN40wZy5mqWQjrBuly3KDlsF53gtaPsDEtJvhPsWrOc2dY0tnp\n4wfwERlX6vuDiN7QVvr9TjKoTq+pOrusL0pXf40SZKeBtSIX7gTPxWjhNrnz8qj6\n9OVRyiLdWK9PAObL+dPJVT77z3/QCf4ttWlWuA6kFzkRHN2Jg19fMn0x7rfquGRl\nbIxG0YTekWSS/qQBn+LjI3ePvVBdnQEvWXLjP7biwQKBgQDVdyeKfp2oOB0KW/h2\nNg343YwK8keWVAMKNfCla7ZYvsuMfSfHIagMsy+ShXvuEJ2Pa8EnKBG0EW4E1oH3\nl/qvEWczPOU9jwiZr0qfldA8c8soOdy2piaul5H579Rtvn4WHyv6UTMDHMm/kgGM\nJMUSQIOzHzqImej753BEKHwhxQKBgQC8wB9qXLKOPGuXXgISTs6/xoXfpaMGvga6\nx4IB6UgR/MxMLuFFfsYGccBl4zYgh352GnAQJcNAT+tVqmLVdYhz3ncL5vNZoCY8\nU7ZUt33F5Ldb2psQX7nqeg0GJSSjZchbYvu7ZmPHRH3FiDISe11jWKsiEJBBy8s9\nDXvTtSmO4QKBgAaAVof1Sz/wVZIXMv4Gr25A8R70OhHuBRmuguHG4grZ5MEmnquF\n7uRUIMLJpfieMO5JTdyvb7qYPU2QauzriAsE8Kuy0xiI3q4vlIo/udPdgvZ6rKoz\nbUIsA5olH8cn4hcyY9h/2JnjqpFXFQz7obTomho+fT3j0iC578VjpkQxAoGAIvm2\n2I60x4aKqVHSMHJJ/V9cD0UyIF22AYZWoOQJZsvhT3ygYbBMIYWSkU65CO4SkO/1\nNAjLVW95vDYGemd9EXt3s8zn6wOyEhuw/aHCvJjVIUAw26fhW4GiSDE5yM1jgwuk\neeVPN+2JIMFMBgC2HWKg038ePBL3ZijJeUFoogECgYBmrpsN4tt45b9VZhof5Ych\nK2b6WOSuFOTRT0h+oeiXhGrCvHZLlxCUZf76SNMEsw24cBaIQbMz1f7krXaBczXI\npZCGLjHJx0cUdoVvai6ByfwzP0hYGsDPfOV4fXcsXd5PfNJ1nDzMeJ3xgxq1N3tr\notwklSR4GlxGkC5wpd84zg==\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-tfpt7@mobiarv.iam.gserviceaccount.com",
      client_id: "109469257614539174966",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tfpt7%40mobiarv.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const scheduleNotification = async () => {
      const findAllUser = await strapi.db
        .query("plugin::users-permissions.user")
        .findMany({});

      const now = moment().utc().format("HH:mm:ss");

      for (const user of findAllUser) {
        const medicationTime = moment(user.medication_time, "HH:mm:ss.SSS")
          .set({
            second: 0,
            millisecond: 0,
          })
          .utc()
          .format("HH:mm:ss");

        if (now === medicationTime) {
          const message = {
            notification: {
              title: "Saatnya Minum Obat",
              body: "Sudah Jam-nya minum obat yuk.. lapor...",
            },
            data: {
              type: "waktunya minum obat",
            },
            android: {
              notification: {
                sound: "default",
              },
            },
            token: user.fcm_token,
          };

          try {
            await admin.messaging().send(message);
            console.log(`Notification sent to user ${user.id} at ${now}`);

            // Schedule the next notification 1 minutes later
            schedule.scheduleJob(
              moment().add(1, "minutes").toDate(),
              async () => {
                try {
                  await admin.messaging().send(message);
                  console.log(
                    `Next notification sent to user ${user.id} at ${moment()
                      .add(1, "minutes")
                      .format("HH:mm:ss")}`
                  );
                } catch (error) {
                  console.log(error, "error send next message");
                }
              }
            );
          } catch (error) {
            console.log(error, "error send message");
          }
        }
      }
    };

    // Schedule the check to run every 10 seconds
    schedule.scheduleJob("* * * * * *", async () => {
      await scheduleNotification();
    });
  },
};
