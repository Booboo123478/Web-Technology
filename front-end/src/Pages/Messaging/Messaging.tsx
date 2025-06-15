import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messaging.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

interface User {
    idUser: number;
    userName: string;
}

interface Message {
    idMessage: number;
    idExpediteur: number;
    contenu: string;
    dateEnvoi: string;
}

const Messaging: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get<User>('/api/users/me')
            .then(response => setCurrentUser(response.data))
            .catch(error => console.error("Error fetching current user:", error));

        axios.get<User[]>('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
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

    const conversationUsers = users.filter(user => user.idUser !== currentUser?.idUser);

    return (
        <>
        <Header />
            <div className="messaging-container" >
                <div className="conversations-list">
                    <h3>Conversations</h3>
                    {conversationUsers.map(user => (
                        <div 
                            key={user.idUser} 
                            className={`conversation-item ${selectedConversation === user.idUser ? 'selected' : ''}`}
                            onClick={() => setSelectedConversation(user.idUser)}
                        >
                            {user.userName}
                        </div>
                    ))}
                </div>
                <div className="chat-window">
                    {selectedConversation ? (
                        <>
                            <div className="messages-list">
                                {messages.map(msg => (
                                    <div key={msg.idMessage} className={`message-item ${msg.idExpediteur === currentUser?.idUser ? 'sent' : 'received'}`}>
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