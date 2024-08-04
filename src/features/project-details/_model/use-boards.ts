import { useGetBoards } from '@/entity/project/project'

export const useBoards = ({ projectId }: { projectId: number }) => {
	const { data, isError, isLoading } = useGetBoards({ projectId })

	return { data, isError, isLoading }
}
