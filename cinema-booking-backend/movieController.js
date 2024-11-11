// movieController.js

// Simulated movie database
const movies = [
  { title: 'Movie 1', genre: 'Action', releaseDate: '2024-01-01' },
  { title: 'Movie 2', genre: 'Drama', releaseDate: '2024-02-15' },
  // Add more movies as needed
];

// Movie search logic
exports.searchMovies = (req, res) => {
  const { title, genre, releaseDate } = req.query;
  let results = movies;

  if (title) {
    results = results.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
  }
  if (genre) {
    results = results.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
  }
  if (releaseDate) {
    results = results.filter(movie => movie.releaseDate === releaseDate);
  }

  res.status(200).json(results);
};
