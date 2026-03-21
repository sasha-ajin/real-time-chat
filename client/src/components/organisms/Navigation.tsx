import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { NavBrand } from 'components/molecules/NavBrand';
import { NavLinkList, NavLinkListProps } from 'components/molecules/NavLinkList';

const NAV_ITEMS: NavLinkListProps['items'] = [
  { to: '/threads', text: 'Threads' },
  { to: '/search-users', text: 'Search Users' },
];

export function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavBrand text="Real Time Chat" />
        <Navbar.Collapse>
          <NavLinkList items={NAV_ITEMS} />
          <Button variant="outline-danger" onClick={() => {}}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
