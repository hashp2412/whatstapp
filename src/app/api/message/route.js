import { NextResponse } from "next/server";

export async function POST(request) {
    const contentType = request.headers.get("content-type");

    let body;

    if (contentType.startsWith("application/x-www-form-urlencoded")) {
        // Parse the raw body
        const text = await request.text();
        try {
            // Handle malformed body like `{app=whatsauto,sender=xyz,message=alpha}`
            body = Object.fromEntries(
                text
                    .replace(/[{}]/g, "") // Remove curly braces
                    .split(",")          // Split by commas
                    .map((pair) => pair.split("=")) // Split key-value pairs
            );
        } catch (err) {
            return NextResponse.json(
                { error: "Malformed request body" },
                { status: 400 }
            );
        }
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
