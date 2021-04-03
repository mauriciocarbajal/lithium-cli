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
