---
to: <%= abs_path %>/<%= component_name %>.tsx
---

import React from "react";
import styled from "styled-components";
<% if (have_hooks) { -%>
import { useDependencies } from './dependencies'
<% } -%>

<% if (have_props) { -%>
/** propsを記述 ↓ */
export type Props = {};
<% } -%>

/** Styled-Component（css）を記述 ↓ */
const <%= component_name%>Root = styled.div`
  // write css
`

/** コンポーネントを記述 ↓ */
export const <%= component_name %>: <%- type_annotate %> = <%= props %> => {
<% if (have_hooks) { -%>
  const deps = useDependencies<%= props %>
<% } -%>

  return (<<%= component_name %>Root>ButtonComponent</<%= component_name %>Root>);
}
