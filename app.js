
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const genreSelect = document.getElementById("genre");
    const ratingSelect = document.getElementById("rating");
    const yearSelect = document.getElementById("year");
    const resultsContainer = document.getElementById("results-container");
  
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      const genre = genreSelect.value;
      const rating = ratingSelect.value;
      const year = yearSelect.value;
  
      fetch("movies.json")
        .then(response => response.json())
        .then(movies => {
          const filteredMovies = getFilteredMovies(movies, genre, rating, year);
          displayMovies(filteredMovies);
        });
    });
  
  
    function getFilteredMovies(movies, genre, rating, year) {
      console.log("genre: " + genre + ", rating: " + rating + ", year: " + year);
      var filteredMovies = movies;
  
  
      if (genre && genre !== "All") {
        filteredMovies = filteredMovies.filter(function(movie) {
          return movie.genres.includes(genre);
        });
      }
  
      if (year && year !== "All") {
        filteredMovies = filteredMovies.filter(function(movie) {
          return movie.release_date.includes(year);
        });
      }
      
  
      if (rating && rating !== "All") {
        filteredMovies = filteredMovies.filter(function(movie) {
          return movie.vote_average >= parseFloat(rating);
        });
      }
          
  
  
      console.log(filteredMovies);
  
      return filteredMovies;
    }
  
  
  
  function displayMovies(movies) {
    const resultsContainer = document.querySelector("#results-container");
    resultsContainer.innerHTML = "";
  
    if (movies.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No movies found.";
      resultsContainer.appendChild(message);
    }
  
  
    else {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Rank</th>
            <th>Movie</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Year</th>
          </tr>
        </thead>
      `;
      const tbody = document.createElement("tbody");
      let rank = 1;
      movies.forEach(movie => {
        const row = document.createElement("tr");
        const rankCell = document.createElement("td");
        rankCell.textContent = rank;
        row.appendChild(rankCell);
  
        const nameCell = document.createElement("td");
        const posterContainer = document.createElement("div");
        const posterImg = document.createElement("img");
        posterImg.src = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
        
        posterImg.style.width = "80px"; 
        posterImg.style.height = "120px";
        posterContainer.style.display = "flex";
        posterContainer.style.alignItems = "center";
        posterContainer.appendChild(posterImg);
  
        const nameContainer = document.createElement("div");
        nameContainer.style.marginLeft = "10px";
        nameContainer.style.textAlign = "left";
        const movieName = document.createElement("p");
        movieName.textContent = movie.title;
        movieName.style.marginBottom = "0";
        nameContainer.appendChild(movieName);
  
        const year = movie.release_date.split("-")[0];
        const movieYear = document.createElement("p");
        movieYear.textContent = year;
        movieYear.style.marginTop = "0";
        nameContainer.appendChild(movieYear);
  
  
        posterContainer.appendChild(nameContainer);
        nameCell.appendChild(posterContainer);
        row.appendChild(nameCell);
  
        const genreCell = document.createElement("td");
        genreCell.textContent = Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres;
        row.appendChild(genreCell);
  
        const ratingCell = document.createElement("td");
        ratingCell.textContent = movie.vote_average;
        row.appendChild(ratingCell);
  
        const yearCell = document.createElement("td");
        yearCell.textContent = year;
        row.appendChild(yearCell);
  
        tbody.appendChild(row);
        rank++;
      });
      table.appendChild(tbody);
      resultsContainer.appendChild(table);
    }
  }
  
    
  });