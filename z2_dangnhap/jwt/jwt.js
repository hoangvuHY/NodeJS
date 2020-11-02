var jwt = require('jsonwebtoken');
/* var data = { username: 'hehehe' };
var token = jwt.sign(data, 'thisPassword'); 
console.log(token);

*/
/* var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlaGVoZSIsImlhdCI6MTYwNDMxMDMxM30.F6oytUmN4ddDNH0EOJgcbQzdGeau6zFqV2lnBhc_gsU';
var data = jwt.verify(token, 'thisPassword');
console.log(data); */

var data = { username: 'hahaha' }
    /* jwt.sign(data, 'thisPassword', {
        expiresIn: 100 //100s
    }, (err, token) => {
        console.log(token);
    }); */
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaGFoYSIsImlhdCI6MTYwNDMxMjQ4MSwiZXhwIjoxNjA0MzEyNTgxfQ.twBGHOvZKDlqu2Fybvt1ufwDlAhGE2stB_DLOpETzJA';
var res = jwt.verify(token, 'thisPassword')
console.log('token');
console.log(res);