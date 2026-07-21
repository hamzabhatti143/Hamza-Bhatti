// Renders a JSON-LD structured-data block. `data` may be a single schema object
// or an array of them. Rendered server-side as a static <script> — no client JS.
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
