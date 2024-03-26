const jwt = require("jsonwebtoken");
function tokenDecoded (token){
    const decoded = jwt.verify(token, 
        process.env.JWT_SECRET);
    return(decoded) 
};

module.exports = { tokenDecoded };
