import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Happy Work Anniversary",
  description: "Terms of service for Happy Work Anniversary platform, outlining the rules and guidelines for using our service.",
  canonical: "https://www.happyworkanniversary.net/terms-of-service",
};

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Introduction</h2>
        <p>
          Welcome to Happy Work Anniversary. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily access the materials on Happy Work Anniversary's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>Attempt to decompile or reverse engineer any software contained on Happy Work Anniversary's website;</li>
          <li>Remove any copyright or other proprietary notations from the materials; or</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by Happy Work Anniversary at any time.
        </p>
        
        <h2>User Content</h2>
        <p>
          Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
        </p>
        <p>
          By posting Content on or through the Service, You represent and warrant that:
        </p>
        <ul>
          <li>The Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms.</li>
          <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</li>
        </ul>
        
        <h2>Accuracy of Materials</h2>
        <p>
          The materials appearing on Happy Work Anniversary's website could include technical, typographical, or photographic errors. Happy Work Anniversary does not warrant that any of the materials on its website are accurate, complete or current. Happy Work Anniversary may make changes to the materials contained on its website at any time without notice.
        </p>
        
        <h2>Links</h2>
        <p>
          Happy Work Anniversary has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Happy Work Anniversary of the site. Use of any such linked website is at the user's own risk.
        </p>
        
        <h2>Modifications</h2>
        <p>
          Happy Work Anniversary may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
        
        <h2>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          <a href="mailto:legal@happyworkanniversary.net">legal@happyworkanniversary.net</a>
        </p>
      </div>
    </div>
  );
}