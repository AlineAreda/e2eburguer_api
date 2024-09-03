import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const detailUserService = new DetailUserService();

    try {
      const user_id = req.query.user_id as string;
      console.log("Received user_id:", user_id);

      if (!user_id) {
        return res
          .status(400)
          .json({ error: "O ID do usuário é obrigatório." });
      }

      const user = await detailUserService.execute(user_id);

      return res.json(user);
    } catch (error) {
      console.error("Erro ao buscar os detalhes do usuário:", error);

      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { DetailUserController };
