import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    'text-blue-500 hover:font-semibold hover:text-blue-700 hover:underline';
  if (to === '-1') return <button onClick={() => navigate(-1)} className={className}>
    {children}
  </button>;
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
