import { Task } from "@/entity/project/_domain/types";
import { ChevronRight } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCard = ({ task }: { task: Task }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: `task-${task.id}`,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging)
        return (
            <div
                className="border border-gray-800 p-2 rounded-lg w-[250px] h-[50px] flex justify-between items-center"
                ref={setNodeRef}
                style={style}
            ></div>
        );

    return (
        <div
            className="bg-white p-2 rounded-lg flex w-[250px] h-[50px] justify-between items-center"
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
