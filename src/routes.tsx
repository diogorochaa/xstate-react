import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

import { Characters } from './pages/Characters';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';

export function Routes() {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </ReactRoutes>
    </Router>
  );
}
