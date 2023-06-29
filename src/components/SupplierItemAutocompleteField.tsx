import React, { useState, useRef, ChangeEvent } from "react";

import { Field } from "formik";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { debounce } from "lodash";
import { searchSupplierItemsAutocomplete } from "../utils/utils";

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
};

const FormikAutocomplete = ({
  form,
  loading,
  label,
  field,
  readOnly = false,
  ...props
}) => {
  const { value } = field;
  const { handleChange } = form;

  return (
    <Autocomplete
      {...props}
      sx={{ flex: 1, pointer: "cursor" }}
      options={props.options}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          fullWidth
          label={label}
          sx={readOnly ? autocompleteSx.textField : null}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            // readOnly,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

type Props = {
  name: string;
  label: string;
  setFieldValue: any;
};

const SupplierItemAutocompleteField = ({
  setFieldValue,
  name,
  label
}: Props) => {
  const [supplierItemsOptions, setSupplierItemsOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (_: ChangeEvent<HTMLElement>, newValue, reason) => {
    setFieldValue(name, newValue.data);
  };

  const handleInputChange = debounce(
    async (_: ChangeEvent<HTMLElement>, newValue, reason) => {
      if (newValue) {
        setLoading(true);
        const supplierItems = await searchSupplierItemsAutocomplete(newValue);
        const result = supplierItems.map((supplierItem) => ({
          name: supplierItem.name.toLowerCase(),
          value: supplierItem.objectId,
          data: supplierItem
        }));
        setSupplierItemsOptions(result);
        setLoading(false);
      }
    },
    700
  );

  return (
    <Field
      name={name}
      label={label}
      loading={loading}
      component={FormikAutocomplete}
      options={supplierItemsOptions}
      isOptionEqualToValue={(option, value) =>
        value && option.value === value.objectId
      }
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderOption={(props, option) => {
        return (
          <li key={option.value} {...props}>
            {option.name}
          </li>
        );
      }}
      disableClearable
    />
  );
};

export default SupplierItemAutocompleteField;
