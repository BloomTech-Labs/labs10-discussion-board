/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const usersDB = require('../db/models/usersDB.js');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');
const uuidv4 = require('uuid/v4');
const router = express.Router();
// const jwt = require('jsonwebtoken');

// globals
const {
  numOfHashes,
  defaultAvatar,
  allowedAvatarTypes
} = require('../config/globals.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');
const requestClientIP = require('../config/middleware/requestClientIP.js');
const {
	transporter,
	getMailOptions,
}					= require('../config/nodeMailerConfig.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// Gets a list of users with mock data (user id, username, email, status, password, id)
router.get('/', (req, res) => {
  return usersDB
    .getUsers()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ error: `Failed to getUsers(): ${err}` })
    );
});

// Gets a list of discussions created by the user
router.get('/discussions/:user_id', (req, res, next) => {
  try {
    const { user_id } = req.params;
    return usersDB
      .getAllDiscussions(user_id)
      .then(user_discussions => res.status(200).json(user_discussions));
  } catch (err) {
    next(err);
  }
});

// Gets a user by their ID (mock data)
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  return usersDB
    .findById(user_id)
    .then(user => {
      user[0].isAuth0 = user[0].password ? false : true;
      user[0].password = null;
      return res.status(200).json(user);
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to findById(): ${err}` })
    );
});

// Returns true if username is in the database, else false
router.get('/username/:username', (req, res) => {
  return usersDB
    .isUsernameTaken(req.params.username)
    .then(user => {
      if (user) {
        return res.send(true);
      }
      return res.send(false);
    })
    .catch(err => res.status(500).json(err));
});

// Returns true if email is in the database, else false
router.get('/email/:email', (req, res) => {
  return usersDB
    .isEmailTaken(req.params.email)
    .then(email => {
      if (email) {
        return res.send(true);
      }
      return res.send(false);
    })
    .catch(err => res.status(500).json(err));
});

// confirm a user's email
router.post('/confirm-email', (req, res) => {
	const { email_confirm_token } = req.body;
	return usersDB
		.confirmEmail(email_confirm_token)
		.then(result => {
			if (result === 0) {
				return res.status(401).json({ error: 'E-mail confirmation token is invalid.' });
			}
			return res.status(201).json({ message: 'Your e-mail has been confirmed. Thank you.' });
		})
		.catch(err => res.status(500).json({ error: `Failed to confirmEmail(): ${ err }` }));
});

// Updates a user
router.put('/user/:id', (req, res, next) => {
  const { id } = req.params;
  const { username, password, email, status } = req.body;
  const newUser = { username, password, email, status };
  return usersDB
    .update(id, newUser)
    .then(user => res.status(200).json(user))
    .catch(err =>
      res.status(500).json({ error: `Failed to update(): ${err}` })
    );
});

// Update the password of a user given their ID
router.put('/password/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || oldPassword === '') {
    return res.status(400).json({ error: 'Old password must not be empty.' });
  }
  if (!newPassword || newPassword === '') {
    return res.status(400).json({ error: 'New password must not be empty.' });
  }
  return usersDB
    .getPassword(user_id)
    .then(currentPW => {
      if (currentPW && bcrypt.compareSync(oldPassword, currentPW.password)) {
        const newHashedPassword = bcrypt.hashSync(newPassword, numOfHashes);
        return usersDB
          .updatePassword(user_id, newHashedPassword)
          .then(() =>
            res.status(201).json({ message: 'Password update succesful.' })
          )
          .catch(err =>
            res
              .status(400)
              .json({ error: `Failed to updatePassword(): ${err}` })
          );
      }
      return res.status(400).json({ error: 'Old password is wrong.' });
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to getPassword(): ${err}` })
    );
});

// update email
router.put('/update-email/:user_id', authenticate, requestClientIP, (req, res) => {
	const { user_id } = req.params;
	const { email, clientIP } = req.body;

	if (!email) return res.status(401).json({ error: 'E-mail must not be empty.' });

	return usersDB
		.getUserByEmail(email)
		.then(user => {
			if (user.length) {
				return res.status(401).json({ error: `E-mail "${ email }" already in use.` });
			}

			// generate a random uuid for email confirmation URL
			const email_confirm = uuidv4();

			return usersDB
				.updateEmail(user_id, email, email_confirm)
				.then(() => {
					const mailOptions = getMailOptions('update-email', email, email_confirm, clientIP);

					return transporter.sendMail(mailOptions, function(err, info){
						if (err) {
							return res.status(500).json({ error: `Server failed to send e-mail confirmation: ${ err }` });
						} else {
							const message = `Success! An e-mail was sent to ${ email }. Please confirm your e-mail address in order to be able to reset your password in the future (You might want to check your spam folder).`;
							return res.status(201).json(message);
						}
					});
				})
				.catch(err => res.status(500).json({ error: `Server failed to update email: ${ err }`}));
		})
		.catch(err => res.status(500).json({ error: `Server failed to get user by email: ${ err }`}));
});

// Update the avatar of a user given their ID
router.put('/avatar/:user_id', authenticate, fileUpload(), (req, res) => {
  const { user_id } = req.params;
  let { avatarData } = req.body;
  if (avatarData === null) {
    avatarData = defaultAvatar;
    // reset avatar to default
    return usersDB
      .updateAvatar(user_id, avatarData)
      .then(result => res.status(201).json(result[0].avatar))
      .catch(err =>
        res.status(500).json({ error: `Failed to updateAvatar(): ${err}` })
      );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }
  const imageFile = req.files.imageFile;
  const imageBuffer = imageFile.data;
  const mimeType = imageFile.mimetype;
  if (!allowedAvatarTypes.includes(mimeType)) {
    return res
      .status(401)
      .json({
        error: `${mimeType.replace(
          'image/',
          ''
        )} is not an allowed avatar type. It must be a jpeg, jpg, png, bmp, or tiff.`
      });
  }
  return Jimp.read(imageBuffer)
    .then(image => {
      return image
        .scaleToFit(100, 100)
        .getBase64(Jimp.AUTO, (err, convertedImage) => {
          if (err) throw err;
          return usersDB
            .updateAvatar(user_id, convertedImage)
            .then(result => res.status(201).json(result[0].avatar))
            .catch(err =>
              res
                .status(500)
                .json({ error: `Failed to updateAvatar(): ${err}` })
            );
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: `Jimp failed to read image buffer: ${err}` })
    );
});

// Update the avatar (as a url) of a user given their ID
router.put('/avatar-url/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  let { avatarUrl } = req.body;
  if (avatarUrl === null) {
    // reset avatar to default
    avatarUrl = defaultAvatar;
  }
  return usersDB
    .updateAvatar(user_id, avatarUrl)
    .then(result => res.status(201).json(result[0].avatar))
    .catch(err =>
      res.status(500).json({ error: `Failed to updateAvatar(): ${err}` })
    );
});

// Delete a user by their ID
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  return usersDB
    .remove(id)
    .then(removedUser => res.status(202).json(removedUser))
    .catch(err =>
      res.status(500).json({ error: `Failed to remove(): ${err}` })
    );
});

module.exports = router;
