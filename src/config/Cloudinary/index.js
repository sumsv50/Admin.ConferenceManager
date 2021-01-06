const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
  });

  module.exports.uploadToCloudinary = (image, folder) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, { folder }, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    });
  }

  module.exports.delete_resources = (public_ids, option) => {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_resources(public_ids, option, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    });
  }

  module.exports.url = (name, object) => {
     return cloudinary.url(name, object);
  }