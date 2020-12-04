import { a } from "@react-spring/three";
import React from "react";
import { Route, Switch } from "wouter";
import PageHeading from "../components/PageHeading";
import Text from "../components/Text";
import BoxPage from "./BoxPage";
import Waves from "./Waves";

const Pages = ({ portal = null, pageAnims, transition }) => {
  return transition(({ position, scale, opacity }, location) => (
    <a.group position={position} scale={scale}>
      <Switch location={location}>
        <Route path="/box">
          {/* <Waves /> */}
          <PageHeading animated={{ opacity }} portal={portal}>
            Box
          </PageHeading>
          <BoxPage />
        </Route>
        <Route path="/text">
          <Text>STRV</Text>
        </Route>
        <Route path="/">
          <Waves />
        </Route>
        <Route path="/01">
          <Waves />
        </Route>
      </Switch>
    </a.group>
  ));
};
export default Pages;
