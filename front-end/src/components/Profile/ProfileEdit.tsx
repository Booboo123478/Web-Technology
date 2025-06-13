import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button/Button";
import "./Profile.css";

type Props = {
  username: string;
  email: string;
  bio: string;
  interests: string[];
  onSave: (updated: {
    username: string;
    email: string;
    bio: string;
    interests: string[];
  }) => void;
};

export default function ProfileEdit({ username, email, bio, interests, onSave }: Props) {
  const [formData, setFormData] = useState({
    username,
    email,
    bio,
    interests: interests.join(", "),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      interests: formData.interests.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    onSave(updated);
  };

  return (
    <>
    <div className="divider" />
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <InputField label="Nom d'utilisateur" type="text" name="username" value={formData.username} onChange={handleChange} />
      <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />

      <InputField label="Bio" type="text" name="bio" value={formData.bio} onChange={handleChange} />
    
      <InputField label="Intérêts (séparés par des virgules)" type="interests" name="interests" value={formData.interests} onChange={handleChange} />

      <Button text="Enregistrer" type="submit" fullWidth />
    </form>
    </>
  );
}
