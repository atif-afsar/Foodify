import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../Utils/constants";
import { addItem } from "../Utils/cartSlice";

const ItemList = ({ items = [] }) => {   // 🛠️ Default empty array here
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white"
        >
          {/* Food Image */}
          <div className="relative w-56 h-28">
            <img
              src={IMG_CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Add Button */}
            <button
              className="absolute bottom-0 px-1 bg-white text-green-600 rounded shadow-lg hover:bg-green-100 transition-all duration-300"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.card.info.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.card.info.description}
              </p>
            </div>
            <div className="text-green-600 font-bold text-base mt-2">
              ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
