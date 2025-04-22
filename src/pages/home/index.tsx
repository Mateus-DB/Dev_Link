import { useState, useEffect } from "react"
import { Social } from "../../components/social"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

// import { LinkProps } from "react-router-dom"

import { firestore } from '../../servises/firebase.Connection'
import {
    getDocs,
    collection,
    query,
    orderBy,
    doc,
    getDoc
} from "firebase/firestore"
import { LinksProps } from "../admin"

interface SocialLinksProps {
    facebook: string,
    instagram: string,
    youtube: string
}

interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Home() {

    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(firestore, 'links')
            const queryRef = query(linksRef, orderBy('create', 'asc'))

            getDocs(queryRef)
                .then((snapshot) => {
                    const lista = [] as LinksProps[];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color
                        })
                    })
                    setLinks(lista)
                })
        }

        loadLinks();
    }, [])

    useEffect(() => {
        function loadSocial() {
            const socialRef = doc(firestore, 'social', 'link')

            getDoc(socialRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data()?.facebook,
                            instagram: snapshot.data()?.instagram,
                            youtube: snapshot.data()?.youtube
                        })
                    }
                })
        }
        loadSocial();
    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Mateus Demartino</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center ">
                {
                    links.map((link) => (
                        <section
                            style={{ backgroundColor: link.bg }}
                            key={link.id}
                            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                            <a href={link.url} target="_blank">
                                <p className="text-base md:text-lg" style={{ color: link.color }}>
                                    {link.name}
                                </p>
                            </a>
                        </section>
                    ))
                }


                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook className="transform-transition hover:scale-110" size={35} color="#fff" />
                        </Social>

                        <Social url={socialLinks?.youtube}>
                            <FaYoutube className="transform-transition hover:scale-110" size={35} color="#fff" />
                        </Social>

                        <Social url={socialLinks?.instagram}>
                            <FaInstagram className="transform-transition hover:scale-110" size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>

        </div>

    )
}