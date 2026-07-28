export function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>
      <p className="text-gray-600 mb-6">
        Get in touch — I'm always open to discussing new projects and
        opportunities.
      </p>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-900">Email:</span>{" "}
          <a
            href="mailto:hello@example.com"
            className="text-blue-600 hover:underline"
          >
            hello@example.com
          </a>
        </div>
        <div>
          <span className="font-medium text-gray-900">LinkedIn:</span>{" "}
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/yourprofile
          </a>
        </div>
        <div>
          <span className="font-medium text-gray-900">Location:</span>{" "}
          <span className="text-gray-700">City, Country</span>
        </div>
      </div>
    </div>
  );
}
