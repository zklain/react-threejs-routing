import { Navbar } from './styled';
import { Link } from 'wouter';

// const Link = (props) => {
//   const [isActive] = useLocation();

//   return <Link />;
// };

const Header = () => (
  <Navbar>
    <Link to='/'>Box</Link>
    <Link to='/knot'>Knot</Link>
    <Link to='/text'>text</Link>
    <Link to='/cactus'>cactus</Link>
  </Navbar>
);

export default Header;
