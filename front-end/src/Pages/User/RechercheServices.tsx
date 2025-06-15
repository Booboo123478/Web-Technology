import React, { useEffect, useState } from 'react';

interface Service {
  idService: number;
  idPrestataire: number;
  metier: string;
  ville: string;
  prix: number;
  offreImageUrl: string;
}

const RechercheServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filtered, setFiltered] = useState<Service[]>([]);

  // Filtres
  const [metier, setMetier] = useState('');
  const [ville, setVille] = useState('');
  const [prixMin, setPrixMin] = useState('');
  const [prixMax, setPrixMax] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then((data: Service[]) => {
        setServices(data);
        setFiltered(data);
      })
      .catch(err => console.error('Erreur récupération services :', err));
  }, []);

  useEffect(() => {
    let result = [...services];

    if (metier.trim()) {
      result = result.filter(s => s.metier.toLowerCase().includes(metier.toLowerCase()));
    }

    if (ville.trim()) {
      result = result.filter(s => s.ville.toLowerCase().includes(ville.toLowerCase()));
    }

    if (prixMin) {
      result = result.filter(s => s.prix >= parseFloat(prixMin));
    }

    if (prixMax) {
      result = result.filter(s => s.prix <= parseFloat(prixMax));
    }

    setFiltered(result);
  }, [metier, ville, prixMin, prixMax, services]);

  return (
    <div>
      <h2>Rechercher un service</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Métier"
          value={metier}
          onChange={e => setMetier(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ville"
          value={ville}
          onChange={e => setVille(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix min"
          value={prixMin}
          onChange={e => setPrixMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix max"
          value={prixMax}
          onChange={e => setPrixMax(e.target.value)}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(s => (
          <li
            key={s.idService}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ddd',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
            onClick={() => window.location.href = `/services/${s.idService}`}
          >
            <img
              src={`/image/${s.offreImageUrl}`}
              alt={`${s.metier} à ${s.ville}`}
              style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
            />
            <div>
              <p><strong>Métier :</strong> {s.metier}</p>
              <p><strong>Ville :</strong> {s.ville}</p>
              <p><strong>Prix :</strong> {s.prix} €</p>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && <p>Aucun service ne correspond à votre recherche.</p>}
    </div>
  );
};

export default RechercheServices;
