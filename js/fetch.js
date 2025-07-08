async function fetchMovies(keyword) {
  const apiKey = "df662044";
  const hasilContainer = document.querySelector("#hasil");
  hasilContainer.innerHTML = "";

  try {
    // Fetch halaman pertama untuk tahu total halaman
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}&type=movie`
    );
    console.log(response);

    // Tangani error Too many results
    // if (
    //   response.data.Response === "False" &&
    //   response.data.Error === "Too many results."
    // ) {
    //   alert(
    //     "Terlalu banyak hasil. Silakan gunakan kata kunci yang lebih spesifik."
    //   );
    //   return;
    // }

    if (response.data.Response === "True") {
      // Loop setiap film dan ambil detail lengkap
      const searchResults = response.data.Search;
      for (let movie of searchResults) {
        const detailRes = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
        );
        const detail = detailRes.data;
        console.log(detail);

        // Buat elemen HTML berdasarkan detail
        const cardHTML = `
          <div class="card">
            <img class="image" src="${
              detail.Poster !== "N/A" ? detail.Poster : "placeholder.jpg"
            }" alt="${detail.Title}" />
            <div class="content">
              <h2>${detail.Title}</h2>
              <h3>${detail.Year}</h3>
              <p>${detail.Plot}</p>
              <a class="read-more" href="">Read more</a>
              <div class="details">
                <span class="item">
                  <i class="fa-regular fa-star"></i>
                  <em>${detail.imdbRating}/10</em>
                </span>
              </div>
              <div class="buttons">
                <a href="detail.html?id=${
                  detail.imdbID
                }" class="primary-btn">Search</a>
              </div>
            </div>
          </div>
        `;

        hasilContainer.innerHTML += cardHTML;
      }
    } else {
      hasilContainer.innerHTML = `<p>${response.data.Error}</p>`;
    }
  } catch (err) {
    console.error(err);
    hasilContainer.innerHTML = `<p>Terjadi kesalahan saat fetch data.</p>`;
  }
}

fetchMovies();
