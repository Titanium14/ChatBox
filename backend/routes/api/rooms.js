const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load validation
const validateRoomInput = require('../../validation/rooms');
// const validateCategoryInput = require('../../validation/category');

// Load Room model
const Room = require('../../models/Room');

// @route   GET api/rooms/test
// @desc    Tests rooms route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Rooms works' }));

// @route   GET api/rooms
// @desc    Get current user's rooms
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Room.find({ user: req.user.id })
      .then(rooms => {
        if (rooms.length === 0) {
          errors.norooms = 'There are no rooms for this user';
          return res.status(404).json(errors);
        }
        res.json(rooms);
      })
      .catch(err => res.status(404).json(err));
  }
);

// // @route   GET api/budgets/:id
// // @desc    Get specified budget of current user
// // @access  Private
// router.get(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const errors = {};
//     Budget.findOne({ _id: req.params.id })
//       .then(budgets => {
//         if (!budgets) {
//           errors.nobudget = 'This budget does not exist';
//           return res.status(404).json(errors);
//         }
//         res.json(budgets);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @route   POST api/rooms
// @desc    Create rooms
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const roomFields = {};
    roomFields.user = req.user.id;
    if (req.body.roomName) roomFields.roomName = req.body.roomName;

    Room.findOne({ roomName: roomFields.roomName }).then(room => {
      // Create

      // Check if room exists
      if (room) {
        errors.roomName = 'That room already exists';
        res.status(400).json(errors);
      } else {
        // Save room
        new Room(roomFields).save().then(room => res.json(room));
      }
    });
  }
);

// // @route   POST api/budgets/:id
// // @desc    Edit budgets
// // @access  Private
// router.post(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateBudgetInput(req.body);

//     // Check validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     // Get fields
//     const budgetFields = {};
//     budgetFields.user = req.user.id;
//     if (req.body.budgetName) budgetFields.budgetName = req.body.budgetName;
//     if (req.body.period) budgetFields.period = req.body.period;
//     if (req.body.income) budgetFields.income = req.body.income;

//     Budget.findOne({ _id: req.params.id })
//       .then(budget => {
//         if (budget) {
//           // Update
//           Budget.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: budgetFields },
//             { new: true }
//           ).then(budget => res.json(budget));
//         } else {
//           errors.budgetName = 'Failed to update this budget';
//           res.status(400).json(errors);
//         }
//       })
//       .catch(err => res.status(404).json('This budget does not exist'));
//   }
// );

// // @route   POST api/budget/:id/category
// // @desc    Add category to budget
// // @access  Private
// router.post(
//   '/:id/category',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateCategoryInput(req.body);

//     // Check validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     /* If the program evolves to allow users to input their own categories,
//        apply error-checking to verify that the inputted categories does not already exist. */

//     Budget.findOne({ _id: req.params.id }).then(budget => {
//       const newCate = {
//         cateName: req.body.cateName,
//         incomeInput: req.body.incomeInput
//       };

//       // Add to cate array
//       budget.category.push(newCate);

//       budget.save().then(budget => res.json(budget));
//     });
//   }
// );

// // @route   DELETE api/budget/:id/category/:cate_id
// // @desc    Delete category from budget
// // @access  Private
// router.delete(
//   '/:id/category/:cate_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Budget.findOne({ _id: req.params.id })
//       .then(budget => {
//         const errors = {};

//         // Get remove index
//         const removeIndex = budget.category
//           .map(item => item.id)
//           .indexOf(req.params.cate_id);

//         // Check if the category exists
//         if (removeIndex === -1) {
//           errors.nocatetodelete = 'There is no category to delete';
//           res.status(404).json(errors);
//         } else {
//           // Splice out of array
//           budget.category.splice(removeIndex, 1);

//           // Save
//           budget.save().then(budget => res.json(budget));
//         }
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @route   DELETE api/budget/:id
// // @desc    Delete budget
// // @access  Private
// router.delete(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Budget.findOneAndRemove({ _id: req.params.id }).then(() => {
//       res.json({ success: true });
//     });
//   }
// );

module.exports = router;
