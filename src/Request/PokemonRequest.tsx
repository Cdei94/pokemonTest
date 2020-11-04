import { Pokemon } from "../Types/PokemonType";

const PokemonRequest = async (baseApiPath: string, pokemonName: string) => {
  const newPokemon: Pokemon = {
    id: 0,
    name: "",
    image: "",
  };
  let result: any = {};
  try {
    result = await (await fetch(baseApiPath + pokemonName)).json();
  } catch (error) {
    console.error(error);
  }

  if (result && result.id && result.name && result.sprites.front_default) {
    newPokemon.id = result.id;
    newPokemon.name = result.name;
    newPokemon.image = result.sprites.front_default;
  } else {
    alert("The pokemon entered could not be found");
  }
  return newPokemon;
};

export default PokemonRequest;
