import { NextResponse } from "next/server";

export async function POST(request){
    const {app,sender,message,group_name,phone} = await request.json()
    console.log(app)
    console.logs(sender)
    console.log(message)
    console.log(group_name)
    console.log(phone)
    return NextResponse
}