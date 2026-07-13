function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

function getJwtExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = JSON.parse(base64UrlDecode(payload));
    return typeof json.exp === 'number' ? json.exp : null;
  } catch {
    return null;
  }
}

// exp는 초 단위 유닉스 타임스탬프. 디코딩 실패 시 안전하게 만료로 취급한다.
export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  const exp = getJwtExpiry(token);
  if (exp === null) return true;
  return Date.now() >= (exp - skewSeconds) * 1000;
}
