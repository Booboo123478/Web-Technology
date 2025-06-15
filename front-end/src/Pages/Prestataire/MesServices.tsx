import React, { useEffect, useState } from 'react';

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
const backendBaseUrl = "http://localhost:8080";

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
  if (services.length === 0) return <p>Aucun service trouvé.</p>;

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
    <div>
      <h2>Mes services</h2>

      <button
        onClick={() => {
          window.location.href = "/ajouter-service";
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#00d0b0",
          color: "#121212",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Ajouter un nouveau service
      </button>

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
              <button
                onClick={() => window.location.href = `/modifier-service/${s.idService}`}
                style={{
                  marginRight: '10px',
                  backgroundColor: '#ffc107',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#121212'
                }}
              >
                Modifier
              </button>

              <button
                onClick={() => handleDelete(s.idService)}
                style={{
                  backgroundColor: '#dc3545',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MesServices;
