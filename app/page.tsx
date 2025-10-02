import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Users, BarChart3, Rocket } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6" />
          <span className="text-xl font-semibold">QWIKKIE Rewards</span>
        </div>
        <nav className="ml-auto flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">
                    <Rocket className="mr-1 h-4 w-4" />
                    Community Rewards Platform
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Manage Your QWIKKIE Rewards Program
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track member activities, monitor social engagement, and reward
                  your community with our comprehensive dashboard.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Member Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor daily activities and engagement across all platforms
                  in one place.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Visualize data with beautiful charts and track progress toward
                  goals.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Rewards System</h3>
                <p className="text-muted-foreground">
                  Automate points calculation and reward distribution from Q1 to
                  Q7.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} QWIKKIE Rewards Dashboard. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
