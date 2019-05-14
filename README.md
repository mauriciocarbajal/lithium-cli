# sharp♭ar

This mini project consist of a virtual MIDI instrument with CLI interface, developed in nodejs.

## What can I do?

Besides playing voicings-aware chords, you will be able to make your ear familiar with basic music harmony.

## How do I install it?

First of all, open GarageBand (or any software that can receive MIDI and play sounds from it)

Then install node on your machine.

Then just install modules and run the index.js file:
```
npm install;

node index.js
```

## How do I use it?

Before, some basic theory:
`I IIm IIIm IV V7 VIm VIIØ` are the diatonic chords of a major scale.

For instance, chords for C major scale: `C Dm Em F G7 Am BØ`

This chords are mapped to keys `a s d f g h j`, with basic voices movement (I'm not a piano player)

Many popular songs never go outside their key. What's more, they don't even use all seven chords.

Take "Let it be":

```
C G Am F
C G F C
```

So run keys-harmony in your terminal and simply play:
```
a g h f
a g f a
```

Keep in mind that you must think of I, IV and V and not think of "How do I play a D chord", this is a good exercise.

If you are familiarized with things like `IIm-V7-I`, you will find this key mapping not random at all.

## Secondary dominants and more...

But ok, you know what a `IIm-V7-I` and you want to play more complex songs.

Secondary dominants are a cornerstone of popular music and jazz of the 20th century, Wikipedia says.

So you must know them! Take "All of me" as example:

```
C [E7] [A7] Dm
[E7] Am [D7] Dm G7
C [E7] [A7] Dm
F [[Fm]] Em [A7]
Dm G C
```

Chords between brackets are secondary dominants which will resolve to a diatonic chord.

To play this chords, simply press shift key and his secondary dominant will be played instead of the diatonic chord.

For instance, if tonality is C:
```
s => Dm major chord
S => A7 chord
```

Also in the `qwerty` row above each diatonic chord, you can find substitutes from modal interchanges. Just two for now...
```
w => DØ (a IIØ)
r => Fm (a IVm)
```

So you are all set to play "All of me" chords...
```
a H S s
H h G s G
a H S s
f r d S
s g a
```

This seemingly awful user interface will help you to think chords not as just a chord, but as a function inside a tonality.

In other words, before playing a song you must analyze its chords and their function.

That's all for now :)

















