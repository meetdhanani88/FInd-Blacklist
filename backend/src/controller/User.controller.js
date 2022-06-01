const main = require("../middleware/mailer");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const SubscriptionPlan = require("../models/SubscriptionPlan.model");
const moment = require("moment");
const Role = require("../models/Role.model");
const bcrypt = require("bcrypt");
exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const { name, _id } = req.body;
  try {
    const user = await User({ email, password, roleId: 1 });
    user.save((err, user) => {
      if (err) return res.status(400).json(err);
      return res.status(201).json(user);
    });
    // const _role = await Role({name,_id})

    // _role.save((err,role)=>{
    //     if(err) return res.status(400).json(err)
    //     return res.status(201).json(role)
    // })
    // const data = await User.find().populate('roleId')
    // return res.status(201).json(data)
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email: email })
      .populate("roleId")
      .exec(async (err, user) => {
        if (err) return res.status(400).json(err);
        if (user) {
          const isMatch = await user.authenticated(password);
          if (isMatch) {
            const token = await jwt.sign(
              { userId: user._id, role: user.roleId, email: user.email },
              process.env.JWT_KEY,
              {
                expiresIn: "1d",
              }
            );
            return res.status(200).json({
              message: "Login Successfully",
              user: user,
              token: token,
            });
          } else {
            return res.status(400).json({
              message: "Password Is Wrong",
            });
          }
        } else {
          return res.status(404).json({
            message: "User Not found",
          });
        }
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.resetPassword = (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    User.findOne({ email: email }).exec(async (err, user) => {
      if (err) return res.status(400).json(err);
      if (user) {
        const isMatch = await user.authenticated(password);
        if (isMatch) {
          const hashPass = await bcrypt.hash(newPassword, 10);
          await User.updateOne(
            { _id: user._id },
            {
              password: hashPass,
            },
            { new: true }
          );
          return res.status(200).json({
            message: "Password updated..",
          });
        } else {
          return res.status(400).json({
            message: "Your Old Password Is Wrong..",
          });
        }
      } else {
        return res.status(404).json({
          message: "User Not Found..",
        });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  try {
    User.findOne({ email: email }).exec(async (err, user) => {
      if (err) return res.status(400).json(err);
      if (user) {
        await main(user.email, user.password);
        return res.status(200).json({
          message: "Password Sent on Email",
        });
      } else {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, mobileNo, expiryDate, plan } = req.body;

  const E_Date = await expireDatePlan(expiryDate);

  try {
    const user = await User({
      firstName,
      lastName,
      email,
      mobileNo,
      plan,
      roleId: 2,
    });
    const pass = await genPassword();
    user.password = pass;
    user.expiryDate = E_Date;

    const { _id } = req.user.role;

    if (_id === 1) {
      user.save(async (err, user) => {
        if (err) return res.status(400).json(err);
        if (user) {
          await main(user.email, pass);
          return res.status(201).json({
            message: "User Created Successfully",
            user: user,
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "Required Authorization",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ roleId: 2 })
      .populate("roleId plan")
      .select("-password");
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({
        message: "Users Not Found ",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const { _id } = req.user.role;
    if (_id === 1) {
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        return res.status(200).json({
          message: "User Deleted",
        });
      } else {
        return res.status(404).json({
          message: "User Not Deleted",
        });
      }
    } else {
      return res.status(400).json({
        message: "Required Authorization",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, mobileNo } = req.body;
  const id = req.params.id;

  try {
    const { _id } = req.user.role;
    if (_id === 1) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          mobileNo,
        },
        { new: true }
      );
      if (updatedUser) {
        return res.status(200).json({
          message: "User Updated",
          user: updatedUser,
        });
      }
    } else {
      return res.status(400).json({
        message: "Required Authorization",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.userActiveOrInActive = async (req, res) => {
  const id = req.params.id;
  try {
    const { _id } = req.user.role;
    if (_id === 1) {
      User.findOne({ _id: id }).exec(async (err, user) => {
        if (err) return res.status(400).json(err);
        if (user.status === true) {
          await User.updateOne(
            { _id: user._id },
            {
              status: false,
            },
            { new: true }
          );
          return res.status(200).json({
            message: "User is Now InActive",
          });
        } else {
          await User.updateOne(
            { _id: user._id },
            {
              status: true,
            },
            { new: true }
          );
          return res.status(200).json({
            message: "User is Now Active",
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "Required Authorization",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.extendExpiryDate = (req, res) => {
  const id = req.params.id;
  const { expiryDate } = req.body;
  try {
    const { _id } = req.user.role;
    if (_id === 1) {
      User.findOne({ _id: id }).exec(async (err, user) => {
        if (err) return res.status(400).json(err);
        if (user) {
          await User.updateOne(
            { _id: user._id },
            {
              expiryDate,
            },
            { new: true }
          );
          return res.status(200).json({
            message: "Expiry Date Is Extended",
          });
        } else {
          return res.status(404).json({
            message: "Plan not found",
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "Required Authorization",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

function genPassword() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

function expireDatePlan(Expiry) {
  let E_Date;

  if (Expiry === 3) {
    E_Date = moment().add(3, "M").format("YYYY-MM-DD");
  } else if (Expiry === 6) {
    E_Date = moment().add(6, "M").format("YYYY-MM-DD");
  } else if (Expiry === 12 || Expiry === 1) {
    E_Date = moment().add(12, "M").format("YYYY-MM-DD");
  }
  return E_Date;
}
exports.auth = (req, res) => {
  return res.status(200).json(req.user.user.Role);
};
