import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if (!name || name.trim() === '') {
            throw new Error('Informe um nome válido para a categoria.');
        }

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name,
            },
        });

        if (categoryAlreadyExists) {
            throw new Error('Categoria já cadastrada!');
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            },
        });

        return category;
    }
}

export { CreateCategoryService };
