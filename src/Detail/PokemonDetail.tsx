import styled from "@emotion/styled";
import { PokemonInfoType, fetchPokemonInfo } from "../Service/pokemonService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../Store";
import { useSelector } from "react-redux";

const Container = styled.section`
  border: 1px solid #c0c0c0;
  margin: 16px 32px;
  border-radius: 16px;
  box-shadow: 1px 1px 1px 1px #c0c0c0;
`;

const ImageContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 32px;
  margin: 8px;
`;

const Image = styled.img`
  width: 350px;
`;

const Divider = styled.hr`
  margin: 32px;
  border-style: none;
  border-top: 1px dashed #d3d3d3;
`;

const Body = styled.section`
  margin: 0 32px;
`;

const Table = styled.table`
  white-space: nowrap;
  border-collapse: collapse;

  tr,
  th,
  td {
    text-align: left;
    border-width: 1px 0;
    border-style: solid;
    border-color: #f0f0f0;
    padding: 8px;
  }

  th {
    color: #a0a0a0;
  }

  td {
    width: 100%;
  }
`;

const Footer = styled.section`
  display: flex;
  margin: 24px 12px;
`;

const PokemonChip = styled.span`
  margin: 16px 16px 0 0;
  margin-left: auto;
  padding: 0 8px;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
`;

export const PokemonDetail = () => {
  const { name } = useParams();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const [pokemons, setPokemons] = useState<PokemonInfoType | null>();

  useEffect(() => {
    if (!name) {
      return;
    }

    (async () => {
      const response = await fetchPokemonInfo(name);
      setPokemons(response);
    })();
  }, [name]);

  if (!name) {
    return null;
  }

  return (
    <>
      <Container>
        <ImageContainer>
          <Image
            src={pokemons?.images[imageType]}
            alt={pokemons?.koreanName}
          ></Image>
        </ImageContainer>
        <Divider />
        <Body>
          <h2>기본 정보</h2>
          <Table>
            <tbody>
              <tr>
                <th>번호</th>
                <td>{pokemons?.id}</td>
              </tr>
              <tr>
                <th>이름</th>
                <td>{`${pokemons?.koreanName} (${pokemons?.name})`}</td>
              </tr>
              <tr>
                <th>타입</th>
                <td>{pokemons?.types.toString()}</td>
              </tr>
              <tr>
                <th>키</th>
                <td>{pokemons?.height} m</td>
              </tr>
              <tr>
                <th>몸무게</th>
                <td>{pokemons?.weight} kg</td>
              </tr>
            </tbody>
          </Table>
          <h2>능력치</h2>
          <Table>
            <tbody>
              {pokemons?.baseStats.map((stat) => {
                return (
                  <tr key={stat.name}>
                    <th>{stat.name}</th>
                    <td>{stat.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Body>
        <Footer>
          <PokemonChip>Pokémon</PokemonChip>
        </Footer>
      </Container>
    </>
  );
};
