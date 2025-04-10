const RestaurantCard = ({ resData }) => {
    return (
      <div className="restaurants-card">
        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/${resData.imageId}`} alt={resData.name} />
        <h3>{resData.name}</h3>
        <h4>{resData.avgRating} stars</h4>
        <h4>{resData.cuisines}</h4>
        <h4>{resData.deliveryTime}</h4>
      </div>
    );
  };

  export default RestaurantCard;