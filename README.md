# keys-harmony

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

Ok, a nice start would be to know what greek modes are. Ok, not happening.

So quick things to be aware of:
`I IIm IIIm IV V7 VIm VIIØ` are the diatonic chords of a scale (which are mapped to keys `A S D F G H J`)

For instance, C major: `C Dm Em F G7 Am BØ`

Many popular songs never go outside their key, and what's more.. they don't even use all seven chords. For instance, take "Let it be"

```
C G Am F
C G F C
```

So you would play
```
a g h f
a g f a
```

If you are familiarized with things like IIm-V7-I, you will find this key mapping not random at all.

## Secondary dominants and more...

But ok, you know what a IIm-V7-I and you want to play more complex songs.

Secondary dominants are a cornerstone of popular music and jazz of the 20th century, Wikipedia says.

So you must know them! Take a song like "All of me"

```
C [E7] [A7] Dm
[E7] Am [D7] Dm G7
C [E7] [A7] Dm
F [[Fm]] Em [A7]
Dm G C
```

Chords between brackets are secondary dominants which will resolve to a diatonic chord (the seven listed above)

To play this chords, simply press shift key and his secondary dominant will be played instead of the diatonic chord.

To be clear, if tonality is C:
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

This seemingly awful interface will help you to think chords not as just a chord, but as a function inside a tonality.

So yes, it's amazing that you play shift G for a D7, since D7 and Dm are very different conceptually.

That's all for now :)

















