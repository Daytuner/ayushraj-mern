import express from 'express'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from  '../controller/userController.js'
import { admin,protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,admin,getUsers).post(registerUser)
router.post('/logout',logoutUser)
router.post('/auth',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)



export default router