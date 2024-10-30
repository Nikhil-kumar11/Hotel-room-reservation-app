import { useEffect, useState } from "react";
import RoomDetails from "../components/RoomDetails";

function RoomsPage() {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    // const fetchRooms = async () => {
    //   const response = await fetch("/rooms");
    //   const json = await response.json();

    //   if (response.ok) {
    //     setRooms(json);
    //   }
    // };

    const fetchRooms = async () => {
      try {
        const response = await fetch("/rooms");
        const text = await response.text(); // Get the response as text
        console.log(text); // Log the response to see what is being returned

        const json = JSON.parse(text); // Parse the text as JSON

        if (response.ok) {
          setRooms(json);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="">
      <div>
        {rooms &&
          rooms.map((room) => (
            <RoomDetails
              key={room._id}
              name={room.name}
              type={room.type}
              price={room.price}
              photoUri={room.photoUri}
            />
          ))}
      </div>
    </div>
  );
}

export default RoomsPage;
