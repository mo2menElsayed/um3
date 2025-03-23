const models = require('../models');
const { validationResult } = require('express-validator'); // validation
const bcryptjs = require('bcryptjs'); // hash password 
const jwt = require('jsonwebtoken'); // generate token
const randomstring = require('randomstring');// generate random string 
const sendMail = require('./sendMail.controller'); // send mail
// signup fn
const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            success: false,
            message: 'Failed to signup',
            errors: errors.array()
        })

    const { name, email, password } = req.body;
    models.user.findOne({ where: { email } }).then(result => {
        if (result)
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            })
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {

                const user = { name, email, password: hash, image: req.file.filename };
                models.user.create(user).then(result => {

                    let mailSubject = "Mail Verification"
                    let randomToken = randomstring.generate();
                    let content = `<p>Hi ${name}<p>, \
                    Please <a href='http://localhost:8000/mail-verification?toekn=${randomToken}'> verify </a> your Mail`;

                    // const sendEmail = sendMail(email, mailSubject, content);
                    // console.log(sendEmail);

                    const userToken = { token: randomToken }

                    models.user.update(userToken, { where: { email } }).then(result => {
                        res.status(201).json({
                            success: true,
                            message: "User created successfully",
                            user: result
                        })
                    }).catch(error => {
                        res.status(500).json({
                            success: false,
                            message: "Something went wrong in updating a user token!",
                            error
                        })
                    })


                }).catch(error => {
                    res.status(500).json({
                        success: false,
                        message: "Something went wrong in create a user!",
                        error
                    })
                })
            });
        })

    }).catch(error => {
        res.status(500).json({
            success: false,
            message: "Something went wrong in signing up a user!",
            error
        })
    })
}

// signin fn
const signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            success: false,
            message: 'Failed to signup',
            errors: errors.array()
        })

    const { email, password } = req.body;
    models.user.findOne({ where: { email } }).then(user => {
        if (user === null)
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            })

        bcryptjs.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.JWT_KEY, (error, token) => {
                    res.status(200).json({
                        success: true,
                        message: "Authentication successful",
                        token
                    })
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid credentials!",
                })
            }
        })
    }).catch(error => {
        res.status(500).json({
            success: false,
            message: "Something went wrong in signing up a user!",
            error
        })
    })
}

// show fn
const show = (req, res) => {    
    models.user.findByPk(req.userData.id).then(user => {
        if (user === null)
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            })

        res.status(200).json({
            success: true,
            message: "Fetch user successfully",
            user
        })
    }).catch(error => {
        res.status(500).json({
            success: false,
            message: "Something went wrong in signing up a user!",
            error
        })
    })
}

module.exports = { signup, signin, show }