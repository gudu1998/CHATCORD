const moment = require('moment')


 const formatMessage = (username,text) =>{
    return{
        username,
        text,
        time:moment().format('h:mm a')  //a is used for am and pm part
    }
}

module.exports = formatMessage