import { createProxyMiddleware } from 'http-proxy-middleware';
import '../../back/app.py';

export default function setup(app) {
  app.use(
    '../../back/app.py',  
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/',  
      changeOrigin: true,
    })
  );
}
