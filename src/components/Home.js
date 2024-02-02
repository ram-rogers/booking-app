// Home.js

import React, { useState } from 'react';
import './Home.css';

const moviesData = [
    { id: 1, title: 'Ayalaan', price: 150 },
    { id: 2, title: 'Mission Chapter 1', price: 200 },
    { id: 3, title: 'Captainer Miller', price: 100 },
    { id: 4, title: 'singapore saloon', price: 150 },


];

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState({});
    const [allBookedSeats, setAllBookedSeats] = useState({});
    const [isBooking, setIsBooking] = useState(false);

    const handleMovieChange = (event) => {
        const selectedMovieId = parseInt(event.target.value, 10);
        console.log(selectedMovieId)
        setSelectedMovie(selectedMovieId);
        console.log(selectedMovie)
    };

    const handleSeatClick = (seatNumber) => {
        if (!allBookedSeats[selectedMovie]?.includes(seatNumber) && !isBooking) {
            const updatedSeats = { ...selectedSeats };
            updatedSeats[selectedMovie] = updatedSeats[selectedMovie] || [];
            updatedSeats[selectedMovie] = updatedSeats[selectedMovie].includes(seatNumber)
                ? updatedSeats[selectedMovie].filter((seat) => seat !== seatNumber)
                : [...updatedSeats[selectedMovie], seatNumber];

            setSelectedSeats(updatedSeats);
        }
    };

    const handleBookSeats = () => {
        const newlyBookedSeats = { ...allBookedSeats };
        newlyBookedSeats[selectedMovie] = [
            ...(newlyBookedSeats[selectedMovie] || []),
            ...(selectedSeats[selectedMovie] || []),
        ];

        setAllBookedSeats(newlyBookedSeats);
        setSelectedSeats({});
        setIsBooking(true);

        setTimeout(() => {
            setIsBooking(false);
        }, 2000);
    };

    const calculateTotalCost = () => {
        const price = moviesData.find((movie) => movie.id === selectedMovie)?.price || 0;
        const numberOfSeats = selectedSeats[selectedMovie]?.length || 0;
        return price * numberOfSeats;
    };

    return (
        <div className="home-container">
            <h2>Ticket Booking App</h2>
            <div className='movie-select-container'>
                <label htmlFor="movieSelect">Select a Movie: </label>
                <select className='movieSelect' id="movieSelect" onChange={handleMovieChange} value={selectedMovie || ''}>
                    <option value="" disabled>Select a movie</option>
                    {moviesData.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>
            </div>
            {selectedMovie ? (
                <div>

                    <div className="instruction-container">
                        <div className="instruction">
                            <div className="box">
                                <div className="seat white"></div>
                                <span>N/A</span>

                            </div>
                            <div className="box">
                                <div className="seat blue"></div>
                                <span>Selected</span>

                            </div>
                            <div className="box">
                                <div className="seat grey"></div>
                                <span>Occupied</span>

                            </div>


                        </div>
                    </div>


                    <div className="seat-container">
                        {Array.from({ length: 6 }, (_, row) => (
                            <div key={row} className="seat-row">
                                {Array.from({ length: 8 }, (_, col) => {
                                    const seatNumber = row * 10 + col + 1;
                                    const isSelected = selectedSeats[selectedMovie]?.includes(seatNumber);
                                    const isBooked = allBookedSeats[selectedMovie]?.includes(seatNumber);

                                    return (
                                        <div
                                            key={col}
                                            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                                            onClick={() => handleSeatClick(seatNumber)}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <p>
                        {selectedSeats[selectedMovie]?.length || 0} seat(s) selected | Total Cost: &#8377; {calculateTotalCost()}
                    </p>
                    <button onClick={handleBookSeats} disabled={!selectedSeats[selectedMovie] || isBooking}>
                        {isBooking ? 'Booking...' : 'Book Selected Seats'}
                    </button>
                </div>
            ) :

                <div className="seat-container">
                    {Array.from({ length: 6 }, (_, row) => (
                        <div key={row} className="seat-row">
                            {Array.from({ length: 8 }, (_, col) => {

                                return (
                                    <div
                                        key={col}
                                        className="seat"
                                    >
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

            }
        </div>
    );
};

export default Home;
