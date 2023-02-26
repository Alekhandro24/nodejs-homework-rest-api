const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: 200,
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
