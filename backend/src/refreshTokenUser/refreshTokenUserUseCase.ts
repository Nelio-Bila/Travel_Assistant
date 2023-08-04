import { PrismaClient } from "@prisma/client";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import dayjs from "dayjs";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const prisma = new PrismaClient();
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error("Invalid refresh token ");
    }

    const refreshTokenExpired = dayjs.unix(refreshToken.expiresIn).isAfter(dayjs());
    console.log(refreshTokenExpired);

    const generateRefreshToken = new GenerateRefreshToken();
    const token = generateRefreshToken.execute(refreshToken.userId);

    if(refreshTokenExpired){
        await prisma.refreshToken.deleteMany({
            where:{
                userId: refreshToken.userId 
            }
        });

        const generateRefreshTokenProvider = new GenerateRefreshToken();
        const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);

        return { token, newRefreshToken};
    }

    return {token};
  }
}

export { RefreshTokenUserUseCase };
