const API = `https://www.omdbapi.com/?apikey=df662044&t=hello+world `;

async function fetchMovies() {
  try {
    const response = await axios.get(API);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchMovies();
