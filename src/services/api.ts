import axios from 'axios';

interface UserData {
   email: string;
   password: string;
}

interface ResponseAuth {
   name: string,
   email: string,
   token: string
}

const server = axios.create({
   baseURL: 'http://localhost:3333',
});

export default {
   authUser: async (data: UserData): Promise<ResponseAuth> => {
      const response = await server.post('/users/signin', data);

      if (response.status === 200) {
         return (response.data);
      }

      return {} as ResponseAuth;
   }
}
