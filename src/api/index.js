import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vyf2k217rh.execute-api.us-east-1.amazonaws.com',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).jwt
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);

export const signup = (userData) => API.post(`/registeradmin`, userData); //signup call
export const signin = (userData,role) => {
  if(role === 'admin'){
   return API.post(`/login`, userData);
  }else if(role === 'customer'){
    return API.post(`/logincustomer`, userData);
  }
  
}
export const registerCustomer = (userData) => API.post(`/addcustomer`, userData);
export const addProduct = (productData) => API.post(`/addproducts`,productData);
export const getProduct = () => API.get(`/products`);
export const getUsername = () => API.get(`/getusername`);
