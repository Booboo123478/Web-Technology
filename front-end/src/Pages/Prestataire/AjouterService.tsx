import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PeriodeHoraire {
  debut: string | null;
  fin: string | null;
}

interface DisponibiliteDto {
  jour: string;
  matin: PeriodeHoraire | null;
  apresMidi: PeriodeHoraire | null;
}

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

const dispoInitiales: DisponibiliteDto[] = jours.map(jour => ({
  jour,
  matin: { debut: null, fin: null },
  apresMidi: { debut: null, fin: null },
}));

interface ServiceFormData {
  titre: string;
  metier: string;
  ville: string;
  adresse: string;
  prix: number;
  description: string;
  disponibilites: DisponibiliteDto[];
  offreImageFile?: File;
}

const prestataireId = localStorage.getItem('prestataireId');

const AjouterService: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    titre: '',
    metier: '',
    ville: '',
    adresse: '',
    prix: 0,
    description: '',
    disponibilites: dispoInitiales,
  });

  const [message, setMessage] = useState('');

  // Gestion des champs texte et nombre
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prix' ? Number(value) : value,
    }));
  };

  // Gestion des horaires dans les disponibilités
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
    setFormData(prev => ({ ...prev, disponibilites: newDispos }));
  };

  // Gestion upload fichier image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, offreImageFile: e.target.files![0] }));
    }
  };

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const serviceObj = {
        titre: formData.titre,
        metier: formData.metier,
        ville: formData.ville,
        adresse: formData.adresse,
        prix: formData.prix,
        description: formData.description,
        disponibilites: formData.disponibilites,
        idPrestataire: prestataireId ? Number(prestataireId) : null
    };

    const formPayload = new FormData();
    formPayload.append('service', JSON.stringify(serviceObj));
    if (formData.offreImageFile) {
        formPayload.append('offreImage', formData.offreImageFile);
    }

    try {
        const res = await fetch('/api/services', {
        method: 'POST',
        body: formPayload,
        });

        if (res.ok) {
        setMessage('Service ajouté avec succès');
        } else {
        setMessage('Erreur serveur');
        }
    } catch {
        setMessage('Erreur réseau');
    }
    };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="titre"
        placeholder="Titre du service"
        value={formData.titre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="metier"
        placeholder="Métier (ex: Plombier)"
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
        required
      />

      <input
        type="text"
        name="adresse"
        placeholder="Adresse"
        value={formData.adresse}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="prix"
        placeholder="Prix"
        min={0}
        step={0.01}
        value={formData.prix}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description du service"
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
                onChange={e => handleHoraireChange(i, 'matin', 'debut', e.target.value)}
              />
              {' - '}
              <input
                type="time"
                value={d.matin?.fin || ''}
                onChange={e => handleHoraireChange(i, 'matin', 'fin', e.target.value)}
              />
              {(!d.matin?.debut && !d.matin?.fin) && <em> (indisponible)</em>}
            </div>

            <div>
              <label>Après-midi :</label>
              <input
                type="time"
                value={d.apresMidi?.debut || ''}
                onChange={e => handleHoraireChange(i, 'apresMidi', 'debut', e.target.value)}
              />
              {' - '}
              <input
                type="time"
                value={d.apresMidi?.fin || ''}
                onChange={e => handleHoraireChange(i, 'apresMidi', 'fin', e.target.value)}
              />
              {(!d.apresMidi?.debut && !d.apresMidi?.fin) && <em> (indisponible)</em>}
            </div>
          </div>
        ))}
      </fieldset>

      <div>
        <label>Image du service :</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="submit">Ajouter le service</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default AjouterService;
