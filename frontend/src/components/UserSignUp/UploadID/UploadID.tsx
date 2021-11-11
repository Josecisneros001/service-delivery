import { useRef, useState} from 'react';
import UploadFileI from '../../../interfaces/UserSignUp/UploadFile';
import '../../../tailwindcss.css';

export default function UploadID({label, id, name}:UploadFileI){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File|null|undefined>();
    const [fileName, setFileName] = useState<any|null>();

      return (
        <div className="flex items-center flex-col">
          <label className="font-semibold tracking-wider">{label}</label>
          <div className = "flex items-center flex-row ">
            <label className="text-2xl tracking-wider">Choose file:</label>
            <label htmlFor={id} className="border-primaryColor border-2 rounded-md text-primaryColor m-1 p-1 text-xl cursor-pointer hover:bg-primaryColor hover:text-white">Upload</label>
            <input
                id = {id}
                type="file"
                name={name}
                style={{display: 'none'}}
                ref={fileInputRef}
                accept="image/*"
                onChange={(event) => {
                    const file = event.target.files![0];
                    if (file && file.type.substr(0, 5) === "image") {
                        setImage(file);
                        setFileName(file.name)
                        // alert('Selected file: ' + event.target.files![0].name) //no supe como poner el nombre a lado
                    } else {
                        setFileName(null); 
                        setImage(null);
                    }
                }}
            />
            <div className="text-sm">{fileName}</div>
            { image != null && <button className="text-sm pb-8 text-primaryColor" onClick={(event) => {
              setImage(null);
              setFileName(null);
            }}>x</button> }
          </div>
        </div>            
      );
}

