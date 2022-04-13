import { NavLink } from "react-router-dom";

export const Header = () => (
  <div className="flex border-b width-full justify-center">
    <ul className="flex">
      <li className="p-2">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/"
        >
          Explore
        </NavLink>
      </li>
      <li className="p-2">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/compare"
        >
          Compare
        </NavLink>
      </li>
      <li className="p-2">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/collect"
        >
          Collect
        </NavLink>
      </li>
      <li className="p-2">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/manage"
        >
          Manage
        </NavLink>
      </li>
    </ul>
  </div>
);
