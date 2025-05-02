import React from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { PokedexProvider } from './contexts/PokedexContext';
import Router from './router/Router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <PokedexProvider>
        <AppBar position="static" style={{ backgroundColor: '#ef5350' }}>
          <Toolbar>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
              alt="Pokedex Logo"
              style={{ height: '40px', marginRight: '16px' }}
            />
            <Typography variant="h6">Enhanced Pokedex Explorer</Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ py: 4 }}>
          <Router />
        </Container>
      </PokedexProvider>
    </ErrorBoundary>
  );
}

export default App;