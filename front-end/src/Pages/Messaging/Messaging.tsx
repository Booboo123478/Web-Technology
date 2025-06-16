import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messaging.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

interface Person {
    id: number;
    name: string;
}

interface Message {
    idMessage: number;
    idExpediteur: number;
    contenu: string;
    dateEnvoi: string;
}

const Messaging: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<Person | null>(null);
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get('/api/session')
            .then(res => {
                const { type, data } = res.data;
                if (type === 'prestataire') {
                    setCurrentUser({ id: data.idPrestataire, name: data.prestataireName });
                } else if (type === 'user') {
                    setCurrentUser({ id: data.idUser, name: data.userName });
                }
            })
            .catch(err => console.error('Error fetching session:', err));

        const fetchUsers = axios.get('/api/users');
        const fetchPrestataires = axios.get('/api/prestataires');

        Promise.all([fetchUsers, fetchPrestataires])
            .then(([usersRes, prestasRes]) => {
                const u: Person[] = usersRes.data.map((u:any)=>({id:u.idUser,name:u.userName}));
                const p: Person[] = prestasRes.data.map((p:any)=>({id:p.idPrestataire,name:p.prestataireName}));
                setPersons([...u,...p]);
            })
            .catch(err => console.error('Error fetching persons:', err));
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            axios.get<Message[]>(`/api/messages/${selectedConversation}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error("Error fetching conversation:", error);
                });
        }
    }, [selectedConversation]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        const params = new URLSearchParams();
        params.append('idDestinataire', selectedConversation.toString());
        params.append('contenu', newMessage);

        axios.post('/api/messages', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
            setMessages([...messages, response.data as Message]);
            setNewMessage('');
        })
        .catch(error => {
            console.error("Error sending message:", error);
        });
    };

    const conversationUsers = persons.filter(p => p.id !== currentUser?.id);

    return (
        <>
        <Header />
            <div className="messaging-container" >
                <div className="conversations-list">
                    <h3>Conversations</h3>
                    {conversationUsers.map(person => (
                        <div 
                            key={person.id} 
                            className={`conversation-item ${selectedConversation === person.id ? 'selected' : ''}`}
                            onClick={() => setSelectedConversation(person.id)}
                        >
                            {person.name}
                        </div>
                    ))}
                </div>
                <div className="chat-window">
                    {selectedConversation ? (
                        <>
                            <div className="messages-list">
                                {messages.map(msg => (
                                    <div key={msg.idMessage} className={`message-item ${msg.idExpediteur === currentUser?.id ? 'sent' : 'received'}`}>
                                        <p>{msg.contenu}</p>
                                        <span>{new Date(msg.dateEnvoi).toLocaleTimeString()}</span>
                                    </div>
                                ))}
                            </div>
                            <form className="message-input-form" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                />
                                <button type="submit">Envoyer</button>
                            </form>
                        </>
                    ) : (
                        <div className="no-conversation-selected">
                            <p>Sélectionnez une conversation pour voir les messages.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Messaging; 