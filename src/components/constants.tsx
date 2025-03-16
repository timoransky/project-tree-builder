export const jsonExample = `[
  {
    name: "my-project",
    children: [
      {
        name: "src",
        isBold: true,
        children: [
          {
            name: "app",
            isSelected: true,
            children: [
              {
                name: "page.tsx",
                tooltip: "Main page component"
              }
            ]
          },
          {
            name: "components",
            children: [
              {
                name: "...",
                isDisabled: true
              }
            ]
          }
        ]
      }
    ]
  }
]`;

export const htmlExample = `<ul>
  <li>my-project
    <ul>
      <li><strong>src</strong>
        <ul>
          <li class="selected">app
            <ul>
              <li title="Main page component">page.tsx</li>
            </ul>
          </li>
          <li>components
            <ul>
              <li class="disabled">...</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`;

export const markdownExample = `* my-project
  * **src**
    * app [selected]
      * page.tsx (Main page component)
    * components
      * ... [disabled]`;
