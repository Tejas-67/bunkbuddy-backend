const zod = require('zod');
const User = require("../../models/user");

const inputSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3).max(50),
    username: zod.string().min(3).max(50),
    image: zod.string().min(3).max(50)
});

const update = async (req, res)=> {
    try{
        const userData = {
            email: req.query.email,
            password: req.query.password,
            username: req.query.username,
            image: req.query.image
        };

        const validator = inputSchema.safeParse(userData);

        if(!validator.success){
            return res.status(400).json({message: validator.error.message });
        }
        const query = {email: userData.email, password: userData.password };
        
        const user = await User.findOne(query);
        if(!user){
            return res.status(302).json({message: "User doesn't exist"});
        }
        user.name = userData.username;
        user.image = userData.image;
        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch(error){
        console.log("error while updating user details: ", error.message);
        const dispatchedError = {message: error.message, code: error.code};
        return resp.status(400).json(dispatchedError);
    }
};

module.exports = update;