import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import FlowDiagram from '@/components/sections/FlowDiagram'
import SafetyScore from '@/components/sections/SafetyScore'
import PackageIntelligence from '@/components/sections/PackageIntelligence'
import BehaviorAnalysis from '@/components/sections/BehaviorAnalysis'
import DependencyGraph from '@/components/sections/DependencyGraph'
import AISearch from '@/components/sections/AiSearch'
import { CLITerminal } from '@/components/sections/CLITerminal'
import DevTooling from '@/components/sections/DevTooling'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/CTA'

export default function Landing() {
  return (
    <div style={{ background: '#080808', minHeight: '100%' }}>
      <Nav transparent />
      <Hero />
      <Problem />
      <FlowDiagram />
      <SafetyScore />
      <PackageIntelligence />
      <BehaviorAnalysis />
      <DependencyGraph />
      <AISearch />
      <CLITerminal />
      <DevTooling />
      <FinalCTA />
      <Footer />
    </div>
  )
}
