import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <h1>Page not found!</h1>
        <div>
          <Link to="/">Take me home</Link>
        </div>
      </div>
    </div>
  );
};
