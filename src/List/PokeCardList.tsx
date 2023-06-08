import styled from "@emotion/styled";
import { PokeCard } from "./PokeCard";
import {
  PokemonListResponseType,
  fetchPokemons,
} from "../Service/pokemonService";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const List = styled.ul`
  padding: 0;
  margin: 0 0 32px 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListContainer = styled.div`
  margin-left: 0 auto;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const LoadingImage = styled.img`
  margin: 25px;
  width: 200px;
`;

export const PokeCardList = () => {
  const [pokemons, setPokemons] = useState<PokemonListResponseType>({
    count: 0,
    next: "",
    results: [],
  });

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      const morePokemons = await fetchPokemons(pokemons.next);
      setPokemons({
        ...morePokemons,
        results: [...pokemons.results, ...morePokemons.results],
      });
    },
    disabled: false,
    rootMargin: "0px 0px 0px 0px",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const pokemons = await fetchPokemons();
      setPokemons(pokemons);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (pokemons.results.length === 0) {
    return (
      <ListContainer>
        <List>
          <LoadingImage
            src="https://i.namu.wiki/i/YGWPqZiWe2tAWHNcNlARMQ71LWuIuSRxkigcdOgsQ4kP8Je0Fdq8UGuoLRN_1e65foPl3oYHwtJ5QaCQnQZQYw.gif"
            alt="피카츄"
          />
        </List>
      </ListContainer>
    );
  }

  return (
    <>
      <ListContainer>
        <List>
          {pokemons.results.map((pokemon, idx) => {
            return (
              <PokeCard
                key={`${pokemon.name}_${idx}`}
                name={pokemon.name}
              ></PokeCard>
            );
          })}
        </List>
      </ListContainer>
      <Loading ref={infiniteRef}>
        <LoadingImage
          src="https://i.namu.wiki/i/YGWPqZiWe2tAWHNcNlARMQ71LWuIuSRxkigcdOgsQ4kP8Je0Fdq8UGuoLRN_1e65foPl3oYHwtJ5QaCQnQZQYw.gif"
          alt="피카츄"
        />
      </Loading>
    </>
  );
};
