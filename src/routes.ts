import { createBrowserRouter } from 'react-router'
import Landing from './pages/Landing'
import Analyze from './pages/Analyze'
import PackageDetails from './components/dashboard/PackageDetails'
import DocsLayout from './pages/docs/DocsLayout'
import Introduction from './pages/docs/Introduction'
import HowItWorks from './pages/docs/HowItWorks'
import ScoreEngine from './pages/docs/ScoreEngine'
import Installation from './pages/docs/Installation'
import Quickstart from './pages/docs/Quickstart'
import CLI from './pages/docs/CLI'
import API from './pages/docs/API'
import Configuration from './pages/docs/Configuration'
import Integrations from './pages/docs/Integrations'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/analyze',
    Component: Analyze,
  },
  {
    path: '/analyze/:packageName',
    Component: PackageDetails,
  },
  {
    path: '/docs',
    Component: DocsLayout,
    children: [
      { index: true, Component: Introduction },
      { path: 'how-it-works', Component: HowItWorks },
      { path: 'score-engine', Component: ScoreEngine },
      { path: 'installation', Component: Installation },
      { path: 'quickstart', Component: Quickstart },
      { path: 'cli', Component: CLI },
      { path: 'cli/:command', Component: CLI },
      { path: 'api/:endpoint', Component: API },
      { path: 'configuration', Component: Configuration },
      { path: 'integrations', Component: Integrations },
    ],
  },
])
