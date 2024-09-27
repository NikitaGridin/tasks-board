import { Task } from "@/entity/project/_domain/types";
import { ChevronRight } from "lucide-react";
import { useSortableTask } from "../_model/use-sortable-task";

export const TaskCard = ({ task }: { task: Task }) => {
    const { setNodeRef, attributes, listeners, isDragging, style } =
        useSortableTask({
            task,
        });

    if (isDragging)
        return (
            <div
                className="bg-opacity-0 border border-gray-800 p-2 rounded-lg flex w-[250px] justify-between items-center"
                ref={setNodeRef}
                style={style}
            ></div>
        );

    return (
        <div
            className="bg-white p-2 rounded-lg flex w-[250px] justify-between items-center"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className="font-semibold">{task.title}</div>
            <ChevronRight size={18} className="text-gray-400" />
        </div>
    );
};
