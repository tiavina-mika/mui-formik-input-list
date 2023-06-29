import { supplierItems } from "./data/supplierItems";

export const searchSupplierItemsAutocomplete = (search: string) => {
  const newSupplierItems = supplierItems.filter((supplierItem) =>
    supplierItem.name.toLocaleLowerCase().includes(search)
  );
  return newSupplierItems;
};
