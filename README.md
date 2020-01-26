# Boplicity 🎵
This mini project consist of a virtual MIDI instrument with CLI interface, developed in nodejs.

## What can I do?
Besides playing voicings-aware chords, you will be able to make your ear familiar with basic music harmony.

## How do I install it?

FIRST: Open GarageBand, Logic, or any other DAW software where you can plug a MIDI keyboard and play sounds.

Next, to run boplicity in your machine:

1. Install node on your machine. Reference: https://nodejs.org/en/download

2. Open a terminal and run the next commands to clone this repo in your machine:
```
git clone https://github.com/mauriciocarbajal/boplicity.git
cd boplicity
```

3. Install all the required dependencies running this command:
```
npm install
```

4. To start the application, run the next command and you should see your DAW detect a new input source:
```
npm run cli
```


[![Watch the video](https://i.vimeocdn.com/video/850101961.webp?mw=1800&mh=1125&q=70)](https://vimeo.com/387222224)

## How do I use it?
First, some basic theory: `I IIm IIIm IV V7 VIm VIIØ` are the diatonic chords of a major scale.

For instance, chords for C major scale: `C Dm Em F G7 Am BØ`

This chords are mapped to keys `1 2 3 4 5 6 7`, with basic voices movement.

Many popular songs never go outside their key and rarely they use all seven chords.

For instance, to play "Let it be":
```
C G Am F
C G F C
```

Just hit the numbers associated to each grade of the C key:
```
1 5 6 4
1 5 4 1
```

Keep in mind that you must think of `I`, `IV` and `V` and not think of "How do I play a D chord". This is a good exercise.
If you are familiarized with things like `IIm-V7-I`, you will find this key mapping not random at all.

Use `o` and `p` to change the key

## More complex chords
But ok, you know what a IIm-V7-I is and you want to play more complex songs.

Secondary dominants are the cornerstone of popular music and jazz of the 20th century, Wikipedia says.

So you must know them! Take "All of me" as an example:

```
C [E7] [A7] Dm
[E7] Am [D7] Dm G7
C [E7] [A7] Dm
F [[Fm]] Em [A7]
Dm G C
```

### Secondary dominants
Chords between brackets are secondary dominants which will resolve to a diatonic chord.

To play this chords, simply press shift key and his secondary dominant will be played instead of the diatonic chord.

For instance, if tonality were C major:

```
2 => Dm major chord
⇧2 => A7 chord, which resolves to Dm
```

### Modal interchange
The chord between double brackets (the `Fm`) is a modal interchange from another key.

You will find chords you can borrow from the `Im` tonality in the ` q w e r t y u` row.

```
q => Cm
w => DØ (IIØ)
e => Eb (IVm)
r => Fm
t => Gm
y => Ab
u => Bb7
```

### Play it, Sam
So now you are all set to play "All of me" chords...
```
1 ⇧6 ⇧2 2
⇧6 6 ⇧5 2 5
1 ⇧6 ⇧2 2
4 r 3 ⇧2
2 5 1
```

## Adding melodies
You can play a melody in the keyboard using the z row and the a row. This is clearly a piano 🎹:
```
 s   f g   j k l  
z x c v b n m , . /
```

The z row has the diatonic scale of the key you're in, so those notes probably go well if you are playing diatonic chords. 

There are some rules here, but explore and see how they sound to you. What sounds nice and why?

## Leap motion support
There is partial [leap motion] (https://developer.leapmotion.com/) support if you happen to have one.

In that case run `npm run leap` instead. I still haven't found a good combination of gestures to match the keyboard, but you can map some of them easily, and also use your hand as a module effect changer (e.g. change volume as if it were a theremin).


## Thoughts
This weird user interface will help you to think of chords as a function inside a tonality where they belong to.

Music harmony might be simpler than you think. Each particular instrument always add more complexity because of physical restrictions and because life. Much of the time you spend learning a new instrument goes to overcoming those restrictions.

This is a small tool for exploring harmony, starting from the very basic `I IV V7 I` progressions. You can try some harmonic changes that still might be difficult for you to play in your preferred instrument. Hopefully you can find some new musical ideas to chase afterwards.

To exit press `ctrl + c`
