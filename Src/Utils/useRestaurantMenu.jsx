import { useEffect, useState } from "react";
import { getMockMenuResponse } from "./mockData.jsx";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Use mock data instead of API call
            const json = getMockMenuResponse(resId);
            setResInfo(json.data);
        } catch (error) {
            console.error("Failed to fetch restaurant menu:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { resInfo, loading, error };
};

export default useRestaurantMenu;
