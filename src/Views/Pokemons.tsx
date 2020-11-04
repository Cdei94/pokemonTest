import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Pokemon, DTPokemons } from "../Types/PokemonType";
import PokemonRequest from "../Request/PokemonRequest";

type FormElement = React.FormEvent<HTMLFormElement>;

const Pokemons = () => {
  const [dtPokemons, SetDtPokemon] = useState<DTPokemons>({
    data: [],
    columns: [],
  });

  const [pokemons, SetPokemon] = useState<Pokemon[]>([]);

  const [pokemonName, SetPokemonName] = useState<string>("");

  const baseApiPath = "https://pokeapi.co/api/v2/pokemon/";

  const CheckPokemonExist = (pokemon: Pokemon) => {
    let exist: boolean = false;
    for (let item of pokemons) {
      if (pokemon.id === item.id) {
        exist = true;
        break;
      }
    }
    return exist;
  };

  useEffect(() => {
    SetDtPokemon({
      data: pokemons.length > 0 ? pokemons : [],
      columns:
        pokemons.length > 0
          ? Object.keys(pokemons[0]).map((key) => {
              if (key === "image") {
                return {
                  cell: (row: any) => <img src={row.image} alt="" />,
                  ignoreRowClick: true,
                  allowOverflow: true,
                  name: key.toUpperCase(),
                  selector: key,
                  sortable: false,
                };
              } else {
                return {
                  name: key.toUpperCase(),
                  selector: key,
                  sortable: true,
                };
              }
            })
          : [],
    });
  }, [pokemons]);

  const ClearPokemons = () => {
    SetDtPokemon({
      data: [],
      columns: [],
    });
    SetPokemon([]);
  };

  const CatchPokemon = async (e: FormElement) => {
    e.preventDefault();
    const newPokemon = await PokemonRequest(baseApiPath, pokemonName);
    if (!CheckPokemonExist(newPokemon)) {
      SetPokemon([...pokemons, newPokemon]);
    } else {
      alert("The pokemon has already been caught");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={(e) => CatchPokemon(e)} className="mt-5">
              <Form.Group>
                <Form.Label>Pokemon Name</Form.Label>
                <Form.Control
                  type="text"
                  id="pokemon-name"
                  onChange={(e) => SetPokemonName(e.target.value)}
                  value={pokemonName}
                  placeholder="Enter the name of the pokemon that you want to catch"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="dark" size="lg" block type="submit">
                    Catch
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    size="lg"
                    block
                    type="button"
                    onClick={() => ClearPokemons()}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {pokemons.length > 0 ? (
              <DataTable
                title="Pokemons"
                columns={dtPokemons.columns}
                data={dtPokemons.data}
              />
            ) : (
              <Alert variant="dark" className="mt-5">
                No Pokemons captured yet
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Pokemons;
