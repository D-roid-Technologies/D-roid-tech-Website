import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import "../allstaffs/AllStaff.css";
import { Assets } from "../../../../utils/constant/Assets";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import AppInput from "../../../components/textInput/AppInput";
import Button from "../../../components/button/Button";

const AllStaffs: React.FunctionComponent<any> = () => {
  const dimension = useSelector((state: RootState) => state.dimension);
  const height = dimension.height;
  const width = dimension.width;
  console.log(height - 60);
  const day = new Date();

  const formattedDate = `${day.getDate()}/${
    day.getMonth() + 1
  }/${day.getFullYear()}`;
  const formattedTime = `${day.getHours()}:${day.getUTCMinutes()}:${day.getSeconds()}`;

  return (
    <div>
      <NavBar />
      <div
        className="all-staff-main"
        style={{
          height: height - 100,
          backgroundImage: `url("${Assets.images.staffBg}")`,
        }}
      >
        <div className="all-staff-inner">
          <div className="select-staff">
            <div className="">
              <p className="input-text">Kindly input your Staff ID</p>
            </div>
            <div className="input-and-button">
              <AppInput
                pHolder={"Staff ID"}
                h={50}
                w="100%"
                pLeft={20}
                bRadius={5}
              />
              <div className="btn">
              <Button
                bgColor={"#282A94"}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                onClickButton={() => {}}
                title="Proceed"
                color={Assets.colors.light}
              />
              </div>
            </div>
          </div>
          {/* {formattedDate}
        {formattedTime} */}
        </div>
      </div>
    </div>
  );
};

export default AllStaffs;
