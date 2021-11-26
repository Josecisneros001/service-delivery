import {Component} from 'react';
import { getCurrentUser } from "../../scripts/APIs";
import { WorkHours as WorkHModel } from "../../interfaces/models/WorkHours";
import { Appointments } from '../../scripts/APIs/Appointments';
import UsersNavbar from './UsersNavbar';
import FormField from '../General/FormField/FormField';
import FormTextArea from '../General/FormField/FormTextArea'
import SliderRange from './SliderRange/SliderRange';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { WorkHours } from '../../scripts/APIs/WorkHours';
import AvailabilitySchedule from 'availability-schedule';
import Snackbar from '../General/Snackbar';
import Day from '../General/Calendar/Day'
import Hour from '../General/Calendar/Hour';

const past = {
  before: new Date(),
}

export interface UserRequestState {
  workHoursInfo: WorkHModel | null,
  address_info: string;
  selectedDay: Date;
  invitationMessage: string;
  timestamp: string;
  duration: number;
  snackBarMsg: string;
  showAlert: boolean;
  [key: string]: WorkHModel | string | boolean | Date | number | null;
};

class RequestPage extends Component<{ is_service_provider: boolean },UserRequestState, {}> {
    constructor(props: { is_service_provider: boolean }) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {workHoursInfo: null, address_info: '', invitationMessage: '', timestamp: "", selectedDay: new Date(), duration: 0, snackBarMsg: "", showAlert: false};
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      configSnackbar = {
        verticalAlign: ['bottom', 'top'][0],
        horizontalAlign: ['center', 'left', 'right'][2],
        closeButton: true,
        infinite: false,
        timeout: 5000,
    };

    hideSnackbar = () => {
        this.setState({showAlert: false});
    };

    handleDayClick(dayValue: Date) {
      this.setState({ selectedDay: dayValue });
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

    async handleSubmit(event: React.ChangeEvent<any>) {
      event.preventDefault();
      if (!this.formValidation()) {
        return;
      }

      const params = {
        address_info: this.state.address_info,
        timestamp: this.state.timestamp,
        duration: this.state.duration,
      } as WorkHModel;

      const response = await Appointments.create(
        params);
        
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
      const currentServiceId = getCurrentUser(this.props.is_service_provider);
      const currentInfo = (await WorkHours.getById(currentServiceId)).data as WorkHModel;
      this.setState({
        workHoursInfo: currentInfo,
      });
    }

    // checar cuales fechas están disponibles
    async getWorkHrs() {
      const schedule = new AvailabilitySchedule('2021-11-22T00:00:00Z', '2022-11-24T00:00:00Z');
      const startHr = this.state.workHoursInfo?.hour || 1;
      const startDate = new Date("11/23/2021 " + startHr?.toString() + "00:00");
      const duration = this.state.workHoursInfo?.duration || 1;
      const endHr = startHr + duration;
      const endDate = new Date("11/23/2022 " + endHr?.toString()+ "00:00");
      schedule.addWeeklyRecurringAvailability(startDate.toISOString(), endDate.toISOString(), [1, 2, 3, 4, 5]); // Mon-Fri 9am-5pm UTC, starting on Wed Jan 4th
      
      //schedule.removeAvailability();
    }

    formValidation = () => {
      const fields = ["address", "timestamp", "duration"];
      const fieldsName = ["Address", "Timestamp", "Duration"];
      for (const index in fields) {
        const field = fields[index];
        const fieldName = fieldsName[index];
        if (!this.state[field]) {
          this.setState({snackBarMsg: `Missing Field - ${fieldName}`, showAlert: true});
          return false;
        }
      }
    }




    render() {
        return (
          <>
            <Snackbar {...this.configSnackbar} show={this.state.showAlert} hideEvent={this.hideSnackbar} message={this.state.snackBarMsg}/>
              <div className="flex flex-col">
                  <UsersNavbar/>
                  <div className="text-center text-4xl pt-7">Request Form</div>
                  <div className="flex-1 ">
                  <form onSubmit={this.handleSubmit} className="flex-1 flex flex-col text-2xl mx-40">
                    <div className="flex flex-row items-center justify-around">
                      <div className="flex flex-col w-1/3">
                            <FormField orientation="col" label="Direction" onChange={this.handleAddressInfo}/>
                            <FormTextArea  orientation="col" label="Invitation Message" onChange={this.handleMessage}/>
                            Pricing Range
                            <div className="pl-8 pt-12"><SliderRange/></div>
                        </div>
                        <div className="flex flex-row items-center space-x-7">
                          <DayPicker onDayClick={this.handleDayClick} selectedDays={this.state.selectedDay} disabledDays={ past }/>
                          {this.state.selectedDay ? (
                            <div className="flex-1">
                                <Day label={this.state.selectedDay.toLocaleDateString()}/>                                    
                            </div>
                            ) : (
                            <p>Please select a day.</p>
                          )}
                        </div>
                    </div>
                    
                    <div className="flex justify-center pt-20">
                              <button type="submit" className="button button2">Confirm</button>
                          </div>

                  </form>
                  </div>
              </div>
            </>
        );
    }
}


export default RequestPage;