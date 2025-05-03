import { useEffect, useState } from "react";
import { MENU_API } from "../Utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, [resId]); // include resId as dependency in case it changes

    const fetchData = async () => {
        try {
            const data = await fetch(MENU_API + resId);
            const json = await data.json();
            setResInfo(json.data);
        } catch (error) {
            console.error("Failed to fetch restaurant menu:", error);
        }
    };

    return resInfo;
};

export default useRestaurantMenu;
