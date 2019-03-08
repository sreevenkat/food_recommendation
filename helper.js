var bcrypt = require('bcryptjs');
var User = require('./models').User
var HotelUser = require('./models').HotelUser

function createUser(firstName, lastName, email, password){

    var hashedPassword = bcrypt.hashSync(password, 8);
    
    User.create({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : hashedPassword
    },
    function (err, user) {
        if (err) {
            console.log("ERR: ", err);
        }
    })

}

function createHotelUser(hotel_id, user_id){
    
    HotelUser.create({
        hotel_id : hotel_id,
        user_id: user_id
    },
    function (err, hoteluser) {
        if (err) {
            console.log("ERR: ", err);
        }
    })

}

createUser('John', 'Mclain', 'john@lalaland.com', "yipeekayak");
createHotelUser(1,1);