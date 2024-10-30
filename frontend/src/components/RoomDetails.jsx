import { PencilLine, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";

RoomDetails.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photoUri: PropTypes.string.isRequired,
};

function RoomDetails({ name, price, photoUri }) {
  return (
    <div className="m-12 flex h-56 w-fit overflow-hidden rounded-xl border-2 border-gray-300">
      <img src={photoUri} alt={`Photo of ${name}`} className="" />
      <div className="flex h-full flex-col justify-between px-3 py-2">
        <div className="">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">Price: {price}€/night</p>
        </div>
        <div className="mr-1 flex flex-row justify-end gap-1.5">
          <button className="rounded border-2 border-yellow-500 bg-yellow-300 p-0.5 hover:scale-105">
            <PencilLine size={24} weight="light" />
          </button>
          <button className="rounded border-2 border-red-600 bg-red-400 p-0.5 hover:scale-105">
            <Trash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
