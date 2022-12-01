# Pokemon Browser

This is a project that I've been working on to get more comfotable with React and Typescript in
general.

I'm not sure if I'll be maintaining this or if I'll just leave it be. It's sort of rough
right now, but I'm happy with it. This is also my first true completed program.

## What this is made with

---

This program is a React website running on Neutralino to make it a portable executable.
I decided to go with React because it's pretty popular so it has a lot of resources for learning it.
Neutralino though, was because I wanted to make something in the style of an Electron app, but without the
heavy nature of Electron... Using React kind of defeats the point of that though.

PokeApi is at the core of this app as all of the pokemon data is fetched from that database through
pokenode-ts.

## Build Instructions

### *These instructions assume you have npm installed

---

To get started, clone this repo into a directory of your choice.

Either install Neutralino globally, or use npx in place of `neu` in these instructions.

```sh
# use this to install neu globally:
npm install -g @neutralino/neu

# or use this in place of neu in scripts:
npx @neutralino/neu
```

Navigate to the root folder of the code and run the following command to install Neutralino's client and binaries.

```sh
neu update
```

Navigate into the `react-src/` folder and install npm dependancies. This might take a minute.

```sh
cd react-src
npm install
```

After the node moudules have been installed, build the React website by running the build script.

```sh
npm run build
```

Navigate back to the root directory and build the final program. The built programs will be output to `dist/`.

```sh
cd ..
neu build --release
```

## Development

---

Start by following the build instructions, at least to installing the npm packages.

You can run a hot-reload development session by running the vscode task named `debug`. The settings for the task is located in `.vscode/tasks.json`.

If you want to see the web inspector, set this in `neutralino.config.json`

```json
{
  ...
  "modes": {
    "window": {
      ...
      "enableInsector": true,
      ...
    }
  },
  ...
}
```
