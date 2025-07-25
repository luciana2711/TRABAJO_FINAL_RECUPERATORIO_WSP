const chatData = {
    'Rigby-RG': {
        name: 'Rigby',
        lastSeen: 'Últ. vez hoy a las 14:19',
        avatarImgSrc: 'rigby.png', 
        messages: [
            { type: 'received', text: 'Mordo, vayamos por unas alitas de pollo hoy', time: '15:00' },
            { type: 'sent', text: 'No podemos, hay que terminar con el trabajo', time: '15:01' },
            { type: 'received', text: 'Que aburrido eres, por eso Margarita nunca salgrá contigo', time: '15:02' },
            { type: 'sent', text: 'Bueno vamos, pero luego tu hablaras con Benson', time: '15:04' },
            { type: 'received', text: 'Sabia que no me fallarias', time: '15:05' },
        ]
    },
    'Margarita-MG': {
        name: 'Margarita',
        lastSeen: 'Últ. vez hoy a las 15:19',
        avatarImgSrc: 'Margarita.webp', 
        messages: [
            { type: 'received', text: 'Podriamos salir el sabado al cine', time: '15:20' },
            { type: 'sent', text: 'Claro Margarita, pasare por ti a las 8:00pm', time: '15:21' }
            
        ]
    },
    'CJ-CJ': {
        name: 'CJ',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'cj.jpg', 
        messages: [
            { type: 'received', text: 'Genial nos vemos el sabado!', time: '9:00' },
            { type: 'sent', text: 'Al final no podre este sabado, lo dejamos para despues?', time: '15:24' },
            { type: 'received', text: 'Ohh, no te preocupes mas adelante vemos...' , time: '15:25'},
        ]
    },
    'Musculoso-MC': {
        name: 'Musculoso',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'musculoso.webp', 
        messages: [
            { type: 'received', text: 'Mordecai, sabes quien mas no sabe usar javascript', time: '17:20' },
            { type: 'received', text: 'Mi mami!', time: '17:21' } ,
            { type: 'sent', text: 'Enserio Musculoso, eso no es gracioso', time: '17:21' }
        ]
    },
    'Benson-BN': {
        name: 'Benson',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'benson.jpg', 
        messages: [
            { type: 'received', text: 'En donde estan?', time: '15:00' },
            { type: 'sent', text: 'Barriendo las hojas', time: '15:05' },
            { type: 'received', text: 'Enserio? Porque estoy aqui y no los veo', time: '15:06' },
            { type: 'sent', text: 'Mas les vale que esten aqui en 10 minutos,   O LOS DESPIDO!', time: '15:07' },
        ]
    },
    'Skips-SK': {
        name: 'Skips',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'skip.jpeg', 
        messages: [
            { type: 'received', text: 'vamos a jugar a los bolos', time: '17:30' },
            { type: 'sent', text: 'Pero dile a tus amigos magicos que sin magia', time: '17:35' }
        ]
    },
    'Papaleta-PP': {
        name: 'Papaleta',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'papaleta.jpg', 
        messages: [
            { type: 'received', text: 'Si tuvieras que ser una flor cual serias?', time: '17:35' },
            { type: 'sent', text: 'No lo se Papaleta', time: '17:40' }
        ]
    },
    'Grupo-rubios': {
        name: 'Grupo de rubios',
        lastSeen: 'Últ. vez hoy a las 17:19',
        avatarImgSrc: 'images.jpeg', 
        messages: [
            { type: 'received', text: 'Vamos Mordecai, el rubio seria lo tuyo', time: '19:04' },
            { type: 'sent', text: 'Ya les dije que no', time: '20:21' }
        ]
    }
};

export { chatData };
