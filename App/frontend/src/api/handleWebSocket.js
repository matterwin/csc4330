import { WS_IP_ADDRESS } from './apiConfig';

const baseURL = `ws://${WS_IP_ADDRESS}`;
const ws = new WebSocket(baseURL);

ws.onopen = () => {
  console.log('WebSocket connection opened');
};

ws.onmessage = (event) => {
  console.log('WebSocket message received:', event.data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
  console.log('WebSocket connection closed:', event);
};

const sendMessage = (message) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ message }));
    console.log('Sent message to WebSocket server:', message);
  } else {
    console.error('WebSocket is not open. Unable to send message.');
  }
};

export { ws, sendMessage };
