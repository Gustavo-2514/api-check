const Checklist = require("../models/Checklist");
const User = require("../models/User");

module.exports = class ChecklistController {
  static async getChecklistsUser(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId)
        .select("-password")
        .populate("checklistId");
      return res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Não foi possível carregar os listas de tarefas" });
    }
  }

  static async getChecklistById(req, res) {
    const { checklistId } = req.params;
    try {
      const checklist = await Checklist.findById(checklistId).populate(
        "taskId"
      );
      return res.status(200).json(checklist);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Não foi possível carregar a lista de tarefas" });
    }
  }

  static async createChecklist(req, res) {
    const userId = req.params.userId;
    const { name } = req.body;
    if (!name) {
      return res.json({ msg: "O nome é obrigatório!" });
    }

    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).send({ msg: "Usuario não encontrado!" });
    }
    const checklist = Checklist({ name, userId });
    try {
      await checklist.save();
      user.checklistId.push(checklist);
      await user.save();
      return res
        .status(201)
        .json({ msg: "Lista de tarefas criada com sucesso!", checklist });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao criar Lista de tarefas", error: error.message });
    }
  }

  static async updateChecklist(req, res) {
    const userId = req.params.userId;
    const checklistId = req.params.checklistId;
    const { name } = req.body;
    if (!name) {
      return res.json({ msg: "O nome é obrigatório!" });
    }

    const user = await User.findById(userId, "-password").populate(
      "checklistId"
    );
    if (!user) {
      return res.status(404).send({ msg: "Usuario não encontrado!" });
    }

    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(404).send({ msg: "Lista de tarefas não encontrada!" });
    }

    try {
      const checklistUpdated = await Checklist.findByIdAndUpdate(
        checklistId,
        { name, updatedAt: new Date() },
        { new: true }
      );
      const index = user.checklistId.indexOf(checklistId);
      user.checklistId.splice(index, 1, checklistUpdated);
      await user.save();

      res.status(201).json({ msg: "Lista de tarefas atualizada com sucesso!" });
    } catch (error) {
      res.status(400).json({ msg: "Erro ao atualizar Lista de tarefas" });
    }
  }

  static async deleteChecklist(req, res) {
    const { userId, checklistId } = req.params;

    try {
      const user = await User.findById(userId, "-password").populate(
        "checklistId"
      );

      const index = user.checklistId.findIndex(
        (checklist) => checklist.id === checklistId
      );
      user.checklistId.splice(index, 1);
      await user.save();

      await Checklist.findOneAndDelete({ _id: checklistId });

      res.status(200).json({ msg: "Checklist deletada com sucesso!", user });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao deletar checklist" });
    }
  }
};
