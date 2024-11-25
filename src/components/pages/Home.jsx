import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const movies = [
    {
      id: 1,
      title: 'Venom: The Last Dance',
      imageUrl: 'https://image.tmdb.org/t/p/w500//aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
      rating: '7.6'
    },
    {
      id: 2,
      title: 'Terrifier 3',
      imageUrl: 'https://image.tmdb.org/t/p/w500//l1175hgL5DoXnqeZQCcU3eZIdhX.jpg',
      rating: '7.6'
    },
    {
        id: 3,
        title: 'Red One',
        imageUrl: 'https://image.tmdb.org/t/p/w500//cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
        rating: '7.6'
      },
      {
        id: 4,
        title: 'Gladiator II',
        imageUrl: 'https://image.tmdb.org/t/p/w500//2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        rating: '7.6'
      },
      {
        id: 5,
        title: 'Venom: The Last Dance',
        imageUrl: 'https://image.tmdb.org/t/p/w500//aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        rating: '7.6'
      },
      {
        id: 6,
        title: 'Terrifier 3',
        imageUrl: 'https://image.tmdb.org/t/p/w500//l1175hgL5DoXnqeZQCcU3eZIdhX.jpg',
        rating: '7.6'
      },
      {
          id: 7,
          title: 'Red One',
          imageUrl: 'https://image.tmdb.org/t/p/w500//cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
          rating: '7.6'
        },
        {
          id: 8,
          title: 'Gladiator II',
          imageUrl: 'https://image.tmdb.org/t/p/w500//2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
          rating: '7.6'
        },

  ];

const title = {
    color : '#CBAE81',
    paddingTop : '8rem',
    marginBottom : '1.5rem'
};

const Explore = {
  color : '#CBAE81',
  paddingTop : '4rem'
};

    
const button = {
    backgroundColor :'#CBAE81',
    color: 'black',
    borderColor : 'black'
};

const classCard = {
   borderColor: '#CBAE81',
   width : '18rem'
  };

const CardBody = {
    background: 'linear-gradient(135deg, rgba(203, 174, 129, 0.8), rgba(203, 174, 129, 0.6))',
    padding: '20px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease'
}

  return (
    <div className="container">
         <h1 style={title}>SEARCH MOVIES</h1>
      <input placeholder="SEARCH YOUR FAVORITE MOVIES" className='Movie-Search'/>

        <h1 style={Explore}>Explore The Movie</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4 bg-transparent text-white py-3" onClick={() => navigate('/detail')} >
      {movies.map((movie) => (
        <Card key={movie.id} className="bg-secondary border-1" style={classCard}>
          <Card.Img variant="top" src={movie.imageUrl} />
          <Card.Body style={CardBody}>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text className="text-muted">{movie.rating}</Card.Text>
            <Button style={button} onClick={() => navigate('/detail')}>Buy Tickets</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default Home;