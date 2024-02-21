import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" mt-auto w-full text-xs text-center   text-gray-500">
      <p>
        {" "}
        Icon Credits : <Link to={"https://remixicon.com/"}>Remix Icon</Link>
      </p>
      <p>
        Illustration Credits :{" "}
        <Link to={"https://storyset.com/web"}>
          Web illustrations by Storyset
        </Link>
      </p>
    </div>
  );
};

export default Footer;
