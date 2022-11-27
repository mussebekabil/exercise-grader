---
title: Video and playlist
slug: 8
description: Create and implement classes with/without constructors (and necessary properties) to the corresponding classes.
---

Implement the classes `Video` and `Playlist` as follows. The class `Video` should have a name (`String`), a duration in seconds (`int`), a constructor with named arguments, and a `toString` method. The default name should be **"Unknown"** and the default length should be **0**. The class should work as follows.

```java

      print(Video(name: "One second clip", duration: 1));
      print(Video(name: "Hello again!", duration: 84));

```

With the code above, the output should be as follows.

```java

      One second clip (1 second)
      Hello again! (84 seconds)

```

The class `Playlist` should contain a list of videos, provide a default (no argument) constructor, and offer the following methods:

1. `void add(Video video)` that adds a video to the playlist
2. `bool has(String name)` that returns **true** if the list of videos contains a video with the given name
3. `int duration()` that returns the **sum** of durations of the videos in the playlist

The class should work as follows.

```java

      final playlist = Playlist();
      print(playlist.has("One second clip"));
      print(playlist.duration());
      playlist.add(Video(name: "One second clip", duration: 1));
      playlist.add(Video(name: "Hello again!", duration: 84));
      print(playlist.has("One second clip"));
      print(playlist.duration());

```

With the code above, the output should be as follows.

```console

     false
      0
      true
      85

```
