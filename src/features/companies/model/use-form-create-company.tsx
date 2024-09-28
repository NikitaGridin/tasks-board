import { useInvalidateUserCompanies } from "@/entity/company/_queries";
import { createCompany } from "@/entity/company/company.server";
import { useSession } from "@/entity/user/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createCompanyFormSchema = z.object({
    name: z.string().min(1, {
        message: "Обязательное поле",
    }),
});

export const useFormCreateCompany = () => {
    const session = useSession();
    const invalidateUserCompanies = useInvalidateUserCompanies();

    const { mutate, isPending } = useMutation({
        mutationFn: createCompany,
        onSuccess: async (data) => {
            if (data.error) {
                return form.setError("root", {
                    message: data.error.message ?? "Произошла ошибка",
                });
            }
            await invalidateUserCompanies();
        },
        onError: (error) => {
            form.setError("root", {
                message: error.message ?? "Произошла ошибка",
            });
        },
    });

    const form = useForm<z.infer<typeof createCompanyFormSchema>>({
        resolver: zodResolver(createCompanyFormSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createCompanyFormSchema>) {
        if (!session.data?.data) return null;
        mutate({
            name: values.name,
            authorId: session.data.data.id,
        });
    }

    return {
        createCompany: form.handleSubmit(onSubmit),
        form,
        isPending,
    };
};
