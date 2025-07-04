import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button/Button';

interface PeriodeHoraire {
  debut: string | null;
  fin: string | null;
}

interface DisponibiliteDto {
  jour: string;
  matin: PeriodeHoraire | null;
  apresMidi: PeriodeHoraire | null;
}

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prix' ? Number(value) : value,
    }));
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
    setFormData(prev => ({ ...prev, disponibilites: newDispos }));
  };

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
    <>
      <Header />
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ padding: '2rem', maxWidth: '600px', margin: '15vh auto' }}>
        <InputField label="Titre du service" placeholder="Titre du service" name="titre" value={formData.titre} onChange={handleChange} type="text" />
        <InputField label="Métier" placeholder="Métier (ex: Plombier)" name="metier" value={formData.metier} onChange={handleChange} type="text" />
        <InputField label="Ville" placeholder="Ville" name="ville" value={formData.ville} onChange={handleChange} type="text" />
        <InputField label="Adresse" placeholder="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} type="text" />
        <InputField label="Prix" placeholder="Prix" name="prix" value={formData.prix.toString()} onChange={handleChange} type="number" />
        <InputField label="Description" placeholder="Description du service" name="description" value={formData.description} onChange={handleChange} type="textArea" />

        <fieldset style = {{marginBottom: '2vh'}}>
          <legend>Disponibilités (heures)</legend>
          {formData.disponibilites.map((d, i) => (
            <div key={d.jour} style={{ marginBottom: '1rem' }}>
              <strong style={{ textDecoration: 'underline' }}>{d.jour.charAt(0).toUpperCase() + d.jour.slice(1)}</strong>
              <div style={{ display: 'flex', gap: '4vw' }}>
                <div>
              <p>Matin</p>
              <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '1rem' }}>
                <label>De </label>
                <input type='time' name={`matin-${i}-debut`} onChange={e => handleHoraireChange(i, 'matin', 'debut', e.target.value)} value={d.matin?.debut || ''}></input>
                {' - '}
                <label>À </label>
                <input name={`matin-${i}-fin`} type="time" value={d.matin?.fin || ''} onChange={e => handleHoraireChange(i, 'matin', 'fin', e.target.value)}></input>
                
                </div>
                {(!d.matin?.debut && !d.matin?.fin) && <em> (indisponible)</em>}
                </div>
                <div>
                <p>Après-midi </p>
                <div style = {{ display: 'flex', gap: '1rem' }}>
                  <label>De </label>
                  <input name={`apresMidi-${i}-debut`}
                  type="time"
                  value={d.apresMidi?.debut || ''}
                  onChange={e => handleHoraireChange(i, 'apresMidi', 'debut', e.target.value)}></input>
                {' - '}
                <label>À</label>
                <input  name={`apresMidi-${i}-fin`}
                  type="time"
                  value={d.apresMidi?.fin || ''}
                  onChange={e => handleHoraireChange(i, 'apresMidi', 'fin', e.target.value)}></input>
                  </div>
                {(!d.apresMidi?.debut && !d.apresMidi?.fin) && <em> (indisponible)</em>}
              
              </div>
            </div>
        <div
          className='divider'
          style={{
            height: '1px',
            width: '100%',
            backgroundColor: '#2dd4beac',
            margin: '40px 0px 40px 0px'
          }}
        ></div>
          </div>
          ))}
        </fieldset>

        <div style={{ marginBottom: '2vh' }}>
          <label>Image du service :</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <Button text={'Ajouter le service'} type='submit' />

        {message && <p>{message}</p>}
      </form>
      <Footer />
    </>
  );
};

export default AjouterService;
