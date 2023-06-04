import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            if (user && user.email) {
                const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
                return res.json();
            } else {
                return [];
            }
        },
    });

    return [cart, refetch];
}

export default useCart;
