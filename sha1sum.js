var crypto = require('crypto');

// it is the same as echo -n <text> | sha1sum | awk '{print toupper($1)}'

exports.sha1sum = function ( text ) {

    var shasum = crypto.createHash('sha1');
    
    shasum.update(text);
    
    return shasum.digest('hex').toUpperCase();
    
};