import { Navbar } from 'flowbite-react';

/**
 * Component JSX that render Nav Homepage
 * @returns {JSX.Element} - return Nav Homepage
 */

function Nav(): JSX.Element {
  return (
    <div className="sticky top-0 z-[9999] shadow-sm">
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Planilhas SIAFI-EFD
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active href="/">
            <p className="text-lg">Home</p>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;