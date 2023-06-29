interface IProduct {
  product: Record<string, any> | null;
  quantity: number | null;
}
export interface IProductFormValues {
  products: IProduct[];
}
