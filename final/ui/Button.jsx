import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wider text-sm text-stone-700 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-200 disabled:hover:bg-yellow-100';
  const styles = {
    primary: base + ' px-4 py-3 md:px-4',
    small: base + ' px-3 py-1 text-xs sm:py-1.5 md:py-2 md:px-3.5',
    secondary:
      'inline-block rounded-full px-3 py-2 md:px-4.5 border-2 border-stone-300 font-semibold uppercase tracking-wider text-stone-400 transition-colors duration-300 hover:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:hover:bg-stone-100',
    round: base + ' px-2 py-1 text-xs sm:py-1.5 sm:px-2.5 md:py-1.5 md:px-2.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
