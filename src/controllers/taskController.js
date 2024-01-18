const User = require("../models/User");
const Checklist = require("../models/Checklist");
const Task = require("../models/Task");

module.exports = class TaskController {
  static async getTaskById(req, res) {
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json("Erro ao pegar tarefa!");
    }
  }

  static async createTask(req, res) {
    const { checklistId } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.json("O título é obrigatório");
    }

    const task = new Task({ title, checklistId });
    try {
      const checklist = await Checklist.findById(checklistId);
      await task.save();
      checklist.taskId.push(task);
      await checklist.save();

      res.status(200).json({ msg: "Tarefa criada com sucesso" });
    } catch (error) {
      res.status(400).json({ msg: "Erro ao criar tarefa" });
    }
  }

  static async updateTitleTask(req, res) {
    const { checklistId, taskId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.json("O título é obrigatório");
    }
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, updatedAt: new Date() },
        { new: true }
      );
      const checklist = await Checklist.findById(checklistId).populate(
        "taskId"
      );

      res.json(checklist);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar tarefa" });
    }
  }

  static async updateDoneTask(req, res) {
    const { checklistId, taskId } = req.params;
    const { done } = req.body;

    if (typeof done !== "boolean") {
      return res.json("O valor é obrigatório");
    }
    try {
      await Task.findByIdAndUpdate(taskId, { done }, { new: true });
      const checklist = await Checklist.findById(checklistId).populate(
        "taskId"
      );

      res.status(200).json(checklist);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar tarefa" });
    }
  }

  static async deleteTask(req, res) {
    const { checklistId, taskId } = req.params;

    try {
      const checklist = await Checklist.findById(checklistId).populate(
        "taskId"
      );
      const index = checklist.taskId.findIndex((task) => task.id === taskId);
      console.log(checklist.taskId[0].id);
      console.log(checklist);
      console.log(index);
      checklist.taskId.splice(index, 1);
      await checklist.save();
      await Task.findByIdAndDelete(taskId);
      res.status(200).json(checklist);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao deletar checklist" });
    }
  }
};
