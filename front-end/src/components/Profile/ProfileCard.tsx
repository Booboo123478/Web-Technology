import React, { useState } from "react";
import "./Profile.css";
import Button from "../common/Button/Button";
import Modal from "../common/Modal/Modal";
import ProfileEdit from "./ProfileEdit";

type Profile = {
  email: string;
  username: string;
  role: 'client' | 'provider' | 'admin';
  profilePic?: string;
  bio?: string;
  interests?: string[];
};

type Props = {
  profile: Profile;
  isOwnProfile: boolean;
  onProfileUpdate?: () => void;
};

export default function ProfileCard({ profile, isOwnProfile, onProfileUpdate }: Props) {
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePictureSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profilePic", imageFile);

    const handleSave = (updatedData: {
    username: string;
    email: string;
    password?: string;
    bio: string;
    interests: string[];
    is_private: string;
  }) => {
    console.log("Updated profile:", updatedData);
    setEditing(false);
    onProfileUpdate?.();
  };



    if (imageFile) {
      alert("Image would be uploaded here.");
      setShowPictureModal(false);
      setImageFile(null);
    }
  };

const togglePictureModal = () => {
    setShowPictureModal(!showPictureModal);
  };


  return (
    <div className="profile-header">
      <div className="profile-left">
        {isOwnProfile ? (
          <button onClick={togglePictureModal} className="profile-pic-button">
            <img
              className="profile-pic"
              src={profile.profilePic || "/static/profiles_images/template_pfp.jpg"}
              alt="Profile"
            />
          </button>
        ) : (
            <>
          <img
            className="profile-pic"
            src={profile.profilePic || "/static/profiles_images/template_pfp.jpg"}
            alt="Profile"
          />
          </>
        )}
        <h2>{profile.username}</h2>
        <p className="profile-email">{profile.email}</p>

        <div className={`role-badge ${profile.role}`}>
          {profile.role === 'admin' && '🛡️ Admin'}
          {profile.role === 'provider' && '🧑‍🔧 Prestataire'}
          {profile.role === 'client' && '👤 Client'}
        </div>
    </div>

      <div className="profile-right">
        <p>Bio:</p>
        <p className="profile-bio">{profile.bio || "Aucune bio fournie."}</p>

        {profile.interests && profile.interests.length > 0 && (
          <div className="profile-interests">
            <p>Intérêts :</p>
            <ul>
              {profile.interests.map((tag, index) => (
                <li key={index}>#{tag}</li>
              ))}
            </ul>
          </div>
        )}


        {isOwnProfile && (
          <>
            <Button 
                text={editing ? "Annuler" : "Modifier le profil"} 
                onClick={() => setEditing(!editing)}
                className="profile-button" 
            />

            {editing && (
                <ProfileEdit
                    username={profile.username}
                    email={profile.email}
                    bio={profile.bio || ""}
                    interests={profile.interests || []}
                    onSave={(data) => {
                        console.log("Updated profile:", data);
                        setEditing(false);
                    }}
                />
            )}
          </>
        )}
    </div>

        <Modal isOpen={showPictureModal} onClose={() => setShowPictureModal(false)} title="Modifier la photo">
            <input type="file" accept="image/*" />
            <Button text="Enregistrer" type="submit" />
        </Modal>

         
    </div>
  );
}
