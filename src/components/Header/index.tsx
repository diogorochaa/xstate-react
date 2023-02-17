import { Link } from 'react-router-dom';

import { usePath } from '../../hooks/usePath';

export function Header() {
  const general = 'text-slate-300';
  const current = 'text-white font-bold';

  const { isCurrentPage } = usePath();

  return (
    <header className="flex justify-between items-center px-6 py-4 mb-5 bg-black">
      <h2 className="text-white font-bold text-2xl">Xstate</h2>

      <nav className="flex gap-6 items-center">
        <Link to="/" className={isCurrentPage('/') ? current : general}>
          Home
        </Link>
        <Link
          to="/characters"
          className={isCurrentPage('/characters') ? current : general}
        >
          Characters
        </Link>
        <Link to="/contact" className={isCurrentPage('/contact') ? current : general}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
