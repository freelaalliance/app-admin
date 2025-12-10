import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔒 MIDDLEWARE DE SEGURANÇA - CVE-2025-55182
// Padrões suspeitos para bloquear
const SUSPICIOUS_PATTERNS = [
  // Path Traversal
  /\.\.\//g,
  /\.\.%2[fF]/g,
  /\.\.%5[cC]/g,

  // XSS
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /onerror=/gi,
  /onload=/gi,

  // Eval/Code Injection
  /eval\s*\(/gi,
  /Function\s*\(/gi,
  /setTimeout\s*\(/gi,
  /setInterval\s*\(/gi,

  // SQL Injection básico
  /'\s*(or|and)\s*'?\d+/gi,
  /union\s+select/gi,
];

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('sessionUser');
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  // 🔒 Verificar padrões suspeitos na URL
  const fullUrl = pathname + searchParams;
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(fullUrl)) {
      console.warn(`🚨 Requisição suspeita bloqueada: ${fullUrl}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Criar response base
  const response = sessionCookie?.value && pathname === '/login'
    ? NextResponse.redirect(new URL('/', request.url))
    : !sessionCookie?.value && pathname !== '/login'
      ? NextResponse.redirect(new URL('/login', request.url))
      : NextResponse.next();

  // 🔒 Adicionar X-Request-ID único para rastreamento
  response.headers.set('X-Request-ID', crypto.randomUUID());

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
  ],
};
