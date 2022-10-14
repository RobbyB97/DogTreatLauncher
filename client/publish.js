const ghpages = require("gh-pages")

export default () => {
  ghpgaes.publish(
    ".",
    {
      dir: "../",
    },
    (err) => {}
  );
}
