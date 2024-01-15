import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";

const InputField = ({
  type,
  others,
  autoFocus,
  title,
  value,
  onChange,
  multiline,
  rows,
  text,
  fromAskQuestion,
  placeholder,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={fromAskQuestion ? 18 : 16} fontWeight="bold">
        {title}
      </Typography>
      <Typography fontSize={fromAskQuestion && 15} color="secondary">
        {text}
      </Typography>
      <TextField
        type={type}
        name={others}
        id={others}
        autoFocus={autoFocus}
        placeholder={fromAskQuestion ? placeholder : title}
        value={value}
        onChange={onChange}
        required
        multiline={multiline}
        rows={rows}
      />
    </FormControl>
  );
};

export default InputField;
