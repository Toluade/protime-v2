import { lazy } from "react";
import * as React from "react";
import { Navigate } from "react-router-dom";

const Timer = lazy(() => import("@/Screens/Timer"));
const Stopwatch = lazy(() => import("@/Screens/Stopwatch"));
const Clock = lazy(() => import("@/Screens/Clock"));

export type Route = {
  path: string;
  //   isPrivate: boolean;
  component: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.LazyExoticComponent<(...props: any) => JSX.Element>
    | (() => JSX.Element)
    | (() => null);
  title: string;
  //   roles?: string[];
};

const ROUTES: Route[] = [
  {
    path: "/timer",
    component: Timer,
    title: "Timer",
  },
  {
    path: "/stopwatch",
    component: Stopwatch,
    title: "Stopwatch",
  },
  {
    path: "/clock",
    component: Clock,
    title: "Clock",
  },
  {
    path: "/",
    component: () =>
      Navigate({
        to: "/timer",
        replace: true,
      }),
    title: "Home",
  },
  {
    path: "*",
    component: () =>
      Navigate({
        to: "/timer",
        replace: true,
      }),
    title: "Home",
  },
];

export default ROUTES;
