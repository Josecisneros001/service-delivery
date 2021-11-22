import { useState } from "react";
import Service from "./Service";
import ServiceCard from "../../General/ServiceCard";

// TODO:RemoveDummyReservation - Implement APIs
const DummyReservations = [
  {
    id: "1",
    title: "Technician",
    category: "Electricity",
    desc: "A.J Cook",
    price: "500-1000",
    loc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "2",
    title: "Technician",
    category: "Electricity",
    desc: "A.J Cook",
    price: "500-1000",
    loc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "3",
    title: "Technician",
    category: "Electricity",
    desc: "A.J Cook",
    price: "500-1000",
    loc: "9:00 am Privada BocaNegra 602"
  },
];

const _Services = () => {
  const [reservations] = useState(DummyReservations);

  return (
    <div className="w-full m-auto px-8">
      {reservations.map((reservation) => {
        return (
          <ServiceCard 
            key={reservation.id}
            className="reservation-container p-2.5 my-3"
            title={reservation.title}
            subtitle={reservation.category}
          >
              <Service
                desc={reservation.desc}
                price={reservation.price}
                loc={reservation.loc}
              />
          </ServiceCard>
        );
      })}
    </div>
  );
};

export default _Services;
