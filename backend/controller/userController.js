import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desce  Auth user and get token
//@route  Post /api/users/auth
//@access Public
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user&&(await user.matchPassword(password))){
        generateToken(res,user._id)
        
        res.status(200).json({
            _id:user._id,
            email:user.email,
            name:user.name,
            isAdmin:user.isAdmin
        })

    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
    console.log(email)
})

//@desce  Register user
//@route  Post /api/users
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email});

    if(userExists){
        res.send(400);
        throw new Error('Already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})



//@desce  Logout user / clear cookie
//@route  get /api/users/logout
//@access Private
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json({message:'Logged out successfully'})
});


//@desce  Get user profile
//@route  get /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
       res.json(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }
       )
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


//@desce  upadate user profile
//@route  put /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name||user.name
        user.email = req.body.email|| user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updateUser = await user.save()
        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
        })
        
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



//@desce  get all  user
//@route  get /api/users
//@access Private/Admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get all users');
})


//@desce  delete user profile
//@route  delete /api/users/:id
//@access Private/Admin
const deleteUsers = asyncHandler(async(req,res)=>{
    res.send('delete a user');
})

//@desce  get user profile by id
//@route  get /api/users/:id
//@access Private/Admin
const getUsersById = asyncHandler(async(req,res)=>{
    res.send(' get users by id');
})

//@desce  update user profile
//@route  put /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('update user');
})

export {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    getUserProfile,
    getUsersById,
    deleteUsers,
    getUsers,
    updateUserProfile
}



