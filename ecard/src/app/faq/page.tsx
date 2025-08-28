import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// @ts-ignore - Next.js metadata types may vary between versions
export const metadata: Metadata = {
  title: "Find Work Anniversary Ideas & Tips | Happy Work Anniversary",
  description: "Find answers to frequently asked questions about happy work anniversary celebrations, message ideas, and how to create memorable work anniversary experiences for colleagues.",
  keywords: "work anniversary, work anniversary messages, work anniversary wishes, work anniversary celebration",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Happy Work Anniversary FAQs: Complete Celebration Guide</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about creating happy work anniversary celebrations, sending meaningful work anniversary messages, and using our platform to recognize professional milestones
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">About Happy Work Anniversary Celebrations</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Why are happy work anniversaries important to celebrate?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Happy work anniversaries are significant milestones that deserve recognition for several reasons:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>They acknowledge an employee's loyalty and commitment to the organization</li>
                  <li>They boost employee morale and job satisfaction through meaningful recognition</li>
                  <li>They strengthen team bonds and company culture with shared happy work anniversary celebrations</li>
                  <li>They provide an opportunity to reflect on achievements and professional growth</li>
                  <li>They demonstrate that the company values long-term contributions through happy work anniversary messages</li>
                </ul>
                <p className="mt-2">Celebrating happy work anniversaries is a simple yet effective way to show appreciation and foster a positive workplace environment. These celebrations create moments of recognition that employees remember long after the day has passed.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Which happy work anniversary milestones should be celebrated?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">While all happy work anniversaries deserve acknowledgment, certain milestones typically receive special recognition with more elaborate celebrations and messages:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>1st happy work anniversary</strong>: Marks the completion of the crucial first year and sets the tone for future celebrations</li>
                  <li><strong>5th happy work anniversary</strong>: Represents significant commitment and experience worth celebrating</li>
                  <li><strong>10th happy work anniversary</strong>: A major milestone of dedication that deserves special recognition</li>
                  <li><strong>15th, 20th, 25th happy work anniversaries</strong>: Extraordinary loyalty milestones that call for memorable celebrations</li>
                </ul>
                <p className="mt-2">However, many modern companies celebrate every happy work anniversary to maintain consistent employee recognition practices. Our platform makes it easy to create meaningful celebrations for any work anniversary milestone, regardless of the year.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What are effective happy work anniversary messages and wishes?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Effective happy work anniversary messages and wishes typically include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Specific recognition of the employee's unique contributions</li>
                  <li>Acknowledgment of their professional growth and achievements</li>
                  <li>Heartfelt expressions of gratitude for their dedication</li>
                  <li>Warm wishes for their continued success and future milestones</li>
                </ul>
                <p className="mt-2">Happy work anniversary message examples:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"Happy 5th work anniversary! Your creative problem-solving has transformed how our team approaches challenges. We're fortunate to have you with us."</li>
                  <li>"Happy work anniversary! Your leadership and dedication have been instrumental to our success. Here's to many more years of collaboration."</li>
                  <li>"Wishing you a happy work anniversary! Thank you for 3 amazing years of collaboration, innovation, and positive energy!"</li>
                </ul>
                <p className="mt-2">Personalized happy work anniversary messages that highlight specific contributions are always more meaningful than generic congratulations. Taking the time to craft thoughtful work anniversary wishes shows genuine appreciation for your colleagues.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Creating Happy Work Anniversary Celebrations</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I create a happy work anniversary celebration?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Creating a happy work anniversary celebration on our platform is simple and takes just a few steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Click the "Create Celebration" button on the homepage</li>
                  <li>Enter the employee's name, happy work anniversary year, and celebration date</li>
                  <li>Add your own happy work anniversary wishes as the initiator</li>
                  <li>Share the generated link with colleagues to collect their work anniversary messages</li>
                  <li>Preview the happy work anniversary celebration page anytime to see collected wishes</li>
                  <li>When ready, finalize the celebration and share it with the recipient on their special day</li>
                </ol>
                <p className="mt-2">The entire process takes just minutes to set up, and our intuitive interface guides you through each step of creating a meaningful happy work anniversary celebration.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I edit a happy work anniversary celebration after creating it?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Yes, you can edit several aspects of a happy work anniversary celebration after creating it:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The recipient's name for the happy work anniversary</li>
                  <li>The anniversary year being celebrated in the happy work anniversary card</li>
                  <li>The happy work anniversary celebration date</li>
                  <li>You can also delete inappropriate work anniversary wishes if needed</li>
                </ul>
                <p className="mt-2">To edit a happy work anniversary celebration:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Go to "My Activities" in the navigation menu</li>
                  <li>Find the happy work anniversary celebration you want to edit</li>
                  <li>Click "Manage" to access editing options</li>
                </ol>
                <p className="mt-2">Note that once a happy work anniversary celebration is marked as "completed," some editing options may be limited to preserve the integrity of the final celebration and the collected work anniversary messages.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How do colleagues add their happy work anniversary wishes?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Colleagues can easily add their happy work anniversary wishes by following these simple steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Clicking the contribution link shared by the happy work anniversary celebration initiator</li>
                  <li>Entering their name or nickname on the work anniversary card</li>
                  <li>Writing their personal happy work anniversary message or wish</li>
                  <li>Optionally providing their email (for updates about the celebration only)</li>
                  <li>Submitting their happy work anniversary contribution</li>
                </ol>
                <p className="mt-2">The process is designed to be simple and quick, requiring no account creation or login. This ensures maximum participation from team members who want to share their happy work anniversary wishes with their colleague.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Is there a limit to how many happy work anniversary wishes can be collected?</AccordionTrigger>
              <AccordionContent>
                <p>There is no limit to the number of happy work anniversary wishes that can be collected for a celebration. You can invite as many colleagues as you'd like to contribute their happy work anniversary messages. Our platform is designed to handle celebrations of any size, from small teams to large departments or entire organizations. This allows you to create truly collaborative happy work anniversary celebrations that include everyone's thoughtful wishes.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Privacy & Security for Happy Work Anniversary Celebrations</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-8">
              <AccordionTrigger>Is my happy work anniversary celebration data secure on the platform?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Yes, we take data security for your happy work anniversary celebrations very seriously:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All happy work anniversary data is stored securely in our database with industry-standard encryption</li>
                  <li>Email addresses are optional and only used for the purposes explicitly stated related to work anniversary celebrations</li>
                  <li>We do not share your happy work anniversary information with third parties</li>
                  <li>Happy work anniversary celebration pages are accessible only via their unique links</li>
                </ul>
                <p className="mt-2">Our platform is designed with privacy in mind, ensuring that your happy work anniversary celebrations and messages remain secure and private throughout the entire process.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>Who can see the happy work anniversary wishes collected?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Access to happy work anniversary wishes is controlled as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>During the collection phase, only the happy work anniversary celebration initiator can see all wishes through the management page</li>
                  <li>Contributors can only see their own happy work anniversary wishes during submission</li>
                  <li>Once the happy work anniversary celebration is completed and the final page is generated, anyone with the celebration link can view all wishes</li>
                  <li>The celebration initiator can choose when to share the final happy work anniversary link with the recipient and others</li>
                </ul>
                <p className="mt-2">This approach ensures that the surprise element is maintained while giving the initiator control over the happy work anniversary celebration process.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>How long are happy work anniversary celebrations stored on the platform?</AccordionTrigger>
              <AccordionContent>
                <p>Happy work anniversary celebrations are stored on our platform for one year from the date of creation. After this period, they may be automatically archived. If you'd like to preserve a happy work anniversary celebration for longer, we recommend saving a copy of the final celebration page or contacting us for extended storage options. This ensures that meaningful happy work anniversary messages and wishes can be preserved for future reference.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      <div className="mt-16 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Still Have Happy Work Anniversary Questions?</h2>
        <p className="text-center mb-6">
          If you couldn't find the answer to your happy work anniversary question, feel free to contact our support team for assistance with creating the perfect work anniversary celebration.
        </p>
        <div className="flex justify-center">
          <a href="mailto:support@happyworkanniversary.net" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}