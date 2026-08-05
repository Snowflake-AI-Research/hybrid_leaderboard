import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { asset } from "../lib/asset";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-2 md:pb-24 md:pt-4">
      <div
        className="shadow-slab relative overflow-hidden rounded-[28px] border border-white p-8 ring-1 ring-line md:p-14"
        style={{
          background:
            "linear-gradient(135deg, #e9f6fe 0%, #f4fbff 40%, #ffffff 100%)",
        }}
      >
        {/* crystalline motif + top edge */}
        <img
          src={asset("logos/snowflake-white.svg")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-14 w-[280px] opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, var(--color-ice-bright), #7dd6ff 55%, transparent)",
          }}
        />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-[2.6rem] md:leading-[1.03]">
              Get benchmark updates
            </h2>
            <p className="mt-3 max-w-[42ch] text-[15.5px] leading-relaxed text-muted">
              New results, dataset releases and changes to HybridDeepResearch,
              straight to your inbox. No noise.
            </p>
          </div>

          <div className="md:justify-self-end md:w-full md:max-w-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex items-center gap-3 rounded-2xl border border-ice-bright/30 bg-white/80 p-5 shadow-lift backdrop-blur"
                >
                  <CheckCircle size={28} weight="fill" className="text-ice-deep" />
                  <div>
                    <div className="font-semibold text-ink">
                      You're on the list.
                    </div>
                    <div className="text-[13.5px] text-muted">
                      We'll email you when there's news.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={false}
                  exit={{ opacity: 0 }}
                >
                  <label
                    htmlFor="sub-email"
                    className="block text-[13px] font-medium text-ink"
                  >
                    Email address
                  </label>
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-line-2 bg-white p-1.5 pl-5 shadow-lift transition-colors focus-within:border-ice-bright">
                    <input
                      id="sub-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="you@company.com"
                      aria-invalid={!!error}
                      className="min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-faint"
                    />
                    <button
                      type="submit"
                      className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-ice-deep"
                    >
                      Subscribe
                      <ArrowRight
                        weight="bold"
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                  <div className="mt-2 h-4 text-[12.5px] text-red-600">
                    {error}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
