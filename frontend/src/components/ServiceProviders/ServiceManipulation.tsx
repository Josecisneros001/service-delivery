import React, { useEffect, useRef, useState } from 'react';
import Map from '../General/Map';
import ServiceProviderNavbar from './ServiceProviderNavbar';
import { ServiceCategories as ServiceCategoriesModel } from "../../interfaces/models/ServiceCategories";
import { Users as UsersModel } from "../../interfaces/models/Users";
import { Users } from '../../scripts/APIs/Users';
import { ServiceCategories } from '../../scripts/APIs/ServiceCategories';
import { getCurrentUser, getFileUrl } from '../../scripts/APIs';
import FormField from '../General/FormField/FormField';
import Slider from '../General/Slider';
import { Services } from '../../scripts/APIs/Services';
import { ServiceFound, ServiceFoundRow } from '../../interfaces/ServiceFoundRow';
import Snackbar from '../General/Snackbar';
import { Navigate } from 'react-router';
import { Services as ServicesModel } from '../../interfaces/models/Services';
import { ServicePhotos } from '../../scripts/APIs/ServicePhotos';

interface ServiceManipulationProps {
}

interface ErrorFields {
  name?: boolean;
  category?: boolean;
  desc?: boolean;
  images?: boolean;
  [key: string]: boolean | undefined;
}

const configSnackbar = {
  verticalAlign: ["bottom", "top"][0],
  horizontalAlign: ["center", "left", "right"][2],
  closeButton: true,
  infinite: false,
  timeout: 5000,
};

