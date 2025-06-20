import { configureStore } from '@reduxjs/toolkit'
import favoritosReducer from './favoritos'
import carritoReducer from './carrito'

const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || []
const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []

export const store = configureStore({
  reducer: {
    favoritos: favoritosReducer,
    carrito: carritoReducer,
  },
  preloadedState: {
    favoritos: favoritosGuardados,
    carrito: carritoGuardado,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('favoritos', JSON.stringify(state.favoritos));
  localStorage.setItem('carrito', JSON.stringify(state.carrito));
});