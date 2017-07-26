'use strict';
import Fs from 'fs';
import Hapi from 'hapi';
import Path from 'path';
import Handlebars from 'handlebars';
import LRU from 'lru-cache';

require("../public/unity");
require("../public/helpers/helpers")(Handlebars);


import serverConfig from '../config/server';
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../static')
            }
        }
    }
});


server.debug = true;
server.connection({ port: serverConfig.server.port });
//const web = server.connection({ port: 8000, labels: ['web'] });
//const admin = server.connection({ port: 8001, labels: ['admin'] });




const pluginsPath = Path.join(__dirname, '../libs/plugins');
Fs.readdirSync(pluginsPath).forEach((pluginFile) => {
    if (/.*\.js$/.test(pluginFile)) {
        require('../libs/plugins/' + pluginFile)(server);
    }
});



const routesPath = Path.join(__dirname, '../src/routes');
Fs.readdirSync(routesPath).forEach((routesfile) => {
    Fs.stat(routesPath + "/" + routesfile, function (error, stats) {
        if (!stats.isDirectory()) {
            if (routesfile !== 'base.routes.js') {
                const routes = require('../src/routes/' + routesfile).default;
                routes.forEach(route => server.route(route));
            }
        }
    });

});


server.views({
    engines: {
        html: Handlebars
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: Path.join(__dirname, 'views'),
    layout: '52kj/layout/default',
    partialsPath: Path.join(__dirname, 'views'),
    helpersPath: Path.join(__dirname, '../public/helpers')
    // context: {
    //     cdnUrl: _app.cdnUrl,
    //     skin:""
    // }
});

global.__cache = LRU({
    max: 100,
    maxAge: 1500
});

const isEmpty = function (obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

server.ext('onRequest', (request, reply) => {


    if (request.path.indexOf('static') == -1) {
        if (isEmpty(request.query)) {
            let _key = request.path.replace(/\//ig, '_');
            const hit = __cache.get(_key)
            if (hit) {
                console.log("页面缓存1.5s");
                return reply(hit);
            }
        }
    }


    //if (request.route.method !== '_special') {
    const route = server.match(request.method, request.path);
    if (!route) {
        request.setUrl('/home/404?u=' + request.path);
    } else {
        global._headers = request.headers;
    }

    //}

    return reply.continue();
});



server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler: {
        directory: {
            path: '.'
        }
    }
});


// server.route({
//     method: 'GET',
//     path: '/{notfind*}',
//     handler: function (request, reply) {
//         return reply.redirect('/home/404?u=' + request.params.notfind);
//     }
// });


server.start((err) => {
    if (err) {
        throw err;
    }

    server.connections.map(conn => {
        console.log('Server running at:' + conn.info.uri);
    });

});