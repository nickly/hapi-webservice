'use strict';
module.exports= (server) => {
  const plugin = 'vision'; 
   server.register({ register: require('../vision_cache') }, (err) => {
      if (err) console.log('Error loading Plugin: #{ '+plugin+' }');
    });
}
