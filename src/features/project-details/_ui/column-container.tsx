import { Column, Task } from "@/entity/project/_domain/types";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import { Plus } from "lucide-react";
import { FormCreateTask } from "./form-create-task";
import { useSortableColumn } from "../_model/use-sortable-column";
import { TaskCard } from "./taskCard";
import { SortableContext } from "@dnd-kit/sortable";

interface ColumnContainer {
    column: Column;
    tasks: Task[];
    tasksId: number[];
}

export const ColumnContainer = ({
    column,
    tasks,
    tasksId,
}: ColumnContainer) => {
    const { setNodeRef, attributes, listeners, isDragging, style } =
        useSortableColumn({ column });

    if (isDragging)
        return (
            <div
                className="flex-shrink-0 bg-opacity-0 border border-gray-800 w-full sm:w-[calc(50%)] lg:w-[calc(33%)] xl:w-[300px] rounded-lg h-[80vh] flex flex-col"
                ref={setNodeRef}
                style={style}
            ></div>
        );

    return (
        <div
            className="flex-shrink-0 w-full sm:w-[calc(50%)] lg:w-[calc(33%)] xl:w-[300px] bg-gray-100 p-4 rounded-lg h-[80vh] flex flex-col"
            ref={setNodeRef}
            style={style}
        >
            <div className="text-2xl font-semibold mb-2 flex justify-between">
                <div {...attributes} {...listeners}>
                    {column.name}
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            className="rounded-full"
                        >
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создание задачи</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <FormCreateTask columnId={column.id} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-y-auto flex-grow space-y-2">
                <div className="flex flex-col gap-2">
                    <SortableContext items={tasksId}>
                        {tasks.map((task) => {
                            return <TaskCard key={task.id} task={task} />;
                        })}
                    </SortableContext>
                </div>
            </div>
        </div>
    );
};
