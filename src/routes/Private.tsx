import { auth } from "../servises/firebase.Connection";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps): any {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {

        const unSub = onAuthStateChanged(auth, (user) => {

            if (user) {
                const userData = {
                    user: user?.uid,
                    email: user?.email
                }

                localStorage.setItem('@reactlinks', JSON.stringify(userData))
                setLoading(false);
                setSigned(true);
            } else {
                setLoading(false)
                setSigned(false);
            }

        })

        return () => {
            unSub();
        }

    }, [])

    if (loading) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to='/login' />
    }



    return children;
}