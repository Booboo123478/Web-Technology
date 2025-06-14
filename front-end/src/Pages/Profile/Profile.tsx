import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileCard from '../../components/Profile/ProfileCard';
import axios from 'axios';
import './Profile.css';

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

  return {
    idUser: user.idUser,
    username: user.userName,
    email: user.mail,
    role: roleMap[user.role] || 'client',
    profilePic: user.profilePic,
    bio: user.bio || '',
    interests: user.interests || [],
  };
}


const ProfilePage: React.FC = () => {

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          withCredentials: true,
        });
        setCurrentUser(mapBackendUserToProfile(response.data));
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        {currentUser ? (
          <ProfileCard profile={currentUser} isOwnProfile={true} />
        ) : (
          <p>Chargement du profil...</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
