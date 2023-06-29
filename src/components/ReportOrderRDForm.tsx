import React, { forwardRef } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  FormikProps
} from "formik";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { IProductFormValues } from "../types/product.type";
import { ReportOrderRDSchema } from "../utils/validations/ordersvalidations";
import SupplierItemAutocompleteField from "./SupplierItemAutocompleteField";

const FormikTextField = ({ field, ...props }) => (
  <TextField {...field} {...props} />
);

const initialValues: IProductFormValues = {
  products: []
};

type Props = {
  onSubmit: (values: IProductFormValues) => void;
};
const ReportOrderRDForm = forwardRef<FormikProps<IProductFormValues>, Props>(
  ({ onSubmit }, ref) => (
    <Formik
      initialValues={initialValues}
      innerRef={ref}
      onSubmit={onSubmit}
      validationSchema={ReportOrderRDSchema}
      // onSubmit={async (values) => {
      //   await new Promise((r) => setTimeout(r, 500));
      //   alert(JSON.stringify(values, null, 2));
      // }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="products">
            {({ remove, push }) => (
              <Stack spacing={3}>
                {values.products.length > 0 &&
                  values.products.map((_, index: number) => (
                    <Grid container spacing={4} key={index}>
                      <Grid item xs={8}>
                        <Stack spacing={1}>
                          <SupplierItemAutocompleteField
                            name={`products.${index}.product`}
                            label="Produit"
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name={`products.${index}.product`}
                            render={(message: string) => (
                              <FormHelperText error>{message}</FormHelperText>
                            )}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={3}>
                        <Stack spacing={1}>
                          <Field
                            name={`products.${index}.quantity`}
                            component={FormikTextField}
                            label="Quantité"
                            type="number"
                            variant="standard"
                          />
                          <ErrorMessage
                            name={`products.${index}.quantity`}
                            render={(message: string) => (
                              <FormHelperText error>{message}</FormHelperText>
                            )}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={1} sx={{ position: "relative" }}>
                        <IconButton
                          type="button"
                          onClick={() => remove(index)}
                          sx={{ position: "absolute", bottom: 0 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                <div>
                  <Button
                    onClick={() => push({ name: "", email: "" })}
                    variant="text"
                    startIcon={<AddIcon />}
                    sx={{ textTransform: "initial" }}
                  >
                    Ajouter un produit
                  </Button>
                </div>
              </Stack>
            )}
          </FieldArray>
          {/* <button type="submit">Invite</button> */}
        </Form>
      )}
    </Formik>
  )
);

export default ReportOrderRDForm;
