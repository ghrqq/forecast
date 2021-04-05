import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { focusMover } from "../redux/features/dataSlice";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Arrows() {
  const { length, focus } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  return (
    <div>
      {focus - 1 < 0 ? null : (
        <ArrowBackIcon
          onClick={() => dispatch(focusMover({ direction: -1 }))}
        />
      )}
      {focus + 1 == length ? null : (
        <ArrowForwardIcon
          onClick={() => dispatch(focusMover({ direction: +1 }))}
        />
      )}
    </div>
  );
}
