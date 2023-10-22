---
to: "<%= have_hooks ? `${abs_path}/dependencies.ts` : null %>"
---
import React, { useEffect, useState } from 'react';

<% if (have_props) { -%>
import type { Props } from "./<%= component_name %>"

export function useDependencies(props: Props) {
  return {}
}
<% } else { -%>
export function useDependencies() {
  return {}
}
<% } -%>
