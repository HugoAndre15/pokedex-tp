import React from 'react';

interface Type {
  id: number;
  name: string;
}

interface NavbarProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  types: Type[];
}

const Navbar: React.FC<NavbarProps> = ({
  nameFilter,
  setNameFilter,
  typeFilter,
  setTypeFilter,
  limit,
  setLimit,
  types,
}) => {
  return (
    <div className="navbar gap-10 flex flex-wrap items-center p-4 bg-red-500 text-white shadow-md rounded-lg mb-6">
      {/* Input pour filtrer par nom */}
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="p-2 rounded-lg text-black shadow-md"
      />

      {/* Sélecteur pour filtrer par type */}
      <select
        onChange={(e) => setTypeFilter(e.target.value)}
        value={typeFilter}
        className="p-2 rounded-lg text-black shadow-md"
      >
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      {/* Sélecteur pour limiter les résultats */}
      <select
        onChange={(e) => setLimit(Number(e.target.value))}
        value={limit}
        className="p-2 rounded-lg text-black shadow-md"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Navbar;
