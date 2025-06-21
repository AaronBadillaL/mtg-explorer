import React, { useState, useEffect } from 'react';
import './CardCarousel.css';

interface Card {
  id: string;
  name: string;
  image_uris?: {
    normal: string;
  };
  card_faces?: {
    image_uris: {
      normal: string;
    };
  }[];
}

const CardCarousel: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomCards = async () => {
      try {
        console.log('Fetching cards...');
        const responses = await Promise.all(
          Array(20).fill(null).map(() => 
            fetch('https://api.scryfall.com/cards/random')
          )
        );
        
        const cardsData = await Promise.all(
          responses.map(response => response.json())
        );
        
        console.log('Cards fetched:', cardsData.length);
        setCards(cardsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setLoading(false);
      }
    };

    fetchRandomCards();
  }, []);

  if (loading) {
    return <div className="carousel-loading">Loading cards...</div>;
  }

  return (
    <div className="background-carousel">
      <div className="carousel-track">
        {cards.map((card, index) => {
          const imageUrl = card?.image_uris?.normal || 
                          card?.card_faces?.[0]?.image_uris?.normal;
          
          return (
            <div key={`${card.id}-${index}`} className="card-wrapper">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={card.name} 
                  className="card-image"
                  onError={() => console.error('Error loading image:', card.name)}
                />
              )}
            </div>
          );
        })}
        {/* Duplicamos las cartas para crear un efecto de carrusel infinito */}
        {cards.map((card, index) => {
          const imageUrl = card?.image_uris?.normal || 
                          card?.card_faces?.[0]?.image_uris?.normal;
          
          return (
            <div key={`${card.id}-duplicate-${index}`} className="card-wrapper">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={card.name} 
                  className="card-image"
                  onError={() => console.error('Error loading image:', card.name)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCarousel; 