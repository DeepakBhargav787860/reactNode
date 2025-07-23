import axios from 'axios';
// for production
// export function CreateWebSocketConnection(endpoint) {
//   const base = "wss://mysocket-6xmu.onrender.com";
//   const fullURL = `${base}${endpoint}`;
//   return new WebSocket(fullURL);
// }





   const url="https://nodejsbackend-mbjy.onrender.com"  
  //  const url="http://localhost:5000"


// src/lib/Api.ts or wherever you keep API utilities

export function CreateWebSocketConnection(endpoint: string): WebSocket {
  const base = "wss://mysocket-6xmu.onrender.com";
  // const base = "ws://localhost:8080";
  try {
    const fullURL = `${base}${endpoint}`;
    const socket = new WebSocket(fullURL);

    socket.onopen = () => {
      console.log("✅ WebSocket connection opened:", fullURL);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed:", fullURL);
    };

    return socket;
  } catch (error) {
    console.error("❌ Failed to create WebSocket connection:", error);
    throw error;
  }
}





//for local env


//  export function CreateWebSocketConnection(endpoint) {

//   const fullURL = `${base}${endpoint}`;
//   return new WebSocket(fullURL);
// }








//cloud info
//cloud email deepak.bhargav787860@gmail.com
 //uploadPreset := "deepak_audio"
// cloudname-dvn5f0ho7
// apikey-552691569815268
// apisecret-HpqUVajwjxeRkLsrEbym3mMsQVI
// api env variable-CLOUDINARY_URL=cloudinary://552691569815268:****@dvn5f0ho7


axios.defaults.withCredentials=true
// axios.defaults.withXSRFToken
const API = axios.create({
  baseURL: url, // 🌐 replace with your backend URL
  withCredentials: true, // ✅ Send cookies and allow CORS credentials
});

export default API;