const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    console.log(result);
    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.user._id,
        nom: result.user.nom,
        email: result.user.email,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      message: message.error,
    });
  }
};

module.exports = {
  register,
  login
};
