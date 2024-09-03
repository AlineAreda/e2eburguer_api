import { Request, Response } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';

class SendOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;


        if (!order_id) {
            return res.status(400).json({ error: "ID do pedido é necessário." });
        }

        const sendOrderService = new SendOrderService();

        try {
            const order = await sendOrderService.execute({ order_id });
            return res.json(order);
        } catch (error) {
            console.error("Erro ao enviar o pedido:", error);


            if (error.message.includes("Pedido não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { SendOrderController };