const ServiceManipulation = (props: ServiceManipulationProps) => {
  const [user, setUser] = useState<UsersModel | undefined>(undefined);
  const [service, setService] = useState<ServiceFound | undefined>(undefined);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState<ErrorFields>({});
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoriesModel[]>([]);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [desc, setDesc] = useState("");
  const [radius, setRadius] = React.useState(3000);
  const [coord, setCoord] = React.useState({lat: 25.6714,lng: -100.309});
  const [initialCoord, setInitialCoord] = React.useState({lat: 25.6714,lng: -100.309});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [showAlert, setShowAlert] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  useEffect(() => {
      (async () => {
        if (images && images.length > 0) {
          let imagesLoaded = [];
          for(const image of images) {
            const imgLoaded = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.onerror = () => {
                reject('');
              }
              reader.readAsDataURL(image);
            }) as string;
            imagesLoaded.push(imgLoaded);
          }
          setPreviews(imagesLoaded);
        } else {
          setPreviews([]);
        }
      })();
  }, [images]);

  useEffect(() => {
      (async () => {
          const response = (await Users.getById(getCurrentUser(true))).data as UsersModel;
          const responseSC = (await ServiceCategories.get()).data as ServiceCategoriesModel[];
          setUser(response);
          setServiceCategories(responseSC);
          const query = new URLSearchParams(window.location.search);
          if(query.get("id")) {
            const srv_id = parseInt(query.get("id") || '');
            const srv = (await Services.getById(srv_id)).data as ServiceFoundRow;
            if (srv) {
              setEdit(true);
              const photo_urls = srv.photo_urls.split(',');
              const photo_desc = srv.descriptions.split(',');
              setInitialCoord({lat: srv.location_lat, lng: srv.location_lng});
              setRadius(srv.location_radius);
              setPreviews(photo_urls.map((path) => getFileUrl(path)));
              setService({
                "service": {
                    id: srv.id,
                    user_id: srv.user_id,
                    category_id: srv.category_id,
                    name: srv.name,
                    description: srv.description,
                    location_lat: srv.location_lat,
                    location_lng: srv.location_lng,
                    location_radius: srv.location_radius,
                    is_service_fee_per_hour: srv.is_service_fee_per_hour,
                    registered_on: srv.registered_on,
                },
                "serviceProvider": {
                    id: srv.usr_id,
                    first_name: srv.usr_first_name,
                    last_name: srv.usr_last_name,
                    password: srv.usr_password,
                    email: srv.usr_email,
                    recovery_email: srv.usr_recovery_email,
                    phone_number: srv.usr_phone_number,
                    alt_phone_number: srv.usr_alt_phone_number,
                    profile_picture: srv.usr_profile_picture,
                    file_id: srv.usr_file_id,
                    file_proof_of_address: srv.usr_file_proof_of_address,
                    is_service_provider: srv.usr_is_service_provider,
                    registered_on: srv.usr_registered_on,
                },
                "servicePhotos": photo_urls.map((url, index)=>{
                    return {
                        description: photo_desc[index],
                        photo_url: url,
                    }
                }),
              });
            }
          }
      })();
  }, []);

  const setErrorsTimeOut = (key: string) => {
    let currentErrors = errors;
    currentErrors[key] = true;
    setErrors(currentErrors);
    setTimeout( () => {
      currentErrors[key] = false;
      setErrors(currentErrors);
    }, 5000);
  }
  const formValidations = () => {
    if (!name) {
      setErrorsTimeOut("name");
      setSnackBarMsg('Missing Field - Name');
      setShowAlert(true);
      return false;
    }
    if (category <= 0) {
      setErrorsTimeOut("category");
      setSnackBarMsg('Missing Field - Category');
      setShowAlert(true);
      return false;
    }
    if (!desc) {
      setErrorsTimeOut("desc");
      setSnackBarMsg('Missing Field - Description');
      setShowAlert(true);
      return false;
    }
    if (previews.length === 0) {
      setErrorsTimeOut("images");
      setSnackBarMsg('Missing Field - Description');
      setShowAlert(true);
      return false;
    }
    if (previews.length > 4) {
      setErrorsTimeOut("images");
      setSnackBarMsg('Maximum 4 Photos Per Service');
      setShowAlert(true);
      return false;
    }
    return true;
  }

  const handleSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if(!formValidations()){
      return;
    }
    setLoading(true);
    const params = {
      user_id: getCurrentUser(true),
      category_id: category,
      name: name,
      description: desc,
      location_lat: coord.lat,
      location_lng: coord.lng,
      location_radius: radius,
    } as ServicesModel;
    let response;
    if(edit && service?.service.id) {
      delete params.category_id;
      delete params.name;
      delete params.user_id;
      response = await Services.update(service.service.id, params);
    } else {
      response = await Services.create(params);
    }
    if(response && response.status !== 200) {
      setSnackBarMsg('Server Error - Try Again Later');
      setShowAlert(true);
      setLoading(false);
      return;
    }
    const srv_id = response.data.id as number;
    if (images.length > 0) {
      const data = new FormData(formRef.current as HTMLFormElement);
      const responsePhotos = await ServicePhotos.create(srv_id, data);
      if(responsePhotos.status !== 200) {
        setSnackBarMsg('Server Error Uploading Photos - Try Again Later');
        setShowAlert(true);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    setIsDone(true);
  }

  if (isDone) {
    return <Navigate to="/service-providers/my-services" />
  }
  return (
    <>
      <Snackbar
        {...configSnackbar}
        show={showAlert}
        hideEvent={() => setShowAlert(false)}
        message={snackBarMsg}
      />
      <ServiceProviderNavbar user={user} />
      <div className="flex justify-center items-center w-full md:w-2/3 lg:w-1/2 border-2 shadow mt-2 p-3 md:mx-auto" style={{opacity: loading? '0.5' : '1'}}>
        <form onSubmit={handleSubmit} autoComplete="nope" ref={formRef} >
          <div className="text-2xl mb-4 text-center">
            {`${edit? "Edit" : "Create"} Service`}
          </div>
          {/* NAME OF SERVICE INPUT */}
          <FormField
            orientation="col"
            label='Name'
            placeholder="ex. Tutoring for Web Development"
            onChange={setName}
            hasError={errors?.name}
            disabled={edit}
            initialValue={service?.service.name}
          />
  
          {/* CATEGORIES INPUT */}
          <FormField
            type="SELECT"
            orientation="col"
            label='Category'
            onChange={setCategory}
            hasError={errors?.category}
            disabled={edit}
            initialValue={service?.service.category_id?.toString()}
          >
            {serviceCategories.map((category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>);
            })}
          </FormField>
  
          {/* DESCRIPTION INPUT */}
          <FormField
            type="TEXTAREA"
            orientation="col"
            label='Description'
            placeholder="ex. I'll teach you React and Vue."
            onChange={setDesc}
            hasError={errors?.desc}
            initialValue={service?.service.description?.toString()}
          />
  
          {/* LOCATION INPUT */}
          <label className="text-2xl">Location</label>
          <div className="w-full h-52 mb-10">
            <Map radius={radius} onCenterChange={setCoord} initialCenter={initialCoord} />
            <Slider minRange={0} maxRange={10000} onChange={setRadius} initialValue={radius} />
          </div>
  
          {/* PHOTOS INPUT */}
          <div className="flex flex-row">
            <label className="text-2xl mr-2">Photos</label>
            <div
              className={`cursor-pointer ${errors?.images ? 'text-red-500' : 'text-gray-400'}`}
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <input
              ref={fileInputRef}
              style={{display: "none"}}
              type="file"
              name="photos"
              accept="image/*"
              multiple={true}
              className="mt-2 mb-5 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none items-center bg-gray-100"
              onChange={(event) => {
                const files = event.target.files;
                if (files) {
                  setImages(Array.from(files));
                } else {
                  setImages([]);
                }
              }}
            />
          </div>
          {/* PHOTOS DISPLAY */}
          <div className="flex flex-row flex-wrap">
            {previews.map((src, index) => {
              return (
                <img
                  key={index}
                  className="w-20 h-20"
                  src={src}
                  style={{objectFit:"cover"}}
                  alt=""
                />
              )
            })}
          </div>
  
          {/* BOTON SUBMIT FORM */}
          <div className="flex justify-center mt-7">
            <button type="submit" className="rounded-full px-10 py-3 bg-gray-100">
              {`${edit? "Update" : "Create"}`}
            </button>
          </div>
  
        </form>
      </div>
    </>
  );
}

export default ServiceManipulation;


