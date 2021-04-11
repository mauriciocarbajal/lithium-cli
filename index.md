<iframe src="https://player.vimeo.com/video/535348722?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="lithium-cli"></iframe>

### About
This project is meant to provide a simple keyboard-only virtual MIDI controller.

You can easily explore chord changes and melodies, learning about diatonic chords, secondary dominants, modal interchange and more.

It is a **work in progress**, the current version runs exclusively on a terminal and lacks any visualizations besides colored text.


### Downloads

- Ubuntu ([screenshot](/lithium-cli/ubuntu.png))
```
curl -L https://api.github.com/repos/mauriciocarbajal/lithium-cli/releases/assets/34422677 -o lithium-cli-0.1.1-linux.zip -H 'Accept: application/octet-stream';
unzip lithium-cli-0.1.1-linux.zip;
./lithium-linux
```

- MacOS ([screenshot](/lithium-cli/macos.png))
```
curl -L https://api.github.com/repos/mauriciocarbajal/lithium-cli/releases/assets/34438192 -o lithium-cli-0.1.1-macos.zip -H 'Accept: application/octet-stream';
unzip lithium-cli-0.1.1-macos.zip;
./lithium-macos
```

- Windows ([screenshot](/lithium-cli/windows.png))
```
# Still working on it, sorry!
```

<!-- ```
curl -L https://api.github.com/repos/mauriciocarbajal/lithium-cli/releases/assets/34441864 -o "lithium-cli-0.1.1-windows.zip" -H "Accept: application/octet-stream"
tar -xf lithium-cli-0.1.1-windows.zip
lithium-win.exe
``` -->


You can also find direct download links in the last release [v0.1.1](https://github.com/mauriciocarbajal/lithium-cli/releases/tag/v0.1.1).

Alternatively, you can clone the code repository and build it in your local machine. Instructions [here](https://github.com/mauriciocarbajal/lithium-cli).


### DAWs
A music recording program (DAW) is needed to provide the virtual instruments you will play using lithium-cli.

Some examples are: GarageBand (MacOS), LMMS (Linux), Ableton Live, PreSonum (multi-platform).
