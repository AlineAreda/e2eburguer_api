import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Nome, e-mail e senha são obrigatórios." });
    }

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro na criação do usuário:", error);

      if (error.message === "E-mail já cadastrado") {
        return res.status(409).json({ error: error.message });
      } else if (
        error.message === "Preencha com nome e sobrenome." ||
        error.message === "Formato de e-mail inválido." ||
        error.message.includes("Senha inválida")
      ) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { CreateUserController };
