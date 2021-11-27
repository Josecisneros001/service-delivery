import {Component} from 'react';
import { getCurrentUser, getFileUrl } from "../../scripts/APIs";
import { Users as UsersModel } from "../../interfaces/models/Users";
import { WorkHours as WorkHModel } from "../../interfaces/models/WorkHours";
import { Appointments } from '../../scripts/APIs/Appointments';
import UsersNavbar from './UsersNavbar';
import FormField from '../General/FormField/FormField';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { WorkHours } from '../../scripts/APIs/WorkHours';
import Snackbar from '../General/Snackbar';
import Day from '../General/Calendar/Day';
import { defaultAvailabilityDay, AvailabilityDay, toWorkHoursDay } from '../../interfaces/AvailabilityModel';
import { Services } from '../../scripts/APIs/Services';
import { Users } from '../../scripts/APIs/Users';
import Map from '../General/Map';
import { ServiceFound, ServiceFoundRow } from '../../interfaces/ServiceFoundRow';
import { Appointments as AppointmentsModel } from '../../interfaces/models/Appointments';
import { Navigate } from 'react-router';

export interface UserRequestState {
  serviceInfo: ServiceFound,
  userInfo: UsersModel,
  dayAvailabilityInfo: AvailabilityDay,
  reservedInfo: AvailabilityDay,
  coord: {lat: number, lng: number},
  address_info: string;
  selectedDay: Date;
  weekDay: number;
  timestamp: string;
  duration: number;
  snackBarMsg: string;
  showAlert: boolean;
  [key: string]: ServiceFound | UsersModel | string | boolean | Date | number | AvailabilityDay | null;
};

const configSnackbar = {
  verticalAlign: ["bottom", "top"][0],
  horizontalAlign: ["center", "left", "right"][2],
  closeButton: true,
  infinite: false,
  timeout: 5000,
};

class RequestPage extends Component<{},UserRequestState, {}> {
    constructor(props: {}) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
          serviceInfo: {} as ServiceFound,
          userInfo: {} as UsersModel,
          coord: {lat: 0, lng: 0},
          dayAvailabilityInfo: defaultAvailabilityDay(),
          reservedInfo: defaultAvailabilityDay(),
          address_info: '',
          timestamp: "",
          selectedDay: new Date(),
          weekDay: (new Date().getDay() === 0 ? 7 : new Date().getDay()),
          duration: 0,
          snackBarMsg: "",
          showAlert: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideSnackbar = () => {
        this.setState({showAlert: false});
    };

    handleDayClick = async (dayValue: Date) => {
      this.setState({ selectedDay: dayValue });
      const weekDay = dayValue.getDay() === 0 ? 7 : dayValue.getDay();
      this.setState({weekDay: weekDay});
      const currentInfo = (await WorkHours.get(this.state.serviceInfo.serviceProvider.id || 0, weekDay)).data as WorkHModel[];
      const fromDate = new Date(`${this.state.selectedDay.toDateString()} 00:00:00`).toISOString();
      const toDate = new Date(`${this.state.selectedDay.toDateString()} 23:59:59`).toISOString();
      const appointmentsInfo = (await Appointments.get(null, this.state.serviceInfo.serviceProvider.id || 0, null, true, false, fromDate, toDate)).data as AppointmentsModel[];
      const dayDict = defaultAvailabilityDay();
      for(const wk of currentInfo) {
        if (wk.day && wk.duration && wk.hour) {
          wk.duration = parseInt(wk.duration.toString());
          wk.hour = parseInt(wk.hour.toString());
          for(let index = wk.hour; index < wk.hour + wk.duration && index <= 23 && index >= 6 ; index++) {
            dayDict[index] = true;
          }
        }
      }
      for(const app of appointmentsInfo) {
        if (app.duration && app.timestamp) {
          app.duration = parseInt(app.duration.toString());
          const hour = new Date(app.timestamp + ' Z').getHours();
          for(let index = hour; index < hour + app.duration && index <= 23 && index >= 6 ; index++) {
            dayDict[index] = false;
          }
        }
      }
      this.setState({
        dayAvailabilityInfo: dayDict,
        reservedInfo: defaultAvailabilityDay(),
      });
    }

    handleAddressInfo = (addressInfoValue: string) => {
      this.setState({address_info: addressInfoValue});
    }

    handleMessage = (messageValue: string) => {
      this.setState({invitationMessage: messageValue});
    }

    handleTimestamp = (timestampValue: string) => {
      this.setState({timestamp: timestampValue});
    }

    setCoord = (coord: {lat: number, lng: number}) => {
      this.setState({coord: coord});
    }

    async handleSubmit(event: React.ChangeEvent<any>) {
      event.preventDefault();
      if (!this.formValidation()) {
        return;
      }
      const workHoursMultiple = toWorkHoursDay(this.state.reservedInfo, this.state.serviceInfo?.service?.id || 0, this.state.weekDay);
      const reservationBlock = (workHoursMultiple.data as WorkHModel[])[0];
      const params = {
        user_id: getCurrentUser(false),
        service_id: this.state.serviceInfo.service.id || 0,
        address_info: this.state.address_info,
        timestamp: new Date(`${this.state.selectedDay.toDateString()} ${reservationBlock.hour}:00:00`).toISOString(),
        duration: reservationBlock.duration || 0,
        location_lat: this.state.coord.lat,
        location_lng:  this.state.coord.lng,
      } as AppointmentsModel;
      
      const response = await Appointments.create(params);
        
      if (response.status !== 200) {
        this.setState({
          snackBarMsg: "Could not create request",
          showAlert: true,
        });
        return;
      }

      this.setState({isDone: true});
    }

