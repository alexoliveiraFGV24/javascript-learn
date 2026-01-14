import { v4 as uuidv4 } from 'uuid';


function pushUpdateClient (clients, id, clientName) {
    if (id === null) {
        id = uuidv4();
    };

    if (clients.has(id)) {
        throw new Error("A chave já está cadastrada!");
    } else {
        clients.set(id, clientName);
    };
    
};