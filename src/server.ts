process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import WebhooksRoute from '@routes/webhooks.route';
import validateEnv from '@utils/validateEnv';
import AuthRoute from './routes/auth.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new WebhooksRoute()]);

app.listen();
