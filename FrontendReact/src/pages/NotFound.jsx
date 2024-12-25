
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>404 - Not Found</h2>
            <p>Oops, this page doesn&apos;t exist!</p>
            <Link to="/">Go Home</Link>
        </div>
    );
}

export default NotFound;
