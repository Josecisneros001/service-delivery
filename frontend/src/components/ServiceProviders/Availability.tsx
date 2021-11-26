import React, { useEffect } from 'react';
import { AvailabilityModel, defaultAvailability, toWorkHours } from '../../interfaces/AvailabilityModel';
import { Users as UsersModel } from "../../interfaces/models/Users";
import { WorkHours as WorkHoursModel } from '../../interfaces/models/WorkHours';
import { getCurrentUser } from '../../scripts/APIs';
import { WorkHours } from '../../scripts/APIs/WorkHours';
import Calendar from '../General/Calendar/Calendar';
import Snackbar from '../General/Snackbar';
import ServiceProviderNavbar from './ServiceProviderNavbar';
import { Users } from '../../scripts/APIs/Users';

const configSnackbar = {
  verticalAlign: ["bottom", "top"][0],
  horizontalAlign: ["center", "left", "right"][2],
  closeButton: true,
  infinite: false,
  timeout: 5000,
};
const Availability = () => {
  const [user, setUser] = React.useState<UsersModel | undefined>(undefined);
  const [avData, setAvData] = React.useState<AvailabilityModel>(defaultAvailability());
  const [showAlert, setShowAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("false");

  useEffect(() => {
    (async () => {
      const responseUser = (await Users.getById(getCurrentUser(true))).data as UsersModel;
      setUser(responseUser);
      const response = (await WorkHours.get(getCurrentUser(true), null)).data as WorkHoursModel[];
      const dayDict = defaultAvailability();
      for(const wk of response) {
        if (wk.day && wk.duration && wk.hour) {
          wk.day = parseInt(wk.day.toString());
          wk.duration = parseInt(wk.duration.toString());
          wk.hour = parseInt(wk.hour.toString());
          for(let index = wk.hour; index < wk.hour + wk.duration && index <= 23 && index >= 6 ; index++) {
            dayDict[wk.day][index] = true;
          }
        }
      }
      setAvData(dayDict);
    })();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = toWorkHours(avData, getCurrentUser(true));
    const response = await WorkHours.createMultiple(data);
    if(response.status !== 200) {
      setSnackBarMsg('Something wrong happen, please try again.');
      setShowAlert(true);
      return;
    }
    setSnackBarMsg('Saved Succesfully!');
    setShowAlert(true);
    setLoading(false);
  };

  const hideSnackbar = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Snackbar
        {...configSnackbar}
        show={showAlert}
        hideEvent={hideSnackbar}
        message={snackBarMsg}
      />
      <ServiceProviderNavbar user={user} />
      <div className="flex flex-col h-1/2 w-full mx-auto sm:w-3/4 mt-10" style={{opacity: loading? '0.5' : '1'}} >
          <Calendar availability={avData} onChange={(availability: AvailabilityModel) => {setAvData(availability)} } />
          <button
            type="button"
            className="rounded-full px-10 py-3 bg-gray-100 w-1/5 mx-auto"
            onClick={handleSubmit}
            disabled={loading}
          >
            Save Availability
          </button>
      </div>
    </>
  );
}

export default Availability;
