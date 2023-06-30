import React, { useState, ChangeEvent } from "react";

import { Field } from "formik";
import {
  Autocomplete,
  CircularProgress,
  styled,
  TextField
} from "@mui/material";
import { debounce } from "lodash";
import { searchSupplierItemsAutocomplete } from "../utils/utils";

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
};

export const StyledAutocompleteTextField = styled(TextField)({
  "& .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    "&:before": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiAutocomplete-input": {
      padding: 4
    }
  },
  "& .MuiInput-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});
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
    async (_: ChangeEvent<HTMLElement>, newValue) => {
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
      renderOption={(props, option, params) => {
        return (
          <li key={option.value + params.index} {...props}>
            {option.name}
          </li>
        );
      }}
      disableClearable
    />
  );
};

export default SupplierItemAutocompleteField;
