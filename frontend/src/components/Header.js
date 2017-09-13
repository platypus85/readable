import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';

export default function Header() {
  return (
    <div>
      <Navbar color="faded" light toggleable>
        <NavbarBrand href="/">Readable: A React Nanodegree Project</NavbarBrand>
      </Navbar>
    </div>
  )
}