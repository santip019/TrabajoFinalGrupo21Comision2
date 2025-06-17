import { configureStore } from '@reduxjs/toolkit';
import favoritosReducer from './favoritos';

const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];

export const store = configureStore({
  reducer: {
    favoritos: favoritosReducer,
  },
  preloadedState: {
    favoritos: favoritosGuardados,
  },
});

// Suscribirse para guardar cambios automáticamente
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('favoritos', JSON.stringify(state.favoritos));
});