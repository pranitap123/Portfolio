import { Section, Prose } from "./Section";
import { missionData } from "@/lib/data/securevault";

export function TheMission() {
  return (
    <Section id="mission" eyebrow="Context" heading="The Mission">
      <Prose className="mb-8">{missionData.problem}</Prose>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
        {missionData.requirements.map((req) => (
          <div key={req.category} className="bg-[#080808] p-6">
            <h3 className="text-xs font-mono font-semibold text-[#C5A880]/80 uppercase tracking-widest mb-4">
              {req.category}
            </h3>
            <ul className="space-y-2.5" role="list">
              {req.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" aria-hidden="true" />
                  <span className="text-xs text-white/45 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}