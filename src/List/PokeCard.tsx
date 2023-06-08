import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PokemonInfoType, fetchPokemonInfo } from "../Service/pokemonService";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { RootState } from "../Store";
import { useSelector } from "react-redux";

const Item = styled.li<{ color?: string }>`
  border: 1px solid #c0c0c0;
  width: 250px;
  height: 300px;
  box-shadow: 1px 1px 3px 1px #d3d3d3;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }

  display: flex;
  flex-direction: column;
`;

const Header = styled.section`
  display: flex;
  margin: 8px;
`;

const Chip = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  font-weight: bold;
  box-shadow: 0cap.5px 0.5px 0 0 #c0c0c0;
  font-size: 14px;
  margin: 10px;
`;

const Number = styled.span<{ color?: string }>`
  border-radius: 16px;
  background-color: ${(props) => props.color};
  padding: 0 6px;
  color: #c0c0c0;
`;

const Name = styled.span`
  padding: 0 6px;
`;

const Body = styled.section`
  display: flex;
  justify-content: center;
  margin: 8px;
  img {
    width: 150px;
    height: 180px;
  }
`;

const LoadingIcon = styled.div`
  width: 150px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #ffce09;
`;

const Footer = styled.section`
  margin: 16px 16px 0 0;
  margin-left: auto;
  padding: 0 8px;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
`;

interface PokeCardProps {
  name: string;
}

export const PokeCard = (props: PokeCardProps) => {
  const [pokemons, setPokemons] = useState<PokemonInfoType | null>();
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const imageType = useSelector((state: RootState) => state.imageType.type);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    (async () => {
      const response = await fetchPokemonInfo(props.name);
      setPokemons(response);
    })();
  }, [props.name, isVisible]);

  if (!pokemons) {
    return (
      <Item ref={ref}>
        <Header>
          <Chip>
            <Number>000</Number>
            <Name>포켓몬</Name>
          </Chip>
        </Header>
        <Body>
          <LoadingIcon>
            <BsFillPatchQuestionFill />
          </LoadingIcon>
        </Body>
        <Footer>Pokémon</Footer>
      </Item>
    );
  }

  return (
    <Item onClick={handleCardClick} color={pokemons?.color} ref={ref}>
      <Header>
        <Chip>
          <Number color={pokemons?.color}>
            {String(pokemons?.id).padStart(3, "0")}
          </Number>
          <Name>{pokemons?.koreanName}</Name>
        </Chip>
      </Header>
      <Body>
        <img src={pokemons?.images[imageType]} alt={pokemons?.name}></img>
      </Body>
      <Footer>Pokémon</Footer>
    </Item>
  );
};
