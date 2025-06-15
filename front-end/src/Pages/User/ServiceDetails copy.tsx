import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Service {
  idService: number;
  idPrestataire: number;
  metier: string;
  ville: string;
  prix: number;
  offreImageUrl: string;
  disponibilites: Disponibilite[];
}

interface PlageHoraire {
  debut: string | null;
  fin: string | null;
}

interface Disponibilite {
  jour: string;
  matin: PlageHoraire;
  apresMidi: PlageHoraire;
}

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

  if (loading) return <p>Chargement...</p>;
  if (!service) return <p>Service non trouvé.</p>;

    const joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

    const isDateAvailable = (date: Date) => {
    const jourStr = joursSemaine[date.getDay()];
    const dispo = service.disponibilites.find(d => d.jour.toLowerCase() === jourStr);

    if (!dispo) return false;

    const matinOk = dispo.matin.debut !== null && dispo.matin.fin !== null;
    const apremOk = dispo.apresMidi.debut !== null && dispo.apresMidi.fin !== null;

    return matinOk || apremOk;
    };

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

        {/* <h3>Choisissez une date</h3>
        <Calendar
        onChange={setDateSelectionnee}
        value={dateSelectionnee}
        tileDisabled={({ date }) => !isDateAvailable(date)}
        /> */}

        {dateSelectionnee && (
        <p>Date sélectionnée : {dateSelectionnee.toLocaleDateString()}</p>
        )}
    </div>
    );
};

export default ServiceDetails;
