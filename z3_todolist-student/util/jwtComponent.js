var jwt = require('jsonwebtoken');

var generationJWT = (value, secret, expressIn) => {
  return new Promise((resolve, reject) => {
    let token = jwt.sign({ value }, secret, { expiresIn });
    resolve(token);
  })
}

var verifyJWT = (value, secret) => {
  return new Promise((resolve, reject) => {
    try {
      let data = jwt.verify(value, secret);
      resolve(data);
    } catch (error) {
      //Không tìm thấy token
      if (error.message === "jwt must be provided") {
        reject('Error jwt must be provided');
      }
      //Token hết hạn
      if (error.message === "jwt expired") {
        reject('Error jwt expired');
      }
      //Nhập sai chữ kỹ
      if (error.message === "invalid signature") {
        reject('Error invalid signature');
      }
      reject("Error Server");
      // console.log(error);
    }

  })

}

module.exports ={
  generationJWT,
  verifyJWT
}