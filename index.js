const yargs = require("yargs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = yargs.argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact || "Contact not found");
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("New contact added:", newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact ? "Contact removed:" : "Contact not found");
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
