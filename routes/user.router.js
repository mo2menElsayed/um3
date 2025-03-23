const express = require('express');
const { signupValidation, signinValidation } = require('../helpers/validations');
const userController = require('../controllers/user.controller');
const imageUploader = require('../helpers/image_uploader')
const { isAuthorize } = require('../middlewares/auth')

// validation 

// Router
const router = express.Router();

// POST || signup a user
router.post('/signup', imageUploader.upload.single('image'), signupValidation, userController.signup)
// POST || signin a user
router.post('/signin', signinValidation, userController.signin)
//  GET || get a user
router.group("/get-user", (router) => {
    router.use(isAuthorize);
    router.get('/', userController.show)
})

module.exports = router