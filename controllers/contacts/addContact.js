const { Contact } = require("../../models");

const addContact = async (req, res) => {
  let { name, email, phone, favorite } = req.body;
  if (!favorite) {
    favorite = false;
  }
  const result = await Contact.create({ name, email, phone, favorite });

  res.status(201).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = addContact;
