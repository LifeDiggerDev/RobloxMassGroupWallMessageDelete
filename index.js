require(`dotenv`).config()
const axios = require('axios');
const AuthAPI = require(`./apifunctions/auth`)


const massDeleteMessages = async () => {
    axios.get(
        `https://groups.roblox.com/v1/groups/${process.env.GROUP_ID}/wall/posts?sortOrder=Asc&limit=100`
    ).then(async Response => {
        const AuthToken = await AuthAPI.getCookieAuthToken()
        console.log(AuthToken)
        Response.data.data.forEach(async element => {
            const DeleteMsg = await axios.delete(
                `https://groups.roblox.com/v1/groups/${process.env.GROUP_ID}/wall/posts/${element.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `.ROBLOSECURITY=${process.env.ROBLOX_TOKEN}`,
                        'x-csrf-token': AuthToken,
                    }
                }
            ).then(responsegot =>{
                console.log(responsegot.data)
            }).catch(err => {
                console.error(err.response.data)
            })
        });
    }).catch(async err => {
        console.log(err.response.data)
    })
}

const massDeleteUserMessages = async (userId) =>{
    const AuthToken = await AuthAPI.getCookieAuthToken()
    axios.delete(
        `https://groups.roblox.com/v1/groups/${process.env.GROUP_ID}/wall/users/${userId}/posts`,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `.ROBLOSECURITY=${process.env.ROBLOX_TOKEN}`,
                'x-csrf-token': AuthToken,
            }
        }
    ).then(response =>{
        console.log("All messages from the user selected should be removed sucessfully!")
    }).catch(err =>{
        console.log(err.response.data)
    })
}

massDeleteMessages()