"use client";

import { cn } from "@/shared/lib/lib";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { PlusCircle } from "lucide-react";
import { useFormCreateCompany } from "../model/use-form-create-company";

export function FormCreateCompany() {
    const { createCompany, form, isPending } = useFormCreateCompany();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="h-full gap-2 shadow">
                    <PlusCircle /> Создать компанию
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Создайте компанию</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    {form.formState.errors.root && (
                        <Alert variant="destructive">
                            <AlertTitle className="font-semibold text-xl">
                                Ошибка
                            </AlertTitle>
                            <AlertDescription className="text-xl">
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={createCompany} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Название компании"
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
            </DialogContent>
        </Dialog>
    );
}
