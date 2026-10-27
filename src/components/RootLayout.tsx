import { Outlet, ScrollRestoration } from 'react-router'

/**
 * Shared shell for every route. ScrollRestoration resets the window to the top
 * on navigation (while still restoring positions when the user goes back) and
 * handles hash links such as /docs/cli#global-options.
 */
export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
