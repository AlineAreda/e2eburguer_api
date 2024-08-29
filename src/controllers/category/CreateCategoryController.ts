import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        // Validação de entrada
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Informe um nome válido para a categoria.' });
        }

        const createCategoryService = new CreateCategoryService();

        try {
            const category = await createCategoryService.execute({ name });
            return res.status(201).json(category);
        } catch (error) {
            console.error("Erro ao criar categoria:", error);

            // Personalização do código de status baseado no tipo de erro
            if (error.message.includes("Categoria já cadastrada")) {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { CreateCategoryController };
