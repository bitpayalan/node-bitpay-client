var fs         = require('fs');
var HOME       = process.env['HOME'];
var bitauth    = require('bitauth');
var bitpay     = require('../index');
var encPrivkey = fs.readFileSync(HOME + '/.bitpay/api.key').toString();
var pubkey  = fs.readFileSync(HOME + '/.bitpay/api.pub').toString();
var privkey    = bitauth.decrypt('', encPrivkey); // decrypt with your key pass
var client     = bitpay.createClient();

var hashPassword = require('../lib/hash-password.js');
var salt = '12345';

hashPassword('TestPassword#5', function(err, hashedPassword) {
  var data = {
    email: 'alan+7@bitpay.com',
    userName: 'REST User',
    hashedPassword: hashedPassword,
    salt: salt,
    userPhone: '555-555-5555',
    id: pubkey
  };

  client.as('public').post('users', data, function(err, data) {
    console.log(err || data);
  });

})