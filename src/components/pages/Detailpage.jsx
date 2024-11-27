import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Detailpage = () => {

  const navigate = useNavigate();

  const movie = {
    title: "Venom: The Last Dance",
    posterUrl: "https://image.tmdb.org/t/p/w500//aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    genre: ["Sci-Fi", "Action"],
    director: "Kelly Marcel",
    writers: "Christopher Nolan",
    production: "Warner Bros",
    synopsis: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance."
  };

  const goToBooking = (movieId) => {
    navigate(`/booking/${movieId}`);
  };
  
  const showtimes = [
    { id: 1, time: '12:30 PM', theater: 'Studio 1' },
    { id: 2, time: '14:00 PM', theater: 'Studio 2' },
    { id: 3, time: '19:00 PM', theater: 'Studio 3' },
    { id: 4, time: '21:00 PM', theater: 'Studio 4' }
  ];

  const customStyles = {
    color: 'white',
    borderColor: '#CBAE81',
    borderRadius: '10px',
    border : '1px solid #CBAE81',
    marginTop: '5rem',
  };

  const cardStyles = {
    backgroundColor: 'rgba(30,30,30,0.8)', 
    border: '1px solid #CBAE81',
    borderRadius: '8px',
    backdropFilter: 'blur(5px)'
  };

  const colorMovie = {
    color : '#CBAE81'
  }


  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
    <Container className="p-4 " style={customStyles}>
      <Row className="h-100 g-4">
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <Image 
            src={movie.posterUrl} 
            alt={movie.title} 
            fluid 
            className="shadow-lg rounded-3"
            style={{
              maxHeight: '70vh', 
              border : '1px solid #CBAE81',
              objectFit: 'cover',
              filter: 'brightness(0.9) contrast(1.1)',
              borderRadius: '15px',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
        </Col>
        <Col md={8} className="overflow-auto" style={{maxHeight: '80vh'}}>
          <h1 
            className="text-center mb-4 text-uppercase" 
            style={{
              color: '#CBAE81', 
              letterSpacing: '2px', 
              fontWeight: 600
            }}
          >
            {movie.title}
          </h1>

          <Row>
            <Col md={6}>
              <Card className="mb-3" style={cardStyles}>
                <Card.Body>
                  <h4 style={{color: '#CBAE81', borderBottom: '1px solid #CBAE81', paddingBottom: '10px'}}>
                    Movie Details
                  </h4>
                  <div className="text-light">
                    <p><strong style={colorMovie}>Director:</strong> {movie.director}</p>
                    <p><strong style={colorMovie}>Writers:</strong> {movie.writers}</p>
                    <p><strong style={colorMovie}>Production:</strong> {movie.production}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3" style={cardStyles}>
                <Card.Body>
                  <h4 style={{color: '#CBAE81', borderBottom: '1px solid #CBAE81', paddingBottom: '10px'}}>
                    Genre
                  </h4>
                  <div className="d-flex flex-wrap gap-2 justify-content-center" >
                    {movie.genre.map((genre, index) => (
                      <div key={index} className="text-dark"
                        style={{
                          backgroundColor: '#CBAE81', 
                          fontSize : 15,
                          padding: '8px 12px',
                          borderRadius: '8px'}}>{genre}</div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-3" style={cardStyles}>
            <Card.Body>
              <h4 style={{color: '#CBAE81', borderBottom: '1px solid #CBAE81', paddingBottom: '10px'}}>
                Synopsis
              </h4>
              <p className="text-light">{movie.synopsis}</p>
            </Card.Body>
          </Card>

          <Card className="mb-3" style={cardStyles}>
            <Card.Body>
              <h4 style={{color: '#CBAE81', borderBottom: '1px solid #CBAE81', paddingBottom: '10px'}}>
                Showtimes
              </h4>
              <Row>
                {showtimes.map((showtime) => (
                  <Col key={showtime.id} xs={4} className="p-1">
                    <Button 
                      variant="outline-light"
                      className="w-100"
                      style={{
                        borderColor: '#CBAE81', 
                        color: '#CBAE81',
                        backgroundColor: 'transparent',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div>{showtime.time}</div>
                      <small>{showtime.theater}</small>
                    </Button>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          
        <Button variant="outline" size="lg" className="w-100 mt-3"
            style={{
              borderColor: '#CBAE81', 
              color: '#CBAE81',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#CBAE81',
                color: 'white'
              }
              }} onClick={() => goToBooking(1)}>Booking Now</Button>
        </Col>
      </Row>
    </Container>
      </div>
  );
};

export default Detailpage;