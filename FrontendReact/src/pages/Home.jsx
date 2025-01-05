// src/pages/Home.jsx
import Carousel from '../components/Carousel';

function Home() {
    return (
        <div
            style={{
                marginTop: '60px',
                padding: '0 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                background: '#0b0b0b',
            }}
        >
            {/* Featured Movies Section */}
            <div
                style={{
                    textAlign: 'center',
                    margin: '2rem 0',
                }}
            >
                <h2
                    style={{
                        fontSize: '2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        color: '#fff',
                        marginBottom: '1rem',
                    }}
                >
                    Featured Movies
                </h2>
                <p
                    style={{
                        fontSize: '1rem',
                        color: '#aaa',
                        marginBottom: '2rem',
                    }}
                >
                    Discover our handpicked selection of must-watch movies.
                </p>
            </div>

            {/* Carousel Section */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Carousel />
            </div>
        </div>
    );
}

export default Home;
