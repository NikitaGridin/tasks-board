import { updateColumns } from "@/entity/project/_actions/update-columns";
import { updateTasks } from "@/entity/project/_actions/update-tasks";
import { UpdatedColumn, UpdatedTask } from "@/entity/project/_domain/types";
import { useEffect, useState } from "react";

export const useUpdateAllDetails = ({ boardId }: { boardId: number }) => {
    const [updatedColumns, setUpdatedColumns] = useState<UpdatedColumn[]>([]);

    const [updatedTasks, setUpdatedTasks] = useState<UpdatedTask[]>([]);

    useEffect(() => {
        if (updatedColumns.length > 0) {
            updateColumns({
                boardId,
                columns: updatedColumns,
            });
        }
    }, [updatedColumns]);

    useEffect(() => {
        if (updatedTasks.length > 0) {
            updateTasks({
                boardId,
                tasks: updatedTasks,
            });
        }
    }, [updatedTasks]);

    return {
        setUpdatedColumns,
        setUpdatedTasks,
    };
};
