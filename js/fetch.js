async function fetchMovies(keyword) {
  const apiKey = "df662044";
  const hasilContainer = document.querySelector("#hasil");
  hasilContainer.innerHTML = "";

  if (!keyword || keyword.trim() === "") {
    tampilSVG(hasilContainer);
    return;
  }

  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}&type=movie`
    );

    if (response.data.Response === "True") {
      const searchResults = response.data.Search;

      for (let movie of searchResults) {
        const detailRes = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
        );
        const detail = detailRes.data;

        // Panggil fungsi pembuat card
        buatCard(detail, hasilContainer);
      }
    } else {
      hasilContainer.innerHTML = `<p>${response.data.Error}</p>`;
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    hasilContainer.innerHTML = `<p>Terjadi kesalahan saat fetch data.</p>`;
  }
}

// Fungsi untuk membuat dan menyisipkan card
function buatCard(detail, container) {
  const cardHTML = `
    <div class="card">
      <img class="image" src="${
        detail.Poster !== "N/A" ? detail.Poster : "placeholder.jpg"
      }" alt="${detail.Title}" />
      <div class="content">
        <h2>${detail.Title}</h2>
        <h3>${detail.Year}</h3>
        <p class="plot">${detail.Plot}</p>
        <p class="read-more">Read more</p>
        <div class="details">
          <span class="item">
            <i class="fa-regular fa-star"></i>
            <em>${detail.imdbRating}/10</em>
          </span>
        </div>
        <div class="buttons">
          <a href="detail.html?id=${
            detail.imdbID
          }" class="primary-btn">Detail</a>
        </div>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", cardHTML);

  // Tambahkan event listener ke tombol Read More
  const lastCard = container.lastElementChild;
  const plot = lastCard.querySelector(".plot");
  const readMoreBtn = lastCard.querySelector(".read-more");

  readMoreBtn.addEventListener("click", () => {
    plot.classList.toggle("expanded");
    readMoreBtn.textContent = plot.classList.contains("expanded")
      ? "Read less"
      : "Read more";
  });
}

function searchMovie() {
  const form = document.querySelector(".search-bar");
  const input = form.querySelector(".field-input");
  const hasilContainer = document.querySelector("#hasil");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyword = input.value.trim();

    if (keyword) {
      fetchMovies(keyword);
    } else {
      tampilSVG(hasilContainer);
    }
  });
}

function tampilSVG(container) {
  container.innerHTML = `
  <div class="loading">
    <svg>
      <g>
        <path d="M 50,100 A 1,1 0 0 1 50,0" />
      </g>
      <g>
        <path d="M 50,75 A 1,1 0 0 0 50,-25" />
      </g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #ff56a1; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #ff9350; stop-opacity: 1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  searchMovie();
  tampilSVG(document.querySelector("#hasil"));
});
