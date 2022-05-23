import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  const isError = false;
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField fullWidth label={label} required={required} {...field} />
        )}
        name={name}
        error={isError}
        control={control}
      />
    </Grid>
  );
};

export default FormInput;
