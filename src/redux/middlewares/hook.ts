import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>() /// define type on data
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// export const useUserSelector = useSelector.withTypes<RootState>() /// define type on data
// export const useUserDispatch = useDispatch.withTypes<AppDispatch>()