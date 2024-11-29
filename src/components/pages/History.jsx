import { Container, Row, Col, Modal, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const History = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3000/tickets', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json', 
                      'access_token': localStorage.getItem("access_token") 
                    },
                  });

                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                const result = await response.json();
                console.log("🚀 ~ fetchTickets ~ result:", result.data)
                setTickets(result.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const openModal = (ticket) => {
        setSelectedTicket(ticket)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedTicket(null)
    }

    const backgroundPage = {
        background: 'linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
    }

    const backgroundHistory = {
        // border: '1px #CBAE81 solid',
        borderRadius: '5px',
        backgroundColor: 'rgba(203, 174, 129, 0.1)',
        transition: '0.2s'
    }

    const noWrap = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    return (
        <div class="min-wh-100 min-vh-100 text-white" style={{ paddingTop: '80px', overflowY:'hidden', ...backgroundPage }}>
            <div className="w-100 h-100 d-flex flex-column align-items-center">
                <Container fluid className="w-100 d-flex flex-row justify-content-center" style={{ height:'70px', position:'fixed', backgroundColor:'rgba(26, 26, 26, 1)' }}>
                    <Row className="w-75 h-100 align-items-end justify-content-between p-3" style={{ borderBottom:'2px #CBAE81 solid' }}>
                        <Col className="p-0" xs={4}><p className="text-start"><b>TITLE</b></p></Col>
                        <Col className="p-0" xs={1}><p><b>START</b></p></Col>
                        <Col className="p-0" xs={1}><p><b>END</b></p></Col>
                        <Col className="p-0 d-none d-md-block" xs={1}><p><b>QTY.</b></p></Col>
                        <Col className="p-0 d-none d-md-block" xs={2}><p><b>SEATS</b></p></Col>
                        <Col className="p-0" xs={2}><p><b>PAYMENT</b></p></Col>
                    </Row>
                </Container>
                <Container fluid className="d-flex flex-column w-100 align-items-center mt-2" style={{ 'overflow-y': 'hidden', 'padding-top':'80px', gap:'16px' }}>
                    {tickets.map((ticket) => {
                        return (
                            <Row className="history-card w-75 align-items-center justify-content-between p-3"
                            style={{ height: '60px', ...backgroundHistory, cursor:'pointer' }}
                            onClick={() => openModal(ticket)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(203, 174, 129, 0.2)'} 
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(203, 174, 129, 0.1)'}>
                                <Col className="p-0" xs={4}><p className="text-start" style={{ ...noWrap }} >{ticket.Showtime.Movie.title}</p></Col>
                                <Col className="p-0" xs={1}><p>{ticket.Showtime.start_time}</p></Col>
                                <Col className="p-0" xs={1}><p>{ticket.Showtime.end_time}</p></Col>
                                <Col className="p-0 d-none d-md-block" xs={1}><p>{ticket.Transaction.quantity}</p></Col>
                                <Col className="p-0 d-none d-md-block" xs={2}><p style={{ ...noWrap }} >{ticket.seat_number}</p></Col>
                                <Col className="p-0" xs={2}><p style={{ ...noWrap }} >{ticket.Transaction.payment_method}</p></Col>
                            </Row>
                        )
                    })}
                </Container>
            </div>

            {selectedTicket && (
                <Modal show={showModal} onHide={closeModal}
                className="d-flex justify-content-center align-items-center w-100 h-100 m-0 p-0"
                dialogClassName="d-flex w-75 h-auto" style={{ width:'500px', height:'1000px'}}>
                    <Modal.Header className="m-0 p-3" closeButton style={{ backgroundColor: 'rgb(203, 174, 129)', color: 'white' }}>
                        <Modal.Title style={{ color:'rgba(26, 26, 26, 1)' }}><strong>TICKET DETAILS</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex m-0 p-1 p-2 w-100 h-100" style={{ backgroundColor: 'rgba(203, 174, 129, 0.5)' }}>
                        <Container fluid className="d-flex flex-row w-100 h-100 m-0 p-0" style={{ gap:'10px' }}>
                            <img src={selectedTicket.Showtime.Movie.image_link} alt="Not Found!" className="w-50 h-100" style={{ objectFit:'cover', objectPosition:'center' }}/>
                            <Table bordered={false} striped={false} className="w-50 h-100">
                                <tbody>
                                <tr>
                                    <td className="m-0 p-1"><strong>Ticket ID</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.id}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Title</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Showtime.Movie.title}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Genre</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Showtime.Movie.genre}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Time</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Showtime.start_time}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Duration</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Showtime.Movie.duration} minutes</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Quantity</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Transaction.quantity} seat(s)</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Seats</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.seat_number}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Price</strong></td>
                                    <td className="m-0 p-1">Rp.{selectedTicket.Transaction.total_amount}</td>
                                </tr>
                                <tr>
                                    <td className="m-0 p-1"><strong>Payment</strong></td>
                                    <td className="m-0 p-1">{selectedTicket.Transaction.payment_method}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )
}

export default History;