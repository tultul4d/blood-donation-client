import { useEffect } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useState } from "react";
import RequestItem from "../../../Shared/RequestItem/RequestItem";


const Cards = () => {
    const [request, setRequest] = useState([]);
    useEffect( () =>{
       fetch('https://blood-donation-server-five.vercel.app/request')
       .then(res => res.json())
       .then(data => {
        // const doneItems = data.filter(item => item.donationStatus === "do")
        setRequest(data)})
    }, [])
    return (
        <section>
           <SectionTitle 
            heading= "Form Our Card"
            subHeading="best problroewihg  "
           ></SectionTitle>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-6  md:gap-2 mt-10">
              {
                request.map(item => <RequestItem key={item._id} item={item}></RequestItem>)
              }

           </div>
        </section>
    );
};

export default Cards;