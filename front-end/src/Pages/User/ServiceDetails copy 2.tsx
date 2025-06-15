import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PlageHoraire {
  debut: string | null;
  fin: string | null;
}

interface Disponibilite {
  jour: string;
  matin: PlageHoraire;
  apresMidi: PlageHoraire;
}

interface Service {
  idService: number;
  idPrestataire: number;
  metier: string;
  ville: string;
  prix: number;
  offreImageUrl: string;
  disponibilites: Disponibilite[];
}

const joursOrdre = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

const getMonday = (date: Date): Date => {
  const day = date.getDay(); // dimanche = 0
  const diff = day === 0 ? -6 : 1 - day; // si dimanche, recule de 6 jours sinon recule jusqu'au lundi
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const AffichageDisponibilites: React.FC<{ disponibilites: Disponibilite[] }> = ({ disponibilites }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Disponibilités</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Jour</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Matin</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Après-midi</th>
          </tr>
        </thead>
        <tbody>
          {disponibilites.map((d) => (
            <tr key={d.jour}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{d.jour}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {d.matin.debut && d.matin.fin ? `${d.matin.debut} - ${d.matin.fin}` : 'Indisponible'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {d.apresMidi.debut && d.apresMidi.fin ? `${d.apresMidi.debut} - ${d.apresMidi.fin}` : 'Indisponible'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateSelectionnee, setDateSelectionnee] = useState<Date | null>(null);

  useEffect(() => {
    fetch(`/api/services`)
      .then(res => res.json())
      .then((data: Service[]) => {
        const s = data.find(serv => serv.idService === parseInt(id || '', 10));
        setService(s || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur récupération service :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!service) return <p>Service non trouvé.</p>;

  // Affiche la semaine actuelle (lundi à dimanche)
  const lundi = getMonday(new Date());

  // Génère un tableau de 7 jours (dates) de la semaine
  const semaineDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(lundi);
    d.setDate(lundi.getDate() + i);
    return d;
  });

  return (
    <div>
      <h2>Détails du service</h2>
      <img
        src={`/image/${service.offreImageUrl}`}
        alt={service.metier}
        style={{ width: '200px', height: 'auto' }}
      />
      <p><strong>Métier :</strong> {service.metier}</p>
      <p><strong>Ville :</strong> {service.ville}</p>
      <p><strong>Prix :</strong> {service.prix} €</p>

      {service.disponibilites && (
        <AffichageDisponibilites disponibilites={service.disponibilites} />
      )}

      <h3>Semaine actuelle</h3>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px' }}>
        {semaineDates.map(date => {
          const jourStr = joursOrdre[date.getDay()];
          return (
            <li
              key={date.toISOString()}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '80px',
                cursor: 'pointer',
                backgroundColor: dateSelectionnee?.toDateString() === date.toDateString() ? '#00d0b0' : '#fff',
                color: dateSelectionnee?.toDateString() === date.toDateString() ? '#fff' : '#000',
              }}
              onClick={() => setDateSelectionnee(date)}
            >
              <div><strong>{jourStr}</strong></div>
              <div>{date.getDate()}</div>
            </li>
          );
        })}
      </ul>

      {dateSelectionnee && (
        <p>Date sélectionnée : {dateSelectionnee.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default ServiceDetails;
