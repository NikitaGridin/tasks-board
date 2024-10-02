"use client";

import { useUserCompanies } from "@/entity/company/company";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import Link from "next/link";
import { FormCreateCompany } from "./ui/form-create-company";

export const ListCompanies = () => {
    const { data, isLoading, isError } = useUserCompanies();

    if (isLoading) {
        return (
            <div className="grid gap-4">
                {Array.from({ length: 10 }).map((_, i) => {
                    return <Skeleton className="w-full h-14" key={i} />;
                })}
            </div>
        );
    }

    if (isError) {
        return <div>Произошла ошибка</div>;
    }

    if (!data) {
        return <div>Ошибка при получении данных</div>;
    }
    if (data.error) {
        return <div>{data.error.message}</div>;
    }
    if (!data.data) {
        return <div>Данные не получены</div>;
    }

    return (
        <div className="grid gap-4 grid-cols-2">
            <FormCreateCompany />
            {data.data.map((company) => {
                return (
                    <Button
                        key={company.id}
                        className="text-xl h-24 font-bold shadow"
                        variant={"outline"}
                        asChild
                    >
                        <Link href={`${routes.COMPANY}/${company.id}`}>
                            {company.name}
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
};
