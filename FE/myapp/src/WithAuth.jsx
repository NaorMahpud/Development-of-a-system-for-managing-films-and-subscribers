import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const withAuth = (Component) => {
    return (props) => {
        const [isLoading, setIsLoading] = useState(true);
        const navigate = useNavigate();
        const token = sessionStorage.getItem('token');

        useEffect(() => {
            if (!token) {
                sessionStorage.clear();
                sessionStorage.setItem('msg', 'Invalid Token');
                navigate('/login');
            } else {
                setIsLoading(false);
            }
        }, [token, navigate]);

        if (isLoading) {
            return <div>Loading...</div>; 
        }

        return <Component {...props} />;
    };
};

export default withAuth;