import React, { forwardRef } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  FormikProps
} from "formik";
import { Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IProductFormValues } from "../types/product.type";

const FormikTextField = ({ field, ...props }) => (
  <TextField {...field} {...props} />
);

const initialValues: IProductFormValues = {
  products: [
    {
      product: null,
      quantity: null
    }
  ]
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
      // onSubmit={async (values) => {
      //   await new Promise((r) => setTimeout(r, 500));
      //   alert(JSON.stringify(values, null, 2));
      // }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="products">
            {({ insert, remove, push }) => (
              <Stack spacing={3}>
                {values.products.length > 0 &&
                  values.products.map((_, index: number) => (
                    <Grid container key={index}>
                      <Grid item xs={7}>
                        <Field
                          name={`products.${index}.product`}
                          type="text"
                          label="Produit"
                          component={FormikTextField}
                        />
                        <ErrorMessage
                          name={`products.${index}.product`}
                          component="div"
                          className="field-error"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name={`products.${index}.quantity`}
                          type="quantity"
                          component={FormikTextField}
                          label="Quantité"
                        />
                        <ErrorMessage
                          name={`products.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </Grid>
                      <Grid item xs={1} className="flexCenter">
                        <div className="flexCenter ">
                          <IconButton
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
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
