import create from 'zustand'

const useStore = create((set) => ({
	selectedProjectId: null,
	selectedColumnId: null,

	setSelectedProjectId: (projectId: any) =>
		set({ selectedProjectId: projectId }),
	setSelectedColumnId: (columnId: any) => set({ selectedColumnId: columnId }),
}))

export default useStore
