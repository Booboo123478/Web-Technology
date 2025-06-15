import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
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

function disponibilitesToEvents(
  disponibilites: Disponibilite[] | undefined,
  semaineLundi: Date
): RBCEvent[] {
  if (!disponibilites || disponibilites.length === 0) return [];

  const events: RBCEvent[] = [];

  disponibilites.forEach((dispo, index) => {
    const jourIndex = joursOrdre.indexOf(dispo.jour.toLowerCase());
    if (jourIndex === -1) return;

    // Calcul décalage entre lundi de la semaine et jour dispo
    // lundi = 1 dans getDay, ici on veut que lundi soit 0 décalage
    const decalage = (jourIndex + 6) % 7; // Recalage pour que lundi=0

    const dateJour = new Date(semaineLundi);
    dateJour.setDate(semaineLundi.getDate() + decalage);
    dateJour.setHours(0, 0, 0, 0);

    const createDateTime = (date: Date, time: string | null): Date | null => {
      if (!time) return null;
      const [h, m] = time.split(':').map(Number);
      const dt = new Date(date);
      dt.setHours(h, m, 0, 0);
      return dt;
    };

    if (dispo.matin) {
      const matinDebut = createDateTime(dateJour, dispo.matin.debut);
      const matinFin = createDateTime(dateJour, dispo.matin.fin);
      if (matinDebut && matinFin) {
        events.push({
          title: 'Disponible (matin)',
          start: matinDebut,
          end: matinFin,
          allDay: false,
          resource: { key: `matin-${index}` },
        });
      }
    }

    if (dispo.apresMidi) {
      const apremDebut = createDateTime(dateJour, dispo.apresMidi.debut);
      const apremFin = createDateTime(dateJour, dispo.apresMidi.fin);
      if (apremDebut && apremFin) {
        events.push({
          title: 'Disponible (après-midi)',
          start: apremDebut,
          end: apremFin,
          allDay: false,
          resource: { key: `aprem-${index}` },
        });
      }
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
    setLoading(true);
    fetch(`/api/services/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur API');
        return res.json();
      })
      .then((data: ServiceDetail) => {
        setService(data);
      })
      .catch(() => {
        setService(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Obtenir lundi de la semaine en cours
  const getMonday = (date: Date): Date => {
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
