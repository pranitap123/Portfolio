import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <div className="space-y-4">
        <Link href="/projects/securevault">
          SecureVault
        </Link>

        <br />

        <Link href="/projects/argus-prism">
          Argus Prism
        </Link>
      </div>
    </main>
  );
}