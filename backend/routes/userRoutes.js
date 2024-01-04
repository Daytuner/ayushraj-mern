import express from 'express'
import {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    getUserProfile,
    getUsersById,
    deleteUsers,
    getUsers,
    updateUserProfile
} from  '../controller/userController.js'
import { admin,protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,admin,getUsers).post(registerUser)
router.post('/logout',logoutUser)
router.post('/auth',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUsersById).put(protect,admin,updateUser)



export default router