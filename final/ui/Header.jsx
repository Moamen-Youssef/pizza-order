import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header
      className="border-b border-stone-300
     bg-yellow-500 px-4 py-3 uppercase sm:px-6 flex items-center justify-around"
    >
      <Link to="/" className="font-semibold tracking-widest">
        Fast React Pizza CO.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
