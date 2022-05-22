const contactsOptions = require("./contacts.js");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOptions.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOptions.getContactById(id);
      if (contact === null) {
        throw new Error("error");
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOptions.addContact(name, email, phone);

      if (newContact === null) {
        throw new Error("error");
      }
      console.log(newContact);
      console.table(await contactsOptions.listContacts());
      break;

    case "remove":
      const removeContact = await contactsOptions.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);
