import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { useAppSelector } from 'store/store';

export interface NavLink {
  to: string;
  text: string;
  private?: boolean;
}

export interface NavLinkListProps {
  items: NavLink[];
}

export function NavLinkList({ items }: NavLinkListProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Nav className="me-auto">
      {items
        .filter((item) => !item.private || isAuthenticated)
        .map((item) => (
          <Nav.Link as={RouterNavLink} key={item.to} to={item.to}>
            {item.text}
          </Nav.Link>
        ))}
    </Nav>
  );
}
