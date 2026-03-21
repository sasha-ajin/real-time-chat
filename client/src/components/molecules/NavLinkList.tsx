import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink } from 'react-router-dom';

export interface NavLink {
  to: string;
  text: string;
}

export interface NavLinkListProps {
  items: NavLink[];
}

export function NavLinkList({ items }: NavLinkListProps) {
  return (
    <Nav className="me-auto">
      {items.map((item) => (
        <Nav.Link as={RouterNavLink} key={item.to} to={item.to}>
          {item.text}
        </Nav.Link>
      ))}
    </Nav>
  );
}
