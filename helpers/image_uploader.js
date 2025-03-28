const multer = require('multer'); // upload files 
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (res, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {     
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

module.exports = { upload }