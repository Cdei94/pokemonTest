import PokemonRequest from "../Request/PokemonRequest";
import { Pokemon } from "../Types/PokemonType";
const baseApiPath = "https://pokeapi.co/api/v2/pokemon/";
const PokemonName = "charmander";

test("The API is online and Charizard could be found", async () => {
  const received = await PokemonRequest(baseApiPath, PokemonName);
  const expected: Pokemon = {
    id: 4,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    name: "charmander",
  };
  expect(received).toStrictEqual(expected);
});
