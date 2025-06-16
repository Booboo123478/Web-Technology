import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AvisList from '../../components/Avis/AvisList';
import InputField from '../../components/common/InputField';
import axios from 'axios';
import './RechercheServices.css';

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

  const [metier, setMetier] = useState('');
  const [ville, setVille] = useState('');
  const [prixMin, setPrixMin] = useState('');
  const [prixMax, setPrixMax] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [feedback, setFeedback] = useState<{msg:string,color:string}|null>(null);
  const [selectedPrestataireId, setSelectedPrestataireId] = useState<number | null>(null);

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
    <><Header />
    <div style={{ padding: '2rem', maxWidth: '100vw', margin: '10vh auto' }}>
      <h2>Rechercher un service</h2>

      <div className="search-toolbar">
        <InputField label="Métier" placeholder="Métier" value={metier} onChange={e => setMetier(e.target.value)} type="text" />
        <InputField label="Ville" placeholder="Ville" value={ville} onChange={e => setVille(e.target.value)} type="text" />
        <InputField label="Prix min" placeholder="Prix min" value={prixMin} onChange={e => setPrixMin(e.target.value)} type="number" />
        <InputField label="Prix max" placeholder="Prix max" value={prixMax} onChange={e => setPrixMax(e.target.value)} type="number" />
        <label>Date&nbsp;
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </label>
        <label>Heure&nbsp;
          <input type="time" value={heure} onChange={e=>setHeure(e.target.value)} />
        </label>
      </div>

      {feedback && <p className="feedback" style={{color:feedback.color}}>{feedback.msg}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(s => (
          <li
            key={s.idService}
            className="service-card"
            onClick={() => window.location.href = `/services/${s.idService}`}
          >
            <img
              src={`/image/${s.offreImageUrl}`}
              alt={`${s.metier} à ${s.ville}`}
            />
            <div className="service-info">
              <p><strong>Métier&nbsp;:</strong> {s.metier}</p>
              <p><strong>Ville&nbsp;:</strong> {s.ville}</p>
              <p><strong>Prix&nbsp;:</strong> {s.prix} €</p>
            </div>
            <button className="reserve-btn" onClick={(e)=>{e.stopPropagation();
              if(!date||!heure){setFeedback({msg:'Sélectionnez date et heure',color:'red'});return;}
              axios.get('/api/users/me').then(res=>{
                const idClient=res.data.idUser;
                const params=new URLSearchParams();
                params.append('idClient',idClient);
                params.append('idService',s.idService.toString());
                params.append('date',date);
                params.append('heure',heure);
                return axios.post('/api/reservations',params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
              }).then(()=>{
                setFeedback({msg:'Réservation enregistrée !',color:'limegreen'});
              }).catch(err=>{console.error(err);setFeedback({msg:'Erreur réservation',color:'red'});});
            }}>Réserver</button>
            <button
              className="avis-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPrestataireId(prev =>
                  prev === s.idPrestataire ? null : s.idPrestataire
                );
              }}
            >
              {selectedPrestataireId === s.idPrestataire ? 'Masquer les avis' : 'Voir les avis'}
            </button>

            {selectedPrestataireId === s.idPrestataire && (
              <div className="avis-section">
                <AvisList idPrestataire={s.idPrestataire} refreshTrigger={0} />
              </div>
            )}

          </li>
        ))}
      </ul>

      {filtered.length === 0 && <p>Aucun service ne correspond à votre recherche.</p>}
    </div>
    <Footer />
    </>
  );
};

export default RechercheServices;
