

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch meals on load
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => setMeals(data.meals.slice(0, 12)))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  //  search query
  const handleSearch = e => {
    e.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(response => response.json())
      .then(data => setMeals(data.meals))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className="min-h-screen mx-auto p-5 md:p-10 lg:p-20">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full mb-10 flex flex-col items-center"
      >
        <input
          type="text"
          className="border border-gray-300 p-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Search for a meal"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 mt-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {meals.map(meal => (
          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
            <div className="card border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="
                w-full h-48 object-cover rounded-t-lg md:h-64 lg:h-80 xl:h-80"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl xl:text-3xl">
                  {meal.strMeal}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;