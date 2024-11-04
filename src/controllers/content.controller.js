const User = require('../models/user');
const bcrypt = require('bcrypt');
const Validator = require('validatorjs');

class ContentController {

    async getData(request, reply){
        let user = await User.get();
        return { status: true, message: 'Successfully', data: user}
    }

    async store(request, reply){

        let data = request.body;
        
        let rules = {
            name: 'required',
            email: 'required|email',
            password: 'min:8'
        };
        
        let validation = new Validator(data, rules);

        if(validation.fails()){
            return { status: false, message: 'Failed', data: validation.errors.all()}
        } else {
            let create = new User({
                name: request.body.name,
                email: request.body.email,
                password: await bcrypt.hash(request.body.password, 10),
            });
            
            try {
                await create.save()
    
                return { status: true, message: 'Successfully'}
            } catch (error) {
                return { status: false, message: 'Failed', data: error}
            }
        }
    }

    async update(request, reply){
        const { id } = request.params;

        try {

            new User({id : id}).save({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            }, {
                method: 'update',
                patch: true
            })

            return { status: true, message: 'Successfully', data: id}
        } catch (error) {
            return { status: false, message: 'Failed', data:error}
        }
        
    }

    async show(request, reply){

        const { id } = request.params;
        let user = await User.where('id', id).first();

        return { status: true, message: 'Successfully', data: user}
    }

    async destroy(request, reply) {
        const { id } = request.params;

        await User.where('id', id).destroy();

        return { status: true, message: 'Successfully'}
    }

}

module.exports = new ContentController()