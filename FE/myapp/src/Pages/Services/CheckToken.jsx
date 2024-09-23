import axios from "axios"

const checkToken = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:7000/cinema/auth/checkToken', {
            headers: {
                Authorization: `${token}`
            }
        })
        if (data === "validToken") return 'valid'

    } catch (error) {
        return console.error(error)
    }
}

export { checkToken }