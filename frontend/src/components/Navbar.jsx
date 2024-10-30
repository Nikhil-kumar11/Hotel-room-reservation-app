import { Link } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";

function Navbar() {
  return (
    <header className="border-b-2 p-4">
      <div className="flex flex-row justify-between">
        <Link to="/">
          <h2 className="ml-4 text-3xl font-bold">Admin Panel</h2>
        </Link>
        <div className="flex flex-row items-center justify-center gap-4 p-2">
          <Link to="/rooms">
            <span>Rooms</span>
          </Link>
          <span>Users</span>
          <span>App</span>
          <UserCircle size={28} weight="light" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
