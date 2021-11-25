import React from "react";
import UsersNavbar from "../UsersNavbar";

const MyReservations = () => {
  return (
    <>
      <UsersNavbar />
      <div className="flex justify-between px-12 py-4 flex text-xl">
        <div className="text-5xl">My Reservations</div>
      </div>
    </>
  );
};

export default MyReservations;
