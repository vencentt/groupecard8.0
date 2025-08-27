import { Metadata } from "next";

// @ts-ignore - Next.js metadata types may vary between versions
export const metadata: Metadata = {
  title: "Privacy Policy | Happy Work Anniversary",
  description: "Privacy policy for Happy Work Anniversary platform, detailing how we collect, use, and protect your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Introduction</h2>
        <p>
          At Happy Work Anniversary, we respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>
        
        <h2>The Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
        </ul>
        
        <h2>How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To provide and maintain our service.</li>
          <li>To notify you about changes to our service.</li>
          <li>To allow you to participate in interactive features of our service when you choose to do so.</li>
          <li>To provide customer support.</li>
          <li>To gather analysis or valuable information so that we can improve our service.</li>
          <li>To monitor the usage of our service.</li>
          <li>To detect, prevent and address technical issues.</li>
        </ul>
        
        <h2>Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>
        
        <h2>Data Retention</h2>
        <p>
          We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
        </p>
        
        <h2>Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
        </p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          <a href="mailto:privacy@happyworkanniversary.net">privacy@happyworkanniversary.net</a>
        </p>
      </div>
    </div>
  );
}