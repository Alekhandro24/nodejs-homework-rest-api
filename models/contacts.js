const fs = require("fs/promises");

const filePath = require("./filePath");
const { nanoid } = require("nanoid");
const updateContacts = require("./updateContacts");

const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => String(item.id) === String(id));

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === String(id));
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === String(id));

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
