import axios from "axios";

export interface PokemonListResponseType {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const fetchPokemons = async (nextUrl?: string) => {
  const requestUrl = nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon";
  const response = await axios.get<PokemonListResponseType>(requestUrl);
  return response.data;
};

interface PokemonInfoResponseType {
  id: number;
  weight: number;
  height: number;
  name: string;
  koreanName: string;
  color: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonSpeciesResponseType {
  color: {
    name: string;
  };
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonInfoType {
  id: number;
  name: string;
  koreanName: string;
  color: string;
  height: number;
  weight: number;
  types: string[];
  images: {
    frontDefault: string;
    dreamWorldFront: string;
    officialAtworkFront: string;
  };

  baseStats: {
    name: string;
    value: number;
  }[];
}

export const fetchPokemonInfo = async (
  name: string
): Promise<PokemonInfoType> => {
  const PokemonInfoUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await axios.get<PokemonInfoResponseType>(PokemonInfoUrl);
  const info = response.data;

  const speciesResponseUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  const speciesResponse = await axios.get<PokemonSpeciesResponseType>(
    speciesResponseUrl
  );
  const species = speciesResponse.data;

  return {
    id: info.id,
    name: info.name,
    koreanName:
      species.names.find((item) => item.language.name === "ko")?.name ??
      info.name,
    color: species.color.name,
    height: info.height / 10,
    weight: info.weight / 10,
    types: info.types.map((item) => item.type.name),
    images: {
      frontDefault: info.sprites.front_default,
      dreamWorldFront: info.sprites.other.dream_world.front_default,
      officialAtworkFront: info.sprites.other["official-artwork"].front_default,
    },
    baseStats: info.stats.map((item) => {
      return {
        name: item.stat.name,
        value: item.base_stat,
      };
    }),
  };
};
