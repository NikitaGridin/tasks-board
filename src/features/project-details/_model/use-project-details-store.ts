import { create } from 'zustand'

type MessengerStore = {
	selectedBoard: number | null
	setSelectedBoard: (_value: number) => void
	selectedColumn: number | null
	setSelectedColumn: (_value: number) => void
}

export const useProjectDetailsStore = create<MessengerStore>((set) => ({
	selectedBoard: null,
	setSelectedBoard: (selectedBoard) => set({ selectedBoard }),
	selectedColumn: null,
	setSelectedColumn: (selectedColumn) => set({ selectedColumn }),
}))
