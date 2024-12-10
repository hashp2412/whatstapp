import { NextResponse } from "next/server";

export async function POST(request) {
    const contentType = request.headers.get("content-type");

    let body;

    if (contentType.startsWith("application/x-www-form-urlencoded")) {
        // Parse the raw body
        const text = await request.text();
        body = text
    } else {
        return NextResponse.json(
            { error: "Unsupported Content-Type" },
            { status: 415 }
        );
    }

    // const { app, sender, message, group_name, phone } = body;

    // app && console.log(app);
    // sender && console.log(sender);
    // message && console.log(message);
    // group_name && console.log(group_name);
    // phone && console.log(phone);
    console.log(body)

    return NextResponse.json({ xyz: "User inserted successfully" });
}
