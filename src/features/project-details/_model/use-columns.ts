import { useGetColumns } from '@/entity/project/project'

export const useColumns = ({ boardId }: { boardId: number }) => {
	const { data, isError, isLoading } = useGetColumns({ boardId })

	return { data, isError, isLoading }
}
