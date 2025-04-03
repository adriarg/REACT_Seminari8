import { User } from '../types';

// Array simulat d'usuaris
let users: User[] = [
  {
    name: "Jordi Pujol",
    age: 34,
    email: "jordi.pujol@exemple.cat"
  },
  {
    name: "Anna Martí",
    age: 27,
    email: "anna.marti@gmail.com"
  }
];

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...users]);
    }, 500);
  });
};

// Add a new user
export const addUser = async (newUser: User): Promise<User> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

/* 
//PODEM FERHO COM UNA PROMESA
export const addUser = async (newUser: User): Promise<User> => {
    try {
        const response = await axios.post('http://localhost:9000/api/Users', newUser);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed to add user');
        }
        return response.data
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};
*/

/*
// EXEMPLE SI HAGUESSIM DE MAPEJAR VALORS DIFERENTS AMB ELS QUE ENS RETORNA LA API
export const mapFromApiToUsers = (apiResponse: UsersResponseFromApi): User[] => {
    return apiResponse.map(userFromApi => {
        const {
            nombre: name,
            edad: age,
            correo: email
        } = userFromApi;
        return {
            name,
            age,
            email
        };
    });
};
*/