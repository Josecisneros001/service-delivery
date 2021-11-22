import { useState } from "react";
import Service from "./Service";
import ServiceCard from "../../General/ServiceCard";

// TODO:RemoveDummyReservation - Implement APIs
const DummyReservations = [
  {
    id: "1",
    title: "Tutoring",
    desc: "I will teach any introductory maths course such as calculus I & II",
    price: "500-1000",
    loc: "Monterrey, NL",
  },
  {
    id: "2",
    title: "Technician",
    desc: "Electricity maintenance and monitoring",
    price: "500-1000",
    loc: "Monterrey, NL",
  },
  {
    id: "3",
    title: "Plumber",
    desc: "Everything plumbing such as bathrooms, sinks, garden, etc",
    price: "500-1000",
    loc: "Monterrey, NL",
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
