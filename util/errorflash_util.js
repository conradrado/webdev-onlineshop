function getSessionInput(req){
    const inputData = req.session.inputData;
    req.session.inputData = null;
    return inputData; 

}

function errorFlash(req, userData, action){
    req.session.inputData = userData;
    req.session.save(action);
}

module.exports = {
    getSessionInput: getSessionInput,
    errorFlash: errorFlash,
}