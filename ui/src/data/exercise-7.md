---
title: Team
slug: 7
description: Create a class and implement two constructors (and necessary properties) to the class.
---

Create a `class Team` and implement the two following constructors (and necessary properties) to the class. The default constructor should have three properties:

1. The name of the team (`String`)
2. The home town of the team (`String`)
3. The year the team was formed (`int`)

The named constructor `nameAndYear` should have two properties:

1. The name of the team (`String`)
2. The year the team was formed (`int`)

In the case of the named constructor, the home town of the team must be **"Unknown"**.

Once completed, add a `toString` method to the class which leads to outputs outlined by the following examples.

```java

      final hjk = Team("HJK", "Helsinki", 1907);
      print(hjk);
      final secret = Team.nameAndYear("Secret", 1984);
      print(secret);

```

With the code above, the output should be as follows.

```java

      HJK (Helsinki, 1907)
      Secret (Unknown, 1984)

```
