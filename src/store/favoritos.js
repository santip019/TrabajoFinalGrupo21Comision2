import { createSlice } from '@reduxjs/toolkit';

const favoritos = createSlice({
  name: 'favoritos',
  initialState: [],
  reducers: {
    toggleFavorito: (state, action) => {
      const productoId = action.payload;
      const index = state.indexOf(productoId);
      if (index !== -1) {
        state.splice(index, 1); // lo quita
      } else {
        state.push(productoId); // lo agrega
      }
    },
  },
});

export const { toggleFavorito } = favoritos.actions;
export default favoritos.reducer;