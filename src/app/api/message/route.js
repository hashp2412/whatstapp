import { NextResponse } from "next/server";

export async function POST(request){
    const {app,sender,message,group_name,phone} = await request.json()
    app && console.log(app)
    sender && console.log(sender)
    message && console.log(message)
    group_name && console.log(group_name)
    phone && console.log(phone)
    return NextResponse.json({ reply: 'User inserted successfully' });
}