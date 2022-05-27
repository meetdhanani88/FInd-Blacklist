const main = require("../middleware/mailer");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require('moment');

exports.SignUp = (req, res) => {
    const { email } = req.body;
    try {
        User.findOne({ email: email, Role: "Admin" }).exec(async (err, user) => {
            if (err) return res.status(400).json(err);
            if (user) {
                const pass = "PlayBoy";

                await User.findOneAndUpdate(
                    { email: user.email },
                    {
                        Password: pass,
                    }
                );
                return res.status(200).json({
                    message: "Successfully send Password To Admin Email",
                });
            } else {
                return res.status(404).json({
                    message: "You are not Allow for Admin Access",
                });
            }
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.SignIn = (req, res) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email: email }).exec(async (err, user) => {
            if (err) return res.status(400).json(err);
            if (user) {
                if (user.Password === password) {
                    const token = await jwt.sign({ user: user }, process.env.JWT_KEY, {
                        expiresIn: "1d",
                    });
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

exports.ResetPassword = (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
        User.findOne({ email: email }).exec(async (err, user) => {
            if (err) return res.status(400).json(err);
            if (user) {
                if (user.Password === password) {
                    await User.updateOne(
                        { _id: user._id },
                        {
                            Password: newPassword,
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

exports.forGotPassword = (req, res) => {
    const { email } = req.body;

    try {
        User.findOne({ email: email }).exec(async (err, user) => {
            if (err) return res.status(400).json(err);
            if (user) {
                await main(user.email, user.Password);
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
    const { firstName, lastName, email, MobileNo, Subscription_Plan, Expiry } =
        req.body;

    const E_Date = await ExpireDatePlane(Expiry)



    try {

        const user = await User({
            firstName,
            lastName,
            email,
            MobileNo,
            Subscription_Plan,
            Expiry_Date: E_Date ? E_Date : undefined,
            Role: "User",
        });
        const pass = await genPassword();
        user.Password = pass
        const { Role } = req.user.user;

        if (Role === "Admin") {
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
        const users = await User.find({ Role: "User" });
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
        const { Role } = req.user.user;
        if (Role === "Admin") {
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
    const {
        firstName,
        lastName,
        email,
        MobileNo,
    } = req.body;
    const id = req.params.id;

    try {
        const { Role } = req.user.user;
        if (Role === "Admin") {

            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    firstName,
                    lastName,
                    email,
                    MobileNo
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

exports.inActivePlan = async (req, res) => {
    const id = req.params.id;
    try {
        const { Role } = req.user.user;
        if (Role === "Admin") {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    Subscription_Plan: "",
                    Expiry_Date: "",
                },
                { new: true }
            );
            if (updatedUser) {
                return res.status(200).json({
                    message: "Plan InActive",
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
exports.ActivePlan = async (req, res) => {
    const id = req.params.id;
    const { Subscription_Plan, Expire } = req.body
    try {
        const { Role } = req.user.user;
        if (Role === "Admin") {
            User.findById(id, async (err, user) => {
                if (err) return res.status(400).json(err);
                if (user) {
                    const E_Date = await ExpireDatePlane(Expire)
                    console.log(E_Date);
                    const updatedUser = await User.updateOne(
                        { email: user.email },
                        {
                            Subscription_Plan,
                            Expiry_Date: E_Date,
                        },
                        { new: true }
                    );
                    if (updatedUser) {
                        return res.status(200).json({
                            message: "Plan Active",
                            user: updatedUser,
                        });
                    }

                }
            })

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


function ExpireDatePlane(Expiry, type) {

    let E_Date;


    if (Expiry === 3) {
        E_Date = moment().add(3, 'M').format('YYYY-MM-DD');
    } else if (Expiry === 6) {
        E_Date = moment().add(6, 'M').format('YYYY-MM-DD');
    } else if (Expiry === 12 || Expiry === 1) {
        E_Date = moment().add(12, 'M').format('YYYY-MM-DD');

    }

    return E_Date
}
