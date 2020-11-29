import { Navbar } from './styled';
import { Link } from 'wouter';

// const Link = (props) => {
//   const [isActive] = useLocation();

//   return <Link />;
// };

const Header = ({ style }) => (
  <Navbar style={style}>
    <Link to='/'>Box</Link>
    <Link to='/knot'>Knot</Link>
    <Link to='/text'>text</Link>
    <Link to='/cactus'>cactus</Link>
  </Navbar>
);

export default Header;
