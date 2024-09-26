import { Column } from "@/entity/project/_domain/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const useSortableColumn = ({ column }: { column: Column }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
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
