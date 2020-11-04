import React from "react";
import { Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/pokemons" style={{ color: "#fff" }}>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Clic here to catch your pokemons
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarComponent;
