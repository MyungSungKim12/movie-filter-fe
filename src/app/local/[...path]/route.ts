import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(request, await params);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(request, await params);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(request, await params);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(request, await params);
}

async function proxyRequest(
    request: NextRequest,
    params: { path: string[] }
) {
    const path = params.path.join('/');
    const search = request.nextUrl.search;
    const targetUrl = `http://localhost:8080/${path}${search}`;

    // 요청 헤더 복사 (Authorization 포함)
    const headers = new Headers();
    request.headers.forEach((value, key) => {
        // host 헤더는 제외 (백엔드 서버 주소로 자동 설정)
        if (key.toLowerCase() !== 'host') {
            headers.set(key, value);
        }
    });

    const isFormData = request.headers.get('content-type')?.includes('multipart/form-data');

    let body: BodyInit | null = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        if (isFormData) {
            body = await request.blob();
        } else {
            body = await request.text();
        }
    }

    const response = await fetch(targetUrl, {
        method: request.method,
        headers,
        body,
    });

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
        responseHeaders.set(key, value);
    });

    const responseBody = await response.blob();

    return new NextResponse(responseBody, {
        status: response.status,
        headers: responseHeaders,
    });
}