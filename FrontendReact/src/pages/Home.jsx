
import HeroParallax from '../components/HeroParallax';
import Carousel from '../components/Carousel';
import moviesData from '../data/moviesData';

function Home() {
    // Scegli qualche film in evidenza (es. i primi 3)
    const featured = moviesData.slice(0, 3);

    return (
        <div style={{ marginTop: '60px' }}>
            <HeroParallax />
            <h2 style={{ textAlign: 'center', margin: '2rem' }}>Featured Movies</h2>
            <Carousel slides={featured} />
        </div>
    );
}

export default Home;
