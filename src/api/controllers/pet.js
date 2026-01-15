const Pet = require('../models/pet');
const { deleteFile } = require('../../utils/deleteFile');

//! GET all
const getPets = async (req, res, next) => {
  try {
    const pets = await Pet.find().populate('owner');
    return res.status(200).json(pets);
  } catch (error) {
    console.error('Error in getPets:', error);
    return res.status(500).json({ message: 'Failed to retrieve pets' });
  }
};

//! POST
const postPet = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'Image file is required (form-data)' });
    }
    const newPet = new Pet(req.body);
    if (req.file) {
      newPet.photo = req.file.path;
    }
    const petSaved = await newPet.save();
    const petPopulated = await Pet.findById(petSaved._id).populate('owner');
    return res.status(201).json(petPopulated);
  } catch (error) {
    console.error('Error in postPet:', error);
    return res.status(400).json({
      message: 'Failed to create pet. Please verify the provided data.',
    });
  }
};

//! UPDATE
const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPet = await Pet.findById(id);

    if (!oldPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const operacionesMongo = {};
    const datosActualizados = { ...req.body };

    if (req.file) {
      deleteFile(oldPet.photo);
      datosActualizados.photo = req.file.path;
    }

    if (Object.keys(datosActualizados).length > 0) {
      operacionesMongo.$set = datosActualizados;
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, operacionesMongo, {
      new: true,
      runValidators: true,
    }).populate('owner');

    return res.status(200).json(updatedPet);
  } catch (error) {
    console.error('Error in updatePet:', error);
    return res.status(400).json({
      message: 'Failed to update pet. Please verify the provided data.',
    });
  }
};

//! DELETE
const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const petDeleted = await Pet.findByIdAndDelete(id);
    //deleteFile(petDeleted.photo);
    if (!petDeleted) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (petDeleted.photo) deleteFile(petDeleted.photo);
    return res.status(200).json({
      message: 'Pet deleted',
      petDeleted,
    });
  } catch (error) {
    console.error('Error in deletePet:', error);
    return res.status(500).json({ message: 'Failed to delete pet' });
  }
};

module.exports = {
  getPets,
  postPet,
  updatePet,
  deletePet,
};
