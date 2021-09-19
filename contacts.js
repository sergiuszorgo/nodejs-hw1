const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.log("listContacts Error:", error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const conatctFindById = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    console.log(conatctFindById);
  } catch (error) {
    console.log("getContactById Error:", error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => String(contact.id) !== String(contactId)
    );
    const newContactsList = JSON.stringify(filteredContacts, null, "\t");
    fs.writeFile(contactsPath, newContactsList, "utf-8", (error) => {
      if (error) console.log(error);
    });
    console.log(`contact: ${contactId} - was deleted from Contacts`);
    listContacts();
  } catch (error) {
    console.log("removeContact Error:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContactsList = JSON.stringify(
      [newContact, ...contacts],
      null,
      "\t"
    );
    fs.writeFile(contactsPath, newContactsList, "utf-8", (error) => {
      if (error) console.log(error);
    });
    console.log(`Contact ${name} - added`);
    listContacts();
  } catch (error) {
    console.log("addContact Error:", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
