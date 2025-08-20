import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Work Anniversary FAQs | Happy work anniversary",
  description: "Frequently asked questions about work anniversaries, celebration ideas, and how to use our platform to create memorable work anniversary experiences.",
  canonical: "https://www.happyworkanniversary.net/faq",
};

export default function FAQPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions About Work Anniversaries</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about celebrating work anniversaries and using our platform
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">About Work Anniversaries</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Why are work anniversaries important to celebrate?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Work anniversaries are significant milestones that deserve recognition for several reasons:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>They acknowledge an employee's loyalty and commitment to the organization</li>
                  <li>They boost employee morale and job satisfaction</li>
                  <li>They strengthen team bonds and company culture</li>
                  <li>They provide an opportunity to reflect on achievements and growth</li>
                  <li>They demonstrate that the company values long-term contributions</li>
                </ul>
                <p className="mt-2">Celebrating work anniversaries is a simple yet effective way to show appreciation and foster a positive workplace environment.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Which work anniversaries should be celebrated?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">While all work anniversaries deserve acknowledgment, certain milestones typically receive special recognition:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>1st anniversary</strong>: Marks the completion of the crucial first year</li>
                  <li><strong>5th anniversary</strong>: Represents significant commitment and experience</li>
                  <li><strong>10th anniversary</strong>: A major milestone of dedication</li>
                  <li><strong>15th, 20th, 25th anniversaries</strong>: Extraordinary loyalty milestones</li>
                </ul>
                <p className="mt-2">However, many modern companies celebrate every work anniversary to maintain consistent employee recognition practices. Our platform makes it easy to celebrate any work anniversary, regardless of the year.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What are appropriate work anniversary messages?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Effective work anniversary messages typically include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Specific recognition of the employee's contributions</li>
                  <li>Acknowledgment of their growth and achievements</li>
                  <li>Expressions of gratitude for their dedication</li>
                  <li>Well wishes for their continued success</li>
                </ul>
                <p className="mt-2">Examples:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"Congratulations on 5 years! Your creative problem-solving has transformed how our team approaches challenges."</li>
                  <li>"Happy work anniversary! Your leadership and dedication have been instrumental to our success."</li>
                  <li>"Thank you for 3 amazing years of collaboration, innovation, and positive energy!"</li>
                </ul>
                <p className="mt-2">Personalized messages that highlight specific contributions are always more meaningful than generic congratulations.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Using Our Platform</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I create a work anniversary celebration?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Creating a work anniversary celebration on our platform is simple:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Click the "Create Celebration" button on the homepage</li>
                  <li>Enter the employee's name, anniversary year, and celebration date</li>
                  <li>Add your own wishes as the initiator</li>
                  <li>Share the generated link with colleagues to collect their wishes</li>
                  <li>Preview the celebration page anytime to see collected wishes</li>
                  <li>When ready, finalize the celebration and share it with the recipient</li>
                </ol>
                <p className="mt-2">The entire process takes just minutes to set up, and our intuitive interface guides you through each step.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I edit a celebration after creating it?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Yes, you can edit several aspects of a celebration after creating it:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The recipient's name</li>
                  <li>The anniversary year being celebrated</li>
                  <li>The celebration date</li>
                  <li>You can also delete inappropriate wishes if needed</li>
                </ul>
                <p className="mt-2">To edit a celebration:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Go to "My Activities" in the navigation menu</li>
                  <li>Find the celebration you want to edit</li>
                  <li>Click "Manage" to access editing options</li>
                </ol>
                <p className="mt-2">Note that once a celebration is marked as "completed," some editing options may be limited to preserve the integrity of the final celebration.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How do colleagues add their wishes?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Colleagues can easily add their wishes by:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Clicking the contribution link shared by the celebration initiator</li>
                  <li>Entering their name or nickname</li>
                  <li>Writing their personal message or wish</li>
                  <li>Optionally providing their email (for updates only)</li>
                  <li>Submitting their contribution</li>
                </ol>
                <p className="mt-2">The process is designed to be simple and quick, requiring no account creation or login. This ensures maximum participation from team members.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Is there a limit to how many wishes can be collected?</AccordionTrigger>
              <AccordionContent>
                <p>There is no limit to the number of wishes that can be collected for a work anniversary celebration. You can invite as many colleagues as you'd like to contribute their messages. Our platform is designed to handle celebrations of any size, from small teams to large departments or entire organizations.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-8">
              <AccordionTrigger>Is my data secure on the platform?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Yes, we take data security seriously:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All data is stored securely in our database with industry-standard encryption</li>
                  <li>Email addresses are optional and only used for the purposes explicitly stated</li>
                  <li>We do not share your information with third parties</li>
                  <li>Celebration pages are accessible only via their unique links</li>
                </ul>
                <p className="mt-2">Our platform is designed with privacy in mind, ensuring that your work anniversary celebrations remain secure and private.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>Who can see the wishes collected?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Access to wishes is controlled as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>During the collection phase, only the celebration initiator can see all wishes through the management page</li>
                  <li>Contributors can only see their own wishes during submission</li>
                  <li>Once the celebration is completed and the final page is generated, anyone with the celebration link can view all wishes</li>
                  <li>The celebration initiator can choose when to share the final link with the recipient and others</li>
                </ul>
                <p className="mt-2">This approach ensures that the surprise element is maintained while giving the initiator control over the celebration process.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>How long are celebrations stored on the platform?</AccordionTrigger>
              <AccordionContent>
                <p>Work anniversary celebrations are stored on our platform for one year from the date of creation. After this period, they may be automatically archived. If you'd like to preserve a celebration for longer, we recommend saving a copy of the final celebration page or contacting us for extended storage options.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      <div className="mt-16 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h2>
        <p className="text-center mb-6">
          If you couldn't find the answer to your question, feel free to contact us.
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