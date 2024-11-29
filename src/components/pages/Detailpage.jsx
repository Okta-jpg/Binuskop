import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Detailpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API endpoints (replace with your actual API)
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:3000/movies/${id}`);
        const movieData = await movieResponse.json();
        setMovie(movieData.data);
        
        const showtimesResponse = await fetch(`http://localhost:3000/showtimes/${id}`);
        const showtimesData = await showtimesResponse.json();
        console.log("🚀 ~ fetchMovieDetails ~ showtimesData:", showtimesData.data)
        setShowtimes(showtimesData.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);

  const goToBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  const customStyles = {
    color: "white",
    borderColor: "#CBAE81",
    borderRadius: "10px",
    border: "1px solid #CBAE81",
    marginTop: "5rem",
  };

  const cardStyles = {
    backgroundColor: "rgba(30,30,30,0.8)",
    border: "1px solid #CBAE81",
    borderRadius: "8px",
    backdropFilter: "blur(5px)",
  };

  const colorMovie = {
    color: "#CBAE81",
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  if (!movie) {
    return <div>Movie not found</div>; // Show an error if no movie data is found
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container className="p-4 " style={customStyles}>
        <Row className="h-100 g-4">
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            {movie.image_link ? (
              <Image
                src={movie.image_link}
                alt={movie.title}
                fluid
                className="shadow-lg rounded-3"
                style={{
                  maxHeight: "70vh",
                  border: "1px solid #CBAE81",
                  objectFit: "cover",
                  filter: "brightness(0.9) contrast(1.1)",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </Col>
          <Col md={8} className="overflow-auto" style={{ maxHeight: "80vh" }}>
            <h1
              className="text-center mb-4 text-uppercase"
              style={{
                color: "#CBAE81",
                letterSpacing: "2px",
                fontWeight: 600,
              }}
            >
              {movie.title}
            </h1>

            <Row>
              <Col md={6}>
                <Card className="mb-3" style={cardStyles}>
                  <Card.Body>
                    <h4
                      style={{
                        color: "#CBAE81",
                        borderBottom: "1px solid #CBAE81",
                        paddingBottom: "10px",
                      }}
                    >
                      Movie Details
                    </h4>
                    <div className="text-light">
                      <p>
                        <strong style={colorMovie}>Director:</strong>{" "}
                        {movie.director}
                      </p>
                      <p>
                        <strong style={colorMovie}>Duration:</strong>{" "}
                        {movie.duration} Minutes
                      </p>
                      <p>
                        <strong style={colorMovie}>Release:</strong>{" "}
                        {movie.release_date}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3" style={cardStyles}>
                  <Card.Body>
                    <h4
                      style={{
                        color: "#CBAE81",
                        borderBottom: "1px solid #CBAE81",
                        paddingBottom: "10px",
                      }}
                    >
                      Genre
                    </h4>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {movie.genre.split(", ").map((genre, index) => (
                        <div
                          key={index}
                          className="text-dark"
                          style={{
                            backgroundColor: "#CBAE81",
                            fontSize: 15,
                            padding: "8px 12px",
                            borderRadius: "8px",
                          }}
                        >
                          {genre}
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-3" style={cardStyles}>
              <Card.Body>
                <h4
                  style={{
                    color: "#CBAE81",
                    borderBottom: "1px solid #CBAE81",
                    paddingBottom: "10px",
                  }}
                >
                  Synopsis
                </h4>
                <p className="text-light">{movie.synopsis}</p>
              </Card.Body>
            </Card>

            <Card className="mb-3" style={cardStyles}>
              <Card.Body>
                <h4
                  style={{
                    color: "#CBAE81",
                    borderBottom: "1px solid #CBAE81",
                    paddingBottom: "10px",
                  }}
                >
                  Showtimes
                </h4>
                <Row>
                  {showtimes.map((showtime) => (
                    <Col key={showtime.id} xs={4} className="p-1">
                      <Button
                        variant="outline-light"
                        className="w-100"
                        style={{
                          borderColor: "#CBAE81",
                          color: "#CBAE81",
                          backgroundColor: "transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div>{showtime.start_time}</div>
                        <small>Rp. {showtime.price}</small>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            <Button
              variant="outline"
              size="lg"
              className="w-100 mt-3"
              style={{
                borderColor: "#CBAE81",
                color: "#CBAE81",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#CBAE81",
                  color: "white",
                },
              }}
              onClick={() => goToBooking(movie.id)}
            >
              Booking Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detailpage;
