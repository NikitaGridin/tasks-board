import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const imageKey = url.searchParams.get('key');

    if (!imageKey) {
        return new Response('Image key is required', { status: 400 });
    }

    const imagePath = path.join(process.cwd(), 'public', 'avatars', imageKey);
    console.log(imagePath)

    if (fs.existsSync(imagePath)) {
        const buffer = fs.readFileSync(imagePath);
        console.log(buffer)
        const ext = path.extname(imagePath).toLowerCase();

        let contentType = 'image/jpeg';
        if (ext === '.png') {
            contentType = 'image/png';
        } else if (ext === '.jpg' || ext === '.jpeg') {
            contentType = 'image/jpeg';
        }

        return new Response(buffer, {
            headers: {
                'Content-Type': contentType,
            },
        });
    } else {
        return new Response('Image not found', { status: 404 });
    }
}
