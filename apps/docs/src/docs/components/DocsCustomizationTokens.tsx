import {
  componentTokens,
  sharedTokens,
  type DocsTokenComponent,
} from '../docs-tokens-data';

interface DocsCustomizationTokensProps {
  component: DocsTokenComponent;
}

export function DocsCustomizationTokens({ component }: DocsCustomizationTokensProps) {
  const tokens =
    component === 'theme'
      ? [...sharedTokens, ...componentTokens.theme]
      : [...componentTokens[component], ...sharedTokens];

  return (
    <section id="customization">
      <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
        Customization
      </h2>
      <p className="mb-5 text-base font-medium">
        Override these CSS variables on <code>:root</code>, a wrapper, or the component element.
        More local values win, so per-instance styling can sit directly on the element.
      </p>

      <div className="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead className="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th className="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                Token
              </th>
              <th className="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                Default
              </th>
              <th className="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Used for</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {tokens.map((token, index) => (
              <tr
                key={token.name}
                className={index < tokens.length - 1 ? 'border-b-2 border-(--nb-border)' : ''}
              >
                <td className="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  {token.name}
                </td>
                <td className="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  {token.defaultValue}
                </td>
                <td className="px-4 py-3">{token.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
