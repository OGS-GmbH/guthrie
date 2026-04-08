> _We're OGS, check out our work on [github.com/ogs-gmbh](https://github.com/ogs-gmbh)_

# Guthrie

_A Decarative UI Runtime Engine powered by React._

![Preview](./docs/preview.avif)

<a href="./LICENSE" target="_blank"><img alt="license badge" src="https://img.shields.io/github/license/OGS-GmbH/guthrie?color=0f434e&logo=hackthebox&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://github.com/OGS-GmbH/guthrie/actions/workflows/main-trusted-deploy.yml" target="_blank"><img alt="workflow badge" src="https://img.shields.io/github/actions/workflow/status/OGS-GmbH/guthrie/main-trusted-deploy.yml?color=0f434e&logo=rocket&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://www.npmjs.com/package/@ogs-gmbh/guthrie" target="_blank"><img alt="npm badge" src="https://img.shields.io/npm/v/%40ogs-gmbh%2Fguthrie?color=0f434e&logo=npm&logoColor=000000&labelColor=ffffff" /></a>

- **Declarative UI Composition**\
  Build complete user interfaces using structured configuration instead of imperative code. UI, logic, and behavior are defined in a unified declarative model.

- **Runtime Expression Engine**\
  Evaluate dynamic expressions using extensible operators. Compose logic directly in your configuration without embedding JavaScript.

- **Function & Event Orchestration**\
  Execute functions and attach events declaratively. Combine async logic, side effects, and UI updates without tightly coupling them to components.

- **Fully Extensible Architecture**\
  Customize elements, operators, and functions to adapt Guthrie to your domain. The system is designed to be extended, not constrained.

## Getting Started

> [!IMPORTANT]
> We're offering an extensive API-Reference covered with in-depth usage examples of this project.

To get a starting point, simply refer to our documentation at [ogs-gmbh.github.io/guthrie](https://ogs-gmbh.github.io/guthrie).

### Prerequisites

- Node.js version 18 or higher
- A package manager: e.g. npm, pnpm, ...

### Installation

Using npm:

```sh
$ npm add @ogs-gmbh/guthrie
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

Using yarn:

```sh
$ pnpm add @ogs-gmbh/guthrie
```

Using pnpm:

```sh
$ pnpm add @ogs-gmbh/guthrie
```

Using bun:

```sh
$ bun add @ogs-gmbh/guthrie
```

</details>

### Usage

Guthrie offers almost any kind of expression, that can be done JavaScript-wise. Here, we provide just a simple example. Refer to our [reference](https://ogs-gmbh.github.io/guthrie/reference) get a better understanding.

```tsx
import { Guthrie } from "@ogs-gmbh/guthrie";
import type { Page } from "@ogs-gmbh/guthrie";

const page = {
  route: "example-route",
  content: {
    element: "main",
    children: [
      {
        element: "h1",
        children: [
          {
            element: "text",
            content: "Hello to Guthries Stage"
          }
        ]
      }
    ]
  }
} satisfies Page;

export function ExampleComponent() {
  return <Guthrie page={page} elements={{}} fns={{}} operators={{}} />;
}
```

## License

The MIT License (MIT) - Please have a look at the [LICENSE file](./LICENSE) for more details.

## Contributing

Contributions are always welcome and greatly appreciated. Whether you want to report a bug, suggest a new feature, or improve the documentation, your input helps make the project better for everyone.

Feel free to submit a pull request, issue or feature request.

### Issues and Feature Requests

Reporting an issue or creating a feature request is made by creating a new issue on this repository.

You can create a [new issue or feature request here](../../issues/new/choose).

### Pull Requests

GitHub offers a solid guideline for contributing to open source projects through pull requests, covering key practices. These best practices provide a reliable starting point for making effective contributions.

You can find the [guidelines here](https://docs.github.com/get-started/exploring-projects-on-github/contributing-to-a-project).

### Code Of Conduct

We are committed to keeping a welcoming, inclusive, and respectful community for everyone. To help us achieve this, we kindly ask that you adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Disclaimer

All trademarks and registered trademarks mentioned are property of their respective owners and are used for identification purposes only. Use of these names does not imply endorsement or affiliation.

This project is a trademark of OGS Gesellschaft für Datenverarbeitung und Systemberatung mbH. The License does not grant rights to use the trademark without permission.

---

<a href="https://www.ogs.de/en/">
  <picture>
    <source
      srcset="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/light.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img height="64" alt="OGS Logo" src="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/dark.svg"
  </picture>
</a>

Gesellschaft für Datenverarbeitung und Systemberatung mbH

[Imprint](https://www.ogs.de/en/imprint/) | [Contact](https://www.ogs.de/en/contact/) | [Careers](https://www.ogs.de/en/about-ogs/#Careers)
