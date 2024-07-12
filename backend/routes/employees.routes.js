import express from 'express';
import {
  getAllEmployees,
  getEmployeeId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employees.controllers.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeId);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
