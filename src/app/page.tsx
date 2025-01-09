import React from 'react';
import PokemonList from './components/PokemonList';

export default function Home() {
  return (
    <div className="container mx-auto p-4 text-black bg-red-500">
      <h1 className="text-2xl font-bold mb-4">Pokédex</h1>
      <PokemonList />
    </div>
  );
}