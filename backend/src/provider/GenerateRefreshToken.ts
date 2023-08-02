import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs"

class GenerateRefreshToken{

    async execute(userId: string){

        const prisma = new PrismaClient();

        const expiresIn = dayjs().add(15,"second").unix();
        const generateRefreshToken = await prisma.refreshToken.create({
            data: {
                userId,
                expiresIn 
            }
        });

        return generateRefreshToken;
    }
}

export {GenerateRefreshToken}