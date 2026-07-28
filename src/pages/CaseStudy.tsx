import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Found</h1>
        <p className="text-gray-600 mb-4">
          This case study doesn't exist.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
      >
        &larr; Back to all projects
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{study.title}</h1>
      <p className="text-gray-600 mb-8">{study.summary}</p>

      <div className="space-y-8">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {section.heading}
            </h2>
            <p className="text-gray-700 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
