---
to: <%= abs_path %>/<%= component_name %>.test.tsx
---
import React from "react";
import renderer from "react-test-renderer";
import { <%= component_name %> } from "./<%= component_name %>";

// snapshotテストを行う
// 値はPropsで渡すため、コンポーネント内でビジネスロジックは持たない（organismは除く）

describe("<%= component_name %>", () => {
  it("Snap Shot", () => {
    const component = renderer.create(<<%= component_name %> />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
