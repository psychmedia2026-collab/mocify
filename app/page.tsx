export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-black tracking-tight">
          MOCIFY
        </h1>

        <div className="flex gap-6 text-sm">
          <button>Discover</button>
          <button>For Artists</button>
          <button>Log in</button>
        </div>
      </nav>

      <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-400">
          The future of music
        </p>

        <h2 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
          Music created differently.
        </h2>

        <p className="mt-6 max-w-xl text-lg text-gray-400">
          Discover AI-powered artists, tracks and sounds from a new
          generation of music creators.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-white px-7 py-3 font-bold text-black">
            Start listening
          </button>

          <button className="rounded-full border border-gray-600 px-7 py-3 font-bold">
            Upload music
          </button>
        </div>
      </section>

      <section className="px-8 pb-12">
        <h3 className="mb-6 text-2xl font-bold">Trending on MOCIFY</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">AI ARTIST</p>
            <h4 className="mt-8 text-xl font-bold">Coming soon</h4>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">NEW RELEASE</p>
            <h4 className="mt-8 text-xl font-bold">Coming soon</h4>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">TRENDING</p>
            <h4 className="mt-8 text-xl font-bold">Coming soon</h4>
          </div>
        </div>
      </section>
    </main>
  );
}