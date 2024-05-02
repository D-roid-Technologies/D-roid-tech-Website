import { createSlice } from "@reduxjs/toolkit";
import { AppEntrySliceType, DimensionType } from "../../utils/Types";

const initialState: AppEntrySliceType = {
  showModal: false,
  showToast: false,
  appTitle: "",
  appBody: "",
};
export const AppEntrySlice = createSlice({
  name: "appEntry",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      const showModal = action.payload;
      state.showModal = showModal;
      console.log("getting modal state from App entry slice", showModal);
    },
    updateToast: (state, action) => {
      const showToast = action.payload;
      state.showModal = showToast;
      console.log("getting toast from App entry slice", showToast);
    },
    updateModalContent: (state, action) => {
      const { appTitle, appBody } = action.payload;
      state.appTitle = appTitle;
      state.appBody = appBody;
      console.log(
        "getting modal content from App entry slice",
        appTitle,
        appBody
      );
    },
  },
});

export default AppEntrySlice.reducer;
export const { updateModal, updateToast, updateModalContent } =
  AppEntrySlice.actions;
