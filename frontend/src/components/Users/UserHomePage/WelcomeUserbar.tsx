import React, { Component } from "react";
import "../../../tailwindcss.css";

interface UserProps {
    user_name: string,
    profile_picture_url: string
}

const WelcomeUserBar = ({user_name, profile_picture_url}: UserProps) => {
    return (
        <div className="bg-green-400 h-40"> 

            {/* USER INFO CARD */}
            <div className="bg-green-100 h-32 w-3/4 sm:w-1/2 md:w-1/3 absolute mt-4 mb-4 flex rounded-corners">

                {/* AVATAR IMAGE */}
                <div className="border-gray-500">
                    <img className="rounded-full w-28 p-4" src={profile_picture_url}/>
                    {/* <img className="h-10 w-10 rounded-full object-cover" src={getFileUrl(this.props.user.profile_picture)} alt="a"/> */}
                </div>

                {/* USER INFORMATION */}
                <div>
                    <p className="pt-5 text-lg">Welcome {user_name}!</p>
                    <div className="flex justify-between mt-5">
                        <a href="#" className="underline">Edit profile</a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default WelcomeUserBar;