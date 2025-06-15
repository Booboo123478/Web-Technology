import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServicesPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

interface Service {
  idService: number;
  idPrestataire: number;
  titre?: string;
  nomService?: string;
  description: string;
  prix: number;
  categorie?: string;
  dureeEstimee?: string;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    axios.get('/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Erreur chargement services', err));
  }, []);

  const createReservation = (idService: number) => {
    if (!selectedDate) { setFeedback('Choisissez une date.'); return; }
    if (!selectedTime) { setFeedback('Choisissez une heure.'); return; }
    axios.get('/api/users/me')
      .then(res => {
        const idClient = res.data.idUser;
        const params = new URLSearchParams();
        params.append('idClient', idClient);
        params.append('idService', idService.toString());
        params.append('date', selectedDate);
        params.append('heure', selectedTime);
        return axios.post('/api/reservations', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      })
      .then(() => setFeedback('Réservation enregistrée !'))
      .catch(err => { console.error(err); setFeedback('Erreur réservation'); });
  };

  return (
    <>
      <Header />
      <div className="services-page">
        <h2>Catalogue des services</h2>
        <div className="toolbar">
          <label>Date souhaitée&nbsp;:
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
          </label>
          <label>Heure souhaitée&nbsp;:
            <input type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} />
          </label>
          {feedback && <span className="feedback">{feedback}</span>}
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.idService} className="service-card">
              <h3>{s.titre ?? s.nomService}</h3>
              <p className="desc">{s.description}</p>
              <p className="price">{s.prix} € {s.dureeEstimee && `– ${s.dureeEstimee}`}</p>
              <button onClick={() => createReservation(s.idService)}>Réserver</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage; 