var fs         = require('fs');
var HOME       = process.env['HOME'];
var bitauth    = require('bitauth');
var bitpay     = require('../index');
var encPrivkey = fs.readFileSync(HOME + '/.bitpay/api.key').toString();
var privkey    = bitauth.decrypt('', encPrivkey); // decrypt with your key pass
var client     = bitpay.createClient(privkey);

var hashPassword = require('../lib/hash-password.js');
var salt = '12345';

hashPassword('TestPassword#5', function(err, hashedPassword) {
  var data = {
    name: 'Merchant Name',
    phone: '666-666-6666',
    address1: '555 Tester Ave',
    address2: 'Suite 100',
    locality: 'Nowhere',
    region: 'PA',
    postal: '11111',
    country: 'United States of America',
    isNonProfit: false,
    industry: 'Accounting',
    website: 'http://www.bitpay.com'
   };

  client.on('error', function(err) {
    console.log(err);
  });

  client.on('ready', function() {

    client.as('user').post('orgs', data, function(err, data) {
      console.log(err || data);
    });

  });
})