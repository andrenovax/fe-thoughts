import React from 'react';
import { BasePageProvider } from "./provider";

export function connect(provider: BasePageProvider, component: React.Component): React.Component {
  return component;
}
