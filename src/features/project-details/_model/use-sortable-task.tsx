import { Task } from "@/entity/project/_domain/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const useSortableTask = ({ task }: { task: Task }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
        style,
    };
};
