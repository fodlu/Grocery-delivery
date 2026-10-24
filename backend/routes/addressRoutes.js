import {Router} from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addAddress, deleteAddress, getAddresses, updateAddress } from '../controllers/addressController.js';

const addressRouter = Router();

addressRouter.post('/add', authMiddleware, addAddress)
addressRouter.get('/', authMiddleware, getAddresses)
addressRouter.put('/:id', authMiddleware, updateAddress)
addressRouter.delete('/:id', authMiddleware, deleteAddress)

export default addressRouter