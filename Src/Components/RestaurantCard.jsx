const RestaurantCard = ({ resData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 group cursor-pointer transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${resData.imageId}`}
          alt={resData.name}
          className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {resData.promoted && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold">
            PROMOTED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200">
          {resData.name}
        </h3>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            {resData.avgRating}
          </span>
          <span className="text-gray-500 font-medium">{resData.deliveryTime}</span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {resData.cuisines.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
