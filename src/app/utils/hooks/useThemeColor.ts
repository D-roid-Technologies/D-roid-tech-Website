import { useDispatch, useSelector } from "react-redux";
import { Assets } from "../constant/Assets";
import { RootState } from "../../redux/Store";
import { toggleTheme as toggleThemeAction } from "../../redux/slices/ThemeSlice";

export const useThemeColor = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector((state: RootState) => state.theme);

    const getColor = (colorName: string) => {
        return isDarkMode ? Assets.colors[`dark${colorName}` as keyof typeof Assets.colors] : Assets.colors[`${colorName}` as keyof typeof Assets.colors];
    };

    const toggleTheme = () => {
        dispatch(toggleThemeAction());
    };

    return { getColor, toggleTheme , isDarkMode};
};