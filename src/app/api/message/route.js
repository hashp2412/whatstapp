import { NextResponse } from "next/server";

export async function POST(request) {
    const contentType = request.headers.get("content-type");

    let body;
    if (contentType === "application/json") {
        // Parse as JSON
        body = await request.json();
    } else if (contentType === "application/x-www-form-urlencoded") {
        // Parse as URL-encoded data
        const text = await request.text();
        body = Object.fromEntries(new URLSearchParams(text));
    } else {
        return NextResponse.json(
            { error: "Unsupported Content-Type" },
            { status: 415 }
        );
    }

    const { app, sender, message, group_name, phone } = body;

    app && console.log(app);
    sender && console.log(sender);
    message && console.log(message);
    group_name && console.log(group_name);
    phone && console.log(phone);

    return NextResponse.json({ reply: "User inserted successfully" });
}
