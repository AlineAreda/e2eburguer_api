import prismaClient from "../../prisma";

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {
        try {
            // Verifica se a categoria existe
            const category = await prismaClient.category.findUnique({
                where: {
                    id: category_id,
                },
            });

            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            // Execute a consulta para obter produtos da categoria
            const findByCategory = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                },
            });

            return findByCategory;
        } catch (error) {
            // Tratamento de erros
            console.error(error);

            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Erro ao listar produtos por categoria');
            }
        }
    }
}

export { ListByCategoryService };
