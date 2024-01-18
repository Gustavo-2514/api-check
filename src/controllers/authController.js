const User = require("../models/User");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/create-token");

module.exports = class AuthController {
  static async Register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      return res.json({ error: "Nome é obrigatório " });
    }
    if (!email) {
      return res.json({ error: "Email é obrigatório" });
    }
    if (!password) {
      return res.json({ error: "Senha é obrigatória" });
    }

    if (password.length < 8) {
      return res.json({ error: "A Senha deve ter no mínimo 8 caracteres" });
    }

    if (!confirmPassword) {
      return res.json({ error: "A confirmação de senha é obrigatória" });
    }

    if (password !== confirmPassword) {
      return res.json({ error: "As senhas não coincidem" });
    }

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.json({ error: "Email já cadastrado" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({ name, email, password: passwordHash });

      await newUser.save();
      const userId = newUser._id;
      const token = createToken(newUser);
      res.status(201).json({ msg: "Usuario cadastrado!", token, userId });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Erro ao cadastrar usuario" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ error: "Email é obrigatório" });
    }
    if (!password) {
      return res.json({ error: "Senha é obrigatório" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "Usuário não encontrado" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.json({ error: "Senha invalida" });
      }

      const userId = user._id;
      const token = createToken(user);
      res
        .status(200)
        .json({ msg: "Login realizado com sucesso", token, userId });
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar login!" });
    }
  }

  static async checkAuthorization(req, res) {
    res.status(200).json(true);
  }
};
