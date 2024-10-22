import React, { useState, useEffect } from 'react';
import './Header.css'; // Importujemy style

const movies = [
    {
        title: 'Smile 2',
        genre: 'Horror',
        duration: 127,
        times: ['13:00', '15:50', '18:40', '21:30'],
        image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6631S2R.jpg'
    },
    {
        title: 'Chosen',
        genre: 'Drama',
        duration: 120,
        times: ['15:45', '18:20', '21:00'],
        image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6800S2R.jpg'
    },
];

const premieres = [
    { title: 'Movie 1', image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6800S2R.jpg' },
    { title: 'Movie 2', image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6631S2R.jpg' },
    { title: 'Movie 3', image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6786S2R.jpg' },
    { title: 'Movie 4', image: 'https://www.cinema-city.pl/xmedia-cw/repo/feats/posters/6721D2R.jpg' }
];

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedDay, setSelectedDay] = useState('Dziś');
    const [selectedShowType, setSelectedShowType] = useState('Wszystkie');
    const [selectedMovie, setSelectedMovie] = useState('Wszystkie');
    const [language, setLanguage] = useState('Polski');

    const days = language === 'Polski' ? ['Dziś', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'] : ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const showTypes = ['Wszystkie', 'IMAX', '4DX', 'VIP'];
    const moviesList = ['Wszystkie', 'Smile 2', 'Chosen'];

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide === 0 ? premieres.length - 1 : prevSlide - 1));
    };

    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide === premieres.length - 1 ? 0 : prevSlide + 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Funkcja zmiany języka
    const changeLanguage = (e) => {
        setLanguage(e.target.value);
    };

    // Automatyczna zmiana slajdów co 5 sekund
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Zmiana slajdu co 5 sekund
        return () => clearInterval(interval); // Czyszczenie interwału przy unmount
    }, [currentSlide]);

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="top-bar">
                    <div className="logo">Cinema City</div>
                    <input
                        type="text"
                        placeholder={language === 'Polski' ? "Szukaj filmów..." : "Search for movies..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <div className="language-selector">
                        <select value={language} onChange={changeLanguage}>
                            <option value="Polski">Polski</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>
                <nav className="middle-header">
                    <ul className="nav-links">
                        <li className="inactive-link">{language === 'Polski' ? "Repertuar" : "Repertoire"}</li>
                        <li className="inactive-link">{language === 'Polski' ? "Oferty" : "Offers"}</li>
                        <li className="inactive-link">{language === 'Polski' ? "Prezenty" : "Gifts"}</li>
                        <li className="inactive-link">{language === 'Polski' ? "Bar" : "Bar"}</li>
                        <li className="inactive-link">{language === 'Polski' ? "Szkoły" : "Schools"}</li>
                        <li className="inactive-link">Blog</li>
                        <li>
                            <a href="https://www.cinema-city.pl" className="active-link">
                                {language === 'Polski' ? "Przejdź do CinemaCity" : "Go to CinemaCity"}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Sekcja nad sliderem */}
            <div className="slider-header">
                <div className="location-info">
            <span className="breadcrumb">
              Start &gt; Repertuar &gt; Lublin - Plaza
            </span>
                    <h2 className="location-title">LUBLIN - PLAZA</h2>
                </div>
                <div className="choose-cinema-container">
                    <button className="choose-cinema-btn">WYBIERZ INNE KINO</button>
                </div>
            </div>

            {/* Slider z premierami */}
            <section className="slider-section">
                <h2 className="section-title">
                    {language === 'Polski' ? 'Premiery' : 'Premieres'}
                </h2>
                <div className="slider">
                    <button className="prev" onClick={prevSlide}>&lt;</button>
                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                        {premieres.map((premiere, index) => (
                            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
                                <img src={premiere.image} alt={premiere.title} />
                            </div>
                        ))}
                    </div>
                    <button className="next" onClick={nextSlide}>&gt;</button>
                </div>

                {/* Kropki nawigacyjne */}
                <div className="dots">
                    {premieres.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Wybór dnia, rodzaju seansu i filmu */}
            <section className="filters">
                <div className="day-picker">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <select
                    className="select-picker"
                    value={selectedShowType}
                    onChange={(e) => setSelectedShowType(e.target.value)}
                >
                    {showTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <select
                    className="select-picker"
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                >
                    {moviesList.map((movie, index) => (
                        <option key={index} value={movie}>
                            {movie}
                        </option>
                    ))}
                </select>
            </section>

            {/* Lista filmów z czasami */}
            <section className="movies-list">
                <h2>{language === 'Polski' ? "Repertuar na dziś" : "Today's Repertoire"}</h2>
                {filteredMovies.map((movie, index) => (
                    <div key={index} className="movie">
                        <div className="movie-left">
                            <img src={movie.image} alt={movie.title} className="movie-poster" />
                        </div>
                        <div className="movie-right">
                            <h3>{movie.title}</h3>
                            <p>{movie.genre} | {movie.duration} min</p>
                            <div className="showtimes">
                                {movie.times.map((time, idx) => (
                                    <button key={idx} className="time-btn">
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </section>
        </div>
    );
};

export default App;
