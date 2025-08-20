import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MyActivitiesSection } from "@/components/my-activities-section";

export const metadata: Metadata = {
  title: "Create & Share Happy Work Anniversary Cards | Happy Work Anniversary",
  description: "Create memorable happy work anniversary celebrations with personalized messages from the team. Recognize professional milestones with thoughtful digital cards.",
  canonical: "https://www.happyworkanniversary.net/",
  keywords: "happy work anniversary, work anniversary cards, work anniversary celebrations, work anniversary wishes, professional milestones",
};

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Happy Work Anniversary - Celebrate with Personalized Digital Cards
          </h1>
          <p className="text-xl text-muted-foreground">
            Create memorable happy work anniversary celebrations for your colleagues with personalized messages from the team. Recognize professional milestones with thoughtful digital cards.
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
        <h2 className="text-3xl font-bold text-center mb-12">How to Create Work Anniversary Celebrations</h2>
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
              <CardTitle>Choose a Happy Work Anniversary Card</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Select a beautiful card to start celebrating your colleague's happy work anniversary.</p>
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
              <h2 className="text-3xl font-bold">Ready to create a happy work anniversary celebration?</h2>
              <p className="text-primary-foreground/80">Create a memorable happy work anniversary celebration in minutes and share it with your team.</p>
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

      {/* SEO Content Section */}
      <section className="mb-16 text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4">Why Send Happy Work Anniversary Wishes</h2>
        <div className="prose max-w-none">
          <p className="mb-4">
            Work anniversaries are significant milestones that deserve recognition in every professional environment. A happy work anniversary celebration acknowledges an employee's loyalty, dedication, and contributions to the organization over time. Sending happy work anniversary wishes not only honors the individual but also strengthens team bonds and workplace culture.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Happy Work Anniversary Celebrations</h3>
          <p className="mb-4">
            Recognizing happy work anniversary milestones has numerous benefits for both employees and organizations. For employees, receiving happy work anniversary wishes creates a sense of belonging and appreciation, boosting morale and job satisfaction. For organizations, celebrating happy work anniversaries improves employee retention, enhances engagement, and demonstrates company values in action. Happy work anniversary messages that highlight specific contributions and growth are particularly meaningful.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Creating Memorable Happy Work Anniversary Experiences</h3>
          <p className="mb-4">
            Our platform makes it easy to create personalized happy work anniversary celebrations that truly honor your colleagues' professional journeys. By collecting happy work anniversary wishes from team members and presenting them in a beautiful digital card, you can create a meaningful experience that the recipient will cherish. Whether it's a 1st, 5th, 10th, or 20th happy work anniversary, our tools help you recognize these important milestones with thoughtfulness and creativity.
          </p>
          
          <p>
            Start creating your happy work anniversary celebration today and show your colleagues how much their dedication and contributions are valued. With just a few clicks, you can set up a collaborative celebration that brings the entire team together to honor professional milestones with heartfelt happy work anniversary messages.
          </p>
        </div>
      </section>
    </main>
  );
}