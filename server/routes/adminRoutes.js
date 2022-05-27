const express = require("express");
const { registerStudent, generateAttCode, getAllAttCodes, getAttndenceHistory } = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.post('/register-student', isAuthenticated, isAdmin, registerStudent)
router.post('/generate-attendence-code', isAuthenticated, isAdmin, generateAttCode)
router.get('/get-all-attendence-codes', isAuthenticated, isAdmin, getAllAttCodes)
router.get('/get-attendence-history', isAuthenticated, isAdmin, getAttndenceHistory)

module.exports = router