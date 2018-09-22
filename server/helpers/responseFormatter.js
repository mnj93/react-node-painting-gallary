

module.exports.FormatResponse = (status,message,data=null) =>{
    const jsonResponse = {
        success:status,
        msg:message,
        data:data
    }
    return jsonResponse;
}