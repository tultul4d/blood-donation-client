

const RequestItem = ({item}) => {
    const {recipientName, recipientDistrict, donationDate} =item;
    return (
        <div className="  bg-base-100  shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src="https://i.ibb.co/hRtm6ms/world-blood-donor-day-creative-collage-1.jpg"
      alt="Shoes"
      className="rounded-xl w-48 h-32 " />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{recipientName}</h2>
    <div className="flex justify-between gap-6"><p>  <span className="font-semibold gap-2">District:</span>{recipientDistrict}</p>
    <p> <span className="font-semibold gap-2">Date:</span>{donationDate}</p></div>
   
  </div>
</div>
    );
};

export default RequestItem;