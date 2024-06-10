### Add following to cargo.toml

```
[package.metadata.scripts]
optimize = """docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/optimizer:0.15.0
"""
```

### Make sure that docker is running and make sure that you have downloaded the following:

`docker pull cosmwasm/optimizer:0.15.0`

### Next run the command:

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/optimizer:0.15.0
```

- This will create a folder called `artifacts`.
- Unders this folder, you will find `<project name>.wasm`.
- Get this file and add it under the `wasm` folder in this project.
