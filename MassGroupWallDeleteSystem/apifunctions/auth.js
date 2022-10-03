
const Axios = require(`axios`).default

module.exports.getCookieAuthToken = async function getCookieAuthToken() {
    return new Promise((resolve, reject) => {
        Axios.post(`https://auth.roblox.com/v2/logout`, {}, {
            headers:{
                Cookie: `.ROBLOSECURITY=${process.env.ROBLOX_TOKEN}`,
               'x-csrf-token': ``
            }
        }).then(response =>{
            console.log("Somthing has gone very wrong and for some no real reason you where logged out...")
        }).catch(err =>{
            if (err.response.data.errors[0].message == "Token Validation Failed"){
                resolve (err.response.headers[`x-csrf-token`])
            }else{
                console.error("Issue seems to have been caused while trying to you the x-csrf-token. Please ensure your Roblox cookie is correct.");
                reject("Issue while trying to get x-csrf-token")
            }
        })
    })
}