import { createAdminClient } from '@/lib/appwrite/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  const { account } = await createAdminClient();

  if (!userId || !secret) {
    return NextResponse.redirect(`${request.nextUrl.origin}/error`);
  }

  const session = await account.createSession(userId, secret);

  const response = NextResponse.redirect(`${request.nextUrl.origin}/`);

  response.cookies.set('session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
