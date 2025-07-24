import React, { useState, useEffect } from 'react';
import { chatData as initialChatData } from './data/chatData'; 

function App() {
    const [chats, setChats] = useState(initialChatData);
    const [activeChatId, setActiveChatId] = useState(null); 
    const [showSidebar, setShowSidebar] = useState(true); 
    const [showProfileModal, setShowProfileModal] = useState(false); 
    const [showMyProfileModal, setShowMyProfileModal] = useState(false); 
    const [newMessageText, setNewMessageText] = useState('');

    const activeChat = chats[activeChatId];

    useEffect(() => {
        const handleResize = () => {
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    useEffect(() => {
        if (activeChat) {
            const chatMessagesDiv = document.querySelector('.chat-messages');
            if (chatMessagesDiv) {
                chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
            }
        }
    }, [activeChatId, activeChat?.messages.length]); 

    const handleContactClick = (id) => {
        setActiveChatId(id);
        setShowSidebar(false); 
    };

    const handleSendMessage = () => {
        if (newMessageText.trim() === '' || !activeChatId) {
            return; 
        }

        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        const newMessage = { type: 'sent', text: newMessageText.trim(), time: time };

        setChats(prevChats => {
            const updatedChats = { ...prevChats }; 
            const currentChatMessages = [...updatedChats[activeChatId].messages, newMessage]; 
            
            updatedChats[activeChatId] = {
                ...updatedChats[activeChatId],
                messages: currentChatMessages,
            };
            return updatedChats;
        });

        setNewMessageText(''); 
    };

    const handleBackArrowClick = (event) => {
        event.stopPropagation(); 
        console.log("Flecha de retroceso clickeada. Volviendo a la lista de chats..."); 
        setActiveChatId(null); 
        setShowSidebar(true); 
    };

    const handleOpenProfile = () => {
        console.log("Abriendo modal de perfil de contacto..."); 
        setShowProfileModal(true);
    };

    const handleCloseProfile = () => {
        console.log("Cerrando modal de perfil de contacto..."); 
        setShowProfileModal(false);
    };

    const handleOpenMyProfile = () => {
        console.log("Abriendo modal de MI perfil..."); 
        setShowMyProfileModal(true);
    };

    const handleCloseMyProfile = () => {
        console.log("Cerrando modal de MI perfil..."); 
        setShowMyProfileModal(false);
    };

    const handleCallIconClick = (event) => {
        event.stopPropagation(); 
        console.log("Icono de llamada clickeado.");
    };

    const handleSettingsIconClick = (event) => {
        event.stopPropagation(); 
        console.log("Icono de configuración clickeado.");
    };

    const handleNewChatIconClick = (event) => {
        event.stopPropagation(); 
        console.log("Icono de nuevo chat clickeado.");
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="container">
            {showSidebar ? (
                <div className="sidebar">
                    <div className="my-profile-section">
                        <div className="my-profile-info-clickable" onClick={handleOpenMyProfile}> 
                            <div className="my-profile-avatar">
                                <img src="/imagenes/mordecai.webp" alt="Mi Perfil" /> 
                            </div>
                            <div className="my-profile-info">
                                <h4>Mi perfil</h4>
                            </div>
                        </div>
                        <div className="my-profile-icons">
                            <span className="icon" onClick={handleCallIconClick}>📞</span> 
                            <span className="icon" onClick={handleSettingsIconClick}>⚙️</span> 
                            <span className="icon" onClick={handleNewChatIconClick}>💬</span> 
                        </div>
                    </div>

                    <div className="sidebar-header">
                        <h3>Chats</h3>
                        <div className="header-icons">
                        </div>
                    </div>
                    <div className="contact-list">
                        {Object.keys(chats).map((chatId) => {
                            const contact = chats[chatId]; 
                            const lastMessage = contact.messages[contact.messages.length - 1];

                            return (
                                <div
                                    key={chatId}
                                    className={`contact-item ${activeChatId === chatId ? 'active' : ''}`}
                                    onClick={() => handleContactClick(chatId)}
                                >
                                    <div className="contact-avatar">
                                        <img src={`/imagenes/${contact.avatarImgSrc}`} alt={`Foto de ${contact.name}`} />
                                    </div>
                                    <div className="contact-info">
                                        <h4>{contact.name}</h4>
                                        <p>{lastMessage ? lastMessage.text : 'No messages'}</p>
                                    </div>
                                    <div className="contact-time">
                                        {lastMessage ? lastMessage.time : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="chat-area">
                    {activeChatId ? ( 
                        <div className="chat-content-active"> 
                            <div className="chat-header">
                                <div className="chat-header-info" onClick={handleOpenProfile}>
                                    <span className="back-arrow" onClick={handleBackArrowClick}>←</span>
                                    <div className="chat-avatar">
                                        {activeChat && <img src={`/imagenes/${activeChat.avatarImgSrc}`} alt={`Foto de ${activeChat.name}`} />}
                                        {!activeChat && "DR"}
                                    </div>
                                    <h4>{activeChat ? activeChat.name : 'Selecciona un chat'}</h4>
                                    <p>{activeChat ? activeChat.lastSeen : ''}</p>
                                </div>
                                <div className="chat-header-icons">
                                </div>
                            </div>
                            <div className="chat-messages">
                                {activeChat && activeChat.messages.map((message, index) => (
                                    <div key={index} className={`message ${message.type}`}>
                                        <p>{message.text} <span>{message.time}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="chat-input">
                                <input 
                                    type="text" 
                                    placeholder="Mensaje" 
                                    value={newMessageText} 
                                    onChange={(e) => setNewMessageText(e.target.value)} 
                                    onKeyPress={handleInputKeyPress} 
                                />
                                <button onClick={handleSendMessage}>➡️</button>
                            </div>
                        </div>
                    ) : (
                        <div className="welcome-message-container"> 
                            <p>Selecciona un contacto para empezar a chatear.</p>
                        </div>
                    )}
                </div>
            )}

            {showProfileModal && activeChat && (
                <div className="profile-modal show">
                    <div className="profile-modal-content">
                        <span className="close-modal" onClick={handleCloseProfile}>←</span> 
                        <div className="profile-modal-avatar">
                            <img src={`/imagenes/${activeChat.avatarImgSrc}`} alt={`Foto de ${activeChat.name}`} />
                        </div>
                        <h2 className="profile-modal-name">{activeChat.name}</h2>
                        <p>{activeChat.lastSeen}</p>
                        <div className="profile-modal-actions">
                            <div className="profile-modal-action-item">
                                <div className="icon">📞</div> 
                                <span>Llamar</span>
                            </div>
                            <div className="profile-modal-action-item">
                                <div className="icon">ℹ️</div> 
                                <span>Info</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showMyProfileModal && (
                <div className="my-profile-full-modal show"> 
                    <div className="my-profile-modal-content">
                        <div className="my-profile-modal-header">
                            <span className="close-modal" onClick={handleCloseMyProfile}>←</span> 
                            <h3>Perfil</h3>
                        </div>
                        <div className="my-profile-modal-body">
                            <div className="my-profile-modal-avatar-large">
                                <img src="/imagenes/mordecai.webp" alt="Mi Perfil" />
                            </div>
                            <div className="my-profile-modal-info-section">
                                <p className="label">Tu nombre</p>
                                <div className="info-row">
                                    <p className="value">Mordecai</p> 
                                    <span className="edit-icon">✏️</span> 
                                </div>
                                <p className="description">
                                    Este nombre será visible para tus contactos de WhatsApp.
                                </p>
                            </div>
                            <div className="my-profile-modal-info-section">
                                <p className="label">Info.</p>
                                <div className="info-row">
                                    <p className="value">Trabajando en el parque</p> 
                                    <span className="edit-icon">✏️</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
