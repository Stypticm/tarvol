import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
    const { device } = userAgent(request);
    const isMobile = device.type === 'mobile';

    if (!isMobile && request.nextUrl.pathname !== '/not-mobile') {
        return NextResponse.redirect(new URL('/not-mobile', request.url));
    }

    return NextResponse.next();
}