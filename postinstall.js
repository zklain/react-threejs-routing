const replace = require("replace-in-file");

// Added because @react-spring/three wasnt working in prod
//https://github.com/pmndrs/react-spring/issues/1078

const removeAllSideEffectsFalseFromReactSpringPackages = async () => {
  try {
    const results = await replace({
      files: "node_modules/@react-spring/*/package.json",
      from: `"sideEffects": false`,
      to: `"sideEffects": true`,
    });
  } catch (e) {
    console.log(
      'error while trying to remove string "sideEffects:false" from react-spring packages',
      e
    );
  }
};

removeAllSideEffectsFalseFromReactSpringPackages();
