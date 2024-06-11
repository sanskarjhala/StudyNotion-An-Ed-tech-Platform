const mailSender = require("../utils/mailSender");

exports.contactUsMail = async (req, res) => {
  try {
    //fetch email from the mail body
    const { firstname, lastname, email, message, phoneNo, countryCode } =
      req.body;

    console.log(firstname, lastname, email, message, phoneNo, countryCode);

    if (!firstname || !email || !message || !phoneNo || !countryCode) {
      return res.status(403).json({
        success: false,
        message: "required fields are empty",
      });
    }

    const mailresponseClient = await mailSender(
      email,
      " Thanku ",
      "Thanks for contacting with StudyNotion we will soon reach You"
    );

    const payload = {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Contact_No: phoneNo,
      Message: message,
      countryCode: countryCode,
    };

    console.log(" CLIENT MAIL RESPONSE ", mailresponseClient);
    const mailResponseAdmin = await mailSender(
      process.env.MAIL_USER,
      "CONTACT",
      `${email} ${firstname} ${lastname} ${phoneNo} ${countryCode} ${message}`
    );

    console.log(" ADMIN MAIL RESPONSE ", mailResponseAdmin);

    return res.status(200).json({
      success: true,
      message: "Mail send Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: "Unable to send the mail",
      error: error.message,
    });
  }
};
