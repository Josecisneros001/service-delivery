import { useRef, useState} from 'react';
import UploadFileI from '../../../interfaces/SignUp/UploadFile';

export default function UploadID({label, id, name, onChange}:UploadFileI){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File|null|undefined>();
    const [fileName, setFileName] = useState<any|null>();

    const handleChange = (newValue: string) => {
      onChange(newValue);
    };

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
              accept="image/*,.pdf"
              onChange={(event) => {
                  const file = event.target.files![0];
                  if (file) {
                      setFile(file);
                      setFileName(file.name)
                      handleChange(file.name);
                  } else {
                      handleChange("");
                      setFileName(null); 
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                  }
              }}
          />
          <div className="text-sm">{fileName}</div>
          { file != null && <button type="button" className="text-sm pb-8 text-primaryColor" onClick={(event) => {
            handleChange("");
            setFile(null);
            setFileName(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}>x</button> }
        </div>
      </div>            
    );
}

