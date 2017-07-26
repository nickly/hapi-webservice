//
// Handling for static files and directories
//
'use strict';
module.exports= (server) => {
  const plugin = 'inert';
  server.register({ register: require(plugin) }, (err) => {
       if (err) console.log('Error loading Plugin: #{ '+plugin+' }');
  });
}
