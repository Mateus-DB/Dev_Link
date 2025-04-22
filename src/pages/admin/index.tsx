
import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { firestore } from '../../servises/firebase.Connection';
import {
    addDoc,
    onSnapshot,
    orderBy,
    collection,
    doc,
    deleteDoc,
    query,
} from 'firebase/firestore';

import { FiTrash } from "react-icons/fi";

export interface LinksProps {
    id: string;
    url: string;
    name: string;
    bg: string;
    color: string
}

export function Admin() {

    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('#f1f1f1');
    const [backgroungColorInput, setBackgroundColorInput] = useState('#121212');

    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linkRef = collection(firestore, 'links');
        const queryRef = query(linkRef, orderBy('create', 'asc'))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksProps[];

            snapshot.forEach((doc) => {

                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
                console.log(lista)

            })

            setLinks(lista);
        })

        return () => {
            unsub();
        }
    }, [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (nameInput === '' || urlInput === '') {
            alert('Preencha todos os campos!')
            return;
        }

        addDoc(collection(firestore, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroungColorInput,
            color: textColorInput,
            create: new Date()
        }).then(() => {
            setNameInput('');
            setUrlInput('');
        }).catch((error) => {
            console.log('Error na requisição' + error)
        })
    }

    async function handleDelete(id: string) {
        const linkRef = doc(firestore, 'links', id)
        await deleteDoc(linkRef)
    }

    return (

        <div className="flex items-center flex-col pb-7 px-2 min-h-screen">
            <Header />

            <form className="w-full flex flex-col mt-8 mb-3 max-w-xl" onSubmit={handleSubmit}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}

                />

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                <Input

                    type="url"
                    placeholder="Digite a Url..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}

                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input
                            className="mt-1"
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input
                            className="mt-1"
                            type="color"
                            value={backgroungColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-2">Veja como está ficando:</label>
                        <article
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, background: backgroungColorInput }}
                        >

                            <p className="font-medium" style={{ color: textColorInput }}
                            >{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit" className="mb-7 flex justify-center items-center bg-blue-600 text-white font-medium gap-4 h-9 rounded-md cursor-pointer">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {
                links.map((link) => (
                    <article
                        key={link.id}
                        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                        style={{ backgroundColor: link.bg, color: link.color }}
                    >
                        <p>{link.name}</p>
                        <div>
                            <button
                                className="border border-dashed p-1 rounded bg-neutral-900"
                                onClick={() => handleDelete(link.id)}
                            >
                                <FiTrash size={18} color="#fff" cursor='pointer' />
                            </button>
                        </div>
                    </article>
                ))
            }
        </div>

    )
}