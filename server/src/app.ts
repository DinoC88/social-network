import express, { Application } from 'express';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';
import UsersRoutes from './routes/users.routes';
import ProfileRoutes from './routes/profile.routes';

export class App {
  app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes() {
    this.app.use(IndexRoutes);
    this.app.use('/api/posts', PostRoutes);
    this.app.use('/api/users', UsersRoutes);
    this.app.use('/api/profile', ProfileRoutes);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
