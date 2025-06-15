import React, { useEffect, useState } from "react";

interface Service {
  idService: number;
  idPrestataire: number;
  titre: string;
  metier: string;
  ville: string;
  adresse: string;
  prix: number;
  description: string;
  disponibilites: any[];
  offreImageUrl: string;
}

export default function MesServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const prestataireId = localStorage.getItem("prestataireId");

  useEffect(() => {
    if (!prestataireId) return;

    fetch(`/api/services/prestataire/${prestataireId}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [prestataireId]);

  if (!prestataireId) {
    return <div>Connectez-vous pour voir vos services.</div>;
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mes Services</h2>
      {services.length === 0 ? (
        <p>Vous n'avez aucun service.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.idService} style={{ marginBottom: "10px" }}>
              <strong>{service.titre}</strong> — <strong>{service.metier}</strong> - {service.ville} - {service.prix}€
              <br />
              {service.description}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          // Redirige vers une page d'ajout ou ouvre un modal
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
    </div>
  );
}
