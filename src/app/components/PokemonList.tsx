"use client"
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import Navbar from './Navbar';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: Type[];
}

interface Type {
  id: number;
  name: string;
  image: string;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [types, setTypes] = useState<Type[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get('https://nestjs-pokedex-api.vercel.app/types');
      setTypes(response.data);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsFetching(true);
      const response = await axios.get('https://nestjs-pokedex-api.vercel.app/pokemons', {
        params: { page, limit }
      });
      setPokemons(prevPokemons => {
        const newPokemons = response.data.filter((newPokemon: Pokemon) => 
          !prevPokemons.some(pokemon => pokemon.id === newPokemon.id)
        );
        return page === 1 ? newPokemons : [...prevPokemons, ...newPokemons];
      });
      setIsFetching(false);
    };
    fetchPokemons();
  }, [page, limit]);

  useEffect(() => {
    setPokemons([]);
    setPage(1);
  }, [limit]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (typeFilter
          ? pokemon.types.some((type) => type.id === parseInt(typeFilter))
          : true)
    );
  }, [pokemons, nameFilter, typeFilter]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Navbar
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        limit={limit}
        setLimit={setLimit}
        types={types}
      />
      <div className="flex flex-wrap justify-center">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;