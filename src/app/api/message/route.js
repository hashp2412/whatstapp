import { NextResponse } from "next/server";

export async function POST(request){
    const req = await request.json()
    
    // app && console.log(app)
    // sender && console.log(sender)
    // message && console.log(message)
    // group_name && console.log(group_name)
    // phone && console.log(phone)
    console.log(req)
    return NextResponse.json({ reply: 'User inserted successfully' });
}