const express = require("express");
const dotenv = require("dotenv");
const mg = require("mailgun-js");

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/email", (req, res) => {
  const { currentRMS } = req.body;

  mailgun()
    .messages()
    .send(
      {
        from: "VibeCheck365 <shahrilzainol56@gmail.com>",
        to: "17205720@siswa.um.edu.my",
        subject: "VibeCheck365: Bearing Vibration Threshold Exceeded",
        html: `<p>VibeCheck365 has detected an abnormal level of vibration at your bearing. Current RMS: ${currentRMS}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: "Error in sending email" });
        } else {
          console.log(body);
          res.send({ message: "Email sent successfully" });
        }
      }
    );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
