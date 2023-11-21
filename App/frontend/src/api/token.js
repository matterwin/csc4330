import { useSelector } from 'react-redux';

export const getToken = () => {
    const token = useSelector(state => state.auth.token);
    return token;
}