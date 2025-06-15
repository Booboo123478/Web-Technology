import React, { useState } from 'react';
import axios from 'axios';
import './Avis.css';

interface AvisFormProps {
    idPrestataire: number;
    onAvisSubmit: () => void;
}

const AvisForm: React.FC<AvisFormProps> = ({ idPrestataire, onAvisSubmit }) => {
    const [note, setNote] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (note === 0) {
            setError('Veuillez sélectionner une note.');
            return;
        }
        setError('');
        setSuccess('');

        const params = new URLSearchParams();
        params.append('idPrestataire', idPrestataire.toString());
        params.append('note', note.toString());
        params.append('commentaire', commentaire);

        axios.post('/api/avis', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(() => {
            setSuccess('Votre avis a été soumis avec succès !');
            setNote(0);
            setCommentaire('');
            onAvisSubmit();
        })
        .catch(err => {
            setError('Erreur lors de la soumission de l\'avis.');
            console.error(err);
        });
    };

    return (
        <form className="avis-form" onSubmit={handleSubmit}>
            <h3>Laisser un avis</h3>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <span 
                            key={ratingValue} 
                            className={ratingValue <= note ? 'star selected' : 'star'}
                            onClick={() => setNote(ratingValue)}
                        >
                            &#9733;
                        </span>
                    );
                })}
            </div>
            <textarea
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder="Votre commentaire..."
                rows={4}
            />
            <button type="submit">Envoyer</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </form>
    );
};

export default AvisForm; 