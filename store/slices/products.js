import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    add: (products, action) => {
      console.log('Product added');
    },
    edit: (products, action) => {
      console.log('Product edited');
    },
    remove: (products, action) => {
      console.log('Product deleted');
    },
    restock: (products, action) => {
      console.log('Restocked products');
    },
  },
});

export default productSlice.reducer;
export const { add, remove, restock, edit } = productSlice.actions;
