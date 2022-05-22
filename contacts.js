const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateList = (newList) => {
  fs.writeFile(contactsPath, JSON.stringify(newList));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  //    console.log(contactsList);
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === `${contactId}`);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  updateList(contacts);
  console.table(await listContacts());
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  updateList(contacts);
  return newContact;
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
