//const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
/** TO DO */
/**Спрять токен в переменные окружения на сервере */
//dotenv.config();

const TOKEN_SECRET="382a05a09290934be84a15bd2f2585afaac87eda1de0ee98ead94839b54407396b88ace28a5ce44ff0d4b6d1f484cbc834d9a0ebd28bfe21fde63f0ae9c1ca5b"

module.exports = {
  generateAccessToken: function(data) {
    /** TO DO */
    /** Сделать время работы токена подольше (где-то часа 3-4, в зависимости от продолжительности игры) */
    return jwt.sign(data, TOKEN_SECRET, { expiresIn: '1800s' });
  },

  generateMasterToken: function() {
    return jwt.sign({user: "admin"}, TOKEN_SECRET, { expiresIn: '259200s' });
  },

  authenticateToken: function(args) {
    return new Promise((resolve, reject) => {
      if (args.token == null){
        resolve({message: "Токен не установлен", status: false})
      }
    jwt.verify(args.token, TOKEN_SECRET, (err, user) => {
      if (err){
        resolve({message: "Токен не прошёл валидацию", status: false})
      }else{
        /**Выполнить запрашиваемую функцию после проверки токена */
       resolve({status:true})
      }
    })
    })
    
  }
}

