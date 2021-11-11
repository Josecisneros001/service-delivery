import {useRef, useState, useEffect } from "react";
import '../../../tailwindcss.css';

export default function UploadPhoto() {
    const [image, setImage] = useState<File|null|undefined>();
    const [preview, setPreview] = useState<string|null|undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
           <div className="flex">
               <form id = "myFileForm">
                    {preview ? (
                        <img
                            className="rounded-full cursor-pointer w-48 h-48"
                            src={preview}
                            style={{objectFit:"cover"}}
                            onClick={() => {
                                setImage(null);
                            }}
                            alt=""
                        />
                    ) : (
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            fileInputRef.current?.click();
                        }}
                        className="w-48 h-48 bg-gray-400 rounded-full relative"
                    >
                         <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20" src="../upload.png" alt=""/>
                    </button>
                    )}
                    <input
                        type="file"
                        style={{display: "none"}}
                        ref={fileInputRef}
                        name="profile_picture"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files![0];
                            if (file && file.type.substr(0, 5) === "image") {
                                setImage(file);
                            } else {
                                setImage(null);
                            }
                        }}
                    />


               </form>
               
           </div>
            

       );
}

