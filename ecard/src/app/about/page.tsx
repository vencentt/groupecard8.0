import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Happy Work Anniversary | Work Anniversary Messages & Celebrations",
  description: "Learn about Happy Work Anniversary platform, our mission to celebrate workplace milestones, and how we help teams create meaningful work anniversary messages and celebrations.",
  keywords: "work anniversary messages, work anniversary, work anniversary celebrations, workplace milestones, employee recognition",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Happy Work Anniversary</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Creating meaningful work anniversary messages and celebrations that strengthen team bonds and recognize professional milestones
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At Happy Work Anniversary, we believe that recognizing professional milestones is essential for building strong, engaged teams and fostering a positive workplace culture.
            </p>
            <p>
              We provide a simple platform that enables teams to create personalized celebrations that truly honor the contributions and growth of their colleagues, strengthening workplace relationships and boosting morale.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Team celebrating together" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z"></path>
                    <circle cx="12" cy="8" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Authenticity</h3>
              </div>
              <p className="text-center text-muted-foreground">
                We believe in genuine recognition that reflects real appreciation and specific contributions, not generic platitudes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M17 6.1H3"></path>
                    <path d="M21 12.1H3"></path>
                    <path d="M15.1 18H3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Simplicity</h3>
              </div>
              <p className="text-center text-muted-foreground">
                We make celebration easy with intuitive tools that remove complexity and let the focus remain on meaningful recognition.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m7 9 3 3-3 3"></path>
                    <path d="M13 15h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Inclusivity</h3>
              </div>
              <p className="text-center text-muted-foreground">
                We create tools that enable everyone to participate in celebrations, regardless of location, role, or technical ability.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section - Inspired by Tencent */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Celebrate Work Anniversaries</h2>
        <div className="bg-muted p-6 rounded-lg mb-6">
          <p className="mb-4">
            Leading companies like Tencent recognize the importance of celebrating work milestones. As highlighted on their <a href="https://careers.tencent.com/en-us/welfare.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">employee benefits page</a>:
          </p>
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-4">
            <p>
              "Tencent prepares a special acknowledgement for your birthday, provides your baby a QQ number that includes their date of birth, and gives you a unique acknowledgement upon your anniversary with the company."
            </p>
          </div>
          <p>
            Tencent's philosophy emphasizes: "Caring about employees' growth is one of Tencent's core management philosophies." Through our platform, even small teams can create meaningful work anniversary messages that enhance team cohesion and employee satisfaction.
          </p>
        </div>
      </section>


      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create a Meaningful Celebration?</h2>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Join thousands of teams using Happy Work Anniversary to create celebrations that truly honor professional milestones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create">
            <Button size="lg" className="px-8">
              Create Your First Celebration
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="px-8">
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}