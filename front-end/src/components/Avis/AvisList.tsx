import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Avis.css';

interface Avis {
    idAvis: number;
    idClient: number;
    note: number;
    commentaire: string;
    dateAvis: string;
}

interface AvisListProps {
    idPrestataire: number;
    refreshTrigger: number;
}

const AvisList: React.FC<AvisListProps> = ({ idPrestataire, refreshTrigger }) => {
    const [avis, setAvis] = useState<Avis[]>([]);

    useEffect(() => {
        if (idPrestataire) {
            axios.get(`/api/avis/prestataire/${idPrestataire}`)
                .then(response => {
                    setAvis(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des avis:", error);
                });
        }
    }, [idPrestataire, refreshTrigger]);

    if (avis.length === 0) {
        return <p>Aucun avis pour ce prestataire pour le moment.</p>;
    }

    return (
        <div className="avis-list">
            <h3>Avis des clients</h3>
            {avis.map(item => (
                <div key={item.idAvis} className="avis-item">
                    <div className="avis-header">
                        <span className="avis-client">Client ID: {item.idClient}</span>
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