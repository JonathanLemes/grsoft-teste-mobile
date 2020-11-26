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
   baseURL: 'https://fast-mountain-02347.herokuapp.com',
});

export default {
   authUser: async (data: UserData): Promise<ResponseAuth> => {
      return await server.post('/users/signin', data).then((response) => {
         return (response.data);
      }).catch(() => {
         return {token: 'error'} as ResponseAuth;
      });
   }
}
