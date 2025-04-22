import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { firestore } from '../../servises/firebase.Connection';
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

export function Networks() {

    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    useEffect(() => {
        function loadLinks() {
            const linkRef = doc(firestore, 'social', 'link')
            getDoc(linkRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setFacebook(snapshot.data()?.facebook);
                        setInstagram(snapshot.data()?.instagram);
                        setYoutube(snapshot.data()?.youtube);
                    }
                })
        }

        loadLinks()
    }, [])



    function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (facebook !== '' || instagram !== '' || youtube !== '') {
            return setDoc(doc(firestore, 'social', 'link'), {
                facebook: facebook,
                instagram: instagram,
                youtube: youtube
            }).then(() => {
                console.log('requisição com sucesso!')
            }).catch((error) => {
                console.log('error ao fazer a requisição!', error)
            })
        } else {
            alert("Preencha pelo menos um dos campos!")
        }


    }


    return (
        <div className="flex flex-col items-center max-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white font-medium text-2xl mt-8 mb-4">Minhas Redes Sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-3">Link do Facebook</label>
                <Input
                    type="url"
                    placeholder="Digite a url do facebook..."
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-3">Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-3">Link do Youtube</label>
                <Input
                    type="url"
                    placeholder="Digite a url do youtube..."
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button
                    type="submit"
                    className="text-white bg-blue-600 flex items-center justify-center rounded-md h-9 mb-7 mt-2 font-medium"
                >
                    Salvar links
                </button>
            </form>
        </div>

    )
}