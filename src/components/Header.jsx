import { Navbar } from './styled';
import { Link } from 'wouter';

const Header = () => (
  <Navbar>
    <Link to='/'>Box</Link>
    <Link to='/knot'>Knot</Link>
    <Link to='/text'>text</Link>
  </Navbar>
);

export default Header;
