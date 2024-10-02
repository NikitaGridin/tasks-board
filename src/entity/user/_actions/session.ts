"use server";
import { privateConfig } from "@/shared/config/private";
import { cookie } from "@/shared/lib/cookie";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import jwt from "jsonwebtoken";

const COOKIE_SESSION_KEY = "SESSION";

export const getServerSession = serverAction(
    async (): Promise<{
        id: number;
        phone: string;
        avatar: string | null;
        name: string | null;
        role: string | null;
    }> => {
        const token = cookie.get({ key: COOKIE_SESSION_KEY });
        if (!token) {
            throw new CustomError({
                message: "Сессия не установлена",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }
        const session = jwt.verify(
            token.value,
            privateConfig.JWT_SECRET_KEY
        ) as {
            id: number;
            phone: string;
        };
        const user = await prisma.user.findFirst({
            where: {
                id: session.id,
            },
        });

        if (!user) {
            throw new CustomError({
                message: "Пользователь не найден",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }
        return {
            id: user.id,
            phone: user.phone,
            avatar: user.avatar,
            name: user.name,
            role: user.role,
        };
    }
);

export const setSession = serverAction(
    async ({ data }: { data: { id: number; phone: string } }) => {
        const token = jwt.sign(data, privateConfig.JWT_SECRET_KEY);
        cookie.set({ value: token, key: COOKIE_SESSION_KEY });
    }
);
export const removeSession = serverAction(async () => {
    cookie.remove({ key: COOKIE_SESSION_KEY });
});

export const getSessionStrictServer = async () => {
    const session = await getServerSession();
    if (session === null) {
        throw new CustomError({
            message: "Сессия не установлена",
            code: ERROR_CODES.UNAUTHORIZED,
        });
    }
    return session;
};
