import koa from 'koa';
import koaJson from 'koa-json';
import koaRouter from '@koa/router';
import koaBody from 'koa-body';
import { InsertUserData, RetrieveUserData } from './functions.js';

const app = new koa();
const router = new koaRouter();

router.get('/get/:key', async ctx => {
  const {
    params: { key },
    query: { timestamp },
  } = ctx;

  let data;
  let status = 200;
  let resp = { data };

  try {
    data = await RetrieveUserData(key, timestamp);

    // If user pass an non-existed key
    if (!data) {
      status = 400;
      resp.data = `Can not found the data under ${key}!`;
    } else {
      resp.data = data;
    }
  } catch (e) {
    status = 500;
    resp.data = e.message;
  }

  ctx.response.type = 'json';
  ctx.status = status;
  ctx.response.body = resp;
});

router.post('/insert', koaBody(), async ctx => {
  const { key, value } = ctx.request.body;
  let status = 200;
  let resp = {};

  // key and value are necessary for insert operation
  if (!key || !value) {
    resp.result = 'key and value are both required for inserting';
    status = 400;
  } else {
    const opResult = await InsertUserData(key, value);
    resp.result = opResult;
  }

  ctx.response.type = 'json';
  ctx.status = status;
  ctx.response.body = resp;
});

app.use(koaJson()).use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server running in http://localhost:3000');
});
