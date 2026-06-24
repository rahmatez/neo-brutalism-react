export function PortfolioFooter() {
  return (
    <footer className="border-t-4 border-black bg-white px-5 py-8">
      <div className="mx-auto flex max-w-full flex-col gap-4 font-bold sm:flex-row sm:items-center sm:justify-between">
        <p>
          Rahmat Ashari |{' '}
          <a
            href="https://www.rahmatez.dev/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-2 underline-offset-4"
          >
            rahmatez.dev
          </a>
        </p>
        <p className="border-2 border-black bg-yellow-300 px-3 py-1 font-mono text-sm text-black shadow-[4px_4px_0px_0px_#000]">
          &lt;/&gt; with React + Neo Brutalism
        </p>
      </div>
    </footer>
  );
}
