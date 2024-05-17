const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const register = async (req, res) => {
  try {
    let data = req.body;
    let user = await UserModel.findOne({ email: data.email });
    if (user) {
      return res.json({
        status: false,
        msg: "User with the email already exists.",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      delete data.passwordConfirmation;
      data.password = bcrypt.hashSync(data.password, salt);
      user = await UserModel.create(data);
      return res.json({
        status: true,
        msg: "Successfully registered.",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({
      email: data.email.toLowerCase(),
    }).populate('reports');

    if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          if(user.status == true) {
            const token = jwt.sign({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            }, 'a1A!s2S@d3D#f4F$', {
                expiresIn: '24h'
            });

            return res.json({
                status: true,
                accessToken: token,
                user: user,
                msg: 'Successfully logged in.'
            })
          } else {
            return res.json({
              status: false,
              msg: "User is not allowed. Please contact admin."
            });
          }
        } else {
            return res.json({
                status: false,
                msg: "Please wait for administrator to allow this account."
            });
        }
    } else {
        return res.json({
            status: false,
            msg: "The user registered with the email does not exist."
        });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const me = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, "a1A!s2S@d3D#f4F$", async (err, user) => {
    if (err) {
      return res.json({
        status: false
      })
    }

    const data = await UserModel.findById(user.id).populate('reports');
    if (!data) {
      return res.json({
        status: false
      });
    } else {
      return res.json({
        status: true,
        user: data
      });
    }
  });
};

module.exports = {
  register,
  login,
  me,
};
