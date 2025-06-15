import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvisForm from '../../components/Avis/AvisForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MyReservationsPage.css';

interface Reservation {
  idReservation: number;
  idClient: number;
  idService: number;
  dateReservation: string;
  statut: string;
}

const MyReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [selectedPrestataire, setSelectedPrestataire] = useState<number | null>(null);
  const [servicesMap, setServicesMap] = useState<Record<number, {prestataire:number, image?:string}>>({}); // idService -> infos
  const [reviewedIds, setReviewedIds] = useState<number[]>([]);

  useEffect(() => {
    axios.get('/api/users/me').then(res => {
      setCurrentUserId(res.data.idUser);
    });
  }, []);

  useEffect(() => {
    if (currentUserId) {
      axios.get(`/api/reservations?clientId=${currentUserId}`)
        .then(res => setReservations(res.data));
    }
  }, [currentUserId, refresh]);

  useEffect(()=>{
    axios.get('/api/services').then(res=>{
      const map:Record<number,{prestataire:number,image?:string}>={};
      res.data.forEach((s:any)=>{map[s.idService]={prestataire:s.idPrestataire,image:s.offreImageUrl};});
      setServicesMap(map);
    });
  },[]);

  const loadReviewed=(prestataireId:number)=>{
    if(!currentUserId) return;
    axios.get(`/api/avis/prestataire/${prestataireId}`).then(res=>{
      const exists=res.data.some((a:any)=>a.idClient===currentUserId);
      if(exists) setReviewedIds(prev=>[...prev,prestataireId]);
    });
  };

  useEffect(()=>{
    if(currentUserId){
      reservations.forEach(r=>{
        if(r.statut==='terminee'){
          const pid=servicesMap[r.idService]?.prestataire;
          if(pid) loadReviewed(pid);
        }
      });
    }
  },[reservations,currentUserId,servicesMap]);

  const openReview=(prestataireId:number)=>{
    if(reviewedIds.includes(prestataireId)){
      alert('Vous avez déjà laissé un avis pour ce prestataire');
      return;
    }
    setSelectedPrestataire(prestataireId);
  };

  const markDone = (id: number) => {
    axios.patch(`/api/reservations/${id}/status?value=terminee`)
      .then(() => setRefresh(r => r + 1));
  };

  return (
    <>
      <Header />
      <div className="reservations-page">
        <h2>Mes réservations</h2>
        {reservations.map(r => {
          const info = servicesMap[r.idService];
          const pid = info?.prestataire;
          return (
            <div key={r.idReservation} className="reservation-item">
              <div style={{flex:'0 0 40px',display:'flex',justifyContent:'center'}}>
                {info?.image ? (
                  <img src={`/image/${info.image}`} alt="offre" style={{width:'40px',height:'40px',objectFit:'cover',borderRadius:'6px'}} />
                ):(
                  <svg width="40" height="40"><circle cx="20" cy="20" r="20" fill="#ccc" /></svg>
                )}
              </div>
              <p style={{margin:0}}>Service #{r.idService} – {r.dateReservation}</p>
              <span className={`badge ${r.statut}`}>{r.statut}</span>
              {r.statut !== 'terminee' && <button onClick={() => markDone(r.idReservation)}>Marquer terminée</button>}
              {r.statut === 'terminee' && pid && (
                reviewedIds.includes(pid) ? <span className="already">Avis déposé</span> : <button onClick={() => openReview(pid)}>Laisser un avis</button>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default MyReservationsPage;