"use client";

import * as React from "react";

type Props = {
  children: React.ReactNode;
  // Rendered in place of the children if they throw. Defaults to
  // nothing, which is right for purely decorative chrome.
  fallback?: React.ReactNode;
  // Shows up in the console so a swallowed failure is still findable.
  label?: string;
};

type State = { failed: boolean };

// Error boundary for decorative / non-essential client components.
//
// Errors thrown in render OR in an effect (effects run during the commit
// phase) propagate to the nearest boundary. With no boundary, React
// unmounts the entire tree — which is how a bad IntersectionObserver
// rootMargin turned into a blank "This page couldn't load" screen.
//
// Anything wrapped here degrades locally instead: the decorative piece
// disappears, the rest of the page renders.
export class DecorativeBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // Deliberately not rethrown — the whole point is to contain it.
    console.error(
      `[DecorativeBoundary${this.props.label ? `: ${this.props.label}` : ""}] contained a failure:`,
      error,
    );
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
