const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  isLoggedIn,
  getOverview
);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/me', protect, getAccount);
router.get('/submit-user-data', protect, updateUserData);
router.get('/my-tours', protect, getMyTours);

module.exports = router;
