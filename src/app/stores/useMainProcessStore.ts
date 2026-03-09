import { create } from "zustand";

interface mainProcessStore {
    process:number;
    setProcess: (process: number) => void;
    optionArr: {id:string; type:string; title:string}[];
    setOptionArr: (id:string, type:string, title:string) => void;
    removeOptionArr: (id:string) => void;
    selectPersonnel: (id:string, type:string, title:string) => void;
    optionClean: (step:number) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const useMainProcessStore = create<mainProcessStore>((set, get) => ({
    process: 0,
    setProcess: (process: number) => {
        set((state: {process: number}) => ({
            process: (state.process = process),
        }));
    },
    optionArr: [],
    setOptionArr: (id:string, type:string, title:string) => {
        const optionArr = get().optionArr;
        if (type === 'M') {
            const mCount = optionArr.filter(item => item.type === 'M').length;
            if (mCount >= 2) {
                alert('최대 2개까지 선택 가능합니다.');
                return; 
            }
        }

        if (type === 'G') {
            const gCount = optionArr.filter(item => item.type === 'G').length;
            if (gCount >= 3) {
                alert('최대 3개까지 선택 가능합니다.');
                return; 
            }
        }
        set((state) => ({
            optionArr: [...state.optionArr, { id, type, title }],
        }));
    },
    removeOptionArr: (id:string) => {
        set((state) => ({
            optionArr: state.optionArr.filter((arr) => arr.id !== id),
        }));
    },
    selectPersonnel: (id: string, type: string, title: string) => {
        set(() => ({
            optionArr: [{ id, type, title }],
        }));
    },
    optionClean: (step: number) => {
        set({process: step});
        set({optionArr: []});
    },
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {
        set((state: {isLoading: boolean}) => ({
            isLoading: (state.isLoading = isLoading),
        }));
    },
}));

export default useMainProcessStore;
export type { mainProcessStore };