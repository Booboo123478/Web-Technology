import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/common/Button/Button';

interface Service {
  idService: number;
  idPrestataire: number;
  metier: string;
  ville: string;
  prix: number;
  offreImageUrl: string;
}

interface MesServicesProps {
  idPrestataire?: number;
}

const MesServices: React.FC<MesServicesProps> = ({ idPrestataire }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idPrestataire) {
      setLoading(false);
      return;
    }

    fetch('/api/services')
      .then(res => res.json())
      .then((data: Service[]) => {
        const filtered = data.filter(s => s.idPrestataire === idPrestataire);
        setServices(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur récupération services :', err);
        setLoading(false);
      });
  }, [idPrestataire]);

  if (!idPrestataire) return <p>Identifiant prestataire non fourni.</p>;
  if (loading) return <p>Chargement...</p>;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce service ?")) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(s => s.idService !== id));
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Une erreur est survenue.");
    }
  };
  return (
    <><Header />
    <div style={{ padding: '2rem', maxWidth: '100vw', margin: '10vh auto' }}>
      <h2>Mes services</h2>

      <Button text={'Ajouter un nouveau service'} onClick={() => {
        window.location.href = "/ajouter-service";
      }} />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {services.map(s => (
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
            <div style={{ marginLeft: 'auto' }}>
              <Button text={'Supprimer'} onClick={() => handleDelete(s.idService)} />
              <Button text={'Modifier'} onClick={() => window.location.href = `/modifier-service/${s.idService}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
};
export default MesServices;