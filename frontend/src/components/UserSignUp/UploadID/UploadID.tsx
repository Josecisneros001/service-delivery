import { useRef, useState, useEffect} from 'react';
import UploadFileI from '../../../interfaces/UserSignUp/UploadFile';
import '../../../tailwindcss.css';

export default function UploadID({label}:UploadFileI){
    const [image, setImage] = useState<File|null|undefined>();
    const [preview, setPreview] = useState<string|null|undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<any|null>();
    const [files, setFilesCount] = useState<FileList|null|undefined>();

    useEffect(() => {
        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview(null);
        }
      }, [image]);

       return (
           <div className="flex flex-col">
               <label className="font-semibold tracking-wider">{label}</label>
               <br/>
               <div className = "flex items-center flex-row ">
                    <label className="tracking-wider">Choose file:</label>
                    <label htmlFor="upload-id" className="border-primaryColor border-2 rounded-md text-primaryColor m-1 p-1 text-2xl cursor-pointer ">Upload</label>
                    <input
                        id = "upload-id"
                        type="file"
                        style={{display: 'none'}}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files![0];
                            const filesCount = event.target.files;
                            setFilesCount(filesCount);
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
                    { files != null && <button onClick={(event) => {

                    }}>x</button> }
               </div>
           </div>            
       );
}