    async componentDidMount() {
      const responseUser = (await Users.getById(getCurrentUser(false))).data as UsersModel;
      this.setState({userInfo: responseUser});

      const query = new URLSearchParams(window.location.search);
      const srv_id = parseInt(query.get("srv_id") as string);
      if(srv_id && !isNaN(srv_id)) {
        const currentInfo = (await Services.getById(srv_id)).data as ServiceFoundRow;
        if (!currentInfo) {
          return;
        }
        const photo_urls = currentInfo.photo_urls.split(',');
        const photo_desc = currentInfo.descriptions.split(',');
        this.setState({serviceInfo: {
          "service": {
              id: currentInfo.id,
              user_id: currentInfo.user_id,
              category_id: currentInfo.category_id,
              name: currentInfo.name,
              description: currentInfo.description,
              location_lat: currentInfo.location_lat,
              location_lng: currentInfo.location_lng,
              location_radius: currentInfo.location_radius,
              is_service_fee_per_hour: currentInfo.is_service_fee_per_hour,
              registered_on: currentInfo.registered_on,
          },
          "serviceProvider": {
              id: currentInfo.usr_id,
              first_name: currentInfo.usr_first_name,
              last_name: currentInfo.usr_last_name,
              password: currentInfo.usr_password,
              email: currentInfo.usr_email,
              recovery_email: currentInfo.usr_recovery_email,
              phone_number: currentInfo.usr_phone_number,
              alt_phone_number: currentInfo.usr_alt_phone_number,
              profile_picture: currentInfo.usr_profile_picture,
              file_id: currentInfo.usr_file_id,
              file_proof_of_address: currentInfo.usr_file_proof_of_address,
              is_service_provider: currentInfo.usr_is_service_provider,
              registered_on: currentInfo.usr_registered_on,
          },
          "servicePhotos": photo_urls.map((url, index)=>{
              return {
                  description: photo_desc[index],
                  photo_url: url,
              }
          }),
        }});
        this.handleDayClick(new Date());
      }
    }

    formValidation = () => {
      const fields = ["address_info"];
      const fieldsName = ["Address"];
      for (const index in fields) {
        const field = fields[index];
        const fieldName = fieldsName[index];
        if (!this.state[field]) {
          this.setState({snackBarMsg: `Missing Field - ${fieldName}`, showAlert: true});
          return false;
        }
      }
      const workHoursMultiple = toWorkHoursDay(this.state.reservedInfo, this.state.serviceInfo?.service?.id || 0, this.state.weekDay);
      if (!workHoursMultiple.data || workHoursMultiple.data.length === 0) {
        this.setState({snackBarMsg: 'No Time Slot Selected', showAlert: true});
        return false;
      }
      if (workHoursMultiple.data && workHoursMultiple.data.length > 1) {
        this.setState({snackBarMsg: 'More than one time slot selected', showAlert: true});
        return false;
      }
      return true;
    }

    handleReservedChange = (_index: number, day: AvailabilityDay) => {
      this.setState({reservedInfo: day});
    }

    render() {
        if (this.state.isDone) {
          return <Navigate to="/users/my-reservations" />
        }
        return (
          <>
            <Snackbar
              {...configSnackbar}
              show={this.state.showAlert}
              hideEvent={this.hideSnackbar}
              message={this.state.snackBarMsg}
            />
            <div className="flex flex-col">
              <UsersNavbar user={this.state.userInfo} />
              <div className="flex flex-col justify-center align-middle w-full lg:w-2/3 mx-auto">
                <div className="text-3xl w-full text-center py-3">Request Service</div>
                <div className="flex-1 ">
                  <form onSubmit={this.handleSubmit} className="flex-1 flex flex-col text-2xl">
                    <div className="flex flex-row">
                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row w-full mt-5">
                          <div className="flex-initial">
                            <img
                              className="h-14 w-14 rounded-full object-cover mr-2 mt-2"
                              src={getFileUrl(this.state.serviceInfo.serviceProvider?.profile_picture)}
                              alt="a"
                            />
                          </div>
                          <div className="flex-1 flex flex-col text-sm text-left mr-2 mt-auto">
                            <span>{`${this.state.serviceInfo.service?.name || ''}`}</span>
                            <span>{`${this.state.serviceInfo.serviceProvider?.first_name || ''} ${this.state.serviceInfo.serviceProvider?.last_name || ''}`}</span>
                            <span>{`${this.state.serviceInfo.serviceProvider?.email || ''}`}</span>
                            <span>{`${this.state.serviceInfo.serviceProvider?.phone_number || ''}`}</span>
                          </div>
                        </div>
                        <div className="flex mt-10">
                          <FormField
                            orientation="col"
                            label="Address"
                            onChange={this.handleAddressInfo}
                          />
                        </div>
                        <div className="h-72">
                          <Map radius={0} onCenterChange={this.setCoord} />
                        </div>
                      </div>
                      <div className="flex w-2/6">
                        <DayPicker
                          className="mx-auto"
                          onDayClick={this.handleDayClick}
                          selectedDays={this.state.selectedDay}
                          fromMonth={new Date()}
                          disabledDays={[
                            {
                              before: new Date(),
                            }
                          ]}
                        />
                      </div>
                      <div className="flex w-1/6 text-sm">
                        <Day
                          index={this.state.weekDay}
                          reservedBehavior={true}
                          label={this.state.selectedDay.toLocaleDateString()}
                          availability={this.state.dayAvailabilityInfo}
                          reserved={this.state.reservedInfo}
                          onChange={() => {}}
                          onChangeReserved={this.handleReservedChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center pt-20">
                      <button type="submit" className="button button2">Confirm</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        );
    }
}


export default RequestPage;