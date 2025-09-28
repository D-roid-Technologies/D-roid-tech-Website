// src/app/redux/utils/saved.ts
import { useSelector } from "react-redux";
import { RootState } from "../Store";

export const useIsUserLoggedIn = () => {
    return useSelector((state: RootState) => state.user.isLoggedIn);
};
