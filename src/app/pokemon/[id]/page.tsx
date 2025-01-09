import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Stat {
  name: string;
  value: number;
}

interface Evolution {
  name: string;
  pokedexId: number;
  image: string;
}

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
  stats: { [key: string]: number };
  evolutions: Evolution[];
  types: Type[];
}

async function fetchPokemon(id: string): Promise<Pokemon> {
  const response = await axios.get(`https://nestjs-pokedex-api.vercel.app/pokemons/${id}`);
  return response.data;
}

export default async function PokemonDetail({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemon(params.id);

  return (
    <div className="container mx-auto p-8 max-w-5xl bg-white rounded-lg shadow-lg">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold text-center mb-6 text-black">{pokemon.name}</h1>

      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* Image du Pokémon */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-72 h-72 object-contain bg-gray-100 rounded-lg shadow-md"
        />

        <div className="flex-1">
          {/* Statistiques */}
          <h2 className="text-2xl font-semibold mb-4 text-black">Statistiques</h2>
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Statistique</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Valeur</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="px-4 py-2 capitalize text-gray-700">{key}</td>
                  <td className="px-4 py-2 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Évolutions et Types sur la même ligne */}
      <div className="mt-8 flex justify-between">
        {/* Évolutions */}
        <div className="flex-1 mr-4">
          <h2 className="text-2xl font-semibold mb-4 text-black">Évolutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pokemon.evolutions.length > 0 ? (
              pokemon.evolutions.map((evolution) => (
                <Link
                  key={evolution.pokedexId}
                  href={`/pokemon/${evolution.pokedexId}`}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <span className="text-lg font-semibold text-gray-800">{evolution.name}</span>
                </Link>
              ))
            ) : (
              <p className="text-black">Aucune évolution disponible</p>
            )}
          </div>
        </div>

        {/* Types */}
        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-semibold mb-4">Types</h2>
          <div className="flex flex-wrap gap-4">
            {pokemon.types.map((type) => (
              <div
                key={type.id}
                className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-lg">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
