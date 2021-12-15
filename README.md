# Umleitung

A simple docker container to create redirects.

## Usage

The docker container reads the environment variables to determine the redirects.

Every environemnt entry should have the following format:

    "ROUTE_${PATTERN}=${TARGET}"

    - PATTERN
        The pattern to match for the redirect to take palce

        Note: you have to match against the full url including the protocol, port and path.

    - TARGET
        The url to redirect to

## Example

The environemnt variable `ROUTE_https://my-website.de/abc=https://example.com` would redirect all requests on `https://my-website.de/abc` to `https://example.com`.

See the docker-compose in the [examples](examples/) folder for implementation details.

## Wildcards

You can use `*` to match anything using [picomatch](https://www.npmjs.com/package/picomatch), to for example match any path like this `https://my-website/*`
