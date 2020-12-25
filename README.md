# Lithium 🎵
This mini project consist of a virtual MIDI instrument with CLI interface, developed in nodejs.

## What can I do?
Besides playing voicings-aware chords, you will be able to make your ear familiar with basic music harmony.

## How do I install it?

To start, open GarageBand, Logic, or any other DAW software where you can plug a MIDI keyboard and play sounds.

Next, follow this steps:

1. Install nodejs on your machine. Reference: https://nodejs.org/en/download

2. Open a terminal and run the next commands to clone this repo in your machine:
```
git clone https://github.com/mauriciocarbajal/lithium.git
cd lithium
```

3. Install all the required dependencies running this command:
```
npm install
```

4. To start the application, run the next command and you should see your DAW detect a new input source:
```
npm run cli
```

### Video
You can see a video here, running lithium and exploring its basic features:

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

Use `<` and `>` to change the key.

## More complex song
Here's where song "Lithium" from 90s band Nirvana comes to action as a perfect case of study:

Tonality: D major

Chords:
```
D   <--- I
F#7 <--- V7 -> VIm (secondary dominant)
Bm  <--- VIm
G   <--- IV
Bb  <--- bVI     (IV borrowed from D minor, modal interchange)
C7  <--- bVII7   (V7 borrowed from D minor, modal interchange)
A7  <--- V7
C7  <--- bVII7   (V7 borrowed from D minor, modal interchange)
D   <--- I
```

### Secondary dominants
Secondary dominants are the cornerstone of popular music and jazz of the 20th century, Wikipedia says.

To play this kind of chords, simply press shift key and any diatonic chord, and its secondary dominant will be played instead of the diatonic chord.

For instance,
```
6 => Bm minor chord
⇧6 => F#7 chord, which resolves to Bm
```

### Modal interchange
Modal interchange consists of borrowing chords from other tonalities.

When we're in a major key (such as D major), we often borrow chords from the minor key (from D minor, which is F major)

You will find chords from the `Im` tonality in the `z x c v b n m` row.

```
z => Cm
x => DØ (IIØ)
c => Eb (IVm)
v => Fm
b => Gm
n => Ab
m => Bb7
```

### Play it, Sam
So now you are all set to play all chords from the song above...
```
1  ⇧6  6  4  n  m  5  m  1
```

## Adding melodies
You can play a melody in the keyboard using the z row and the a row. This is clearly a piano 🎹:
```
 w e   t y u   o p   ]
a s d f g h j k l ; '
```

The `asd` row has the diatonic scale of the key you're in, so those notes probably go well if you are playing diatonic chords. 

There are some rules here, but explore and see how they sound to you. What sounds nice and why?

## Thoughts
This weird user interface will help you to think of chords as a function inside a tonality where they belong to.

Music harmony might be simpler than you think. Each particular instrument always add more complexity because of physical restrictions. Much of the time you spend learning a new instrument goes to overcoming those restrictions.

This is a small tool for exploring harmony, starting from the very basic `I IV V7 I` progressions. You can try some harmonic changes that still might be difficult for you to play in your preferred instrument. Hopefully you can find some new musical ideas to chase afterwards.

To exit press `ctrl + c`

## Bonus: Leap motion support
There is partial [leap motion](https://developer.leapmotion.com/) support if you happen to have one.

In that case run `npm run leap` instead. I still haven't found a good combination of gestures to match the keyboard, but you can map some of them easily, and also use your hand as a module effect changer (such as volume or pitch).

## Bonus: Georgia on my mind
Take this jazz standard as an example of a not so obvious harmony. Could it be played on this instrumentoid?

Tonality: G major
```
1        ⇧6
Georgia, Georgia

6   ⇧4        4       
The whole day through

v    m  1         6
Just an old sweet song

2             5     3  ⇧2 (or ⇧C)
Keeps Georgia on my mind...

2  5  ⇧1  1
```
