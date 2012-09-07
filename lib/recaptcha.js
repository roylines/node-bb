var recaptcha = { };

recaptcha.publicKey = function() {
  return process.env.BB_RECAPTCHA_PUBLIC;
};

recaptcha.privateKey = function() {
  return process.env.BB_RECAPTCHA_PRIVATE;
};

// recaptcha.verify = function(remoteAddress, challenge, response, done) {
//   var data = {
//     remoteip:  remoteAddress,
//     challenge: challenge,
//     response:  response
//   };
//   var r = new Recaptcha(recaptcha.publicKey(), recaptcha.privateKey(), data);
//   r.verify(done);
// };

module.exports = recaptcha;