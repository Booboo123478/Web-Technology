import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileCard from '../../components/Profile/ProfileCard';
import axios from 'axios';
import './Profile.css';
import AvisList from '../../components/Avis/AvisList';
import AvisForm from '../../components/Avis/AvisForm';

type Role = 'client' | 'provider' | 'admin';

type Profile = {
  idUser: number;
  username: string;
  email: string;
  role: Role;
  profilePic?: string;
  bio?: string;
  interests?: string[];
};

function mapBackendUserToProfile(user: any): Profile {
  const roleMap: { [key: number]: Role } = {
    0: 'client',
    1: 'provider',
    2: 'admin',
  };

  const isPrestataire = user.hasOwnProperty('idPrestataire');

  return {
    idUser: isPrestataire ? user.idPrestataire : user.idUser,
    username: isPrestataire ? user.prestataireName : user.userName,
    email: isPrestataire ? user.prestataireMail : user.mail,
    role: isPrestataire ? 'provider' : (roleMap[user.role] || 'client'),
    profilePic: user.profilePic,
    bio: user.bio || '',
    interests: user.interests || [],
  };
}

const ProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const roleString = localStorage.getItem('userRole');
        const roleNum = roleString ? parseInt(roleString,10) : 0;
        const endpoint = roleNum === 1 ? '/api/prestataires/me' : '/api/users/me';
        const response = await axios.get(endpoint, { withCredentials: true });
        setCurrentUser(mapBackendUserToProfile(response.data));
      } catch (err:any) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        setError('Impossible de charger le profil. Êtes-vous connecté ?');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleAvisSubmit = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if(loading){
    return <p style={{textAlign:'center',marginTop:'40px'}}>Chargement du profil...</p>;
  }

  if(error){
    return <p style={{textAlign:'center',marginTop:'40px',color:'red'}}>{error}</p>;
  }

  return (
    <>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        {currentUser ? (
          <>
            <ProfileCard profile={currentUser} isOwnProfile={true} />
            <div className="avis-section">
              <AvisList idPrestataire={currentUser.idUser} refreshTrigger={refreshTrigger} />
            </div>
          </>
        ) : (
          <p>Chargement du profil...</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
