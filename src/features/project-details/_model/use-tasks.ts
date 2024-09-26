import { useGetTasks } from '@/entity/project/project'

export const useTasks = ({ columnId }: { columnId: number }) => {
	const { data, isError, isLoading } = useGetTasks({ columnId })

	
	return { data, isError, isLoading}
}
