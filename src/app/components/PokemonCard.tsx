import React from 'react';
import Link from 'next/link';

interface Type {
  id: number;
  name: string;
  image: string;
}

interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  types: Type[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`/pokemon/${pokemon.pokedexId}`}>
      <div className="pokemon-card w-48 h-64 p-4 rounded-lg shadow-lg bg-white text-center m-2">
        <img src={pokemon.image} alt={pokemon.name} className="w-full h-32 object-contain mb-2" />
        <p className='text-xs'>#{pokemon.pokedexId}</p>
        <h3 className="text-lg font-bold">{pokemon.name}</h3>
        <div className="flex justify-center mt-2">
          {pokemon.types.map(type => (
            <img key={type.id} src={type.image} alt={type.name} className="w-6 h-6 mx-1" />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;