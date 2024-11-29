import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Bookingpage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/showtimes/${id}`);
        const result = await response.json();

        if (result.status === 200) {
          setShowtimes(result.data);
        } else {
          console.error("Failed to fetch showtimes");
        }
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowtimes();
  }, [id]);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 10;
  const ticketPrice = 35000;

  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSeatClick = (seat) => {
    console.log("🚀 ~ handleSeatClick ~ seat:", seat)
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

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    
    const bookingData = {
      start_time: selectedShowtime,  
      seat_number: selectedSeats.join(","),  
      quantity,
      totalPrice,
    };
    

    try {
      const response = await fetch(`http://localhost:3000/tickets/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking successful!");
        navigate("/history")
      } else {
        alert("Booking failed. You need to login first.");
      }
    } catch (error) {
      alert("Error submitting booking. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "100px", paddingBottom: "20px" }}>
      <Container className="p-4">
        <div style={{ border: "1px solid #CBAE81", borderRadius: "10px", backgroundColor: "#1c1c1c", padding: "20px", marginBottom: "20px" }}>
          <Row>
            <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: "100%" }}>
              <img src={showtimes[0]?.Movie?.image_link || ""} alt={showtimes[0]?.Movie?.title || "Movie"} style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "8px", marginBottom: "15px" }} />
              <h5 style={{ color: "#ffffff" }}>{showtimes[0]?.Movie?.title || "Movie Title"}</h5>
            </Col>
            <Col md={8}>
              <div style={{ marginTop: "80px", border: "1px solid #CBAE81", borderRadius: "10px", padding: "20px", backgroundColor: "#1c1c1c" }}>
                <h5 style={{ marginBottom: "20px", textAlign: "center", borderBottom: "1px solid #CBAE81", color: "#CBAE81" }}>Order Details</h5>
                <Form onSubmit={handleBookingSubmit}>
                  <Form.Group controlId="formShowtime">
                    <Form.Label style={{ color: "#CBAE81" }}>Select Showtime</Form.Label>
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                      {showtimes.map((time, index) => (
                        <Button
                          key={index}
                          style={{ backgroundColor: selectedShowtime === time.start_time ? "#CBAE81" : "#333", color: selectedShowtime === time.start_time ? "#000" : "#fff" }}
                          onClick={() => handleShowtimeClick(time.start_time)}
                        >
                          {time.start_time}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formQuantity" style={{ marginTop: "20px" }}>
                    <Form.Label style={{ color: "#CBAE81" }}>Number of Tickets</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      required
                      style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #666" }}
                    />
                  </Form.Group>

                  <Form.Text className="text-center" style={{ display: "block", marginTop: "10px", color: "#CBAE81" }}>
                    Tickets Selected: {selectedSeats.length}/{quantity}
                  </Form.Text>

                  <Form.Text className="text-center" style={{ display: "block", marginTop: "10px", color: "#CBAE81" }}>
                    Total Amount: Rp {totalPrice.toLocaleString()}
                  </Form.Text>

                  <Button type="submit" style={{ backgroundColor: "#CBAE81", color: "#000", width: "100%", marginTop: "20px" }} disabled={!selectedShowtime || selectedSeats.length !== quantity}>
                    Confirm Order
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>

        <div style={{ border: "1px solid #CBAE81", borderRadius: "10px", backgroundColor: "#1c1c1c", padding: "20px", marginTop: "60px" }}>
          <h5 style={{ color: "#CBAE81", textAlign: "center", borderBottom: "1px solid #CBAE81", marginBottom: "15px" }}>Choose Your Seat</h5>
          <div style={{ backgroundColor: "#333", padding: "10px", marginBottom: "15px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }}>
            <span style={{ color: "#CBAE81", fontSize: "16px" }}>SCREEN</span>
          </div>
          <div>
            {rows.map((row) => (
              <Row key={row} className="justify-content-center mb-2">
                {[...Array(seatsPerRow).keys()].map((seatIndex) => {
                  const seat = `${row}${seatIndex + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  const isDisabled = selectedSeats.length >= quantity && !isSelected;

                  return (
                    <Col key={seat} xs="auto">
                      <Button
                        style={{
                          backgroundColor: isSelected ? "#CBAE81" : "#444",
                          color: isSelected ? "#000" : "#fff",
                          width: "40px",
                          height: "40px",
                          borderRadius: "6px",
                          border: "1px solid #666",
                          fontSize: "12px",
                          fontWeight: "bold",
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
      </Container>
    </div>
  );
};

export default Bookingpage;
