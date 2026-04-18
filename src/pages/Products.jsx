import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import MobileFilter from '../components/MobileFilter';
import Lottie from 'lottie-react';
import notfound from "../assets/notfound.json";

const Products = () => {
  const { data, loading, error, fetchAllProducts } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  // Fetch data ONCE when component mounts
  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, [fetchAllProducts]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  // Safe filtering with optional chaining
  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]
  ) || [];

  const dynamicPage = Math.ceil(filteredData.length / 8);

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-[400px] text-red-500'>
        <h2 className='text-2xl font-bold mb-4'>{error}</h2>
        <button
          onClick={fetchAllProducts}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[400px]'>
        <h2 className='text-2xl font-bold'>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto px-4 mb-10'>
      <MobileFilter 
        openFilter={openFilter} 
        setOpenFilter={setOpenFilter} 
        search={search} 
        setSearch={setSearch} 
        brand={brand} 
        setBrand={setBrand} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
        category={category} 
        setCategory={setCategory} 
        handleCategoryChange={handleCategoryChange} 
        handleBrandChange={handleBrandChange}
      />
      
      {data?.length > 0 ? (
        <>
          <div className='flex gap-8'>
            <FilterSection 
              search={search} 
              setSearch={setSearch} 
              brand={brand} 
              setBrand={setBrand} 
              priceRange={priceRange} 
              setPriceRange={setPriceRange} 
              category={category} 
              setCategory={setCategory} 
              handleCategoryChange={handleCategoryChange} 
              handleBrandChange={handleBrandChange} 
            />
            {filteredData.length > 0 ? (
              <div className='flex flex-col justify-center items-center'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10'>
                  {filteredData.slice(page * 8 - 8, page * 8).map((product, index) => (
                    <ProductCard key={product.id || index} product={product} />
                  ))}
                </div>
                <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
              </div>
            ) : (
              <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                <Lottie animationData={notfound} className='w-[500px]' />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center h-[400px]'>
          <h2 className='text-2xl'>No products found</h2>
        </div>
      )}
    </div>
  );
};

export default Products;

