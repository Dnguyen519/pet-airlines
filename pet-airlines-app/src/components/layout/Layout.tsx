import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pet-light via-white to-pet-sky/20">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}