import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string; // Mantendo como string conforme o modelo do banco de dados, porém o ideal seria um bigdecimal
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {
        // Validação dos campos obrigatórios
        if (!name || !price || !description || !category_id) {
            throw new Error('Campos obrigatórios não preenchidos');
        }

        // Converter o preço para um número para validação
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
            throw new Error('Preço inválido');
        }

        // Verificar se a categoria existe
        const category = await prismaClient.category.findUnique({
            where: {
                id: category_id
            },
        });

        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        try {
            const product = await prismaClient.product.create({
                data: {
                    name: name,
                    price: numericPrice.toString(), // Convertendo o preço de volta para string
                    description: description,
                    banner: banner,
                    category_id: category_id
                }
            });

            return product;
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw new Error('Erro ao criar produto');
        }
    }
}

export { CreateProductService };
