/**
 * The DraCor component library comes with a theme that slightly extends the
 * default Tailwind CSS theme. To make this theme available to your project add
 * the following line to your index.css (without the leading backslash):
 *
 * ```
 * \@import "@dracor/react/dracor.css";
 * ```
 *
 * The following text demonstrates how this theme styles certain HTML elements.
 */
export default function Theme() {
  return (
    <>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>
        <a href="https://www.lipsum.com" target="_blank">Lorem ipsum</a> dolor
        sit amet, <strong>consectetur</strong> adipiscing elit, sed do eiusmod
        tempor <em>incididunt ut labore</em> et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h2>Colors</h2>
      <ul>
        <li className="text-primary">primary</li>
        <li className="text-secondary-100">secondary-100</li>
        <li className="text-secondary-200">secondary-200</li>
        <li className="text-neutral-100">neutral-100</li>
        <li className="text-neutral-200">neutral-200</li>
      </ul>

      <h2>Input elements</h2>
      <p>
        <input placeholder="some text"/>
      </p>

      <h2>Animation</h2>
      <p>
        <code>spin-slow</code>
        <span className="p-3 bg-primary inline-block ml-2">
          <img src="/ecocor.svg" alt="EcoCor Logo" width="50" className="animate-spin-slow"/>
        </span>
      </p>
    </>
  );
}
