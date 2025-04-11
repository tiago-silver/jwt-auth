export const authConfig = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        // Duração do token
        expiresIn: "1d"
    }
}