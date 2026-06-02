import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/utils/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/utils/prisma';
import bcrypt from 'bcryptjs';
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        steamId: true,
        youtubeHandle: true,
        favoriteArtist: true,
      }
    });
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { password, avatarUrl, steamId, youtubeHandle, favoriteArtist } = body;
    const updateData: Record<string, string | null> = {};
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl === '' ? null : avatarUrl;
    if (steamId !== undefined) updateData.steamId = steamId === '' ? null : steamId;
    if (youtubeHandle !== undefined) updateData.youtubeHandle = youtubeHandle === '' ? null : youtubeHandle;
    if (favoriteArtist !== undefined) updateData.favoriteArtist = favoriteArtist === '' ? null : favoriteArtist;
    const updatedUser = await prisma.user.update({
      where: { id: payload.id as string },
      data: updateData,
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        steamId: true,
        youtubeHandle: true,
        favoriteArtist: true,
      }
    });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
