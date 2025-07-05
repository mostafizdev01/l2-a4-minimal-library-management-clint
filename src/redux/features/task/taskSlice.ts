import type { RootState } from '@/redux/middlewares/store';
import type { ITask } from './../../../types';
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';


interface InitialState {
    tasks: ITask[];
    filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
    tasks: [
        {
            id: "y5e8RmNErHRyj6cdkRpyg",
            isCompleted: false,
            title: "Pariatur Et consequ",
            description: "Dolores et sunt in v",
            dueDate: "2025-07-29T18:00:00.000Z",
            priority: "high",
            userId: null
        }
    ],
    filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority" | "userId">;

const crateTask = (taskData: DraftTask): ITask => {
    return { ...taskData, id: nanoid(), isCompleted: false, userId: taskData.userId ? taskData.userId : null }
}

const teskSlice = createSlice({
    name: "task",
    initialState,
    reducers: { /// how to works
        addTask: (state, action: PayloadAction<ITask>) => {

            const taskData = crateTask(action.payload)

            // way --02
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // }
            state.tasks.push(taskData)
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            state.tasks.forEach((task) => task.id === action.payload ? (task.isCompleted = !task.isCompleted) : task)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        filterTask: (state, action: PayloadAction<"all" | "high" | "medium" | "low">) => {
            state.filter = action.payload;
        }
    }, 
    // extraReducers: (builder)=> { /// when we are delete user. then call extraReducer function
    //     builder.addCase(removeUser, (state, action)=> {  // removeUser is userSlice action name.
    //         state.tasks.forEach(task) => task.userId === action.payload ? (task.userId = null) : task
    //     })
    // }
})

export const selectTask = (state: RootState) => { // set types and find task data in store
    const filter = state.task.filter;
    const allTask = state.task.tasks;
    if (filter === "low") {
        return allTask.filter(task => task.priority === "low")
    }
    else if (filter === "medium") {
        return allTask.filter(task => task.priority === "medium")
    }
    else if (filter === "high") {
        return allTask.filter(task => task.priority === "high")
    }
    else {
        return allTask
    }

}

export const selectFilter = (state: RootState) => {
    return state.task.filter
}

export const { addTask, toggleCompleteState, deleteTask, filterTask } = teskSlice.actions

export default teskSlice.reducer;