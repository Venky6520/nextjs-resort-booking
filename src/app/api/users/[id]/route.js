import DBconnection from "../../../utilis/config/db";

export async function GET(request, { params }) {
    await DBconnection()

    const { id } = params

    console.log("Dynamic ID",id)
}