/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
  var r = require;
  // Insert routes below
  app.use(r('./routes/home'));
//app.use('/api/user'         , r('./routes/user'));
//app.use('/api/product'      , r('./routes/product'));
  app.use('/api/form'         , r('./routes/form'));
  app.use('/api'              , r('./routes/theme'));
  app.use('/api/employee'     , r('./routes/employee'));


  app.use('/api/patient'      , r('./routes/patientqueue'));
  app.use('/auth'             , r('./routes/auth'));
  //app.use('/api/*'            , r('./config/validation'));
  //app.use('/socket'             , r('./test/socket_test'))

  // All other routes should redirect to the index.html
  /*app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });*/
};
