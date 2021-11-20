import { useState } from "react";
import Reservation from "./Reservation";
import Card from "../../General/Card";

// TODO:RemoveDummyReservation - Implement APIs
const DummyReservations = [
  {
    id: "1",
    title: "Technician",
    category: "Electricity",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "2",
    title: "Technician",
    category: "Electricity",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "3",
    title: "Technician",
    category: "Electricity",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
];

const Cards = () => {
  const [reservations] = useState(DummyReservations);

  return (
    <div className="w-full m-auto px-8">
      {reservations.map((reservation) => {
        return (
          <Card 
            key={reservation.id}
            className="reservation-container p-2.5 my-3"
            title={reservation.title}
            subtitle={reservation.category}
          >
              <Reservation
                client={reservation.client}
                date={reservation.date}
                desc={reservation.desc}
              />
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
