import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

interface Reservation {
  idReservation: number;
  idClient: number;
  idService: number;
  dateReservation: string;
  statut: string;
}

interface ReservationDisplay extends Reservation{clientName:string;serviceTitle:string;}

const MesDemandes: React.FC = () => {
  const idPrestataire = localStorage.getItem('prestataireId');
  const [list,setList]=useState<ReservationDisplay[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!idPrestataire) return;
    const fetchData=async()=>{
      const res=await axios.get(`/api/reservations/prestataire/${idPrestataire}?statut=en_attente`);
      const reservations:Reservation[]=res.data;
      const servicesRes=await axios.get('/api/services');
      const servicesMap:Record<number,string>={};
      servicesRes.data.forEach((s:any)=>servicesMap[s.idService]=s.titre||s.nomService);

      const usersUnique=Array.from(new Set(reservations.map(r=>r.idClient)));
      const usersMap:Record<number,string>={};
      await Promise.all(usersUnique.map(async id=>{
        const ures=await axios.get(`/api/users/${id}`);
        usersMap[id]=ures.data.userName;
      }));

      const formatted:ReservationDisplay[]=reservations.map(r=>({
        ...r,
        clientName:usersMap[r.idClient],
        serviceTitle:servicesMap[r.idService]
      }));
      setList(formatted);
    };
    fetchData();
  },[idPrestataire,refresh]);

  const updateStatus = (id:number, value:string)=>{
    axios.patch(`/api/reservations/${id}/status?value=${value}`)
      .then(()=> setRefresh(r=>r+1));
  };

  return (
    <>
      <Header />
      <div style={{padding:'20px'}}>
        <h2>Demandes de réservation en attente</h2>
        {list.length === 0 ? <p>Aucune demande.</p> : (
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Date</th>
                <th>Client</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(r=> (
                <tr key={r.idReservation}>
                  <td>{r.idReservation}</td>
                  <td>{r.serviceTitle}</td>
                  <td>{r.dateReservation}</td>
                  <td>{r.clientName}</td>
                  <td>
                    <button onClick={()=>updateStatus(r.idReservation,'confirmee')}>Accepter</button>
                    <button onClick={()=>updateStatus(r.idReservation,'refusee')} style={{marginLeft:'8px'}}>Refuser</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MesDemandes; 