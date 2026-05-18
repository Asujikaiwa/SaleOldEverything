/**
 * Top-level 404 — reached when a request lands outside any locale segment
 * (the middleware should redirect almost everything, but this is a safety net).
 */
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#F8FAFC',
          color: '#0F172A',
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 12,
              letterSpacing: '0.2em',
              color: '#1D4ED8',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            404
          </p>
          <h1 style={{ marginTop: 8, fontSize: 32, fontWeight: 700 }}>
            Page not found
          </h1>
          <p style={{ marginTop: 12, color: '#475569', maxWidth: 480 }}>
            The page you were looking for has moved or never existed.
          </p>
          <Link
            href="/en"
            style={{
              marginTop: 24,
              display: 'inline-block',
              borderRadius: 12,
              background: '#059669',
              color: '#fff',
              padding: '12px 20px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
