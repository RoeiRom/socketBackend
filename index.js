const express = require('express');
const { default: pgPubsub} = require('@graphile/pg-pubsub');
const { makePluginHook, postgraphile } = require('postgraphile');
const ConnectionPluginFilter = require('postgraphile-plugin-connection-filter');

const app = express();

const pluginHook = makePluginHook([pgPubsub]);

app.use(
    postgraphile('postgres://postgres:R159123147r!@localhost:5432/postgres', 'public', {
        watchPg: true, 
        graphiql: true,
        enableCors: true,
        enhanceGraphiql: true, 
        pluginHook,
        appendPlugins: [ConnectionPluginFilter],
        graphileBuildOptions: {
            connectionFilterRelations: true
        },
        subscriptions: true,
        simpleSubscriptions: true,
        websocketMiddlewares: []
    })
);

app.listen(8080, () => {
    console.log('app started!')
});