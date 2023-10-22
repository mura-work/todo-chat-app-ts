import React from "react";
import styled from "styled-components";
import { useDependencies } from './dependencies'

/** propsを記述 ↓ */
export type Props = {};

/** Styled-Component（css）を記述 ↓ */
const BaseDialogRoot = styled.div`
  // write css
`

/** コンポーネントを記述 ↓ */
export const BaseDialog: React.FC<Props> = (props) => {
  const deps = useDependencies(props)

  return (<BaseDialogRoot>ButtonComponent</BaseDialogRoot>);
}
