"use server";

import { getSessionStrictServer } from "@/entity/user/session.server";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import { UserCompaniesResponse } from "../_domain/types";

export const getUserCompanies = serverAction(
    async (): Promise<UserCompaniesResponse> => {
        const session = await getSessionStrictServer();
        if (session.error) {
            throw new CustomError({
                message: session.error.message,
                code: session.error.code,
            });
        }
        if (!session.data) {
            throw new CustomError({
                message: "Сессия не установлена",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.data.id },
        });

        if (!user) {
            throw new CustomError({
                message: "Пользователь не найден",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        const companies = await prisma.company.findMany({
            where: {
                OR: [
                    { authorId: session.data.id },
                    { members: { some: { id: session.data.id } } },
                ],
            },
        });

        return companies;
    }
);
