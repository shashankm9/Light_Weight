export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

const API_KEY = "y4nrRJu9wIjxTCjfxUkMZA==T1BJJRLBn4qvIDim"; // Replace with your actual API key
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

/**
 * Fetch exercises for a given equipment.
 * @param {string} equipment - The name of the equipment.
 * @returns {Promise<Exercise[]>} - A promise that resolves to an array of exercises.
 */
export async function fetchExercises(equipment: string): Promise<Exercise[]> {
  try {
    //console.log(`Fetching exercises for: ${equipment}`);

    const response = await fetch(`${BASE_URL}?equipment=${encodeURIComponent(equipment.toLowerCase())}`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Error fetching exercises: ${response.status}`);
    }

    const data: Exercise[] = await response.json();

    //console.log(`API Response for ${equipment}:`, data); // Debugging log

    // Filter exercises to only include the ones matching the requested equipment
    return data.filter((exercise) => exercise.equipment.toLowerCase() === equipment.toLowerCase());
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
    return [];
  }
}

export default {
  fetchExercises,
};
