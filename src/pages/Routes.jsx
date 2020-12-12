import { a } from "@react-spring/three";
import React from "react";
import { Route, Switch } from "wouter";
import Cactus from "../components/Cactus";
import PageHeading from "../components/PageHeading";
import PopiciSphere from "./PopiciSphere";
import TextPage from "./TextPage";
const Pages = ({ portal = null, transition }) => {
  return transition(({ position, scale, opacity }, location) => (
    <a.group position={position} scale={scale}>
      <Switch location={location}>
        {/* <Route path="/">
          <List />
        </Route> */}
        <Route path="/">
          <PopiciSphere />
        </Route>
        <Route path="/box">
          <PageHeading animated={{ opacity }} portal={portal}>
            Box
          </PageHeading>
          {/* <BoxPage /> */}
          <Cactus />
          {/* <DemoPage /> */}
        </Route>
        <Route path="/text">
          <TextPage />
        </Route>
      </Switch>
    </a.group>
  ));
};
export default Pages;
