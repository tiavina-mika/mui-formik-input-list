import React, { useState useRef } from "react";

import { Field } from "formik";
import {
  Autocomplete,
  CircularProgress,
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

const EditableStepComponent = ({
  setFieldValue,
  name,
  label,
}: Props) => {
  const [supplierItemsOptions, setSupplierItemsOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeAutocomplete = useRef((newValue) => {
    
  }).current;

  const searchingSupplier =  debounce(async (event) => {
      if (event && event.type === "change") {
        setLoading(true);
        const supplierItems = await searchSupplierItemsAutocomplete(
          event.target.value
        );
        const result = supplierItems.map((supplierItem) => ({
            name: supplierItem.name.toLowerCase(),
            value: supplierItem.objectId,
            data: supplierItem,
          }))
        setSupplierItemsOptions(result);
        setLoading(false);
      }
    }, 700)

  return (
    <Field
    name={name}
    label={label}
    loading={loading}
    component={FormikAutocomplete}
    options={supplierItemsOptions}
    isOptionEqualToValue={(option, value) =>
      value && option.value === value.value
    }
    getOptionLabel={(option) => option.name}
    onChange={(_, newValue) => onChangeAutocomplete(newValue)}
    onInputChange={searchingSupplier}

    renderOption={(props, option) => (
      <li
          {...props}
        >
          {option.name}
        </li>
      )}
      disableClearable
    />
  );
};

export default EditableStepComponent;
