const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let filter;

  favorite ? (filter = { owner, favorite }) : (filter = { owner });

  const contacts = await Contact.find(filter, "-createAt -updateAt", {
    skip,
    limit: Number(limit),
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
