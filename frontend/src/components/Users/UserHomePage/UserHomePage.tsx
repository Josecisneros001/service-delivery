import React, { Component, useState } from "react";
import "../../../tailwindcss.css"
import UsersNavbar from "../UsersNavbar";
import "./UserHomePage.css";
import WelcomeUserBar from "./WelcomeUserbar";
import FoundServiceListItem from "./FoundServiceListItem";

interface UserProfileProps {
    user_name: string,
    profile_picture_url: string
}

const UserHomePage = ({user_name, profile_picture_url}:UserProfileProps) => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <UsersNavbar/>

            {/* TODO: OBTAIN USER INFO FROM DB */}
            <WelcomeUserBar user_name={user_name} profile_picture_url={profile_picture_url} />

            {/* USER SERVICES INFORMATION */}
            <div className="flex flex-row justify-center align-middle">

                {/* SEARCH FOR NEW SERVICES COLUMN */}
                <div className="flex flex-col justify-center align-middle w-2/3">

                    <h2 className="self-center my-3">Search for new services</h2>

                    {/* TODO: SUBMIT SEARCH TERM */}
                    {/* SEARCH BOX */}
                    <div className="mx-20 mb-10 max-w-2/3">
                        <form action="" className="flex justify-between">
                            <input 
                                type="text" 
                                placeholder="Service name..." 
                                name="search" 
                                className="block p-3 border-2 border-gray-400"
                                onChange={event => {setSearchTerm(event.target.value)}}
                            />
                            <button 
                                type="submit" 
                                className="bg-gray-300 px-10 rounded-full">
                                    Search
                            </button>
                        </form>
                    </div>

                    {/* TODO: MAKE THIS LIST DYNAMIC */}
                    {/* LIST OF SERVICES */}
                    <FoundServiceListItem time="9:00" service_name="Plumbing" location="Monterrey" />

                </div>

                {/* TODO: MAP */}
                <div className="w-1/3 m-10 h-64 border-2 border-yellow-600">
                    
                </div>

            </div>
        </>
    );
}

export default UserHomePage;