import { Request, Response } from 'express';
import { RemoveCategoryService } from '../../services/category/RemoveCategoryService';

class RemoveCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        // Validação de entrada
        if (!category_id) {
            return res.status(400).json({ error: "ID da categoria é necessário." });
        }

        const removeCategoryService = new RemoveCategoryService();

        try {
            const category = await removeCategoryService.execute({ category_id });
            return res.json(category);
        } catch (error) {
            console.error("Erro ao remover categoria:", error);

            // Personalização do código de status baseado no tipo de erro
            if (error.message.includes("Categoria com o ID")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { RemoveCategoryController };



