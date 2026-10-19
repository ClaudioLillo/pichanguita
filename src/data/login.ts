import client from './client';



export const login = async(sk: string, password: string) => {
    const res = await client.post("/login", {
        sk,
        password,
    })
    return res.data;
}
