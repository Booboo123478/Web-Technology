import React, { useState } from "react";
import axios from "axios";

export default function AjouterService() {
  const prestataireId = localStorage.getItem("prestataireId");

  const [formData, setFormData] = useState({
    titre: "",
    metier: "",
    ville: "",
    adresse: "",
    prix: "",
    description: "",
    offreImageUrl: "",
    disponibilites: "", // On gère les dispos en string simple pour l'instant
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!prestataireId) {
    return <div>Connectez-vous pour ajouter un service.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!formData.titre || !formData.metier || !formData.ville || !formData.prix) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      // Préparation de l'objet à envoyer
      const serviceToSend = {
        ...formData,
        prix: parseFloat(formData.prix),
        idPrestataire: parseInt(prestataireId, 10),
        disponibilites: formData.disponibilites
          ? formData.disponibilites.split(",").map(d => d.trim())
          : [],
      };

      await axios.post("/api/services", serviceToSend, { withCredentials: true });

      setSuccess("Service ajouté avec succès !");
      setFormData({
        titre: "",
        metier: "",
        ville: "",
        adresse: "",
        prix: "",
        description: "",
        offreImageUrl: "",
        disponibilites: "",
      });
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout du service.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ajouter un Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre *</label><br />
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} />
        </div>

        <div>
          <label>Métier *</label><br />
          <input type="text" name="metier" value={formData.metier} onChange={handleChange} />
        </div>

        <div>
          <label>Ville *</label><br />
          <input type="text" name="ville" value={formData.ville} onChange={handleChange} />
        </div>

        <div>
          <label>Adresse</label><br />
          <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
        </div>

        <div>
          <label>Prix (€) *</label><br />
          <input type="number" step="0.01" name="prix" value={formData.prix} onChange={handleChange} />
        </div>

        <div>
          <label>Description</label><br />
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>URL de l'image</label><br />
          <input type="text" name="offreImageUrl" value={formData.offreImageUrl} onChange={handleChange} />
        </div>

        <div>
          <label>Disponibilités (séparées par des virgules)</label><br />
          <input type="text" name="disponibilites" value={formData.disponibilites} onChange={handleChange} />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" style={{ marginTop: "10px" }}>Ajouter le service</button>
      </form>
    </div>
  );
}
