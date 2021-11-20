import React, { Component } from "react";

export default class EditService extends Component {
  handleSubmit(event: any) {
    event?.preventDefault();
    // TODO: Backend API Implemenation.
    console.log("Service Created");
  }

  public render() {
    return (
      <div className="flex justify-center items-center w-full md:w-2/3 lg:w-1/2 border-2 border-red-50 mt-10 p-3 md:mx-auto">
        <form action="./" onSubmit={this.handleSubmit}>
          {/* NAME OF SERVICE INPUT */}
          <label className="font-bold">Name of service</label>
          <input
            type="text"
            placeholder="ex. Tutoring"
            className="mt-2 mb-5 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none items-center bg-gray-100"
          />

          {/* CATEGORIES INPUT */}
          <div className="flex flex-col">
            <span className="font-bold">Categories</span>

            {/* TODO: Add categories dinamically */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label htmlFor="gardening" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="gardening" />
                <span className="ml-2">Gardening</span>
              </label>

              <label htmlFor="cleaning" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="cleaning" />
                <span className="ml-2">Cleaning</span>
              </label>

              <label
                htmlFor="exterminator"
                className="mt-2 ml-3 cursor-pointer"
              >
                <input type="checkbox" id="exterminator" />
                <span className="ml-2">Exterminator</span>
              </label>

              <label htmlFor="electrician" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="electrician" />
                <span className="ml-2">Electrician</span>
              </label>

              <label htmlFor="mechanic" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="mechanic" />
                <span className="ml-2">Mechanic</span>
              </label>

              <label htmlFor="tutoring" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="tutoring" />
                <span className="ml-2">Tutoring</span>
              </label>

              <label htmlFor="chef" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="chef" />
                <span className="ml-2">Chef</span>
              </label>

              <label htmlFor="catering" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="catering" />
                <span className="ml-2">Catering</span>
              </label>

              <label htmlFor="babysitting" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="babysitting" />
                <span className="ml-2">Babysitting</span>
              </label>

              <label htmlFor="moving-out" className="mt-2 ml-3 cursor-pointer">
                <input type="checkbox" id="moving-out" />
                <span className="ml-2">Moving out</span>
              </label>
            </div>
          </div>

          {/* DESCRIPTION INPUT */}
          <div className="mt-5">
            <label className="font-bold">Description</label>
            <textarea
              placeholder="ex. I'll teach you how to write a proper description for a job."
              className="mt-2 mb-5 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none items-center bg-gray-100"
            />
          </div>

          {/* PRICE PER HOUR INPUT */}
          <label className="font-bold">Price per hour</label>
          <input
            type="text"
            placeholder="ex. 50 / hr"
            className="mt-2 mb-5 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none items-center bg-gray-100"
          />

          {/* AVAILABILITY INPUT */}
          <label className="font-bold">Availability</label>
          <input
            type="text"
            placeholder="ex. Mon-Fri 9:00-16:00"
            className="mt-2 mb-5 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none items-center bg-gray-100"
          />

          {/* BOTON SUBMIT FORM */}
          <div className="flex justify-center mt-7">
            <button
              type="submit"
              className="rounded-full px-10 py-3 bg-gray-100"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  }
}
