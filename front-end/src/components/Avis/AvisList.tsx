import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Avis.css';

interface Avis {
    idAvis: number;
    idClient: number;
    note: number;
    commentaire: string;
    dateAvis: string;
    clientName?: string;
}

interface AvisListProps {
    idPrestataire: number;
    refreshTrigger: number;
}

const AvisList: React.FC<AvisListProps> = ({ idPrestataire, refreshTrigger }) => {
    const [avis, setAvis] = useState<Avis[]>([]);

    useEffect(() => {
        if (idPrestataire) {
            axios
            .get(`/api/avis/prestataire/${idPrestataire}`)
            .then(async (response) => {
                const avisData: Avis[] = response.data;

                const enrichedAvis = await Promise.all(
                avisData.map(async (a) => {
                    try {
                    const userRes = await axios.get(`/api/users/${a.idClient}`);
                    const user = userRes.data;
                    return {
                        ...a,
                        clientName: `${user.userName}`
                    };
                    } catch (err) {
                    console.error(`Erreur récupération nom client pour ID ${a.idClient}`, err);
                    return {
                        ...a,
                        clientName: `Client #${a.idClient}`
                    };
                    }
                })
                );

                setAvis(enrichedAvis);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des avis:", error);
            });
        }
        }, [idPrestataire, refreshTrigger]);

    return (
        <div className="avis-list">
            <h3>Avis des clients</h3>
            {avis.map(item => (
                <div key={item.idAvis} className="avis-item">
                    <div className="avis-header">
                        <span className="avis-client">{item.clientName}</span>
                        <span className="avis-note">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < item.note ? 'star selected' : 'star'}>&#9733;</span>
                            ))}
                        </span>
                    </div>
                    <p className="avis-commentaire">{item.commentaire}</p>
                    <span className="avis-date">{new Date(item.dateAvis).toLocaleDateString()}</span>
                </div>
            ))}
        </div>
    );
};

export default AvisList; 