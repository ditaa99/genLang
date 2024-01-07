import { createProxyMiddleware } from 'http-proxy-middleware';
import '../../back/app.py';

export default function setup(app) {
  app.use(
    '../../back/app.py',  // Change '/api' to match your backend route
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/',  // Change to your backend URL
      changeOrigin: true,
    })
  );
}
