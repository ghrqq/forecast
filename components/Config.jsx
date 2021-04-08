import React from "react";
import Radio from "@material-ui/core/Radio";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { typeSetter } from "../redux/features/configSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Config() {
  const { short } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(typeSetter());
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
      <FormControlLabel
        value="Fahrenheit"
        control={
          <Radio
            checked={short === "F"}
            onChange={handleChange}
            value="F"
            color="default"
            name="radio-button-demo"
          />
        }
        label="Fahrenheit"
      />
      <FormControlLabel
        value="Celsius"
        control={
          <Radio
            checked={short === "C"}
            onChange={handleChange}
            value="C"
            color="default"
            name="radio-button-demo"
          />
        }
        label="Celcius"
      />
    </Container>
  );
}
