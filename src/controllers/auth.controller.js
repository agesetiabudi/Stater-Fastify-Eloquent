const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Validator = require('validatorjs');

class AuthController {

    async login(request, reply){
        let data = request.body

        let rules = {
            email: 'required|email',
            password: 'required'
        }

        let validation = new Validator(data, rules);

        if(validation.fails()){
            return { status: false, message: 'Failed', data: validation.errors.all()}
        } else {
            let user = JSON.parse(JSON.stringify(await User.where('email', request.body.email).first()))

            if(user){
                const passwordSame = await bcrypt.compare(request.body.password, user.password);

                if(passwordSame){
                    let response    = {
                        "name"  : user.name,
                        "email" : user.email,
                        "token" : jwt.sign({ id: user.id }, 'xNUCbCb8Jt9b4EEJCfE78znELpQjUimKmYC3dIARH2JFBBHHnxSBqvmzDs8Z1jiL', {
                            expiresIn: 86400 // 24 hours
                        })
                    }
                    return { status: true, message: 'successfully', data: response}
                } else {
                    return { status: false, message: 'Failed', data: [{email: 'failed email or password'}]}
                }
            } else {
                return { status: false, message: 'Failed', data: [{email: 'failed email or password'}]}
            }
        }
    }

}

module.exports = new AuthController()