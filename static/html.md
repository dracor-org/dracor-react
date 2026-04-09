# DocPage with HTML

The <strong>DocPage</strong> component supports HTML markup inside the markdown
files via the [rehype-raw](https://github.com/rehypejs/rehype-raw) support
in [react-markdown](https://github.com/remarkjs/react-markdown?tab=readme-ov-file#appendix-a-html-in-markdown).

<div class="border-2 p-3 mt-5 bg-white">
<code>
import rehypeRaw from 'rehype-raw';

...

&lt;DocPage url="html.md" rehypePlugins={[rehypeRaw]}/&gt;

...
</code>

</div>
