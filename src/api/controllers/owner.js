const Owner = require('../models/owner');
const { deleteFile } = require('../../utils/deleteFile');

//! GET all
const getOwners = async (req, res, next) => {
  try {
    const owners = await Owner.find();
    return res.status(200).json(owners);
  } catch (error) {
    console.error('Error in getOwners:', error);
    return res.status(500).json({ message: 'Failed to retrieve owners' });
  }
};

//! POST
const postOwner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required (form-data)' });
    }
    const newOwner = new Owner({ ...req.body, avatar: req.file.path });
    //if (req.file) {
      //newOwner.avatar = req.file.path;}
    
    const ownerSaved = await newOwner.save();
    return res.status(201).json(ownerSaved);
  } catch (error) {
    console.error('Error in postOwner:', error);
    return res.status(400).json({
      message: 'Failed to create owner. Please verify the provided data.',
    });
  }
};

//! UPDATE
const updateOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldOwner = await Owner.findById(id);

    if (!oldOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const operacionesMongo = {};
    const datosActualizados = { ...req.body };

    if (req.file) {
      deleteFile(oldOwner.avatar);
      datosActualizados.avatar = req.file.path;
    }

    if (Object.keys(datosActualizados).length > 0) {
      operacionesMongo.$set = datosActualizados;
    }

    const updatedOwner = await Owner.findByIdAndUpdate(id, operacionesMongo, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedOwner);
  } catch (error) {
    console.error('Error in updateOwner:', error);
    return res.status(400).json({
      message: 'Failed to update owner. Please verify the provided data.',
    });
  }
};

//! DELETE
const deleteOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ownerDeleted = await Owner.findByIdAndDelete(id);
    //deleteFile(ownerDeleted.avatar);
    if (!ownerDeleted) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    if (ownerDeleted.avatar) deleteFile(ownerDeleted.avatar);
    return res.status(200).json({
      message: 'Owner deleted',
      ownerDeleted,
    });
  } catch (error) {
    console.error('Error in deleteOwner:', error);
    return res.status(500).json({ message: 'Failed to delete owner' });
  }
};

module.exports = {
  getOwners,
  postOwner,
  updateOwner,
  deleteOwner,
};
