import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setMovies(result.data);
      } else {
        setMovies([]); 
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = Array.isArray(movies)
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const goToDetail = (id) => {
      console.log("id "+ id);
      navigate(`/detail/${id}`);
    };

  const title = {
    color: "#CBAE81",
    paddingTop: "8rem",
    marginBottom: "1.5rem",
  };

  const Explore = {
    color: "#CBAE81",
    paddingTop: "4rem",
  };

  const button = {
    backgroundColor: "#CBAE81",
    color: "black",
    borderColor: "black",
  };

  const classCard = {
    borderColor: "#CBAE81",
    width: "18rem",
  };

  const CardBody = {
    background:
      "linear-gradient(135deg, rgba(203, 174, 129, 0.8), rgba(203, 174, 129, 0.6))",
    padding: "20px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease",
  };

  return (
    <div className="container">
      <h1 style={title}>SEARCH MOVIES</h1>
      {/* {<pre>{JSON.stringify(movies)}</pre>} */}
      <input
        placeholder="SEARCH YOUR FAVORITE MOVIES"
        className="Movie-Search"
      />

      <h1 style={Explore}>Explore The Movie</h1>
      <div
        className="d-flex flex-wrap justify-content-center gap-4 bg-transparent text-white py-3"
        // onClick={() => navigate("/detail/${movie.id}")}
      >
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            className="bg-secondary border-1"
            style={classCard}
          >
            <Card.Img variant="top" src={movie.image_link} />
            <Card.Body style={CardBody}>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text className="text-muted">{movie.genre}</Card.Text>
              <Button
                style={button}
                onClick={() => goToDetail(movie.id)}
              >
                Buy Tickets
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
