## How do I install it?

To start, open GarageBand, Logic, or any other DAW software where you can plug a MIDI keyboard and play sounds.

Next, follow this steps:

1. Install git and nodejs on your machine. Reference: https://nodejs.org/en/download

2. Open a terminal and run the next commands to clone this repo in your machine:
```
git clone https://github.com/mauriciocarbajal/lithium-cli.git
cd lithium-cli
```

3. Install all the required dependencies running this command:
```
npm install
```

4. To start the application, run the next command and you should see your DAW detect a new input source:
```
npm run cli
```


### Missing dependencies problems you may find while running step 3

In linux, you may need to install this dependencies first:
```
sudo apt-get install make g++ libasound2-dev
```

In macOS, you may need to run this first:
```
xcode-select --install
```

Also, checking easy midi requirements may help:
[https://github.com/justinlatimer/node-midi](https://github.com/justinlatimer/node-midi)