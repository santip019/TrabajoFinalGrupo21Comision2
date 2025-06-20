import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    agregarAlCarrito: (state, action) => {
      const producto = action.payload;
      const existe = state.find(item => item.id === producto.id);
      if (!existe) {
        state.push({ ...producto, cantidad: 1 });
      }
    },
    quitarDelCarrito: (state, action) => {
      const id = action.payload;
      return state.filter(item => item.id !== id);
    },
    vaciarCarrito: () => [],
    cambiarCantidad: (state, action) => {
      const { id, cantidad } = action.payload;
      const producto = state.find(item => item.id === id);
      if (producto) {
        producto.cantidad = cantidad;
      }
    }
  },
});

export const {
  agregarAlCarrito,
  quitarDelCarrito,
  vaciarCarrito,
  cambiarCantidad,
} = carritoSlice.actions;

export default carritoSlice.reducer;