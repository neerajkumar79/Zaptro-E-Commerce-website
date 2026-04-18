/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [fetched, setFetched] = useState(false);

    const fetchAllProducts = useCallback(async () => {
        if (fetched && !loading && data.length > 0) {
            return;
        }

        setLoading(true);
        setFetchError(null);
        try {
            const res = await axios.get('https://dummyjson.com/products?limit=150');
            const productsData = res.data.products || [];
            setData(productsData);
            setFetched(true);
        } catch {
            setFetchError('Failed to fetch products. Please refresh.');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [fetched, loading, data.length]);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => {
            return curElem[property];
        });
        newVal = ["All", ...new Set(newVal)];
        return newVal;
    };
    
    const categoryOnlyData = getUniqueCategory(data, "category");
    const brandOnlyData = getUniqueCategory(data, "brand");
    
    return (
        <DataContext.Provider value={{ 
            data, 
            loading, 
            error: fetchError, 
            setData, 
            fetchAllProducts, 
            categoryOnlyData, 
            brandOnlyData,
            fetched
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};

