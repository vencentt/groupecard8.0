import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Happy Work Anniversary | Our Mission and Story",
  description: "Learn about Happy Work Anniversary platform, our mission to celebrate workplace milestones, and how we help teams create meaningful work anniversary messages and celebrations.",
  canonical: "https://www.happyworkanniversary.net/about",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Happy Work Anniversary</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Creating meaningful workplace celebrations that strengthen team bonds and recognize professional milestones
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
            <p className="mb-4">
              Our mission is to make work anniversary celebrations meaningful, collaborative, and effortless. We provide a platform that enables teams to create personalized celebrations that truly honor the contributions and growth of their colleagues.
            </p>
            <p>
              Through thoughtful work anniversary messages and collaborative celebrations, we help organizations show authentic appreciation for their team members' dedication and loyalty.
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

      {/* Story Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            Happy Work Anniversary was born from a simple observation: while work anniversaries are significant milestones in people's professional lives, they often go unnoticed or are celebrated in hasty, impersonal ways.
          </p>
          <p className="mb-4">
            Our founder experienced this firsthand when a colleague's 10-year work anniversary was acknowledged with just a brief email. Seeing the missed opportunity to celebrate such a significant milestone properly, the idea for a dedicated work anniversary celebration platform was born.
          </p>
          <p className="mb-4">
            We launched in 2023 with a clear purpose: to transform work anniversary celebrations from afterthoughts into meaningful experiences that strengthen workplace relationships and recognize professional journeys.
          </p>
          <p>
            Today, Happy Work Anniversary helps teams across industries create collaborative celebrations that truly honor their colleagues' contributions and milestones, fostering stronger workplace connections and boosting employee engagement.
          </p>
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

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Celebrate Work Anniversaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">For Employees</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Increased sense of belonging and value</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Recognition of professional growth and achievements</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Motivation to continue contributing and growing</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Meaningful feedback from colleagues and leadership</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">For Organizations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Improved employee retention and loyalty</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Strengthened team bonds and workplace culture</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Enhanced employee engagement and satisfaction</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1 flex-shrink-0">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Demonstration of company values in action</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create Meaningful Work Anniversary Celebrations?</h2>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Join thousands of teams using Happy Work Anniversary to recognize professional milestones and strengthen workplace connections.
        </p>
        <Link href="/create">
          <Button size="lg" className="px-8">
            Create Your First Celebration
          </Button>
        </Link>
      </section>
    </div>
  );
}