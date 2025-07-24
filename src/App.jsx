import React, { useState, useEffect } from 'react';
// Importamos chatData solo para la inicialización del estado
import { chatData as initialChatData } from './data/chatData'; 

function App() {
    // chatData ahora es parte del estado para que los cambios se rendericen
    const [chats, setChats] = useState(initialChatData);
    const [activeChatId, setActiveChatId] = useState(null); 
    const [showSidebar, setShowSidebar] = useState(true); 
    const [showProfileModal, setShowProfileModal] = useState(false); 
    const [showMyProfileModal, setShowMyProfileModal] = useState(false); 
    // Estado para el texto del nuevo mensaje en el input
    const [newMessageText, setNewMessageText] = useState('');

    // Obtenemos el chat activo del estado 'chats'
    const activeChat = chats[activeChatId];

    // Efecto para actualizar el comportamiento si el tamaño de la ventana cambia (no directamente relacionado con el envío)
    useEffect(() => {
        const handleResize = () => {
            // No necesitamos ajustar showSidebar aquí, ya que el comportamiento es full-screen toggle para ambos.
            // Esto solo se mantendría si tuvieras otros elementos responsive que dependan del tamaño de la ventana.
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Efecto para hacer scroll al final de los mensajes cada vez que activeChatId o los mensajes cambian
    useEffect(() => {
        if (activeChat) {
            const chatMessagesDiv = document.querySelector('.chat-messages');
            if (chatMessagesDiv) {
                chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
            }
        }
    }, [activeChatId, activeChat?.messages.length]); // Depende de la longitud de los mensajes para re-scroll

    const handleContactClick = (id) => {
        setActiveChatId(id);
        setShowSidebar(false); 
    };

    const handleSendMessage = () => {
        if (newMessageText.trim() === '' || !activeChatId) {
            return; // No enviar mensajes vacíos o si no hay chat activo
        }

        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        const newMessage = { type: 'sent', text: newMessageText.trim(), time: time };

        // Actualizar el estado de forma inmutable
        setChats(prevChats => {
            const updatedChats = { ...prevChats }; // Copia superficial de todos los chats
            const currentChatMessages = [...updatedChats[activeChatId].messages, newMessage]; // Copia y añade el nuevo mensaje
            
            // Actualiza el chat específico con los nuevos mensajes
            updatedChats[activeChatId] = {
                ...updatedChats[activeChatId],
                messages: currentChatMessages,
            };
            return updatedChats;
        });

        setNewMessageText(''); // Limpiar el input después de enviar
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
                            {/* Aquí irían tus iconos si los tienes (ej. SVG o Font Awesome) */}
                        </div>
                    </div>
                    <div className="contact-list">
                        {/* Renderiza los contactos dinámicamente usando los 'chats' del estado */}
                        {Object.keys(chats).map((chatId) => {
                            const contact = chats[chatId]; // Usar 'chats' del estado
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
                                    {/* Aquí irían tus iconos */}
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
                                    value={newMessageText} // Controlado por el estado
                                    onChange={(e) => setNewMessageText(e.target.value)} // Actualiza el estado al escribir
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
