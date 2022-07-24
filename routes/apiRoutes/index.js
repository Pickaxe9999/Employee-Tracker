const express = require('express');
const router = express.Router();
const departmentRoutes = require('./DepartmentRoutes')
const employeeRoutes = require('./EmployeeRoutes');
const roleRoutes = require('./RoleRoutes');

//connect to each employee specific api routes
router.use('/department', departmentRoutes);
router.use('/employee', employeeRoutes);
router.use('/role', roleRoutes);

module.exports = router;