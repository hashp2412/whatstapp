import { NextResponse } from "next/server";

export async function POST(request) {
        const query = await request.text();
        const params = {};
        query.split('&').forEach(pair => {
            if (pair) {
                const [key, value] = pair.split('=');
                params[key] = decodeURIComponent(value);
            }
        });
        
        console.log(params);


    return NextResponse.json({ xyz: "User inserted successfully" });
}
