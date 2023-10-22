import React from "react";
import renderer from "react-test-renderer";
import { BaseDialog } from "./BaseDialog";

// snapshotテストを行う
// 値はPropsで渡すため、コンポーネント内でビジネスロジックは持たない（organismは除く）

describe("BaseDialog", () => {
  it("Snap Shot", () => {
    const component = renderer.create(<BaseDialog />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
