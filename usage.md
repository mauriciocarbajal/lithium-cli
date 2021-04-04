# Usage and examples

## What can you do?
Besides playing voicings aware chords, you will be able to make your ear familiar with basic music harmony.

## How do you use it?
First, some basic theory: `I IIm IIIm IV V7 VIm VIIØ` are the diatonic chords of a major scale.

For instance, chords for C major scale: `C Dm Em F G7 Am BØ`

This chords are mapped to keys `1 2 3 4 5 6 7`, with basic voices movement.

Many popular songs never go outside their key and rarely they use all seven chords.

For instance, to play "Let it be":
```
C G Am F
C G F (cadence) C
```

Just hit the numbers associated to each grade of the C key:
```
1 5 6 4
1 5 4 (3 2) 1
```

Keep in mind that you should think in terms of `I`, `IV` and `V` and not of D major, G major or A7. This is a good exercise.

If you are familiarized with things like `IIm-V7-I`, you will find this key mapping not random at all.

Use `<` and `>` to change tonality.

## More complex songs...
Here's where the song "Lithium" from 90s band Nirvana comes to action as an interesting case of study:

Tonality: D major

Chords and analysis:
```
D     <--- I
F#7   <--- V7 -> VIm (secondary dominant)
Bm    <--- VIm
G     <--- IV
Bb    <--- bVI     (IV borrowed from D minor, modal interchange)
C7    <--- bVII7   (V7 borrowed from D minor, modal interchange)
A7    <--- V7
C7    <--- bVII7   (V7 borrowed from D minor, modal interchange)
D     <--- I
```

### Secondary dominants
Secondary dominants are the cornerstone of popular music and jazz of the 20th century, Wikipedia says.

To play this kind of chords, simply press shift key for any diatonic chord, and its secondary dominant will be played instead.

For instance,
```
6 => Bm minor chord
⇧6 => F#7 chord, which resolves to Bm
```

### Modal interchange
Modal interchange consists of borrowing chords from other tonalities.

When we're in a major key (such as D major), we can borrow chords from the minor key (from D minor, which is F major)

You can find those chords in the `z x c v b n m` row.

```
z => F
x => Gm (IVm)
c => Am
v => Bb
b => C7
n => Dm
m => EmØ (IIØ)
```

### Ready?
Now you are all set to play the song above:

```
1  ⇧6  6  4  v  b  5  b  1
```
Video here: https://vimeo.com/494868069

Can you notice the different nature of those chords played when you pressed `v` and `b`?

Borrowing major chords from the minor tonality is reflected on its peculiar melody, which was an unsolved mystery to me in my teen years.

## Adding melodies
You can play a melody in the keyboard using the `asd` row and the `qwerty` row 🎹:
```
 w e   t y u   o p
a s d f g h j k l
```

The `asd` row has the diatonic scale of the key you're in, so those notes probably go well if you are playing diatonic chords. 

There are some rules here, but instead explore and see how each note go with each chord. What sounds nice to you?

## Thoughts
This weird user interface will help you to think of chords as a function inside a tonality where they belong to.

It was created as a small tool to explore harmony, starting from the very basic `I IV V7 I` progressions. You can explore some harmonic changes that still might be difficult for you to play in your preferred instrument. Hopefully you can find some new musical ideas to chase afterwards.

To exit press `ctrl + c`


## Example: Georgia on my mind
Take this jazz standard as an example of a not so obvious harmony:

Tonality: G major
```
1        ⇧6
Georgia, Georgia

6   ⇧4        4       
The whole day through

x    b  1         6
Just an old sweet song

2             5     3(or ⇧z)  ⇧2 
Keeps Georgia on my mind...

2  5  ⇧1  1
```
Video here: https://vimeo.com/494875964