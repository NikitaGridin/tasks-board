"use client";

import { cn } from "@/shared/lib/lib";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useFormCreateTask } from "../_model/use-form-create-task";

export function FormCreateTask({
    boardId,
    columnId,
}: {
    boardId: number;
    columnId: number;
}) {
    const { createTask, form, isPending } = useFormCreateTask({
        boardId,
        columnId,
    });

    return (
        <Form {...form}>
            {form.formState.errors.root && (
                <Alert variant="destructive">
                    <AlertTitle className="font-semibold text-xl">
                        Ошибка
                    </AlertTitle>
                    <AlertDescription className="text-xl">
                        {form.formState.errors.root.message}{" "}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={createTask} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="Название"
                                    {...field}
                                    className={cn("", {
                                        "border-red-600 bg-red-50":
                                            form.formState.errors.root,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" loading={isPending}>
                    Создать
                </Button>
            </form>
        </Form>
    );
}
