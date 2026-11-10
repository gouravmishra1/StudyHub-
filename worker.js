// Cloudflare Worker: sirf batch/lesson API ko proxy karta hai (CORS allow ke saath)
export default {
  async fetch(req) {
    const p = new URL(req.url).searchParams.get('p') || '';
    if (!/^\/api\/(classroom|lesson)\/\d+$/.test(p)) return new Response('bad path', { status: 400 });
    const r = await fetch('https://www.study-mate.in' + p, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'cache-control': 'max-age=300' } });
  }
};
