const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Proyecto8',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});
const upload = multer({ storage });
module.exports = upload;

//------------------------------------------------
//Si fuera necesario reutilizar el storaga cambiando de carpeta
//crearia 2 storage y loego un upload para cada uno

//const ownerStorage = new CloudinaryStorage({
/* 
cloudinary: cloudinary,
  params: {
    folder: 'Proyecto8/owners',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});

const petStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Proyecto8/pets',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  },
}); */

// const uploadOwner = multer({ storage: ownerStorage });
// const uploadPet = multer({ storage: petStorage })
// con este cambio tambien seria necesario modificar las las rutas de cada uno