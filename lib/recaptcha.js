var recaptcha = { };

recaptcha.publicKey = function() {
  return process.env.BB_RECAPTCHA_PUBLIC;
};

recaptcha.privateKey = function() {
  return process.env.BB_RECAPTCHA_PRIVATE;
};

module.exports = recaptcha;