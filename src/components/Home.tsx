import React from 'react';
import './Home.css';
import CardCarousel from './CardCarousel';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>MTG Explorer</h1>
          <p className="hero-subtitle">Tu compañero definitivo para explorar el mundo de Magic: The Gathering</p>
          <CardCarousel />
          <div className="cta-buttons">
            <button className="cta-primary">Explorar Cartas</button>
            <button className="cta-secondary">Ver Mazos</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Búsqueda Avanzada</h3>
            <p>Encuentra cualquier carta con nuestro potente motor de búsqueda</p>
          </div>
          <div className="feature-card">
            <h3>Constructor de Mazos</h3>
            <p>Crea y gestiona tus mazos de manera intuitiva</p>
          </div>
          <div className="feature-card">
            <h3>Estadísticas en Tiempo Real</h3>
            <p>Mantente al día con los precios y tendencias del mercado</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>¿Por qué MTG Explorer?</h2>
        <p>MTG Explorer es tu herramienta definitiva para explorar el universo de Magic: The Gathering. 
           Diseñada tanto para jugadores casuales como para coleccionistas serios, 
           nuestra plataforma te ofrece todo lo que necesitas para disfrutar del juego.</p>
      </section>
    </div>
  );
};

export default Home; 