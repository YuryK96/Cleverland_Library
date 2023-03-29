import { useEffect, useState } from 'react';

export function useIsAuth() {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const  token =  localStorage.getItem('token')

    useEffect(() => {

        if (token){
            setIsAuth(true)
        }else {
            setIsAuth(false)
        }

    }, [ token]);

    return isAuth ;
}

