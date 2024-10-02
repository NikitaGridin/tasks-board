"use server";

import { getServerSession } from "@/entity/user/session.server";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import { CompanyDetails } from "../_domain/types";

export const getCompany = serverAction(
    async ({ companyId }: { companyId: number }): Promise<CompanyDetails> => {
        const session = await getServerSession();
        if (session.error) {
            throw new CustomError({
                message: session.error.message,
                code: session.error.code,
            });
        }
        if (!session.data) {
            throw new CustomError({
                message: "Нет данных о сессии",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }

        const company = await prisma.company.findFirst({
            where: {
                OR: [
                    { authorId: session.data.id },
                    { members: { some: { id: session.data.id } } },
                ],
                id: companyId,
            },
        });

        if (!company) {
            throw new CustomError({
                message: "Компания не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        return company;
    }
);
