import jwt, { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";

class GenerateTokenProvider {
    
  
   async execute(loadedUser: User) {
        const token = jwt.sign(
            {
              id: (loadedUser as User).id,
              email: (loadedUser as User).email,
              
            },
            process.env.JWT_SECRET as Secret,
            { expiresIn: "1h" }
          );

          return token;
    }
}

export {GenerateTokenProvider}