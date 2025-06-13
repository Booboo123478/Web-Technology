import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileCard from '../../components/Profile/ProfileCard';
import './Profile.css';

const ProfilePage: React.FC = () => {
  // Simulate dynamic user data
  const currentUser = {
    username: 'Heloise F.',
    email: 'heloise@example.com',
    role: 'provider' as 'client' | 'provider' | 'admin',
    bio: 'Passionnée par le service et la réparation.',
    interests: ['plomberie', 'urgence', 'électricité'],
    profilePic: '', // you can add an image path later
  };

  return (
    <>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <ProfileCard profile={currentUser} isOwnProfile={true} />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
