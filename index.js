const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

app.use(
  cors({
    orgin: "https://flourishing-crumble-8d472d.netlify.app",
  })
);

app.use(express.json());

app.post("/mail", async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var mailOptions = {
      from: EMAIL,
      to: req.body.email,
      subject: "Response from client",
      text: `Hi Raj..client sent one email,
      Name:${req.body.name}
      Email:${req.body.email}
      Message: ${req.body.message}`,
      html: ``,
    };
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        return;
      }
      transporter.close();
    });

    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res.status(400).send({ sucess: false, msg: error.message });
  }
});

app.listen(process.env.PORT || 3003);
