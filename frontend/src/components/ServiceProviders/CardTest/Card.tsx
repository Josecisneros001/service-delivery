import React, { Component } from 'react';

export default class Card extends Component {

  handleSubmit(event: any){
    event?.preventDefault();
    // TODO: Backend API Implemenation.
    console.log("Service Created");
  }

  public render() {
    return (       
        <div className="flex justify-center items-center w-full md:w-2/3 lg:w-1/2 border-2 border-red-50 mt-10 p-3 md:mx-auto">
          Hello from card
        </div>
    );
  }
}
