var Recaptcha = require('recaptcha').Recaptcha;

var recaptcha = { };

recaptcha.keys = function() {
  return {
    priv: process.env.BB_RECAPTCHA_PRIVATE,
    pub: process.env.BB_RECAPTCHA_PUBLIC
  };
};

recaptcha.form = function() {
 var r = new Recaptcha(recaptcha.keys().pub, recaptcha.keys().priv);
 var html = '<script type="text/javascript">var RecaptchaOptions = {theme : "clean",lang  : "en"};</script>' + r.toHTML() + '<br/>';
 return html;
};

recaptcha.verify = function(remoteAddress, challenge, response, done) {
  var data = {
    remoteip:  remoteAddress,
    challenge: challenge,
    response:  response
  };
  var r = new Recaptcha(recaptcha.keys().pub, recaptcha.keys().priv, data);
  r.verify(done);
};

module.exports = recaptcha;