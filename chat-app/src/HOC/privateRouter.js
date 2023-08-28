import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    let user = window.localStorage.getItem('token');
    useEffect(() => {
        try {
            if (!user) {
                throw new Error("ss");
            }
            else return children;
        } catch (error) {
            navigate('/login');
        }
    }, [user]);

    return children;
}

export default PrivateRoute