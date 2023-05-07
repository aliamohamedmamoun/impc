import React from 'react';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/impc.png"
            alt="Picture of the author"
            width={200}
            height={50}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
