import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {

        if (typeof table !== 'number' || isNaN(table) || table <= 0) {
            throw new Error('Número da mesa inválido');
        }


        if (name && typeof name !== 'string') {
            throw new Error('Nome inválido');
        }

        try {
            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name || null,
                },
            });

            return order;
        } catch (error) {
            console.error("Erro ao criar o pedido:", error);
            throw new Error('Erro ao criar o pedido');
        }
    }
}

export { CreateOrderService };
