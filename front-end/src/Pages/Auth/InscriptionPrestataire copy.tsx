import React, { useState, ChangeEvent, FormEvent } from 'react';

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

interface PeriodeHoraire {
  debut: string | null;
  fin: string | null;
}

interface Disponibilite {
  jour: string;
  matin: PeriodeHoraire | null;
  apresMidi: PeriodeHoraire | null;
}

interface PrestataireFormData {
  prestataireName: string;
  metier: string;
  ville: string;
  adresse: string;
  prix: number;
  description: string;
  disponibilites: Disponibilite[];
  offreImage?: File;
}

const dispoInitiales: Disponibilite[] = jours.map((jour) => ({
  jour,
  matin: { debut: null, fin: null },
  apresMidi: { debut: null, fin: null },
}));

const InscriptionPrestataire: React.FC = () => {
  const [formData, setFormData] = useState<PrestataireFormData>({
    prestataireName: '',
    metier: '',
    ville: '',
    adresse: '',
    prix: 0,
    description: '',
    disponibilites: dispoInitiales,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'prix' ? Number(value) : value,
    }));
  };

  const handleDisponibiliteChange = (
    index: number,
    periode: 'matin' | 'apresMidi',
    checked: boolean
  ) => {
    const newDispos = [...formData.disponibilites];
    newDispos[index] = { ...newDispos[index], [periode]: checked };
    setFormData((prev) => ({ ...prev, disponibilites: newDispos }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, offreImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
        prestataireName: formData.prestataireName,
        metier: formData.metier,
        ville: formData.ville,
        adresse: formData.adresse,
        prix: formData.prix,
        description: formData.description,
        disponibilites: formData.disponibilites,
        offreImageUrl: "",
    };

    try {
        const res = await fetch('/api/prestataires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });
      if (res.ok) {
        setMessage('Inscription réussie');
      } else {
        setMessage('Erreur serveur');
      }
    } catch {
      setMessage('Erreur réseau');
    }
  };

  const handleHoraireChange = (
    index: number,
    periode: 'matin' | 'apresMidi',
    champ: 'debut' | 'fin',
    value: string
  ) => {
    const newDispos = [...formData.disponibilites];
    const currentPeriode = newDispos[index][periode] ?? { debut: null, fin: null };
    newDispos[index][periode] = {
      ...currentPeriode,
      [champ]: value || null,
    };
    setFormData((prev) => ({ ...prev, disponibilites: newDispos }));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="prestataireName"
        placeholder="Nom prestataire"
        value={formData.prestataireName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="metier"
        placeholder="Métier"
        value={formData.metier}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="ville"
        placeholder="Ville"
        value={formData.ville}
        onChange={handleChange}
      />
      <input
        type="text"
        name="adresse"
        placeholder="Adresse"
        value={formData.adresse}
        onChange={handleChange}
      />
      <input
        type="number"
        name="prix"
        placeholder="Prix horaire"
        value={formData.prix}
        min={0}
        step={0.01}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <fieldset>
        <legend>Disponibilités (heures)</legend>
        {formData.disponibilites.map((d, i) => (
          <div key={d.jour} style={{ marginBottom: '1rem' }}>
            <strong>{d.jour.charAt(0).toUpperCase() + d.jour.slice(1)}</strong>

            <div>
              <label>Matin :</label>
              <input
                type="time"
                value={d.matin?.debut || ''}
                onChange={(e) => handleHoraireChange(i, 'matin', 'debut', e.target.value)}
              />
              {' - '}
              <input
                type="time"
                value={d.matin?.fin || ''}
                onChange={(e) => handleHoraireChange(i, 'matin', 'fin', e.target.value)}
              />
              {(!d.matin?.debut && !d.matin?.fin) && <em> (indisponible)</em>}
            </div>

            <div>
              <label>Après-midi :</label>
              <input
                type="time"
                value={d.apresMidi?.debut || ''}
                onChange={(e) => handleHoraireChange(i, 'apresMidi', 'debut', e.target.value)}
              />
              {' - '}
              <input
                type="time"
                value={d.apresMidi?.fin || ''}
                onChange={(e) => handleHoraireChange(i, 'apresMidi', 'fin', e.target.value)}
              />
              {(!d.apresMidi?.debut && !d.apresMidi?.fin) && <em> (indisponible)</em>}
            </div>
          </div>
        ))}
      </fieldset>
      <div>
        <label>Image (logo/offre) :</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="submit">S’inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default InscriptionPrestataire;
