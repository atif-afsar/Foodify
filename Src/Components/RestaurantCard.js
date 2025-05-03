const RestaurantCard = ({ resData }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${resData.imageId}`}
        alt={resData.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{resData.name}</h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md font-medium">
            ⭐ {resData.avgRating}
          </span>
          <span className="text-gray-500">{resData.deliveryTime}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {resData.cuisines.join(", ")}
        </p>
      </div>
    </div>
  );
};
 // higher order component

 
export default RestaurantCard;
