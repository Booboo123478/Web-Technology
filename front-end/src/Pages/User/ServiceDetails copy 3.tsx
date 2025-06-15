import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { useParams } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface PlageHoraire {
  debut: string | null;
  fin: string | null;
}

interface Disponibilite {
  jour: string; // ex: "lundi"
  matin: PlageHoraire;
  apresMidi: PlageHoraire;
}

interface ServiceDetail {
  idService: number;
  metier: string;
  ville: string;
  prix: number;
  offreImageUrl: string;
  disponibilites: Disponibilite[];
}

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const joursOrdre = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

function disponibilitesToEvents(disponibilites: Disponibilite[], semaineLundi: Date): RBCEvent[] {
  const events: RBCEvent[] = [];

  disponibilites.forEach(dispo => {
    const jourIndex = joursOrdre.indexOf(dispo.jour.toLowerCase());
    if (jourIndex === -1) return;

    const dateJour = new Date(semaineLundi);
    const decalage = (jourIndex + 6) % 7; // lundi=0 ... dimanche=6
    dateJour.setDate(semaineLundi.getDate() + decalage);

    const createDateTime = (date: Date, time: string | null) => {
      if (!time) return null;
      const [h, m] = time.split(':').map(Number);
      const dt = new Date(date);
      dt.setHours(h, m, 0, 0);
      return dt;
    };

    const matinDebut = createDateTime(dateJour, dispo.matin.debut);
    const matinFin = createDateTime(dateJour, dispo.matin.fin);
    if (matinDebut && matinFin) {
      events.push({
        title: 'Disponible (matin)',
        start: matinDebut,
        end: matinFin,
        allDay: false,
      });
    }

    const apremDebut = createDateTime(dateJour, dispo.apresMidi.debut);
    const apremFin = createDateTime(dateJour, dispo.apresMidi.fin);
    if (apremDebut && apremFin) {
      events.push({
        title: 'Disponible (après-midi)',
        start: apremDebut,
        end: apremFin,
        allDay: false,
      });
    }
  });

  return events;
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then(res => res.json())
      .then((data: ServiceDetail) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getMonday = (date: Date) => {
    const day = date.getDay() || 7; // dimanche=7
    const diff = 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const semaineLundi = getMonday(new Date());

  const events = service ? disponibilitesToEvents(service.disponibilites, semaineLundi) : [];

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  if (loading) return <p>Chargement...</p>;
  if (!service) return <p>Service non trouvé.</p>;

  return (
    <div>
      <h2>Détails du service</h2>
      <img
        src={`/image/${service.offreImageUrl}`}
        alt={service.metier}
        style={{ width: 200, height: 'auto' }}
      />
      <p><strong>Métier :</strong> {service.metier}</p>
      <p><strong>Ville :</strong> {service.ville}</p>
      <p><strong>Prix :</strong> {service.prix} €</p>

      <h3>Disponibilités de la semaine</h3>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="work_week"
          views={['work_week']}
          step={30}
          timeslots={2}
          onSelectSlot={handleSelectSlot}
          selectable
          culture="fr"
          style={{ height: '100%' }}
        />
      </div>

      {selectedSlot && (
        <div style={{ marginTop: 20 }}>
          <strong>Créneau sélectionné :</strong>
          <p>
            Du {selectedSlot.start.toLocaleString()} au {selectedSlot.end.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
