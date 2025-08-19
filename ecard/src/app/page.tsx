import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MyActivitiesSection } from "@/components/my-activities-section";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Happy Work Anniversary
          </h1>
          <p className="text-xl text-muted-foreground">
            Create memorable work anniversary celebrations for your colleagues with personalized messages from the team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/create">
              <Button size="lg" className="w-full sm:w-auto">
                Create Celebration
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              How It Works
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="bg-card p-6 rounded-xl shadow-lg transform rotate-3 w-64">
                <div className="text-center">
                  <h3 className="font-bold text-lg">Congratulations!</h3>
                  <p className="text-sm text-muted-foreground mb-3">on your 5th work anniversary</p>
                  <div className="border-t border-b py-2 my-2">
                    <p className="italic">&quot;Thank you for your amazing contributions over the years!&quot;</p>
                  </div>
                  <p className="text-xs text-right text-muted-foreground">- Your Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <Image 
                  src="/images/how-to-choose.svg" 
                  alt="Choose a card" 
                  width={300} 
                  height={300}
                  className="w-full h-full"
                />
              </div>
              <CardTitle>Choose a Card</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Select a beautiful card to start celebrating your colleague's work anniversary.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <Image 
                  src="/images/how-to-card-open.svg" 
                  alt="Collect wishes" 
                  width={300} 
                  height={300}
                  className="w-full h-full"
                />
              </div>
              <CardTitle>Collect Wishes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Share the link with team members to collect their congratulatory messages.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <Image 
                  src="/images/how-to-sign.svg" 
                  alt="Celebrate together" 
                  width={300} 
                  height={300}
                  className="w-full h-full"
                />
              </div>
              <CardTitle>Celebrate Together</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Share the final celebration page with your colleague on their special day.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to celebrate?</h2>
              <p className="text-primary-foreground/80">Create a memorable work anniversary celebration in minutes.</p>
            </div>
            <Link href="/create">
              <Button size="lg" variant="secondary">
                Create Celebration
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* My Activities Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">My Activities</h2>
        <MyActivitiesSection />
      </section>
    </main>
  );
}