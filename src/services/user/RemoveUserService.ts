import prismaClient from "../../prisma";

interface RemoveUserRequest {
    user_id: string;
}

class RemoveUserService {
    async execute({ user_id }: RemoveUserRequest) {
        try {
            await prismaClient.user.delete({
                where: {
                    id: user_id,
                }
            });

            return { message: "Usuário excluído com sucesso." };
        } catch (error) {
            if (error.code === 'P2025') { // Código de erro do Prisma para "registro não encontrado"
                throw new Error("Usuário não encontrado.");
            } else {
                // Aqui, considere usar um sistema de log mais robusto
                console.error("Erro ao excluir o usuário:", error);
                throw new Error("Erro ao excluir o usuário.");
            }
        }
    }
}

export { RemoveUserService };
