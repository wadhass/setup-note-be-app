const bcrypt = require('bcrypt');
const User = require('../../database/models/user');

const updateUser = async (req, res) => {
  try {
    const { email, firstName, lastName, age, password } = req.body;

    // Validate the email (used to find the user)
    if (!email) {
      return res.status(400).json({
        ok: false,
        message: 'Email is required to update user',
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: `No user found with email: ${email}`,
      });
    }

    // Prepare updated fields
    const updatedFields = {};
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (age) updatedFields.age = age;
    if (password) {
      updatedFields.password = bcrypt.hashSync(password, parseInt(process.env.MONGO_DB_URL));
    }

    // Update the user
    await User.updateOne({ email }, { $set: updatedFields });

    // Return success response
    return res.status(200).json({
      ok: true,
      message: `User with email (${email}) has been updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`,
    });
  }
};

module.exports = updateUser;
