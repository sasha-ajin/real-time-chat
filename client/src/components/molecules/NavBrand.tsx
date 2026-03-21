import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface NavBrandProps {
  text: string;
}

export function NavBrand({ text }: NavBrandProps) {
  return (
    <>
      <Navbar.Brand as={Link} to="/">{text}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </>
  );
}
