import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { POKEMON_IMAGE_TYPE } from "../Constans";
import { RootState, useAppDispatch } from "../Store";
import { useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { PokemonImageKeyType, changeImageType } from "../Store/imageTypeSlice";

const Header = styled.nav`
  padding: 16px 32px;
  margin-bottom: 16px;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  color: #ffce09;
  text-shadow: -1px 0 #3166bd, 0 2px #3166bd, 1px 0 #3166bd, 0 -1px #3166bd;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
`;

export const PageHeader = () => {
  const type = useSelector((state: RootState) => state.imageType.type);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeImageType({
        type: e.target.value as PokemonImageKeyType,
      })
    );
  };

  return (
    <>
      <Header>
        <Title>
          <Link to="/">Pokémon</Link>
        </Title>
        <Select value={type} onChange={handleChange}>
          <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>Official</option>
          <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>DreamWorld</option>
          <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>FrontDefault</option>
        </Select>
      </Header>
    </>
  );
};
