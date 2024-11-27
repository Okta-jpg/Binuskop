import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Bookingpage = () => {
  const { id } = useParams();
  
  const movies = [
    {
      id: 1,
      title: 'Venom: The Last Dance',
      posterUrl: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
      showtimes: ['12:30 PM', '14:00 PM', '19:00 PM', '21:00 PM'],
    },
    {
      id: 2,
      title: 'Terrifier 3',
      posterUrl: 'https://image.tmdb.org/t/p/w500/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg',
      showtimes: ['12:00 PM', '15:30 PM', '18:30 PM', '20:30 PM'],
    },
  ];

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;
  const ticketPrice = 35000;

  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Movie not found!</div>;
  }

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < quantity) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleShowtimeClick = (time) => {
    setSelectedShowtime(time);
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Container className="p-4 ">
        <div
          style={{
            border: '1px solid #CBAE81',
            borderRadius: '10px',
            backgroundColor: '#1c1c1c',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <Row>
            <Col md={4} className="text-center">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
                }}
              />
              <h5 style={{ fontWeight: 'bold', color: '#ffffff' }}>{movie.title}</h5>
            </Col>
            <Col md={8}>
              <h5
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderBottom: '1px solid #CBAE81',
                  paddingBottom: '10px',
                  marginBottom: '20px',
                }}
              >
                Detail Pemesanan
              </h5>
              <div className="mb-3">
                <h6 style={{ textAlign: 'left', fontWeight: 'normal', color: '#CBAE81' }}>
                  Pilih Jam Tayang:
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {movie.showtimes.map((time, index) => (
                    <Button
                      key={index}
                      style={{
                        backgroundColor: selectedShowtime === time ? '#CBAE81' : '#333',
                        color: selectedShowtime === time ? '#000' : '#fff',
                        border: '1px solid #CBAE81',
                        width: '60px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() => handleShowtimeClick(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <Form.Label style={{ fontWeight: 'normal', color: '#CBAE81' }}>Jumlah Tiket</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value) || 1);
                    setSelectedSeats([]);
                  }}
                  required
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #666',
                    width: '100%',
                  }}
                />
              </div>
              <p style={{ textAlign: 'left', fontWeight: 'normal', color: '#CBAE81', margin: '10px 0' }}>
                Tickets Selected: {selectedSeats.length}/{quantity}
              </p>
              <p style={{ textAlign: 'left', fontWeight: 'normal', color: '#CBAE81', marginBottom: '10px' }}>
                Total Amount: Rp {totalPrice.toLocaleString()}
              </p>
            </Col>
          </Row>
        </div>
        <div
          style={{
            border: '1px solid #CBAE81',
            borderRadius: '10px',
            backgroundColor: '#1c1c1c',
            padding: '20px',
          }}
        >
          <h5
            style={{
              marginBottom: '15px',
              fontWeight: 'bold',
              textAlign: 'center',
              borderBottom: '1px solid #CBAE81',
              paddingBottom: '5px',
            }}
          >
            Pilih Kursi Anda
          </h5>
          <div
            style={{
              backgroundColor: '#333',
              padding: '10px',
              marginBottom: '15px',
              textAlign: 'center',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
          >
            SCREEN
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {rows.map((row) => (
              <Row key={row} className="justify-content-center mb-1">
                {[...Array(seatsPerRow).keys()].map((seatIndex) => {
                  const seat = `${row}${seatIndex + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  const isDisabled =
                    selectedSeats.length >= quantity && !isSelected;

                  return (
                    <Col
                      key={seat}
                      xs="auto"
                      style={{
                        padding: '2px',
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: isSelected
                            ? '#CBAE81'
                            : isDisabled
                            ? '#555'
                            : '#444',
                          color: isSelected ? '#000' : '#fff',
                          width: '25px',
                          height: '25px',
                          borderRadius: '4px',
                          border: '1px solid #666',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => !isDisabled && handleSeatClick(seat)}
                        disabled={isDisabled}
                      >
                        {seat}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </div>
        </div>
        <Button
          style={{
            backgroundColor: '#CBAE81',
            color: '#000',
            width: '100%',
            marginTop: '20px',
            padding: '10px',
            fontWeight: 'bold',
            borderRadius: '5px',
            border: 'none',
          }}
          disabled={!selectedShowtime || selectedSeats.length !== quantity}
        >
          Konfirmasi Pesanan
        </Button>
      </Container>
    </div>
  );
};

export default Bookingpage;