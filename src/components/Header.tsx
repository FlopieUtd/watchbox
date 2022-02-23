import { Link } from "react-router-dom";

export const Header = () => (
  <div className="flex border-b width-full justify-center">
    <ul className="flex">
      <li className="p-2">
        <Link to="/">Explore</Link>
      </li>
      <li className="p-2">
        <Link to="/compare">Compare</Link>
      </li>
      <li className="p-2">
        <Link to="/collect">Collect</Link>
      </li>
    </ul>
  </div>
);
