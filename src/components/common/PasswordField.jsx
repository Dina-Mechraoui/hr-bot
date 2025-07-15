"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Eye, EyeOff } from "@deemlol/next-icons";

export default function PasswordField({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      type={showPassword ? "text" : "password"}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility} edge="end">
              {showPassword ? <Eye /> : <EyeOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
