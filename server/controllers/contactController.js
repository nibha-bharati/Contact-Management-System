const Contact = require("../models/contact.js");
const Group = require('../models/group.js')

const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    console.log(req.body)
    res.send(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).populate('creator', 'email');
    const userGroups=req.user.groups
    
    //const permissons=userGroups.map(async(id)=>{await Group.findById(id)})
    // const permissions=[]
    // for(let i=0;i<userGroups.length;i++){
    //   const p= await Group.findById(i)
    //   permissions.push(p)
    // }
    
   // console.log(permissons)


   // console.log(contacts)
    res.send(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    res.send(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body);

    if (!contact) {
      res.status(404).json({ message: "Contact not found!" });
    }

    const updatedContact = await Contact.findById(id);
    res.send(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      res.status(404).json({ message: "Contact not found!" });
    }

    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
