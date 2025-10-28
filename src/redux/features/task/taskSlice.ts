// import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
// import type { RootState } from "@/redux/middlewares/store";
// import type { ITask } from "@/types";

// // ✅ Types
// interface InitialState {
//   tasks: ITask[];
//   filter: "all" | "high" | "medium" | "low";
// }

// type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority" | "userId">;

// // ✅ Initial State
// const initialState: InitialState = {
//   tasks: [
//     {
//       id: "y5e8RmNErHRyj6cdkRpyg",
//       title: "Pariatur Et consequ",
//       description: "Dolores et sunt in v",
//       dueDate: "2025-07-29T18:00:00.000Z",
//       priority: "high",
//       isCompleted: false,
//       userId: null,
//     },
//   ],
//   filter: "all",
// };

// // ✅ Helper Function
// const createTask = (taskData: DraftTask): ITask => ({
//   ...taskData,
//   id: nanoid(),
//   isCompleted: false,
//   userId: taskData.userId ?? null,
// });

// // ✅ Slice
// const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     // ➕ Add Task
//     addTask: (state, action: PayloadAction<DraftTask>) => {
//       state.tasks.push(createTask(action.payload));
//     },

//     // ✅ Toggle Complete
//     toggleCompleteState: (state, action: PayloadAction<string>) => {
//       const task = state.tasks.find((t) => t.id === action.payload);
//       if (task) task.isCompleted = !task.isCompleted;
//     },

//     // 🗑️ Delete Task
//     deleteTask: (state, action: PayloadAction<string>) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },

//     // 🎯 Filter Task
//     filterTask: (state, action: PayloadAction<InitialState["filter"]>) => {
//       state.filter = action.payload;
//     },
//   },

//   // Example (when deleting user, clear tasks)
//   // extraReducers: (builder) => {
//   //   builder.addCase(removeUser, (state, action) => {
//   //     state.tasks.forEach(task => {
//   //       if (task.userId === action.payload) task.userId = null;
//   //     });
//   //   });
//   // },
// });


// // ✅ Selectors
// export const selectTask = (state: RootState) => {
//   const { tasks, filter } = state.task;

//   if (filter === "all") return tasks;
//   return tasks.filter((task) => task.priority === filter);
// };

// export const selectFilter = (state: RootState) => state.task.filter;

// // ✅ Export Actions & Reducer
// export const { addTask, toggleCompleteState, deleteTask, filterTask } = taskSlice.actions;
// export default taskSlice.reducer;
