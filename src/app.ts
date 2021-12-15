import express from "express";
import picomatch from "picomatch";

const config = {
  PORT: parseInt(process.env.PORT ?? "3000"),
  REDIRECT_STATUS: parseInt(process.env.REDIRECT_STATUS ?? "301"),
};
process.env["ROUTE_http://localhost*/abc"] = "http://google.de";

const routes = Object.entries(process.env).reduce<
  {
    routePattern: string;
    target: string;
  }[]
>((acc, [key, value]) => {
  if (!value || !key.startsWith("ROUTE_")) {
    return acc;
  }

  const routePattern = key.split("_")[1];

  acc.push({
    routePattern,
    target: value,
  });
  return acc;
}, []);

function match(url: string) {
  return routes.find(({ routePattern }) => {
    return picomatch(routePattern)(url);
  })?.target;
}

const app = express();

app.get("/*", (req, res) => {
  const url = `${req.protocol}://${req.get("host")}${req.url}`;

  const target = match(url);

  if (target === undefined) {
    console.log(`No match for "${url}"`);

    res.sendStatus(404);
    return;
  }
  console.log(`Redirected request on url "${url}" to "${target}"`);

  res.redirect(config.REDIRECT_STATUS, target);
});

app.listen(config.PORT, () => {
  console.log(`Listening on ${config.PORT}`);
});
