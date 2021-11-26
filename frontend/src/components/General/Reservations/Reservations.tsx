import Reservation from "./Reservation";
import Card from "../Card";
import { ReservationFound } from "../../../interfaces/ReservationFound";

interface ReservationsProps {
  reservations: ReservationFound[],
}

const Reservations = (props: ReservationsProps) => {
  if (props.reservations.length === 0) {
    return <div className="w-full m-auto text-center text-xl mt-6"> No Data</div>
  }
  return (
    <div className="w-full m-auto">
      {props.reservations.map((reservation) => {
        return (
          <Card
            key={reservation.reservation.id}
            className="w-full p-2.5 my-5"
            title={reservation.service.name}
            subtitle={reservation.serviceCategory.name}
          >
              <Reservation
                client={reservation.user}
                reservation={reservation.reservation}
              />
          </Card>
        );
      })}
    </div>
  );
};

export default Reservations;
