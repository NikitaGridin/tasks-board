"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";

export const createCompany = serverAction(
    async ({
        name,
        authorId,
    }: {
        name: string;
        authorId: number;
    }): Promise<{
        id: number;
        name: string;
        authorId: number;
    }> => {
        // Проверка наличия автора компании
        const author = await prisma.user.findUnique({
            where: { id: authorId },
        });

        if (!author) {
            throw new CustomError({
                message: "Автор компании не найден",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        // Создание компании
        const company = await prisma.company.create({
            data: {
                name,
                author: {
                    connect: { id: authorId },
                },
            },
        });

        return {
            id: company.id,
            name: company.name,
            authorId: company.authorId,
        };
    }
);
