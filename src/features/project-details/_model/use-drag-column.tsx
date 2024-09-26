import { Column } from "@/entity/project/_domain/types";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

export const useDragColumn = ({ data }: { data: Column[] }) => {
    const [columns, setColumns] = useState<Column[]>(data);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    function onDragStart(e: DragStartEvent) {
        console.log("start", e);
        if (e.active.data.current?.type === "Column") {
            setActiveColumn(e.active.data.current.column);
            return;
        }
    }

    function onDragEnd(e: DragEndEvent) {
        const { active, over } = e;

        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns?.findIndex(
                (col) => col.id === activeColumnId
            );
            const overColumnIndex = columns?.findIndex(
                (col) => col.id === overColumnId
            );
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    return { columns, activeColumn, onDragStart, onDragEnd };
};
