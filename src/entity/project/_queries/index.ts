import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBoards } from '../_actions/get-boards'
import { getColumns } from '../_actions/get-columns'
import { getTasks } from '../_actions/get-tasks'
import { getUserProjects } from '../project.server'

const userProjects = 'userProjects'
const boards = 'boards'
const columns = 'columns'
const tasks = 'tasks'

export function useUserProjects() {
	return useQuery({
		queryKey: [userProjects],
		queryFn: () => getUserProjects(),
	})
}
export function useInvalidateUserProjects() {
	const queryClient = useQueryClient()
	return () =>
		queryClient.invalidateQueries({
			queryKey: [userProjects],
		})
}

export function useGetBoards({ projectId }: { projectId: number }) {
	return useQuery({
		queryKey: [boards, projectId],
		queryFn: () => getBoards({ projectId }),
	})
}
export function useGetColumns({ boardId }: { boardId: number }) {
	return useQuery({
		queryKey: [columns, boardId],
		queryFn: () => getColumns({ boardId }),
	})
}

export function useGetTasks({ columnId }: { columnId: number }) {
	return useQuery({
		queryKey: [tasks, columnId],
		queryFn: () => getTasks({ columnId }),
	})
}
export function useInvalidateTasks() {
	const queryClient = useQueryClient()
	return ({ columnId }: { columnId: number }) =>
		queryClient.invalidateQueries({
			queryKey: [tasks, columnId],
		})
}
