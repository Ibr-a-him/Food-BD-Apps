
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Meal = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => setMeal(data.meals[0]))
      .catch(error => console.error('Error fetching meal details:', error));
  }, [id]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col items-center">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-lg mb-5 w-[400px]"
        />
        <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
        <p className="mt-5">{meal.strInstructions}</p>
        <ul className="mt-5 list-disc">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map(i => meal[`strIngredient${i}`])
            .filter(ingredient => ingredient)
            .map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Meal;
