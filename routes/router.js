import express, { Router } from "express";
import aws from "aws-sdk";
import 'dotenv/config';



const router = express.Router();

const ses = new aws.SES({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

router.post("/email", async (req, res) => {
  const { email, message, name } = req.body;
  await sesTest(process.env.FROM_EMAIL, email, message, name)
    .then((val) => {
      console.log("msg sent", val);
      res.status(200).send("done");
    })
    .catch((e) => {
      console.error(e)
    });
});

async function sesTest(emailTo, emailFrom, message, name) {
  const params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: {
          Data: "Test notification: " + name + "\n" + message,
        },
      },
      Subject: {
        Data: "Name:" + emailFrom,
      },
    },
    Source: process.env.FROM_EMAIL,
  };
  return ses.sendEmail(params).promise();
}
export default router;
